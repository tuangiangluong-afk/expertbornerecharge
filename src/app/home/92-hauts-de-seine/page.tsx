
import { CITIES } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Car, Star } from "lucide-react";
import { DepartmentMap } from "@/components/DepartmentMap";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Taxi 92 Hauts-de-Seine | Réseau TaxiFrance",
    description: "Réservez votre taxi dans les Hauts-de-Seine (92). Boulogne, Neuilly, Nanterre, Asnières... Chauffeurs locaux et tarifs réglementés.",
};

export default function Department92Page() {
    // Filter 92 cities from DB
    const departmentCities = Object.values(CITIES).filter(city => city.name.includes(" 92"));

    // Center logic (approximate for 92)
    const mapCenter = { lat: 48.8926, lng: 2.22 };

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-blue-100">
            {/* Navbar */}
            <nav className="border-b bg-white px-6 py-4 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/90">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <Link href="/home" className="text-2xl font-bold tracking-tighter text-blue-900">
                        TaxiFrance<span className="text-blue-600">.</span>
                    </Link>
                    <Link href="/reserver-taxi-ile-de-france" className="text-sm font-medium text-neutral-500 hover:text-blue-600">
                        ← Retour Région
                    </Link>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-white py-20 px-6">
                    <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-800 mb-6">
                                <Car size={16} className="mr-2" />
                                Département 92
                            </span>
                            <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900 sm:text-7xl mb-6">
                                Taxis <span className="text-blue-600">Hauts-de-Seine</span>
                            </h1>
                            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                                Le réseau premium des artisans taxis du 92.
                                De la Défense à Boulogne-Billancourt, un service fiable pour vos déplacements professionnels et personnels.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg text-sm font-medium text-neutral-700">
                                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                    4.9/5 satisfaction
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg text-sm font-medium text-neutral-700">
                                    <Car size={16} className="text-blue-500" />
                                    Berlines & Vans
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <DepartmentMap center={mapCenter} zoom={11} />
                            {/* Decorative blur */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl -z-10 rounded-full" />
                        </div>
                    </div>
                </section>

                {/* Cities Grid - The "Directory" */}
                <section className="py-24 px-6 bg-neutral-50 border-t border-neutral-200">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center md:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-4">
                                Villes desservies dans le 92
                            </h2>
                            <p className="text-neutral-500">
                                Sélectionnez votre ville de départ pour commander un taxi local.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {departmentCities.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`http://${city.domain}`}
                                    target="_blank"
                                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl hover:-translate-y-1 border border-neutral-100"
                                >
                                    <div className="relative h-40 bg-neutral-200 overflow-hidden">
                                        {/* Fake City Image with Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-white/90 tracking-widest uppercase">
                                                {city.city}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-3 right-3 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white">
                                            92
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-lg font-bold text-neutral-900 group-hover:text-blue-600 transition">
                                                {city.name}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-neutral-500 line-clamp-2 mb-6 flex-1">
                                            {city.description}
                                        </p>
                                        <div className="mt-auto">
                                            <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-bold text-white transition group-hover:bg-blue-600">
                                                <Phone size={16} />
                                                Réserver
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
