"use client";

import { Check } from "lucide-react";

export default function PricingTable() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">
                    Quel prix pour une installation en 2026 ?
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full max-w-4xl mx-auto text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700">
                                <th className="p-4 border-b">Type d'installation</th>
                                <th className="p-4 border-b">Matériel (Borne)</th>
                                <th className="p-4 border-b">Installation (Main d'œuvre)</th>
                                <th className="p-4 border-b">Aides Déduites*</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600">
                            <tr className="border-b hover:bg-slate-50">
                                <td className="p-4 font-bold text-blue-900">Maison (Murale)</td>
                                <td className="p-4">500€ - 900€</td>
                                <td className="p-4">400€ - 600€</td>
                                <td className="p-4 font-bold text-green-600">Dès 990€ TTC</td>
                            </tr>
                            <tr className="border-b hover:bg-slate-50">
                                <td className="p-4 font-bold text-blue-900">Maison (Sur Pied)</td>
                                <td className="p-4">700€ - 1200€</td>
                                <td className="p-4">600€ - 900€</td>
                                <td className="p-4 font-bold text-green-600">Dès 1 400€ TTC</td>
                            </tr>
                            <tr className="border-b hover:bg-slate-50">
                                <td className="p-4 font-bold text-blue-900">Copropriété</td>
                                <td className="p-4">800€ - 1500€</td>
                                <td className="p-4">Sur devis</td>
                                <td className="p-4 font-bold text-green-600">Souvent 0€ (Préfinancé)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-sm text-slate-500 mt-4 italic">
                    *Estimations moyennes 2026 incluant Crédit d'Impôt et TVA 5.5%. Le prix final dépend de votre tableau électrique.
                </p>
            </div>
        </section>
    );
}
