// Empire-wide IndexNow submission (feeds Bing -> ChatGPT/Copilot/Perplexity).
// Pure API ping: reads each domain's live sitemap.xml and submits the URLs to
// api.indexnow.org. No production code is touched. Safe & idempotent.
//
// Usage: node scripts/seo/indexnow-empire.mjs
const KEY = '136009bf6d91456da87ab666014285fb'; // hosted at https://<host>/<KEY>.txt on every site

const HOSTS = [
    'expertbornerecharge.com',
    'expertpompeachaleur.com',
    'expertpanneausolaire.com',
    'expertpanneausolaire.ch',
    'expertdouchesenior.com',
    'expertmonteescalier.com',
    'urgencecouverture.com',
    'expertsecuriteincendie.fr',
    'expertpergolabioclimatique.fr',
    'thermostatcopropriete.fr',
];

async function getLocs(host) {
    const res = await fetch(`https://${host}/sitemap.xml`, { redirect: 'follow' });
    if (!res.ok) throw new Error(`sitemap HTTP ${res.status}`);
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
    // Canonical is non-www (middleware 301s www -> apex). Normalize + dedupe.
    // Keep ONLY URLs on this exact host (IndexNow rejects cross-host batches).
    const norm = [...new Set(urls
        .filter((u) => u.startsWith('http'))
        .map((u) => u.replace(/^https?:\/\/www\./i, 'https://'))
        .filter((u) => {
            try { return new URL(u).hostname.toLowerCase() === host.toLowerCase(); }
            catch { return false; }
        }))];
    return norm;
}

async function submit(host, urlList) {
    const body = {
        host,               // IndexNow host = apex domain (canonical)
        key: KEY,
        keyLocation: `https://${host}/${KEY}.txt`,
        urlList,
    };
    const res = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
    });
    return res.status; // 200/202 = accepted
}

async function main() {
    const CHUNK = 400; // IndexNow shared endpoint 403s on large single batches
    console.log('IndexNow empire submission\n' + '='.repeat(50));
    for (const host of HOSTS) {
        try {
            let urls = await getLocs(host);
            if (urls.length > 10000) urls = urls.slice(0, 10000); // IndexNow cap
            if (urls.length === 0) { console.log(`${host.padEnd(32)} no URLs, skip`); continue; }
            let ok = true, sent = 0;
            for (let i = 0; i < urls.length; i += CHUNK) {
                const batch = urls.slice(i, i + CHUNK);
                const status = await submit(host, batch);
                if (status !== 200 && status !== 202) { ok = false; console.log(`${host.padEnd(32)} ERR  batch@${i} (HTTP ${status})`); }
                else sent += batch.length;
                await new Promise((r) => setTimeout(r, 250)); // be polite to the endpoint
            }
            if (ok) console.log(`${host.padEnd(32)} OK   ${sent} urls`);
        } catch (e) {
            console.log(`${host.padEnd(32)} FAIL ${e.message}`);
        }
    }
    console.log('='.repeat(50) + '\nDone.');
}

main();
