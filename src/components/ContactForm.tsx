"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
    domain: string;
    city: string;
}

export default function ContactForm({ domain, city }: ContactFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, domain, city }),
            });

            if (!res.ok) throw new Error("Erreur lors de l'envoi");

            setStatus("success");
            e.currentTarget.reset();
        } catch (error) {
            setStatus("error");
            setErrorMessage("Une erreur est survenue. Veuillez nous appeler directement.");
        }
    }

    if (status === "success") {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Message envoyé !</h3>
                <p className="text-green-700">
                    Merci de nous avoir contactés. Nous vous répondrons sous 24h.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-semibold text-green-800 hover:underline"
                >
                    Envoyer un autre message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-neutral-700">Nom complet</label>
                    <input
                        required
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Jean Dupont"
                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:ring-neutral-900 transition outline-none bg-white font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-700">Email</label>
                    <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="jean@exemple.com"
                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:ring-neutral-900 transition outline-none bg-white font-medium"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-neutral-700">Sujet</label>
                <select
                    name="subject"
                    id="subject"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:ring-neutral-900 transition outline-none bg-white font-medium"
                >
                    <option value="reservation">Réservation / Devis</option>
                    <option value="partnership">Partenariat Chauffeur</option>
                    <option value="business">Compte Entreprise</option>
                    <option value="other">Autre demande</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-neutral-700">Message</label>
                <textarea
                    required
                    name="message"
                    id="message"
                    rows={5}
                    placeholder="Bonjour, je souhaite réserver..."
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:ring-neutral-900 transition outline-none bg-white font-medium resize-none"
                />
            </div>

            {status === "error" && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-700 text-sm">
                    <AlertCircle size={16} />
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 py-4 text-white font-bold text-lg hover:bg-neutral-800 transition active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === "loading" ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Envoi en cours...
                    </>
                ) : (
                    <>
                        <Send size={20} />
                        Envoyer le message
                    </>
                )}
            </button>

            <p className="text-xs text-center text-neutral-500">
                En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
            </p>
        </form>
    );
}
