"use client";

import { Euro, ArrowRight, CheckCircle, HelpCircle } from "lucide-react";

export default function PricingTable() {
    const scrollToForm = () => {
        const form = document.getElementById("simulateur");
        if (form) {
            form.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">
                        Combien coûte l&apos;installation d&apos;une borne en 2026 ?
                    </h2>
                    <p className="text-lg text-slate-600">
                        Prix moyens constatés pour une installation certifiée IRVE en maison individuelle.
                    </p>
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    {/* Header Table */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">

                        {/* Equipment */}
                        <div className="p-8 text-center flex flex-col gap-2">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Matériel</span>
                            <div className="text-3xl font-black text-slate-900">
                                600€ <span className="text-lg font-normal text-slate-400">-</span> 1000€
                            </div>
                            <p className="text-sm text-slate-500">Borne 7kW intelligente</p>
                        </div>

                        {/* Installation */}
                        <div className="p-8 text-center flex flex-col gap-2">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Main d&apos;œuvre</span>
                            <div className="text-3xl font-black text-slate-900">
                                400€ <span className="text-lg font-normal text-slate-400">-</span> 800€
                            </div>
                            <p className="text-sm text-slate-500">Pose & Raccordement</p>
                        </div>

                        {/* Total */}
                        <div className="p-8 text-center flex flex-col gap-2 bg-blue-50/50">
                            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Reste à charge*</span>
                            <div className="text-4xl font-black text-blue-600">
                                <span className="text-lg align-top relative top-2">dès</span> 990€
                            </div>
                            <p className="text-xs text-blue-400">*Aides déduites (Crédit impôt 500€)</p>
                        </div>
                    </div>

                    {/* Footer / CTA */}
                    <div className="bg-slate-100 p-6 flex flex-col items-center gap-4 text-center border-t border-slate-200">
                        <p className="text-sm text-slate-500 flex items-center gap-2 mb-4">
                            <HelpCircle className="w-4 h-4" />
                            Le prix final dépend de la distance tableau-borne et des travaux de génie civil.
                        </p>
                        <div className="flex flex-col items-center gap-2 w-full">
                            <button
                                onClick={scrollToForm}
                                className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/20"
                            >
                                Obtenir mon devis précis
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-xs text-slate-400 mt-2">
                                Remplissez le formulaire ci-dessus pour recevoir votre chiffrage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
