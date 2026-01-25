"use client";

import { getCity } from "@/lib/db";
import { notFound } from "next/navigation";
import { getTheme } from "@/lib/theme";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);
    if (!city) return {};

    return {
        title: `Mentions Légales - ${city.name}`,
        description: `Informations légales et éditeur du site ${city.domain}.`,
        alternates: {
            canonical: `https://${city.domain}/mentions-legales`,
        },
    };
}

export default async function MentionsLegales({ params }: { params: Promise<{ domain: string }> }) {
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
                    Mentions Légales
                </h1>

                <div className="prose prose-neutral prose-lg max-w-none">
                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className={`mb-4 text-2xl font-bold ${theme.text}`}>1. Éditeur du Site</h2>
                        <p>
                            Le présent site internet accessible à l'adresse <strong>https://{city.domain}</strong> (le "Site") est édité par la société <strong>MEDIASHMAN</strong>.
                        </p>
                        <ul className="list-none space-y-2 pl-0">
                            <li><strong>Forme juridique :</strong> Société (SASU/SARL selon Kbis)</li>
                            <li><strong>Siège social :</strong> 91 RUE DU FAUBOURG SAINT-HONORE, 75008 PARIS</li>
                            <li><strong>SIREN :</strong> 509 987 681 R.C.S. PARIS</li>
                            <li><strong>Responsable de publication :</strong> Direction MEDIASHMAN</li>
                            <li><strong>Contact :</strong> <a href="/contact" className="underline">Formulaire de contact</a></li>
                        </ul>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className={`mb-4 text-2xl font-bold ${theme.text}`}>2. Service Proposé</h2>
                        <p>
                            Le Site a pour objet de fournir une plateforme de mise en relation et de réservation de services de transport en taxi et VTC sur la commune de <strong>{city.city}</strong> et ses environs ({city.neighborhoods.join(", ") || "agglomération"}).
                        </p>
                        <p>
                            Les services de transport sont assurés par des chauffeurs indépendants ou salariés, titulaires des autorisations administratives nécessaires (Carte Professionnelle, Licence Taxi ou Licence VTC).
                        </p>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className={`mb-4 text-2xl font-bold ${theme.text}`}>3. Hébergement</h2>
                        <p>
                            Le Site est hébergé par la société <strong>Vercel Inc.</strong>
                        </p>
                        <ul className="list-none space-y-2 pl-0">
                            <li><strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA</li>
                            <li><strong>Site web :</strong> https://vercel.com</li>
                        </ul>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className={`mb-4 text-2xl font-bold ${theme.text}`}>4. Propriété Intellectuelle</h2>
                        <p>
                            L'ensemble des contenus de ce site (textes, images, base de données, graphismes, logos) est la propriété exclusive de MEDIASHMAN ou de tiers ayant autorisé leur utilisation. Toute reproduction, représentation, modification, publication, adaptation totale ou partielle de ces éléments est interdite sans l'autorisation écrite préalable.
                        </p>
                    </div>

                    <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <h2 className={`mb-4 text-2xl font-bold ${theme.text}`}>5. Données Personnelles (RGPD)</h2>
                        <p>
                            Les informations collectées via le module de réservation (nom, téléphone, adresse) sont nécessaires au traitement de votre demande de transport. Elles sont transmises exclusivement aux chauffeurs partenaires concernés par la course.
                        </p>
                        <p>
                            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous à : <strong>{city.email}</strong>.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
