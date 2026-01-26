import { getHubConfig } from "@/lib/sites-config";
import { CheckCircle, Zap, Briefcase, BarChart, Settings, ArrowRight, Truck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
    title: "Installation Borne de Recharge Entreprise & Flotte | Devis",
    description: "Solutions de recharge pour entreprises. Flotte électrique, recharge collaborateurs et visiteurs. Supervision et monétisation.",
    keywords: ["borne recharge entreprise", "flotte électrique", "installation borne parking bureau", "supervision borne"],
};

export default function EntreprisePage() {
    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white">
            <Header isHub={true} variant="default" themeColor="blue" />

            {/* HERO */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-transparent" />
                    <Image
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
                        alt="Parking entreprise électrique"
                        fill
                        priority
                        className="object-cover opacity-20"
                        sizes="100vw"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800 mb-6">
                                <Briefcase size={16} className="mr-2" />
                                Solution Entreprises & Flottes
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                Accélérez la transition électrique de votre <span className="text-blue-600">flotte</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-8">
                                Installation de bornes pour collaborateurs, flottes et clients.
                                Supervision, facturation automatique et gestion intelligente de l'énergie.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#devis"
                                    className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-blue-700 transition"
                                >
                                    <Zap size={24} />
                                    Devis Entreprise
                                </a>
                            </div>
                        </div>

                        <div className="w-full max-w-md mx-auto relative z-30">
                            <div id="devis" className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden border border-blue-100">
                                <div className="p-1 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <h3 className="text-lg font-bold text-neutral-900">Projet Entreprise</h3>
                                        <p className="text-sm text-neutral-500">Étude technique & Devis sur mesure</p>
                                    </div>
                                    <LeadForm
                                        city="France"
                                        domain="expertbornerecharge.com"
                                        targetType="ENTREPRISE"
                                        initialProjectType="entreprise"
                                        themeColor="blue"
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
                        <h2 className="text-3xl font-bold mb-4">Optimisez la recharge de votre activité</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Que ce soit pour vos commerciaux, vos employés ou vos visiteurs, nous avons la solution technique adaptée.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: BarChart,
                                title: "Supervision & Gestion",
                                desc: "Plateforme cloud pour suivre les consommations par véhicule, par employé ou par service. Export des données pour la compta."
                            },
                            {
                                icon: Truck,
                                title: "Flottes & Utilitaires",
                                desc: "Bornes rapides DC pour les véhicules à forte rotation ou Wallbox 22kW pour la recharge nocturne au dépôt."
                            },
                            {
                                icon: Settings,
                                title: "Smart Charging",
                                desc: "Gestion dynamique de la puissance (Load Balancing) pour éviter de faire sauter le compteur ou d'augmenter votre abonnement."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
                                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLIENTS */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Ils nous font confiance</h2>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                        {/* Placeholder logos - text representation for now */}
                        <div className="text-2xl font-bold">BNP Paribas Real Estate</div>
                        <div className="text-2xl font-bold">Vinci Immobilier</div>
                        <div className="text-2xl font-bold">Century 21</div>
                        <div className="text-2xl font-bold">Orpi</div>
                    </div>
                </div>
            </section>

            <FAQ />

            <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-slate-500">© 2026 Expert Borne Recharge - Solution Entreprise</p>
                </div>
            </footer>
        </div>
    );
}
