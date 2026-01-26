import { getHubConfig } from "@/lib/sites-config";
import { CheckCircle, Zap, Building2, Users, FileText, ArrowRight, Euro } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
    title: "Installation Borne de Recharge Copropriété | Devis Syndic Gratuit",
    description: "Solution clé en main pour copropriétés. Gestion syndic, infrastructure collective, droit à la prise. Jusqu'à 960€ d'aide Advenir.",
    keywords: ["borne recharge copropriété", "installation borne syndic", "droit à la prise", "advenir copropriété"],
};

export default function CoproprietePage() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white">
            <Header isHub={true} variant="default" themeColor="purple" />

            {/* HERO */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-purple-50">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-purple-50/95 via-purple-50/80 to-transparent" />
                    <Image
                        src="https://images.unsplash.com/photo-1545622080-60b545d19ec6?q=80&w=2940&auto=format&fit=crop"
                        alt="Recharge copropriété parking"
                        fill
                        priority
                        className="object-cover opacity-20"
                        sizes="100vw"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-100 px-4 py-2 text-sm font-bold text-purple-800 mb-6">
                                <Building2 size={16} className="mr-2" />
                                Spécial Syndics & Conseils Syndicaux
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                Équipez votre copropriété <span className="text-purple-600">sans frais</span> pour le syndic
                            </h1>
                            <p className="text-xl text-slate-600 mb-8">
                                Solutions d'infrastructure collective ou individuelle.
                                Gestion complète dossier AG + Subventions <strong>Advenir (960€/point)</strong>.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#devis"
                                    className="flex items-center justify-center gap-3 rounded-2xl bg-purple-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-purple-700 transition"
                                >
                                    <Zap size={24} />
                                    Étude Gratuite
                                </a>
                            </div>
                        </div>

                        <div className="w-full max-w-md mx-auto relative z-30">
                            <div id="devis" className="bg-white rounded-3xl shadow-2xl shadow-purple-900/10 overflow-hidden border border-purple-100">
                                <div className="p-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <h3 className="text-lg font-bold text-neutral-900">Demander une étude copropriété</h3>
                                        <p className="text-sm text-neutral-500">Pour Syndics, CS ou résidents</p>
                                    </div>
                                    <LeadForm
                                        city="France"
                                        domain="expertbornerecharge.com"
                                        targetType="COPRO"
                                        initialProjectType="copro"
                                        themeColor="purple"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">La solution sérénité pour votre immeuble</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Nous gérons toute la complexité administrative et technique. Zéro charge mentale pour le conseil syndical.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Euro,
                                title: "Zéro investissement",
                                desc: "Optez pour le tiers-financement : l'opérateur finance l'infrastructure collective. Reste à charge 0€ pour la copro."
                            },
                            {
                                icon: FileText,
                                title: "Dossier AG clé en main",
                                desc: "Nous fournissons tous les documents juridiques et techniques pour l'Assemblée Générale. Présence de nos experts le jour J."
                            },
                            {
                                icon: Users,
                                title: "Facturation individuelle",
                                desc: "Chaque utilisateur paie sa propre consommation. Le syndic ne gère aucune refacturation d'électricité."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
                                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS COPRO */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative h-[500px] rounded-3xl overflow-hidden hidden md:block">
                            <Image
                                src="https://images.unsplash.com/photo-1574920800376-78484dd5793e?q=80&w=2940&auto=format&fit=crop"
                                alt="Parking souterrain équipé"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-3xl font-bold mb-6">Un accompagnement de A à Z</h2>
                            <div className="space-y-8">
                                {[
                                    { step: "01", title: "Visite Technique Gratuite", desc: "Audit de la puissance disponible et de la configuration du parking (colonnes horizontales, chemin de câbles)." },
                                    { step: "02", title: "Convention & Vote AG", desc: "Signature de la convention avec le Syndic et vote en Assemblée Générale (majorité simple art. 24)." },
                                    { step: "03", title: "Déploiement", desc: "Installation de l'infrastructure collective et raccordement des premiers utilisateurs." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="text-4xl font-bold text-purple-500 opacity-50">{step.step}</div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                            <p className="text-slate-400">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FAQ />

            <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-slate-500">© 2026 Expert Borne Recharge - Solution Copropriété</p>
                </div>
            </footer>
        </div>
    );
}
