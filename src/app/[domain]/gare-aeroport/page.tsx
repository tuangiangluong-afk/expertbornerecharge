import { CITIES, getCity } from "@/lib/db";
import { getSpintaxContent } from "@/lib/spintax";
import { FAQ } from "@/components/FAQ";
import { Plane, Train, Clock, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ domain: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return {};

    return {
        title: `Taxi Gare & Aéroport ${city.city} | Navette 24/7`,
        description: `Réservez votre transfert depuis/vers ${city.stations[0]} ou l'aéroport. Chauffeur ponctuel, tarifs fixes. ${city.name}.`
    };
}

export default async function StationPage({ params }: { params: Promise<{ domain: string }> }) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return notFound();

    const introText = getSpintaxContent("airport_intro", city.city);
    const titleText = getSpintaxContent("airport_title", city.city);
    const ctaText = getSpintaxContent("cta_button", city.city);

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
            <nav className="fixed top-0 z-50 w-full border-b border-neutral-200/80 bg-white/90 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center justify-between">
                    <a href="/" className="text-xl font-bold tracking-tight text-neutral-900 hover:text-blue-600">
                        {city.name}
                    </a>
                    <a
                        href={`tel:${city.phoneNumber.replace(/ /g, "")}`}
                        className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-green-600/20"
                    >
                        Appeler
                    </a>
                </div>
            </nav>

            <div className="relative pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1
                        className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl"
                        dangerouslySetInnerHTML={{ __html: titleText }}
                    />
                    <p className="mb-10 text-xl text-neutral-600 max-w-2xl mx-auto">
                        {introText}
                    </p>

                    <div className="grid gap-6 md:grid-cols-2 mb-12">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 text-left">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                    <Train size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Gares SNCF / TGV</h3>
                                    <p className="text-sm text-neutral-500">Connexions directes</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-neutral-700">
                                {city.stations.map((s, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 text-left">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-teal-100 text-teal-600 rounded-xl">
                                    <Plane size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Aéroports</h3>
                                    <p className="text-sm text-neutral-500">Toutes distances</p>
                                </div>
                            </div>
                            <p className="text-neutral-700 mb-2">
                                Des forfaits fixes pour rejoindre les aéroports de la région.
                                Pas de suppléments bagages.
                            </p>
                            <div className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-lg">
                                <Clock size={14} /> Suivi de vol en temps réel
                            </div>
                        </div>
                    </div>

                    <a
                        href={`tel:${city.phoneNumber.replace(/ /g, "")}`}
                        className="inline-flex items-center justify-center gap-3 rounded-xl bg-neutral-900 px-10 py-5 text-xl font-bold text-white transition hover:bg-neutral-800 shadow-2xl"
                    >
                        <Phone fill="currentColor" />
                        {ctaText}
                    </a>

                    <div className="mt-16 text-left">
                        <FAQ city={city.city} type="airport" />
                    </div>

                    {/* SEO Maillage */}
                    <div className="mt-20 pt-10 border-t border-neutral-200 text-left">
                        <h4 className="font-bold text-neutral-900 mb-4">Dessertes principales</h4>
                        <div className="flex flex-wrap gap-2">
                            {city.neighborhoods.slice(0, 10).map((n) => (
                                <span key={n} className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                                    Taxi {n}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
