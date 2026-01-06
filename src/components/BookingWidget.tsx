"use client";

import { useState } from "react";
import { MapPin, Phone, Loader2, CheckCircle, Calculator } from "lucide-react";
import { CityConfig } from "@/lib/db";

interface BookingWidgetProps {
    city: CityConfig;
}

export function BookingWidget({ city }: BookingWidgetProps) {
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
    // Triggers when pickup/dropoff changes
    const checkPrice = (start: string, end: string) => {
        const s = start.toLowerCase();
        const e = end.toLowerCase();

        // Logic: if Airport or Station involved -> Show fixed price badge
        if (s.includes("aéroport") || e.includes("aéroport") || s.includes("airport") || e.includes("airport") || s.includes("marignane") || e.includes("hyères") || e.includes("orly") || e.includes("roissy")) {
            setPriceEstimate("~55€ - 75€ (Forfait Aéroport)");
        } else if (s.includes("gare") || e.includes("gare") || s.includes("tgv") || e.includes("train")) {
            setPriceEstimate("~25€ - 35€ (Forfait Gare)");
        } else {
            setPriceEstimate(null);
        }
    };

    const handleLocationChange = (type: 'pickup' | 'dropoff', value: string) => {
        if (type === 'pickup') {
            setPickup(value);
            checkPrice(value, dropoff);
        } else {
            setDropoff(value);
            checkPrice(pickup, value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            clientName: "Client Web", // We could add a name field if needed
            phone,
            pickupLocation: pickup,
            dropoffLocation: dropoff,
            pickupTime: `${date}T${time}:00`,
            price: priceEstimate
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
        <div id="book" className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-neutral-100 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-3xl"></div>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-neutral-900">Réservation Prioritaire</h3>
                    <p className="text-neutral-500 text-sm">Confirmation SMS en &lt; 10 min.</p>
                </div>
                {/* Price Estimator Badge */}
                {priceEstimate && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 animate-pulse">
                        <Calculator size={12} />
                        {priceEstimate}
                    </div>
                )}
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Date</label>
                        <input
                            required
                            type="date"
                            className="w-full rounded-xl bg-neutral-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition py-3 px-4 font-medium"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Heure</label>
                        <input
                            required
                            type="time"
                            className="w-full rounded-xl bg-neutral-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition py-3 px-4 font-medium"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Départ</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-3.5 text-neutral-400" size={18} />
                        <input
                            required
                            type="text"
                            placeholder="Adresse, Gare, Aéroport..."
                            className="w-full rounded-xl bg-neutral-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition py-3 pl-12 pr-4 font-medium"
                            value={pickup}
                            onChange={(e) => handleLocationChange('pickup', e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Arrivée</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-3.5 text-neutral-400" size={18} />
                        <input
                            required
                            type="text"
                            placeholder="Destination..."
                            className="w-full rounded-xl bg-neutral-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition py-3 pl-12 pr-4 font-medium"
                            value={dropoff}
                            onChange={(e) => handleLocationChange('dropoff', e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Téléphone</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-3.5 text-neutral-400" size={18} />
                        <input
                            required
                            type="tel"
                            placeholder="06 00 00 00 00"
                            className="w-full rounded-xl bg-neutral-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 transition py-3 pl-12 pr-4 font-medium"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 py-4 font-bold text-white hover:bg-neutral-800 transition shadow-lg transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : "Valider ma course"}
                </button>
            </form>
        </div>
    );
}
