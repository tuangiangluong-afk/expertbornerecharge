import Link from "next/link";
import { SEO_SERVICES } from "@/lib/seo-data";
import { SEO_ROUTES } from "@/lib/seo-routes";
import { NATIONAL_CONFIG } from "@/config/national";
import { slugify } from "@/lib/slugify";
import { SiteConfig } from "@/lib/sites-config";
import { CityConfig } from "@/lib/db";
import { getNearbyCities } from "@/lib/geo";
import { brands } from "@/data/brands";

interface InternalMeshProps {
    city?: string;
    config?: CityConfig | SiteConfig;
}

export function InternalMesh({ city, config }: InternalMeshProps) {
    // 1. Contextual Routes (Geo-filtered)
    const filteredRoutes = city
        ? SEO_ROUTES.filter(r => r.start.includes(city) || r.end.includes(city) || r.slug.includes(slugify(city)))
        : SEO_ROUTES.slice(0, 10);
    const finalRoutes = filteredRoutes.length > 0 ? filteredRoutes : SEO_ROUTES.slice(0, 8);

    // 2. Contextual POIs (Local Monuments vs National Fallback)
    const poi = (config as any)?.points_of_interest || {};
    const neighborhoods = (config as any)?.neighborhoods || (config as any)?.quartiers || [];

    const monuments = poi.monuments?.length
        ? poi.monuments.slice(0, 5)
        : NATIONAL_CONFIG.points_of_interest.monuments.slice(0, 5);

    const secondaryPois = neighborhoods.length
        ? neighborhoods.slice(0, 3)
        : NATIONAL_CONFIG.points_of_interest.nightlife.slice(0, 3);

    // 3. Deep Mesh (Geo-Spatial) & Deduplication
    const rawNearby = config ? getNearbyCities(config.slug, 12) : [];
    const slugs = new Set();
    const nearbyCities = rawNearby.filter(city => {
        if (slugs.has(city.slug)) return false;
        slugs.add(city.slug);
        return true;
    });

    // Varied Anchor Logic
    function getVariedAnchor(name: string, index: number) {
        const variations = [
            `Installation IRVE ${name}`,
            `Installateur borne ${name}`,
            `Devis borne recharge ${name}`,
            `Électricien IRVE ${name}`,
            `Borne électrique ${name}`,
            `Entreprise IRVE ${name}`
        ];
        return variations[index % variations.length];
    }

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
                                    <a href={`/service/${s.slug}`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 2. Villes à Proximité */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Agences à Proximité</h4>
                        <ul className="space-y-3">
                            {nearbyCities.slice(0, 6).map((city, i) => (
                                <li key={city.slug}>
                                    <Link
                                        href={city.domain ? `https://${city.domain}/` : `https://expertbornerecharge.com/ville/${city.slug}`}
                                        className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2"
                                    >
                                        <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                                        {getVariedAnchor(city.city, i)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Quartiers / Zones (SEO Local) */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">
                            {config ? `Quartiers de ${config.city}` : "Zones d'intervention"}
                        </h4>
                        <ul className="space-y-3">
                            {neighborhoods.slice(0, 8).map((quartier: string, i: number) => (
                                <li key={quartier}>
                                    <Link href={`/quartier/${slugify(quartier)}`} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                                        {getVariedAnchor(quartier, i + 2)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Véhicules Compatibles — Dynamic from brands.ts (NO hardcode) */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">
                            {config ? "Véhicules Compatibles" : "Réseau National"}
                        </h4>
                        <ul className="space-y-3">
                            {config ? (
                                brands.slice(0, 6).map((brand) => (
                                    <li key={brand.slug}>
                                        <Link
                                            href={`/ville/${config.slug}/${brand.slug}`}
                                            className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2"
                                        >
                                            <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                                            Borne pour {brand.name} à {config.city}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                [
                                    { label: "Maison Individuelle", href: "/solutions/maison" },
                                    { label: "Borne en Copropriété", href: "/solutions/copropriete" },
                                    { label: "Borne en Entreprise", href: "/solutions/entreprise" },
                                    { label: "Prix & Tarifs 2026", href: "/guides/borne-7kw-vs-11kw-prix-installation" },
                                    { label: "Aides & Subventions", href: "/guides/aides-subventions-borne-recharge" }
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link href={link.href} className="text-neutral-400 hover:text-white transition text-sm flex items-center gap-2">
                                            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
