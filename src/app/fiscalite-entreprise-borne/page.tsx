export const revalidate = 604800; // 7 days ISR cache
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, TrendingDown, Building2, Calculator, Info, ArrowRight } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getHubConfig } from '@/lib/sites-config';
import { clampDescription, clampTitle, ogImageUrl } from '@/lib/seo-meta';

const fiscaliteOgImage = ogImageUrl({
    q: "Fiscalité Borne Entreprise",
    sub: "Amortissement, TVA récupérable à 100% et aides Advenir 2026",
    badge: "GUIDE FISCALITÉ FLOTTE 2026",
});

export const metadata: Metadata = {
    title: clampTitle("Borne de Recharge Entreprise 2026 : Fiscalité, Amortissement & TVA"),
    description: clampDescription("Fiscalité borne de recharge entreprise 2026 : TVA 100 % récupérable, amortissement IS, exonération URSSAF Avantage en Nature et primes Advenir jusqu'à 9 000 €."),
    alternates: {
        canonical: "https://expertbornerecharge.com/fiscalite-entreprise-borne",
    },
    openGraph: {
        title: "Fiscalité Borne de Recharge Entreprise 2026 | Guide & Aides",
        description: "Amortissement exceptionnel, TVA 100% récupérable et prime Advenir. Transformez vos bornes de recharge en levier d'économies d'impôt.",
        url: "https://expertbornerecharge.com/fiscalite-entreprise-borne",
        siteName: "Expert Borne Recharge",
        locale: "fr_FR",
        type: "article",
        images: [{ url: fiscaliteOgImage, width: 1200, height: 630, alt: "Fiscalité borne de recharge entreprise 2026" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Fiscalité Borne de Recharge Entreprise 2026 | Guide & Aides",
        description: "Amortissement, TVA récupérable et aides Advenir pour flotte d'entreprise.",
        images: [fiscaliteOgImage],
    },
    robots: { index: true, follow: true },
};

export default function FiscalitePage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://expertbornerecharge.com",
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Fiscalité Entreprise",
                "item": "https://expertbornerecharge.com/fiscalite-entreprise-borne",
            },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "La TVA sur l'électricité de recharge est-elle récupérable pour une entreprise ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Oui, la TVA sur l'électricité est récupérable à 100% pour les véhicules utilitaires et les véhicules particuliers (VP) s'ils sont 100% électriques, contrairement aux carburants thermiques.",
                },
            },
            {
                "@type": "Question",
                "name": "Quel est le montant de la prime ADVENIR pour une entreprise en 2026 ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Pour un parking privé à destination de flotte ou de salariés, la prime ADVENIR peut atteindre jusqu'à 600 € par point de recharge. Pour un parking ouvert au public, elle peut atteindre jusqu'à 2 200 € par point de charge.",
                },
            },
            {
                "@type": "Question",
                "name": "La recharge au bureau est-elle considérée comme un avantage en nature pour le salarié ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Non, l'utilisation d'une borne de recharge sur le lieu de travail mise à disposition par l'employeur est exonérée d'impôt sur le revenu et de cotisations sociales car considérée comme un avantage en nature négligeable.",
                },
            },
        ],
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <div className="fixed top-0 w-full z-50">
                <Header isHub={true} variant="default" />
            </div>

            <main className="flex-grow">
                {/* HERO SECTION */}
                <section className="relative pt-32 pb-20 bg-blue-900 text-white overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 opacity-90" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                                <TrendingDown size={16} />
                                Optimisation Fiscale 2026
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                                La Borne de Recharge : <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">
                                    Un Paradis Fiscal pour l'Entreprise
                                </span>
                            </h1>
                            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
                                Amortissement, TVA, Aides Advenir... Découvrez comment transformer l'installation de vos bornes en levier d'économies d'impôts.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="#simulateur"
                                    className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition shadow-lg hover:shadow-yellow-400/20"
                                >
                                    Demander une étude fiscale gratuite
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MAIN CONTENT */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* LEFT: CONTENT */}
                            <div className="lg:col-span-2 space-y-12">

                                {/* AEO DIRECT ANSWER + SIMULATION TABLE */}
                                <div className="bg-blue-950 text-white p-8 rounded-3xl shadow-md border border-blue-800">
                                    <div className="text-xs font-bold uppercase tracking-wider text-yellow-300 mb-2">
                                        Synthèse Fiscalité B2B 2026
                                    </div>
                                    <p className="text-blue-50 text-base leading-relaxed mb-6">
                                        <strong>Réponse Directe :</strong> Une entreprise qui installe des bornes de recharge IRVE récupère <strong>100 % de la TVA</strong> sur les travaux et sur l&apos;électricité de ses véhicules électriques, déduit l&apos;investissement par <strong>amortissement</strong> sur son résultat imposable (IS), et profite d&apos;une <strong>exonération URSSAF totale d&apos;Avantage en Nature</strong> sur la recharge fournie sur le parking professionnel.
                                    </p>
                                    <div className="overflow-x-auto rounded-2xl bg-white text-slate-900">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                                <tr>
                                                    <th className="py-3 px-4">Simulation PME : 4 bornes 22 kW OCPP (TGBT existant)</th>
                                                    <th className="py-3 px-4 text-right">Montant</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                <tr>
                                                    <td className="py-3 px-4">Budget Brut (Matériel OCPP/MID + Câblage + Pose IRVE P2)</td>
                                                    <td className="py-3 px-4 text-right font-semibold">9 000 € HT (10 800 € TTC)</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-4">TVA déductible immédiatement (100 % récupérable)</td>
                                                    <td className="py-3 px-4 text-right font-semibold text-emerald-700">- 1 800 €</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 px-4">Économie d&apos;Impôt sur les Sociétés via amortissement (IS 25 %)</td>
                                                    <td className="py-3 px-4 text-right font-semibold text-emerald-700">- 2 250 €</td>
                                                </tr>
                                                <tr className="bg-emerald-50 font-bold">
                                                    <td className="py-3 px-4 text-emerald-950">Coût réel net entreprise (hors aide Advenir si parking public)</td>
                                                    <td className="py-3 px-4 text-right text-emerald-800">6 750 € Net (1 687 €/point)</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-5 flex flex-wrap gap-4 text-sm">
                                        <Link href="/guides/installation-borne-recharge-entreprise" className="text-yellow-300 hover:underline font-semibold flex items-center gap-1">
                                            Guide Technique Entreprise &amp; Loi LOM <ArrowRight size={14} />
                                        </Link>
                                        <Link href="/blog/deduction-fiscale-borne-recharge-entreprise" className="text-blue-200 hover:underline font-semibold flex items-center gap-1">
                                            Détail Déduction Fiscale &amp; Amortissement <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>

                                {/* 1. AMORTISSEMENT */}
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                                            <Calculator size={32} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-neutral-900">1. Amortissement Accéléré</h2>
                                            <p className="text-neutral-500">Un dispositif puissant pour réduire votre IS</p>
                                        </div>
                                    </div>
                                    <div className="prose prose-blue max-w-none text-neutral-600">
                                        <p>
                                            L'installation de bornes de recharge en entreprise bénéficie de règles d'amortissement très favorables. Contrairement à des équipements classiques, l'État encourage massivement cet investissement.
                                        </p>
                                        <ul className="space-y-2 mt-4">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                                                <span><strong>Amortissement sur 12 mois</strong> : Possibilité pour certaines PME d'amortir l'intégralité de l'investissement sur un an (sous conditions).</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                                                <span><strong>Déduction des charges</strong> : L'électricité fournie aux salariés peut être déduite des charges de l'entreprise.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* 2. TVA & AEN */}
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                            <Building2 size={32} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-neutral-900">2. TVA & Avantage en Nature</h2>
                                            <p className="text-neutral-500">Optimisation pour l'employeur et le salarié</p>
                                        </div>
                                    </div>
                                    <div className="prose prose-blue max-w-none text-neutral-600">
                                        <h3 className="text-lg font-bold text-neutral-900">Pour l'entreprise</h3>
                                        <p>
                                            La TVA sur l'électricité est récupérable à 100% pour les véhicules utilitaires et les véhicules particuliers (VP) s'ils sont électriques. C'est une différence majeure avec le carburant fossile.
                                        </p>

                                        <h3 className="text-lg font-bold text-neutral-900 mt-6">Pour le salarié (Avantage en Nature)</h3>
                                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                                            <p className="font-medium text-blue-900">
                                                Jusqu'à fin 2024 (prolongeable), l'URSSAF applique une réduction de 50% sur l'avantage en nature lié à l'utilisation d'un véhicule électrique mis à disposition par l'employeur.
                                            </p>
                                        </div>
                                        <p className="mt-4">
                                            De plus, la recharge sur le lieu de travail est aujourd'hui considérée comme un avantage en nature <strong>négligeable</strong> (donc non imposé) pour le salarié.
                                        </p>
                                    </div>
                                </div>

                                {/* 3. AIDES ADVENIR */}
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                                            <Info size={32} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-neutral-900">3. Prime ADVENIR 2026</h2>
                                            <p className="text-neutral-500">L'État finance votre infrastructure</p>
                                        </div>
                                    </div>
                                    <div className="prose prose-blue max-w-none text-neutral-600">
                                        <p>
                                            Le programme ADVENIR reste le pilier du financement pour les parkings privés d'entreprises et de flottes.
                                        </p>
                                        <div className="grid sm:grid-cols-2 gap-4 mt-6">
                                            <div className="border border-neutral-200 rounded-xl p-4 text-center">
                                                <div className="text-sm text-neutral-500">Parking Privé (Flotte)</div>
                                                <div className="text-3xl font-bold text-neutral-900 my-2">Jusqu'à 600€</div>
                                                <div className="text-xs text-neutral-400">Par point de charge</div>
                                            </div>
                                            <div className="border border-neutral-200 rounded-xl p-4 text-center">
                                                <div className="text-sm text-neutral-500">Parking Public</div>
                                                <div className="text-3xl font-bold text-neutral-900 my-2">Jusqu'à 2 200€</div>
                                                <div className="text-xs text-neutral-400">Par point de charge</div>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-sm text-neutral-500 italic">
                                            *Les montants et conditions évoluent régulièrement. Une offre clés en main certifiée ADVENIR est indispensable pour débloquer ces fonds.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: STICKY FORM */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <div id="simulateur" className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-200">
                                        <div className="bg-blue-900 p-6 text-white text-center">
                                            <h3 className="font-bold text-xl mb-2">Simulateur Économies</h3>
                                            <p className="text-blue-200 text-sm">Devis & Étude Fiscale Gratuits</p>
                                        </div>
                                        <div className="p-6">
                                            {/* Pre-configured LeadForm for Enterprise */}
                                            <LeadForm
                                                city="France"
                                                domain="expertbornerecharge.com"
                                                targetType="ENTREPRISE"
                                                themeColor="blue"
                                                initialProjectType="entreprise"
                                            />
                                        </div>
                                        <div className="p-4 bg-neutral-50 text-center border-t border-neutral-100">
                                            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                                                <CheckCircle size={14} className="text-green-500" />
                                                <span>Installateurs Qualifiés IRVE</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Call to action box */}
                                    <div className="mt-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 text-blue-900">
                                        <h4 className="font-bold text-lg mb-2">Besoin d'un audit de flotte ?</h4>
                                        <p className="text-sm mb-4 opacity-90">
                                            Pour les flottes de +10 véhicules, nous réalisons un audit technique et financier sur mesure.
                                        </p>
                                        <a href="#simulateur" className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 transition rounded-xl py-3 font-bold">
                                            Demander un audit gratuit
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer config={getHubConfig()} />
        </div>
    );
}
