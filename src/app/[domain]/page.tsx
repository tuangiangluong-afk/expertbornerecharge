import { CITIES } from "@/lib/db";
import { getSpintaxContent } from "@/lib/spintax";
import { Phone, Calendar, Clock, MapPin, CheckCircle, Star } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { Vehicles } from "@/components/Vehicles";
import { Reviews } from "@/components/Reviews";
import { StructuredData } from "@/components/StructuredData";
import { GTMScript } from "@/components/GTMScript";
import { slugify } from "@/lib/slugify";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Helper to find city configuration
function getCity(domain: string) {
    // Normalize domain matching
    // 1. Try exact key match (e.g. "taxiaix")
    if (CITIES[domain]) return CITIES[domain];

    // 2. Try matching the domain property (e.g. "taxiaix.fr" matches CITIES["taxiaix"].domain)
    const cityKey = Object.keys(CITIES).find(
        (key) => CITIES[key].domain === domain
    );
    if (cityKey) return CITIES[cityKey];

    return null;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ domain: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) {
        return {
            title: "Domaine disponible - TaxiFrance",
            description: "Ce domaine fait partie du réseau TaxiFrance.",
        };
    }

    // Low-Level Spintax for High CTR (Aggressive SEO)
    const title = getSpintaxContent("meta_title", city.city);
    const description = getSpintaxContent("meta_description", city.city);

    return {
        title: title,
        description: description,
    };
}

import { supabase } from "@/lib/supabase";

export default async function CityPage({ params }: { params: Promise<{ domain: string }> }) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);

    if (!city) {
        return notFound();
    }

    // Fetch Dynamic Content (Hybrid CMS Approach)
    const { data: vehicles } = await supabase
        .from("vehicles")
        .select("*")
        .eq("tenant_id", city.slug)
        .order("display_order", { ascending: true });

    const { data: pois } = await supabase
        .from("pois")
        .select("*")
        .eq("tenant_id", city.slug);

    const { data: faqs } = await supabase
        .from("faqs")
        .select("*")
        .eq("tenant_id", city.slug)
        .order("display_order", { ascending: true });

    // Fetch Tenant for GTM
    const { data: tenant } = await supabase
        .from("tenants")
        .select("gtm_id")
        .eq("id", city.slug)
        .maybeSingle();

    // Group POIs for Footer (Legacy structure support)
    const poisList = pois || [];
    const hotels = poisList.filter((p: { type?: string }) => p.type === 'hotel').map((p: { name: string }) => p.name) || city.points_of_interest?.hotels || [];
    const nightlife = poisList.filter((p: { type?: string }) => p.type === 'nightlife').map((p: { name: string }) => p.name) || city.points_of_interest?.nightlife || [];

    // Fetch Content Overrides (Page Builder)
    const { data: pageContent } = await supabase
        .from("content_pages")
        .select("*")
        .eq("tenant_id", city.slug)
        .eq("path", "/") // Home Page
        .eq("section", "home_hero");

    // Helper to get value securely
    const contentList = (pageContent || []) as Array<{ key: string; value?: string | null }>;
    const getContent = (key: string, fallback: string) => {
        const override = contentList.find(p => p.key === key)?.value;
        return override || fallback;
    };

    const heroTitle = getContent("hero_title", getSpintaxContent("hero_title", city.city));
    const heroSubtitle = getContent("hero_subtitle", getSpintaxContent("hero_subtitle", city.city));
    const heroBadge = getContent("hero_badge", getSpintaxContent("hero_badge", city.city));
    const ctaButton = getContent("cta_button", getSpintaxContent("cta_button", city.city));
    const heroImage = getContent("hero_image", city.heroImage);

    return (
        <div className="min-h-screen font-sans text-neutral-900 bg-neutral-50 selection:bg-yellow-400 selection:text-neutral-900">
            <StructuredData city={city} />
            <GTMScript gtmId={(tenant as { gtm_id?: string | null } | null)?.gtm_id} />
            <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-neutral-900/80 px-4 py-3 backdrop-blur-md">


                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold tracking-tight text-white">
                        {city.name}<span className="text-yellow-400">.</span>
                    </span>
                    <a
                        href={`tel:${city.phoneNumber.replace(/ /g, "")}`}
                        className="flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-neutral-900 shadow-lg shadow-yellow-400/20 active:scale-95 transition hover:bg-yellow-300"
                    >
                        <Phone size={16} fill="currentColor" />
                        <span className="hidden sm:inline">Appeler</span>
                        <span className="sm:hidden">Appeler</span>
                    </a>
                </div>
            </nav>

            {/* Hero Section - Nuclear Fix */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#0f172a',
                        zIndex: -10
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to bottom, rgba(30, 58, 138, 0.3), rgba(15, 23, 42, 0.95))',
                            zIndex: 10
                        }}
                    />
                    <div
                        className="absolute inset-0 animate-pulse-slow"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url('${heroImage}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.4
                        }}
                    ></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-20">
                    <div className="inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-sm font-bold text-yellow-400 backdrop-blur-md mb-8 shadow-lg shadow-yellow-400/10">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        {heroBadge}
                    </div>

                    <h1
                        className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl drop-shadow-2xl"
                        dangerouslySetInnerHTML={{ __html: heroTitle }}
                    />

                    <p className="mx-auto mb-12 max-w-2xl text-xl text-neutral-300 font-medium leading-relaxed">
                        {heroSubtitle}
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href={`tel:${city.phoneNumber.replace(/ /g, "")}`}
                            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-5 text-xl font-bold text-neutral-900 transition transform hover:-translate-y-1 hover:shadow-2xl shadow-yellow-500/30 sm:w-auto"
                        >
                            <Phone fill="currentColor" />
                            {ctaButton}
                        </a>
                        <a
                            href="#book"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 text-xl font-bold text-white transition hover:bg-white/20 sm:w-auto"
                        >
                            <Calendar size={20} />
                            Réserver pour plus tard
                        </a>
                    </div>
                </div>
            </section>

            {/* Quick Services Grid (Iceberg Tip) */}
            <section className="relative z-30 -mt-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Service 1: Medical */}
                        <a href="/transport-medical" className="group block p-6 rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-white/50 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all transform hover:-translate-y-1">
                            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                <Star size={24} fill="currentColor" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Transport Médical</h3>
                            <p className="text-sm text-neutral-500">Agréé CPAM. Tiers payant accepté vers tous les hôpitaux.</p>
                        </a>

                        {/* Service 2: Gare/Aero */}
                        <a href="/gare-aeroport" className="group block p-6 rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-white/50 hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/10 transition-all transform hover:-translate-y-1">
                            <div className="h-12 w-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Gare & Aéroport</h3>
                            <p className="text-sm text-neutral-500">Navette ponctuelle. Suivi de vol et attente panneau.</p>
                        </a>

                        {/* Service 3: Long Distance */}
                        <a href="/longue-distance" className="group block p-6 rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-white/50 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/10 transition-all transform hover:-translate-y-1">
                            <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Longue Distance</h3>
                            <p className="text-sm text-neutral-500">Voyagez loin sans compteur. Forfaits prix fixe France/Europe.</p>
                        </a>
                    </div>
                </div>
            </section>

            {/* Vehicles Section */}
            <Vehicles city={city.city} />

            {/* Main Content */}
            <section className="py-24 bg-neutral-50">
                <div className="container mx-auto max-w-5xl px-4">
                    <div className="grid gap-16 md:grid-cols-2">
                        <div>
                            <h2 className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-8">
                                L'Excellence du transport à {city.city}
                            </h2>
                            <div className="space-y-6">
                                {city.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 shadow-sm">
                                            <CheckCircle size={16} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-neutral-900">{feature}</h4>
                                            <p className="text-neutral-500 text-sm">Service garanti par nos chauffeurs partenaires.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-8 bg-neutral-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 bg-yellow-500 rounded-full blur-3xl opacity-20"></div>
                                <h3 className="font-bold text-2xl mb-4 relative z-10">Tarifs Transparents</h3>
                                <div className="flex justify-between items-baseline border-b border-white/10 pb-4 mb-4 relative z-10">
                                    <span className="text-neutral-400">Prise en charge</span>
                                    <span className="text-3xl font-bold text-yellow-400">{city.pricing.base}</span>
                                </div>
                                <p className="text-sm text-neutral-400 relative z-10">{city.pricing.description}. Majorations nuit et dimanche selon arrêté préfectoral en vigueur.</p>
                            </div>
                        </div>

                        {/* Booking Form (Glass) */}
                        <div id="book" className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100 relative">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-3xl"></div>
                            <h3 className="text-2xl font-bold mb-2 text-neutral-900">Réservation Prioritaire</h3>
                            <p className="text-neutral-500 mb-8 text-sm">Recevez une confirmation par SMS en moins de 10 min.</p>

                            <form className="space-y-5" action="#" method="POST">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Date</label>
                                        <input type="date" className="w-full rounded-xl bg-neutral-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition py-3 px-4 font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Heure</label>
                                        <input type="time" className="w-full rounded-xl bg-neutral-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition py-3 px-4 font-medium" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Départ</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-3.5 text-neutral-400" size={18} />
                                        <input type="text" placeholder="Adresse précise..." className="w-full rounded-xl bg-neutral-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition py-3 pl-12 pr-4 font-medium" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Arrivée</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-3.5 text-neutral-400" size={18} />
                                        <input type="text" placeholder="Destination..." className="w-full rounded-xl bg-neutral-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition py-3 pl-12 pr-4 font-medium" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Téléphone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 text-neutral-400" size={18} />
                                        <input type="tel" placeholder="06 00 00 00 00" className="w-full rounded-xl bg-neutral-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition py-3 pl-12 pr-4 font-medium" />
                                    </div>
                                </div>
                                <button type="button" className="w-full rounded-xl bg-neutral-900 py-4 font-bold text-white hover:bg-neutral-800 transition shadow-lg transform active:scale-95">
                                    Valider ma course
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section using Deterministic Spintax */}
            <Reviews city={city.city} />

            {/* Reviews Social Proof */}
            <Reviews city={city.city} />

            {/* FAQ Section */}
            <FAQ city={city.city} type="general" faqs={faqs} />

            {/* Internal Linking Sections - SEO Maillage */}
            <section className="py-16 bg-neutral-50 border-t border-neutral-200">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Quartiers */}
                        <div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                                Quartiers desservis à {city.city} <span className="text-yellow-500">.</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {city.neighborhoods.slice(0, 8).map((neighborhood) => (
                                    <a
                                        key={neighborhood}
                                        href={`/${city.slug}/quartier/${slugify(neighborhood)}`}
                                        className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline transition flex items-center gap-2"
                                    >
                                        <span className="text-yellow-500">→</span>
                                        Taxi {neighborhood}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                                Nos Services <span className="text-yellow-500">.</span>
                            </h3>
                            <div className="grid gap-3">
                                <a href={`/${city.slug}/transport-medical`} className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline transition flex items-center gap-2">
                                    <span className="text-yellow-500">→</span>
                                    Transport Médical & VSL Conventionné
                                </a>
                                <a href={`/${city.slug}/gare-aeroport`} className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline transition flex items-center gap-2">
                                    <span className="text-yellow-500">→</span>
                                    Transfert Gare TGV & Aéroport
                                </a>
                                <a href={`/${city.slug}/longue-distance`} className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline transition flex items-center gap-2">
                                    <span className="text-yellow-500">→</span>
                                    Taxi Longue Distance
                                </a>
                            </div>

                            {/* Guides links */}
                            {hotels.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="font-semibold text-neutral-800 mb-3">Guides locaux</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {hotels.slice(0, 4).map((hotel: string) => (
                                            <a
                                                key={hotel}
                                                href={`/${city.slug}/guides/${slugify(hotel)}`}
                                                className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline transition"
                                            >
                                                Taxi → {hotel}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Footer */}
            <div className="bg-neutral-900 border-t border-white/10 py-12 text-neutral-400">
                <div className="container mx-auto px-4 text-center">
                    <h4 className="text-white font-bold mb-4">À propos de {city.name}</h4>
                    <p className="max-w-2xl mx-auto text-sm mb-8">
                        {city.name} est un service de mise en relation avec les meilleurs artisans taxis de {city.city}.
                        Nous garantissons un service de qualité, une ponctualité exemplaire et des tarifs réglementés.
                        Partenaire du réseau <a href="http://taxifrance.fr" className="text-white hover:underline">TaxiFrance</a>.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 text-left mb-8 max-w-2xl mx-auto border-t border-white/10 pt-8 mt-8">
                        <div>
                            <h5 className="text-white font-bold mb-4">Destinations Populaires</h5>
                            <ul className="space-y-2 text-sm">
                                {hotels.slice(0, 5).map((poi) => (
                                    <li key={poi}>
                                        <a href={`/guides/${slugify(poi)}`} className="hover:text-yellow-400 transition">
                                            Taxi vers {poi}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-white font-bold mb-4">Sortir à {city.city}</h5>
                            <ul className="space-y-2 text-sm">
                                {nightlife.slice(0, 5).map((poi) => (
                                    <li key={poi}>
                                        <a href={`/guides/${slugify(poi)}`} className="hover:text-yellow-400 transition">
                                            Taxi pour {poi}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-xs border-t border-white/10 pt-8">
                        &copy; {new Date().getFullYear()} {city.name} - Tous droits réservés.
                    </div>
                </div>
            </div>
        </div>
    );

}
