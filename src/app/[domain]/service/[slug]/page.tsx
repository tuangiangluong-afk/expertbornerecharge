import { CITIES, getCity } from "@/lib/db";
import { SEO_SERVICES } from "@/lib/seo-data";
import { getSpintaxContent } from "@/lib/spintax";
import { notFound } from "next/navigation";
import { Phone, CheckCircle, Shield, Truck, Moon } from "lucide-react";
import CallButton from "@/components/CallButton";
import Link from "next/link";
import { getTheme } from "@/lib/theme";
import type { Metadata } from "next";

// Helper to find Service
function getService(slug: string) {
    return SEO_SERVICES.find(s => s.slug === slug);
}

// Generate Static Params
export async function generateStaticParams() {
    const params = [];
    for (const cityKey in CITIES) {
        const city = CITIES[cityKey];
        for (const serv of SEO_SERVICES) {
            params.push({ domain: city.slug, slug: serv.slug });
        }
    }
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ domain: string; slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    const service = getService(resolvedParams.slug);

    if (!city || !service) return {};

    // Dynamic Title based on service type
    const title = `${service.title} à ${city.city} | Service Officiel`;
    const description = `Besoin d'un ${service.title.toLowerCase()} à ${city.city} ? ${service.description} Réservation immédiate.`;

    return {
        title: title,
        description: description,
        alternates: {
            canonical: `https://${city.domain}/service/${resolvedParams.slug}`,
        }
    };
}

export default async function ServicePage({ params }: { params: Promise<{ domain: string; slug: string }> }) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    const service = getService(resolvedParams.slug);

    if (!city || !service) return notFound();

    const theme = getTheme(city.slug);
    const classes = theme.classes;

    // Select Spintax key based on service type
    let spintaxKey = "intro";
    if (service.slug === 'conventionne-cpam') spintaxKey = 'medical_intro';
    else if (service.slug === 'longue-distance') spintaxKey = 'long_distance_intro';
    else if (service.slug === 'van-minibus') spintaxKey = 'vehicle_van_desc';
    // Fallbacks or specific ones can be added to spintax.ts

    const intro = getSpintaxContent(spintaxKey as any, city.city);
    const ctaText = getSpintaxContent("cta_button", city.city);

    // Icon Selection
    const Icon = service.slug === 'conventionne-cpam' ? Shield :
        service.slug === 'van-minibus' ? Truck :
            service.slug === 'nuit' ? Moon : CheckCircle;

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
            {/* Nav */}
            <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 px-4 py-3 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className={`flex items-center gap-2 text-sm font-bold ${theme.text} hover:opacity-80 transition`}
                    >
                        <div className={`p-1 rounded bg-neutral-100 ${theme.text}`}>
                            <Icon size={16} />
                        </div>
                        {city.name}
                    </Link>
                    <CallButton
                        phoneNumber={city.phoneNumber}
                        cityName={city.city}
                        theme={theme}
                        className={`rounded-full ${classes.bg} px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:brightness-110 active:scale-95`}
                    >
                        <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>Appeler</span>
                        </div>
                    </CallButton>
                </div>
            </nav>

            <main className="container mx-auto max-w-4xl px-4 py-12">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                    <Link href="/" className="hover:text-neutral-900 transition">Accueil</Link>
                    <span>/</span>
                    <span className="text-neutral-900">Services</span>
                    <span>/</span>
                    <span className={`${theme.text}`}>{service.title}</span>
                </div>

                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <div className={`inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold uppercase tracking-wider ${theme.text} mb-6`}>
                            <Icon size={14} />
                            Service Premium
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl leading-tight">
                            {service.title} <br />
                            à <span className="underline decoration-wavy decoration-yellow-400 decoration-2 underline-offset-4">{city.city}</span>
                        </h1>
                        <p className="mb-8 text-lg text-neutral-600 leading-relaxed">
                            {intro}
                        </p>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 mb-8">
                            <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-green-500" size={20} />
                                Ce que nous garantissons
                            </h3>
                            <ul className="space-y-3">
                                {service.keywords.map((kw, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                                        <div className={`w-1.5 h-1.5 rounded-full ${classes.bg}`}></div>
                                        Service lié à : <strong className="capitalize">{kw}</strong>
                                    </li>
                                ))}
                                <li className="flex items-center gap-3 text-sm text-neutral-600">
                                    <div className={`w-1.5 h-1.5 rounded-full ${classes.bg}`}></div>
                                    Devis gratuit et immédiat
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <CallButton
                                phoneNumber={city.phoneNumber}
                                cityName={city.city}
                                theme={theme}
                                className={`flex items-center justify-center gap-2 rounded-xl py-4 px-8 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:brightness-110 active:scale-95 ${classes.bg}`}
                            >
                                <Phone size={20} />
                                {ctaText}
                            </CallButton>
                        </div>
                    </div>

                    {/* Right: Visual / Card */}
                    <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-neutral-100">
                        {/* Fallback image logic or generic service pattern */}
                        <div className={`absolute inset-0 ${classes.bg} opacity-10`}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Icon size={120} className={`${theme.text} opacity-20`} />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                            <p className="font-bold text-xl mb-1">{city.name}</p>
                            <p className="text-neutral-300 text-sm">Votre partenaire mobilité pour {service.title.toLowerCase()}.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
