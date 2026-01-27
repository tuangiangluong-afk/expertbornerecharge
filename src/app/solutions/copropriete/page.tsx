import { Building2, CheckCircle, HelpCircle, Users, FileText, Euro, Calculator, AlertCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";

export const metadata = {
    title: "Installation Borne Recharge Copropriété : Guide Syndic & Droit à la Prise",
    description: "Tout comprendre sur la recharge en copropriété. Droit à la prise, infrastructure collective, subventions ADVENIR et gestion de la facturation.",
};

export default function SolutionCopro() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            {/* HERO */}
            <section className="relative pt-20 pb-12 lg:pt-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-start pt-8">
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1.5 text-sm font-bold text-purple-800 mb-6 border border-purple-200">
                                <Building2 size={16} className="mr-2" />
                                Spécial Copropriété & Syndic
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                Installer des bornes en <span className="text-purple-600">copropriété</span> : Le mode d'emploi
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Syndics, conseils syndicaux ou résidents : l'équipement des parkings est devenu un enjeu majeur.
                                Découvrez les solutions sans reste à charge pour la copropriété grâce au pré-financement.
                            </p>
                        </div>
                        <div className="lg:w-1/2 relative bg-purple-50 p-6 rounded-2xl border border-purple-100">
                            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                                <h3 className="text-center font-bold text-lg mb-4 text-purple-900">Étude & Devis Copropriété</h3>
                                <LeadForm city="France" domain="expertbornerecharge.com" targetType="COPRO" themeColor="purple" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <div className="container mx-auto px-4 py-16 grid lg:grid-cols-[1fr_350px] gap-12">
                <article className="prose prose-lg prose-slate max-w-none">
                    <h2>Le défi de la recharge en immeuble</h2>
                    <p>
                        Contrairement à une maison individuelle, on ne peut pas simplement se brancher sur une prise du garage. Il faut acheminer l'électricité depuis une source commune tout en individualisant la facturation.
                        Deux approches existent : le <strong>Droit à la Prise</strong> (individuel) et l'<strong>Infrastructure Collective</strong> (solution globale).
                    </p>

                    <div className="not-prose grid md:grid-cols-2 gap-6 my-10">
                        <div className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition">
                            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                                <Users className="text-blue-500" /> Droit à la prise
                            </h3>
                            <p className="text-sm text-slate-600 mb-4">
                                Chaque résident fait sa demande individuelle. Un compteur est ajouté pour sa place.
                            </p>
                            <ul className="text-sm space-y-2">
                                <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Rapide pour 1 demande</li>
                                <li className="text-red-500 flex gap-2"><AlertCircle size={16} /> Vite limité en puissance</li>
                                <li className="text-red-500 flex gap-2"><AlertCircle size={16} /> "Plat de nouilles" de câbles</li>
                            </ul>
                        </div>
                        <div className="border-2 border-purple-200 bg-purple-50/30 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-xl mb-3 flex items-center gap-2 text-purple-800">
                                <Building2 className="text-purple-600" /> Infrastructure Collective
                            </h3>
                            <p className="text-sm text-slate-600 mb-4">
                                Une artère électrique principale parcourt le parking. Les bornes s'y raccordent au fur et à mesure.
                            </p>
                            <ul className="text-sm space-y-2">
                                <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Solution pérenne et propre</li>
                                <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Evolutif (1 à 100 bornes)</li>
                                <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Souvent 0€ pour le syndic</li>
                            </ul>
                        </div>
                    </div>

                    <h2>La solution préférée des syndics : Le Tiers-Investissement</h2>
                    <p>
                        Aujourd'hui, des opérateurs (partenaires d'Expert Borne Recharge) proposent de financer à <strong>100% l'infrastructure collective</strong>.
                        La copropriété ne paie RIEN. C'est l'utilisateur final qui paie son installation de borne et un abonnement pour le service.
                    </p>
                    <blockquote>
                        "C'est la solution zéro souci : pas de frais pour la copro, maintenance gérée par l'opérateur, et valorisation immédiate de l'immeuble."
                    </blockquote>

                    <h2>Les aides ADVENIR 2026</h2>
                    <p>
                        Le programme ADVENIR subventionne lourdement les installations en résidentiel collectif.
                        L'objectif est d'accélérer l'équipement des parkings.
                    </p>
                    <table className="not-prose min-w-full bg-white border border-slate-200 rounded-lg shadow-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left">Type de travaux</th>
                                <th className="px-4 py-3 text-left">Montant de l'aide</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="px-4 py-3">Infrastructure collective</td>
                                <td className="px-4 py-3 font-bold text-purple-700">50% du montant HT (Plafonné à 8000€ jusqu'à 100 places)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">Installation point de charge (Individuel)</td>
                                <td className="px-4 py-3 font-bold text-green-700">50% du montant HT (Max 960€)</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Comment ça se passe en AG (Assemblée Générale) ?</h2>
                    <p>
                        Pour valider une infrastructure collective, le sujet doit être mis à l'ordre du jour de l'AG.
                        Expert Borne Recharge vous accompagne :
                    </p>
                    <ol>
                        <li>Visite technique gratuite de la copropriété.</li>
                        <li>Remise d'un dossier technique complet pour le syndic.</li>
                        <li><strong>Présence (ou visio) d'un expert lors de l'AG</strong> pour répondre aux questions des copropriétaires.</li>
                        <li>Vote (souvent à la majorité simple art 24 ou 25).</li>
                    </ol>

                    <h3>Questions Fréquentes</h3>
                    <div className="not-prose space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <h4 className="font-bold mb-1">Qui paie l'électricité ?</h4>
                            <p className="text-sm text-slate-600">Chaque borne possède son propre sous-compteur certifié (MID). L'opérateur relève la consommation et facture directement l'utilisateur. Le syndic est remboursé au centime près ou ne paie rien (selon contrat).</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <h4 className="font-bold mb-1">Si je n'ai pas de voiture électrique, je paie ?</h4>
                            <p className="text-sm text-slate-600">Non ! C'est le principe de l'utilisateur-payeur. Les résidents sans voiture électrique ne paient absolument rien, ni pour l'installation, ni pour l'usage.</p>
                        </div>
                    </div>
                </article>

                <div className="hidden lg:block space-y-6 sticky top-24 h-fit">
                    <div className="bg-purple-900 text-white p-6 rounded-xl shadow-xl">
                        <h4 className="font-bold mb-4">Syndics & Conseils Syndicaux</h4>
                        <p className="text-sm text-purple-200 mb-6">
                            Vous gérez une copropriété ? Simplifiez-vous la vie.
                            Obtenez une étude de faisabilité gratuite et un dossier clé en main pour votre prochaine AG.
                        </p>
                        <ul className="space-y-3 mb-6 text-sm">
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-purple-400" /> Visite technique offerte</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-purple-400" /> Dossier AG complet</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-purple-400" /> Solutions Tiers-Financées</li>
                        </ul>
                        <button className="w-full bg-white text-purple-900 font-bold py-3 rounded-lg hover:bg-purple-50 transition">
                            Contacter un expert Copro
                        </button>
                    </div>
                </div>
            </div>

            <Footer config={hub} />
        </div>
    );
}
