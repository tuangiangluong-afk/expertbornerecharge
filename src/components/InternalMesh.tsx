import Link from "next/link";
import { SEO_SERVICES } from "@/lib/seo-data";
import { SEO_ROUTES } from "@/lib/seo-routes";
import { NATIONAL_CONFIG } from "@/config/national";
import { slugify } from "@/lib/slugify";

export function InternalMesh() {
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
                                    <Link href={`/service/${s.slug}`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                        {s.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 2. Top Liaisons (Trajets) */}
                    <div className="md:col-span-2">
                        <h4 className="text-white font-bold mb-6 text-lg">Liaisons Longue Distance</h4>
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                            {SEO_ROUTES.slice(0, 10).map(r => (
                                <div key={r.slug}>
                                    <Link href={`/trajet/${r.slug}`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                                        Taxi {r.start} - {r.end}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. Destinations (Guides) */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Destinations Phares</h4>
                        <ul className="space-y-3">
                            {NATIONAL_CONFIG.points_of_interest.monuments.slice(0, 5).map(m => (
                                <li key={m}>
                                    <Link href={`/guides/${slugify(m)}`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                                        Taxi {m}
                                    </Link>
                                </li>
                            ))}
                            {NATIONAL_CONFIG.points_of_interest.nightlife.slice(0, 3).map(n => (
                                <li key={n}>
                                    <Link href={`/guides/${slugify(n)}`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
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
