"use client";

import { getCity } from "@/lib/db";
import { notFound } from "next/navigation";
import { getTheme } from "@/lib/theme";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CGV({ params }: { params: Promise<{ domain: string }> }) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);

    if (!city) {
        return notFound();
    }

    const theme = getTheme(city.slug);
    const classes = theme.classes;

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
            {/* Header */}
            <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 px-4 py-3 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className={`flex items-center gap-2 text-sm font-bold ${theme.text} hover:opacity-80 transition`}
                    >
                        <ArrowLeft size={16} />
                        Retour au site
                    </Link>
                    <span className="text-sm font-bold text-neutral-900">
                        {city.name}<span className={`text-${theme.primary}-400`}>.</span>
                    </span>
                </div>
            </nav>

            <main className="container mx-auto max-w-3xl px-4 py-12 lg:py-20">
                <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
                    Conditions Générales de Vente (CGV)
                </h1>

                <div className="prose prose-neutral prose-lg max-w-none">
                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <p className="text-sm text-neutral-500">Dernière mise à jour : 25/01/2026</p>
                        <p>
                            Les présentes Conditions Générales de Vente (ci-après "CGV") régissent les relations contractuelles entre la société <strong>MEDIASHMAN</strong>, sise au 91 RUE DU FAUBOURG SAINT-HONORE, 75008 PARIS (SIREN 509 987 681), ci-après "L'Éditeur", et toute personne utilisant le site <strong>Vous pouvez nous contacter via notre <a href="/contact" className="underline">formulaire de contact</a>.</strong> pour la réservation de services de transport, ci-après "Le Client".
                        </p>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className={`mb-4 text-2xl font-bold ${theme.text}`}>1. Objet et Acceptation</h2>
                        <p>
                            Le service proposé est la mise en relation avec des chauffeurs de taxi et VTC professionnels exerçant sur la commune de <strong>{city.city}</strong>. L'utilisation du formulaire de réservation ou l'appel téléphonique via le site implique l'acceptation sans réserve des présentes CGV.
                        </p>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className={`mb-4 text-2xl font-bold ${theme.text}`}>2. Réservations et Tarifs</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Réservation Immédiate :</strong> Elle est confirmée uniquement après validation téléphonique ou par SMS par un chauffeur partenaire.</li>
                            <li><strong>Réservation à l'avance :</strong> Elle est recommandée 24h à l'avance pour garantir la disponibilité.</li>
                            <li><strong>Tarification :</strong> Les tarifs communiqués sont estimatifs ({city.pricing.base} environ pour une course locale). Le prix final est déterminé par le compteur horokilométrique (Taxi) ou le bon de commande préalable (VTC), conformément à la réglementation en vigueur.</li>
                        </ul>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className={`mb-4 text-2xl font-bold ${theme.text}`}>3. Annulation et Retards</h2>
                        <p>
                            Toute annulation doit être notifiée par téléphone au moins 1 heure avant l'heure de prise en charge prévue. En cas d'annulation tardive ou de non-présentation du client ("No Show"), des frais d'approche pourront être facturés.
                        </p>
                        <p>
                            L'Éditeur ne saurait être tenu responsable des retards dus aux conditions de circulation, grèves, ou cas de force majeure.
                        </p>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className={`mb-4 text-2xl font-bold ${theme.text}`}>4. Responsabilités</h2>
                        <p>
                            MEDIASHMAN agit en qualité d'apporteur d'affaires et de plateforme technologique. La responsabilité du transport (sécurité, conformité du véhicule) incombe exclusivement au chauffeur exécutant la course, qui doit être assuré pour le transport de personnes à titre onéreux.
                        </p>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className={`mb-4 text-2xl font-bold ${theme.text}`}>5. Loi Applicable</h2>
                        <p>
                            Les présentes CGV sont soumises au droit français. Tout litige relatif à leur interprétation et/ou à leur exécution relève des tribunaux compétents de Paris.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
