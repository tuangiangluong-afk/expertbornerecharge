import { createSupabaseServerClient } from "@/lib/supabase-server";
import { slugify } from "@/lib/slugify";
import Link from "next/link";

interface FooterProps {
    tenantId: string;
    city: string;
    siteName: string;
}

export async function Footer({ tenantId, city, siteName }: FooterProps) {
    const supabase = await createSupabaseServerClient();

    // Fetch Dynamic Content (POIs)
    const { data: pois } = await supabase
        .from("pois")
        .select("*")
        .eq("tenant_id", tenantId);

    const poisList = pois || [];
    const hotels = poisList.filter((p: { type?: string }) => p.type === 'hotel').map((p: { name: string }) => p.name);
    const nightlife = poisList.filter((p: { type?: string }) => p.type === 'nightlife').map((p: { name: string }) => p.name);

    return (
        <footer className="bg-neutral-900 border-t border-white/10 py-12 text-neutral-400">
            <div className="container mx-auto px-4 text-center">
                <h4 className="text-white font-bold mb-4">À propos de {siteName}</h4>
                <p className="max-w-2xl mx-auto text-sm mb-8">
                    {siteName} est un service de mise en relation avec les meilleurs artisans taxis de {city}.
                    Nous garantissons un service de qualité, une ponctualité exemplaire et des tarifs réglementés.
                    Partenaire du réseau <a href="http://taxifrance.fr" className="text-white hover:underline">TaxiFrance</a>.
                </p>
                <div className="grid md:grid-cols-2 gap-8 text-left mb-8 max-w-2xl mx-auto border-t border-white/10 pt-8 mt-8">
                    <div>
                        <h5 className="text-white font-bold mb-4">Destinations Populaires</h5>
                        <ul className="space-y-2 text-sm">
                            {hotels.slice(0, 5).map((poi: string) => (
                                <li key={poi}>
                                    <Link href={`/guides/${slugify(poi)}`} className="hover:text-yellow-400 transition">
                                        Taxi vers {poi}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white font-bold mb-4">Sortir à {city}</h5>
                        <ul className="space-y-2 text-sm">
                            {nightlife.slice(0, 5).map((poi: string) => (
                                <li key={poi}>
                                    <Link href={`/guides/${slugify(poi)}`} className="hover:text-yellow-400 transition">
                                        Taxi pour {poi}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="text-xs border-t border-white/10 pt-8">
                    &copy; {new Date().getFullYear()} {siteName} - Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
