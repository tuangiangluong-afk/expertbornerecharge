import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, MapPin, Zap } from "lucide-react";
import { Vehicles } from "@/components/Vehicles";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-blue-500 selection:text-white">
            {/* Navbar - Glassmorphism */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/home" className="text-2xl font-black tracking-tighter text-white">
                        TaxiFrance<span className="text-blue-500">.</span>
                    </Link>
                    <Link
                        href="/contact"
                        className="rounded-full bg-white/10 px-5 py-2 text-sm font-bold text-white transition hover:bg-white/20 hover:scale-105 border border-white/5 backdrop-blur-md"
                    >
                        Devenir Partenaire
                    </Link>
                </div>
            </nav>

            {/* Hero Section - Immersive */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                {/* Background Image & Gradients */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center filter brightness-[0.5]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none z-0" />

                <div className="relative z-10 mx-auto max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-8 backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Réseau National Indépendant
                    </div>

                    <h1 className="mb-8 text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.1] drop-shadow-2xl">
                        Le Taxi, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-100 to-white">
                            Réinventé.
                        </span>
                    </h1>

                    <p className="mb-12 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Accédez directement aux meilleurs chauffeurs artisans de France.
                        Sans commission. Sans intermédiaire. Juste vous et la route.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/home/reserver-taxi-ile-de-france"
                            className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-500 hover:scale-[1.02] shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
                        >
                            <Zap className="fill-white" size={20} />
                            Réserver maintenant
                        </Link>
                        <a
                            href="#features"
                            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                        >
                            En savoir plus
                        </a>
                    </div>
                </div>
            </section>

            {/* Region Selection - Bento Grid Style */}
            <section id="zones" className="py-32 px-6 relative">
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
                                <p className="text-slate-400">Chauffeurs vérifiés et notés par la communauté.</p>
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
                                            Le plus grand réseau de chauffeurs indépendants.
                                        </p>
                                        <div className="flex gap-2">
                                            {['75', '92', '93', '94', '78', '91', '95'].map(d => (
                                                <span key={d} className="px-3 py-1 bg-white/10 backdrop-blur border border-white/10 rounded text-xs font-bold text-white">
                                                    {d}
                                                </span>
                                            ))}
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

            {/* Vehicles Fleet Section - Reintroduced with CallModal */}
            <Vehicles
                city="Île-de-France"
                slug="home"
                phoneNumber="01 84 60 92 92"
            />

            {/* Footer - Minimalist */}
            <footer className="border-t border-white/5 bg-slate-950 px-6 py-12">
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-xl font-bold text-white">TaxiFrance.</div>
                    <div className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} Réseau TaxiFrance. L'excellence du transport.
                    </div>
                </div>
            </footer>
        </div>
    );
}
