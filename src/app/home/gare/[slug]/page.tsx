import { SEO_GARES, getGareBySlug, SeoGare } from "@/lib/seo-gares";
import { notFound } from "next/navigation";
import { Phone, MapPin, Train, Clock, Star, ArrowRight, CheckCircle, Navigation } from "lucide-react";
import CallButton from "@/components/CallButton";
import Link from "next/link";
import Image from "next/image";
import { getTheme } from "@/lib/theme";
import type { Metadata } from "next";
import { BookingWidget } from "@/components/BookingWidget";
import { InternalMesh } from "@/components/InternalMesh";
import { Footer } from "@/components/Footer";
import { NATIONAL_CONFIG } from "@/config/national";
import { getSpintaxContent } from "@/lib/spintax";
import { HeroCarousel } from "@/components/HeroCarousel";

// Generate all gare pages
export async function generateStaticParams() {
    return SEO_GARES.map(gare => ({ slug: gare.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const gare = getGareBySlug(resolvedParams.slug);

    if (!gare) return {};

    return {
        title: gare.heroTitle,
        description: gare.description,
        alternates: {
            canonical: `https://taxifrance.fr/gare/${resolvedParams.slug}`,
        },
        openGraph: {
            title: gare.heroTitle,
            description: gare.description,
            url: `https://taxifrance.fr/gare/${resolvedParams.slug}`,
            type: "website",
            images: gare.heroImage ? [gare.heroImage] : [],
        }
    };
}

export default async function GarePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const gare = getGareBySlug(resolvedParams.slug);

    if (!gare) return notFound();

    const theme = getTheme("home");
    const city = NATIONAL_CONFIG;

    // Spintax for unique content
    const airportIntro = getSpintaxContent("airport_intro", gare.city);

    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900">
            {/* Schema.org Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TaxiService",
                        "name": `Taxi ${gare.name}`,
                        "description": gare.description,
                        "areaServed": {
                            "@type": "Place",
                            "name": gare.name,
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": gare.geo.lat,
                                "longitude": gare.geo.lng
                            }
                        },
                        "provider": {
                            "@type": "Organization",
                            "name": "Taxi France"
                        }
                    })
                }}
            />

            {/* Nav */}
            <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur-lg shadow-sm">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/home" className="flex items-center gap-2 text-xl font-black tracking-tighter text-neutral-900 hover:text-blue-600 transition">
                        Taxi de France<span className="text-blue-600">.</span>
                    </Link>
                    <CallButton
                        phoneNumber={city.phoneNumber}
                        cityName={gare.city}
                        theme={theme}
                        className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700 active:scale-95"
                    >
                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>{city.phoneNumber}</span>
                        </div>
                    </CallButton>
                </div>
            </nav>

            {/* HERO */}
            <header className="relative bg-neutral-900 text-white overflow-hidden">
                <HeroCarousel
                    images={[gare.heroImage || ""]}
                    alt={`Taxi ${gare.name}`}
                />

                <div className="container mx-auto px-4 pt-20 pb-28 relative z-10">
                    <div className="max-w-3xl">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest mb-6">
                            <Link href="/home" className="hover:text-white transition">Taxi France</Link>
                            <span>/</span>
                            <span>Gares</span>
                            <span>/</span>
                            <span className="text-blue-400">{gare.city}</span>
                        </div>

                        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                            <Train size={16} className="text-blue-400" />
                            <span className="text-sm font-bold text-blue-300">Gare TGV</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            Taxi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{gare.name}</span>
                        </h1>
                        <p className="text-xl text-neutral-300 mb-8 max-w-xl leading-relaxed">
                            {gare.description}
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <CallButton
                                phoneNumber={city.phoneNumber}
                                cityName={gare.city}
                                theme={theme}
                                className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-xl"
                            >
                                <Phone size={22} />
                                Réserver Mon Taxi
                            </CallButton>
                            <a
                                href="#reserver"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition"
                            >
                                Réserver en Ligne
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="relative z-10">
                {/* Booking Widget */}
                <div id="reserver" className="container mx-auto px-4 -mt-12">
                    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white text-center">
                            <h2 className="font-bold text-xl">Taxi depuis {gare.name}</h2>
                            <p className="text-sm text-blue-100 mt-1">Confirmation SMS immédiate</p>
                        </div>
                        <div className="p-6">
                            <BookingWidget city={city} />
                        </div>
                    </div>
                </div>

                {/* Value Props */}
                <section className="container mx-auto px-4 py-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-6 mb-16">
                            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 text-center">
                                <Clock size={32} className="mx-auto mb-4 text-blue-600" />
                                <h3 className="font-bold text-lg mb-2">Suivi de Train</h3>
                                <p className="text-sm text-neutral-600">On surveille les retards. Pas de frais d'attente.</p>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 text-center">
                                <Navigation size={32} className="mx-auto mb-4 text-green-600" />
                                <h3 className="font-bold text-lg mb-2">Accueil Pancarte</h3>
                                <p className="text-sm text-neutral-600">Votre chauffeur vous attend à la sortie du quai.</p>
                            </div>
                            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 text-center">
                                <Star size={32} className="mx-auto mb-4 text-yellow-500" />
                                <h3 className="font-bold text-lg mb-2">Prix Fixe</h3>
                                <p className="text-sm text-neutral-600">Forfait annoncé à l'avance. Pas de surprise.</p>
                            </div>
                        </div>

                        {/* Spintax Content */}
                        <div className="prose prose-lg prose-neutral max-w-none mb-16">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Votre Taxi à la {gare.name}</h2>
                            <p className="text-neutral-600">{airportIntro}</p>
                        </div>

                        {/* Transfer Destinations */}
                        <div className="bg-neutral-900 text-white rounded-3xl p-8 md:p-12">
                            <h3 className="text-2xl font-bold mb-8 text-center">Destinations fréquentes depuis {gare.name}</h3>
                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {gare.transfers.map((dest, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center"
                                    >
                                        <span className="flex items-center justify-center gap-2 text-sm font-medium">
                                            <ArrowRight size={14} className="text-blue-400" />
                                            {dest}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {gare.linkedCity && (
                                <div className="text-center mt-8">
                                    <Link
                                        href={`/ville/${gare.linkedCity}`}
                                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold transition"
                                    >
                                        Voir tous les services Taxi {gare.city}
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Legal Disclosure */}
                <div className="bg-neutral-100 border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
                    <div className="container mx-auto px-4">
                        <p>
                            Service opéré par des <strong>chauffeurs partenaires indépendants</strong> sélectionnés par le réseau Taxi de France.
                            La responsabilité du transport incombe au transporteur final. <Link href="/cgv" className="underline hover:text-neutral-900">Consulter les CGV</Link>.
                        </p>
                    </div>
                </div>
            </main>

            <InternalMesh city={gare.city} />
            <div className="bg-neutral-900 [&_footer]:bg-transparent [&_footer]:border-none">
                <Footer config={city} />
            </div>
        </div>
    );
}
