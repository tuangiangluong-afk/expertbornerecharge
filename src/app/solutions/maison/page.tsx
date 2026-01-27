import { Zap, CheckCircle, HelpCircle, TrendingDown, Shield, Clock, Info, Battery, Plug, Euro } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import Image from "next/image";

export const metadata = {
    title: "Installation Borne de Recharge Maison : Le Guide Complet 2026",
    description: "Tout savoir sur l'installation d'une Wallbox en maison individuelle. Prix, Crédit d'Impôt, Puissance (7kW vs 22kW), et comparatif des meilleures bornes.",
};

export default function SolutionMaison() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            {/* HERO SECTION - CONTENT FOCUSED */}
            <section className="relative pt-20 pb-12 lg:pt-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-start pt-8">
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-800 mb-6 border border-blue-200">
                                <Zap size={16} className="mr-2" />
                                Guide Complet 2026
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                Installer une borne de recharge en <span className="text-blue-600">maison individuelle</span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Finies les recharges lentes sur prise domestique. Passez à la vitesse supérieure avec une Wallbox sécurisée.
                                Ce guide vous explique tout : choix du matériel, aides de l'État et coût d'installation.
                            </p>
                            <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                                <span className="flex items-center gap-1"><Clock size={16} /> Lecture : 8 min</span>
                                <span className="flex items-center gap-1"><CheckCircle size={16} className="text-green-500" /> Mis à jour Janvier 2026</span>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            {/* Lead Form Embedded as "Stickyr" or prominent element */}
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 relative z-10" id="simulateur">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Devis Gratuit & Rapide
                                </div>
                                <h3 className="text-center font-bold text-lg mb-4 mt-2">Votre projet d'installation</h3>
                                <LeadForm city="France" domain="expertbornerecharge.com" targetType="MAISON" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT BODY */}
            <div className="container mx-auto px-4 py-16 grid lg:grid-cols-[1fr_350px] gap-12">

                {/* LEFT COLUMN: EDUCATIONAL CONTENT */}
                <article className="prose prose-lg prose-slate max-w-none">
                    <h2>Pourquoi installer une borne à domicile ?</h2>
                    <p>
                        80% des recharges de voitures électriques s'effectuent à domicile. C'est la solution la plus <strong>économique</strong> et la plus <strong>confortable</strong>.
                        Plus besoin de chercher une borne libre en ville ou sur autoroute pour le quotidien. Vous rentrez, vous branchez, et vous repartez chaque matin avec le "plein".
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <h4 className="flex items-center gap-2 font-bold text-green-800 mb-3">
                                <TrendingDown size={20} /> Économies
                            </h4>
                            <p className="text-sm text-green-900">
                                Le coût au 100km en électrique à domicile est d'environ <strong>3€</strong>, contre 10€ à 15€ pour un véhicule thermique ou sur superchargeur.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h4 className="flex items-center gap-2 font-bold text-blue-800 mb-3">
                                <Shield size={20} /> Sécurité
                            </h4>
                            <p className="text-sm text-blue-900">
                                Contrairement à une prise standard qui peut surchauffer, une Wallbox communique avec le véhicule et coupe le courant au moindre défaut.
                            </p>
                        </div>
                    </div>

                    <h2>1. Wallbox vs Prise Renforcée : Le match</h2>
                    <p>
                        C'est la première question à se poser. Faut-il investir dans une vraie borne (Wallbox) ou une simple prise renforcée (type Green'up) suffit-elle ?
                    </p>

                    <div className="not-prose overflow-x-auto">
                        <table className="min-w-full bg-white border border-slate-200 rounded-lg shadow-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold text-slate-700">Solution</th>
                                    <th className="px-6 py-4 text-left font-bold text-slate-700">Puissance</th>
                                    <th className="px-6 py-4 text-left font-bold text-slate-700">Temps de charge (0-100% Zoé/Tesla)</th>
                                    <th className="px-6 py-4 text-left font-bold text-slate-700">Usage recommandé</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="px-6 py-4 font-medium">Prise Domestique</td>
                                    <td className="px-6 py-4 text-slate-600">2.3 kW</td>
                                    <td className="px-6 py-4 text-red-600 font-bold">25h+</td>
                                    <td className="px-6 py-4 text-slate-600">Dépannage occasionnel</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium">Prise Renforcée</td>
                                    <td className="px-6 py-4 text-slate-600">3.7 kW</td>
                                    <td className="px-6 py-4 text-orange-600 font-bold">15h</td>
                                    <td className="px-6 py-4 text-slate-600">Hybrides rechargeables / Petits rouleurs</td>
                                </tr>
                                <tr className="bg-blue-50/50">
                                    <td className="px-6 py-4 font-bold text-blue-700">Wallbox 7kW</td>
                                    <td className="px-6 py-4 text-slate-600">7.4 kW</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">5h à 8h</td>
                                    <td className="px-6 py-4 text-slate-600"><strong>Le standard idéal</strong></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium">Wallbox 11/22kW</td>
                                    <td className="px-6 py-4 text-slate-600">11-22 kW</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">3h à 5h</td>
                                    <td className="px-6 py-4 text-slate-600">Nécessite Triphasé</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Quelle puissance choisir ?</h3>
                    <p>
                        Pour 90% des maisons en France, la <strong>Wallbox 7.4kW (Monophasé)</strong> est le choix roi.
                        Elle permet de recharger n'importe quelle voiture en une nuit (20h -&gt; 7h).
                        Le 22kW nécessite une installation électrique en Triphasé, ce qui est rare chez les particuliers et coûte plus cher en abonnement électrique.
                    </p>

                    <h2>2. Combien coûte l'installation ?</h2>
                    <p>
                        Le prix varie selon la distance entre votre tableau électrique et l'emplacement de la borne.
                        Voici une estimation moyenne constatée en 2026 :
                    </p>
                    <ul>
                        <li><strong>Borne seule (Matériel) :</strong> 500€ à 1 200€ selon marque (Copper SB, Tesla, Hager...)</li>
                        <li><strong>Installation (Main d'œuvre + protections) :</strong> 400€ à 800€</li>
                        <li><strong>Total moyen :</strong> Entre 1 200€ et 1 800€ TTC posé.</li>
                    </ul>

                    <div className="my-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl not-prose">
                        <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                            <Euro size={20} /> Aides de l'État 2026
                        </h4>
                        <p className="text-yellow-900 mb-2">
                            Bonne nouvelle ! L'installation par un professionnel IRVE déclenche des aides :
                        </p>
                        <ul className="list-disc pl-5 text-sm text-yellow-900 space-y-1">
                            <li><strong>Crédit d'impôt :</strong> 500€ par système de charge (pilotable).</li>
                            <li><strong>TVA Réduite :</strong> 5.5% (au lieu de 20%) sur matériel et main d'œuvre (si habitation +2 ans).</li>
                        </ul>
                        <p className="text-xs mt-3 text-yellow-800 italic">
                            *Ces aides sont directement déduites ou remboursées sur votre avis d'imposition.
                        </p>
                    </div>

                    <div className="not-prose my-12">
                        <h3 className="font-bold text-2xl text-slate-900 mb-6 text-center">Les marques que nous installons</h3>
                        <p className="text-center text-slate-600 mb-8 max-w-xl mx-auto">
                            Nous ne travaillons qu'avec les leaders mondiaux pour garantir sécurité et longévité.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: "Tesla", color: "bg-slate-900 text-white" },
                                { name: "Wallbox", color: "bg-green-600 text-white" },
                                { name: "Hager", color: "bg-blue-600 text-white" },
                                { name: "Schneider", color: "bg-green-700 text-white" }
                            ].map((brand, i) => (
                                <div key={i} className={`h-16 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${brand.color}`}>
                                    {brand.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2>3. Les étapes de l'installation</h2>
                    <ol>
                        <li>
                            <strong>Validation technique :</strong> L'électricien vérifie votre tableau électrique (capacité disponible, mise à la terre).
                        </li>
                        <li>
                            <strong>Choix de l'emplacement :</strong> Garage ou extérieur ? Si extérieur, prévoir une borne résistante (IP54/IK08).
                        </li>
                        <li>
                            <strong>Pose et raccordement :</strong> Tirage de ligne dédiée depuis le compteur, pose de l'interrupteur différentiel.
                        </li>
                        <li>
                            <strong>Mise en service :</strong> Tests de charge et remise du certificat de conformité IRVE.
                        </li>
                    </ol>

                    <h2>FAQ : Questions fréquentes</h2>
                    <div className="not-prose space-y-4">
                        {[
                            {
                                q: "Faut-il augmenter mon abonnement EDF ?",
                                a: "Souvent non. Une borne 7kW tire environ 32A. Si vous avez un abonnement 9kVA (45A) ou 12kVA (60A), ça passe généralement, surtout si vous chargez la nuit. Sinon, on installe un module de délestage dynamique."
                            },
                            {
                                q: "Puis-je installer la borne moi-même ?",
                                a: "Légalement, non. Pour toute puissance > 3.7kW, la loi impose le recours à un électricien qualifié IRVE. De plus, cela conditionne les aides et votre assurance habitation."
                            },
                            {
                                q: "La borne fonctionne-t-elle avec toutes les voitures ?",
                                a: "Oui. Le standard européen est la prise Type 2. Toutes les Wallbox que nous installons sont compatibles avec 100% des véhicules (Tesla, Zoé, Peugeot e-208, MG, etc.)."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-800 mb-2">{faq.q}</h4>
                                <p className="text-slate-600 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </article>

                {/* RIGHT SIDEBAR (Sticky) */}
                <div className="hidden lg:block space-y-8">
                    <div className="sticky top-24">
                        {/* Summary Card */}
                        <div className="bg-blue-900 text-white rounded-xl p-6 shadow-xl mb-6">
                            <h4 className="font-bold text-lg mb-4">Résumé en bref</h4>
                            <ul className="space-y-3 text-sm text-blue-100">
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-1 shrink-0 text-blue-400" />
                                    <span>Puissance reco : <strong>7.4kW</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-1 shrink-0 text-blue-400" />
                                    <span>Temps charge : <strong>Une nuit</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-1 shrink-0 text-blue-400" />
                                    <span>Prix moyen : <strong>1500€</strong> (avant aides)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-1 shrink-0 text-blue-400" />
                                    <span>Aide État : <strong>-500€</strong></span>
                                </li>
                            </ul>
                            <a href="#simulateur" className="block w-full text-center bg-white text-blue-900 font-bold py-3 px-4 rounded-lg mt-6 hover:bg-blue-50 transition">
                                Demander mon devis
                            </a>
                        </div>

                        {/* Trust Signals */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                            <h5 className="font-bold text-slate-800 mb-4 text-center">Pourquoi Expert B.R ?</h5>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
                                    <span className="text-sm text-slate-600">Installateurs 100% IRVE</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
                                    <span className="text-sm text-slate-600">Devis comparatifs sous 24h</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">3</div>
                                    <span className="text-sm text-slate-600">Accompagnement dossier aides</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <Footer config={hub} />
        </div>
    );
}
