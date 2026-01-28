"use client";

import { useState } from "react";
import {
    Home,
    Building2,
    Briefcase,
    User,
    Key,
    Car,
    Truck,
    HelpCircle,
    Ruler,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    Loader2,
    AlertTriangle,
    Zap,
    Shield,
    Phone,
    Mail,
    User2,
    Sun
} from "lucide-react";

declare global {
    interface Window {
        dataLayer: any[];
    }
}

interface LeadFormProps {
    city: string;
    domain: string;
    targetType?: 'COPRO' | 'MAISON' | 'ENTREPRISE' | 'MIXED';
    themeColor?: 'blue' | 'emerald' | 'amber' | 'purple';
    initialProjectType?: 'maison' | 'copro' | 'entreprise';
}

interface FormData {
    projectType: 'maison' | 'copro' | 'entreprise' | null;
    ownerStatus: 'proprietaire' | 'locataire' | null;
    vehicleStatus: 'livre' | 'commande' | 'reflexion' | null;
    meterDistance: 'moins10m' | 'plus10m' | 'nesaispas' | null;
    solarInterest: boolean;
    name: string;
    email: string;
    phone: string;
}

// French phone validation regex
const FRENCH_PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

export default function LeadForm({
    city,
    domain,
    targetType = 'MIXED',
    themeColor = 'blue',
    initialProjectType
}: LeadFormProps) {
    const INITIAL_FORM_DATA: FormData = {
        projectType: initialProjectType || null,
        ownerStatus: null,
        vehicleStatus: null,
        meterDistance: null,
        solarInterest: false,
        name: "",
        email: "",
        phone: ""
    };

    // If project type is pre-selected, start at step 2
    const [step, setStep] = useState(initialProjectType ? 2 : 1);
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    // Theme Config
    const themeStyles = {
        blue: {
            header: "from-blue-600 to-blue-700",
            button: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/30",
            light: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-600",
            ring: "focus:border-blue-500 focus:ring-blue-500/20"
        },
        emerald: {
            header: "from-emerald-600 to-emerald-700",
            button: "from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-500/30",
            light: "bg-emerald-50",
            border: "border-emerald-200",
            text: "text-emerald-600",
            ring: "focus:border-emerald-500 focus:ring-emerald-500/20"
        },
        amber: {
            header: "from-amber-600 to-amber-700",
            button: "from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-amber-500/30",
            light: "bg-amber-50",
            border: "border-amber-200",
            text: "text-amber-600",
            ring: "focus:border-amber-500 focus:ring-amber-500/20"
        },
        purple: {
            header: "from-purple-600 to-purple-700",
            button: "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-purple-500/30",
            light: "bg-purple-50",
            border: "border-purple-200",
            text: "text-purple-600",
            ring: "focus:border-purple-500 focus:ring-purple-500/20"
        }
    };

    const palette = themeStyles[themeColor] || themeStyles.blue;

    const totalSteps = 5;
    const progress = (step / totalSteps) * 100;

    // Lead scoring based on answers
    const getLeadScore = (): number => {
        let score = 0;
        if (formData.projectType === 'entreprise') score += 30;
        if (formData.projectType === 'copro') score += 25;
        if (formData.projectType === 'maison') score += 15;
        if (formData.ownerStatus === 'proprietaire') score += 20;
        if (formData.vehicleStatus === 'livre') score += 25;
        if (formData.vehicleStatus === 'commande') score += 20;
        if (formData.meterDistance === 'moins10m') score += 10;
        if (formData.solarInterest) score += 40; // HIGH VALUE LEAD
        return score;
    };

    const handleOptionSelect = (field: keyof FormData, value: string) => {
        // Track form_start when selecting project type on step 1
        if (step === 1 && field === 'projectType') {
            if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                    event: 'form_start',
                    lead_category: value
                });
            }
        }
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const canProceed = (): boolean => {
        switch (step) {
            case 1: return formData.projectType !== null;
            case 2: return formData.ownerStatus !== null;
            case 3: return formData.vehicleStatus !== null;
            case 4: return formData.meterDistance !== null;
            case 5:
                return (
                    formData.name.trim() !== "" &&
                    formData.email.includes("@") &&
                    FRENCH_PHONE_REGEX.test(formData.phone.replace(/\s/g, ''))
                );
            default: return false;
        }
    };

    const nextStep = () => {
        if (canProceed() && step < totalSteps) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async () => {
        if (!canProceed()) return;

        setStatus('loading');

        try {
            const payload = {
                ...formData,
                city,
                domain,
                leadScore: getLeadScore(),
                timestamp: new Date().toISOString()
            };

            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error('Erreur lors de l\'envoi');
            }

            // GTM: Track Conversion
            if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                    event: 'generate_lead',
                    lead_category: formData.projectType,
                    lead_city: city,
                    value: 50.00,
                    currency: 'EUR'
                });
            }

            setStatus('success');
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Une erreur est survenue');
        }
    };

    // Success State
    if (status === 'success') {
        return (
            <div className={`bg-gradient-to-br ${palette.light} border ${palette.border} rounded-3xl p-8 text-center`}>
                <div className={`mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6`}>
                    <CheckCircle className={palette.text} size={40} />
                </div>
                <h3 className={`text-2xl font-bold ${palette.text} mb-3`}>
                    Demande envoyée avec succès !
                </h3>
                <p className="text-neutral-700 mb-6">
                    Nos installateurs partenaires certifiés IRVE vous contacteront sous 24h pour votre projet à <strong>{city}</strong>.
                </p>
                <div className={`flex items-center justify-center gap-2 text-sm ${palette.text}`}>
                    <Shield size={16} />
                    <span>Vos données sont protégées et ne seront jamais revendues</span>
                </div>
            </div>
        );
    }

    // Option button component
    const OptionButton = ({
        selected,
        onClick,
        icon: Icon,
        label,
        sublabel,
        highlight = false
    }: {
        selected: boolean;
        onClick: () => void;
        icon: any;
        label: string;
        sublabel?: string;
        highlight?: boolean;
    }) => (
        <button
            onClick={onClick}
            className={`
                relative w-full p-5 rounded-2xl border-2 transition-all duration-200
                flex items-center gap-4 text-left
                ${selected
                    ? `${palette.border} ${palette.light} shadow-lg`
                    : 'border-neutral-200 bg-white hover:bg-neutral-50'
                }
                ${highlight && !selected ? 'ring-2 ring-green-400 ring-offset-2' : ''}
            `}
        >
            <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                ${selected ? `bg-white ${palette.text}` : 'bg-neutral-100 text-neutral-600'}
            `}>
                <Icon size={24} />
            </div>
            <div>
                <div className={`font-bold ${selected ? 'text-neutral-900' : 'text-neutral-800'}`}>
                    {label}
                </div>
                {sublabel && (
                    <div className="text-sm text-neutral-500 mt-0.5">{sublabel}</div>
                )}
            </div>
            {selected && (
                <div className="absolute top-3 right-3">
                    <CheckCircle className={palette.text} size={20} />
                </div>
            )}
            {highlight && !selected && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Recommandé
                </div>
            )}
        </button>
    );

    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r ${palette.header} p-6 text-white`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Simulateur d'Éligibilité</h3>
                        <p className="text-white/80 text-sm">Aides & Devis Gratuit</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-white/80">
                        <span>Étape {step}/{totalSteps}</span>
                        <span>{Math.round(progress)}% complété</span>
                    </div>
                </div>
            </div>

            {/* Form Body */}
            <div className="p-6">
                {/* Step 1: Project Type */}
                {step === 1 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">
                            Quel est votre type de projet ?
                        </h4>
                        <div className="space-y-3">
                            <OptionButton
                                selected={formData.projectType === 'maison'}
                                onClick={() => handleOptionSelect('projectType', 'maison')}
                                icon={Home}
                                label="Maison Individuelle"
                                sublabel="Pavillon, villa, maison de ville"
                                highlight={targetType === 'MAISON'}
                            />
                            <OptionButton
                                selected={formData.projectType === 'copro'}
                                onClick={() => handleOptionSelect('projectType', 'copro')}
                                icon={Building2}
                                label="Copropriété"
                                sublabel="Appartement, immeuble, résidence"
                                highlight={targetType === 'COPRO'}
                            />
                            <OptionButton
                                selected={formData.projectType === 'entreprise'}
                                onClick={() => handleOptionSelect('projectType', 'entreprise')}
                                icon={Briefcase}
                                label="Entreprise / Flotte"
                                sublabel="Parking entreprise, flotte véhicules"
                                highlight={targetType === 'ENTREPRISE'}
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Owner Status */}
                {step === 2 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">
                            Êtes-vous propriétaire du logement ?
                        </h4>
                        <div className="space-y-3">
                            <OptionButton
                                selected={formData.ownerStatus === 'proprietaire'}
                                onClick={() => handleOptionSelect('ownerStatus', 'proprietaire')}
                                icon={Key}
                                label="Propriétaire"
                                sublabel="Je suis propriétaire du bien"
                            />
                            <OptionButton
                                selected={formData.ownerStatus === 'locataire'}
                                onClick={() => handleOptionSelect('ownerStatus', 'locataire')}
                                icon={User}
                                label="Locataire"
                                sublabel="Je loue le logement"
                            />
                        </div>

                        {formData.ownerStatus === 'locataire' && (
                            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                                <div>
                                    <p className="text-sm font-medium text-amber-800">
                                        Accord du propriétaire requis
                                    </p>
                                    <p className="text-xs text-amber-600 mt-1">
                                        Vous devrez obtenir l'accord écrit de votre propriétaire.
                                        Nous pouvons vous fournir un modèle de lettre.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Vehicle Status */}
                {step === 3 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">
                            Où en êtes-vous avec votre véhicule électrique ?
                        </h4>
                        <div className="space-y-3">
                            <OptionButton
                                selected={formData.vehicleStatus === 'livre'}
                                onClick={() => handleOptionSelect('vehicleStatus', 'livre')}
                                icon={Car}
                                label="Déjà livré"
                                sublabel="Je possède déjà un véhicule électrique"
                            />
                            <OptionButton
                                selected={formData.vehicleStatus === 'commande'}
                                onClick={() => handleOptionSelect('vehicleStatus', 'commande')}
                                icon={Truck}
                                label="Commandé"
                                sublabel="En attente de livraison"
                            />
                            <OptionButton
                                selected={formData.vehicleStatus === 'reflexion'}
                                onClick={() => handleOptionSelect('vehicleStatus', 'reflexion')}
                                icon={HelpCircle}
                                label="En réflexion"
                                sublabel="Je prépare mon passage à l'électrique"
                            />
                        </div>
                    </div>
                )}

                {/* Step 4: Meter Distance */}
                {step === 4 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-2">
                            Distance entre le compteur et le stationnement ?
                        </h4>
                        <p className="text-sm text-neutral-500 mb-6">
                            Cela influence le devis d'installation
                        </p>
                        <div className="space-y-3">
                            <OptionButton
                                selected={formData.meterDistance === 'moins10m'}
                                onClick={() => handleOptionSelect('meterDistance', 'moins10m')}
                                icon={Ruler}
                                label="Moins de 10 mètres"
                                sublabel="Installation standard"
                            />
                            <OptionButton
                                selected={formData.meterDistance === 'plus10m'}
                                onClick={() => handleOptionSelect('meterDistance', 'plus10m')}
                                icon={Ruler}
                                label="Plus de 10 mètres"
                                sublabel="Travaux supplémentaires possibles"
                            />
                            <OptionButton
                                selected={formData.meterDistance === 'nesaispas'}
                                onClick={() => handleOptionSelect('meterDistance', 'nesaispas')}
                                icon={HelpCircle}
                                label="Je ne sais pas"
                                sublabel="Un technicien évaluera sur place"
                            />
                        </div>
                        {/* CROSS SELL SOLAR */}
                        <div className="mt-8 pt-6 border-t border-neutral-100">
                            <div
                                onClick={() => setFormData(prev => ({ ...prev, solarInterest: !prev.solarInterest }))}
                                className={`
                                    cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4
                                    ${formData.solarInterest
                                        ? 'border-yellow-400 bg-yellow-50 shadow-md'
                                        : 'border-neutral-200 hover:border-yellow-200 hover:bg-yellow-50/50'
                                    }
                                `}
                            >
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                    ${formData.solarInterest ? 'bg-yellow-400 text-white' : 'bg-yellow-100 text-yellow-600'}
                                `}>
                                    <Sun size={20} />
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-bold text-neutral-900 text-sm">
                                        Rouler gratuitement au solaire ?
                                    </h5>
                                    <p className="text-xs text-neutral-600">
                                        Je souhaite aussi une étude pour des panneaux solaires (Option rentable).
                                    </p>
                                </div>
                                <div className={`
                                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition
                                    ${formData.solarInterest
                                        ? 'border-yellow-500 bg-yellow-500'
                                        : 'border-neutral-300'
                                    }
                                `}>
                                    {formData.solarInterest && <CheckCircle size={14} className="text-white" />}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Contact Info */}
                {step === 5 && (
                    <div className="space-y-5">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">
                            Vos coordonnées pour recevoir vos devis comparatifs
                        </h4>

                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                                    <User2 size={16} />
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Jean Dupont"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition outline-none"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                                    <Mail size={16} />
                                    Adresse email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="jean.dupont@email.com"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition outline-none"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                                    <Phone size={16} />
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="06 12 34 56 78"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition outline-none"
                                />
                                {formData.phone && !FRENCH_PHONE_REGEX.test(formData.phone.replace(/\s/g, '')) && (
                                    <p className="text-xs text-red-500 mt-1">
                                        Format invalide. Ex: 06 12 34 56 78
                                    </p>
                                )}
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3 mt-8 items-start">
                    {step > 1 && (
                        <button
                            onClick={prevStep}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-50 transition"
                        >
                            <ArrowLeft size={18} />
                            Retour
                        </button>
                    )}

                    {step < totalSteps ? (
                        <button
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className={`
                                    flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg transition
                                    ${canProceed()
                                    ? `bg-gradient-to-r ${palette.button} text-white shadow-lg`
                                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                                }
                                `}
                        >
                            Continuer
                            <ArrowRight size={20} />
                        </button>
                    ) : (
                        <div className="w-full">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={status === 'loading'}
                                className={`
                                        w-full py-4 px-6 rounded-xl text-lg font-bold text-white shadow-xl transition-all
                                        ${status === 'loading'
                                        ? 'bg-slate-400 cursor-not-allowed'
                                        : `bg-gradient-to-r ${palette.button} transform hover:-translate-y-1`
                                    }
                                    `}
                            >
                                {status === 'loading' ? ( // Assuming isSubmitting maps to status === 'loading'
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Envoi en cours...
                                    </span>
                                ) : (
                                    "Recevoir mes 3 devis gratuits"
                                )}
                            </button>

                            <p className="text-xs text-slate-400 text-center mt-4 px-4 leading-relaxed">
                                En cliquant sur ce bouton, vous acceptez nos <a href="/cgu" className="underline hover:text-blue-600">CGU</a> et acceptez d'être recontacté par nos installateurs partenaires certifiés IRVE pour votre projet.
                                Vos données sont sécurisées.
                            </p>
                        </div>
                    )}
                </div>

                {/* Trust footer */}
                <div className="flex flex-wrap justify-center sm:justify-between gap-3 mt-6 pt-6 border-t border-neutral-100 text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wide">
                    <span className="flex items-center gap-1.5"><Shield size={12} className="text-green-500" /> Données sécurisées</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Sans engagement</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5"><Zap size={12} className="text-amber-500" fill="currentColor" /> Certifié IRVE</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Réponse 24h</span>
                </div>
            </div>
        </div >
    );
}
