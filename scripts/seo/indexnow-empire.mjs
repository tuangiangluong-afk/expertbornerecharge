// Submit every empire domain's live sitemap URLs to Bing IndexNow, using a
// UNIQUE key per domain (see scripts/seo/gen_indexnow_keys.py). Submitting with
// the host that each sitemap actually declares avoids key/host mismatch.
//
// Usage:  node scripts/seo/indexnow-empire.mjs
//
// Safe & idempotent: IndexNow is a discovery ping (no code/CRO change). It
// waits for each key file to go live (i.e. for the Vercel deploy) first.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KEYS = JSON.parse(readFileSync(join(__dirname, 'indexnow-keys.json'), 'utf8'));

const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const CHUNK = 400;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  try {
    const r = await fetch(url, { redirect: 'follow' });
    return { status: r.status, body: r.ok ? await r.text() : '' };
  } catch {
    return { status: 0, body: '' };
  }
}

// Wait until the domain's key file is served (deploy finished), max ~4 min.
async function waitForKey(subHost, key) {
  for (let i = 0; i < 40; i++) {
    const { status } = await fetchText(`https://${subHost}/${key}.txt`);
    if (status === 200) return true;
    await sleep(6000);
  }
  return false;
}

async function submitHost(subHost, key, urls) {
  for (let i = 0; i < urls.length; i += CHUNK) {
    const batch = urls.slice(i, i + CHUNK);
    const payload = JSON.stringify({
      host: subHost,
      key,
      keyLocation: `https://${subHost}/${key}.txt`,
      urlList: batch,
    });
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: payload,
    });
    console.log(`   batch ${i / CHUNK + 1}: ${batch.length} urls -> HTTP ${res.status}`);
    if (res.status === 403) {
      console.log('   throttled, backing off 30s, retry once…');
      await sleep(30000);
      const retry = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: payload,
      });
      console.log(`   retry -> HTTP ${retry.status}`);
    }
    await sleep(250);
  }
}

async function main() {
  const entries = Object.entries(KEYS);
  for (const [apex, key] of entries) {
    const { status, body } = await fetchText(`https://${apex}/sitemap.xml`);
    if (status !== 200 || !body) {
      console.log(`\n=== ${apex} ===  ERR: sitemap ${status}`);
      continue;
    }
    // parse <loc> entries directly from the (possibly large) sitemap text
    const urls = [];
    const re = /<loc>([\s\S]*?)<\/loc>/g;
    let m;
    while ((m = re.exec(body))) urls.push(m[1].trim());
    if (!urls.length) { console.log(`\n=== ${apex} ===  ERR: 0 loc parsed`); continue; }
    // submission host = host that the sitemap itself declares (strip scheme, drop path)
    const declared = new URL(urls[0]).hostname;
    const apexKey = declared.replace(/^www\./, '');
    const useKey = KEYS[apexKey] || key;
    console.log(`\n=== ${apex} ===  ${urls.length} urls, host=${declared}`);
    const live = await waitForKey(declared, useKey);
    if (!live) { console.log(`   SKIP: key file not live on ${declared} (deploy pending)`); continue; }
    await submitHost(declared, useKey, urls);
    console.log(`   submitted ${urls.length} urls for ${declared}`);
  }
  console.log('\nDone.');
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
