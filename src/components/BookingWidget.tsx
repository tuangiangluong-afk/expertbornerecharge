"use client";

import { useState } from "react";
import { Phone, Loader2, CheckCircle, Calendar, Clock } from "lucide-react";
import { CityConfig } from "@/lib/db";
import { useLoadScript } from "@react-google-maps/api";
import { AddressAutocomplete } from "./AddressAutocomplete";

const LIBRARIES: ("places")[] = ["places"];

interface BookingWidgetProps {
    city: CityConfig;
}

export function BookingWidget({ city }: BookingWidgetProps) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
        libraries: LIBRARIES,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [priceEstimate, setPriceEstimate] = useState<string | null>(null);

    // Form Stats
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [phone, setPhone] = useState("");

    // Simple Price Estimator Logic (Psychology)
    const checkPrice = (start: string, end: string) => {
        const s = start.toLowerCase();
        const e = end.toLowerCase();

        // Logic: if Airport or Station involved -> Show fixed price badge
        if (s.includes("aéroport") || e.includes("aéroport") || s.includes("airport") || e.includes("airport") || s.includes("marignane") || e.includes("hyères") || e.includes("orly") || e.includes("roissy")) {
            setPriceEstimate("~55€ - 85€ (Forfait Aéroport)");
        } else if (s.includes("gare") || e.includes("gare") || s.includes("tgv") || e.includes("train")) {
            setPriceEstimate("~25€ - 45€ (Forfait Gare)");
        } else {
            setPriceEstimate(null);
        }
    };

    const handleLocationSelect = (type: 'pickup' | 'dropoff', address: string) => {
        if (type === 'pickup') {
            setPickup(address);
            checkPrice(address, dropoff);
        } else {
            setDropoff(address);
            checkPrice(pickup, address);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            clientName: "Client Web",
            phone,
            pickupLocation: pickup,
            dropoffLocation: dropoff,
            pickupTime: `${date}T${time}:00`,
            price: priceEstimate,
            tenantId: city.slug, // Add tenant ID for DB
            domain: city.domain // Add domain for context
        };

        try {
            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                alert("Une erreur est survenue. Veuillez nous appeler directement.");
            }
        } catch (err) {
            console.error(err);
            alert("Erreur de connexion. Veuillez nous appeler.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div id="book" className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 relative overflow-hidden h-full flex flex-col items-center justify-center text-center">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500 rounded-t-3xl"></div>
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
                    <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-neutral-900">Demande Reçue !</h3>
                <p className="text-neutral-500 mb-6">
                    Votre chauffeur a reçu la course. Vous allez recevoir une confirmation par SMS/WhatsApp dans quelques instants.
                </p>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-sm text-neutral-400 hover:text-neutral-900 underline"
                >
                    Nouvelle demande
                </button>
            </div>
        );
    }

    return (
        <div id="book" className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-neutral-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-3xl"></div>

            <div className="mb-6">
                <h3 className="text-2xl font-bold text-neutral-900">Réserver un chauffeur</h3>
                <p className="text-neutral-500 text-sm">Réponse immédiate • Prix fixe</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Locations */}
                {isLoaded ? (
                    <>
                        <AddressAutocomplete
                            label="Départ"
                            placeholder="Adresse, Gare, Aéroport..."
                            value={pickup}
                            onChange={(val) => setPickup(val)}
                            onSelect={(addr) => handleLocationSelect('pickup', addr)}
                        />
                        <AddressAutocomplete
                            label="Arrivée"
                            placeholder="Destination..."
                            value={dropoff}
                            onChange={(val) => setDropoff(val)}
                            onSelect={(addr) => handleLocationSelect('dropoff', addr)}
                        />
                    </>
                ) : (
                    <div className="text-center py-4 text-neutral-400 text-sm">Chargement de Google Maps...</div>
                )}

                {/* Date/Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-10 text-neutral-900 focus:border-yellow-400 focus:ring-yellow-400"
                            />
                            <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Heure</label>
                        <div className="relative">
                            <input
                                type="time"
                                required
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-10 text-neutral-900 focus:border-yellow-400 focus:ring-yellow-400"
                            />
                            <Clock className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
                        </div>
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Téléphone</label>
                    <div className="relative">
                        <input
                            type="tel"
                            required
                            placeholder="06 12 34 56 78"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-10 text-neutral-900 focus:border-yellow-400 focus:ring-yellow-400"
                        />
                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
                    </div>
                </div>

                {/* Estimate */}
                {priceEstimate && (
                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 flex items-start gap-3">
                        <div className="p-1.5 bg-yellow-100 rounded-full text-yellow-700 mt-0.5">
                            <CheckCircle size={16} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-yellow-800">Estimation : {priceEstimate}</p>
                            <p className="text-xs text-yellow-600">Le prix exact vous sera confirmé par SMS.</p>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-neutral-900 text-white font-bold py-4 rounded-xl hover:bg-neutral-800 transition transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Envoi en cours...
                        </>
                    ) : (
                        "Commander mon Chauffeur"
                    )}
                </button>

                <p className="text-xs text-center text-neutral-400 mt-4">
                    Paiement à bord (CB/Espèces). Annulation gratuite.
                </p>
            </form>
        </div>
    );
}
