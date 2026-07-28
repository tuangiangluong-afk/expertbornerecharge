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

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug, brand: brandSlug } = await params;
    const site = getCityByCleanSlug(slug);
    const brandData = brands.find(b => b.slug === brandSlug);

    if (!site || !brandData) return {};

    const title = `Installateur Borne ${brandData.name} à ${site.city}${site.postalCode ? ` (${site.postalCode})` : ''} | Devis IRVE Gratuit`;
    const description = `Installation certifiée IRVE pour ${brandData.name} (${brandData.models.slice(0, 3).join(', ')}) à ${site.city}. ${brandData.chargeTime} de charge. Devis gratuit, garantie 2 ans, prime Advenir déduite.`;

    const headersList = await headers();
    const canonicalDomain = headersList.get("x-irve-canonical-domain") || "expertbornerecharge.com";
    const canonicalUrl = `https://${canonicalDomain}/ville/${slug}/${brandSlug}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            siteName: "Expert Borne Recharge",
            locale: "fr_FR",
            type: "website",
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

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} city={site.city} phoneNumber={site.phoneNumber} variant="default" />

            {/* Schema JSON — type Service spécifique à la marque */}
            <SchemaJSON type="Service" site={site} brand={brand} />

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
                            <Zap size={14} />
                            Expert Certifié IRVE — Spécialiste {brand.name}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                            Installation Borne <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">{brand.name}</span><br />
                            à {site.city}
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
                            Vous roulez en {brand.models[0]}{brand.models[1] ? ` ou ${brand.models[1]}` : ''} ? Nos électriciens certifiés installent la borne parfaitement adaptée à votre {brand.name} à {site.city}.
                        </p>
                        <a href="#devis" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2 transition">
                            Obtenir un devis gratuit
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">

                        <div className="prose prose-lg text-slate-600 max-w-none">
                            <h2>La recharge idéale pour votre {brand.name} à {site.city}</h2>
                            <p>
                                Pour recharger efficacement votre <strong>{brand.name}</strong>, il est crucial d&apos;installer une borne adaptée à la puissance de votre véhicule (jusqu&apos;à {brand.maxPower}).
                                En choisissant notre réseau d&apos;installateurs certifiés IRVE sur <strong>{site.city}{site.postalCode ? ` (${site.postalCode})` : ''}</strong>, vous vous assurez une installation conforme à la norme NF C 15-100.
                            </p>

                            {brand.technicalSpecs && (
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-8 not-prose">
                                    <h4 className="text-blue-900 font-bold mb-2 flex items-center gap-2">
                                        <Award className="text-amber-500" size={20} />
                                        Conseil Technique {brand.name}
                                    </h4>
                                    <p className="text-blue-800 text-sm mb-4">{brand.technicalSpecs.expertTip}</p>
                                    <div className="grid sm:grid-cols-3 gap-3 text-sm">
                                        <div className="bg-white/70 rounded-lg p-3">
                                            <strong className="block text-blue-900">Câble</strong>
                                            <span className="text-blue-700">{brand.technicalSpecs.cable}</span>
                                        </div>
                                        <div className="bg-white/70 rounded-lg p-3">
                                            <strong className="block text-blue-900">Protection</strong>
                                            <span className="text-blue-700">{brand.technicalSpecs.protection}</span>
                                        </div>
                                        <div className="bg-white/70 rounded-lg p-3">
                                            <strong className="block text-blue-900">Mise à la Terre</strong>
                                            <span className="text-blue-700">{brand.technicalSpecs.grounding}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <h3>Pourquoi un électricien IRVE pour votre {brand.name} à {site.city} ?</h3>
                            <p>
                                L&apos;installation d&apos;une borne de recharge de plus de 3,7 kW par un professionnel <strong>certifié IRVE</strong> est obligatoire par la loi.
                                Cela vous garantit la sécurité de votre installation, le maintien de la garantie constructeur de votre {brand.name},
                                et l&apos;accès aux aides de l&apos;État (Prime Advenir et Crédit d&apos;impôt).
                            </p>

                            <h3>Modèles {brand.name} pris en charge</h3>
                            <ul>
                                {brand.models.map(model => (
                                    <li key={model}><strong>{brand.name} {model}</strong> — Connecteur {brand.connectorType}, charge jusqu&apos;à {brand.maxPower}</li>
                                ))}
                            </ul>
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
                            <a href="#devis" className="mt-6 block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
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
