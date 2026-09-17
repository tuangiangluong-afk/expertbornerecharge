export const revalidate = 86400; // 24h ISR cache
import { Building2, CheckCircle, HelpCircle, Users, FileText, Euro, Calculator, AlertCircle, Award } from "lucide-react";
import LeadFormPro from "@/components/LeadFormPro";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import { clampDescription, clampTitle } from "@/lib/seo-meta";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Image from "next/image";

export const metadata = {
    title: clampTitle("Borne Recharge Copropriété : Guide Syndic & Droit à la Prise"),
    description: clampDescription("Tout comprendre sur la recharge en copropriété. Droit à la prise, infrastructure collective, subventions ADVENIR et gestion de la facturation."),
};

export default function SolutionCopro() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            {/* HERO (Updated Design) */}
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4">
                    <Breadcrumbs
                        className="mb-10"
                        items={[
                            { name: "Accueil", href: "/" },
                            { name: "Solution copropriété", href: "/solutions/copropriete" },
                        ]}
                    />
                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* Left: Content + Lead Form */}
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <div className="text-center lg:text-left space-y-6">
                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1.5 text-sm font-bold text-purple-800 border border-purple-200">
                                        <Building2 size={16} className="mr-2" />
                                        Spécial Syndic & Copropriété
                                    </div>
                                    <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-bold text-green-800 border border-green-200">
                                        <Euro size={16} className="mr-2" />
                                        0€ pour la Copropriété
                                    </div>
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                    Installer des bornes en <span className="text-purple-600">copropriété</span> sans frais pour l'immeuble.
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    La solution Tiers-Investisseur certifiée ADVENIR : Nous finançons l'infrastructure à 100%.
                                    <br />
                                    <strong>Le Syndic ne paie rien. Les résidents non-utilisateurs ne paient rien.</strong>
                                </p>
                            </div>

                            {/* LEAD FORM - Integrated Here */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left">
                                <div id="simulateur" className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 overflow-hidden border border-slate-200">
                                    <div className="p-1 bg-gradient-to-r from-purple-600 to-purple-500"></div>
                                    <div className="p-6 md:p-8">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-purple-900">Étude & Devis Copropriété</h3>
                                            <p className="text-sm text-slate-500">Réponse sous 24h ouvrées</p>
                                        </div>
                                        <LeadFormPro city="France" domain="expertbornerecharge.com" segment="COPRO" themeColor="purple" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Large Hero Image + Trust Badges */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full">
                            <div className="relative h-[640px] w-full mb-8">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-100 bg-white p-2">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-purple-100">
                                        <Image
                                            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=3540&auto=format&fit=crop"
                                            alt="Copropriété Borne Recharge"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                                        {/* Image Caption/Badge */}
                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="bg-white/95 backdrop-blur rounded-xl p-5 shadow-xl border border-white/50 flex items-center gap-4 cursor-default">
                                                <div className="bg-purple-100 p-3 rounded-full shrink-0">
                                                    <CheckCircle className="w-6 h-6 text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-slate-900">Programme ADVENIR</div>
                                                    <div className="text-sm font-medium text-slate-500">Financement jusqu'à 50%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Elements relocated - Right Column */}
                            <div className="flex flex-wrap items-center gap-4 justify-center px-4">
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <Award size={24} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-slate-900 text-base">Qualifelec IRVE</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <CheckCircle size={24} className="text-green-500 fill-green-100" />
                                    <span className="font-bold text-slate-900 text-base">Garantie Décennale</span>
                                </div>
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

                    <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl my-10 not-prose flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <FileText /> Syndic réticent ?
                            </h3>
                            <p className="text-blue-100">
                                La loi est de votre côté. Téléchargez notre <strong>modèle de lettre juridique</strong> à envoyer à votre syndic pour mettre le sujet à l'ordre du jour de la prochaine AG.
                            </p>
                        </div>
                        <a
                            href="#simulateur"
                            className="bg-white text-blue-900 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition shadow-lg whitespace-nowrap"
                        >
                            Recevoir le modèle
                        </a>
                    </div>

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

                <div className="hidden lg:block space-y-6 sticky top-24 h-fit" id="espace-syndic">
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
                        <a href="#simulateur" className="block w-full text-center bg-white text-purple-900 font-bold py-3 rounded-lg hover:bg-purple-50 transition">
                            Contacter un expert Copro
                        </a>
                    </div>
                </div>
            </div>

            <Footer config={hub} />
        </div>
    );
}
