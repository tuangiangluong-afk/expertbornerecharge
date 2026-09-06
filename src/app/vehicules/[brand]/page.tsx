export const revalidate = 86400; // 24h ISR cache
import { getVehiclesByBrand, getAllVehicles } from "@/data/vehicles";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { ArrowLeft, Zap, CheckCircle, Award, Shield, Clock, HelpCircle, ChevronRight, Euro } from "lucide-react";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";

export async function generateStaticParams() {
    const vehicles = getAllVehicles();
    const brands = Array.from(new Set(vehicles.map((v) => v.brand.toLowerCase())));
    return brands.map((brand) => ({
        brand: brand,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
    const resolvedParams = await params;
    const models = getVehiclesByBrand(resolvedParams.brand);
    if (models.length === 0) return {};

    const brandName = models[0].brand;
    const modelNames = models.map(m => m.model).slice(0, 3).join(', ');
    const canonicalUrl = `https://expertbornerecharge.com/vehicules/${resolvedParams.brand.toLowerCase()}`;

    return {
        title: `Installation Borne Recharge ${brandName} | Devis IRVE Gratuit`,
        description: `Installation certifiée IRVE de bornes de recharge pour ${brandName} (${modelNames}). Devis gratuit sous 24h, matériel garanti 2 ans, crédit d'impôt 500€.`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `Installation Borne Recharge ${brandName} | Devis IRVE Gratuit`,
            description: `Borne de recharge adaptée pour ${brandName} (${modelNames}). Installation professionnelle certifiée IRVE.`,
            siteName: "Expert Borne Recharge",
            locale: "fr_FR",
            type: "website",
            url: canonicalUrl,
        },
        robots: { index: true, follow: true },
    };
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
    const resolvedParams = await params;
    const models = getVehiclesByBrand(resolvedParams.brand);

    if (models.length === 0) return notFound();

    const realBrandName = models[0].brand;
    const heroImage = models[0].image; // Dynamic Hero Image based on first model
    const brandLower = resolvedParams.brand.toLowerCase();

    // Technical calculations
    const avgBattery = Math.round(models.reduce((sum, m) => sum + (m.battery || 60), 0) / models.length);
    const maxAC = Math.max(...models.map(m => m.maxAC || 11));

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://expertbornerecharge.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Véhicules",
                "item": "https://expertbornerecharge.com/vehicules"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": realBrandName,
                "item": `https://expertbornerecharge.com/vehicules/${brandLower}`
            }
        ]
    };

    // Brand FAQs
    const faqs = [
        {
            q: `Quelle est la meilleure borne de recharge pour une ${realBrandName} ?`,
            a: `Pour une ${realBrandName}, une borne murale (Wallbox) de 7,4 kW en monophasé (32A) est la solution recommandée pour 90% des usages à domicile. Elle permet de recharger une batterie de ${avgBattery} kWh en environ 6 à 8 heures durant les heures creuses de nuit. Si votre logement dispose d'une alimentation triphasée et que votre modèle accepte jusqu'à ${maxAC} kW AC, une borne 11 kW est idéale.`
        },
        {
            q: `Combien de temps faut-il pour recharger une ${realBrandName} à la maison ?`,
            a: `Sur une prise domestique standard (2,3 kW), comptez entre 20h et 30h pour une recharge complète. Sur une prise renforcée 3,7 kW, environ 14h à 18h. Sur une Wallbox 7,4 kW, la recharge d'une ${realBrandName} prend entre 6h et 8h. Sur une borne triphasée 11 kW, le temps descend à 4h à 6h selon la capacité de la batterie.`
        },
        {
            q: `L'installation par un professionnel certifié IRVE est-elle obligatoire pour ${realBrandName} ?`,
            a: `Oui. Conformément au décret n° 2017-26 du 12 janvier 2017, toute installation d'un point de recharge supérieur à 3,7 kW (comme une Wallbox de 7,4 kW ou 11 kW) doit être réalisée par un électricien titulaire de la qualification IRVE. Cette certification est indispensable pour valider la garantie constructeur de votre ${realBrandName}, vos assurances habitation et percevoir le crédit d'impôt de 500 €.`
        },
        {
            q: `Quelles aides de l'État sont disponibles pour installer une borne ${realBrandName} en 2026 ?`,
            a: `Vous bénéficiez d'un crédit d'impôt forfaitaire de 500 € par borne pilotable (sans condition de ressources), de la TVA à taux réduit de 5,5 % sur le matériel et la pose, et de la prime ADVENIR en copropriété (jusqu'à 960 € HT par point de recharge individuel ou 50 % des infrastructures collectives).`
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
            }
        }))
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            {/* Navbar */}
            <Header isHub={true} variant="default" />

            {/* HERO SECTION (New Global Design) */}
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <Link href="/vehicules" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6 group">
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Toutes les marques
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* Left: Content + Lead Form */}
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <div className="text-center lg:text-left space-y-6">
                                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-800 border border-blue-200 mx-auto lg:mx-0">
                                    <Zap size={16} className="mr-2" />
                                    Bornes pour {realBrandName}
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                    Installation de borne pour <span className="text-blue-600">{realBrandName}</span>
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Découvrez les temps de recharge et la puissance acceptée par votre {realBrandName}.
                                    Installation clé en main par des experts certifiés IRVE.
                                </p>
                            </div>

                            {/* LEAD FORM - Integrated Here */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left">
                                <div id="simulateur" className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 overflow-hidden border border-slate-200">
                                    <div className="p-1 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                                    <div className="p-6 md:p-8">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-slate-900">Testez votre éligibilité</h3>
                                            <p className="text-sm text-slate-500">Réponse immédiate • Gratuit • Sans engagement</p>
                                        </div>
                                        <LeadForm
                                            city="France"
                                            domain="expertbornerecharge.com"
                                            targetType="MAISON" // Default for vehicles, usually individuals
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Large Hero Image + Trust Badges */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full">
                            <div className="relative h-[640px] w-full mb-8">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-100 bg-white p-2">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                                        <SafeImage
                                            src={heroImage}
                                            fallbackSrc="/images/generated/installation-borne-hero.png"
                                            alt={`Borne recharge ${realBrandName}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                                        {/* Image Caption/Badge */}
                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="bg-white/95 backdrop-blur rounded-xl p-5 shadow-xl border border-white/50 flex items-center gap-4 cursor-default">
                                                <div className="bg-blue-100 p-3 rounded-full shrink-0">
                                                    <Zap className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-slate-900">Compatible {realBrandName}</div>
                                                    <div className="text-sm font-medium text-slate-500">Toutes versions</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Elements relocated - Right Column */}
                            <div className="flex flex-wrap items-center gap-4 justify-center px-4">
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <Award size={24} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-slate-900 text-base">Qualifelec</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <Award size={24} className="text-blue-500 fill-blue-500" />
                                    <span className="font-bold text-slate-900 text-base">RGE</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <CheckCircle size={24} className="text-green-500 fill-green-100" />
                                    <span className="font-bold text-slate-900 text-base">Garantie décennale</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 pb-24">
                <div className="mb-12 text-center lg:text-left">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Tous les modèles {realBrandName}</h2>
                    <p className="text-slate-600">Choisissez votre véhicule pour voir les caractéristiques détaillées.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {models.map((model) => (
                        <Link
                            key={model.id}
                            href={`/vehicules/${model.brand.toLowerCase()}/${model.id}`}
                            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200"
                        >
                            <div className="relative h-48 w-full bg-slate-100">
                                <SafeImage
                                    src={model.image}
                                    fallbackSrc="/images/generated/installation-borne-hero.png"
                                    alt={model.model}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                    <Zap size={12} className="text-blue-600" />
                                    {model.maxAC}kW
                                </div>
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {model.model}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Batterie {model.battery}kWh • Connecteur {model.connector}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* TECHNICAL IRVE GUIDE SECTION */}
                <section className="mt-24 pt-16 border-t border-slate-200">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Guide Technique IRVE</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
                            Tout savoir sur la recharge d'une {realBrandName} à domicile
                        </h2>
                        <p className="text-lg text-slate-600">
                            Puissances acceptées, temps de recharge réels, normes de sécurité et subventions de l'État pour votre installation.
                        </p>
                    </div>

                    {/* COMPARATIVE CHARGING TABLE */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mb-16 overflow-x-auto">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Clock className="text-blue-600" size={22} />
                            Comparatif des temps de recharge pour {realBrandName} (Batterie moy. {avgBattery} kWh)
                        </h3>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-sm font-semibold text-slate-500">
                                    <th className="py-4 px-4">Solution de recharge</th>
                                    <th className="py-4 px-4">Puissance</th>
                                    <th className="py-4 px-4">Ampérage / Alimentation</th>
                                    <th className="py-4 px-4">Temps de charge (20-80%)</th>
                                    <th className="py-4 px-4">Usage conseillé</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                <tr>
                                    <td className="py-4 px-4 font-medium text-slate-900">Prise domestique standard</td>
                                    <td className="py-4 px-4">2,3 kW</td>
                                    <td className="py-4 px-4">10A Monophasé</td>
                                    <td className="py-4 px-4 text-amber-600 font-semibold">18h à 24h</td>
                                    <td className="py-4 px-4 text-slate-500">Dépannage uniquement (échauffement)</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-4 font-medium text-slate-900">Prise renforcée (Green'up)</td>
                                    <td className="py-4 px-4">3,7 kW</td>
                                    <td className="py-4 px-4">16A Monophasé</td>
                                    <td className="py-4 px-4 font-semibold">10h à 14h</td>
                                    <td className="py-4 px-4 text-slate-500">Petits trajets quotidiens (&lt; 40 km/j)</td>
                                </tr>
                                <tr className="bg-blue-50/50">
                                    <td className="py-4 px-4 font-bold text-blue-900 flex items-center gap-2">
                                        <Zap size={16} className="text-blue-600 shrink-0" />
                                        Wallbox 7,4 kW (Recommandée)
                                    </td>
                                    <td className="py-4 px-4 font-bold text-blue-900">7,4 kW</td>
                                    <td className="py-4 px-4 font-medium">32A Monophasé (Câble 3G10mm²)</td>
                                    <td className="py-4 px-4 text-green-700 font-bold">5h à 7h</td>
                                    <td className="py-4 px-4 font-medium text-blue-900">Idéal domicile / Nuit heures creuses</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-4 font-medium text-slate-900">Borne Triphasée 11 kW / 22 kW</td>
                                    <td className="py-4 px-4">11 à 22 kW</td>
                                    <td className="py-4 px-4">16A ou 32A Triphasé</td>
                                    <td className="py-4 px-4 text-green-700 font-bold">3h à 5h (si chargeur 11kW)</td>
                                    <td className="py-4 px-4 text-slate-500">Grands rouleurs ou installation triphasée</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* ELECTRICAL NORMS & SAFETY */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                <Shield size={24} />
                            </div>
                            <h4 className="font-bold text-lg text-slate-900 mb-2">Norme NF C 15-100 & Section 722</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                L'installation nécessite une ligne électrique dédiée avec disjoncteur courbe C et protection différentielle 30mA haute immunité (Type A-EV ou Type F) pour parer aux fuites de courant continu.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                                <Award size={24} />
                            </div>
                            <h4 className="font-bold text-lg text-slate-900 mb-2">Certification Qualifelec IRVE</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Décret n° 2017-26 : un installateur certifié IRVE est légalement requis pour toute puissance supérieure à 3,7 kW. C'est la condition sine qua non pour valider vos assurances et débloquer les aides de l'État.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                                <Euro size={24} />
                            </div>
                            <h4 className="font-bold text-lg text-slate-900 mb-2">Aides & Subventions 2026</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Profitez du crédit d'impôt de 500 € par borne pilotable, de la TVA réduite à 5,5 % et de la prime ADVENIR jusqu'à 960 € en copropriété. Nous déduisons les aides directement de votre devis.
                            </p>
                        </div>
                    </div>

                    {/* BRAND FAQ ACCORDION */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                            <HelpCircle className="text-blue-600" size={24} />
                            Foire aux questions sur la recharge {realBrandName}
                        </h3>
                        <div className="space-y-6">
                            {faqs.map((faq, idx) => (
                                <details key={idx} className="group border-b border-slate-100 pb-6 last:border-b-0 last:pb-0" open={idx === 0}>
                                    <summary className="flex items-center justify-between cursor-pointer font-bold text-lg text-slate-900 hover:text-blue-600 list-none">
                                        <span>{faq.q}</span>
                                        <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                                    </summary>
                                    <p className="mt-4 text-slate-600 leading-relaxed text-sm">
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
