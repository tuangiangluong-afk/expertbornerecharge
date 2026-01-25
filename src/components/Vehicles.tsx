import { Car, Users, Gauge, Wifi, ShieldCheck, BatteryCharging, Briefcase } from "lucide-react";
import { getSpintaxContent } from "@/lib/spintax";
import { Database } from "@/types/database.types";
import { getTheme } from "@/lib/theme";

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

interface VehiclesProps {
    city: string;
    slug: string;
    vehicles?: Vehicle[] | null;
}

export function Vehicles({ city, slug, vehicles }: VehiclesProps) {
    const theme = getTheme(slug);
    const classes = theme.classes;

    // Legacy Spintax Fallback
    const sedanTitle = getSpintaxContent("vehicle_sedan_title", city);
    const sedanDesc = getSpintaxContent("vehicle_sedan_desc", city);
    const vanTitle = getSpintaxContent("vehicle_van_title", city);
    const vanDesc = getSpintaxContent("vehicle_van_desc", city);

    const hasDynamicVehicles = vehicles && vehicles.length > 0;


    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700 mb-4">
                        <Car className="w-3 h-3 mr-1" />
                        Flotte Premium
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Nos Véhicules à <span className="text-blue-600">{city}</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                        Une gamme de véhicules récents, entretenus quotidiennement et adaptés à tous vos besoins de transport.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {hasDynamicVehicles ? (
                        vehicles!.map((car) => (
                            <VehicleCard key={car.id} car={car} city={city} theme={theme} />
                        ))
                    ) : (
                        <>
                            {/* 1. Eco / Abordable */}
                            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col">
                                <div className="h-48 overflow-hidden relative shrink-0">
                                    <img
                                        src="/images/vehicle-eco.png"
                                        alt="Taxi Eco Abordable - Toyota Prius"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                                        1-4 Passagers
                                    </div>
                                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Éco
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Gamme Éco</h3>
                                    <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                                        La solution idéale pour vos trajets quotidiens au meilleur tarif. Confort et sobriété énergétique.
                                    </p>
                                    <ul className="grid grid-cols-2 gap-3 mb-8">
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Gauge size={16} className="text-green-500" /> Tarif Abordable
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <BatteryCharging size={16} className="text-green-500" /> Hybride / Élec
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <ShieldCheck size={16} className="text-green-500" /> Sécurité
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Wifi size={16} className="text-green-500" /> Climatisé
                                        </li>
                                    </ul>
                                    <a href={`tel:${city.replace(/ /g, "")}`} className={`block w-full py-4 rounded-xl font-bold text-center transition border shadow-lg hover:brightness-110 active:scale-95 text-white ${classes.bg} ${classes.border}`}>
                                        Réserver un véhicule Éco
                                    </a>
                                </div>
                            </div>

                            {/* 2. Berline Affaires */}
                            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col">
                                <div className="h-48 overflow-hidden relative shrink-0">
                                    <img
                                        src="/images/vehicle-business.png"
                                        alt="Taxi Berline Affaires - Mercedes Classe E"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                                        1-3 Passagers
                                    </div>
                                    <div className="absolute top-4 left-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Affaires
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Berline Affaires</h3>
                                    <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                                        Voyagez en première classe. Véhicules de standing (Mercedes Classe E) pour vos rendez-vous pros ou transferts.
                                    </p>
                                    <ul className="grid grid-cols-2 gap-3 mb-8">
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Briefcase size={16} className="text-slate-900" /> Standing Pro
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Wifi size={16} className="text-slate-900" /> Wi-Fi & Chargeur
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <ShieldCheck size={16} className="text-slate-900" /> Chauffeur Veston
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Gauge size={16} className="text-slate-900" /> Conduite Souple
                                        </li>
                                    </ul>
                                    <a href={`tel:${city.replace(/ /g, "")}`} className={`block w-full py-4 rounded-xl font-bold text-center transition border shadow-lg hover:brightness-110 active:scale-95 text-white ${classes.bg} ${classes.border}`}>
                                        Réserver une Berline
                                    </a>
                                </div>
                            </div>

                            {/* 3. Grand Confort / Van */}
                            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col">
                                <div className="h-48 overflow-hidden relative shrink-0">
                                    <img
                                        src="/images/vehicle-van.png"
                                        alt="Taxi Van Grand Confort - Mercedes Classe V"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                                        1-7 Passagers
                                    </div>
                                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Van VIP
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Van Grand Confort</h3>
                                    <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                                        L'espace absolu pour les groupes ou familles. Mercedes Classe V. Idéal navettes aéroports avec bagages.
                                    </p>
                                    <ul className="grid grid-cols-2 gap-3 mb-8">
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Users size={16} className="text-blue-600" /> 7 Sièges Cuir
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Briefcase size={16} className="text-blue-600" /> Coffre XXL
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Wifi size={16} className="text-blue-600" /> Salon Mobile
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <ShieldCheck size={16} className="text-blue-600" /> Sièges Bébé
                                        </li>
                                    </ul>
                                    <a href={`tel:${city.replace(/ /g, "")}`} className={`block w-full py-4 rounded-xl font-bold text-center transition border shadow-lg hover:brightness-110 active:scale-95 text-white ${classes.bg} ${classes.border}`}>
                                        Réserver un Van
                                    </a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
// Helper component for dynamic vehicle rendering (reused from above)
function VehicleCard({ car, city, theme }: { car: Vehicle; city: string; theme: any }) {
    const classes = theme.classes;
    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col">
            <div className="h-48 overflow-hidden relative shrink-0">
                <img
                    src={car.image_url || "/placeholder-car.jpg"}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                    1-{car.capacity_passengers} Passagers
                </div>
                {car.price_class === 'premium' && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-neutral-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Premium
                    </div>
                )}
            </div>
            <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{car.name}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                    {car.description}
                </p>
                <ul className="grid grid-cols-2 gap-3 mb-8">
                    <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <Users size={16} className="text-blue-500" /> {car.capacity_passengers} pers.
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <Briefcase size={16} className="text-blue-500" /> {car.capacity_luggage} valises
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <Wifi size={16} className="text-blue-500" /> Wi-Fi inclus
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <ShieldCheck size={16} className="text-blue-500" /> Sécurité
                    </li>
                </ul>
                <a href={`tel:${city.replace(/ /g, "")}`} className={`block w-full py-4 rounded-xl font-bold text-center transition border shadow-lg hover:brightness-110 active:scale-95 text-white ${classes.bg} ${classes.border} mt-auto`}>
                    Réserver ce véhicule
                </a>
            </div>
        </div>
    );
}
