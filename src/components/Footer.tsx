import { CityConfig } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import Link from "next/link";

interface FooterProps {
    config: CityConfig;
}

export function Footer({ config }: FooterProps) {
    // Fetch Dynamic Content (POIs) from Static Config (db.ts)
    // This ensures content is always present even if DB is empty
    const hotels = config.points_of_interest?.hotels || [];
    const nightlife = config.points_of_interest?.nightlife || [];

    return (
        <footer className="bg-neutral-900 border-t border-white/10 py-12 text-neutral-400">
            <div className="container mx-auto px-4 text-center">
                <h4 className="text-white font-bold mb-4">À propos de {config.name}</h4>
                <footer className="bg-neutral-900 border-t border-white/10 text-neutral-400 py-12 relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Taxi {config.city}
                            </h2>
                            <p className="max-w-md mx-auto">
                                Service de transport 24/7. Gare, Aéroport, Médical.
                                <br />
                                Partenaire du réseau TaxiFrance.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 text-left mb-8 max-w-2xl mx-auto border-t border-white/10 pt-8 mt-8">
                            <span className="text-neutral-700">•</span>
                            <Link href="/cgv" className="text-neutral-500 hover:text-white transition-colors">CGV</Link>
                        </div>
                    </div>
                </footer>
                );
}
