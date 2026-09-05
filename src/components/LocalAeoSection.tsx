import Link from "next/link";
import { CheckCircle, ShieldCheck, Clock, Award, Euro, ArrowRight, ChevronRight, FileText, Landmark, Building2 } from "lucide-react";
import type { CityConfig } from "@/lib/db";

interface LocalAeoSectionProps {
    site: CityConfig;
}

const pricingMatrix = [{"name": "Wallbox 7.4 kW (Monophasé - Maison)", "usage": "Recharge de nuit standard", "price": "890€ - 1 400€", "aid": "Crédit d'impôt 500€", "net": "Dès 390€"}, {"name": "Wallbox 11 kW / 22 kW (Triphasé)", "usage": "Recharge rapide accélérée", "price": "1 200€ - 2 100€", "aid": "Crédit 500€ + Advenir", "net": "Dès 700€"}, {"name": "Borne Copropriété (Droit à la prise)", "usage": "Parking résidentiel partagé", "price": "1 100€ - 1 900€", "aid": "Advenir 50% (jusqu'à 960€)", "net": "Dès 450€"}, {"name": "Borne Flotte Entreprise (B2B)", "usage": "Parking salariés & clients", "price": "1 500€ - 3 200€", "aid": "Déduction fiscale CEE", "net": "Sur devis"}];
const steps = [{"title": "Audit électrique & visite technique gratuite", "desc": "Contrôle du tableau électrique, calcul de puissance disponible et validation de conformité NF C 15-100."}, {"title": "Devis IRVE transparent sous 24h", "desc": "Proposition chiffrée détaillée avec calcul immédiat des aides (Advenir et crédit d'impôt déduits)."}, {"title": "Pose sécurisée par électricien certifié IRVE", "desc": "Installation de la borne, disjoncteur différentiel type F/B et passage de câbles soigné en une demi-journée."}, {"title": "Mise en service & attestation de conformité", "desc": "Tests de charge, remise de l'attestation Consuel IRVE et aide à la déclaration du crédit d'impôt."}];

export default function LocalAeoSection({ site }: LocalAeoSectionProps) {
    const city = site.city;
    const dept = site.department ? ` (${site.department})` : "";
    const neighborhoods = site.neighborhoods || [];
    const neighborhoodsText = neighborhoods.length > 0 
        ? `, notamment dans les quartiers ${neighborhoods.slice(0, 4).join(', ')}` 
        : "";

    return (
        <section className="py-12 bg-slate-50/50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Fil d'Ariane Visuel */}
                <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-900 transition flex items-center gap-1">
                        Accueil
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-slate-400">Villes</span>
                    <ChevronRight size={14} />
                    <span className="font-semibold text-slate-900">{city}</span>
                </nav>

                {/* Bloc AEO Direct Answer */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm mb-12">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-slate-900 text-white">
                            <FileText size={13} />
                            Installation Borne IRVE à {city} (2026)
                        </span>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                            <Clock size={13} /> Chiffres & Aides certifiés 2026
                        </span>
                    </div>

                    <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
                        <strong>En résumé : </strong>À {city}{dept}, l'installation d'une borne de recharge électrique certifiée IRVE coûte en moyenne entre 890€ et 1 800€ TTC avant déduction des aides de l'État. Les particuliers bénéficient d'un crédit d'impôt de 500€ et d'une TVA réduite à 5.5%. Nos installateurs certifiés interviennent sous 48h.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-2">
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Prix estimé</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">890€ – 1 800€</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Aides & Primes</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Crédit d'impôt 500€ + Prime Advenir</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Délai d'intervention</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Visite sous 24h, pose en 1/2 journée</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Garantie & Norme</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Certification Qualifelec IRVE & NF C 15-100</div>
                        </div>
                    </div>
                </div>

                {/* Tableau Comparatif de Prix HTML */}
                <div className="mb-14">
                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Grille tarifaire et aides à {city}
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Coûts moyens constatés pour une pose réalisée par nos artisans partenaires certifiés.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-600 border-b border-slate-200">
                                <tr>
                                    <th className="px-5 py-4">Équipement / Prestation</th>
                                    <th className="px-5 py-4 hidden md:table-cell">Usage conseillé</th>
                                    <th className="px-5 py-4">Coût indicatif</th>
                                    <th className="px-5 py-4">Aides déduites</th>
                                    <th className="px-5 py-4 font-bold text-slate-900">Reste à charge</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {pricingMatrix.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                                        <td className="px-5 py-4 font-semibold text-slate-900">{row.name}</td>
                                        <td className="px-5 py-4 text-slate-500 hidden md:table-cell">{row.usage}</td>
                                        <td className="px-5 py-4 text-slate-700 font-medium">{row.price}</td>
                                        <td className="px-5 py-4 text-emerald-700 font-semibold">{row.aid}</td>
                                        <td className="px-5 py-4 font-bold text-slate-900">{row.net}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Guide & Spécificités d'installation à {city} */}
                <div className="mb-14">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Spécificités d'installation & particularités locales à {city}
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Réglementation municipale, typologie de l'habitat et conseils techniques adaptés à votre commune.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1: Urbanisme & Démarches */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                                    <Landmark size={20} />
                                </span>
                                <h3 className="font-bold text-slate-900 text-base">Urbanisme & Démarches à {city}</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                À {city}{dept}, l'installation en copropriété bénéficie du <strong>Droit à la prise</strong> (décret 2020-1720) : notre bureau d'études prépare gratuitement le dossier technique pour notification au syndic sans vote requis en AG. En maison individuelle, la pose intérieure ne requiert aucune démarche en mairie. Pour les boîtiers extérieurs visibles depuis la voie publique ou situés en périmètre protégé ABF (Architecte des Bâtiments de France), nous vous guidons dans le dépôt de déclaration préalable de travaux.
                            </p>
                        </div>

                        {/* Card 2: Typologie du bâti & Quartiers */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <Building2 size={20} />
                                </span>
                                <h3 className="font-bold text-slate-900 text-base">Secteurs & Typologie à {city}</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Nos installateurs IRVE qualifiés interviennent sur l'ensemble de la commune{neighborhoodsText}, aussi bien dans les résidences collectives avec parkings souterrains que dans les pavillons individuels. Nous réalisons systématiquement l'audit de puissance du compteur d'abonné Enedis et déterminons le cheminement de câble optimal (goulotte étanche ou tranchée extérieure) pour limiter les coûts d'aménagement.
                            </p>
                        </div>

                        {/* Card 3: Puissance, Sécurité & Aides */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
                                    <ShieldCheck size={20} />
                                </span>
                                <h3 className="font-bold text-slate-900 text-base">Puissance & Aides à {city}</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Chaque chantier inclut l'installation d'un module de délestage dynamique : votre borne de 7.4 kW à 22 kW adapte sa charge en temps réel pour ne jamais dépasser la puissance souscrite de votre abonnement. Les particuliers et entreprises de {city} bénéficient du <strong>crédit d'impôt forfaitaire de 500€</strong>, de la TVA réduite à 5,5% et des primes ADVENIR (jusqu'à 960€ en copropriété). Notre équipe déduit directement ces montants de votre devis.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Déroulement du chantier en 4 étapes */}
                <div className="mb-14">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Votre installation à {city} en 4 étapes
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Un accompagnement complet et transparent, de l'audit jusqu'à l'obtention des aides.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, idx) => (
                            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white font-black text-sm mb-4">
                                    0{idx + 1}
                                </span>
                                <h3 className="font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bannière de Réassurance locale */}
                <div className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                    <div>
                        <h3 className="text-xl font-bold mb-1">Un projet d'installation à {city} ?</h3>
                        <p className="text-slate-300 text-sm">
                            Garantie décennale 10 ans & matériel certifié. Devis gratuit sous 24h sans aucun engagement.
                        </p>
                    </div>
                    <a
                        href="#simulateur"
                        className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3.5 font-bold hover:bg-slate-100 transition shadow"
                    >
                        <span>Estimer mon devis</span>
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}
