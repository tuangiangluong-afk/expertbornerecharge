/**
 * Audit SEO / AEO live de la production.
 *
 *   node scripts/seo/audit-live.mjs                # crawl complet du sitemap
 *   node scripts/seo/audit-live.mjs --limit=80     # echantillon
 *   AUDIT_ORIGIN=https://autre-domaine.fr node scripts/seo/audit-live.mjs
 *
 * Lecture seule : uniquement des GET sur des pages publiques.
 */
import * as cheerio from 'cheerio';

const ORIGIN = (process.env.AUDIT_ORIGIN || 'https://expertbornerecharge.com').replace(/\/$/, '');
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY || 8);
const limitArg = process.argv.find((a) => a.startsWith('--limit='));
const LIMIT = limitArg ? Number(limitArg.split('=')[1]) : Infinity;

const TITLE_MAX = 62;
const TITLE_MIN = 15;
const DESC_MIN = 70;
const DESC_MAX = 160;
const THIN_WORDS = 300;

const BUCKETS = [
    [/^\/$/, 'accueil'],
    [/^\/ville\/[^/]+\/[^/]+$/, 'ville + marque/mode'],
    [/^\/ville\/[^/]+$/, 'ville'],
    [/^\/guides\/[^/]+$/, 'guide'],
    [/^\/blog\/[^/]+$/, 'article blog'],
    [/^\/solutions\/[^/]+$/, 'solution'],
    [/^\/outils\/[^/]+$/, 'outil'],
    [/^\/vehicules/, 'vehicule'],
    [/^\/author\//, 'auteur'],
];

const bucketOf = (path) => BUCKETS.find(([re]) => re.test(path))?.[1] || 'autre';

async function getSitemapUrls() {
    const res = await fetch(`${ORIGIN}/sitemap.xml`, { headers: { 'user-agent': 'audit-live/1.0' } });
    if (!res.ok) throw new Error(`sitemap ${res.status}`);
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
    // Le sitemap du hub déclare toujours le domaine de production. Quand on
    // audite un serveur local, on réécrit l'hôte pour ne pas crawler la prod
    // par erreur (et croire qu'on a vérifié son propre build).
    const urls = locs.map((loc) => {
        if (new URL(ORIGIN).host === new URL(loc).host) return loc;
        const target = new URL(loc);
        const base = new URL(ORIGIN);
        target.protocol = base.protocol;
        target.host = base.host;
        return target.toString();
    });

    return {
        urls,
        lastmodCount: (xml.match(/<lastmod>/g) || []).length,
    };
}

async function auditPage(url) {
    const started = Date.now();
    let res;
    try {
        res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'audit-live/1.0' } });
    } catch (error) {
        return { url, status: 0, error: String(error.message || error) };
    }

    const headers = {
        robots: res.headers.get('x-robots-tag') || '',
        location: res.headers.get('location') || '',
    };

    if (res.status !== 200) return { url, status: res.status, headers };

    const html = await res.text();
    const $ = cheerio.load(html);
    const path = new URL(url).pathname;

    const title = $('head title').first().text().trim();
    const description = ($('meta[name="description"]').attr('content') || '').trim();
    const canonical = ($('link[rel="canonical"]').attr('content') || $('link[rel="canonical"]').attr('href') || '').trim();

    const schemas = [];
    $('script[type="application/ld+json"]').each((_, el) => {
        try {
            const parsed = JSON.parse($(el).text());
            const nodes = Array.isArray(parsed) ? parsed : (parsed['@graph'] || [parsed]);
            for (const node of nodes) {
                const type = node?.['@type'];
                if (Array.isArray(type)) schemas.push(...type);
                else if (type) schemas.push(type);
            }
        } catch {
            schemas.push('INVALID_JSONLD');
        }
    });

    $('script, style, noscript, svg, template').remove();
    const words = $('body').text().replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;

    const internalLinks = new Set();
    $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) internalLinks.add(href.split('#')[0]);
    });

    let images = 0;
    let imagesNoAlt = 0;
    $('img').each((_, el) => {
        images += 1;
        const alt = $(el).attr('alt');
        if (alt === undefined || alt.trim() === '') imagesNoAlt += 1;
    });

    return {
        url,
        path,
        bucket: bucketOf(path),
        status: res.status,
        ms: Date.now() - started,
        title,
        titleLen: title.length,
        description,
        descLen: description.length,
        canonical,
        canonicalSelf: canonical === url || canonical === `${url}/` || canonical.replace(/\/$/, '') === url.replace(/\/$/, ''),
        h1: $('h1').length,
        h1Text: $('h1').first().text().trim(),
        robotsMeta: $('meta[name="robots"]').attr('content') || '',
        xRobots: headers.robots,
        ogTitle: $('meta[property="og:title"]').attr('content') || '',
        ogImage: $('meta[property="og:image"]').attr('content') || '',
        twitterCard: $('meta[name="twitter:card"]').attr('content') || '',
        schemas: [...new Set(schemas)],
        // `speakable` est une propriété imbriquée, pas un nœud racine : on la
        // cherche dans la source JSON-LD plutôt que dans les @type de tête.
        speakable: /SpeakableSpecification/.test(html),
        breadcrumbInHtml: /BreadcrumbList/.test(html),
        words,
        internalLinks: internalLinks.size,
        images,
        imagesNoAlt,
    };
}

async function pool(items, worker, concurrency) {
    const results = new Array(items.length);
    let cursor = 0;
    const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
        while (cursor < items.length) {
            const index = cursor++;
            results[index] = await worker(items[index]);
        }
    });
    await Promise.all(runners);
    return results;
}

const pct = (part, total) => `${total ? Math.round((part / total) * 100) : 0}%`;
const countBy = (rows, fn) => rows.reduce((acc, row) => {
    const key = fn(row);
    if (key) acc[key] = (acc[key] || 0) + 1;
    return acc;
}, {});
const duplicates = (rows, field) => {
    const seen = new Map();
    for (const row of rows) {
        const value = (row[field] || '').trim();
        if (!value) continue;
        seen.set(value, (seen.get(value) || 0) + 1);
    }
    return [...seen.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]);
};
const per = (rows, fn) => {
    const opened = rows.filter((r) => r.status === 200);
    const hit = opened.filter(fn).length;
    return `${hit}/${opened.length} (${pct(hit, opened.length)})`;
};
const line = (label, value) => console.log(`  ${label.padEnd(46)} ${value}`);

const { urls, lastmodCount } = await getSitemapUrls();
let targets = urls;
if (LIMIT !== Infinity) {
    const shuffled = [...urls];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    targets = shuffled.slice(0, LIMIT);
}

console.log(`\n=== AUDIT SEO/AEO LIVE : ${ORIGIN} ===`);
console.log(`Sitemap : ${urls.length} URLs (${lastmodCount} <lastmod>) | crawl : ${targets.length} pages\n`);

const rows = await pool(targets, auditPage, CONCURRENCY);
const ok = rows.filter((r) => r.status === 200);
const ko = rows.filter((r) => r.status !== 200);

console.log('--- EXPLOITATION / INDEXATION ---');
line('HTTP 200', `${ok.length}/${rows.length} (${pct(ok.length, rows.length)})`);
if (ko.length) {
    console.log(`  non-200 :`);
    for (const row of ko.slice(0, 20)) console.log(`    ${row.status} ${row.url}${row.headers?.location ? ` -> ${row.headers.location}` : ''}`);
}
line('canonical auto-referente', per(rows, (r) => r.canonicalSelf));
line('un seul H1', per(rows, (r) => r.h1 === 1));
line('aucun noindex (meta robots)', per(rows, (r) => !/noindex/i.test(r.robotsMeta)));
line('X-Robots-Tag sans noindex', per(rows, (r) => !/noindex/i.test(r.xRobots)));
line('X-Robots-Tag avec max-snippet:-1', per(rows, (r) => /max-snippet:-1/.test(r.xRobots)));

console.log('\n--- BALISES ---');
line('titre present', per(rows, (r) => r.title.length > 0));
line(`titre ${TITLE_MIN}-${TITLE_MAX} car.`, per(rows, (r) => r.titleLen >= TITLE_MIN && r.titleLen <= TITLE_MAX));
line('meta description presente', per(rows, (r) => r.descLen > 0));
line(`meta description ${DESC_MIN}-${DESC_MAX} car.`, per(rows, (r) => r.descLen >= DESC_MIN && r.descLen <= DESC_MAX));
line('og:title + og:image + twitter:card', per(rows, (r) => r.ogTitle && r.ogImage && r.twitterCard));
line('images 100% avec alt', per(rows, (r) => r.images === 0 || r.imagesNoAlt === 0));

const dupTitles = duplicates(ok, 'title');
const dupDescs = duplicates(ok, 'description');
line('titres dupliques', `${dupTitles.length} groupes`);
for (const [value, n] of dupTitles.slice(0, 8)) console.log(`    x${n}  ${value.slice(0, 80)}`);
line('descriptions dupliquees', `${dupDescs.length} groupes`);

console.log('\n--- STRUCTURE / AEO ---');
line('au moins 1 JSON-LD', per(rows, (r) => r.schemas.length > 0));
line('JSON-LD invalide', `${ok.filter((r) => r.schemas.includes('INVALID_JSONLD')).length}`);
line('BreadcrumbList', per(rows, (r) => r.breadcrumbInHtml));
line('FAQPage', per(rows, (r) => r.schemas.includes('FAQPage')));
line('speakable', per(rows, (r) => r.speakable));
line('Organization / LocalBusiness', per(rows, (r) => r.schemas.some((s) => /Organization|LocalBusiness/.test(s))));
line('Product/Offer (interdit pricing)', `${ok.filter((r) => r.schemas.some((s) => /Product|Offer/.test(s))).length}`);
line(`contenu < ${THIN_WORDS} mots`, per(rows, (r) => r.words < THIN_WORDS));
line('>= 5 liens internes', per(rows, (r) => r.internalLinks >= 5));

const longest = (field, lenField) => [...ok].sort((a, b) => b[lenField] - a[lenField]).slice(0, 8);
console.log('\n--- TITRES LES PLUS LONGS ---');
for (const row of longest('title', 'titleLen')) console.log(`    ${String(row.titleLen).padStart(3)}  [${row.bucket}] ${row.title.slice(0, 95)}`);
console.log('\n--- DESCRIPTIONS LES PLUS LONGUES ---');
for (const row of longest('description', 'descLen')) console.log(`    ${String(row.descLen).padStart(3)}  [${row.bucket}] ${row.description.slice(0, 95)}`);
const shortDesc = ok.filter((r) => r.descLen > 0 && r.descLen < DESC_MIN).sort((a, b) => a.descLen - b.descLen);
console.log('\n--- DESCRIPTIONS LES PLUS COURTES ---');
for (const row of shortDesc.slice(0, 6)) console.log(`    ${String(row.descLen).padStart(3)}  [${row.bucket}] ${row.description.slice(0, 95)}`);
console.log('\n--- OG/TWITTER INCOMPLET (par type) ---');
const ogMissing = ok.filter((r) => !(r.ogTitle && r.ogImage && r.twitterCard));
for (const [bucket, n] of Object.entries(countBy(ogMissing, (r) => r.bucket)).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${bucket.padEnd(18)} ${n}/${ok.filter((r) => r.bucket === bucket).length}`);
}
console.log('\n--- BREADCRUMBLIST MANQUANT (par type) ---');
const bcMissing = ok.filter((r) => !r.breadcrumbInHtml);
for (const [bucket, n] of Object.entries(countBy(bcMissing, (r) => r.bucket)).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${bucket.padEnd(18)} ${n}/${ok.filter((r) => r.bucket === bucket).length}`);
}
if (process.argv.includes('--offenders')) {
    const report = (label, list) => {
        console.log(`\n--- ${label} (${list.length}) ---`);
        for (const row of list) console.log(`    ${row.url}`);
    };
    report('SANS og:image', ok.filter((r) => !r.ogImage));
    report('SANS BreadcrumbList', ok.filter((r) => !r.breadcrumbInHtml));
    report('SANS speakable', ok.filter((r) => !r.speakable));
    report('TITRE HORS NORME', ok.filter((r) => r.titleLen > TITLE_MAX || r.titleLen < TITLE_MIN));
    report('DESCRIPTION HORS NORME', ok.filter((r) => r.descLen > DESC_MAX));
}

console.log('\n--- PAGES MINCES (< 300 mots, par type) ---');
const thin = ok.filter((r) => r.words < THIN_WORDS);
for (const [bucket, n] of Object.entries(countBy(thin, (r) => r.bucket)).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${bucket.padEnd(18)} ${n}/${ok.filter((r) => r.bucket === bucket).length}`);
}
for (const row of [...thin].sort((a, b) => a.words - b.words).slice(0, 6)) {
    console.log(`    ${String(row.words).padStart(4)} mots  ${row.url}`);
}

console.log('\n--- PAR TYPE DE PAGE ---');
const buckets = [...new Set(ok.map((r) => r.bucket))];
for (const bucket of buckets) {
    const group = ok.filter((r) => r.bucket === bucket);
    const avg = (fn) => Math.round(group.reduce((sum, r) => sum + fn(r), 0) / group.length);
    const schemas = countBy(group, (r) => (r.schemas.length ? 'avec' : 'sans'));
    console.log(
        `  ${bucket.padEnd(18)} n=${String(group.length).padStart(4)}  titre≈${String(avg((r) => r.titleLen)).padStart(3)}  desc≈${String(avg((r) => r.descLen)).padStart(3)}  mots≈${String(avg((r) => r.words)).padStart(4)}  liens≈${String(avg((r) => r.internalLinks)).padStart(3)}  schema=${schemas.avec || 0}/${group.length}  og=${group.filter((r) => r.ogTitle && r.ogImage && r.twitterCard).length}/${group.length}  breadcrumb=${group.filter((r) => r.breadcrumbInHtml).length}/${group.length}  speakable=${group.filter((r) => r.speakable).length}/${group.length}  titres_trop_longs=${group.filter((r) => r.titleLen > TITLE_MAX).length}  minces=${group.filter((r) => r.words < THIN_WORDS).length}`,
    );
    const types = countBy(group.flatMap((r) => r.schemas), (s) => s);
    const top = Object.entries(types).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k, v]) => `${k}:${v}`).join(' ');
    console.log(`    ${top}`);
}
console.log('');
