import { CITIES } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, TrendingUp } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
            {/* Navbar */}
            <nav className="border-b bg-white px-6 py-4">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <div className="text-2xl font-bold tracking-tighter text-blue-900">
                        TaxiFrance<span className="text-blue-600">.</span>
                    </div>
                    <a
                        href="mailto:partner@taxifrance.fr"
                        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                    >
                        Devenir Partenaire
                    </a>
                </div>
            </nav>

            {/* Hero */}
            <section className="bg-white px-6 py-24 text-center">
                <div className="mx-auto max-w-3xl">
                    <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl">
                        Le Réseau Officiel des <br />
                        <span className="text-blue-600">Taxis Indépendants</span>
                    </h1>
                    <p className="mb-10 text-xl text-neutral-600">
                        Plus de commissions abusives. Un réseau national, une présence locale.
                        Réservez votre taxi en direct dans votre ville.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a
                            href="#villes"
                            className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Trouver une ville
                        </a>
                        <a
                            href="#"
                            className="rounded-full border border-neutral-300 bg-white px-8 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-50"
                        >
                            Espace Chauffeur
                        </a>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="border-y border-neutral-200 bg-neutral-50 px-6 py-16">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="mb-2 text-lg font-bold">Chauffeurs Certifiés</h3>
                        <p className="text-neutral-600">
                            Tous nos partenaires sont des taxis officiels avec licence et
                            assurance à jour.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <TrendingUp size={24} />
                        </div>
                        <h3 className="mb-2 text-lg font-bold">Tarifs Réglementés</h3>
                        <p className="text-neutral-600">
                            Pas de surprise. Le compteur tourne au tarif préfectoral en
                            vigueur.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <MapPin size={24} />
                        </div>
                        <h3 className="mb-2 text-lg font-bold">Ancrage Local</h3>
                        <p className="text-neutral-600">
                            Nos chauffeurs connaissent les raccourcis et les spécificités de
                            chaque ville.
                        </p>
                    </div>
                </div>
            </section>

            {/* Regions Grid - Hub & Spoke Structure */}
            <section id="villes" className="px-6 py-24">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
                        Nos Zones d'Intervention
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Link
                            href="/reserver-taxi-ile-de-france"
                            className="group relative block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
                        >
                            <div className="aspect-video w-full bg-blue-600 object-cover flex items-center justify-center text-white text-4xl font-bold opacity-90 group-hover:opacity-100 transition">
                                IDF
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="mb-2 text-xl font-bold text-neutral-900 group-hover:text-blue-600">
                                    Île-de-France
                                </h3>
                                <p className="mb-4 text-sm text-neutral-600">
                                    Paris, Hauts-de-Seine, Yvelines, Seine-Saint-Denis...
                                </p>
                                <div className="flex items-center justify-center text-sm font-medium text-blue-600">
                                    Voir les départements <ArrowRight size={16} className="ml-1" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-900 px-6 py-12 text-white">
                <div className="mx-auto max-w-6xl text-center">
                    <div className="mb-4 text-2xl font-bold">TaxiFrance.</div>
                    <p className="text-neutral-400">
                        &copy; {new Date().getFullYear()} TaxiFrance Network. Tous droits
                        réservés.
                    </p>
                </div>
            </footer>
        </div>
    );
}
