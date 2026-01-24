import { CITIES, getCity } from "@/lib/db";
import { getSpintaxContent } from "@/lib/spintax";
import { slugify } from "@/lib/slugify";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/StructuredData";
import { Phone, CheckCircle, Ambulance, FileText } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ domain: string; slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return {};

    const hospitalName = city.hospitals.find(h => slugify(h) === resolvedParams.slug);
    if (!hospitalName) return {};

    return {
        title: `Taxi CPAM ${hospitalName} | Transport Conventionné ${city.city}`,
        description: `Réservez votre taxi conventionné pour ${hospitalName}. Transport médical assis (TAP) pris en charge à 65% ou 100%. Tiers payant accepté.`,
        alternates: {
            canonical: `https://${city.domain}/transport-medical/${resolvedParams.slug}`,
        }
    };
}

export default async function HospitalPage({ params }: { params: Promise<{ domain: string; slug: string }> }) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return notFound();

    const hospitalName = city.hospitals.find(h => slugify(h) === resolvedParams.slug);
    if (!hospitalName) return notFound();

    const introText = getSpintaxContent("medical_intro", city.city);

    return (
        <div className="min-h-screen font-sans bg-neutral-50 text-neutral-900">
            <StructuredData city={city} />

            <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-neutral-900/90 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center justify-between container mx-auto">
                    <a href={`/${city.slug}`} className="text-xl font-bold tracking-tight text-white hover:text-yellow-400 transition">
                        {city.name}<span className="text-yellow-400">.</span>
                    </a>
                    <a
                        href={`tel:${city.phoneNumber.replace(/ /g, "")}`}
                        className="flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-neutral-900 shadow-lg hover:bg-yellow-300"
                    >
                        <Phone size={16} fill="currentColor" />
                        <span>Réserver TAP</span>
                    </a>
                </div>
            </nav>

            <main className="pt-24 pb-12 px-4 container mx-auto max-w-4xl">
                <div className="text-sm text-neutral-500 mb-6">
                    <a href={`/`} className="hover:underline">Accueil</a> &gt; <a href={`/transport-medical`} className="hover:underline">Transport Médical</a> &gt; <span className="text-neutral-900 font-medium">{hospitalName}</span>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-200 mb-8">
                    <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700 mb-6">
                        <Ambulance size={14} className="mr-2" />
                        Destination Conventionnée CPAM
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight">
                        Taxi VSL pour <span className="text-blue-600">{hospitalName}</span>
                    </h1>

                    <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                        Vous avez une consultation ou une hospitalisation prévue à <strong>{hospitalName}</strong> ?
                        Nos chauffeurs conventionnés vous accompagnent depuis votre domicile jusqu'au service concerné.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h3 className="font-bold flex items-center gap-2 mb-2">
                                <FileText size={18} className="text-blue-500" /> Prise en charge
                            </h3>
                            <p className="text-sm text-gray-600">Nous pratiquons le tiers-payant. Vous n'avancez pas les frais (si 100%).</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h3 className="font-bold flex items-center gap-2 mb-2">
                                <CheckCircle size={18} className="text-green-500" /> Accompagnement
                            </h3>
                            <p className="text-sm text-gray-600">Aide à la marche et aux formalités d'entrée administrative.</p>
                        </div>
                    </div>

                    <a href={`tel:${city.phoneNumber.replace(/ /g, "")}`} className="block w-full bg-blue-600 text-white text-center font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
                        Commander pour {hospitalName}
                    </a>
                </div>

                {/* Maillage Hôpitaux */}
                <div className="mt-12 pt-8 border-t border-neutral-200">
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">Autres centres de soins à {city.city}</h3>
                    <div className="flex flex-wrap gap-3">
                        {city.hospitals.filter(h => h !== hospitalName).map(h => (
                            <a key={h} href={`/transport-medical/${slugify(h)}`} className="text-sm px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:border-blue-300 hover:text-blue-600 transition">
                                {h}
                            </a>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
