import { CITIES, getCity } from "@/lib/db";
import { getSpintaxContent } from "@/lib/spintax";
import { Phone, Calendar, Clock, MapPin, CheckCircle, Star } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Vehicles } from "@/components/Vehicles";
import { Reviews } from "@/components/Reviews";
import { StructuredData } from "@/components/StructuredData";
import { GTMScript } from "@/components/GTMScript";
import { BookingWidget } from "@/components/BookingWidget";
import CallButton from "@/components/CallButton";
import { slugify } from "@/lib/slugify";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { getTheme } from "@/lib/theme";

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
    const heroImage = city.heroImage.startsWith('http') ? city.heroImage : `https://${city.domain}${city.heroImage}`;

    return {
        title: title,
        description: description,
        keywords: [
            `Taxi ${city.city}`,
            `Taxi gare ${city.city}`,
            `Navette aéroport ${city.city}`,
            `Transport médical ${city.city}`,
            ...city.features,
            "TaxiConventionné",
            "VSL"
        ],
        alternates: {
            canonical: `https://${city.domain}`,
        },
        openGraph: {
            title: title,
            description: description,
            url: `https://${city.domain}`,
            siteName: `Taxi ${city.city}`,
            images: [
                {
                    url: heroImage,
                    width: 1200,
                    height: 630,
                    alt: `Taxi à ${city.city}`
                }
            ],
            locale: "fr_FR",
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}



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

    // Fetch Tenant for GTM and Admin Overrides
    const { data: tenant } = await supabase
        .from("tenants")
        .select("name, ga_id, gtm_id, phone_number")
        .eq("id", city.slug)
        .maybeSingle() as any;

    // Group POIs for Footer (Legacy structure support)
    const poisList = pois || [];
    const dbHotels = poisList.filter((p: { type?: string }) => p.type === 'hotel').map((p: { name: string }) => p.name);
    const dbNightlife = poisList.filter((p: { type?: string }) => p.type === 'nightlife').map((p: { name: string }) => p.name);

    const hotels = dbHotels.length > 0 ? dbHotels : (city.points_of_interest?.hotels || []);
    const nightlife = dbNightlife.length > 0 ? dbNightlife : (city.points_of_interest?.nightlife || []);

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

    // Merge Static Config with Dynamic Admin Data (Hybrid Pattern)
    const effectiveCity = {
        ...city,
        name: tenant?.name || city.name,
        phoneNumber: tenant?.phone_number || city.phoneNumber,
        ga_id: tenant?.ga_id || city.ga_id, // Admin override triggers here
        gtm_id: tenant?.gtm_id || city.gtm_id,
        points_of_interest: {
            ...city.points_of_interest,
            hotels: hotels,
            nightlife: nightlife
        }
    };

    const heroTitle = getContent("hero_title", getSpintaxContent("hero_title", effectiveCity.city));
    const heroSubtitle = getContent("hero_subtitle", getSpintaxContent("hero_subtitle", effectiveCity.city));
    const heroBadge = getContent("hero_badge", getSpintaxContent("hero_badge", effectiveCity.city));
    const ctaButton = getContent("cta_button", getSpintaxContent("cta_button", effectiveCity.city));
    const heroImage = getContent("hero_image", effectiveCity.heroImage);

    // Dynamic Theme Color
    const theme = getTheme(effectiveCity.slug);
    const classes = theme.classes;

    return (
        <div className={`min-h-screen font-sans text-neutral-900 bg-neutral-50 selection:${classes.bg} selection:text-neutral-900`}>
            <StructuredData city={effectiveCity} />
            <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-neutral-900/80 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold tracking-tight text-white">
                        {effectiveCity.name}<span className={`text-${theme.primary}-400`}>.</span>
                    </span>
                    <CallButton
                        phoneNumber={effectiveCity.phoneNumber}
                        cityName={effectiveCity.name}
                        theme={theme}
                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${theme.text} shadow-lg active:scale-95 transition hover:brightness-110 ${classes.bg} ${classes.shadow}`}
                    >
                        <Phone size={16} fill="currentColor" />
                        <span className="hidden sm:inline">Appeler</span>
                        <span className="sm:hidden">Appeler</span>
                    </CallButton>
                </div>
            </nav>

            {/* Hero Section - sales optimized */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-neutral-900">
                {/* Hero Background - Optimized LCP */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-900/80 via-neutral-900/60 to-neutral-900" />
                    <Image
                        src={heroImage}
                        alt={`Taxi à ${effectiveCity.city}`}
                        fill
                        priority
                        className="object-cover opacity-50"
                        sizes="100vw"
                    />
                </div>

                {/* Content Container */}
                <div className="container mx-auto px-4 text-center relative z-20">
                    <div className={`inline-flex items-center rounded-full border ${classes.border} ${classes.bg.replace('bg-', 'bg-')}/10 px-4 py-1.5 text-sm font-bold ${classes.text} backdrop-blur-md mb-8 shadow-lg ${classes.shadow}`}>
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

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-12">
                        <CallButton
                            phoneNumber={effectiveCity.phoneNumber}
                            cityName={effectiveCity.name}
                            theme={theme}
                            className={`flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r ${classes.gradientFrom} ${classes.gradientTo} px-8 py-5 text-xl font-bold ${theme.text} transition transform hover:-translate-y-1 hover:shadow-2xl ${classes.shadow} sm:w-auto`}
                        >
                            <Phone fill="currentColor" />
                            {ctaButton}
                        </CallButton>
                        <a
                            href="#book"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 text-xl font-bold text-white transition hover:bg-white/20 sm:w-auto"
                        >

                            <Calendar size={20} />
                            Réserver pour plus tard
                        </a>
                    </div>

                    {/* Booking Widget */}
                    <div id="book" className="w-full max-w-md mx-auto scroll-mt-24 relative z-20">
                        <BookingWidget city={effectiveCity} />
                    </div>
                </div>
            </section>

            {/* QUICK SERVICES GRID - REORDERED: Business First */}
            <section className="relative z-30 -mt-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Service 1: Gare & Aéro */}
                        <a href="/gare-aeroport" className="group block p-6 rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-white/50 hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/10 transition-all transform hover:-translate-y-1">
                            <div className="h-12 w-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                <MapPin size={24} fill="currentColor" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Gare & Aéroport</h3>
                            <p className="text-sm text-neutral-500">Liaison Orly, Roissy CDG & Gares TGV. Suivi de vol inclus.</p>
                        </a>

                        {/* Service 2: Longue Distance */}
                        <a href="/longue-distance" className="group block p-6 rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-white/50 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/10 transition-all transform hover:-translate-y-1">
                            <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                <CheckCircle size={24} fill="currentColor" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Longue Distance</h3>
                            <p className="text-sm text-neutral-500">Forfaits toute distance France & Europe sur devis.</p>
                        </a>

                        {/* Service 3: Medical */}
                        <a href="/transport-medical" className="group block p-6 rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-white/50 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all transform hover:-translate-y-1">
                            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                                <Star size={24} fill="currentColor" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Transport Médical</h3>
                            <p className="text-sm text-neutral-500">Agréé CPAM. Tiers payant accepté vers tous les hôpitaux.</p>
                        </a>
                    </div>
                </div>
            </section>

            <Vehicles
                city={city.city}
                slug={effectiveCity.slug}
                phoneNumber={effectiveCity.phoneNumber}
            />

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
                                    <span className={`text-3xl font-bold ${classes.text}`}>{city.pricing.base}</span>
                                </div>
                                <p className="text-sm text-neutral-400 relative z-10">{city.pricing.description}. Majorations nuit et dimanche selon arrêté préfectoral en vigueur.</p>
                            </div>
                        </div>

                        {/* Booking Form (Glass) */}
                        <div className="relative">
                            <BookingWidget city={effectiveCity} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section using Deterministic Spintax */}
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
                                Quartiers desservis à {city.city} <span className={`${classes.text}`}>.</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {city.neighborhoods.slice(0, 8).map((neighborhood) => (
                                    <a
                                        key={neighborhood}
                                        href={`/quartier/${slugify(neighborhood)}`}
                                        className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline transition flex items-center gap-2"
                                    >
                                        <span className={`font-bold ${classes.text}`}>→</span>
                                        Taxi {neighborhood}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                                Nos Services <span className={`${classes.text}`}>.</span>
                            </h3>
                            <div className="grid gap-3">
                                <a href={`/transport-medical`} className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline transition flex items-center gap-2">
                                    <span className={`${classes.text}`}>→</span>
                                    Transport Médical & VSL Conventionné
                                </a>
                                <a href={`/gare-aeroport`} className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline transition flex items-center gap-2">
                                    <span className={`${classes.text}`}>→</span>
                                    Transfert Gare TGV & Aéroport
                                </a>
                                <a href={`/longue-distance`} className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline transition flex items-center gap-2">
                                    <span className={`${classes.text}`}>→</span>
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
                                                href={`/guides/${slugify(hotel)}`}
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


            {/* Footer */}
            <Footer config={effectiveCity} />

            {/* MOBILE CONVERSION BAR - VISIBLE ONLY ON MOBILE */}
            <div className={`fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center gap-2 border-t border-white/10 bg-neutral-900/95 px-4 pb-2 backdrop-blur-lg md:hidden`}>
                <CallButton
                    phoneNumber={effectiveCity.phoneNumber}
                    cityName={effectiveCity.name}
                    theme={theme}
                    className="flex flex-1 flex-col items-center justify-center rounded-xl bg-neutral-800 py-2 text-white active:scale-95"
                >
                    <Phone size={20} className={`mb-1 ${classes.text}`} />
                    <span className="text-xs font-bold">Appeler</span>
                </CallButton>
                <a
                    href="#book"
                    className={`flex-[2] flex flex-col items-center justify-center rounded-xl ${classes.bg} py-2 ${theme.text} ${classes.shadow} active:scale-95`}
                >
                    <Calendar size={20} className="mb-1 text-neutral-900" />
                    <span className="text-xs font-bold uppercase tracking-wide">Commander Taxi</span>
                </a>
            </div>
        </div>
    );

}
