export const revalidate = 604800; // 7 days ISR cache
import { getAllVehicles, getVehicleById, getVehiclesByBrand } from "@/data/vehicles";
import { clampDescription, clampTitle } from "@/lib/seo-meta";
import { slugify } from "@/lib/slugify";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { 
    Zap, Clock, Battery, CheckCircle, ArrowRight, ArrowLeft, 
    ShieldCheck, Euro, AlertTriangle, Cpu, Wrench, HelpCircle, 
    ChevronRight, Award, Car, Sparkles, Building2, Home
} from "lucide-react";
import SimulatorWidget from "@/components/blog/SimulatorWidget";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NATIONAL_CONFIG } from "@/config/national";
import SchemaJSON from "@/components/SchemaJSON";

export const dynamicParams = true;

export async function generateStaticParams() {
    const vehicles = getAllVehicles().slice(0, 10);
    return vehicles.map((v) => ({
        brand: slugify(v.brand),
        slug: v.id,
    }));
}

function calculateChargeTime(batteryKw: number, powerKw: number): string {
    const time = batteryKw / powerKw;
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    if (minutes === 0) return `${hours}h`;
    return `${hours}h${minutes < 10 ? '0' : ''}${minutes}`;
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; slug: string }> }) {
    const resolvedParams = await params;
    const vehicle = getVehicleById(resolvedParams.slug);
    if (!vehicle) return {};

    const brandSlug = slugify(vehicle.brand);
    const canonicalUrl = `https://expertbornerecharge.com/vehicules/${brandSlug}/${vehicle.id}`;
    const chargeTime7 = calculateChargeTime(vehicle.battery, Math.min(vehicle.maxAC, 7.4));
    const title = clampTitle(`Borne de Recharge ${vehicle.brand} ${vehicle.model} : Prix & Puissance 2026`);
    const description = clampDescription(`Installation certifiée IRVE pour ${vehicle.brand} ${vehicle.model}. Temps de charge : ${chargeTime7}, puissance acceptée : ${vehicle.maxAC} kW, aides 2026 (500€ crédit d'impôt) et devis gratuit.`);

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
            url: canonicalUrl,
            images: [
                {
                    url: vehicle.image,
                    width: 1200,
                    height: 630,
                    alt: `Installation Borne ${vehicle.brand} ${vehicle.model}`
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [vehicle.image],
        },
        robots: { index: true, follow: true },
    };
}

export default async function VehiclePage({ params }: { params: Promise<{ brand: string; slug: string }> }) {
    const resolvedParams = await params;
    const vehicle = getVehicleById(resolvedParams.slug);

    if (!vehicle) return notFound();

    const brandSlug = slugify(vehicle.brand);
    const siblingVehicles = getVehiclesByBrand(vehicle.brand).filter(v => v.id !== vehicle.id).slice(0, 4);

    // Puissance AC acceptée et recommandation technique
    const maxAC = vehicle.maxAC || 11;
    const isTriphaseRecommended = maxAC >= 11;
    const recommendedPower = isTriphaseRecommended ? 11 : 7.4;

    // Calculs de temps de charge 0 à 100%
    const timeSocket = calculateChargeTime(vehicle.battery, 2.3);
    const timeGreenUp = calculateChargeTime(vehicle.battery, 3.7);
    const timeWallbox7 = calculateChargeTime(vehicle.battery, Math.min(maxAC, 7.4));
    const timeWallbox11 = calculateChargeTime(vehicle.battery, Math.min(maxAC, 11));
    const timeWallbox22 = calculateChargeTime(vehicle.battery, Math.min(maxAC, 22));

    // Calculs de temps de charge 20% à 80% (cycle quotidien standard = 60% de la batterie)
    const dailyBattery = vehicle.battery * 0.6;
    const timeDailyWallbox7 = calculateChargeTime(dailyBattery, Math.min(maxAC, 7.4));
    const timeDailyWallbox11 = calculateChargeTime(dailyBattery, Math.min(maxAC, 11));

    // Km récupérés par heure de charge (consommation moyenne réaliste de 17 kWh / 100 km)
    const kmPerHourSocket = Math.round((2.3 / 17) * 100);
    const kmPerHourGreenUp = Math.round((3.7 / 17) * 100);
    const kmPerHourWallbox7 = Math.round((Math.min(maxAC, 7.4) / 17) * 100);
    const kmPerHourWallbox11 = Math.round((Math.min(maxAC, 11) / 17) * 100);

    // Calculs financiers (Tarifs réglementés 2026 EDF Heures Creuses vs Pleines vs Bornes publiques)
    const costHomeHC = (vehicle.battery * 0.1612).toFixed(2);
    const costHomeHP = (vehicle.battery * 0.2516).toFixed(2);
    const costPublicFast = (vehicle.battery * 0.52).toFixed(2);
    const savingsPerFull = (parseFloat(costPublicFast) - parseFloat(costHomeHC)).toFixed(2);
    const annualSavings = Math.round((15000 / 100) * 17 * (0.52 - 0.1612)); // pour 15 000 km/an

    // Top Villes pour maillage interne
    const TOP_CITIES = [
        { name: "Paris", slug: "paris" },
        { name: "Lyon", slug: "lyon" },
        { name: "Marseille", slug: "marseille" },
        { name: "Toulouse", slug: "toulouse" },
        { name: "Nice", slug: "nice" },
        { name: "Bordeaux", slug: "bordeaux" },
        { name: "Nantes", slug: "nantes" },
        { name: "Strasbourg", slug: "strasbourg" },
        { name: "Lille", slug: "lille" },
        { name: "Rennes", slug: "rennes" },
        { name: "Montpellier", slug: "montpellier" },
        { name: "Toulon", slug: "toulon" }
    ];

    // FAQ Technique Spécifique au modèle
    const faqs = [
        {
            q: `Quelle est la puissance de borne idéale pour la ${vehicle.brand} ${vehicle.model} ?`,
            a: `La ${vehicle.brand} ${vehicle.model} embarque un chargeur acceptant jusqu'à ${maxAC} kW en courant alternatif (AC). Pour un logement en monophasé, une borne 7,4 kW (32A) est la solution la plus recommandée : elle recharge l'intégralité de la batterie de ${vehicle.battery} kWh en environ ${timeWallbox7}, soit largement durant la plage des heures creuses nocturnes. Si votre domicile est raccordé en triphasé et que votre modèle accepte le 11 kW, une borne 11 kW permet d'abaisser la charge complète à ${timeWallbox11}.`
        },
        {
            q: `Peut-on recharger la ${vehicle.brand} ${vehicle.model} sur une prise domestique standard ?`,
            a: `Techniquement oui, via le câble de secours 2,3 kW fourni ou optionnel. Cependant, la recharge complète d'une batterie de ${vehicle.battery} kWh prend environ ${timeSocket}. De plus, une prise standard 230V non renforcée n'est pas conçue pour délivrer 10A en continu pendant plus de 20 heures : cela engendre des risques d'échauffement des câbles électriques, de disjonction et de vieillissement prématuré de votre tableau électrique.`
        },
        {
            q: `Combien coûte une recharge complète de la ${vehicle.brand} ${vehicle.model} à domicile en 2026 ?`,
            a: `Sur la base du tarif EDF Heures Creuses 2026 (~0,1612 € / kWh), un plein complet de 0% à 100% de la batterie de ${vehicle.battery} kWh revient à environ ${costHomeHC} €. En heures pleines (~0,2516 € / kWh), le coût s'élève à ${costHomeHP} €. À titre de comparaison, la même quantité d'énergie sur une borne rapide publique ou autoroutière (tarif moyen de 0,52 € / kWh) coûte environ ${costPublicFast} €, soit une économie brute de ${savingsPerFull} € par charge à domicile.`
        },
        {
            q: `Faut-il augmenter la puissance de son compteur Linky pour la ${vehicle.model} ?`,
            a: `Pas nécessairement. Si votre abonnement Linky est de 6 kVA ou 9 kVA, l'ajout d'une borne 7,4 kW (qui consomme à elle seule 32A, soit ~7,4 kVA) peut être sécurisé grâce au délestage dynamique. En reliant la borne à la sortie Télé-Information Client (TIC) de votre compteur Linky, la borne ajuste automatiquement sa puissance de charge en temps réel selon la consommation des autres appareils de la maison (chauffe-eau, four, pompe à chaleur) sans jamais faire disjoncter votre installation.`
        },
        {
            q: `Pourquoi l'installation d'une borne pour ${vehicle.brand} exige-t-elle un électricien certifié IRVE ?`,
            a: `Le décret n° 2017-26 du 12 janvier 2017 impose que tout point de recharge d'une puissance supérieure à 3,7 kW soit installé par un professionnel détenant la mention IRVE (Infrastructures de Recharge pour Véhicules Électriques). Cette certification garantit la pose d'une ligne dédiée en 10 mm² sous gaine avec disjoncteur courbe C et différentiel 30mA Type F / Type A-EV. Sans attestation IRVE, les compagnies d'assurance peuvent refuser d'indemniser un sinistre électrique, la garantie constructeur de ${vehicle.brand} peut être compromise, et vous perdez le crédit d'impôt de 500 €.`
        },
        {
            q: `Quelles sont les aides financières disponibles en 2026 pour installer une borne de ${vehicle.model} ?`,
            a: `En 2026, vous bénéficiez de 3 leviers financiers : 1° Le crédit d'impôt forfaitaire de 500 € par borne connectée/pilotable (sans condition de ressources, pour résidence principale ou secondaire). 2° La TVA à taux réduit de 5,5% sur le matériel et la main d'œuvre. 3° La prime ADVENIR en copropriété, couvrant jusqu'à 50% du coût des travaux (plafond de 960 € HT par point de charge individuel ou pré-équipement collectif).`
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col justify-between">
            <SchemaJSON type="Product" vehicle={vehicle} />
            <SchemaJSON
                type="Breadcrumb"
                breadcrumbItems={[
                    { name: "Accueil", item: "https://expertbornerecharge.com" },
                    { name: "Véhicules", item: "https://expertbornerecharge.com/vehicules" },
                    { name: vehicle.brand, item: `https://expertbornerecharge.com/vehicules/${brandSlug}` },
                    { name: vehicle.model, item: `https://expertbornerecharge.com/vehicules/${brandSlug}/${vehicle.id}` }
                ]}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <Header isHub={true} variant="default" />

            <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
                {/* Fil d'Ariane */}
                <nav className="mb-6 flex items-center text-xs md:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
                    <span className="mx-2 text-slate-300">/</span>
                    <Link href="/vehicules" className="hover:text-blue-600 transition-colors">Véhicules Électriques</Link>
                    <span className="mx-2 text-slate-300">/</span>
                    <Link href={`/vehicules/${brandSlug}`} className="hover:text-blue-600 transition-colors">{vehicle.brand}</Link>
                    <span className="mx-2 text-slate-300">/</span>
                    <span className="text-slate-900 font-semibold">{vehicle.model}</span>
                </nav>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-12">
                    {/* COLONNE GAUCHE */}
                    <div className="space-y-10">

                        {/* HERO HEADER PRODUIT */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="relative h-72 md:h-[420px] w-full">
                                <SafeImage
                                    src={vehicle.image}
                                    fallbackSrc="/images/generated/installation-borne-hero.png"
                                    alt={`Installation Borne de Recharge ${vehicle.brand} ${vehicle.model}`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            Guide Technique 2026
                                        </span>
                                        <span className="bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                                            <ShieldCheck size={14} /> Installateur Qualifié IRVE
                                        </span>
                                        <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                                            Crédit d'impôt 500 €
                                        </span>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                        Installation Borne de Recharge <br />
                                        <span className="text-blue-400">{vehicle.brand} {vehicle.model}</span>
                                    </h1>
                                    <p className="text-slate-200 text-sm md:text-base mt-2 max-w-2xl">
                                        Batterie de <strong>{vehicle.battery} kWh</strong> • Chargeur embarqué <strong>{maxAC} kW AC</strong> • Prise <strong>{vehicle.connector}</strong>
                                    </p>
                                </div>
                            </div>

                            {/* INTRODUCTION EXPERTE */}
                            <div className="p-6 md:p-8 border-b border-slate-100">
                                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                                    <p className="text-base md:text-lg text-slate-800 leading-relaxed font-normal">
                                        Vous conduisez une <strong>{vehicle.brand} {vehicle.model}</strong> ? Pour exploiter le plein potentiel d'autonomie de sa batterie de <strong>{vehicle.battery} kWh</strong> et préserver sa longévité sans dégrader votre installation électrique, l'installation d'une borne de recharge murale (Wallbox) dédiée à domicile est indispensable.
                                    </p>
                                    <p className="text-sm md:text-base">
                                        Recharger sur une prise domestique 230V standard bride considérablement la recharge ({timeSocket} pour un cycle complet) et expose le circuit à une surchauffe continue. En optant pour une borne murale <strong>7,4 kW ou 11 kW certifiée IRVE</strong>, vous divisez votre temps d'immobilisation par trois, programmez la recharge durant les heures creuses nocturnes et bénéficiez de <strong>500 € de crédit d'impôt immédiat</strong>.
                                    </p>
                                </div>
                            </div>

                            {/* BENTO GRID FICHE TECHNIQUE */}
                            <div className="p-6 md:p-8 bg-slate-50/70 border-b border-slate-200">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Cpu className="text-blue-600" size={22} />
                                    Fiche Technique Recharge : {vehicle.brand} {vehicle.model}
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                            <Battery className="text-blue-600" size={16} /> Batterie Nette
                                        </div>
                                        <div className="text-2xl font-black text-slate-900">{vehicle.battery} <span className="text-sm font-semibold text-slate-500">kWh</span></div>
                                        <div className="text-xs text-slate-500 mt-1">Capacité utile standard</div>
                                    </div>

                                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                            <Zap className="text-blue-600" size={16} /> Chargeur AC Max
                                        </div>
                                        <div className="text-2xl font-black text-blue-600">{maxAC} <span className="text-sm font-semibold text-slate-500">kW</span></div>
                                        <div className="text-xs text-slate-500 mt-1">{isTriphaseRecommended ? "Compatible Triphasé" : "Monophasé standard"}</div>
                                    </div>

                                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                            <CheckCircle className="text-emerald-600" size={16} /> Borne Recommandée
                                        </div>
                                        <div className="text-2xl font-black text-emerald-600">{recommendedPower} <span className="text-sm font-semibold text-slate-500">kW</span></div>
                                        <div className="text-xs text-slate-500 mt-1">{isTriphaseRecommended ? "Wallbox 11 kW (3x16A)" : "Wallbox 7.4 kW (32A)"}</div>
                                    </div>

                                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                            <Euro className="text-amber-600" size={16} /> Économie Annuelle
                                        </div>
                                        <div className="text-2xl font-black text-amber-600">~{annualSavings} <span className="text-sm font-semibold text-slate-500">€/an</span></div>
                                        <div className="text-xs text-slate-500 mt-1">vs bornes publiques</div>
                                    </div>
                                </div>
                            </div>

                            {/* TABLEAU COMPARATIF DES 4 MODES DE CHARGE */}
                            <div className="p-6 md:p-8 border-b border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                    Comparatif des temps de recharge pour {vehicle.model}
                                </h2>
                                <p className="text-slate-600 text-sm mb-6">
                                    Estimation précise selon les 4 types d'infrastructures disponibles en France en 2026.
                                </p>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
                                                <th className="py-3 px-4">Équipement</th>
                                                <th className="py-3 px-4">Puissance</th>
                                                <th className="py-3 px-4">Temps 0-100%</th>
                                                <th className="py-3 px-4">Temps 20-80%</th>
                                                <th className="py-3 px-4">Vitesse (km/h)</th>
                                                <th className="py-3 px-4">Avis Expert</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr className="hover:bg-slate-50/60 transition-colors">
                                                <td className="py-4 px-4 font-medium text-slate-700">
                                                    Prise Domestique Standard
                                                </td>
                                                <td className="py-4 px-4 font-mono text-slate-600">2,3 kW (10A)</td>
                                                <td className="py-4 px-4 font-semibold text-slate-600">{timeSocket}</td>
                                                <td className="py-4 px-4 text-slate-500">~{calculateChargeTime(dailyBattery, 2.3)}</td>
                                                <td className="py-4 px-4 text-slate-500">+{kmPerHourSocket} km/h</td>
                                                <td className="py-4 px-4">
                                                    <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-medium border border-amber-200">
                                                        <AlertTriangle size={12} /> Dépannage
                                                    </span>
                                                </td>
                                            </tr>

                                            <tr className="hover:bg-slate-50/60 transition-colors">
                                                <td className="py-4 px-4 font-medium text-slate-700">
                                                    Prise Renforcée (Green'up)
                                                </td>
                                                <td className="py-4 px-4 font-mono text-slate-600">3,7 kW (16A)</td>
                                                <td className="py-4 px-4 font-semibold text-slate-600">{timeGreenUp}</td>
                                                <td className="py-4 px-4 text-slate-500">~{calculateChargeTime(dailyBattery, 3.7)}</td>
                                                <td className="py-4 px-4 text-slate-500">+{kmPerHourGreenUp} km/h</td>
                                                <td className="py-4 px-4">
                                                    <span className="inline-flex items-center gap-1 text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                                                        Petits trajets
                                                    </span>
                                                </td>
                                            </tr>

                                            <tr className={`hover:bg-blue-50/40 transition-colors ${!isTriphaseRecommended ? 'bg-blue-50/30 font-medium' : ''}`}>
                                                <td className="py-4 px-4 font-bold text-slate-900 flex items-center gap-2">
                                                    Wallbox 7,4 kW (Monophasé)
                                                    {!isTriphaseRecommended && (
                                                        <span className="bg-blue-600 text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                                                            Idéal
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 font-mono text-blue-700 font-bold">7,4 kW (32A)</td>
                                                <td className="py-4 px-4 font-bold text-blue-700">{timeWallbox7}</td>
                                                <td className="py-4 px-4 font-semibold text-blue-800">{timeDailyWallbox7}</td>
                                                <td className="py-4 px-4 font-bold text-blue-700">+{kmPerHourWallbox7} km/h</td>
                                                <td className="py-4 px-4">
                                                    <span className="inline-flex items-center gap-1 text-xs text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md font-semibold">
                                                        <CheckCircle size={12} /> Standard Résidentiel
                                                    </span>
                                                </td>
                                            </tr>

                                            <tr className={`hover:bg-emerald-50/40 transition-colors ${isTriphaseRecommended ? 'bg-emerald-50/30 font-medium' : ''}`}>
                                                <td className="py-4 px-4 font-bold text-slate-900 flex items-center gap-2">
                                                    Wallbox 11 kW / 22 kW (Triphasé)
                                                    {isTriphaseRecommended && (
                                                        <span className="bg-emerald-600 text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                                                            Idéal
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 font-mono text-emerald-700 font-bold">{Math.min(maxAC, 22)} kW (3x16A/32A)</td>
                                                <td className="py-4 px-4 font-bold text-emerald-700">{maxAC >= 22 ? timeWallbox22 : timeWallbox11}</td>
                                                <td className="py-4 px-4 font-semibold text-emerald-800">{timeDailyWallbox11}</td>
                                                <td className="py-4 px-4 font-bold text-emerald-700">+{kmPerHourWallbox11} km/h</td>
                                                <td className="py-4 px-4">
                                                    <span className="inline-flex items-center gap-1 text-xs text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md font-semibold">
                                                        {maxAC >= 11 ? "Performance Maximale" : "Bridé par véhicule à 7,4 kW"}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* ANALYSE DU COÛT FINANCIER & RENTABILITÉ */}
                            <div className="p-6 md:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                                        <Euro size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight">
                                            Combien coûte la recharge de votre {vehicle.model} ?
                                        </h2>
                                        <p className="text-slate-400 text-sm">
                                            Calculs réels au centime près basés sur les grilles tarifaires officielles 2026.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                                        <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                                            Heures Creuses (Domicile)
                                        </div>
                                        <div className="text-3xl font-black text-white">{costHomeHC} €</div>
                                        <div className="text-xs text-slate-400 mt-2">
                                            Base 0,1612 € / kWh (ex. Contrat Tempo ou Heures Creuses EDF). Le plein le plus économique.
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                                        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                                            Heures Pleines (Domicile)
                                        </div>
                                        <div className="text-3xl font-black text-white">{costHomeHP} €</div>
                                        <div className="text-xs text-slate-400 mt-2">
                                            Base 0,2516 € / kWh en journée. Deux fois moins cher que l'essence ou le diesel.
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                                        <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                                            Bornes Rapides Publiques
                                        </div>
                                        <div className="text-3xl font-black text-white">{costPublicFast} €</div>
                                        <div className="text-xs text-slate-400 mt-2">
                                            Moyenne 0,52 € / kWh sur réseau public et autoroutier (Ionity, Fastned, TotalEnergies).
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-4 text-sm text-blue-200 flex items-center justify-between flex-wrap gap-4">
                                    <span>
                                        💡 <strong>Amortissement immédiat :</strong> Grâce aux <strong>{savingsPerFull} € économisés à chaque plein</strong> à domicile, votre borne de recharge est rentabilisée en moins de 14 mois.
                                    </span>
                                    <a href="/#simulateur" className="inline-flex items-center gap-1.5 text-white font-bold bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors shrink-0">
                                        Simuler mes économies <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>

                            {/* AUTOPSIE TECHNIQUE DE L'INSTALLATION */}
                            <div className="p-6 md:p-8 border-b border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Wrench className="text-blue-600" size={24} />
                                    Exigences techniques de l'installation IRVE pour {vehicle.brand}
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    Pour alimenter la {vehicle.brand} {vehicle.model} en toute sécurité, la réglementation française (norme NF C 15-100 section 722) impose un cahier des charges strict vérifié par l'installateur :
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                                        <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                                            <Zap className="text-amber-600" size={18} />
                                            Délestage Dynamique (TIC Linky)
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            La borne est reliée au compteur Linky pour lire en direct la puissance disponible du logement. Si votre pompe à chaleur ou vos plaques de cuisson démarrent, la borne réduit automatiquement son ampérage pour éviter la coupure générale, puis réaccélère dès que le réseau se libère.
                                        </p>
                                    </div>

                                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                                        <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                                            <ShieldCheck className="text-emerald-600" size={18} />
                                            Protection Différentielle Type F / B
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Les chargeurs embarqués des véhicules modernes génèrent des courants de fuite à composante continue. Un interrupteur différentiel haute immunité 30mA (Type F ou Type B) associé à un disjoncteur courbe C dédié est obligatoire pour protéger les usagers et le véhicule.
                                        </p>
                                    </div>

                                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                                        <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                                            <Building2 className="text-blue-600" size={18} />
                                            Ligne Dédiée en Cuivre 10 mm²
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Pour une borne 7,4 kW (32A), un câble rigide R2V 3G10 mm² est tiré depuis le tableau principal jusqu'à l'emplacement de stationnement sous gaine TPC rouge enterrée ou goulotte étanche certifiée IK10.
                                        </p>
                                    </div>

                                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                                        <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                                            <Award className="text-purple-600" size={18} />
                                            Attestation de Conformité Consuel
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            La certification IRVE de nos installateurs permet la délivrance de l'attestation légale exigée par les assurances habitation et permet de débloquer le versement du crédit d'impôt de 500 € et de la prime ADVENIR.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* CÂBLE MISTER EV AFFILIATION */}
                            <div className="p-6 md:p-8 border-b border-slate-100 bg-amber-50/40">
                                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                                    <div className="flex flex-col md:flex-row gap-6 items-center">
                                        <div className="flex-1">
                                            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2.5 py-1 rounded-md">
                                                Accessoire Indispensable
                                            </span>
                                            <h3 className="text-amber-950 font-bold text-xl mt-2 mb-2">
                                                Câble Type 2 pour recharger votre {vehicle.brand} hors domicile
                                            </h3>
                                            <p className="text-amber-900/80 text-sm mb-4 leading-relaxed">
                                                Sur les bornes publiques en voirie ou en entreprise, les câbles attachés sont rares. Pour ne jamais rester bloqué, équipez votre {vehicle.model} d'un câble Type 2 triphasé 32A (22 kW) compatible 100% des stations européennes.
                                            </p>
                                            <ul className="space-y-2 mb-5">
                                                <li className="flex items-center gap-2 text-sm text-amber-900 font-medium">
                                                    <CheckCircle size={16} className="text-amber-600" />
                                                    Compatible 100% des bornes publiques AC (France & Europe)
                                                </li>
                                                <li className="flex items-center gap-2 text-sm text-amber-900 font-medium">
                                                    <CheckCircle size={16} className="text-amber-600" />
                                                    Câble certifié TUV / CE résistant à l'écrasement (sac offert)
                                                </li>
                                            </ul>
                                            <a 
                                                href="https://www.mister-ev.com/cables-de-recharge?aff=expertbornerecharge" 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-colors"
                                            >
                                                Voir les câbles pour {vehicle.brand} <ArrowRight size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION FAQ COMPLETE */}
                            <div className="p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <HelpCircle className="text-blue-600" size={24} />
                                    Questions fréquentes sur la recharge {vehicle.brand} {vehicle.model}
                                </h2>

                                <div className="space-y-4">
                                    {faqs.map((faq, idx) => (
                                        <details key={idx} className="group bg-slate-50 rounded-2xl p-5 border border-slate-200 transition-all open:bg-white open:shadow-sm" open={idx === 0}>
                                            <summary className="flex items-center justify-between cursor-pointer font-bold text-base md:text-lg text-slate-900 hover:text-blue-600 list-none">
                                                <span>{faq.q}</span>
                                                <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                                            </summary>
                                            <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-100 pt-3">
                                                {faq.a}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* MAILLAGE INTERNE : AUTRES MODÈLES DE LA MARQUE */}
                        {siblingVehicles.length > 0 && (
                            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        <Car className="text-blue-600" size={20} />
                                        Autres modèles électriques {vehicle.brand}
                                    </h3>
                                    <Link href={`/vehicules/${brandSlug}`} className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
                                        Toute la gamme {vehicle.brand} <ArrowRight size={14} />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    {siblingVehicles.map((sibling) => (
                                        <Link 
                                            key={sibling.id} 
                                            href={`/vehicules/${brandSlug}/${sibling.id}`}
                                            className="group block bg-slate-50 rounded-2xl p-3 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all"
                                        >
                                            <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2">
                                                <SafeImage
                                                    src={sibling.image}
                                                    alt={`Borne ${sibling.brand} ${sibling.model}`}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                                                {sibling.model}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {sibling.battery} kWh • {sibling.maxAC} kW AC
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* MAILLAGE INTERNE : GRANDES VILLES POUR INSTALLATION */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <Building2 className="text-blue-600" size={20} />
                                Installateurs IRVE partout en France pour votre {vehicle.brand}
                            </h3>
                            <p className="text-slate-600 text-sm mb-6">
                                Nos électriciens certifiés Qualifelec IRVE interviennent sous 48h dans toutes les métropoles françaises :
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {TOP_CITIES.map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={`/ville/${city.slug}`}
                                        className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-center text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                                    >
                                        Borne à {city.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* COLONNE DROITE (STICKY SIDEBAR) */}
                    <div className="lg:sticky lg:top-24 h-fit space-y-8">
                        <SimulatorWidget />

                        {/* ENCART SPÉCIAL MARQUE & AIDES */}
                        <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-800">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/60 px-2.5 py-1 rounded-md">
                                Devis Certifié IRVE
                            </span>
                            <h3 className="font-bold text-xl mt-3 mb-2">
                                Propriétaire de {vehicle.brand} {vehicle.model} ?
                            </h3>
                            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                                Recevez jusqu'à 3 devis comparatifs d'installateurs IRVE locaux certifiés pour brancher votre {vehicle.model} en toute sécurité.
                            </p>

                            <ul className="space-y-3 text-xs text-slate-300 mb-6">
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                                    Déduction immédiate du crédit d'impôt (500 €)
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                                    TVA réduite à 5,5% sur le devis complet
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                                    Délestage Linky & protection matériel garantie 2 ans
                                </li>
                            </ul>

                            <a 
                                href="/#simulateur" 
                                className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all"
                            >
                                Comparer 3 devis gratuits
                            </a>
                            <div className="mt-3 text-center text-xs text-slate-400">
                                Réponse sous 24h • Sans engagement
                            </div>
                        </div>

                        {/* LIEN GUIDES COMPLÉMENTAIRES */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                                Guides Recommandés
                            </h4>
                            <div className="space-y-2 text-sm">
                                <Link href="/guides/borne-copropriete-droit-a-la-prise-advenir-2026" className="block text-slate-600 hover:text-blue-600 transition-colors">
                                    ➔ Installer en copropriété (Droit à la prise 2026)
                                </Link>
                                <Link href="/guides/borne-7kw-vs-11kw-prix-installation" className="block text-slate-600 hover:text-blue-600 transition-colors">
                                    ➔ Borne 7,4 kW vs 11 kW : que choisir ?
                                </Link>
                                <Link href="/fiscalite-entreprise-borne" className="block text-slate-600 hover:text-blue-600 transition-colors">
                                    ➔ Avantages fiscaux & amortissement pour pro
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer config={NATIONAL_CONFIG} />
        </div>
    );
}
