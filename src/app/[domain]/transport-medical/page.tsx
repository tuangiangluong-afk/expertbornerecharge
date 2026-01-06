import { CITIES } from "@/lib/db";
import { getSpintaxContent } from "@/lib/spintax";
import { FAQ } from "@/components/FAQ";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Ambulance, CheckCircle, Phone, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

function getCity(domain: string) {
    if (CITIES[domain]) return CITIES[domain];
    const cityKey = Object.keys(CITIES).find(
        (key) => CITIES[key].domain === domain
    );
    if (cityKey) return CITIES[cityKey];
    return null;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ domain: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return {};

    return {
        title: `Taxi Conventionné ${city.city} | Transport Médical VSL - CPAM`,
        description: `Besoin d'un taxi conventionné à ${city.city} ? Transport assis vers ${city.hospitals[0]} et tous centres de soins. Tiers payant accepté.`
    };
}

export default async function MedicalTransportPage({ params }: { params: Promise<{ domain: string }> }) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return notFound();

    const introText = getSpintaxContent("medical_intro", city.city);
    const ctaText = getSpintaxContent("medical_cta", city.city);
    const titleText = getSpintaxContent("medical_title", city.city);

    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900">
            {/* Sticky Nav (Simplified) */}
            <nav className="fixed top-0 z-50 w-full border-b border-neutral-200/80 bg-white/90 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center justify-between">
                    <a href={`/${city.slug}`} className="text-xl font-bold tracking-tight text-neutral-900 hover:text-blue-600">
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

            <main className="pt-24 pb-16 px-4 bg-slate-50 min-h-screen">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-700 mb-6 shadow-sm border border-blue-200">
                            <Ambulance size={16} className="mr-2" />
                            Transport Assis Professionnalisé (TAP)
                        </div>

                        <h1
                            className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl"
                            dangerouslySetInnerHTML={{ __html: titleText }}
                        />

                        <p className="mb-8 text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            {introText}
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 mb-16">
                        {/* Card 1: Destinations */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900">
                                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                    <CheckCircle size={22} />
                                </div>
                                Destinations Desservies
                            </h2>
                            <ul className="space-y-3">
                                {city.hospitals.map((hospital, i) => (
                                    <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                                        <span className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0" />
                                        <span className="font-medium text-slate-700">{hospital}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Card 2: Documents */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900">
                                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                    <ShieldCheck size={22} />
                                </div>
                                Documents Requis
                            </h2>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">1</div>
                                    <div>
                                        <strong className="block text-slate-900">Prescription Médicale</strong>
                                        <p className="text-sm text-slate-500">Bon de transport signé par le médecin.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">2</div>
                                    <div>
                                        <strong className="block text-slate-900">Carte Vitale</strong>
                                        <p className="text-sm text-slate-500">À jour pour la télétransmission.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">3</div>
                                    <div>
                                        <strong className="block text-slate-900">Attestation de Droits</strong>
                                        <p className="text-sm text-slate-500">Si moins de 100% de couverture.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center bg-blue-600 rounded-3xl p-10 text-white shadow-2xl shadow-blue-600/30">
                        <h3 className="text-2xl font-bold mb-4">Besoin d'un taxi conventionné ?</h3>
                        <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                            Nos chauffeurs sont formés pour l'accompagnement des patients. Aide à la marche et démarches administratives incluses.
                        </p>
                        <a
                            href={`tel:${city.phoneNumber.replace(/ /g, "")}`}
                            className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-900 transition hover:bg-blue-50 shadow-lg active:scale-95"
                        >
                            <Phone fill="currentColor" />
                            {ctaText}
                        </a>
                    </div>

                    <div className="mt-16">
                        <FAQ city={city.city} type="medical" />
                    </div>
                </div>
            </main>
        </div>
    );
}
