export const revalidate = 86400; // 24h ISR cache
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { brands } from '@/data/brands';
import { getCurrentYearSEO } from '@/lib/date';
import Link from 'next/link';
import { CheckCircle, Zap, Shield, Info, ArrowRight, Settings } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getHubConfig } from '@/lib/sites-config';
import LeadForm from '@/components/LeadForm';
import CrossLinker from '@/components/CrossLinker';

interface PageProps {
    params: Promise<{ brand: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { brand: slug } = await params;
    const brand = brands.find(b => b.slug === slug);
    const year = getCurrentYearSEO();

    if (!brand) return {};

    return {
        title: `Installation Borne de Recharge ${brand.name} : Prix & Devis ${year}`,
        description: `Installateur certifié IRVE pour votre ${brand.name} (${brand.models.join(', ')}). Devis gratuit, crédit d'impôt et installation sous 7 jours. Expert ${brand.name} ${year}.`,
    };
}

export async function generateStaticParams() {
    return brands.map((brand) => ({
        brand: brand.slug,
    }));
}

import { headers } from 'next/headers';

export default async function BrandPage({ params, searchParams }: PageProps) {
    const { brand: slug } = await params;
    const { city: simulatedCity } = await searchParams; // Allow local testing via ?city=Lyon

    console.log(`[BrandPage] Debug Slug: ${slug}`);
    const brand = brands.find(b => b.slug === slug);
    console.log(`[BrandPage] Found brand: ${brand?.name}`);

    const year = getCurrentYearSEO();

    // War Architecture: GeoIP Detection (with local override)
    const headersList = await headers();
    const vercelCity = headersList.get("x-vercel-ip-city");

    // Priority: 1. Query Param (Testing) 2. Vercel Header (Prod) 3. Null (Fallback)
    const rawCity = simulatedCity ? (simulatedCity as string) : vercelCity;
    const decodedCity = rawCity ? decodeURIComponent(rawCity) : null;

    console.log(`[BrandPage] Detected City: ${decodedCity} (Source: ${simulatedCity ? 'Query Param' : 'Header'})`);

    if (!brand) {
        console.error(`[BrandPage] Brand not found for slug: ${slug}. Available slugs: ${brands.map(b => b.slug).join(', ')}`);
        return notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />


            {/* Hero */}
            <div className="bg-slate-900 text-white pt-32 pb-20 px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-400 text-sm font-bold mb-4 border border-blue-600/30">
                        Expert {brand.name} {year}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Installation de Borne <br />
                        pour <span className="text-blue-500">{brand.name}</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Vous avez une {brand.models[0]} ou une {brand.models[1]} ?
                        Nos électriciens certifiés IRVE installent la borne parfaite pour votre {brand.name}.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Technical Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Zap className="text-amber-500" />
                                Caractéristiques de Charge {brand.name}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <div className="text-slate-500 text-sm mb-1">Connecteur</div>
                                    <div className="font-bold text-lg">{brand.connectorType}</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <div className="text-slate-500 text-sm mb-1">Puissance Max AC</div>
                                    <div className="font-bold text-lg">{brand.maxPower}</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <div className="text-slate-500 text-sm mb-1">Temps de Charge (0-100%)</div>
                                    <div className="font-bold text-lg">{brand.chargeTime}</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <div className="text-slate-500 text-sm mb-1">Câble Recommandé</div>
                                    <div className="font-bold text-lg">
                                        {brand.technicalSpecs?.cable || "Type 2 - 32A"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* War Architecture: Technical Specs "Expert" */}
                        {brand.technicalSpecs && (
                            <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 border border-slate-700 shadow-xl">
                                <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                                    <Settings className="text-blue-500" />
                                    Spécifications Techniques {year}
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-4">
                                        <div className="min-w-[140px] font-bold text-white">Protection</div>
                                        <div>{brand.technicalSpecs.protection}</div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="min-w-[140px] font-bold text-white">Mise à la Terre</div>
                                        <div>{brand.technicalSpecs.grounding}</div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="min-w-[140px] font-bold text-yellow-500">Conseil Pro</div>
                                        <div className="italic text-white">"{brand.technicalSpecs.expertTip}"</div>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {/* Content Body */}
                        <div className="prose prose-lg text-slate-600 max-w-none">
                            <h3>Quelle borne choisir pour une {brand.name} ?</h3>
                            <p>
                                Les véhicules {brand.name} ({brand.models.join(', ')}) acceptent la recharge accélérée en courant alternatif (AC).
                                Pour optimiser votre temps de charge à domicile, nous recommandons l'installation d'une <strong>Wallbox 7,4 kW</strong> monophasée.
                            </p>
                            <p>
                                Cela vous permettra de récupérer environ <strong>40 à 50 km d'autonomie par heure de charge</strong> pour votre {brand.name}.
                                Une simple prise domestique suffirait pour de très petits trajets, mais deviendrait vite limitante (10 à 15h pour une charge complète).
                            </p>

                            <h3>Faut-il installer un disjoncteur spécifique ?</h3>
                            <p>
                                Oui. La norme NF C 15-100 impose une ligne dédiée pour la recharge de votre véhicule électrique.
                                Votre installation devra comporter un interrupteur différentiel Type A ou B (selon la borne) et un disjoncteur adapté à la puissance (32A ou 40A).
                                Nos devis incluent systématiquement ces protections obligatoires.
                            </p>

                            {slug === 'tesla' && (
                                <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 not-prose">
                                    <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                                        <Zap className="text-blue-600" size={20} />
                                        Dossiers Techniques &amp; Guides Spéciaux Tesla
                                    </h4>
                                    <p className="text-slate-600 text-sm mb-4">
                                        Consultez nos dossiers d&apos;experts pour préparer votre projet d&apos;installation à domicile :
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <Link href="/guides/tesla-wall-connector-installation-france" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-sm transition block group">
                                            <span className="font-bold text-slate-900 group-hover:text-blue-600 block text-sm mb-1">Tesla Wall Connector Gen 3</span>
                                            <span className="text-xs text-slate-500">Installation, installateur agréé &amp; prix 2026</span>
                                        </Link>
                                        <Link href="/guides/recharger-tesla-domicile" className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-sm transition block group">
                                            <span className="font-bold text-slate-900 group-hover:text-blue-600 block text-sm mb-1">Recharger sa Tesla à Domicile</span>
                                            <span className="text-xs text-slate-500">Prise renforcée vs Wallbox vs Coût au kWh</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CROSS LINKER (War Architecture) */}
                        <CrossLinker brandName={brand.name} detectedCity={decodedCity} />

                        {/* CTA Block */}
                        <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">Besoin d'un devis pour votre {brand.name} ?</h3>
                                <p className="text-blue-100 mb-6 max-w-lg">
                                    Recevez 3 devis comparatifs d'installateurs qualifiés IRVE près de chez vous.
                                </p>
                                <a href="#devis" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-blue-50 transition">
                                    Simuler mon prix
                                    <ArrowRight size={18} />
                                </a>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-1/3 bg-blue-500/30 transform skew-x-12 translate-x-12" />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2">Modèles Compatibles</h3>
                            <ul className="space-y-3">
                                {brand.models.map((model) => (
                                    <li key={model} className="flex items-center gap-3 text-slate-600">
                                        <CheckCircle size={16} className="text-green-500" />
                                        {model}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h4 className="font-bold text-sm mb-3 text-slate-900">Pourquoi nous choisir ?</h4>
                                <ul className="space-y-3 text-sm text-slate-500">
                                    <li className="flex gap-2">
                                        <Shield size={16} className="text-blue-500 shrink-0" />
                                        Installation Garantie 2 ans
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle size={16} className="text-blue-500 shrink-0" />
                                        Certification IRVE (Obligatoire)
                                    </li>
                                    <li className="flex gap-2">
                                        <Info size={16} className="text-blue-500 shrink-0" />
                                        Support dédié {brand.name}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lead Form Section */}
                <div id="devis" className="mt-20 pt-16 border-t border-slate-200">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 mb-4">
                            Votre Devis {brand.name} en 3 clics
                        </h2>
                        <p className="text-slate-500">
                            Sans engagement. Réponse sous 24h.
                        </p>
                    </div>
                    <LeadForm domain="expertbornerecharge.com" city="National" themeColor="blue" initialProjectType="maison" />
                </div>

            </div>

            <Footer config={getHubConfig()} />
        </div>
    );
}
