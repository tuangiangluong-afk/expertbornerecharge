import { Building2, Users, FileText, ArrowRight, CheckCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";

export const metadata = {
    title: "Installation Borne Recharge Copropriété | Syndic & Résidents",
    description: "Solution de recharge pour copropriété. Droit à la prise ou infrastructure collective. Aide ADVENIR jusqu'à 960€. Accompagnement AG gratuit.",
};

export default function SolutionCopro() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full bg-purple-50 px-4 py-2 text-sm font-bold text-purple-700 mb-6 border border-purple-200">
                                <Building2 size={16} className="mr-2" />
                                Solution Copropriété
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                La recharge en copro, <br />
                                <span className="text-purple-600">sans frais pour le syndic.</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-8 max-w-lg">
                                Infrastructure collective ou droit à la prise individuel. Nous gérons tout : dossier technique, AG, subventions Advenir.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "0€ d'investissement pour la copro (Tiers-Investissement)",
                                    "Prime ADVENIR jusqu'à 960€ / point de charge",
                                    "Facturation individuelle de l'électricité",
                                    "Accompagnement en AG gratuit"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <CheckCircle size={20} className="text-green-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-3xl shadow-2xl shadow-purple-900/10 border border-slate-100 p-8">
                            <h3 className="text-xl font-bold mb-6 text-center">Étude Gratuite Copropriété</h3>
                            <LeadForm city="France" domain="expertbornerecharge.com" targetType="COPRO" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer config={hub} />
        </div>
    );
}
