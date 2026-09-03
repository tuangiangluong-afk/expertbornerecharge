import Link from "next/link";
import { SITES } from "@/lib/sites-config"; // Import SITES
import { CityConfig } from "@/lib/db";
import { SiteConfig } from "@/lib/sites-config";
import { getTheme } from "@/lib/theme";
import { Mail } from "lucide-react";

interface FooterProps {
    config: CityConfig | SiteConfig;
}

export function Footer({ config }: FooterProps) {
    if (!config) return null;

    // Normalize Data for both Config Types
    const neighborhoods = (config as any).neighborhoods || (config as any).quartiers || [];

    const theme = getTheme(config.slug);

    // Group UNIQUE sites by region for the Mega Footer Directory
    const uniqueSites = Array.from(
        new Map(Object.values(SITES).map(site => [site.slug, site])).values()
    );

    const sitesByRegion = uniqueSites
        .filter(site => site.slug !== 'home')
        .reduce((acc, site) => {
            const region = site.region || 'Autres Régions';
            if (!acc[region]) acc[region] = [];
            acc[region].push(site);
            return acc;
        }, {} as Record<string, SiteConfig[]>);

    // Varied Anchor Logic (Local SEO)
    const getGlobalDiverseAnchor = (cityName: string, index: number) => {
        const variations = [
            `Installation IRVE ${cityName}`,
            `Installateur borne ${cityName}`,
            `Borne de recharge ${cityName}`,
            `Devis IRVE ${cityName}`,
            `Électricien IRVE ${cityName}`,
            `${cityName} (Borne électrique)`
        ];
        return variations[index % variations.length];
    };

    return (
        <footer className="bg-neutral-900 border-t border-white/10 py-12 text-neutral-400">
            <div className="container mx-auto px-4 text-center">
                <h4 className="text-white font-bold mb-4">À propos de {config.name}</h4>
                <p className="max-w-2xl mx-auto text-sm mb-8">
                    {config.name} est le comparateur de référence pour l&apos;installation de bornes de recharge à {config.city}.
                    Nous sélectionnons les meilleurs électriciens certifiés IRVE pour vos projets en maison, copropriété ou entreprise.
                    Obtenez jusqu&apos;à 3 devis gratuits et comparez.
                </p>

                <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-800 px-4 py-2 rounded-full mb-8">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-green-400 font-bold text-sm">Réseau d&apos;Installateurs Qualifiés IRVE</span>
                </div>

                <div className="border-t border-white/10 pt-12 mt-12">
                    <div className="grid md:grid-cols-4 gap-8 text-left max-w-7xl mx-auto">
                        {/* Column 1: Zones / Quartiers */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">
                                {config.slug === 'home' ? 'Nos Régions' : 'Zones d\'Intervention'}
                            </h5>
                            <ul className="space-y-3 text-sm">
                                {config.slug === 'home' ? (
                                    // HUB: Show main regions
                                    <>
                                        <li><Link href="/ville/paris" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-blue-500 transition"></span>Île-de-France</Link></li>
                                        <li><Link href="/ville/lyon" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-blue-500 transition"></span>Auvergne-Rhône-Alpes</Link></li>
                                        <li><Link href="/ville/marseille" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-blue-500 transition"></span>Provence-Alpes-Côte d&apos;Azur</Link></li>
                                        <li><Link href="/ville/bordeaux" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-blue-500 transition"></span>Nouvelle-Aquitaine</Link></li>
                                        <li><Link href="/ville/toulouse" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-blue-500 transition"></span>Occitanie</Link></li>
                                        <li><Link href="/ville/nantes" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-blue-500 transition"></span>Pays de la Loire</Link></li>
                                        <li><Link href="/ville/pays-de-gex" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-blue-500 transition"></span>Pays de Gex (Ain / Suisse)</Link></li>
                                    </>
                                ) : (
                                    // LOCAL: Show neighborhoods
                                    <>
                                        {neighborhoods.slice(0, 6).map((zone: string) => (
                                            <li key={zone}>
                                                <Link href={`#simulateur`} className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                                    <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                                    {zone}
                                                </Link>
                                            </li>
                                        ))}
                                        {neighborhoods.length === 0 && (
                                            <li className="text-neutral-500 italic">Tout {config.city} et agglomération</li>
                                        )}
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* Column 2: Smart Network (New SEO Mesh) */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">
                                {(() => {
                                    if (config.slug === 'home') return 'Notre Réseau';

                                    // RE-USE EXACT LOGIC as below to determine title
                                    const uniqueSitesMap = new Map();
                                    Object.values(SITES).forEach(site => {
                                        if (site.slug !== 'home' && site.slug !== config.slug) {
                                            uniqueSitesMap.set(site.slug, site);
                                        }
                                    });
                                    const uniqueSites = Array.from(uniqueSitesMap.values());
                                    const currentSite = config as SiteConfig;

                                    // DEBUG: Why is Lille seeing neighbors?
                                    // Filter sites that match strictly
                                    const strictNeighbors = uniqueSites.filter(s => {
                                        if (!s.department || !currentSite.department) return false; // Safety
                                        const sameDept = s.department === currentSite.department;
                                        const sameRegion = s.region && currentSite.region && s.region === currentSite.region;
                                        return sameDept || sameRegion;
                                    });

                                    const hasLocal = strictNeighbors.length > 0;

                                    if (config.slug === 'bornerechargelille') {
                                        console.log(`[FOOTER DEBUG] Lille Neighbors Found: ${strictNeighbors.length}`);
                                        if (strictNeighbors.length > 0) {
                                            console.log(`[FOOTER DEBUG] Neighbors: ${strictNeighbors.map(s => s.slug).join(', ')}`);
                                        }
                                    }

                                    return hasLocal ? 'À proximité' : 'Notre Réseau';
                                })()}
                            </h5>
                            <ul className="space-y-3 text-sm">
                                {(() => {
                                    // 1. Get UNIQUE sites
                                    const uniqueSitesMap = new Map();
                                    Object.values(SITES).forEach(site => {
                                        if (site.slug !== 'home' && site.slug !== config.slug) {
                                            uniqueSitesMap.set(site.slug, site);
                                        }
                                    });
                                    const uniqueSites = Array.from(uniqueSitesMap.values());

                                    let nearbySites = [];
                                    const currentSite = config as SiteConfig;

                                    if (config.slug === 'home') {
                                        // HUB: Top Cities
                                        const topSlugs = ['paris', 'marseille', 'lyon', 'bordeaux', 'nice'];
                                        nearbySites = uniqueSites.filter(s => topSlugs.includes(s.slug));
                                    } else {
                                        // LOCAL Attempt
                                        const sameDept = uniqueSites.filter(s => s.department === currentSite.department);
                                        const sameRegion = uniqueSites.filter(s => s.region === currentSite.region && s.department !== currentSite.department);

                                        const hasTrueLocal = sameDept.length > 0 || sameRegion.length > 0;

                                        if (hasTrueLocal) {
                                            // Normal "Nearby" behavior
                                            const combined = [...sameDept, ...sameRegion, ...uniqueSites];
                                            const seen = new Set();
                                            for (const s of combined) {
                                                if (!seen.has(s.slug) && nearbySites.length < 5) {
                                                    seen.add(s.slug);
                                                    nearbySites.push(s);
                                                }
                                            }
                                        } else {
                                            // ISOLATED CITY (e.g. Lille) -> Fallback to National Top Cities
                                            // This ensures we don't show "À proximité" title with unrelated cities
                                            const topSlugs = ['paris', 'lyon', 'bordeaux', 'toulouse', 'nice'];
                                            nearbySites = uniqueSites.filter(s => topSlugs.includes(s.slug));

                                            // If we still need more, fill with randoms
                                            if (nearbySites.length < 5) {
                                                const others = uniqueSites.filter(s => !topSlugs.includes(s.slug)).slice(0, 5 - nearbySites.length);
                                                nearbySites = [...nearbySites, ...others];
                                            }
                                        }
                                    }

                                    // 2. Varied Anchor Logic (Prevent Over-Optimization)
                                    const getVariedFooterAnchor = (cityName: string, index: number, isLocal: boolean) => {
                                        if (isLocal) return `Agence ${cityName}`;

                                        const variations = [
                                            `Installation borne ${cityName}`,
                                            `Expert IRVE ${cityName}`,
                                            `Borne recharge ${cityName}`,
                                            `Installateur ${cityName}`,
                                            `Agence ${cityName}`
                                        ];
                                        return variations[index % variations.length];
                                    };

                                    return nearbySites.map((site, index) => (
                                        <li key={site.slug}>
                                            <Link
                                                href={site.domain ? `https://${site.domain}/` : `https://expertbornerecharge.com/ville/${site.slug}`}
                                                target={site.domain ? "_blank" : undefined}
                                                rel={site.domain ? "noopener noreferrer" : undefined}
                                                className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"
                                            >
                                                <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                                {/* Smart Mesh Logic in Footer */}
                                                {getVariedFooterAnchor(
                                                    site.city,
                                                    index,
                                                    (config.slug !== 'home' && site.department === (config as SiteConfig).department)
                                                )}
                                            </Link>
                                        </li>
                                    ));
                                })()}
                            </ul>
                        </div>

                        {/* Column 3: Guides & Comparatifs GSC Targets */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Guides Techniques & Avis</h5>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link href="/guides/tesla-wall-connector-installation-france" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Tesla Wall Connector (Installation & Prix)
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides/recharger-tesla-domicile" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Recharger sa Tesla à Domicile
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides/schneider-evlink-pro-ac-installation" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Schneider EVlink Pro AC : Avis & Pose
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides/comparatif-wallbox-schneider-legrand" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Comparatif Wallbox Schneider vs Legrand
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides/cout-installation-borne-recharge" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Coût Installation Borne de Recharge 2026
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        <strong>Tous nos Guides AEO & IRVE</strong>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Contact */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Marques à la Une</h5>
                            <ul className="space-y-3 text-sm mb-8">
                                {[
                                    { name: "Tesla", slug: "tesla" },
                                    { name: "Renault", slug: "renault" },
                                    { name: "Peugeot", slug: "peugeot" },
                                    { name: "BMW", slug: "bmw" },
                                    { name: "Audi", slug: "audi" },
                                ].map((brand) => (
                                    <li key={brand.slug}>
                                        <Link href={`https://expertbornerecharge.com/installation/${brand.slug}`} className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                            <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                            Borne {brand.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Contact</h5>
                            <ul className="space-y-6">
                                <li>
                                    <Link href="/contact" className="flex items-start gap-4 text-neutral-400 hover:text-white transition group text-left">
                                        <div className={`p-2 rounded-lg bg-white/5 group-hover:${theme.classes.bg} transition group-hover:text-neutral-900`}>
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <span className="block text-white font-bold text-lg">Nous écrire</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* MEGA FOOTER - DIRECTORY SEO (CLEAN, WHITE-HAT, REGIONAL) */}
                {/* ========================================================= */}
                <div className="border-t border-white/10 pt-12 mt-4 text-left max-w-7xl mx-auto mb-16 px-4 md:px-0">
                    <h5 className="text-white font-bold mb-8 text-xl tracking-tight text-center md:text-left">
                        Notre Réseau National d&apos;Installateurs
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {Object.entries(sitesByRegion).map(([region, sites]) => (
                            <div key={region} className="space-y-4">
                                <h6 className="text-white/80 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
                                    {region}
                                </h6>
                                <ul className="space-y-3 text-sm">
                                    {sites.map((site, index) => (
                                        <li key={site.slug}>
                                            <Link
                                                href={site.domain ? `https://${site.domain}/` : `https://expertbornerecharge.com/ville/${site.slug}`}
                                                target={site.domain ? "_blank" : undefined}
                                                rel={site.domain ? "noopener noreferrer" : undefined}
                                                className="text-neutral-400 hover:text-white transition flex items-center gap-2 group"
                                            >
                                                <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                                {getGlobalDiverseAnchor(site.city, index)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-xs border-t border-white/10 pt-8">
                    &copy; {new Date().getFullYear()} {config.name} - Tous droits réservés.
                </div>
                <div className="flex justify-center gap-4 text-xs mt-4 mb-2">
                    <Link href={(config as any).basePath ? `${(config as any).basePath}/mentions-legales` : "/mentions-legales"} className="text-neutral-500 hover:text-white transition-colors">Mentions Légales</Link>
                    <span className="text-neutral-700">•</span>
                    <Link href={(config as any).basePath ? `${(config as any).basePath}/cgv` : "/cgv"} className="text-neutral-500 hover:text-white transition-colors">CGV</Link>
                </div>
            </div>
        </footer>
    );
}
