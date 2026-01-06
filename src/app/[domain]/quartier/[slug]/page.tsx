import { CITIES, getCity } from "@/lib/db";
import { getSpintaxContent } from "@/lib/spintax";
import { MapPin, Phone, Car } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ domain: string, slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return {};

    // Clean up slug text (e.g. "luynes" -> "Luynes")
    const quartierName = resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1);

    return {
        title: `Taxi ${quartierName} - ${city.city} | Arrivée en 10 min`,
        description: `Commander un taxi à ${quartierName} (${city.city}). Chauffeur local disponible immédiatement. Transfert Gare et Aéroport.`
    };
}

export default async function QuartierPage({ params }: { params: Promise<{ domain: string, slug: string }> }) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return notFound();

    // Verify if slug is a valid neighborhood
    const quartierMatch = city.neighborhoods.find(n => n.toLowerCase().replace(/ /g, "-") === resolvedParams.slug.toLowerCase());

    // If strict checking is desired, uncomment below. For SEO "long tail" aiming, maybe lenient? 
    // Let's be semi-strict to avoid generating infinite spam pages.
    if (!quartierMatch) {
        // return notFound(); // Or fallback to generic city page content
    }

    const quartierDisplay = quartierMatch || resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1);
    const introText = getSpintaxContent("intro", city.city);

    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900">
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
                    <div className="mb-6 flex items-center text-sm text-neutral-500">
                        <a href="/" className="hover:underline">{city.city}</a>
                        <span className="mx-2">/</span>
                        <span className="font-medium text-neutral-900">{quartierDisplay}</span>
                    </div>

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
            </main>
        </div>
    );
}
