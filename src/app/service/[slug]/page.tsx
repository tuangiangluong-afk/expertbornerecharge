export const revalidate = 86400; // 24h ISR cache
import { SEO_SERVICES } from "@/lib/seo-data";
import { notFound } from "next/navigation";
import { Phone, CheckCircle, ArrowRight, ShieldCheck, Clock, Zap } from "lucide-react";
import CallButton from "@/components/CallButton";
import Link from "next/link";
import { getTheme } from "@/lib/theme";
import type { Metadata } from "next";
import { NATIONAL_CONFIG } from "@/config/national";
import { BookingWidget } from "@/components/BookingWidget";
import { Footer } from "@/components/Footer";
import { InternalMesh } from "@/components/InternalMesh";

// Helper
import { clampDescription, clampTitle } from "@/lib/seo-meta";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

function getService(slug: string) {
    return SEO_SERVICES.find(s => s.slug === slug);
}

export async function generateStaticParams() {
    return SEO_SERVICES.map(service => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const service = getService(resolvedParams.slug);

    if (!service) return {};

    return {
        title: clampTitle(`${service.title} - Service National IRVE`),
        description: clampDescription(`${service.description}. Service disponible dans toute la France avec notre réseau d'installateurs partenaires.`),
    };
}

export default async function NationalServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const service = getService(resolvedParams.slug);

    if (!service) return notFound();

    const city = NATIONAL_CONFIG;
    const theme = getTheme("home");
    const classes = theme.classes;


    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
            {/* Nav */}
            <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 px-4 py-3 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className={`flex items-center gap-2 text-xl font-black tracking-tighter text-neutral-900 hover:text-blue-600 transition`}
                    >
                        Expert Borne Recharge<span className="text-blue-600">.</span>
                    </Link>
                    <CallButton
                        phoneNumber={city.phoneNumber}
                        cityName={city.name}
                        theme={theme}
                        className={`rounded-full ${classes.bg} px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:brightness-110 active:scale-95`}
                    >
                        <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>Appeler</span>
                        </div>
                    </CallButton>
                </div>
            </nav>

            {/* Header */}
            <header className="bg-neutral-900 text-white pt-24 pb-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs
                        className="mb-10 [&_a]:text-neutral-300 [&_span]:text-white [&_ol]:text-neutral-300"
                        items={[
                            { name: "Accueil", href: "/" },
                            { name: service.title, href: `/service/${service.slug}` },
                        ]}
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                            Service National
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-xl text-neutral-300 max-w-lg mb-8">
                            {service.description}. Profitez de l'excellence de notre réseau partout en France.
                        </p>
                        <div className="flex gap-4">
                            <CallButton
                                phoneNumber={city.phoneNumber}
                                cityName={city.name}
                                theme={theme}
                                className={`inline-flex items-center justify-center gap-2 rounded-xl py-3 px-6 font-bold text-white shadow-lg transition-all hover:scale-105 ${classes.bg}`}
                            >
                                <Phone size={20} />
                                Devis Gratuit
                            </CallButton>
                        </div>
                    </div>

                    {/* Hero Widget Area */}
                    <div className="relative hidden md:block">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/30 rounded-full blur-[80px]"></div>

                            // STANDARD BENEFITS CARD
                        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-neutral-300">
                                    <ShieldCheck size={24} className="text-emerald-400" />
                                    <div>
                                        <div className="font-bold text-white">Expertise Certifiée</div>
                                        <div className="text-sm">Pros certifiés Qualifelec IRVE</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-neutral-300">
                                    <Clock size={24} className="text-yellow-400" />
                                    <div>
                                        <div className="font-bold text-white">Rapidité</div>
                                        <div className="text-sm">Devis détaillé sous 24h</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-neutral-300">
                                    <Zap size={24} className="text-blue-400" />
                                    <div>
                                        <div className="font-bold text-white">Équipement Pro</div>
                                        <div className="text-sm">Wallbox garanties 2 ans</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-5xl px-4 py-16">


                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <div className="prose prose-lg prose-neutral max-w-none text-neutral-600">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Pourquoi choisir Expert Borne Recharge ?</h2>
                            <p>
                                Notre service de <strong>{service.title}</strong> est conçu pour répondre aux besoins des particuliers et des professionnels exigeants.
                                Grâce à notre maillage national, nous pouvons vous garantir une prise en charge rapide, où que vous soyez.
                            </p>
                            <p>
                                Que ce soit pour une maison, une copropriété ou une entreprise, nous sélectionnons l'installateur le plus adapté à votre projet.
                            </p>

                            <div className="my-8 grid sm:grid-cols-2 gap-4 not-prose">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                                    <h3 className="font-bold text-lg mb-2 text-neutral-900">Réservation Simplifiée</h3>
                                    <p className="text-sm">Un seul numéro pour toutes vos demandes en France.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                                    <h3 className="font-bold text-lg mb-2 text-neutral-900">Suivi Personnalisé</h3>
                                    <p className="text-sm">Nous suivons votre dossier de la réservation à la dépose.</p>
                                </div>
                            </div>

                            <h3 className="font-bold text-neutral-900 mt-8 mb-4">Questions Fréquentes</h3>
                            <div className="space-y-4 not-prose">
                                <details className="group bg-white rounded-xl border border-neutral-200 p-4 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex items-center justify-between cursor-pointer font-medium text-neutral-900">
                                        Comment sont calculés les tarifs ?
                                        <span className="shrink-0 ml-1.5 p-1.5 text-neutral-900 bg-white rounded-full group-open:-rotate-180 transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <p className="mt-4 leading-relaxed text-neutral-600 text-sm">
                                        Les tarifs sont fixés par devis après étude technique, prenant en compte la complexité du raccordement et le matériel choisi.
                                    </p>
                                </details>
                                <details className="group bg-white rounded-xl border border-neutral-200 p-4 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex items-center justify-between cursor-pointer font-medium text-neutral-900">
                                        Quels sont les délais d'installation ?
                                        <span className="shrink-0 ml-1.5 p-1.5 text-neutral-900 bg-white rounded-full group-open:-rotate-180 transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <p className="mt-4 leading-relaxed text-neutral-600 text-sm">
                                        Nos bornes sont compatibles avec toutes les marques de véhicules électriques (Tesla, Renault, Peugeot, Hyundai, etc.).
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-1 space-y-8">
                        {/* Booking Widget Wrapper */}
                        <div className="sticky top-24">
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100">
                                <div className="bg-neutral-900 p-4 text-white text-center">
                                    <p className="font-bold">Comparer les Bornes</p>
                                </div>
                                <div className="p-4">
                                    <BookingWidget city={city} compact={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <InternalMesh city="France" config={NATIONAL_CONFIG} />
            {/* Override styling for dark theme integration */}
            <div className="bg-neutral-900 border-t border-white/5 [&_footer]:bg-transparent [&_footer]:border-none">
                <Footer config={city} />
            </div>
        </div>
    );
}

