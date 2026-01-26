import Link from "next/link";
import { SEO_SERVICES } from "@/lib/seo-data";
import { SEO_ROUTES } from "@/lib/seo-routes";
import { NATIONAL_CONFIG } from "@/config/national";
import { slugify } from "@/lib/slugify";
import { CityConfig } from "@/lib/db";

interface InternalMeshProps {
    city?: string;
    config?: CityConfig;
}

export function InternalMesh({ city, config }: InternalMeshProps) {
    // 1. Contextual Routes (Geo-filtered)
    const filteredRoutes = city
        ? SEO_ROUTES.filter(r => r.start.includes(city) || r.end.includes(city) || r.slug.includes(slugify(city)))
        : SEO_ROUTES.slice(0, 10);
    const finalRoutes = filteredRoutes.length > 0 ? filteredRoutes : SEO_ROUTES.slice(0, 8);

    // 2. Contextual POIs (Local Monuments vs National Fallback)
    const monuments = config?.points_of_interest?.monuments.length
        ? config.points_of_interest.monuments.slice(0, 5) // Show top 5 local monuments
        : NATIONAL_CONFIG.points_of_interest.monuments.slice(0, 5); // Fallback to Paris monuments if no local data

    // Use neighborhoods or nightlife as secondary column
    const secondaryPois = config?.neighborhoods?.length
        ? config.neighborhoods.slice(0, 3)
        : NATIONAL_CONFIG.points_of_interest.nightlife.slice(0, 3);

    return (
        <section className="bg-neutral-900 border-t border-white/5 py-16 px-6">
            <div className="mx-auto max-w-7xl">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* 1. Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Nos Services</h4>
                        <ul className="space-y-3">
                            {SEO_SERVICES.map(s => (
                                <li key={s.slug}>
                                    <Link href={`/${s.slug}`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                        {s.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 2. Top Liaisons (Trajets) */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Trajets Fréquents</h4>
                        <ul className="space-y-3">
                            {finalRoutes.map(route => (
                                <li key={route.slug}>
                                    <Link href={`/trajet/${route.slug}`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                                        Taxi {route.start} - {route.end}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Guide Local (Smart Context) */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">
                            {config ? `À voir à ${config.city}` : "Destinations Phares"}
                        </h4>
                        <ul className="space-y-3">
                            {monuments.map(m => (
                                <li key={m}>
                                    <Link href={config?.slug.includes('taxi-') ? `/guides/${slugify(m)}` : `/guides/${slugify(m)}`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                                        Taxi {m}
                                    </Link>
                                </li>
                            ))}
                            {secondaryPois.map(n => (
                                <li key={n}>
                                    <Link href={`/quartier/${slugify(n)}`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                                        Taxi {n}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

