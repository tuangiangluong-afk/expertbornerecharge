import { Car, Users, Gauge, Wifi, ShieldCheck, BatteryCharging, Briefcase } from "lucide-react";
import { getSpintaxContent } from "@/lib/spintax";
import { Database } from "@/types/database.types";

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

interface VehiclesProps {
    city: string;
    vehicles?: Vehicle[] | null;
}

export function Vehicles({ city, vehicles }: VehiclesProps) {
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
                            <div key={car.id} className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col">
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
                                    <a href={`tel:${city.replace(/ /g, "")}`} className="block w-full py-4 rounded-xl bg-slate-50 text-slate-900 font-bold text-center hover:bg-slate-100 transition border border-slate-200 mt-auto">
                                        Réserver ce véhicule
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            {/* Fallback Static Sedan */}
                            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300">
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80"
                                        alt="Taxi Berline"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                                        1-4 Passagers
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{sedanTitle}</h3>
                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {sedanDesc}
                                    </p>
                                    <ul className="grid grid-cols-2 gap-3 mb-8">
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Gauge size={16} className="text-blue-500" /> Rapide & Efficace
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Wifi size={16} className="text-blue-500" /> Wi-Fi à bord
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <ShieldCheck size={16} className="text-blue-500" /> Sécurité Max
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <BatteryCharging size={16} className="text-blue-500" /> Chargeurs USB
                                        </li>
                                    </ul>
                                    <a href={`tel:0600000000`} className="block w-full py-4 rounded-xl bg-slate-50 text-slate-900 font-bold text-center hover:bg-slate-100 transition border border-slate-200">
                                        Réserver une Berline
                                    </a>
                                </div>
                            </div>

                            {/* Fallback Static Van */}
                            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300">
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1559416568-154dfae1887c?auto=format&fit=crop&q=80"
                                        alt="Taxi Van"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                                        5-7 Passagers
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{vanTitle}</h3>
                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {vanDesc}
                                    </p>
                                    <ul className="grid grid-cols-2 gap-3 mb-8">
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Users size={16} className="text-blue-500" /> Espace Groupe
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Wifi size={16} className="text-blue-500" /> Wi-Fi à bord
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <ShieldCheck size={16} className="text-blue-500" /> Sièges Bébé
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <Gauge size={16} className="text-blue-500" /> Grand Coffre
                                        </li>
                                    </ul>
                                    <a href={`tel:0600000000`} className="block w-full py-4 rounded-xl bg-slate-50 text-slate-900 font-bold text-center hover:bg-slate-100 transition border border-slate-200">
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
