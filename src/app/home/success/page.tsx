import { Metadata } from "next";
import { getSiteConfig } from "@/lib/sites-config";
import { CheckCircle, Phone, Wrench, FileText, Gift, ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
    const domain = "expertbornerecharge.com";
    const config = getSiteConfig(domain);

    return {
        title: `Demande reçue | ${config?.name || "Expert Borne Recharge"}`,
        description: "Votre demande de devis a été envoyée avec succès. Un expert vous contactera sous 24h.",
        robots: { index: false, follow: false },
    };
}

interface TimelineStep {
    icon: React.ReactNode;
    title: string;
    timing: string;
    description: string;
    active: boolean;
}

const timelineSteps: TimelineStep[] = [
    {
        icon: <Phone className="w-5 h-5" />,
        title: "Appel d'un expert",
        timing: "Sous 24h",
        description: "Nous confirmerons vos besoins d'installation et répondrons à vos questions initiales.",
        active: true,
    },
    {
        icon: <Wrench className="w-5 h-5" />,
        title: "Visite technique",
        timing: "Évaluation sur site",
        description: "Un installateur certifié visitera votre domicile pour vérifier le tableau électrique et déterminer le meilleur emplacement.",
        active: false,
    },
    {
        icon: <FileText className="w-5 h-5" />,
        title: "Devis personnalisé",
        timing: "Adapté à vos besoins",
        description: "Vous recevrez un devis détaillé incluant le matériel, l'installation et les aides éligibles.",
        active: false,
    },
];

export default async function SuccessPage() {
    const domain = "expertbornerecharge.com";
    const config = getSiteConfig(domain);
    const siteName = config?.name || "Expert Borne Recharge";

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 md:px-20">
                <Link href={`/${domain}`} className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M11 1L3 11H10V23L19 12H12V1Z" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold text-slate-900">{siteName}</span>
                </Link>
                <Link
                    href={`/${domain}/contact`}
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                    Centre d&apos;aide
                </Link>
            </header>

            <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
                {/* Success Hero */}
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <CheckCircle className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                        Demande reçue !
                    </h1>
                    <p className="text-lg text-slate-600 max-w-xl">
                        Vous êtes sur la bonne voie pour recharger chez vous. Un de nos experts borne de recharge
                        examinera vos informations et vous contactera sous 24h.
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Timeline */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                Prochaines étapes
                            </h2>

                            <div className="space-y-0">
                                {timelineSteps.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        {/* Timeline line and icon */}
                                        <div className="flex flex-col items-center">
                                            {index !== 0 && (
                                                <div className="w-0.5 h-4 bg-slate-200" />
                                            )}
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-full z-10 ${step.active
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "bg-slate-100 text-slate-500 border border-slate-200"
                                                }`}>
                                                {step.icon}
                                            </div>
                                            {index !== timelineSteps.length - 1 && (
                                                <div className="w-0.5 bg-slate-200 h-full min-h-[40px]" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-8">
                                            <p className="text-slate-900 text-lg font-semibold">{step.title}</p>
                                            <p className={`text-sm font-medium mb-1 ${step.active ? "text-blue-600" : "text-slate-500"
                                                }`}>
                                                {step.timing}
                                            </p>
                                            <p className="text-slate-500 text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-6 flex flex-wrap justify-center gap-8 opacity-60">
                            {["QUALIFELEC", "IRVE", "ADVENIR"].map((badge) => (
                                <div key={badge} className="text-xs font-bold text-slate-500 tracking-widest">
                                    {badge}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Value adds */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Grant Guide Card */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-1 shadow-lg text-white overflow-hidden relative">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/30 rounded-full blur-2xl" />
                            <div className="p-6 md:p-8 relative z-10">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/20 border border-blue-600/30 text-xs font-bold text-blue-400 mb-3">
                                    <Gift className="w-3 h-3" />
                                    Ressource gratuite
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-2">
                                    Optimisez votre budget
                                </h3>
                                <p className="text-slate-300 text-sm mb-6">
                                    Téléchargez notre guide complet sur les aides gouvernementales
                                    comme <strong>ADVENIR</strong> et le <strong>Crédit d&apos;impôt</strong> pour
                                    économiser jusqu&apos;à 960€.
                                </p>
                                <Link
                                    href={`/${domain}/guides/subventions-bornes-recharge`}
                                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all w-full"
                                >
                                    <Download className="w-4 h-4" />
                                    Télécharger le guide
                                </Link>
                            </div>
                        </div>

                        {/* Referral Card */}
                        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-5 items-center">
                            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                                <Gift className="w-6 h-6" />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h4 className="text-slate-900 font-bold mb-1">Parrainez un ami</h4>
                                <p className="text-slate-500 text-sm mb-3">
                                    Vous connaissez quelqu&apos;un qui achète un VE ?
                                    Obtenez <span className="font-bold text-slate-800">50€ de réduction</span> sur
                                    votre installation pour chaque parrainage.
                                </p>
                                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 mx-auto sm:mx-0">
                                    Obtenir mon lien de parrainage
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Return link */}
                <div className="mt-16 text-center">
                    <Link
                        href={`/${domain}`}
                        className="text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors"
                    >
                        ← Retour à l&apos;accueil
                    </Link>
                </div>
            </main>
        </div>
    );
}
