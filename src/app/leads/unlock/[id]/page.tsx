"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Lock, Mail, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, MapPin, Building, Home, Zap, Phone, ExternalLink } from "lucide-react";
import { verifyPartnerEmail } from "@/app/actions/leads";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function LeadUnlockPage() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const isSuccess = searchParams.get("success") === "true";
    const partnerIdParam = searchParams.get("partnerId");

    const [lead, setLead] = useState<any>(null);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [email, setEmail] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [partner, setPartner] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Initial Fetch
    useEffect(() => {
        async function fetchLead() {
            try {
                // If we have a partnerId in URL (return from Stripe), use it to fetch full details
                const pId = partnerIdParam || partner?.id;
                const url = pId ? `/api/leads/public?id=${id}&partnerId=${pId}` : `/api/leads/public?id=${id}`;
                
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.error) throw new Error(data.error);
                
                setLead(data.lead);
                setIsUnlocked(data.isUnlocked || false);
                
                // If it was a success return, we might want to auto-set the partner if we had the ID
                if (data.isUnlocked && !partner && pId) {
                    setPartner({ id: pId }); // Minimal partner object
                }
            } catch (err) {
                setError("Ce lead n'est plus disponible ou le lien est invalide.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchLead();
    }, [id, partnerIdParam, partner?.id]);

    const handleVerifyEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        setError(null);
        try {
            const partnerData = await verifyPartnerEmail(email);
            if (partnerData) {
                setPartner(partnerData);
            } else {
                setError("Désolé, seul un partenaire enregistré peut débloquer ce lead.");
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

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <Logo isHub size="md" />
                <p className="text-slate-400 font-medium">Chargement de l'opportunité...</p>
            </div>
        </div>
    );

    if (error && !lead) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-slate-900 mb-2 font-display">Oups !</h1>
                <p className="text-slate-500 mb-8">{error}</p>
                <Link href="/" className="inline-block px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg">Retour à l'accueil</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900">
            {/* Professional Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 py-4">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <Logo isHub size="md" />
                    <div className="hidden md:flex items-center gap-4 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Espace Partenaires Certifiés</span>
                    </div>
                </div>
            </header>

            <main className="py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        {isUnlocked ? (
                            <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-lg shadow-emerald-500/20">
                                <CheckCircle2 size={14} />
                                Lead Débloqué
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-lg shadow-blue-500/20">
                                <Lock size={14} />
                                Lead Exclusif
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                            Installation ({lead.postal_code})
                        </h1>
                        <p className="text-lg text-slate-500 font-medium">
                            {isUnlocked ? "Félicitations ! Vous avez maintenant accès aux coordonnées du client." : "Une nouvelle demande qualifiée vient d'arriver dans votre secteur."}
                        </p>
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-12">
                        {/* Status Bar */}
                        <div className={`px-8 py-4 flex items-center justify-between ${isUnlocked ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'}`}>
                            <div className="flex items-center gap-2 text-sm font-bold">
                                {isUnlocked ? <CheckCircle2 size={18} /> : <Zap className="text-yellow-400" size={18} fill="currentColor" />}
                                <span>{isUnlocked ? "Paiement confirmé" : "Opportunité en temps réel"}</span>
                            </div>
                            <div className="text-xs opacity-70 font-medium">Réf: {lead.id.split('-')[0].toUpperCase()}</div>
                        </div>

                        {/* Content Area */}
                        {isUnlocked ? (
                            <div className="p-10 space-y-10 animate-in fade-in zoom-in-95 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                            <Mail size={14} />
                                            Email Client
                                        </h3>
                                        <p className="text-xl font-black text-slate-900 mb-2 truncate">{lead.email}</p>
                                        <a href={`mailto:${lead.email}`} className="text-sm text-blue-600 font-bold hover:underline flex items-center gap-1">
                                            Lui écrire <ExternalLink size={14} />
                                        </a>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                            <Phone size={14} />
                                            Téléphone
                                        </h3>
                                        <p className="text-xl font-black text-slate-900 mb-2">{lead.phone}</p>
                                        <a href={`tel:${lead.phone}`} className="text-sm text-blue-600 font-bold hover:underline flex items-center gap-1">
                                            Appeler maintenant <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl">
                                    <h3 className="text-emerald-800 font-black mb-2">Conseil Expert</h3>
                                    <p className="text-emerald-700 leading-relaxed font-medium">
                                        Ce prospect attend votre appel. Nous vous conseillons de le contacter dans les 2 heures pour maximiser vos chances de signer ce projet. Un email récapitulatif vous a également été envoyé.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Blurred Preview */}
                                <div className="p-10 border-b border-slate-100 relative overflow-hidden bg-slate-50">
                                    <div className="flex flex-col gap-6 filter blur-md select-none pointer-events-none opacity-40">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-300 rounded-2xl" />
                                            <div className="space-y-2">
                                                <div className="h-6 w-48 bg-slate-300 rounded" />
                                                <div className="h-4 w-32 bg-slate-300 rounded" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-4 w-full bg-slate-200 rounded" />
                                            <div className="h-4 w-5/6 bg-slate-200 rounded" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white/80 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/50 shadow-2xl flex flex-col items-center gap-2 text-center">
                                            <ShieldCheck className="text-blue-600" size={32} />
                                            <div className="space-y-1">
                                                <span className="text-slate-900 font-black block text-lg">Coordonnées masquées</span>
                                                <span className="text-slate-500 text-sm font-medium italic">Débloquez ce lead pour contacter le client</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Context */}
                                <div className="p-10 space-y-10">
                                    <div>
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Informations de base</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                                                    <MapPin size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-slate-500 font-bold mb-1">Zone géographique</p>
                                                    <p className="text-xl font-black text-slate-900 leading-tight">{lead.city} ({lead.postal_code || 'N/A'})</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                                                    {lead.housing_type === 'copro' ? <Building size={24} /> : <Home size={24} />}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-slate-500 font-bold mb-1">Type d'installation</p>
                                                    <p className="text-xl font-black text-slate-900 leading-tight capitalize">{lead.housing_type === 'copro' ? 'Copropriété' : 'Maison individuelle'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {lead.notes && (
                                        <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                                <Zap size={120} fill="currentColor" />
                                            </div>
                                            <div className="relative z-10">
                                                <h3 className="text-xs font-black text-blue-100 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                    <ShieldCheck size={16} />
                                                    Note de l'Expert Admin
                                                </h3>
                                                <p className="text-xl font-medium leading-relaxed italic">
                                                    "{lead.notes}"
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-10 border-t border-slate-100 text-center">
                                        {!partner ? (
                                            <form onSubmit={handleVerifyEmail} className="max-w-md mx-auto">
                                                <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Accès réservé aux installateurs</h3>
                                                <div className="flex flex-col gap-4">
                                                    <div className="relative">
                                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                                        <input
                                                            type="email"
                                                            required
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="Votre email partenaire..."
                                                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none font-medium"
                                                        />
                                                    </div>
                                                    {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}
                                                    <button
                                                        type="submit"
                                                        disabled={isVerifying}
                                                        className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3"
                                                    >
                                                        {isVerifying ? "Vérification..." : <>Continuer l'achat <ArrowRight size={22} /></>}
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                                                <div className="mb-8 flex flex-col items-center gap-4">
                                                    <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full shadow-inner">
                                                        <CheckCircle2 size={32} />
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500 font-bold mb-1 uppercase tracking-widest text-[10px]">Identité confirmée</p>
                                                        <p className="text-2xl font-black text-slate-900">{partner.name}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={handlePayment}
                                                    className="w-full max-w-md mx-auto group relative flex items-center justify-center gap-4 bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-3xl font-black text-2xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all transform hover:-translate-y-2 active:scale-95"
                                                >
                                                    DÉBLOQUER : {lead.price || 20}€ HT
                                                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                                </button>
                                                <p className="text-xs text-slate-400 mt-6 font-medium max-w-xs mx-auto">
                                                    Paiement 100% sécurisé via Stripe. <br />La facture sera envoyée à <span className="text-slate-600">{partner.email}</span>.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <footer className="text-center space-y-6">
                        <p className="text-slate-400 text-xs font-medium px-12 leading-relaxed">
                            Expert Borne Recharge garantit l'exclusivité de ce lead. En achetant ces coordonnées, vous bénéficiez de l'accès unique à ce projet client.
                        </p>
                        <div className="flex flex-col items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                            <div className="flex items-center gap-6">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 opacity-80" />
                                <div className="w-px h-4 bg-slate-300" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <ShieldCheck size={12} className="text-emerald-500" />
                                Paiement 100% Sécurisé
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}

