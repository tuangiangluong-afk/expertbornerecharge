import { getCityByCleanSlug, CITIES } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, CheckCircle, Users, Euro, FileText, Award, Shield, ArrowRight } from "lucide-react";
import LeadFormPro from "@/components/LeadFormPro";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { slugify } from "@/lib/slugify";
import { InternalMesh } from "@/components/InternalMesh";
import SchemaJSON from "@/components/SchemaJSON";
import { VillesVoisines } from "@/components/VillesVoisines";
import { LocalFAQ } from "@/components/LocalFAQ";

// ========================================
// PSEO B2B — Copropriété x Ville
// /ville/lyon/copropriete
// ========================================

export async function generateStaticParams() {
    const uniqueCities = new Map<string, boolean>();
    return Object.values(CITIES)
        .filter(city => {
            const slug = slugify(city.city);
            if (uniqueCities.has(slug)) return false;
            uniqueCities.set(slug, true);
            return city.slug !== 'home';
        })
        .map(city => ({ slug: slugify(city.city) }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) return {};

    const title = `Installation Borne Recharge Copropriété ${site.city} | Étude Gratuite Syndic`;
    const description = `Infrastructure collective de recharge en copropriété à ${site.city}. Solution Tiers-Investisseur : 0€ pour le syndic. Aides ADVENIR déduites. Étude de faisabilité gratuite.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            siteName: "Expert Borne Recharge",
            locale: "fr_FR",
            type: "website",
        },
        robots: { index: true, follow: true },
    };
}

export default async function CoproCityPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) return notFound();

    const cityName = site.city;
    const dept = site.department || "";
    const neighborhoods = site.neighborhoods || [];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            <SchemaJSON type="LocalBusiness" site={site} />
            <SchemaJSON type="B2BService" site={site} b2bType="Copropriété" />
            <SchemaJSON type="FAQPage" site={site} faqSegment="COPRO" />
            <SchemaJSON
                type="Breadcrumb"
                breadcrumbItems={[
                    { name: "Accueil", item: "https://expertbornerecharge.com" },
                    { name: site.city, item: `https://expertbornerecharge.com/ville/${resolvedParams.slug}` },
                    { name: "Copropriété", item: `https://expertbornerecharge.com/ville/${resolvedParams.slug}/copropriete` }
                ]}
            />

            {/* ============================== */}
            {/* HERO — B2B Copropriété Tone */}
            {/* ============================== */}
            <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-28 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Left: Content + Form */}
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <div className="text-center lg:text-left space-y-6">
                                {/* Breadcrumb */}
                                <nav className="flex items-center gap-2 text-sm text-slate-500 justify-center lg:justify-start">
                                    <Link href="/" className="hover:text-blue-600 transition">Accueil</Link>
                                    <span>/</span>
                                    <Link href={`/ville/${resolvedParams.slug}`} className="hover:text-blue-600 transition">{cityName}</Link>
                                    <span>/</span>
                                    <span className="text-purple-700 font-bold">Copropriété</span>
                                </nav>

                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1.5 text-sm font-bold text-purple-800 border border-purple-200">
                                        <Building2 size={16} className="mr-2" />
                                        Spécial Syndic & Copropriété
                                    </div>
                                    <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-bold text-green-800 border border-green-200">
                                        <Euro size={16} className="mr-2" />
                                        0€ pour la Copropriété
                                    </div>
                                </div>

                                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                    Bornes de recharge en <span className="text-purple-600">copropriété</span> à {cityName}
                                </h1>

                                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Équipez le parking de votre copropriété à {cityName} {dept ? `(${dept})` : ''} sans frais pour l&apos;immeuble.
                                    Infrastructure collective certifiée ADVENIR, entièrement prise en charge par un Tiers-Investisseur.
                                </p>
                            </div>

                            {/* LEAD FORM PRO — B2B Copro */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left" id="etude">
                                <LeadFormPro
                                    city={cityName}
                                    domain="expertbornerecharge.com"
                                    segment="COPRO"
                                />
                            </div>
                        </div>

                        {/* Right: Trust + Stats */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full space-y-6">
                            <div className="relative h-[320px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10 border border-slate-100 bg-white p-2">
                                <div className="relative w-full h-full rounded-xl overflow-hidden bg-purple-100">
                                    <Image
                                        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=3540&auto=format&fit=crop"
                                        alt={`Copropriété borne recharge ${cityName}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl flex items-center gap-3">
                                            <div className="bg-purple-100 p-2.5 rounded-full shrink-0">
                                                <CheckCircle className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">Programme ADVENIR</div>
                                                <div className="text-sm text-slate-500">Financement jusqu&apos;à 50% des travaux</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Stats B2B */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-3xl font-black text-purple-700">0€</div>
                                    <div className="text-xs text-slate-500 mt-1">Coût pour le syndic</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-3xl font-black text-green-700">50%</div>
                                    <div className="text-xs text-slate-500 mt-1">Subvention ADVENIR</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-3xl font-black text-blue-700">24h</div>
                                    <div className="text-xs text-slate-500 mt-1">Réponse garantie</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-3xl font-black text-amber-600">+20%</div>
                                    <div className="text-xs text-slate-500 mt-1">Valeur immobilière</div>
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div className="flex flex-wrap items-center gap-3 justify-center">
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
                                    <Award size={20} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-slate-900 text-sm">Qualifelec IRVE</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
                                    <Shield size={20} className="text-green-500" />
                                    <span className="font-bold text-slate-900 text-sm">Garantie Décennale</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================== */}
            {/* CONTENT — SEO B2B Copro */}
            {/* ============================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <article className="prose prose-lg prose-slate max-w-none">
                        <h2>Pourquoi installer des bornes en copropriété à {cityName} ?</h2>
                        <p>
                            À {cityName}, la demande de recharge en immeuble explose. Les copropriétaires sont de plus en plus nombreux
                            à posséder un véhicule électrique, mais les parking souterrains ne sont pas équipés.
                            Le <strong>Droit à la Prise</strong> (décret n°2011-873) permet à chaque résident de demander
                            l&apos;installation d&apos;une borne, mais la solution la plus pérenne reste l&apos;<strong>infrastructure collective</strong>.
                        </p>

                        <div className="not-prose grid md:grid-cols-2 gap-6 my-10">
                            <div className="border-2 border-purple-200 bg-purple-50/30 rounded-2xl p-6 shadow-sm">
                                <h3 className="font-bold text-xl mb-3 flex items-center gap-2 text-purple-800">
                                    <Building2 className="text-purple-600" /> Infrastructure Collective
                                </h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    Une colonne principale alimente le parking. Les bornes individuelles s&apos;y raccordent au fur et à mesure des besoins.
                                </p>
                                <ul className="text-sm space-y-2">
                                    <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Solution pérenne et évolutive</li>
                                    <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> 0€ pour le syndic (Tiers-Investisseur)</li>
                                    <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Facturation individuelle automatique</li>
                                    <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Subventionné ADVENIR à 50%</li>
                                </ul>
                            </div>
                            <div className="border border-slate-200 rounded-2xl p-6">
                                <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                                    <Users className="text-blue-500" /> Droit à la Prise individuel
                                </h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    Chaque résident fait sa propre demande. Un compteur dédié est ajouté pour sa place.
                                </p>
                                <ul className="text-sm space-y-2">
                                    <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Rapide pour 1 demande isolée</li>
                                    <li className="text-red-500 flex gap-2"><span className="shrink-0">⚠️</span> Vite saturé en puissance</li>
                                    <li className="text-red-500 flex gap-2"><span className="shrink-0">⚠️</span> Câblage anarchique à terme</li>
                                </ul>
                            </div>
                        </div>

                        <h2>Le modèle Tiers-Investisseur à {cityName}</h2>
                        <p>
                            La solution plébiscitée par les syndics de {cityName} : un opérateur finance
                            <strong> 100% de l&apos;infrastructure collective</strong>. La copropriété ne paie rien.
                            Seuls les utilisateurs finaux paient leur borne individuelle et un abonnement au service.
                        </p>
                        <blockquote>
                            &ldquo;Zéro frais pour la copropriété, zéro souci de maintenance, et une valorisation immédiate de l&apos;immeuble.&rdquo;
                        </blockquote>

                        <h2>Les aides ADVENIR disponibles à {cityName} {dept ? `(${dept})` : ''}</h2>
                        <div className="not-prose">
                            <table className="min-w-full bg-white border border-slate-200 rounded-lg shadow-sm">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Type de travaux</th>
                                        <th className="px-4 py-3 text-left">Montant de l&apos;aide</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="px-4 py-3">Infrastructure collective (colonne)</td>
                                        <td className="px-4 py-3 font-bold text-purple-700">50% du montant HT (plafonné ~8 000€)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">Point de charge individuel</td>
                                        <td className="px-4 py-3 font-bold text-green-700">50% du montant HT (max 960€)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2>Comment se passe l&apos;AG pour les copropriétés à {cityName} ?</h2>
                        <p>
                            Notre expert local à {cityName} vous accompagne de A à Z :
                        </p>
                        <ol>
                            <li><strong>Visite technique gratuite</strong> du parking de votre copropriété.</li>
                            <li><strong>Dossier technique complet</strong> remis au syndic pour l&apos;AG.</li>
                            <li><strong>Présence d&apos;un expert</strong> lors de l&apos;Assemblée Générale pour répondre aux questions.</li>
                            <li><strong>Vote</strong> à la majorité simple (art. 24 ou 25).</li>
                        </ol>

                        {neighborhoods.length > 0 && (
                            <>
                                <h2>Zones d&apos;intervention à {cityName}</h2>
                                <p>
                                    Nos installateurs certifiés IRVE interviennent dans toute l&apos;agglomération de {cityName},
                                    notamment : <strong>{neighborhoods.join(', ')}</strong>.
                                </p>
                            </>
                        )}
                    </article>

                    {/* CTA bottom */}
                    <div className="mt-12 bg-purple-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <FileText /> Syndic à {cityName} ?
                            </h3>
                            <p className="text-purple-200">
                                Obtenez une étude de faisabilité gratuite pour l&apos;infrastructure collective de votre copropriété.
                                Dossier AG clé en main inclus.
                            </p>
                        </div>
                        <a
                            href="#etude"
                            className="bg-white text-purple-900 font-bold py-3 px-6 rounded-xl hover:bg-purple-50 transition shadow-lg whitespace-nowrap flex items-center gap-2"
                        >
                            Demander l&apos;étude gratuite <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            <LocalFAQ site={site} segment="COPRO" />
            <VillesVoisines currentCitySlug={slugify(site.city)} department={site.department || ""} cityName={cityName} />
            <InternalMesh city={cityName} config={site} />
            <Footer config={site} />
        </div>
    );
}
