export const revalidate = 86400; // 24h ISR cache
import { notFound } from "next/navigation";
import { Phone, CheckCircle, Home } from "lucide-react";
import CallButton from "@/components/CallButton";
import { getTheme } from "@/lib/theme";
import type { Metadata } from "next";
import { NATIONAL_CONFIG } from "@/config/national";
import { BookingWidget } from "@/components/BookingWidget";
import { Footer } from "@/components/Footer";
import { InternalMesh } from "@/components/InternalMesh";
import { slugify } from "@/lib/slugify";
import { NATIONAL_TARGETS } from "@/config/national-targets"; // Source of Truth
import { getTargetAsCityConfig } from "@/config/national-targets";
import Header from "@/components/Header";

// Helper to find Neighborhood across all Partner Cities
import { SITES } from "@/lib/sites-config";

function getNeighborhood(slug: string) {
    // 1. Search in National Config Fallbacks
    const nationalNightlife = NATIONAL_CONFIG.points_of_interest.nightlife;
    let match = nationalNightlife.find(p => slugify(p) === slug);
    if (match) return { name: match, city: "Paris (ou National)" };

    // 2. Search in Partner Cities (Targets)
    for (const target of NATIONAL_TARGETS) {
        const config = getTargetAsCityConfig(target.slug);
        if (config && config.neighborhoods) {
            match = config.neighborhoods.find(n => slugify(n) === slug);
            if (match) return { name: match, city: target.name, citySlug: target.slug, config: config };
        }
    }

    // 3. Search in SITES config (Satellite Domains)
    for (const site of Object.values(SITES)) {
        const districts = site.quartiers || [];
        match = districts.find(d => slugify(d) === slug);
        if (match) return { 
            name: match, 
            city: site.city, 
            citySlug: site.slug,
            config: {
                ...site,
                name: site.name,
                phoneNumber: site.phoneNumber,
                neighborhoods: site.quartiers // Map for BookingWidget compatibility
            } as any
        };
    }

    return undefined;
}

export async function generateStaticParams() {
    // Collect all neighborhoods from all targets
    const allNeighborhoods = new Set<string>();

    // National fallback
    NATIONAL_CONFIG.points_of_interest.nightlife.forEach(n => allNeighborhoods.add(slugify(n)));

    // Partners
    for (const target of NATIONAL_TARGETS) {
        const config = getTargetAsCityConfig(target.slug);
        if (config && config.neighborhoods) {
            config.neighborhoods.forEach(n => allNeighborhoods.add(slugify(n)));
        }
    }

    // SITES (Satellite Domains)
    for (const site of Object.values(SITES)) {
        const districts = site.quartiers || [];
        districts.forEach(d => allNeighborhoods.add(slugify(d)));
    }

    return Array.from(allNeighborhoods).map(slug => ({
        slug,
    }));
}

import { headers } from "next/headers";
import { getPseoQuartierContent } from "@/lib/pseo-quartier";
import { Shield, Zap, Wrench, HelpCircle, Star, Sparkles } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const quartier = getNeighborhood(resolvedParams.slug);

    if (!quartier) return {};

    const pseo = getPseoQuartierContent(quartier.name, quartier.city, quartier.config);
    const headersList = await headers();
    const canonicalDomain = headersList.get("x-irve-canonical-domain") || "expertbornerecharge.com";
    const canonicalUrl = `https://${canonicalDomain}/quartier/${resolvedParams.slug}`;

    return {
        title: pseo.meta_title,
        description: pseo.meta_description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: pseo.meta_title,
            description: pseo.meta_description,
            siteName: "Expert Borne Recharge",
            locale: "fr_FR",
            type: "website",
            url: canonicalUrl,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function QuartierPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const quartier = getNeighborhood(resolvedParams.slug);

    if (!quartier) return notFound();

    const cityConfig = quartier.config || NATIONAL_CONFIG;
    const isHub = cityConfig.slug === 'home';
    const theme = getTheme(cityConfig.slug);
    const pseo = getPseoQuartierContent(quartier.name, quartier.city, cityConfig);

    // Map theme name to Header themeColor
    const themeColorMap: Record<string, 'blue' | 'emerald' | 'amber' | 'purple'> = {
        'amber': 'amber',
        'emerald': 'emerald',
        'blue': 'blue',
        'violet': 'purple',
        'rose': 'purple',
        'cyan': 'emerald',
        'orange': 'amber',
        'indigo': 'blue',
    };
    const headerThemeColor = themeColorMap[theme.name] || 'blue';

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": pseo.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
            {/* Structured Data for FAQ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <Header 
                isHub={isHub} 
                city={isHub ? null : cityConfig.city} 
                phoneNumber={cityConfig.phoneNumber}
                themeColor={headerThemeColor}
            />

            {/* Hero Header */}
            <header className="bg-neutral-900 text-white pt-32 pb-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950"></div>
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={14} />
                        {pseo.hero_badge}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        {pseo.hero_title}
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                        Installation clé en main certifiée IRVE dans votre quartier à {quartier.name} ({quartier.city}).
                        Bénéficiez du crédit d&apos;impôt de 500 € et d&apos;un devis gratuit sous 24h.
                    </p>
                </div>
            </header>

            <main className="container mx-auto max-w-5xl px-4 -mt-16 relative z-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Dynamic Local Intro */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-100">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-neutral-900">
                                <Zap className="text-emerald-600" />
                                Borne de recharge à {quartier.name}
                            </h2>
                            <div 
                                className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: pseo.intro_html }}
                            />
                        </div>

                        {/* Technical Specs & Safety Card */}
                        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl p-8 shadow-xl border border-neutral-700">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-emerald-400">
                                <Shield size={24} />
                                Standards Techniques & Sécurité IRVE
                            </h3>
                            <div className="grid sm:grid-cols-3 gap-6">
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                    <div className="text-xs text-neutral-400 uppercase font-semibold mb-1">Puissance de charge</div>
                                    <div className="text-lg font-bold text-white">{pseo.tech_specs.power}</div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                    <div className="text-xs text-neutral-400 uppercase font-semibold mb-1">Protection requise</div>
                                    <div className="text-sm font-semibold text-neutral-200">{pseo.tech_specs.protection}</div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                    <div className="text-xs text-neutral-400 uppercase font-semibold mb-1">Aides déductibles</div>
                                    <div className="text-sm font-semibold text-emerald-400">{pseo.tech_specs.subvention}</div>
                                </div>
                            </div>
                        </div>

                        {/* Housing & Configuration Advice */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-100">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-neutral-900">
                                <Wrench className="text-blue-600" />
                                {pseo.housing_advice.title}
                            </h3>
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                {pseo.housing_advice.content}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                                <div className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-sm text-neutral-900">Maison Individuelle</div>
                                        <div className="text-xs text-neutral-500">Pose en garage ou borne sur pied étanche extérieure</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-sm text-neutral-900">Copropriété & Parking</div>
                                        <div className="text-xs text-neutral-500">Accompagnement Droit à la Prise & subvention ADVENIR</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Local FAQs */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-100">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-neutral-900">
                                <HelpCircle className="text-emerald-600" />
                                Questions fréquentes — {quartier.name}
                            </h3>
                            <div className="space-y-4">
                                {pseo.faqs.map((faq, i) => (
                                    <div key={i} className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200/60">
                                        <h4 className="font-bold text-neutral-900 mb-2 text-sm">
                                            {faq.question}
                                        </h4>
                                        <p className="text-sm text-neutral-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Widget */}
                    <div className="md:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100">
                                <div className="bg-emerald-600 p-4 text-white text-center">
                                    <p className="font-bold">Devis Borne {quartier.name}</p>
                                    <p className="text-xs text-emerald-100">Gratuit et sans engagement</p>
                                </div>
                                <div className="p-4">
                                    <BookingWidget city={cityConfig} compact={true} />
                                </div>
                            </div>

                            <div className="bg-neutral-900 rounded-3xl p-6 text-white text-center shadow-xl">
                                <Phone size={32} className="mx-auto mb-4 text-emerald-400" />
                                <h3 className="font-bold text-lg mb-2">Standard Local</h3>
                                <p className="text-sm text-neutral-400 mb-4">Ligne directe pour {quartier.city}</p>
                                <CallButton
                                    phoneNumber={cityConfig.phoneNumber}
                                    cityName={cityConfig.name}
                                    theme={theme}
                                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-emerald-500 transition shadow-lg w-full"
                                >
                                    <Phone size={18} />
                                    {cityConfig.phoneNumber}
                                </CallButton>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <InternalMesh city={quartier.citySlug || NATIONAL_CONFIG.city} config={cityConfig} />
            {/* Override styling for dark theme integration */}
            <div className="bg-neutral-900 border-t border-white/5 [&_footer]:bg-transparent [&_footer]:border-none">
                <Footer config={cityConfig} />
            </div>
        </div>
    );
}
