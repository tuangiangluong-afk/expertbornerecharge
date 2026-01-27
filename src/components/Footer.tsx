import Link from "next/link";
import { SITES } from "@/lib/sites-config"; // Import SITES
import { CityConfig } from "@/lib/db";
import { SiteConfig } from "@/lib/sites-config";
import { slugify } from "@/lib/slugify";
import CallButton from "@/components/CallButton";
import { Phone, Mail } from "lucide-react";

import { getTheme } from "@/lib/theme";

import { SEO_DESTINATIONS } from "@/lib/seo-data";

interface FooterProps {
    config: CityConfig | SiteConfig;
}

export function Footer({ config }: FooterProps) {
    if (!config) return null;

    // Normalize Data for both Config Types
    const neighborhoods = (config as any).neighborhoods || (config as any).quartiers || [];
    const poi = (config as any).points_of_interest || {};
    const hotels = poi.hotels || [];
    const nightlife = poi.nightlife || [];

    const theme = getTheme(config.slug);

    return (
        <footer className="bg-neutral-900 border-t border-white/10 py-12 text-neutral-400">
            <div className="container mx-auto px-4 text-center">
                <h4 className="text-white font-bold mb-4">À propos de {config.name}</h4>
                <p className="max-w-2xl mx-auto text-sm mb-8">
                    {config.name} est le comparateur de référence pour l'installation de bornes de recharge à {config.city}.
                    Nous sélectionnons les meilleurs électriciens certifiés IRVE pour vos projets en maison, copropriété ou entreprise.
                    Obtenez jusqu'à 3 devis gratuits et comparez.
                </p>

                <div className="border-t border-white/10 pt-12 mt-12">
                    <div className="grid md:grid-cols-4 gap-8 text-left max-w-7xl mx-auto">
                        {/* Column 1: Zones / Quartiers */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Zones d'Intervention</h5>
                            <ul className="space-y-3 text-sm">
                                {neighborhoods.slice(0, 6).map((zone: string) => (
                                    <li key={zone}>
                                        <Link href={`/ville/${config.slug}#simulateur`} className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                            <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                            {zone}
                                        </Link>
                                    </li>
                                ))}
                                {neighborhoods.length === 0 && (
                                    <li className="text-neutral-500 italic">Tout {config.city} et agglomération</li>
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
                                        const topSlugs = ['bornerechargeparis', 'bornerechargemarseille', 'bornerechargelyon', 'bornerechargebordeaux', 'bornerechargenice'];
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
                                            const topSlugs = ['bornerechargeparis', 'bornerechargelyon', 'bornerechargebordeaux', 'bornerechargetoulouse', 'bornerechargenice'];
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
                                            <Link href={`/ville/${slugify(site.city)}`} className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
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

                        {/* Column 3: Services EV */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Nos Solutions</h5>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link href="/guides/installation-borne-recharge-copropriete" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Borne en Copropriété
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides/cout-installation-borne-recharge" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Tarifs Installation
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides/aides-subventions-borne-recharge" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Aides & Subventions
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/vehicules" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Véhicules & Modèles
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                        <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                        Devenir Partenaire
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Contact */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Contact</h5>
                            <ul className="space-y-6">
                                <li>
                                    <Link href="/contact" className="flex items-start gap-4 text-neutral-400 hover:text-white transition group text-left">
                                        <div className={`p-2 rounded-lg bg-white/5 group-hover:${theme.classes.bg} transition group-hover:text-neutral-900`}>
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <span className="block text-white font-bold text-lg mb-1">Nous écrire</span>
                                            <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Réponse sous 12h</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="text-xs border-t border-white/10 pt-8">
                    &copy; {new Date().getFullYear()} {config.name} - Tous droits réservés.
                </div>
                <div className="flex justify-center gap-4 text-xs mt-4 mb-2">
                    <Link href="/mentions-legales" className="text-neutral-500 hover:text-white transition-colors">Mentions Légales</Link>
                    <span className="text-neutral-700">•</span>
                    <Link href="/cgv" className="text-neutral-500 hover:text-white transition-colors">CGV</Link>
                </div>
            </div>
        </footer>
    );
}
