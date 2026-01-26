import { Zap, Clock, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";

export const metadata = {
    title: "Installation Borne Recharge Maison Individuelle | Devis",
    description: "Installation de borne de recharge à domicile en 48h. Wallbox 7kW ou 22kW. Crédit d'impôt 500€ inclus. Devis gratuit.",
};

export default function SolutionMaison() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            {/* HERO */}
            <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 mb-6 border border-blue-200">
                                <Zap size={16} className="mr-2" />
                                Solution Maison Individuelle
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                Rechargez à domicile, <br />
                                <span className="text-blue-600">simplement.</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-8 max-w-lg">
                                L'installation clé en main en 48h. Wallbox compatible toutes marques. Crédit d'impôt déduit.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Installation en 48h chrono",
                                    "Crédit d'impôt 500€ garanti",
                                    "Wallbox connectée intelligente",
                                    "Garantie 2 ans pièces et main d'œuvre"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <CheckCircle size={20} className="text-green-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100 p-8">
                            <h3 className="text-xl font-bold mb-6 text-center">Testez votre éligibilité</h3>
                            <LeadForm city="France" domain="expertbornerecharge.com" targetType="MAISON" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer config={hub} />
        </div>
    );
}
