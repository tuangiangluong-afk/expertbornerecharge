import { CITIES, getCity } from "@/lib/db";
import { getSpintaxContent } from "@/lib/spintax";
import { MapPin, Phone, Car } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredData";
import { slugify } from "@/lib/slugify";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ domain: string, slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return {};

    // Restore clean name from DB if possible, else prettify slug
    const quartierMatch = city.neighborhoods.find(n => slugify(n) === resolvedParams.slug);
    const quartierName = quartierMatch || resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1).replace(/-/g, ' ');

    return {
        title: `Taxi ${quartierName} ${city.city} | Arrivée 10 min - ${city.name}`,
        description: `Commander un taxi à ${quartierName}, ${city.city}. Chauffeur local disponible immédiatement. Transfert Gare et Aéroport depuis ${quartierName}.`,
        alternates: {
            canonical: `https://${city.domain}/quartier/${resolvedParams.slug}`,
        },
    };
}

export default async function QuartierPage({ params }: { params: Promise<{ domain: string, slug: string }> }) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return notFound();

    const quartierMatch = city.neighborhoods.find(n => slugify(n) === resolvedParams.slug);

    // Strict Mode for SEO Quality
    if (!quartierMatch) {
        return notFound();
    }

    const quartierDisplay = quartierMatch;
    const introText = getSpintaxContent("intro", city.city);

    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900">
            <StructuredData city={city} />
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

            <main className="pt-24 pb-16 px-4">
                <div className="container mx-auto max-w-3xl">
                    <nav className="mb-6 flex items-center text-sm text-neutral-500" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            <li><a href="/" className="hover:underline">{city.city}</a></li>
                            <li><span className="mx-2">/</span></li>
                            <li><span className="font-medium text-neutral-900" aria-current="page">{quartierDisplay}</span></li>
                        </ol>
                    </nav>

                    <h1 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
                        Taxi à <span className="text-blue-600">{quartierDisplay}</span>
                    </h1>

                    <div className="prose prose-lg text-neutral-600 mb-8">
                        <p>
                            {introText}
                            Vous habitez ou séjournez à <strong>{quartierDisplay}</strong> ?
                            Notre flotte de taxis est positionnée à proximité pour assurer une prise en charge rapide.
                        </p>
                        <p>
                            Ne perdez pas de temps à attendre. Que ce soit pour aller à la <strong>{city.stations[0]}</strong> ou pour un rendez-vous médical, nous sommes là.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                            <Car size={20} />
                            Temps d'approche estimé vers {quartierDisplay}
                        </h3>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-extrabold text-green-600">7-12</span>
                            <span className="text-lg font-medium text-neutral-500 mb-1">minutes</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <a
                            href={`tel:${city.phoneNumber.replace(/ /g, "")}`}
                            className="flex-1 inline-flex items-center justify-center gap-3 rounded-xl bg-neutral-900 px-6 py-4 font-bold text-white transition hover:bg-neutral-800"
                        >
                            <Phone fill="currentColor" size={18} />
                            Commander Taxi {quartierDisplay}
                        </a>
                    </div>
                </div>

                {/* Internal Linking / Maillage */}
                <div className="mt-24 pt-12 border-t border-gray-100">
                    <div className="container mx-auto max-w-4xl">
                        <h3 className="text-xl font-bold text-neutral-900 mb-6">Taxis à proximité de {quartierDisplay}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            {city.neighborhoods
                                .filter(n => n !== quartierMatch)
                                .slice(0, 8)
                                .map((neighbor) => (
                                    <a
                                        key={neighbor}
                                        href={`/quartier/${slugify(neighbor)}`}
                                        className="text-sm text-neutral-600 hover:text-blue-600 hover:underline transition"
                                    >
                                        Taxi {neighbor}
                                    </a>
                                ))}
                        </div>

                        <h3 className="text-xl font-bold text-neutral-900 mb-6">Services fréquents</h3>
                        <div className="flex flex-wrap gap-4">
                            <a href={`/transport-medical`} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition">
                                Transport Médical
                            </a>
                            <a href={`/gare-aeroport`} className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium hover:bg-teal-100 transition">
                                Gare & Aéroport
                            </a>
                            <a href={`/longue-distance`} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-100 transition">
                                Longue Distance
                            </a>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
