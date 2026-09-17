export const revalidate = 86400; // 24h ISR cache
import { notFound } from "next/navigation";
import { Phone, MapPin, ArrowRight, Building2 } from "lucide-react";
import CallButton from "@/components/CallButton";
import Link from "next/link";
import { getTheme } from "@/lib/theme";
import type { Metadata } from "next";
import { NATIONAL_CONFIG } from "@/config/national";
import { BookingWidget } from "@/components/BookingWidget";
import { Footer } from "@/components/Footer";
import { InternalMesh } from "@/components/InternalMesh";
import { slugify } from "@/lib/slugify";
import { clampDescription, clampTitle } from "@/lib/seo-meta";

// Helper to find POI in National Config
import { NATIONAL_TARGETS } from "@/config/national-targets";

// Helper to find POI across National Config AND all Partner Cities
function getPOI(slug: string) {
    // 1. Search in National Config
    const nationalPois = [
        ...NATIONAL_CONFIG.points_of_interest.hotels,
        ...NATIONAL_CONFIG.points_of_interest.nightlife,
        ...NATIONAL_CONFIG.points_of_interest.monuments
    ];

    let match = nationalPois.find(p => slugify(p) === slug);
    if (match) return match;

    // 2. Search in Partner Cities (Targets)
    for (const target of NATIONAL_TARGETS) {
        match = target.top_places.find(p => slugify(p) === slug);
        if (match) return match;
    }

    return undefined;
}

export async function generateStaticParams() {
    const allPois = [
        ...NATIONAL_CONFIG.points_of_interest.hotels,
        ...NATIONAL_CONFIG.points_of_interest.nightlife,
        ...NATIONAL_CONFIG.points_of_interest.monuments
    ];

    return allPois.map(poi => ({
        slug: slugify(poi),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const poi = getPOI(resolvedParams.slug);

    if (!poi) return {};

    return {
        title: clampTitle(`Installation Borne ${poi} - Devis & Expert IRVE`),
        description: clampDescription(`Besoin d'une borne de recharge à ${poi} ? Électricien certifié IRVE, installation rapide et devis gratuit sous 24h. Service national.`),
    };
}

export default async function NationalGuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const poi = getPOI(resolvedParams.slug);

    if (!poi) return notFound();

    const city = NATIONAL_CONFIG;
    const theme = getTheme("home");
    const classes = theme.classes;

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
            {/* Nav */}
            <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 px-4 py-3 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className={`flex items-center gap-2 text-xl font-black tracking-tighter text-neutral-900 hover:text-blue-600 transition`}
                    >
                        Expert Borne Recharge<span className="text-blue-600">.</span>
                    </Link>
                    <CallButton
                        phoneNumber={city.phoneNumber}
                        cityName={city.name}
                        theme={theme}
                        className={`rounded-full ${classes.bg} px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:brightness-110 active:scale-95`}
                    >
                        <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>Appeler</span>
                        </div>
                    </CallButton>
                </div>
            </nav>

            {/* Header */}
            <header className="bg-neutral-900 text-white pt-24 pb-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                <div className="cube-pattern absolute inset-0 opacity-10"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
                        Destination Populaire
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">
                        Borne de recharge à <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{poi}</span>
                    </h1>
                    <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                        Installation certifiée IRVE pour votre véhicule électrique.
                        Expertise locale partout en France.
                    </p>
                </div>
            </header>

            <main className="container mx-auto max-w-5xl px-4 -mt-20 relative z-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-100">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                                Une panne ? On intervient en <span className="text-red-500">48h</span>
                            </h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Parce que votre mobilité n&apos;attend pas, nos techniciens locaux à <strong>{city.city}</strong> assurent le SAV et la maintenance de votre borne, même si elle n&apos;a pas été installée par nous.
                            </p>
                            <p>
                                Le réseau Expert Borne Recharge vous accompagne de l&apos;étude technique à la pose.
                            </p>
                            <p>
                                Nos techniciens partenaires interviennent rapidement à <strong>{poi}</strong> pour installer votre borne (maison, copropriété ou entreprise).
                                Profitez des aides de l&apos;État pour votre installation IRVE.
                            </p>
                            <h2 className="text-xl font-bold text-neutral-900 mt-6 mb-3">Les avantages Expert Borne Recharge</h2>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Électriciens Certifiés IRVE</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Devis Gratuit sous 24h</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Garantie Matériel &amp; Main d&apos;œuvre</li>
                            </ul>
                        </div>

                        {/* Reviews mockup for this POI */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                                    <p className="text-sm italic text-neutral-700">&quot;Droit à la prise respecté, installation propre dans mon parking souterrain. Je recommande.&quot;</p>
                                </div>
                            </div>

                    {/* Sidebar / Widget */}
                    <div className="md:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100">
                                <div className="bg-blue-600 p-4 text-white text-center">
                                    <p className="font-bold">Votre Devis Gratuit</p>
                                    <p className="text-xs opacity-80">Réponse immédiate en ligne</p>
                                </div>
                                <div className="p-4">
                                    <BookingWidget city={city} compact={true} />
                                </div>
                            </div>

                            <div className="bg-neutral-900 rounded-3xl p-6 text-white text-center">
                                <Phone size={32} className="mx-auto mb-4 text-blue-400" />
                                <h3 className="font-bold text-lg mb-2">Besoin d&apos;aide ?</h3>
                                <p className="text-sm text-neutral-400 mb-4">Nos experts sont disponibles du lundi au vendredi pour répondre à vos questions techniques.</p>
                                <CallButton
                                    phoneNumber={city.phoneNumber}
                                    cityName={city.name}
                                    theme={theme}
                                    className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-blue-500 transition shadow-lg w-full"
                                >
                                    <Phone size={18} />
                                    {city.phoneNumber}
                                </CallButton>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <InternalMesh city={NATIONAL_CONFIG.city} />
            {/* Override styling for dark theme integration */}
            <div className="bg-neutral-900 border-t border-white/5 [&_footer]:bg-transparent [&_footer]:border-none">
                <Footer config={city} />
            </div>
        </div>
    );
}

function CheckCircle({ size, className }: { size: number, className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
}
