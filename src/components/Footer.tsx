import Link from "next/link";
import { CityConfig } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import CallButton from "@/components/CallButton";
import { Phone, Mail } from "lucide-react";

import { getTheme } from "@/lib/theme";

import { SEO_DESTINATIONS } from "@/lib/seo-data";

interface FooterProps {
    config: CityConfig;
}

export function Footer({ config }: FooterProps) {
    if (!config) return null;

    // Fetch Dynamic Content (POIs) from Static Config (db.ts)
    const hotels = config.points_of_interest?.hotels || [];
    const nightlife = config.points_of_interest?.nightlife || [];
    const theme = getTheme(config.slug);

    return (
        <footer className="bg-neutral-900 border-t border-white/10 py-12 text-neutral-400">
            <div className="container mx-auto px-4 text-center">
                <h4 className="text-white font-bold mb-4">À propos de {config.name}</h4>
                <p className="max-w-2xl mx-auto text-sm mb-8">
                    {config.name} est un service de mise en relation avec les meilleurs artisans taxis de {config.city}.
                    Nous garantissons un service de qualité, une ponctualité exemplaire et des tarifs réglementés.
                    Partenaire du réseau TaxiFrance.
                </p>

                <div className="border-t border-white/10 pt-12 mt-12">
                    <div className="grid md:grid-cols-3 gap-12 text-left max-w-6xl mx-auto">
                        {/* Column 1: Destinations */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Destinations Populaires</h5>
                            <ul className="space-y-3 text-sm">
                                {SEO_DESTINATIONS.map((dest) => (
                                    <li key={dest.slug}>
                                        <Link href={`/tarif/${dest.slug}`} className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                            <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                            Taxi {dest.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2: Nightlife / POI */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Sortir à {config.city}</h5>
                            <ul className="space-y-3 text-sm">
                                {nightlife.slice(0, 5).map((poi: string) => (
                                    <li key={poi}>
                                        <Link href={`/guides/${slugify(poi)}`} className="text-neutral-400 hover:text-white transition flex items-center gap-2 group">
                                            <span className={`w-1 h-1 rounded-full bg-neutral-600 group-hover:${theme.classes.bg} transition`}></span>
                                            Taxi pour {poi}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Contact */}
                        <div>
                            <h5 className="text-white font-bold mb-6 text-lg tracking-tight">Contact</h5>
                            <ul className="space-y-6">
                                <li>
                                    <CallButton
                                        phoneNumber={config.phoneNumber}
                                        cityName={config.city}
                                        theme={theme}
                                        className="flex items-start gap-4 text-neutral-400 hover:text-white transition group text-left"
                                    >
                                        <div className={`p-2 rounded-lg bg-white/5 group-hover:${theme.classes.bg} transition group-hover:text-neutral-900`}>
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <span className="block text-white font-bold text-lg mb-1">{config.phoneNumber}</span>
                                            <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Disponible 24h/7j</span>
                                        </div>
                                    </CallButton>
                                </li>
                                <li>
                                    <Link href="/contact" className="flex items-start gap-4 text-neutral-400 hover:text-white transition group text-left">
                                        <div className={`p-2 rounded-lg bg-white/5 group-hover:${theme.classes.bg} transition group-hover:text-neutral-900`}>
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <span className="block text-white font-bold text-lg mb-1">Nous écrire</span>
                                            <span className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Réponse rapide</span>
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
