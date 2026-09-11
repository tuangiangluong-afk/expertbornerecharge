import Link from "next/link";
import { SITES } from "@/lib/sites-config"; // Import SITES
import { CityConfig } from "@/lib/db";
import { SiteConfig } from "@/lib/sites-config";
import { getTheme } from "@/lib/theme";
import { Mail } from "lucide-react";
import { AiSummarizeSection } from "./AiSummarizeSection";

interface FooterProps {
    config: CityConfig | SiteConfig;
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    );
}

function TikTokIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
        </svg>
    );
}

function YouTubeIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

const SOCIAL_NETWORKS = {
    instagram: "https://www.instagram.com/expertbornerecharge",
    tiktok: "https://www.tiktok.com/@expertbornerecharge",
    youtube: "https://www.youtube.com/@ExpertBorneRecharge",
    facebook: "https://www.facebook.com/expertbornereharge"
};

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

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <h6 className="text-white font-bold mb-3 text-sm tracking-tight">Suivez-nous</h6>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={SOCIAL_NETWORKS.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram Expert Borne Recharge"
                                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#E4405F] hover:border-[#E4405F] transition-all duration-200 hover:scale-110 shadow-sm"
                                    >
                                        <InstagramIcon className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={SOCIAL_NETWORKS.tiktok}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="TikTok Expert Borne Recharge"
                                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-[#00F2FE] hover:border-[#00F2FE] transition-all duration-200 hover:scale-110 shadow-sm"
                                    >
                                        <TikTokIcon className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={SOCIAL_NETWORKS.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="YouTube Expert Borne Recharge"
                                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-200 hover:scale-110 shadow-sm"
                                    >
                                        <YouTubeIcon className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={SOCIAL_NETWORKS.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook Expert Borne Recharge"
                                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200 hover:scale-110 shadow-sm"
                                    >
                                        <FacebookIcon className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
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

                <AiSummarizeSection brandName={config.name} />
                <div className="text-xs pt-4">
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
