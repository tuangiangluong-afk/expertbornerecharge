import { Metadata } from "next";
import { getSiteConfig } from "@/lib/sites-config";
import { Euro, CheckCircle, FileText, Phone, Building2, Home, ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ domain: string }>;
}): Promise<Metadata> {
    const { domain } = await params;
    const config = getSiteConfig(domain);

    return {
        title: `Guide des subventions pour bornes de recharge 2025 | ${config?.name || "Expert Borne Recharge"}`,
        description: "Découvrez toutes les aides financières pour l'installation de votre borne de recharge : MaPrimeRénov', ADVENIR, Crédit d'impôt. Jusqu'à 960€ d'économies.",
    };
}

interface Grant {
    name: string;
    amount: string;
    eligible: string[];
    description: string;
    icon: React.ReactNode;
    color: string;
}

const grants: Grant[] = [
    {
        name: "Crédit d'impôt",
        amount: "Jusqu'à 500€",
        eligible: ["Résidence principale", "Propriétaires et locataires"],
        description: "Le crédit d'impôt pour l'installation d'une borne de recharge permet de déduire jusqu'à 75% du coût de l'équipement et de la pose, dans la limite de 500€ par système de charge. Ce dispositif est accessible aux propriétaires, locataires et occupants à titre gratuit pour leur résidence principale.",
        icon: <Euro className="w-6 h-6" />,
        color: "blue",
    },
    {
        name: "Prime ADVENIR",
        amount: "Jusqu'à 960€",
        eligible: ["Copropriétés", "Parkings partagés", "Entreprises"],
        description: "Le programme ADVENIR finance une partie du coût des bornes en copropriété ou sur des parkings d'entreprise ouverts au public. Le taux de prise en charge peut atteindre 50% du coût HT, avec un plafond de 960€ par point de recharge pour les particuliers en copropriété.",
        icon: <Building2 className="w-6 h-6" />,
        color: "green",
    },
    {
        name: "MaPrimeRénov'",
        amount: "Variable",
        eligible: ["Logements de +15 ans", "Travaux de rénovation globale"],
        description: "Dans le cadre de travaux de rénovation énergétique globale, MaPrimeRénov' peut également contribuer au financement de l'installation d'une borne de recharge. Les montants varient selon vos revenus et le type de travaux réalisés.",
        icon: <Home className="w-6 h-6" />,
        color: "purple",
    },
    {
        name: "TVA réduite 5,5%",
        amount: "Économie ~14%",
        eligible: ["Logements de +2 ans", "Installation par professionnel RGE"],
        description: "Pour les logements achevés depuis plus de 2 ans, vous bénéficiez d'une TVA à 5,5% au lieu de 20% sur la pose d'une borne de recharge, à condition que l'installation soit réalisée par un professionnel qualifié.",
        icon: <FileText className="w-6 h-6" />,
        color: "amber",
    },
];

export default async function GrantsGuidePage({
    params,
}: {
    params: Promise<{ domain: string }>;
}) {
    const { domain } = await params;
    const config = getSiteConfig(domain);

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; text: string; border: string }> = {
            blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
            green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
            purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
            amber: { bg: "bg-amber-100", text: "text-amber-600", border: "border-amber-200" },
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
                        <Euro className="w-4 h-4" />
                        Guide des aides 2025
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                        Toutes les subventions pour votre borne de recharge
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Crédit d&apos;impôt, Prime ADVENIR, MaPrimeRénov&apos;... Découvrez comment économiser
                        jusqu&apos;à <strong className="text-white">960€</strong> sur votre installation.
                    </p>
                    <Link
                        href={`/${domain}#lead-form`}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
                    >
                        Calculer mes aides
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Summary Cards */}
            <section className="py-12 md:py-16 bg-slate-50">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center">
                            <div className="text-3xl font-black text-blue-600 mb-2">500€</div>
                            <div className="text-slate-600 font-medium">Crédit d&apos;impôt max</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center">
                            <div className="text-3xl font-black text-green-600 mb-2">960€</div>
                            <div className="text-slate-600 font-medium">Prime ADVENIR max</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center">
                            <div className="text-3xl font-black text-purple-600 mb-2">5,5%</div>
                            <div className="text-slate-600 font-medium">TVA réduite</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Grants */}
            <section className="py-12 md:py-16">
                <div className="max-w-4xl mx-auto px-4 md:px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
                        Détail des aides disponibles
                    </h2>

                    <div className="space-y-8">
                        {grants.map((grant, index) => {
                            const colors = getColorClasses(grant.color);
                            return (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl p-6 md:p-8 border ${colors.border} shadow-sm`}
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className={`${colors.bg} ${colors.text} h-14 w-14 rounded-xl flex items-center justify-center shrink-0`}>
                                            {grant.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <h3 className="text-xl font-bold text-slate-900">{grant.name}</h3>
                                                <span className={`${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm font-bold`}>
                                                    {grant.amount}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 mb-4">{grant.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {grant.eligible.map((item, i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-flex items-center gap-1 text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full"
                                                    >
                                                        <CheckCircle className="w-3 h-3 text-green-500" />
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Prêt à bénéficier de ces aides ?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                        Nos installateurs certifiés IRVE gèrent toutes les démarches administratives pour vous.
                        Recevez votre devis gratuit en 2 minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${domain}#lead-form`}
                            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-colors"
                        >
                            Demander mon devis gratuit
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href={`tel:${config?.phoneNumber || "01 84 80 00 00"}`}
                            className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-800 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            Appeler un conseiller
                        </Link>
                    </div>
                </div>
            </section>

            {/* Back link */}
            <section className="py-8 text-center">
                <Link
                    href={`/${domain}`}
                    className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors"
                >
                    ← Retour à l&apos;accueil
                </Link>
            </section>
        </div>
    );
}
