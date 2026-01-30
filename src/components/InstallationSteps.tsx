"use client";

import { ClipboardCheck, FileText, Wrench, ShieldCheck } from "lucide-react";

export default function InstallationSteps() {
    const steps = [
        {
            icon: <ClipboardCheck className="w-8 h-8 text-blue-600" />,
            title: "1. Visite Technique",
            description: "Un électricien IRVE analyse votre tableau électrique et la configuration de votre logement pour valider la faisabilité."
        },
        {
            icon: <FileText className="w-8 h-8 text-blue-600" />,
            title: "2. Devis Sur-Mesure",
            description: "Vous recevez un devis détaillé incluant le matériel adapté et la pose, sans frais cachés."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
            title: "3. Administratif",
            description: "Nous gérons les démarches pour les aides (Advenir, TVA réduite) et les déclarations de conformité."
        },
        {
            icon: <Wrench className="w-8 h-8 text-blue-600" />,
            title: "4. Installation",
            description: "Pose, raccordement et mise en service en moins d'une demi-journée. Formation à l'utilisation incluse."
        }
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Processus</span>
                    <h2 className="text-3xl font-black text-slate-900 mt-2">
                        Une installation clé en main en 4 étapes
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            {/* Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-full hover:shadow-md transition-shadow">
                                <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector Line (Desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-14 left-[calc(100%-1rem)] w-8 border-t-2 border-dashed border-slate-300 z-10" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
