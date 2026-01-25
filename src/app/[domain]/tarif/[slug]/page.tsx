import { CITIES, getCity } from "@/lib/db";
import { SEO_DESTINATIONS, SEO_SERVICES } from "@/lib/seo-data";
import { getSpintaxContent } from "@/lib/spintax";
import { notFound } from "next/navigation";
import { Phone, MapPin, Clock, ArrowRight, Car, Euro, CheckCircle } from "lucide-react";
import CallButton from "@/components/CallButton";
import Link from "next/link";
import { getTheme } from "@/lib/theme";
import { calculateDistance, getDestinationAddress } from "@/lib/distance";
import type { Metadata } from "next";

// Helper to find Destination
function getDestination(slug: string) {
    return SEO_DESTINATIONS.find(d => d.slug === slug);
}

// Generate Static Params for SSG/ISR
export async function generateStaticParams() {
    const params = [];
    for (const cityKey in CITIES) {
        const city = CITIES[cityKey];
        for (const dest of SEO_DESTINATIONS) {
            params.push({ domain: city.slug, slug: dest.slug });
        }
    }
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ domain: string; slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    const dest = getDestination(resolvedParams.slug);

    if (!city || !dest) return {};

    const title = `Prix Taxi ${city.city} - ${dest.name} | Tarif & Réservation`;
    const description = `Combien coûte un taxi de ${city.city} à ${dest.name} ? Estimation du prix, temps de trajet et réservation immédiate. Chauffeur privé vtc ou taxi.`;

    return {
        title: title,
        description: description,
        alternates: {
            canonical: `https://${city.domain}/tarif/${resolvedParams.slug}`,
        }
    };
}

export default async function TarifPage({ params }: { params: Promise<{ domain: string; slug: string }> }) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    const dest = getDestination(resolvedParams.slug);

    if (!city || !dest) return notFound();

    const theme = getTheme(city.slug);
    const classes = theme.classes;

    // Spintax Content
    const intro = getSpintaxContent("airport_intro", city.city);
    const ctaText = getSpintaxContent("cta_button", city.city);

    // Real Distance Calculation using Google Distance Matrix API
    let priceRange = "Sur devis";
    let timeEst = "Variable";
    let distanceText = "";

    const destAddress = getDestinationAddress(dest.slug);
    if (destAddress) {
        const distanceResult = await calculateDistance(city.city + ", France", destAddress);
        if (distanceResult) {
            priceRange = distanceResult.priceRange;
            timeEst = distanceResult.duration;
            distanceText = distanceResult.distance;
        }
    }

    // Fallback for destinations not in our address map
    if (priceRange === "Sur devis") {
        if (dest.type === 'airport') {
            priceRange = "45€ - 75€";
            timeEst = "45 - 60 min";
        } else if (dest.type === 'station') {
            priceRange = "30€ - 50€";
            timeEst = "30 - 45 min";
        } else {
            priceRange = "25€ - 45€";
            timeEst = "20 - 40 min";
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
            {/* Nav */}
            <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 px-4 py-3 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className={`flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-neutral-900 transition`}
                    >
                        <Car size={16} />
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
                <div className="mb-8 flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                    <Link href="/" className="hover:text-neutral-900 transition">Accueil</Link>
                    <span>/</span>
                    <span className="text-neutral-900">Tarifs</span>
                    <span>/</span>
                    <span className={`${classes.text}`}>{dest.name}</span>
                </div>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Left: Content */}
                    <div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
                            Taxi <span className={`${classes.text}`}>{city.city}</span> <br />
                            vers {dest.name}
                        </h1>
                        <p className="mb-8 text-lg text-neutral-600 leading-relaxed">
                            {intro}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <CheckCircle className={`mt-1 shrink-0 ${classes.text}`} size={20} />
                                <div>
                                    <h3 className="font-bold text-neutral-900">Prix Fixe & Transparent</h3>
                                    <p className="text-sm text-neutral-600">Le prix peut être convenu à l'avance. Pas de surprise à l'arrivée.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className={`mt-1 shrink-0 ${classes.text}`} size={20} />
                                <div>
                                    <h3 className="font-bold text-neutral-900">Chauffeurs Sélectionnés</h3>
                                    <p className="text-sm text-neutral-600">Ponctualité, courtoisie et véhicules récents pour votre confort.</p>
                                </div>
                            </div>
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
                            <Link
                                href="/#booking"
                                className="flex items-center justify-center gap-2 rounded-xl bg-white border border-neutral-200 py-4 px-8 text-lg font-bold text-neutral-900 shadow-sm transition-all hover:bg-neutral-50 active:scale-95"
                            >
                                <CalendarIcon />
                                Réserver en ligne
                            </Link>
                        </div>
                    </div>

                    {/* Right: Simulation Card */}
                    <div className="relative">
                        <div className="sticky top-24 rounded-3xl bg-neutral-900 p-1 shadow-2xl ring-1 ring-white/10">
                            <div className="rounded-[20px] bg-neutral-800 p-8 text-white h-full relative overflow-hidden">
                                {/* Decor */}
                                <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full ${classes.bg} opacity-20 blur-3xl`}></div>

                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                    <Euro className="text-yellow-400" />
                                    Estimation Tarifaire
                                </h2>

                                {/* Route Visualization */}
                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-white"></div>
                                            <div className="w-0.5 h-12 bg-white/20"></div>
                                            <div className={`w-3 h-3 rounded-full ${classes.bg}`}></div>
                                        </div>
                                        <div className="flex-1 space-y-8 py-2">
                                            <div>
                                                <p className="text-xs text-neutral-400 uppercase tracking-widest">Départ</p>
                                                <p className="font-bold text-lg">{city.city}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-neutral-400 uppercase tracking-widest">Arrivée</p>
                                                <p className="font-bold text-lg">{dest.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-white/10 my-6"></div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                                            <p className="text-xs text-neutral-400 mb-1">Durée Estimée</p>
                                            <div className="flex items-center gap-2 font-mono text-xl font-bold text-yellow-400">
                                                <Clock size={16} />
                                                {timeEst}
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                                            <p className="text-xs text-neutral-400 mb-1">Prix Estimé</p>
                                            <div className="flex items-center gap-2 font-mono text-xl font-bold text-green-400">
                                                <Euro size={16} />
                                                {priceRange}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-xs text-blue-200 mt-4 leading-relaxed">
                                        Note: Le tarif final peut varier selon l'horaire (Nuit/Dimanche) et la circulation. Contactez-nous pour un devis précis.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Text Block */}
                <div className="mt-20 border-t border-neutral-200 pt-12">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                        Pourquoi choisir notre service de Taxi vers {dest.name} ?
                    </h2>
                    <div className="prose prose-neutral max-w-none text-neutral-600">
                        <p>
                            Effectuer le trajet entre <strong>{city.city}</strong> et <strong>{dest.name}</strong> demande une organisation rigoureuse.
                            Que ce soit pour un départ en vacances ou un déplacement professionnel, la fiabilité est primordiale.
                        </p>
                        <p>
                            Notre service de taxi local connait parfaitement les itinéraires pour éviter les bouchons lorsque c'est possible.
                            Contrairement aux applications classiques qui peuvent majorer les prix, nous privilégions la transparence.
                        </p>
                        <h3 className="text-xl font-bold text-neutral-900 mt-6 mb-4">Combien coûte un taxi {city.city} - {dest.name} ?</h3>
                        <p>
                            Le prix réglementé des taxis utilise un taximètre. Cependant, pour les trajets aéroports ou longue distance, des forfaits peuvent être appliqués ou estimés.
                            L'estimation de <strong>{priceRange}</strong> donnée ci-dessus est indicative pour un trajet de jour en conditions normales.
                        </p>
                    </div>

                    {/* See Also Section */}
                    <div className="mt-16 border-t border-neutral-200/50 pt-8">
                        <h3 className="text-xl font-bold text-neutral-900 mb-6">Voir aussi nos autres services à {city.city}</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {SEO_SERVICES.map((service) => (
                                <Link
                                    key={service.slug}
                                    href={`/${service.slug}`}
                                    className="group block p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition"
                                >
                                    <h4 className={`font-bold ${classes.text} group-hover:opacity-80 transition flex items-center gap-2`}>
                                        <ArrowRight size={16} />
                                        {service.title}
                                    </h4>
                                    <p className="text-sm text-neutral-500 mt-1">{service.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function CalendarIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-calendar"
        >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
        </svg>
    );
}
