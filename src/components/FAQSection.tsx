"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
    // SEO-focused questions based on PAA (People Also Ask)
    const faqs = [
        {
            question: "Qui a le droit d'installer une borne de recharge ?",
            answer: "Légalement, toute installation de borne de recharge d'une puissance supérieure à 3,7 kW doit être réalisée par un électricien qualifié IRVE (Infrastructure de Recharge de Véhicule Électrique). Cela garantit la sécurité de votre installation et est obligatoire pour bénéficier des aides de l'État et de la couverture assurance."
        },
        {
            question: "Quel est le prix moyen d'une installation de borne de recharge ?",
            answer: "Le prix moyen d'une installation complète (borne + pose) se situe entre 990€ et 1500€ TTC, aides déduites. Ce coût varie selon la marque de la borne, la distance entre le tableau électrique et l'emplacement de charge, et les éventuels travaux de mise aux normes."
        },
        {
            question: "Quelle puissance pour charger une voiture électrique à la maison ?",
            answer: "Pour une recharge à domicile, une puissance de 7,4 kW (monophasé) est le standard idéal. Elle permet de récupérer environ 40 à 50 km d'autonomie par heure de charge, suffisant pour recharger une batterie complète en une nuit, contrairement à une prise domestique classique."
        },
        {
            question: "Faut-il modifier mon abonnement électrique ?",
            answer: "Dans la plupart des cas, non. Nos bornes sont équipées d'une fonction de 'délestage dynamique' qui ajuste la puissance de charge en temps réel pour ne jamais faire disjoncter votre installation, même si vous cuisinez ou chauffez votre maison en même temps."
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">
                        Questions fréquentes
                    </h2>
                    <p className="text-slate-600">
                        Tout savoir sur l&apos;installation de votre future borne.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                            <FAQItem question={faq.question} answer={faq.answer} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
            >
                <span className="font-bold text-slate-900 pr-8">{question}</span>
                {isOpen ? (
                    <Minus className="w-5 h-5 text-blue-600 shrink-0" />
                ) : (
                    <Plus className="w-5 h-5 text-slate-400 shrink-0" />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="p-6 pt-0 text-slate-600 border-t border-slate-100 mt-2">
                    {answer}
                </div>
            </div>
        </div>
    );
}
