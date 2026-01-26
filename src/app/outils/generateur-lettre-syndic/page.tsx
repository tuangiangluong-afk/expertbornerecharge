"use client";

import { useState, useRef } from 'react';
import { Download, FileText, Printer, CheckCircle, Mail, Building2, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';
import Header from '@/components/Header';

export default function SyndicGeneratorPage() {
    const [formData, setFormData] = useState({
        ownerName: '',
        coproAddress: '',
        syndicName: '',
        city: '',
        email: ''
    });

    const [isGenerating, setIsGenerating] = useState(false);

    const handlePrint = () => {
        if (!formData.email || !formData.ownerName) {
            alert("Veuillez remplir au moins votre nom et votre email.");
            return;
        }
        setIsGenerating(true);
        // Simulate API call for lead capture could go here
        setTimeout(() => {
            window.print();
            setIsGenerating(false);
        }, 500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Date du jour formatée
    const today = new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-slate-50">
            {/* NO-PRINT UI */}
            <div className="print:hidden">
                {/* Navbar simplified */}
                <Header isHub={true} variant="default" />

                <main className="container mx-auto px-4 py-12 pt-32">
                    <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">

                        {/* LEFT: FORM */}
                        <div>
                            <div className="mb-8">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                                    Outil Gratuit
                                </span>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                                    Générateur de demande de travaux (Droit à la Prise)
                                </h1>
                                <p className="text-slate-600 text-lg">
                                    Générez en 2 minutes votre lettre recommandée officielle pour notifier votre syndic. Conforme au Décret n° 2011-873.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Vos Coordonnées</label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-3 top-3 text-slate-400" />
                                            <input
                                                type="text"
                                                name="ownerName"
                                                placeholder="M. et Mme Dupont"
                                                className="w-full pl-10 pr-4 py-3 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={formData.ownerName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Adresse de la Copropriété</label>
                                        <div className="relative">
                                            <Building2 size={18} className="absolute left-3 top-3 text-slate-400" />
                                            <input
                                                type="text"
                                                name="coproAddress"
                                                placeholder="12 rue de la Paix, Résidence Les Lilas"
                                                className="w-full pl-10 pr-4 py-3 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={formData.coproAddress}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Ville</label>
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="Paris"
                                                className="w-full px-4 py-3 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={formData.city}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Nom du Syndic</label>
                                            <input
                                                type="text"
                                                name="syndicName"
                                                placeholder="Syndic Immo"
                                                className="w-full px-4 py-3 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={formData.syndicName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Votre Email (pour recevoir la copie)</label>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="jean.dupont@email.com"
                                                className="w-full pl-10 pr-4 py-3 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/50"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">
                                            Nous ne spamons jamais. Vous recevrez uniquement des conseils pour votre installation.
                                        </p>
                                    </div>

                                    <button
                                        onClick={handlePrint}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 mt-6"
                                    >
                                        <Printer size={20} />
                                        Générer le PDF Officiel
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: PREVIEW */}
                        <div className="hidden lg:block relative">
                            <div className="sticky top-8">
                                <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm border border-slate-200 min-h-[600px] text-[10px] md:text-xs text-slate-800 leading-relaxed font-serif relative overflow-hidden">
                                    {/* Abstract representation of the letter */}
                                    <div className="absolute top-0 right-0 p-4 bg-slate-100 rounded-bl-xl text-slate-400 font-sans font-bold text-xs uppercase tracking-widest">
                                        Aperçu
                                    </div>

                                    <div className="mb-8">
                                        <p className="font-bold">{formData.ownerName || "[Vos Nom et Prénom]"}</p>
                                        <p>{formData.coproAddress || "[Adresse Copropriété]"}</p>
                                        <p>{formData.city || "[Ville]"}</p>
                                    </div>

                                    <div className="text-right mb-8">
                                        <p className="font-bold">{formData.syndicName || "[Nom du Syndic]"}</p>
                                        <p>A {formData.city || "..."} le {today}</p>
                                    </div>

                                    <div className="font-bold mb-4 underline">
                                        Objet : Notification de travaux d'installation d'une borne de recharge (Droit à la prise)
                                    </div>

                                    <div className="space-y-4 text-justify opacity-70 blur-[0.3px]">
                                        <p>Madame, Monsieur,</p>
                                        <p>Par la présente, je vous informe de mon intention de procéder à l'installation d'une borne de recharge pour véhicule électrique sur ma place de stationnement.</p>
                                        <p>Conformément au décret n° 2011-873 du 25 juillet 2011, je sollicite l'inscription de ce point à l'ordre du jour de la prochaine Assemblée Générale pour information.</p>
                                        <p>Les travaux seront réalisés par un installateur certifié IRVE et comprendront la pose d'un sous-compteur individuel pour... [Suite dans le document officiel]</p>
                                    </div>

                                    <div className="absolute bottom-12 right-12 opacity-10 rotate-[-15deg]">
                                        <FileText size={150} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* PRINT ONLY UI (The Actual Letter) */}
            <div className="hidden print:block print:p-12 bg-white text-black font-serif text-base leading-normal max-w-[21cm] mx-auto">
                <div className="flex justify-between items-start mb-16">
                    <div>
                        <p className="font-bold">{formData.ownerName}</p>
                        <p className="whitespace-pre-line">{formData.coproAddress}</p>
                        <p>{formData.city}</p>
                        <p>Email : {formData.email}</p>
                    </div>
                    <div className="text-right mt-12">
                        <p className="font-bold">{formData.syndicName}</p>
                        <p>Syndic de Copropriété</p>
                    </div>
                </div>

                <div className="text-right mb-12">
                    <p>Fait à {formData.city}, le {today}</p>
                </div>

                <div className="mb-12 font-bold">
                    <p>Objet : Notification d'installation d'une borne de recharge pour véhicule électrique (Droit à la Prise)</p>
                    <p>Lettre Recommandée avec Accusé de Réception</p>
                </div>

                <div className="space-y-6 text-justify">
                    <p>Madame, Monsieur,</p>

                    <p>
                        Propriétaire / Locataire résidant à l'adresse susmentionnée, je vous informe par la présente de mon intention de faire installer une borne de recharge pour véhicule électrique sur mon emplacement de stationnement, conformément aux dispositions du décret n° 2011-873 du 25 juillet 2011 relatif aux installations dédiées à la recharge des véhicules électriques ou hybrides rechargeables dans les bâtiments.
                    </p>

                    <p>
                        Ces travaux seront réalisés à mes frais exclusifs et n'impacteront pas les parties communes au-delà du raccordement nécessaire au tableau général basse tension (TGBT) ou via la création d'un nouveau point de livraison, selon l'étude technique.
                    </p>

                    <p>
                        Je vous communique ci-joint le descriptif détaillé des travaux ainsi que le schéma d'installation fourni par l'entreprise qualifiée IRVE (Infrastructures de Recharge de Véhicules Électriques) que j'ai sélectionnée.
                    </p>

                    <p>
                        Je vous demande de bien vouloir inscrire ce point à l'ordre du jour de la prochaine Assemblée Générale des copropriétaires, simplement pour information, l'accord de l'assemblée n'étant pas requis pour l'exercice du droit à la prise (sauf motif sérieux et légitime d'opposition).
                    </p>

                    <p>
                        Je reste à votre disposition pour tout complément d'information technique.
                    </p>

                    <p>
                        Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
                    </p>
                </div>

                <div className="mt-24 text-right pr-12">
                    <p>Signature</p>
                    <p className="mt-8 text-slate-400 italic">[ {formData.ownerName} ]</p>
                </div>

                <div className="mt-24 pt-8 border-t border-black text-xs text-center text-slate-500">
                    Document généré gratuitement par ExpertBorneRecharge.com - Comparateur d'installateurs certifiés IRVE.
                </div>
            </div>
        </div>
    );
}
