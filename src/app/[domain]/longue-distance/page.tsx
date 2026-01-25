import { CITIES, getCity } from "@/lib/db";
import { getSpintaxContent } from "@/lib/spintax";
import { getTheme } from "@/lib/theme";
import CallButton from "@/components/CallButton";
import { slugify } from "@/lib/slugify";
import { FAQ } from "@/components/FAQ";
import { Car, Map, ShieldCheck, Star, Phone, ArrowRight } from "lucide-react";
import { DistanceCalculator } from "@/components/DistanceCalculator";
import { notFound } from "next/navigation";
import { SEO_SERVICES, SEO_DESTINATIONS } from "@/lib/seo-data";
import Link from "next/link";
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
        title: `Taxi Longue Distance ${city.city} | Devis Immédiat & Prix Fixe`,
        description: `Service VTC/Taxi longue distance depuis ${city.city}. Berline confort, chauffeurs expérimentés. Forfaits vers Nice, Lyon, Paris, Barcelone...`,
        alternates: {
            canonical: `https://${city.domain}/longue-distance`,
        },
    };
}

export default async function LongDistancePage({ params }: { params: Promise<{ domain: string }> }) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return notFound();

    const ctaText = getSpintaxContent("cta_button", city.city);
    const titleText = getSpintaxContent("long_distance_title", city.city);
    const introText = getSpintaxContent("long_distance_intro", city.city);

    return (
        <div className="min-h-screen bg-neutral-900 font-sans text-neutral-100 selection:bg-yellow-500 selection:text-neutral-900">
            <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-neutral-900/80 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center justify-between">
                    <a href="/" className="text-xl font-bold tracking-tight text-white hover:text-yellow-400 transition">
                        {city.name}
                    </a>
                    <CallButton
                        phoneNumber={city.phoneNumber}
                        cityName={city.city}
                        theme={getTheme(city.slug)}
                        className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-neutral-900 shadow-lg shadow-yellow-500/20 hover:bg-yellow-400 transition"
                    >
                        Appeler
                    </CallButton>
                </div>
            </nav>

            {/* Hero Dark Mode */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-neutral-900 pointer-events-none" />

                <div className="container mx-auto max-w-5xl relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <div className="mb-6 inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-500 backdrop-blur-sm">
                            <Star size={14} className="mr-2 fill-yellow-500" />
                            Service Premium
                        </div>
                        <h1
                            className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl text-white"
                            dangerouslySetInnerHTML={{ __html: titleText }}
                        />
                        <p
                            className="mb-8 text-lg text-neutral-400 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: introText }}
                        />

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <ShieldCheck className="text-green-500 mt-1" />
                                <div>
                                    <strong className="block text-white">Prix Fixe Garanti</strong>
                                    <span className="text-sm text-neutral-500">Connu à l'avance. Pas de supplément bouchons.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Car className="text-blue-500 mt-1" />
                                <div>
                                    <strong className="block text-white">Berlines Confort</strong>
                                    <span className="text-sm text-neutral-500">Mercedes Classe E ou Van Classe V sur demande.</span>
                                </div>
                            </li>
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <CallButton
                                phoneNumber={city.phoneNumber}
                                cityName={city.city}
                                theme={getTheme(city.slug)}
                                className="inline-flex items-center justify-center gap-3 rounded-xl bg-yellow-500 px-8 py-4 text-lg font-bold text-neutral-900 transition hover:bg-yellow-400 shadow-xl shadow-yellow-500/20"
                            >
                                <Phone fill="currentColor" size={20} />
                                Demander un devis
                            </CallButton>
                        </div>
                    </div>

                    {/* Real Calculator */}
                    <DistanceCalculator city={city} />
                </div>
            </section>

            {/* Popular Routes */}
            <section className="py-20 bg-neutral-900 border-t border-white/5">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Destinations fréquentes depuis {city.city}</h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {SEO_DESTINATIONS.map((dest) => (
                            <Link key={dest.slug} href={`/tarif/${dest.slug}`} className="flex items-center justify-between p-4 rounded-xl bg-neutral-800/50 border border-white/5 hover:border-yellow-500/50 transition cursor-pointer group">
                                <span className="font-medium text-neutral-300 group-hover:text-white">{dest.name}</span>
                                <span className="text-xs font-bold px-2 py-1 rounded bg-neutral-700 text-neutral-400 group-hover:bg-yellow-500 group-hover:text-neutral-900 transition">Devis</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <FAQ city={city.city} type="long_distance" />

            <section className="py-16 bg-neutral-900 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h3 className="text-xl font-bold text-white mb-6">Voir aussi nos autres services à {city.city}</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {SEO_SERVICES.filter(s => s.slug !== 'longue-distance').map((service) => (
                            <Link
                                key={service.slug}
                                href={`/${service.slug}`}
                                className="group block p-4 rounded-xl bg-neutral-800 border border-white/5 hover:border-yellow-500/50 hover:bg-neutral-800/80 transition"
                            >
                                <h4 className="font-bold text-white group-hover:text-yellow-400 transition flex items-center gap-2">
                                    <ArrowRight size={16} />
                                    {service.title}
                                </h4>
                                <p className="text-sm text-neutral-400 mt-1">{service.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
