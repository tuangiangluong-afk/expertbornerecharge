import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MAX_DAILY_BATCH = 190; // Stays safely under Google's 200/day limit

function cleanEnv(val: string | undefined): string | null {
  if (!val) return null;
  return val.replace(/^["']|["']$/g, '').trim() || null;
}

async function getAccessToken(): Promise<string | null> {
  const CLIENT_ID = cleanEnv(process.env.GOOGLE_OAUTH_CLIENT_ID);
  const CLIENT_SECRET = cleanEnv(process.env.GOOGLE_OAUTH_CLIENT_SECRET);
  const REFRESH_TOKEN = cleanEnv(process.env.GOOGLE_OAUTH_REFRESH_TOKEN);

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return null;
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });

    const data = await response.json();
    return data.access_token || null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hostHeader = request.headers.get('host') || '';
    const HOST = hostHeader.split(':')[0] || process.env.NEXT_PUBLIC_HOST || 'expertbornerecharge.com';

    const token = await getAccessToken();
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Missing or invalid Google OAuth2 credentials'
      }, { status: 500 });
    }

    const sitemapUrl = `https://${HOST}/sitemap.xml`;
    const sitemapRes = await fetch(sitemapUrl, { cache: 'no-store' });
    if (!sitemapRes.ok) {
      return NextResponse.json({ success: false, error: 'Failed to fetch sitemap from ' + sitemapUrl }, { status: 502 });
    }

    const xml = await sitemapRes.text();
    const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
    const urls = matches.map(m => m[1]);

    if (urls.length === 0) {
      return NextResponse.json({ success: false, error: 'No URLs found in sitemap' }, { status: 400 });
    }

    // Daily Cursor Calculation:
    // If a site has 600 URLs, day 1 submits 0..190, day 2 submits 190..380, day 3 submits 380..570, etc.
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    
    // Allow manual override via ?offset=X&limit=Y
    const customOffset = searchParams.get('offset');
    const customLimit = searchParams.get('limit');
    
    const limit = customLimit ? Math.min(parseInt(customLimit, 10), 200) : MAX_DAILY_BATCH;
    const startIndex = customOffset ? parseInt(customOffset, 10) : (dayOfYear * limit) % urls.length;

    // Build rolling batch with wrap-around
    let batch: string[] = [];
    if (startIndex + limit <= urls.length) {
      batch = urls.slice(startIndex, startIndex + limit);
    } else {
      batch = urls.slice(startIndex).concat(urls.slice(0, (startIndex + limit) % urls.length));
    }

    let successCount = 0;
    let failCount = 0;
    let quotaReached = false;

    for (const url of batch) {
      try {
        const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url,
            type: 'URL_UPDATED',
          }),
        });

        if (res.ok) {
          successCount++;
        } else {
          if (res.status === 429) {
            quotaReached = true;
            break; // Stop immediately when daily 200 quota is hit
          }
          failCount++;
        }
      } catch {
        failCount++;
      }
    }

    return NextResponse.json({
      success: true,
      provider: 'Google Indexing API (OAuth2)',
      submitted: successCount,
      failed: failCount,
      quotaReached,
      totalSitemapUrls: urls.length,
      currentBatchRange: {
        startIndex,
        batchSize: batch.length,
        submittedCount: successCount,
      },
      nextRunScheduled: 'Tomorrow at 02:00 UTC (Next batch will resume automatically)',
      message: quotaReached 
        ? `Daily Google limit reached (200/day). Successfully indexed ${successCount} URLs. Remaining queue will continue tomorrow at 02:00 UTC.`
        : `Successfully submitted ${successCount}/${batch.length} URLs (Rotating daily batch for Day ${dayOfYear}).`
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
