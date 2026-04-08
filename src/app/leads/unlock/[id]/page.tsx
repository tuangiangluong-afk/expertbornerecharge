"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Lock, Mail, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, MapPin, Building, Home, Briefcase } from "lucide-react";
import { verifyPartnerEmail } from "@/app/actions/leads";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function LeadUnlockPage() {
    const { id } = useParams();
    const [lead, setLead] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [partner, setPartner] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Initial Fetch (Public info only)
    useEffect(() => {
        async function fetchLead() {
            try {
                const response = await fetch(`/api/leads/public?id=${id}`);
                const data = await response.json();
                if (data.error) throw new Error(data.error);
                setLead(data.lead);
            } catch (err) {
                setError("Ce lead n'est plus disponible ou le lien est invalide.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchLead();
    }, [id]);

    const handleVerifyEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        setError(null);
        try {
            const partnerData = await verifyPartnerEmail(email);
            if (partnerData) {
                setPartner(partnerData);
            } else {
                setError("Désolé, seul un partenaire enregistré peut débloquer ce lead. Si vous êtes partenaire, utilisez l'email associé à votre compte.");
            }
        } catch (err) {
            setError("Une erreur est survenue lors de la vérification.");
        } finally {
            setIsVerifying(false);
        }
    };

    const handlePayment = async () => {
        if (!partner || !lead) return;
        
        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    leadId: lead.id,
                    partnerId: partner.id,
                    partnerEmail: partner.email
                })
            });
            const { url } = await response.json();
            if (url) window.location.href = url;
        } catch (err) {
            setError("Erreur lors de la création de la session de paiement.");
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 italic">Chargement du lead...</div>;

    if (error && !lead) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-200">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Oups !</h1>
                <p className="text-slate-500 mb-6">{error}</p>
                <a href="/" className="inline-block px-6 py-3 bg-slate-900 text-white rounded-xl font-bold">Retour à l'accueil</a>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
                        <Lock size={14} />
                        Lead Sécurisé
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display">Nouvelle opportunité : {lead.city}</h1>
                    <p className="text-slate-500">Consultez les détails et débloquez les coordonnées du client.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8">
                    {/* Blurred Section */}
                    <div className="p-8 border-b border-slate-100 relative">
                        <div className="flex flex-col gap-4 filter blur-sm select-none pointer-events-none opacity-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-full" />
                                <div className="h-6 w-32 bg-slate-200 rounded" />
                            </div>
                            <div className="h-4 w-48 bg-slate-100 rounded" />
                            <div className="h-4 w-40 bg-slate-100 rounded" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-white shadow-lg flex items-center gap-3">
                                <ShieldCheck className="text-blue-600" size={24} />
                                <span className="text-slate-900 font-bold">Coordonnées masquées</span>
                            </div>
                        </div>
                    </div>

                    {/* Context Section (Visible) */}
                    <div className="p-8 space-y-8">
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Détails du projet</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Localisation</p>
                                        <p className="text-sm font-bold text-slate-900">{lead.city} ({lead.postal_code || '---'})</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                                        {lead.housing_type === 'copro' ? <Building size={20} /> : <Home size={20} />}
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Type de logement</p>
                                        <p className="text-sm font-bold text-slate-900 capitalize">{lead.housing_type || 'Installation'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {lead.notes && (
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                <h3 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-3">Contexte Expert (Admin)</h3>
                                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-medium italic">
                                    "{lead.notes}"
                                </p>
                            </div>
                        )}

                        <div className="pt-8 border-t border-slate-100 text-center">
                            {!partner ? (
                                <form onSubmit={handleVerifyEmail} className="max-w-md mx-auto">
                                    <h3 className="font-bold text-slate-900 mb-4">Identifiez-vous pour débloquer</h3>
                                    <div className="flex flex-col gap-3">
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Votre email partenaire..."
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                                            />
                                        </div>
                                        {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
                                        <button
                                            type="submit"
                                            disabled={isVerifying}
                                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                                        >
                                            {isVerifying ? "Vérification..." : <>Continuer <ArrowRight size={18} /></>}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="mb-6 flex items-center justify-center gap-3">
                                        <div className="bg-emerald-100 text-emerald-600 p-1 rounded-full">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <p className="text-slate-700 font-medium">Partenaire validé : <span className="font-bold">{partner.name}</span></p>
                                    </div>
                                    <button
                                        onClick={handlePayment}
                                        className="btn-primary w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 transition-all"
                                    >
                                        DÉBLOQUER CE LEAD POUR {lead.price || 20}€ HT
                                        <ArrowRight size={20} />
                                    </button>
                                    <p className="text-xs text-slate-400 mt-4 italic">
                                        Paiement sécurisé via Stripe. Facture disponible immédiatement.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <p className="text-center text-slate-400 text-xs px-8">
                    En débloquant ce lead, vous vous engagez à contacter le client sous 24h ouvrées. 
                    Vous êtes l'unique partenaire recevant ce lead pour ce projet.
                </p>
            </div>
        </div>
    );
}

