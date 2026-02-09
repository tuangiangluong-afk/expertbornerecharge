import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Zap, Clock, Smartphone, Shield, Euro, Award } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wallbox vs Prise Renforcée 2026 | Le Comparatif Complet",
    description: "Wallbox ou prise renforcée Green'Up ? Comparez les deux solutions de recharge : temps de charge, prix, installation. Guide pour faire le bon choix.",
    keywords: ["wallbox vs prise renforcée", "prise green up", "comparatif borne recharge", "wallbox ou prise renforcée"],
};

// FAQ Data for Schema.org
const faqData = [
    {
        question: "Quelle est la différence entre une wallbox et une prise renforcée ?",
        answer: "La wallbox est une borne de recharge dédiée (7-22kW) offrant une charge rapide et des fonctionnalités avancées. La prise renforcée (Green'Up) est une prise sécurisée (3.7kW max) plus abordable mais plus lente. La wallbox charge 3 à 6 fois plus vite qu'une prise renforcée."
    },
    {
        question: "Quel est le prix d'une prise renforcée vs wallbox ?",
        answer: "Une prise renforcée coûte entre 200€ et 500€ installation comprise. Une wallbox coûte entre 1 200€ et 2 500€ tout compris. La différence de prix est significative mais la wallbox offre plus de fonctionnalités et une charge bien plus rapide."
    },
    {
        question: "La prise renforcée est-elle suffisante pour recharger ma voiture ?",
        answer: "Cela dépend de votre usage. Pour moins de 50 km/jour, une prise renforcée suffit (charge complète en 8-10h la nuit). Pour plus de 100 km/jour ou une batterie de grande capacité (+60kWh), la wallbox est recommandée."
    },
    {
        question: "Peut-on bénéficier des aides avec une prise renforcée ?",
        answer: "Non, les aides (crédit d'impôt, ADVENIR) ne s'appliquent qu'aux bornes de recharge (wallbox) d'une puissance minimum de 3.7kW avec une prise Type 2. La prise renforcée n'est pas éligible aux aides gouvernementales."
    }
];

export default function WallboxVsPriseRenforceePage() {
    const hub = getHubConfig();

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
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white -z-10" />
                <div className="container mx-auto max-w-6xl">
                    <Link href="/guides" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Retour aux Guides
                    </Link>

                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-wide uppercase mb-6">
                            Comparatif 2026
                        </span>

                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                            Wallbox vs Prise Renforcée :<br />
                            <span className="text-purple-600">Quelle Solution Choisir ?</span>
                        </h1>

                        <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                            Temps de charge, prix, installation, aides... Tout ce qu'il faut savoir pour faire le bon choix entre ces deux solutions de recharge.
                        </p>
                    </div>

                    {/* Main Comparison Image */}
                    <div className="relative aspect-[2/1] max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl mt-8">
                        <Image
                            src="/images/generated/wallbox-vs-prise.png"
                            alt="Comparatif Wallbox vs Prise Renforcée Green'Up"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Quick Comparison Table */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
                        Comparatif en un coup d'œil
                    </h2>

                    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                        <div className="grid grid-cols-3">
                            {/* Header Row */}
                            <div className="p-6 bg-slate-50 border-b border-r border-slate-200">
                                <span className="font-bold text-slate-500 text-sm uppercase">Critères</span>
                            </div>
                            <div className="p-6 bg-blue-50 border-b border-r border-slate-200 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Zap className="text-blue-600" size={24} />
                                    <span className="font-bold text-blue-900 text-lg">Wallbox</span>
                                </div>
                            </div>
                            <div className="p-6 bg-green-50 border-b border-slate-200 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Shield className="text-green-600" size={24} />
                                    <span className="font-bold text-green-900 text-lg">Prise Renforcée</span>
                                </div>
                            </div>

                            {/* Data Rows */}
                            {[
                                { label: "Puissance", wallbox: "7 à 22 kW", prise: "2.3 à 3.7 kW", wallboxWin: true },
                                { label: "Temps de charge (50 kWh)", wallbox: "2h30 à 7h", prise: "14h à 22h", wallboxWin: true },
                                { label: "Prix installation", wallbox: "1 200€ - 2 500€", prise: "200€ - 500€", wallboxWin: false },
                                { label: "Éligible aux aides", wallbox: "Oui (jusqu'à 960€)", prise: "Non", wallboxWin: true },
                                { label: "App mobile / Programmation", wallbox: "Oui", prise: "Non", wallboxWin: true },
                                { label: "Compteur intégré", wallbox: "Oui", prise: "Non", wallboxWin: true },
                                { label: "Installation", wallbox: "Électricien IRVE", prise: "Électricien standard", wallboxWin: false },
                            ].map((row, i) => (
                                <div key={i} className="contents">
                                    <div className="p-4 border-b border-r border-slate-200 flex items-center">
                                        <span className="font-medium text-slate-700">{row.label}</span>
                                    </div>
                                    <div className={`p-4 border-b border-r border-slate-200 text-center ${row.wallboxWin ? 'bg-blue-50' : ''}`}>
                                        <span className={`font-semibold ${row.wallboxWin ? 'text-blue-700' : 'text-slate-600'}`}>
                                            {row.wallbox}
                                        </span>
                                    </div>
                                    <div className={`p-4 border-b border-slate-200 text-center ${!row.wallboxWin ? 'bg-green-50' : ''}`}>
                                        <span className={`font-semibold ${!row.wallboxWin ? 'text-green-700' : 'text-slate-600'}`}>
                                            {row.prise}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Comparison */}
            <section className="py-20 px-6 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Wallbox Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border-2 border-blue-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                                    <Zap size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-blue-900">Wallbox</h3>
                                    <p className="text-blue-600">La solution premium</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <h4 className="font-bold text-blue-900 flex items-center gap-2">
                                    <CheckCircle size={18} className="text-green-500" /> Avantages
                                </h4>
                                <ul className="space-y-2">
                                    {[
                                        "Charge rapide : 2h30 à 7h pour une charge complète",
                                        "Programmation heures creuses automatique",
                                        "Suivi de consommation via app mobile",
                                        "Éligible au crédit d'impôt et ADVENIR",
                                        "Valorise votre bien immobilier",
                                        "Compatible tous véhicules électriques"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-blue-800">
                                            <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <h4 className="font-bold text-blue-900 flex items-center gap-2 mt-6">
                                    <XCircle size={18} className="text-red-500" /> Inconvénients
                                </h4>
                                <ul className="space-y-2">
                                    {[
                                        "Coût initial plus élevé (1 200€ - 2 500€)",
                                        "Installation par électricien IRVE obligatoire"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-blue-800">
                                            <XCircle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-blue-600 text-white rounded-2xl p-4 text-center">
                                <p className="text-sm text-blue-200">Idéal pour</p>
                                <p className="font-bold">+50 km/jour ou batterie &gt;40 kWh</p>
                            </div>
                        </div>

                        {/* Prise Renforcée Card */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 border-2 border-green-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white">
                                    <Shield size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-green-900">Prise Renforcée</h3>
                                    <p className="text-green-600">La solution économique</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <h4 className="font-bold text-green-900 flex items-center gap-2">
                                    <CheckCircle size={18} className="text-green-500" /> Avantages
                                </h4>
                                <ul className="space-y-2">
                                    {[
                                        "Prix abordable : 200€ - 500€ tout compris",
                                        "Installation simple et rapide",
                                        "Sécurisée (protection thermique)",
                                        "Suffisante pour petits trajets quotidiens",
                                        "Peut être une solution temporaire"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-green-800">
                                            <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <h4 className="font-bold text-green-900 flex items-center gap-2 mt-6">
                                    <XCircle size={18} className="text-red-500" /> Inconvénients
                                </h4>
                                <ul className="space-y-2">
                                    {[
                                        "Charge très lente (14h à 22h pour 50 kWh)",
                                        "Pas de programmation ni d'app mobile",
                                        "Non éligible aux aides gouvernementales",
                                        "Câble de charge spécifique requis"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-green-800">
                                            <XCircle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-green-600 text-white rounded-2xl p-4 text-center">
                                <p className="text-sm text-green-200">Idéal pour</p>
                                <p className="font-bold">&lt;50 km/jour et petite batterie</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Decision Helper */}
            <section className="py-20 px-6 bg-slate-900 text-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Quel Choix Faire ?
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Notre recommandation selon votre profil
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-blue-600 rounded-3xl p-8">
                            <h3 className="text-xl font-bold mb-4">Choisissez la Wallbox si...</h3>
                            <ul className="space-y-3">
                                {[
                                    "Vous parcourez plus de 50 km par jour",
                                    "Votre véhicule a une batterie > 40 kWh",
                                    "Vous voulez profiter des aides (jusqu'à 960€)",
                                    "Vous souhaitez programmer vos recharges",
                                    "Vous voulez valoriser votre bien immobilier"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-blue-100">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-slate-700 rounded-3xl p-8">
                            <h3 className="text-xl font-bold mb-4">Choisissez la Prise Renforcée si...</h3>
                            <ul className="space-y-3">
                                {[
                                    "Vous parcourez moins de 50 km par jour",
                                    "Votre budget est limité",
                                    "Vous avez un véhicule hybride rechargeable",
                                    "C'est une solution temporaire",
                                    "Vous rechargez principalement la nuit"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-2xl p-6 inline-block">
                            <p className="text-yellow-400 font-bold text-lg mb-2">💡 Notre conseil</p>
                            <p className="text-slate-300 max-w-2xl">
                                Dans 80% des cas, la <strong className="text-white">wallbox est le meilleur investissement</strong>.
                                Avec les aides, le surcoût par rapport à une prise renforcée est souvent inférieur à 500€,
                                pour un confort et une durabilité bien supérieurs.
                            </p>
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
            <section id="devis" className="py-20 px-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                Besoin d'Aide pour Choisir ?
                            </h2>
                            <p className="text-purple-100 text-lg mb-8">
                                Nos experts analysent votre situation et vous recommandent la solution adaptée.
                                Obtenez jusqu'à 3 devis gratuits d'installateurs certifiés.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Étude personnalisée gratuite",
                                    "Calcul des aides selon votre situation",
                                    "Devis comparatifs sous 48h"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Award size={20} className="text-yellow-400" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-6 text-slate-900">
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-bold">Comparez les solutions</h3>
                                <p className="text-sm text-slate-500">Réponse sous 48h • Gratuit</p>
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
