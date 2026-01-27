import { getAllVehicles, getVehicleById } from "@/data/vehicles";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Zap, Clock, Battery, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import SimulatorWidget from "@/components/blog/SimulatorWidget";
import Logo from "@/components/Logo";
import Header from "@/components/Header";

export async function generateStaticParams() {
    const vehicles = getAllVehicles();
    return vehicles.map((v) => ({
        brand: v.brand.toLowerCase(),
        slug: v.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const vehicle = getVehicleById(resolvedParams.slug);
    if (!vehicle) return {};

    return {
        title: `Installation Borne de Recharge ${vehicle.brand} ${vehicle.model} - Devis & Prix`,
        description: `Installateur agréé pour ${vehicle.brand} ${vehicle.model}. Temps de charge : ${calculateChargeTime(vehicle.battery, 7)}h. Obtenez votre devis en 24h. Certified IRVE.`,
    };
}

function calculateChargeTime(batteryKw: number, powerKw: number): string {
    const time = batteryKw / powerKw;
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours}h${minutes > 0 ? minutes : ''}`;
}

import SchemaJSON from "@/components/SchemaJSON";

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const vehicle = getVehicleById(resolvedParams.slug);

    if (!vehicle) return notFound();

    // Logic: Recommended power
    const recommendedPower = vehicle.maxAC >= 11 ? 11 : 7;
    const isTriphaseRecommended = vehicle.maxAC >= 11;

    // Logic: Charge times
    const timeSocket = calculateChargeTime(vehicle.battery, 2.3); // Prise domestique
    const timeWallbox7 = calculateChargeTime(vehicle.battery, 7); // Wallbox 7kW
    const timeWallbox11 = calculateChargeTime(vehicle.battery, 11); // Wallbox 11kW

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <SchemaJSON type="Product" vehicle={vehicle} />
            {/* Navbar simplified */}
            <Header isHub={true} variant="default" />

            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-12">

                    {/* LEFT CONTENT */}
                    <div>
                        <Link href="/vehicules" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6 group">
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Tous les véhicules
                        </Link>

                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
                            <div className="relative h-64 md:h-96 w-full">
                                <Image
                                    src={vehicle.image}
                                    alt={`Recharge ${vehicle.brand} ${vehicle.model}`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                    <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                                        Installation Borne <br />
                                        <span className="text-blue-400">{vehicle.brand} {vehicle.model}</span>
                                    </h1>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="prose prose-lg prose-slate max-w-none">
                                    <p className="lead">
                                        Vous avez choisi la <strong>{vehicle.brand} {vehicle.model}</strong> ? Excellent choix.
                                        Pour profiter pleinement de ses <strong>{vehicle.battery}kWh de batterie</strong> au quotidien,
                                        l'installation d'une Wallbox à domicile est indispensable.
                                    </p>

                                    <h3>Quelle puissance de borne pour votre {vehicle.model} ?</h3>
                                    <p>
                                        La {vehicle.model} est équipée d'un chargeur embarqué acceptant jusqu'à <strong>{vehicle.maxAC}kW</strong> en courant alternatif (AC).
                                    </p>

                                    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                            <div className="flex items-center gap-3 mb-2 font-bold text-blue-900">
                                                <Zap className="text-blue-600" /> Chargeur Embarqué
                                            </div>
                                            <div className="text-3xl font-bold text-blue-700">{vehicle.maxAC} kW</div>
                                            <div className="text-sm text-blue-600">Puissance max AC acceptée</div>
                                        </div>
                                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                                            <div className="flex items-center gap-3 mb-2 font-bold text-green-900">
                                                <CheckCircle className="text-green-600" /> Borne Recommandée
                                            </div>
                                            <div className="text-3xl font-bold text-green-700">{recommendedPower} kW</div>
                                            <div className="text-sm text-green-600">
                                                {isTriphaseRecommended ? "Installation Triphasée idéale" : "Installation Monophasée suffisante"}
                                            </div>
                                        </div>
                                    </div>

                                    <h3>Temps de recharge (0 à 100%)</h3>
                                    <div className="space-y-4 not-prose bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 opacity-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <img src="https://api.iconify.design/mdi:power-socket-eu.svg" width="24" height="24" className="w-6 h-6 opacity-50" alt="Prise" />
                                                </div>
                                                <span className="font-medium text-slate-600">Prise domestique (2.3kW)</span>
                                            </div>
                                            <span className="font-bold text-slate-500">{timeSocket}</span>
                                        </div>

                                        <div className={`flex items-center justify-between p-3 bg-white rounded-lg border-2 ${!isTriphaseRecommended ? 'border-blue-500 shadow-md' : 'border-slate-100'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                    <Zap size={20} />
                                                </div>
                                                <span className="font-medium text-slate-900">Wallbox 7.4kW (Monophasé)</span>
                                                {!isTriphaseRecommended && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">IDEAL</span>}
                                            </div>
                                            <span className="font-bold text-blue-700">{timeWallbox7}</span>
                                        </div>

                                        {vehicle.maxAC >= 11 && (
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-green-500 shadow-md">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                        <Zap size={20} />
                                                    </div>
                                                    <span className="font-medium text-slate-900">Wallbox 11kW (Triphasé)</span>
                                                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">RAPIDE</span>
                                                </div>
                                                <span className="font-bold text-green-700">{timeWallbox11}</span>
                                            </div>
                                        )}
                                    </div>

                                    <h3>Pourquoi choisir un installateur IRVE ?</h3>
                                    <p>
                                        Pour recharger votre <strong>{vehicle.brand}</strong> en toute sécurité, la loi impose le recours à un technicien qualifié IRVE pour toute installation supérieure à 3.7kW.
                                        Cela vous garantit :
                                    </p>
                                    <ul>
                                        <li>Le respect de la garantie constructeur {vehicle.brand}.</li>
                                        <li>L'éligibilité au crédit d'impôt (500€).</li>
                                        <li>La couverture de votre assurance habitation.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="lg:sticky lg:top-24 h-fit space-y-8">
                        <SimulatorWidget />

                        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                            <h3 className="font-bold text-lg mb-2">Propriétaire de {vehicle.brand} ?</h3>
                            <p className="text-slate-300 text-sm mb-6">
                                Nos installateurs sont formés aux spécificités des bornes {vehicle.connector} pour {vehicle.brand}.
                            </p>
                            <a href="/#devis" className="block w-full text-center bg-white text-slate-900 hover:bg-slate-100 font-bold py-3 rounded-xl transition-colors">
                                Devis Spécial {vehicle.brand}
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
