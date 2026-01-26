import { getHubConfig } from "@/lib/sites-config";
import { CheckCircle, Zap, Shield, Euro, ArrowRight, Home, BatteryCharging, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
    title: "Installation Borne de Recharge Maison Individuelle | Devis Gratuit",
    description: "Installez votre borne de recharge à domicile. Solution clé en main 7kW ou 22kW. Crédit d'impôt 500€. Devis gratuit installateur IRVE.",
    keywords: ["borne recharge maison", "installation wallbox domicile", "prix borne recharge maison", "crédit impôt borne recharge"],
};

export default function MaisonPage() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white">
            <Header isHub={true} variant="default" />

            {/* HERO */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-emerald-50">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-50/95 via-emerald-50/80 to-transparent" />
                    <Image
                        src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2944&auto=format&fit=crop"
                        alt="Recharge voiture électrique maison"
                        fill
                        priority
                        className="object-cover opacity-20"
                        sizes="100vw"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800 mb-6">
                                <Home size={16} className="mr-2" />
                                Solution Maison Individuelle
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                Rechargez à domicile en toute <span className="text-emerald-600">simplicité</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-8">
                                Profitez du confort d'une borne de recharge chez vous.
                                Installation rapide, sécurisée et éligible au <strong>crédit d'impôt de 500€</strong>.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#devis"
                                    className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-emerald-700 transition"
                                >
                                    <Zap size={24} />
                                    Obtenir mon devis
                                </a>
                            </div>
                        </div>

                        <div className="w-full max-w-md mx-auto relative z-30">
                            <div id="devis" className="bg-white rounded-3xl shadow-2xl shadow-emerald-900/10 overflow-hidden border border-emerald-100">
                                <div className="p-1 bg-gradient-to-r from-emerald-500 to-green-400"></div>
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <h3 className="text-lg font-bold text-neutral-900">Configurez votre installation</h3>
                                        <p className="text-sm text-neutral-500">Gratuit • Sans engagement</p>
                                    </div>
                                    <LeadForm
                                        city="France"
                                        domain="expertbornerecharge.com"
                                        targetType="MAISON"
                                        initialProjectType="maison"
                                        themeColor="emerald"
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
                        <h2 className="text-3xl font-bold mb-4">Pourquoi installer une borne chez soi ?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            La recharge à domicile est le moyen le plus économique et le plus pratique de recharger votre véhicule électrique.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: BatteryCharging,
                                title: "Recharge 7x plus rapide",
                                desc: "Passez de 0 à 100% en une nuit grâce à une Wallbox 7kW, contre plus de 24h sur une prise standard."
                            },
                            {
                                icon: Euro,
                                title: "Économies garanties",
                                desc: "Rechargez en heures creuses pour environ 2€/100km. Rentabilisez votre installation en moins de 2 ans."
                            },
                            {
                                icon: Shield,
                                title: "Sécurité maximale",
                                desc: "Installation certifiée IRVE avec ligne dédiée et protections électriques conformes aux normes (NF C 15-100)."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
                                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STEPS */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Une installation clé en main en 3 étapes</h2>
                            <div className="space-y-8">
                                {[
                                    { step: "01", title: "Devis Gratuit", desc: "Remplissez le formulaire. Un expert vous conseille sur la puissance adaptée (7kW mono ou 22kW tri)." },
                                    { step: "02", title: "Visite & Validation", desc: "Validation technique à distance ou sur site. Vérification de votre tableau électrique." },
                                    { step: "03", title: "Installation", desc: "Pose de la borne par un électricien qualifié IRVE. Mise en service et explications." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="text-4xl font-bold text-emerald-500 opacity-50">{step.step}</div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                            <p className="text-slate-400">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-3xl overflow-hidden hidden md:block">
                            <Image
                                src="https://images.unsplash.com/photo-1621255395679-052443422230?q=80&w=2940&auto=format&fit=crop"
                                alt="Installation borne"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <FAQ />

            <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-slate-500">© 2026 Expert Borne Recharge - Solution Maison</p>
                </div>
            </footer>
        </div>
    );
}
