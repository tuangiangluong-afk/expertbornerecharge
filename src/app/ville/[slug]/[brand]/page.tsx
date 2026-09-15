export const revalidate = 86400; // 24h ISR cache
import { getCityByCleanSlug, CITIES } from "@/lib/db";
import { brands } from "@/data/brands";
import { slugify } from "@/lib/slugify";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import SchemaJSON from "@/components/SchemaJSON";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";
import { InternalMesh } from "@/components/InternalMesh";
import { CheckCircle, Zap, Shield, BatteryCharging, ArrowRight, Award } from "lucide-react";

type Params = Promise<{ slug: string; brand: string }>;

// Generate all combinations of City x Brand
export async function generateStaticParams() {
    const params: { slug: string; brand: string }[] = [];

    Object.values(CITIES).forEach(city => {
        brands.forEach(brand => {
            params.push({
                slug: slugify(city.city),
                brand: brand.slug
            });
        });
    });

    return params;
}

import { headers } from "next/headers";
import { getPseoBrandContent } from "@/lib/pseo-brand";
import { HelpCircle, Sparkles, Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug, brand: brandSlug } = await params;
    const site = getCityByCleanSlug(slug);
    const brandData = brands.find(b => b.slug === brandSlug);

    if (!site || !brandData) return {};

    const pseo = getPseoBrandContent(site.city, brandData, site);
    const headersList = await headers();
    const canonicalDomain = headersList.get("x-irve-canonical-domain") || "expertbornerecharge.com";
    const canonicalUrl = `https://${canonicalDomain}/ville/${slug}/${brandSlug}`;

    return {
        title: pseo.meta_title,
        description: pseo.meta_description,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                "fr-FR": canonicalUrl,
                "x-default": canonicalUrl,
            },
        },
        openGraph: {
            title: pseo.meta_title,
            description: pseo.meta_description,
            siteName: "Expert Borne Recharge",
            locale: "fr_FR",
            type: "website",
            url: canonicalUrl,
            images: [
                {
                    url: brandData.image,
                    width: 1200,
                    height: 630,
                    alt: `Installation Borne ${brandData.name} ${site.city}`
                }
            ]
        },
        robots: { index: true, follow: true },
    };
}

export default async function CityBrandPage({ params }: { params: Params }) {
    const { slug, brand: brandSlug } = await params;
    const site = getCityByCleanSlug(slug);
    const brand = brands.find(b => b.slug === brandSlug);

    if (!site || !brand) return notFound();

    const pseo = getPseoBrandContent(site.city, brand, site);

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
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} city={site.city} phoneNumber={site.phoneNumber} variant="default" />

            {/* Schema JSON — type Service spécifique à la marque */}
            <SchemaJSON type="Service" site={site} brand={brand} />

            {/* Structured Data for FAQ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Breadcrumb structuré */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://expertbornerecharge.com" },
                            { "@type": "ListItem", "position": 2, "name": site.city, "item": `https://expertbornerecharge.com/ville/${slug}` },
                            { "@type": "ListItem", "position": 3, "name": `Borne ${brand.name}`, "item": `https://expertbornerecharge.com/ville/${slug}/${brand.slug}` }
                        ]
                    })
                }}
            />

            {/* Hero Section */}
            <div className="bg-slate-900 text-white pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${brand.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(8px)' }}></div>
                <div className="absolute inset-0 bg-slate-900/80"></div>

                <div className="mx-auto max-w-4xl relative z-10">
                    {/* Breadcrumb visuel */}
                    <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
                        <Link href="/" className="hover:text-white transition">Accueil</Link>
                        <span>/</span>
                        <Link href={`/ville/${slug}`} className="hover:text-white transition">{site.city}</Link>
                        <span>/</span>
                        <span className="text-blue-400 font-bold">Borne {brand.name}</span>
                    </nav>

                    <div className="text-center">
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold mb-6 border border-blue-500/30">
                            <Sparkles size={14} />
                            {pseo.hero_badge}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                            Installation Borne <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">{brand.name}</span><br />
                            à {site.city}
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
                            Rechargez votre {brand.name} ({brand.models.slice(0, 3).join(', ')}) à domicile en {brand.chargeTime}. Pose certifiée IRVE avec crédit d&apos;impôt de 500 €.
                        </p>
                        <a href="#devis" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2 transition shadow-lg hover:shadow-blue-500/25">
                            Obtenir un devis gratuit
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-10">

                        {/* Dynamic Local Intro */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900">
                                <Zap className="text-blue-600" />
                                La recharge idéale pour votre {brand.name} à {site.city}
                            </h2>
                            <div 
                                className="prose prose-lg text-slate-600 max-w-none leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: pseo.intro_html }}
                            />
                        </div>

                        {/* Charging Times Breakdown Table */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900">
                                <Clock className="text-emerald-600" />
                                Comparatif des temps de recharge {brand.name}
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-200 text-slate-500">
                                            <th className="pb-3 font-semibold">Type de recharge</th>
                                            <th className="pb-3 font-semibold">Temps estimé</th>
                                            <th className="pb-3 font-semibold">Puissance & Ampérage</th>
                                            <th className="pb-3 font-semibold">Recommandation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {pseo.battery_charging_table.map((row, i) => (
                                            <tr key={i} className={i === 1 ? "bg-blue-50/50" : ""}>
                                                <td className="py-4 font-bold text-slate-900">{row.power}</td>
                                                <td className="py-4 font-semibold text-blue-600">{row.time}</td>
                                                <td className="py-4 text-slate-600">{row.current}</td>
                                                <td className="py-4 text-slate-600">{row.usage}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Technical Specs Card */}
                        {brand.technicalSpecs && (
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl border border-slate-700">
                                <h4 className="text-xl font-bold mb-4 flex items-center gap-3 text-amber-400">
                                    <Award size={22} />
                                    Conseil Expert IRVE — {brand.name}
                                </h4>
                                <p className="text-slate-200 text-sm leading-relaxed mb-6">{brand.technicalSpecs.expertTip}</p>
                                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <strong className="block text-slate-400 text-xs uppercase mb-1">Câblage</strong>
                                        <span className="text-white font-semibold">{brand.technicalSpecs.cable}</span>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <strong className="block text-slate-400 text-xs uppercase mb-1">Protection</strong>
                                        <span className="text-white font-semibold">{brand.technicalSpecs.protection}</span>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <strong className="block text-slate-400 text-xs uppercase mb-1">Mise à la Terre</strong>
                                        <span className="text-white font-semibold">{brand.technicalSpecs.grounding}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Local Advice Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                            <h3 className="text-xl font-bold mb-4 text-slate-900">
                                {pseo.local_advice.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                {pseo.local_advice.content}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                <div className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-sm text-slate-900">Installation certifiée IRVE</div>
                                        <div className="text-xs text-slate-500">Obligatoire pour les puissances &gt; 3.7 kW</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-sm text-slate-900">Crédit d&apos;impôt 500 €</div>
                                        <div className="text-xs text-slate-500">Accessible à tous les propriétaires et locataires</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Brand Models List */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                            <h3 className="text-xl font-bold mb-4 text-slate-900">Modèles {brand.name} pris en charge à {site.city}</h3>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {brand.models.map(model => (
                                    <li key={model} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <CheckCircle size={16} className="text-blue-500 shrink-0" />
                                        <span><strong>{brand.name} {model}</strong> ({brand.connectorType})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Local Brand FAQs */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900">
                                <HelpCircle className="text-blue-600" />
                                Questions fréquentes — Borne {brand.name} à {site.city}
                            </h3>
                            <div className="space-y-4">
                                {pseo.faqs.map((faq, i) => (
                                    <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60">
                                        <h4 className="font-bold text-slate-900 mb-2 text-sm">
                                            {faq.question}
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2">Résumé de l&apos;intervention</h3>
                            <ul className="space-y-4 text-sm text-slate-600">
                                <li className="flex items-start gap-3">
                                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block text-slate-900">Véhicules pris en charge</strong>
                                        {brand.models.join(', ')}
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <BatteryCharging size={18} className="text-blue-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block text-slate-900">Temps de charge</strong>
                                        {brand.chargeTime} (sur borne {brand.maxPower})
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Zap size={18} className="text-amber-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block text-slate-900">Connecteur</strong>
                                        {brand.connectorType}
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Shield size={18} className="text-blue-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block text-slate-900">Garanties</strong>
                                        Pièces et main d&apos;œuvre (2 ans) à {site.city}
                                    </div>
                                </li>
                            </ul>
                            <a href="#devis" className="mt-6 block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/25">
                                Devis gratuit →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Lead Form */}
                <div id="devis" className="mt-20 pt-16 border-t border-slate-200">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 mb-4">
                            Devis installation borne {brand.name} à {site.city}
                        </h2>
                        <p className="text-slate-500">
                            Mise en relation rapide avec un installateur IRVE spécialiste {brand.name} à {site.city}.
                        </p>
                    </div>
                    <LeadForm domain={site.domain} city={site.city} themeColor="blue" initialProjectType="maison" />
                </div>
            </div>

            {/* SEO Power Components */}
            <FAQ themeColor="blue" />
            <Reviews site={site} themeColor="blue" />
            <InternalMesh city={site.city} config={site} />
            <Footer config={site} />
        </div>
    );
}
