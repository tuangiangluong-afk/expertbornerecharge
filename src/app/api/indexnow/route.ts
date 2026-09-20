import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const INDEXNOW_KEY = "f524188a726691e30cc0f19c7f7c27c1";
    const HOST = "expertbornerecharge.com";
    const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

    try {
        // Fetch the site's own sitemap
        const sitemapUrl = `https://${HOST}/sitemap.xml`;
        const sitemapResponse = await fetch(sitemapUrl, { cache: 'no-store' });
        
        if (!sitemapResponse.ok) {
            throw new Error(`Failed to fetch sitemap: ${sitemapResponse.statusText}`);
        }
        
        const xml = await sitemapResponse.text();
        
        // Extract all URLs from sitemap
        // Matches <loc>https://...</loc>
        const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
        const urls = matches.map(m => m[1]);

        if (urls.length === 0) {
            throw new Error('No URLs found in sitemap');
        }

        // Limit to 10,000 URLs as per IndexNow restrictions
        const payloadUrls = urls.slice(0, 10000);

        // Submit in chunks: IndexNow rejects oversized single batches
        const CHUNK = 400;
        let sent = 0;
        for (let i = 0; i < payloadUrls.length; i += CHUNK) {
            const batch = payloadUrls.slice(i, i + CHUNK);
            const payload = {
                host: HOST,
                key: INDEXNOW_KEY,
                keyLocation: KEY_LOCATION,
                urlList: batch,
            };
            const response = await fetch("https://api.indexnow.org/indexnow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error(`IndexNow Error: HTTP ${response.status} on batch ${i / CHUNK + 1}`);
            }
            sent += batch.length;
            await new Promise((r) => setTimeout(r, 250));
        }

        return NextResponse.json({
            success: true,
            provider: "IndexNow",
            count: sent,
            message: "Ping sent successfully using sitemap URLs"
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
