import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Euro, Home, Building2, Briefcase, Zap, Calculator, Award, Phone } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Prix Installation Borne de Recharge 2026 | Combien ça Coûte ?",
    description: "Découvrez le coût réel d'installation d'une borne de recharge en 2026. Prix par type de logement, aides disponibles et devis gratuit d'installateurs IRVE.",
    keywords: ["prix installation borne recharge", "cout borne recharge", "tarif borne electrique", "devis borne recharge"],
    alternates: {
        canonical: "https://expertbornerecharge.com/guides/prix-installation-borne-recharge",
    },
};

// FAQ Data for Schema.org
const faqData = [
    {
        question: "Quel est le prix moyen d'une borne de recharge ?",
        answer: "Le prix moyen d'une borne de recharge (wallbox) se situe entre 500€ et 1 500€ pour le matériel. L'installation par un électricien IRVE coûte entre 300€ et 1 500€ selon la complexité. Au total, comptez entre 1 200€ et 2 500€ tout compris pour une maison individuelle."
    },
    {
        question: "Quelles aides pour installer une borne de recharge en 2026 ?",
        answer: "En 2026, vous pouvez cumuler : le crédit d'impôt de 500€ (75% du coût), la prime ADVENIR jusqu'à 960€ pour les copropriétés, et la TVA réduite à 5.5%. Ces aides peuvent couvrir jusqu'à 50% du coût total."
    },
    {
        question: "Combien coûte l'installation en copropriété ?",
        answer: "En copropriété, le coût varie entre 1 500€ et 3 000€ par point de charge. Avec la prime ADVENIR (jusqu'à 50% du coût), le reste à charge peut descendre à 750€-1 500€. L'infrastructure collective permet de mutualiser les coûts."
    },
    {
        question: "L'installation d'une borne est-elle rentable ?",
        answer: "Oui, très rentable ! Recharger à domicile coûte environ 3€/100km contre 15€/100km en station publique. Sur 15 000 km/an, vous économisez environ 1 800€. L'installation est amortie en 1-2 ans."
    }
];

export default function PrixInstallationBornePage() {
    const hub = getHubConfig();

    // Price data
    const priceData = [
        {
            icon: Home,
            title: "Maison Individuelle",
            priceRange: "1 200€ - 2 500€",
            details: "Wallbox 7-22kW + installation",
            features: ["Installation simple", "Éligible crédit impôt 500€", "TVA 5.5%"],
            color: "blue"
        },
        {
            icon: Building2,
            title: "Copropriété",
            priceRange: "1 500€ - 3 000€",
            details: "Par point de charge",
            features: ["Prime ADVENIR jusqu'à 960€", "Infrastructure collective possible", "Droit à la prise"],
            color: "purple",
            popular: true
        },
        {
            icon: Briefcase,
            title: "Entreprise",
            priceRange: "2 000€ - 5 000€",
            details: "Par borne avec supervision",
            features: ["Prime ADVENIR Pro", "Gestion de flotte", "Facturation intégrée"],
            color: "emerald"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            {/* Schema.org FAQ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqData.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            {/* Hero */}
            <section className="pt-32 pb-12 lg:pt-40 lg:pb-20 px-6 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10" />
                <div className="container mx-auto max-w-6xl">
                    <Link href="/guides" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Retour aux Guides
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-wide uppercase mb-6">
                                Guide Prix 2026
                            </span>

                            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                                Combien Coûte l'Installation d'une <span className="text-blue-600">Borne de Recharge</span> ?
                            </h1>

                            <p className="text-xl text-slate-600 leading-relaxed mb-8">
                                Prix réels, aides disponibles et devis gratuits. Tout ce que vous devez savoir avant d'installer votre borne en 2026.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a href="#devis" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/25">
                                    <Calculator size={20} />
                                    Estimer mon projet
                                </a>
                                <a href="#prix" className="inline-flex items-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-xl font-bold border border-slate-200 hover:border-blue-500 transition">
                                    <Euro size={20} />
                                    Voir les prix
                                </a>
                            </div>
                        </div>

                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/generated/installation-borne-hero.png"
                                alt="Installation borne de recharge par électricien IRVE"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Price Cards */}
            <section id="prix" className="py-20 px-6 bg-slate-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Prix par Type de Logement
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Tarifs moyens constatés en France en 2026, matériel et installation inclus
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {priceData.map((item, i) => (
                            <div
                                key={i}
                                className={`relative bg-white rounded-3xl p-8 border-2 transition-all hover:shadow-xl ${item.popular ? 'border-purple-500 shadow-xl shadow-purple-500/10' : 'border-slate-200 hover:border-blue-500'
                                    }`}
                            >
                                {item.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                                        LE PLUS DEMANDÉ
                                    </div>
                                )}

                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                        item.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                            'bg-emerald-100 text-emerald-600'
                                    }`}>
                                    <item.icon size={28} />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500 mb-4">{item.details}</p>

                                <div className="text-3xl font-black text-slate-900 mb-6">
                                    {item.priceRange}
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {item.features.map((feature, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="#devis"
                                    className={`block text-center py-3 rounded-xl font-bold transition ${item.popular
                                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                                            : 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white'
                                        }`}
                                >
                                    Demander un devis
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Aides Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Jusqu'à <span className="text-yellow-400">2 460€</span> d'Aides Cumulables
                        </h2>
                        <p className="text-blue-100 text-lg">
                            Réduisez significativement le coût de votre installation
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Crédit d'Impôt", value: "500€", detail: "75% du coût, max 500€" },
                            { label: "Prime ADVENIR", value: "960€", detail: "Copropriétés et entreprises" },
                            { label: "TVA Réduite", value: "5.5%", detail: "Au lieu de 20%" },
                            { label: "MaPrimeRénov'", value: "1000€", detail: "Sous conditions de revenus" },
                        ].map((aide, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                                <div className="text-3xl font-bold text-yellow-400 mb-2">{aide.value}</div>
                                <div className="font-semibold mb-1">{aide.label}</div>
                                <div className="text-sm text-blue-200">{aide.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cost Breakdown */}
            <section className="py-20 px-6 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Décomposition des Coûts
                        </h2>
                        <p className="text-slate-600 text-lg">
                            Comprendre ce qui compose le prix final
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                        <div className="space-y-6">
                            {[
                                { label: "Borne (Wallbox)", range: "500€ - 1 500€", percent: 50, desc: "7kW à 22kW, marques premium" },
                                { label: "Installation électrique", range: "300€ - 1 200€", percent: 35, desc: "Câblage, disjoncteur, mise en service" },
                                { label: "Mise aux normes tableau", range: "0€ - 500€", percent: 10, desc: "Si nécessaire (ancien tableau)" },
                                { label: "Certificat IRVE", range: "Inclus", percent: 5, desc: "Obligatoire pour les aides" },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <span className="font-bold text-slate-900">{item.label}</span>
                                            <span className="text-sm text-slate-500 ml-2">{item.desc}</span>
                                        </div>
                                        <span className="font-bold text-blue-600">{item.range}</span>
                                    </div>
                                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                            style={{ width: `${item.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                            <span className="text-xl font-bold text-slate-900">Total moyen</span>
                            <span className="text-3xl font-black text-blue-600">1 500€ - 2 500€</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lifestyle Image Section */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
                            <Image
                                src="/images/generated/charging-home-lifestyle.png"
                                alt="Famille rechargeant sa voiture électrique à domicile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                                Un Investissement Rentabilisé en <span className="text-green-600">12-18 Mois</span>
                            </h2>
                            <div className="space-y-4 text-lg text-slate-600">
                                <p>
                                    Avec un coût moyen de <strong>3€ pour 100 km</strong> à domicile contre 15€ en station publique,
                                    votre borne s'amortit rapidement.
                                </p>
                                <p>
                                    Pour 15 000 km/an, vous économisez environ <strong className="text-green-600">1 800€ par an</strong> sur votre budget carburant.
                                </p>
                            </div>
                            <ul className="mt-6 space-y-3">
                                {[
                                    "Recharge aux heures creuses = tarif imbattable",
                                    "Plus de détours à la station service",
                                    "Valorisation de votre bien immobilier"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700">
                                        <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Questions Fréquentes
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqData.map((faq, i) => (
                            <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                                <p className="text-slate-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA / Lead Form */}
            <section id="devis" className="py-20 px-6 bg-slate-900 text-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                Obtenez Votre Devis <span className="text-blue-400">Gratuit</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8">
                                Comparez jusqu'à 3 devis d'installateurs certifiés IRVE près de chez vous.
                                Réponse sous 48h, sans engagement.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Installateurs locaux certifiés IRVE",
                                    "Devis détaillé avec aides calculées",
                                    "Accompagnement dans vos démarches"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Award size={20} className="text-yellow-500" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-6 text-slate-900">
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-bold">Estimez votre projet</h3>
                                <p className="text-sm text-slate-500">Réponse immédiate • Gratuit</p>
                            </div>
                            <LeadForm
                                city="France"
                                domain="expertbornerecharge.com"
                                targetType="MIXED"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer config={hub} />
        </div>
    );
}
