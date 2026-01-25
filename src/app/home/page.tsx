import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Star, MapPin, Zap, Phone } from "lucide-react";
import { Vehicles } from "@/components/Vehicles";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { getTheme } from "@/lib/theme";
import { NATIONAL_CONFIG } from "@/config/national";
import CallButton from "@/components/CallButton";
import { InternalMesh } from "@/components/InternalMesh";
import { CitySearch } from "@/components/CitySearch";

const THEME = getTheme("home");

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

            {/* HERO SECTION */}
            <header className="relative bg-neutral-900 pt-40 pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2940&auto=format&fit=crop"
                        alt="Taxi France Network"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-white/90">Réseau National Connecté &bull; 30 Villes Ouvertes</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                        Votre Taxi, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Partout en France.</span>
                    </h1>

                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                        La première plateforme de mise en relation avec les chauffeurs indépendants.
                        <br className="hidden sm:block" />Tarifs réglementés, pas de majoration, approche gratuite.
                    </p>

                    {/* SEARCH BAR - LEAD MAGNET */}
                    <div className="mb-16 px-4">
                        <CitySearch />
                        <p className="text-sm text-slate-500 mt-6">
                            Essayez : <Link href="/ville/taxi-lyon" className="hover:text-white underline decoration-blue-500/50">Lyon</Link>, <Link href="/ville/taxi-bordeaux" className="hover:text-white underline decoration-blue-500/50">Bordeaux</Link>, <Link href="/gare/taxi-gare-montparnasse" className="hover:text-white underline decoration-blue-500/50">Gare Montparnasse</Link>...
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <CallButton
                            phoneNumber={NATIONAL_CONFIG.phoneNumber}
                            cityName="France"
                            theme={THEME}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-900/50 transition active:scale-95 flex items-center gap-3"
                        >
                            <Phone size={20} />
                            Appeler le Standard National
                        </CallButton>
                        <a href="#zones" className="text-white/80 font-medium hover:text-white transition flex items-center gap-2 px-6 py-4">
                            Voir nos zones <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </header>

            {/* TOP ZONES GRID - NAVIGATION */}
            <section id="zones" className="py-20 bg-slate-900 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Nos Zones Prioritaires</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Découvrez nos chauffeurs partenaires dans les plus grandes métropoles et gares de France.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* LYON CARD */}
                        <Link href="/ville/taxi-lyon" className="group relative bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-white/5 flex flex-col h-64">
                            <div className="absolute inset-0">
                                <Image
                                    src="https://images.unsplash.com/photo-1620647833074-ce49b6b90710?q=80&w=2670&auto=format&fit=crop"
                                    alt="Taxi Lyon"
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 p-6 text-white w-full z-10">
                                <div className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-wider">Hub TGV & Aéroport</div>
                                <h3 className="text-2xl font-bold mb-1">Taxi Lyon</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    <span>Gare Part-Dieu</span> &bull; <span>St Exupéry</span>
                                </div>
                            </div>
                        </Link>

                        {/* MARSEILLE CARD */}
                        <Link href="/ville/taxi-marseille" className="group relative bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-white/5 flex flex-col h-64">
                            <div className="absolute inset-0">
                                <Image
                                    src="https://images.unsplash.com/photo-1589561454226-796a8aa89b05?q=80&w=2670&auto=format&fit=crop"
                                    alt="Taxi Marseille"
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 p-6 text-white w-full z-10">
                                <div className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-wider">Métropole Sud</div>
                                <h3 className="text-2xl font-bold mb-1">Taxi Marseille</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    <span>Gare St Charles</span> &bull; <span>Aéroport</span>
                                </div>
                            </div>
                        </Link>

                        {/* NICE CARD */}
                        <Link href="/ville/taxi-nice" className="group relative bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-white/5 flex flex-col h-64">
                            <div className="absolute inset-0">
                                <Image
                                    src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=2670&auto=format&fit=crop"
                                    alt="Taxi Nice"
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 p-6 text-white w-full z-10">
                                <div className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-wider">Côte d'Azur</div>
                                <h3 className="text-2xl font-bold mb-1">Taxi Nice</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    <span>Aéroport NCE</span> &bull; <span>Monaco</span>
                                </div>
                            </div>
                        </Link>

                        {/* BORDEAUX CARD */}
                        <Link href="/ville/taxi-bordeaux" className="group relative bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-white/5 flex flex-col h-64">
                            <div className="absolute inset-0">
                                <Image
                                    src="https://images.unsplash.com/photo-1559087867-ce4c91325525?q=80&w=2670&auto=format&fit=crop"
                                    alt="Taxi Bordeaux"
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 p-6 text-white w-full z-10">
                                <div className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-wider">Aquitaine</div>
                                <h3 className="text-2xl font-bold mb-1">Taxi Bordeaux</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    <span>Gare St Jean</span> &bull; <span>Vignobles</span>
                                </div>
                            </div>
                        </Link>

                        {/* PARIS CARD */}
                        <Link href="/home/reserver-taxi-ile-de-france" className="group relative bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-white/5 flex flex-col h-64 lg:col-span-2">
                            <div className="absolute inset-0">
                                <Image
                                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2673&auto=format&fit=crop"
                                    alt="Taxi Paris IDF"
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-70"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 p-6 text-white w-full z-10">
                                <div className="text-xs font-bold text-green-400 mb-1 uppercase tracking-wider">Flotte Premium</div>
                                <h3 className="text-3xl font-bold mb-1">Taxi Paris & Île-de-France</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <span>Gares Parisiennes</span> &bull; <span>Roissy CDG</span> &bull; <span>Orly</span> &bull; <span>La Défense</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section - Excellence */}
            <section className="py-20 px-6 bg-slate-950 border-y border-white/5">
                <div className="mx-auto max-w-7xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-white/10 transition">
                            <div className="w-14 h-14 bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Chauffeurs Vérifiés</h3>
                            <p className="text-slate-400 leading-relaxed">Chaque chauffeur est un professionnel agréé, vérifié et noté par la communauté. Sécurité absolue.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-white/10 transition">
                            <div className="w-14 h-14 bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 text-emerald-400">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Sans Commission</h3>
                            <p className="text-slate-400 leading-relaxed">Vous payez le juste prix directement au chauffeur. Pas de frais cachés, pas de tarifs dynamiques abusifs.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-white/10 transition">
                            <div className="w-14 h-14 bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-400">
                                <Star size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Service Premium</h3>
                            <p className="text-slate-400 leading-relaxed">Berlines récentes, courtoisie, bouteilles d'eau. Le standard de qualité Taxi de France.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vehicles Fleet Section */}
            <Vehicles
                city="France entière"
                slug="home"
                phoneNumber={NATIONAL_CONFIG.phoneNumber}
            />

            {/* Reviews Section */}
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
            <footer className="bg-slate-950 border-t border-white/5">
                <div className="container mx-auto">
                    <div className="prose prose-invert max-w-none pt-12 pb-4 text-center">
                        <p className="text-slate-500 text-sm">
                            Taxi de France est une plateforme de mise en relation technique. Les services sont assurés par des chauffeurs indépendants.
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
