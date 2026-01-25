import { CITIES, getCity } from "@/lib/db";
import { getSpintaxContent } from "@/lib/spintax";
import { slugify } from "@/lib/slugify";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/StructuredData";
import { Phone, MapPin, Bus, Clock, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";

// Helper to find POI (DB + Legacy Fallback)
async function getPoi(slug: string, tenantId: string) {
    // 1. Try Supabase
    const { data } = await supabase
        .from("pois")
        .select("*")
        .eq("tenant_id", tenantId)
        .eq("slug", slug)
        .maybeSingle(); // Use maybeSingle to avoid 406 row errors

    if (data) return data;

    // 2. Legacy Fallback (db.ts)
    const city = CITIES[tenantId];
    if (city?.points_of_interest) {
        const allPois = [
            ...city.points_of_interest.hotels,
            ...city.points_of_interest.nightlife,
            ...city.points_of_interest.monuments
        ];
        const foundName = allPois.find(p => slugify(p) === slug);
        if (foundName) {
            return {
                name: foundName,
                parking_difficulty: city.points_of_interest.parking_difficulty,
                content_intro: null, // No custom intro for legacy
            };
        }
    }
    return null;
}

// Generate all possible static params for static export
export async function generateStaticParams() {
    // Note: For true dynamic CMS scaling, we rely on ISR (on-demand generation)
    // rather than pre-building everything. We keep existing ones for speed.
    const params = [];
    for (const cityKey in CITIES) {
        const city = CITIES[cityKey];
        if (city.points_of_interest) {
            const pois = [
                ...city.points_of_interest.hotels,
                ...city.points_of_interest.nightlife,
                ...city.points_of_interest.monuments
            ];
            for (const poi of pois) {
                const slug = slugify(poi);
                params.push({ domain: city.slug, slug });
            }
        }
    }
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ domain: string; slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return {};

    const poi = await getPoi(resolvedParams.slug, city.slug);
    if (!poi) return {};

    const title = `Aller à ${poi.name} taxi ou bus ? Le comparatif complet - ${city.city}`;
    const description = `Comment aller à ${poi.name} depuis ${city.city} ? Comparatif Bus vs Taxi. Trajet direct depuis Gare/Aéroport. Prix fixe et réservation immédiate.`;

    return {
        title: title,
        description: description,
        alternates: {
            canonical: `https://${city.domain}/guides/${resolvedParams.slug}`,
        },
        openGraph: {
            title: title,
            description: description,
            type: "article",
            url: `https://${city.domain}/guides/${resolvedParams.slug}`,
            images: [
                {
                    url: `https://${city.domain}${city.heroImage}`, // Fallback to city hero or specific POI image if available
                    width: 1200,
                    height: 630,
                    alt: `Transport vers ${poi.name}`
                }
            ]
        }
    };
}

export default async function GuidePage({ params }: { params: Promise<{ domain: string; slug: string }> }) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);

    if (!city) return notFound();

    const poi = await getPoi(resolvedParams.slug, city.slug);
    if (!poi) return notFound();

    // Spintax Content (Fallback if no custom intro)
    const guideIntro = poi.content_intro || getSpintaxContent("guide_intro", city.city);
    const busPain = getSpintaxContent("guide_bus_pain", city.city);
    const taxiSolution = getSpintaxContent("guide_taxi_solution", city.city);


    return (
        <div className="min-h-screen font-sans bg-neutral-50 text-neutral-900">
            <StructuredData city={city} />

            {/* Simple Header */}
            <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-neutral-900/90 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center justify-between container mx-auto">
                    <a href="/" className="text-xl font-bold tracking-tight text-white hover:text-yellow-400 transition">
                        {city.name}<span className="text-yellow-400">.</span>
                    </a>
                    <a
                        href={`tel:${city.phoneNumber.replace(/ /g, "")}`}
                        className="flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-neutral-900 shadow-lg hover:bg-yellow-300"
                    >
                        <Phone size={16} fill="currentColor" />
                        <span>Appeler</span>
                    </a>
                </div>
            </nav>

            <main className="pt-24 pb-12 px-4 container mx-auto max-w-4xl">
                {/* Breadcrumb */}
                <div className="text-sm text-neutral-500 mb-6">
                    <a href="/" className="hover:underline">Accueil</a> &gt; <span>Guides</span> &gt; <span className="text-neutral-900 font-medium">{poi.name}</span>
                </div>

                {/* H1 */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight">
                    Comment aller à <span className="text-blue-600">{poi.name}</span> ?
                </h1>

                <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
                    {guideIntro}
                </p>

                {/* Comparison Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* The "Pain" (Bus/Public Transport) */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200 opacity-80 hover:opacity-100 transition">
                        <div className="flex items-center gap-3 mb-4 text-red-500">
                            <Bus size={32} />
                            <h3 className="text-2xl font-bold text-neutral-900">En Bus / Tram</h3>
                        </div>
                        <p className="text-neutral-600 mb-6 italic">"{busPain}"</p>
                        <ul className="space-y-3 text-sm text-neutral-500">
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></div> Horaires fixes et contraignants</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></div> Correspondances souvent nécessaires</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></div> Marche à pied avec les bagages</li>
                        </ul>
                    </div>

                    {/* The "Solution" (Taxi) */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-yellow-400 relative overflow-hidden transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Recommandé</div>
                        <div className="flex items-center gap-3 mb-4 text-green-600">
                            <CheckCircle size={32} />
                            <h3 className="text-2xl font-bold text-neutral-900">En Taxi Privé</h3>
                        </div>
                        <p className="text-neutral-600 mb-6 font-medium">{taxiSolution}</p>
                        <ul className="space-y-3 text-sm text-neutral-700 font-medium">
                            <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0" /> Prise en charge immédiate (Gare/Aéroport)</li>
                            <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0" /> Dépose porte-à-porte devant {poi.name}</li>
                            <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0" /> Paiement CB et Facture Pro</li>
                        </ul>

                        <div className="mt-8 pt-6 border-t border-neutral-100">
                            <div className="flex items-baseline justify-between mb-2">
                                <span className="text-sm text-neutral-500">Estimation</span>
                                <span className="text-2xl font-bold text-neutral-900">{city.pricing.base}</span>
                            </div>
                            <a href={`tel:${city.phoneNumber.replace(/ /g, "")}`} className="block w-full bg-neutral-900 text-white text-center font-bold py-4 rounded-xl hover:bg-neutral-800 transition shadow-lg">
                                Commander mon Chauffeur
                            </a>
                            <p className="text-xs text-center text-neutral-400 mt-2">Disponible maintenant • Arrivée en 10 min</p>
                        </div>
                    </div>
                </div>

                {/* Info Block */}
                <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 mb-12">
                    <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <MapPin size={20} />
                        À propos de {poi.name}
                    </h3>
                    <p className="text-blue-800/80">
                        Situé au cœur de {city.city}, {poi.name} est une destination prisée.
                        Le stationnement y est souvent {poi.parking_difficulty?.toLowerCase() || "difficile"}.
                        Évitez les amendes et le stress du parking en optant pour une dépose minute.
                    </p>
                </div>

                {/* Internal Linking / Maillage */}
                <div className="mt-16 pt-12 border-t border-neutral-200">
                    <h3 className="text-xl font-bold text-neutral-900 mb-6">Autres destinations populaires à {city.city}</h3>
                    <div className="flex flex-wrap gap-3 mb-8">
                        {city.points_of_interest?.hotels.slice(0, 5).map(h => (
                            <a key={h} href={`/guides/${slugify(h)}`} className="text-sm px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition">
                                {h}
                            </a>
                        ))}
                        {city.points_of_interest?.monuments.slice(0, 5).map(m => (
                            <a key={m} href={`/guides/${slugify(m)}`} className="text-sm px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition">
                                {m}
                            </a>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}

