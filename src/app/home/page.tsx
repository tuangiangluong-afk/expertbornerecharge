import { getHubConfig, SITES } from "@/lib/sites-config";
import { Phone, Zap, MapPin, Award, ArrowRight, Building2, Home, Briefcase, CheckCircle } from "lucide-react";
import LocalLinker from "@/components/blog/LocalLinker";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import { CityCards } from "@/components/CityCards";

export const metadata: Metadata = {
    title: "Comparez les Devis Borne de Recharge | Expert Borne Recharge",
    description: "Recevez jusqu'à 3 devis gratuits d'installateurs certifiés IRVE. Comparez les prix et économisez jusqu'à 2 460€ grâce aux aides. Réseau national.",
    keywords: ["devis borne de recharge", "comparateur borne recharge", "installation IRVE", "borne électrique devis"],
    alternates: {
        canonical: "https://expertbornerecharge.com"
    }
};

export default function HomePage() {
    const hub = getHubConfig();

    // Dynamically generate city list from SITES config
    // We deduplicate by slug and filter out the 'home' site
    const uniqueSites = Object.values(SITES).reduce((acc, site) => {
        if (!acc.find(s => s.slug === site.slug) && site.slug !== 'home') {
            acc.push(site);
        }
        return acc;
    }, [] as any[]);

    const cities = uniqueSites.map(site => ({
        name: site.city,
        department: site.department,
        slug: site.slug,
        available: true // All configured sites are available
    }));

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white">
            {/* ============================================ */}
            {/* NAVIGATION - Light Tech-Trust Style */}
            {/* ============================================ */}
            {/* ============================================ */}
            {/* NAVIGATION - Light Tech-Trust Style */}
            {/* ============================================ */}
            <Header isHub={true} variant="default" />

            {/* ============================================ */}
            {/* HERO - Light Tech-Trust Style */}
            {/* ============================================ */}
            <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-32 overflow-hidden bg-slate-50">
                {/* Subtle background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/95 via-slate-50/90 to-slate-50" />
                    <Image
                        src={hub.heroImage}
                        alt="Installation borne de recharge France"
                        fill
                        priority
                        className="object-cover opacity-20"
                        sizes="100vw"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-start pt-8">
                        {/* Left: Content */}
                        <div className="text-center lg:text-left">
                            {/* Trust Badge */}
                            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 mb-6">
                                <CheckCircle size={16} className="mr-2" />
                                Réseau National Certifié IRVE
                            </div>

                            {/* H1 - Lead Gen Focus */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                Comparez les <span className="text-blue-600">devis</span> pour votre borne de recharge
                            </h1>

                            {/* Subtitle */}
                            <p className="text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                                <strong className="text-slate-900">Recevez jusqu'à 3 devis gratuits</strong> d'installateurs certifiés près de chez vous.
                                Comparez les prix et économisez jusqu'à <strong className="text-green-600">2 460€</strong> grâce aux aides.
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8">
                                {[
                                    { value: "50+", label: "Villes" },
                                    { value: "5 000+", label: "Devis envoyés" },
                                    { value: "24h", label: "Réponse" },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                        <div className="text-sm text-slate-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Certifications */}
                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                {hub.certifications.slice(0, 3).map((cert, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm text-slate-700 border border-slate-200 shadow-sm"
                                    >
                                        <Award size={14} className="text-yellow-500" />
                                        {cert}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Lead Form - STRATEGIC PLACEMENT HIGH CONVERSION */}
                        <div className="w-full max-w-md mx-auto relative z-30">
                            <div id="devis" className="bg-white rounded-3xl shadow-2xl shadow-blue-900/20 overflow-hidden border border-neutral-100">
                                <div className="p-1 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <h3 className="text-lg font-bold text-neutral-900">Testez votre éligibilité</h3>
                                        <p className="text-sm text-neutral-500">Réponse immédiate • Gratuit • Sans engagement</p>
                                    </div>
                                    <LeadForm
                                        city="France"
                                        domain="expertbornerecharge.com"
                                        targetType="MIXED"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* AIDES SECTION */}
            {/* ============================================ */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Jusqu'à <span className="text-yellow-400">2 460€</span> d'aides cumulables
                        </h2>
                        <p className="text-blue-100 text-lg">
                            Profitez de toutes les aides disponibles en 2026
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { label: "Prime ADVENIR", value: "960€", detail: "Copropriétés" },
                            { label: "Crédit d'Impôt", value: "500€", detail: "75% plafonné" },
                            { label: "TVA Réduite", value: "5.5%", detail: "Au lieu de 20%" },
                            { label: "MaPrimeRénov'", value: "1000€", detail: "Sous conditions" },
                        ].map((aide, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                                <div className="text-3xl font-bold text-yellow-400 mb-2">{aide.value}</div>
                                <div className="font-semibold mb-1">{aide.label}</div>
                                <div className="text-sm text-blue-200">{aide.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* COST COMPARATOR (The Killer) */}
            {/* ============================================ */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-bold mb-4">
                            <Zap size={18} />
                            Économies garanties
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Essence vs Recharge à domicile
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Rechargez votre véhicule à la maison et économisez jusqu'à <strong>1 500€ par an</strong>
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200">
                            <div className="grid md:grid-cols-2">
                                {/* Essence Column */}
                                <div className="p-8 bg-red-50 border-b md:border-b-0 md:border-r border-red-100 rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                            <span className="text-2xl">⛽</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-red-900">Essence / Diesel</h3>
                                            <p className="text-sm text-red-600">Coût mensuel moyen</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-red-100">
                                            <span className="text-neutral-700">Consommation</span>
                                            <span className="font-semibold">6L/100km</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-red-100">
                                            <span className="text-neutral-700">Distance/mois</span>
                                            <span className="font-semibold">1 500 km</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <span className="font-bold text-neutral-900">Total mensuel</span>
                                            <span className="text-3xl font-bold text-red-600">167€</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Electric Column */}
                                <div className="p-8 bg-green-50 relative rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">
                                        RECOMMANDÉ
                                    </div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <Zap className="text-green-600" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-green-900">Recharge domicile</h3>
                                            <p className="text-sm text-green-600">Coût mensuel moyen</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-green-100">
                                            <span className="text-neutral-700">Consommation</span>
                                            <span className="font-semibold">15kWh/100km</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-green-100">
                                            <span className="text-neutral-700">Distance/mois</span>
                                            <span className="font-semibold">1 500 km</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <span className="font-bold text-neutral-900">Total mensuel</span>
                                            <span className="text-3xl font-bold text-green-600">41€</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* SERVICES */}
            {/* ============================================ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Une solution pour chaque projet
                        </h2>
                        <p className="text-slate-600 text-lg">
                            Maison, copropriété ou entreprise : nos installateurs s'adaptent
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { icon: Home, title: "Maison", desc: "Wallbox 7 à 22kW. Installation rapide en 48h.", href: "/solutions/maison" },
                            { icon: Building2, title: "Copropriété", desc: "Solution collective. Prime ADVENIR jusqu'à 960€.", href: "/solutions/copropriete" },
                            { icon: Briefcase, title: "Entreprise", desc: "Flotte & collaborateurs. Supervision à distance.", href: "/solutions/entreprise" },
                        ].map((service, i) => (
                            <Link key={i} href={service.href} className="block group">
                                <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200 group-hover:shadow-xl group-hover:border-blue-500 transition-all h-full">
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <service.icon className="text-blue-600" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                                    <p className="text-slate-600 mb-4">{service.desc}</p>
                                    <div className="text-blue-600 font-bold inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300">
                                        En savoir plus <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* CITIES GRID */}
            {/* ============================================ */}
            <section id="villes" className="py-20 bg-slate-50 scroll-mt-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Nos installateurs par ville
                        </h2>
                        <p className="text-slate-600 text-lg">
                            Trouvez un expert certifié IRVE près de chez vous
                        </p>
                    </div>

                    {/* Integrated Local Linker */}
                    <div className="max-w-2xl mx-auto mb-16">
                        <div className="bg-white p-2 rounded-3xl shadow-lg border border-slate-200">
                            <LocalLinker />
                        </div>
                    </div>

                    <div className="mb-16">
                        <CityCards cities={cities} />
                    </div>

                    {/* FAQ moved below City Cards */}
                    <FAQ />
                </div>
            </section>

            {/* ============================================ */}
            {/* CTA SECTION */}
            {/* ============================================ */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        Prêt à passer à l'électrique ?
                    </h2>
                    <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                        Obtenez votre devis gratuit en 24h et découvrez les aides auxquelles vous avez droit.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#devis"
                            className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-blue-700 transition"
                        >
                            <Zap size={24} />
                            Comparer les devis
                        </a>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* FOOTER */}
            {/* ============================================ */}
            <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <Logo isHub={true} size="sm" variant="light" />
                        <div className="flex gap-6 text-sm text-slate-400">
                            <a href="/mentions-legales" className="hover:text-white transition">Mentions légales</a>
                            <a href="/cgv" className="hover:text-white transition">CGV</a>
                            <a href="/politique-confidentialite" className="hover:text-white transition">Confidentialité</a>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm text-slate-500">
                        © {new Date().getFullYear()} Expert Borne Recharge. Tous droits réservés.
                    </div>
                </div>
            </footer>
        </div>
    );
}
