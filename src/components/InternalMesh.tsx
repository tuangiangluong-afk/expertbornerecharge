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
                {/* Dossiers d'Expertise & Guides Réglementaires 2026 (Maillage d'Autorité) */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <h4 className="text-white font-bold text-sm tracking-wide uppercase">
                            Dossiers d'Expertise &amp; Guides Réglementaires 2026
                        </h4>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        
                        <Link
                            key="/blog/nouvelle-prime-500-euros-borne-recharge-pilotable-2027"
                            href="/blog/nouvelle-prime-500-euros-borne-recharge-pilotable-2027"
                            className="text-neutral-300 hover:text-white transition text-xs flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
                        >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                            <span className="font-medium">Prime 500 € Borne Pilotable : Le Piège de 2027</span>
                        </Link>
                        <Link
                            key="/blog/certificat-consuel-borne-recharge-vente"
                            href="/blog/certificat-consuel-borne-recharge-vente"
                            className="text-neutral-300 hover:text-white transition text-xs flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
                        >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                            <span className="font-medium">Certificat Consuel Borne & Vente Immobilière</span>
                        </Link>
                        <Link
                            key="/blog/meilleure-borne-recharge-connectee-2026"
                            href="/blog/meilleure-borne-recharge-connectee-2026"
                            className="text-neutral-300 hover:text-white transition text-xs flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
                        >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                            <span className="font-medium">Meilleure Borne Recharge Connectée 2026</span>
                        </Link>
                        <Link
                            key="/blog/cout-installation-borne-garage-collectif"
                            href="/blog/cout-installation-borne-garage-collectif"
                            className="text-neutral-300 hover:text-white transition text-xs flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
                        >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                            <span className="font-medium">Coût Réel d'Installation Borne en Copropriété</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
