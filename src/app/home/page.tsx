import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Star, MapPin, Zap, CheckCircle, Phone, Calendar } from "lucide-react";
import { Vehicles } from "@/components/Vehicles";
import { BookingWidget } from "@/components/BookingWidget";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { CityConfig } from "@/lib/db";
import { getTheme } from "@/lib/theme";
import { NATIONAL_CONFIG } from "@/config/national";
import CallButton from "@/components/CallButton";
import { InternalMesh } from "@/components/InternalMesh";

const THEME = getTheme("home"); // Will get a consistent theme
const CLASSES = THEME.classes;

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-blue-500 selection:text-white">
            <StructuredData city={NATIONAL_CONFIG} />

            {/* Navbar - Glassmorphism */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/home" className="text-2xl font-black tracking-tighter text-white">
                        Taxi de France<span className="text-blue-500">.</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/contact"
                            className="hidden sm:inline-block text-sm font-bold text-slate-400 hover:text-white transition"
                        >
                            Chauffeurs
                        </Link>
                        <Link
                            href="/home/reserver-taxi-ile-de-france"
                            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-500 hover:scale-105 border border-white/5 shadow-lg shadow-blue-900/20"
                        >
                            <Zap size={16} className="inline mr-2 fill-white" />
                            Réserver
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Immersive with Booking Widget */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Background Image & Gradients */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center filter brightness-[0.4]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div className="text-left">
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-8 backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Réseau National Indépendant
                            </div>

                            <h1 className="mb-8 text-5xl font-black tracking-tight text-white sm:text-7xl leading-[1.1] drop-shadow-2xl">
                                Le Taxi, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-100 to-white">
                                    Réinventé.
                                </span>
                            </h1>

                            <p className="mb-10 text-xl text-slate-400 leading-relaxed max-w-xl">
                                Accédez directement aux meilleurs chauffeurs artisans de France.
                                Sans commission plateforme. Sans intermédiaire inutile.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/home/reserver-taxi-ile-de-france"
                                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-slate-900 px-8 py-4 text-lg font-bold transition-all hover:bg-blue-50 hover:scale-[1.02]"
                                >
                                    <MapPin size={20} />
                                    Choisir ma ville
                                </Link>
                                <CallButton
                                    phoneNumber={NATIONAL_CONFIG.phoneNumber}
                                    cityName="France"
                                    theme={THEME}
                                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10"
                                >
                                    <Phone size={20} />
                                    Appel Standard
                                </CallButton>
                            </div>
                        </div>

                        {/* Right Content: Booking Widget */}
                        <div className="relative z-20">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-2 rounded-3xl shadow-2xl">
                                <BookingWidget city={NATIONAL_CONFIG} />
                            </div>
                            {/* Decorative blob behind */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - Excellence */}
            <section className="py-20 px-6 bg-slate-900 border-y border-white/5">
                <div className="mx-auto max-w-7xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl bg-slate-800/50 border border-white/5 hover:bg-slate-800 transition">
                            <div className="w-14 h-14 bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Chauffeurs Vérifiés</h3>
                            <p className="text-slate-400 leading-relaxed">Chaque chauffeur est un professionnel agréé, vérifié et noté par la communauté. Sécurité absolue.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-slate-800/50 border border-white/5 hover:bg-slate-800 transition">
                            <div className="w-14 h-14 bg-emerald-900/50 rounded-2xl flex items-center justify-center mb-6 text-emerald-400">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Sans Commission</h3>
                            <p className="text-slate-400 leading-relaxed">Vous payez le juste prix directement au chauffeur. Pas de frais cachés, pas de tarifs dynamiques abusifs.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-slate-800/50 border border-white/5 hover:bg-slate-800 transition">
                            <div className="w-14 h-14 bg-purple-900/50 rounded-2xl flex items-center justify-center mb-6 text-purple-400">
                                <Star size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Service Premium</h3>
                            <p className="text-slate-400 leading-relaxed">Berlines récentes, courtoisie, bouteilles d'eau. Le standard de qualité Taxi de France.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Region Selection - Bento Grid Style */}
            <section id="zones" className="py-32 px-6 relative bg-slate-950">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Nos Zones Premium</h2>
                            <p className="text-slate-400 text-lg max-w-xl">
                                Une présence affirmée sur les secteurs les plus dynamiques.
                                Sélectionnez votre région.
                            </p>
                        </div>
                        <Link href="/home/reserver-taxi-ile-de-france" className="text-blue-400 hover:text-white transition font-bold flex items-center gap-2">
                            Voir toutes les régions <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
                        {/* Highlights / Stats Card */}
                        <div className="md:col-span-4 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-32 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/30 transition-all duration-700" />
                            <div>
                                <div className="p-3 bg-white/5 w-fit rounded-xl border border-white/10 mb-6">
                                    <ShieldCheck className="text-emerald-400" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Qualité Garantie</h3>
                                <p className="text-slate-400">Réseau numéro 1 en satisfaction client.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div>
                                    <div className="text-3xl font-black text-white">4.9/5</div>
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Avis Clients</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-white">100%</div>
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Fiabilité</div>
                                </div>
                            </div>
                        </div>

                        {/* Main Region Card - IDF */}
                        <Link
                            href="/home/reserver-taxi-ile-de-france"
                            className="md:col-span-8 rounded-3xl relative overflow-hidden group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2973&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter brightness-[0.6] group-hover:brightness-[0.7]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded mb-4">
                                            Zone Prioritaire
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-black text-white mb-4">Île-de-France</h3>
                                        <p className="text-slate-300 text-lg max-w-lg mb-6 line-clamp-2 md:line-clamp-none">
                                            Couverture complète de Paris et sa région. Gares, Aéroports, La Défense.
                                        </p>
                                        <div className="flex gap-2 text-xs font-bold text-white/80">
                                            Paris 75 • Hauts-de-Seine 92 • Yvelines 78 • Seine-Saint-Denis 93
                                        </div>
                                    </div>
                                    <div className="hidden md:flex h-16 w-16 rounded-full bg-white text-slate-950 items-center justify-center transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2">
                                        <ArrowRight size={32} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Vehicles Fleet Section */}
            <Vehicles
                city="France entière"
                slug="home" // Ensure theme works
                phoneNumber={NATIONAL_CONFIG.phoneNumber}
            />

            {/* Reviews Section - Force specific config to show default reviews */}
            <div className="bg-white text-neutral-900 border-y border-neutral-200">
                <Reviews city="France" tenantSlug="_default" />
            </div>

            {/* FAQ */}
            <div className="bg-slate-50 text-neutral-900 border-b border-neutral-200">
                <FAQ city="France" type="general" />
            </div>

            {/* FULL INTERNAL LINKING MESH (SEO HUB) */}
            <InternalMesh />

            {/* Footer - SEO Optimized */}

            {/* Footer - SEO Optimized */}
            <footer className="bg-slate-950 border-t border-white/5">
                <div className="container mx-auto">
                    <div className="prose prose-invert max-w-none pt-12 pb-4 text-center">
                        <p className="text-slate-500 text-sm">
                            Taxi de France est une plateforme de mise en relation. Les services sont assurés par des chauffeurs indépendants.
                        </p>
                    </div>
                    {/* Override styling for dark theme integration */}
                    <div className="[&_footer]:bg-transparent [&_footer]:border-none">
                        <Footer config={NATIONAL_CONFIG} />
                    </div>
                </div>
            </footer>
        </div>
    );
}
