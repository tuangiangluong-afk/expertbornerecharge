import type { CityConfig } from "@/lib/db";

/**
 * BLOC DE PREUVE ÉDITORIALE (sources, auteur, date)
 * =================================================
 * POURQUOI CE COMPOSANT EXISTE
 * ----------------------------
 * Les pages villes portent l'essentiel du trafic, mais elles ne citaient
 * aucune source, ne nommaient aucun auteur et n'affichaient aucune date de
 * révision. C'est exactement ce qu'un moteur de recherche ou un moteur de
 * réponse vérifie avant de citer une page : d'où vient le chiffre, qui l'a
 * écrit, et quand cela a-t-il été revu.
 *
 * Ici : les textes et organismes officiels réellement utilisés pour rédiger la
 * page sont cités, l'éditeur est nommé, la date de dernière révision est
 * affichée, et le tout est déclaré en Schema.org (`citation`, `author`,
 * `dateModified`) pour que les moteurs de réponse puissent le lire.
 *
 * IMPORTANT : `CONTENT_UPDATED` doit être mis à jour à la main, uniquement
 * quand le fond de la page change réellement. Ne jamais la faire bouger à
 * chaque déploiement : une date qui change sans que le contenu change est un
 * faux signal de fraîcheur.
 */

const BRAND = "Expert Borne Recharge";
const BASE = "https://expertbornerecharge.com";

const CONTENT_UPDATED = "2026-09-16";
const CONTENT_UPDATED_LABEL = "16 septembre 2026";

const SOURCES: { label: string; url: string; note: string }[] = [
    { label: "Code de la construction et de l'habitation — Légifrance", url: "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006074096", note: "pré-équipement des parkings et droit à la prise" },
    { label: "Programme ADVENIR", url: "https://advenir.mobi/", note: "aides au financement des infrastructures de recharge" },
    { label: "Enedis", url: "https://www.enedis.fr/", note: "raccordement au réseau de distribution et puissance disponible" },
    { label: "Consuel", url: "https://www.consuel.com/", note: "attestation de conformité des installations électriques" },
    { label: "Service-Public.fr", url: "https://www.service-public.fr/", note: "crédit d'impôt, TVA applicable et démarches en copropriété" },
];

const METHOD =
    "Les obligations citées renvoient à la loi LOM, au décret relatif au droit à la prise et au référentiel IRVE. Les fourchettes de prix correspondent aux installations constatées sur le marché local, hors travaux de génie civil et hors modification de puissance souscrite. La conformité finale dépend de l'état de l'installation électrique existante, vérifié à la visite technique.";

export default function LocalSources({
    site,
    url,
    path,
}: {
    site: CityConfig;
    /** URL canonique exacte de la page (pages villes x marques, B2B...) */
    url?: string;
    /** Chemin relatif au site, si l'URL absolue n'est pas connue de l'appelant */
    path?: string;
}) {
    const pageUrl = url ?? `${BASE}${path ?? `/ville/${site.slug}`}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Borne de recharge à ${site.city}`,
        url: pageUrl,
        inLanguage: "fr-FR",
        isPartOf: { "@type": "WebSite", name: BRAND, url: BASE },
        author: { "@type": "Organization", name: BRAND, url: BASE },
        publisher: { "@type": "Organization", name: BRAND, url: BASE },
        dateModified: CONTENT_UPDATED,
        citation: SOURCES.map((s) => ({
            "@type": "WebPage",
            name: s.label,
            url: s.url,
        })),
    };

    return (
        <section className="py-12 bg-white border-t border-slate-200" aria-labelledby="sources-title">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="sources-title" className="text-2xl font-bold text-slate-900 mb-4">
                    Sources et méthode
                </h2>

                <p className="text-sm text-slate-600 mb-6">
                    Page rédigée par l&apos;équipe éditoriale de <strong>{BRAND}</strong>
                    {site.city ? ` pour ${site.city}` : ""}. Dernière révision :{" "}
                    <time dateTime={CONTENT_UPDATED}>{CONTENT_UPDATED_LABEL}</time>.
                </p>

                <ul className="space-y-3 mb-6">
                    {SOURCES.map((s) => (
                        <li key={s.url} className="text-sm text-slate-700 leading-relaxed">
                            <a
                                href={s.url}
                                target="_blank"
                                rel="noopener"
                                className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-900"
                            >
                                {s.label}
                            </a>
                            <span className="text-slate-500"> — {s.note}</span>
                        </li>
                    ))}
                </ul>

                <p className="text-xs text-slate-500 leading-relaxed">{METHOD}</p>
            </div>
        </section>
    );
}
