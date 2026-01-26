import { Briefcase, BarChart3, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";

export const metadata = {
    title: "Installation Borne Recharge Entreprise & Flotte | Devis",
    description: "Bornes de recharge pour entreprises et flottes. Gestion à distance, facturation automatique, supervision. Devis installateur IRVE.",
};

export default function SolutionEntreprise() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 mb-6 border border-emerald-200">
                                <Briefcase size={16} className="mr-2" />
                                Solution Entreprise & Flotte
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                Electrifiez votre flotte <br />
                                <span className="text-emerald-600">et boostez votre RSE.</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-8 max-w-lg">
                                Bornes connectées pour collaborateurs et visiteurs. Supervision, refacturation automatique et gestion de flotte.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Supervision et gestion à distance",
                                    "Refacturation automatique aux collaborateurs",
                                    "Bornes rapides DC disponibles",
                                    "Conformité Loi LOM"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <CheckCircle size={20} className="text-green-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-900/10 border border-slate-100 p-8">
                            <h3 className="text-xl font-bold mb-6 text-center">Devis Flotte Entreprise</h3>
                            <LeadForm city="France" domain="expertbornerecharge.com" targetType="ENTREPRISE" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer config={hub} />
        </div>
    );
}
