/**
 * Normes d'affichage SERP, appliquées à toutes les pages.
 *
 * POURQUOI CE FICHIER
 * -------------------
 * Les titres et descriptions étaient assemblés par les générateurs pSEO puis
 * envoyés tels quels. Résultat mesuré sur les 530 URLs du sitemap : 295 titres
 * au-delà de 62 caractères (jusqu'à 127 sur les articles) et 291 descriptions
 * au-delà de 160. Google coupe ce qui dépasse, mais la coupe tombe au milieu
 * d'un mot et fait perdre le mot-clé de fin.
 *
 * On coupe donc ici, à la frontière de mot, au lieu de laisser le moteur
 * trancher : le début de la chaîne — qui contient la ville et la marque — est
 * conservé, seule la queue est rognée.
 */

/** Au-delà, le titre est tronqué dans les résultats Google. */
export const TITLE_MAX = 62;

/** Au-delà, la description est tronquée dans les résultats Google. */
export const DESCRIPTION_MAX = 160;

const OG_IMAGE_PATH = "/api/og";

/** Espaces multiples et espaces insécables parasites normalisés. */
function normalize(value: string): string {
    return (value || "").replace(/[\s\u00a0\u202f]+/g, " ").trim();
}

/**
 * Coupe une chaîne à la dernière frontière de mot avant `max`, puis retire les
 * séparateurs orphelins (« | », « - », « , »…) laissés par la coupe.
 */
function cut(value: string, max: number): string {
    if (value.length <= max) return value;

    const window = value.slice(0, max);
    const lastSpace = window.lastIndexOf(" ");
    const head = (lastSpace > Math.floor(max * 0.5) ? window.slice(0, lastSpace) : window)
        .replace(/[\s|·•,;:/\-–—]+$/u, "")
        .trim();

    return head || window.trim();
}

/**
 * Titre de page conforme SERP. Un titre plus court que la norme est conservé
 * tel quel : on n'allonge jamais artificiellement.
 */
export function clampTitle(value: string, max: number = TITLE_MAX): string {
    return cut(normalize(value), max);
}

/**
 * Meta description conforme SERP. Si une coupe a lieu, un caractère de
 * suspension est ajouté (il compte dans la norme).
 */
export function clampDescription(value: string, max: number = DESCRIPTION_MAX): string {
    const text = normalize(value);
    if (text.length <= max) return text;

    const head = cut(text, max - 1);
    return head.length < text.length ? `${head}\u2026` : head;
}

/**
 * Carte Open Graph servie par /api/og. `q` est le grand libellé (ville, marque,
 * modèle), `sub` l'accroche secondaire.
 */
export function ogImageUrl(
    params: { q?: string; sub?: string; baseUrl?: string } = {},
): string {
    const baseUrl = (params.baseUrl || "https://expertbornerecharge.com").replace(/\/$/, "");
    const search = new URLSearchParams();
    // Bornes identiques à celles appliquées par /api/og (q sur le grand
    // libellé, sub sur l'accroche) : sinon l'image est rognée en silence.
    if (params.q) search.set("q", params.q.slice(0, 48));
    if (params.sub) search.set("sub", params.sub.slice(0, 92));
    const query = search.toString();

    return `${baseUrl}${OG_IMAGE_PATH}${query ? `?${query}` : ""}`;
}

/**
 * Balisage BreadcrumbList. Doit refléter un fil d'Ariane visible sur la page.
 */
export function breadcrumbList(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Fragment `speakable` pour les assistants vocaux et les résumés IA.
 * Les sélecteurs visent le premier paragraphe et les intertitres, qui
 * contiennent la réponse courte attendue par un moteur de réponse.
 */
export function speakableSpecification(
    cssSelector: string[] = ["h1", "article p:first-of-type", "article h2"],
) {
    return {
        "@type": "SpeakableSpecification",
        cssSelector,
    };
}
