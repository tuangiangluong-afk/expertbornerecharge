import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Shield, Zap, Star, AlertTriangle, ArrowRight, Table2 } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import { getTheme } from '@/lib/theme';

export const metadata: Metadata = {
    title: 'Top 10 Meilleures Bornes de Recharge 2026 : Le Comparatif Ultime',
    description: 'Quelle borne choisir en 2026 ? Wallbox, Tesla, Hager... Notre classement après 500+ installations. Avis d\'experts, prix réels et comparatif.',
};

export default function BestWallboxesGuide() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Header / Hero */}
            <div className="bg-slate-900 text-white pt-32 pb-20 px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-400 text-sm font-bold mb-4 border border-blue-600/30">
                        Mis à jour : Janvier 2026
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Top 10 des Meilleures <br />
                        <span className="text-blue-500">Bornes de Recharge 2026</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        On ne va pas se mentir : choisir une borne, c'est la jungle.
                        Entre les marques chinoises low-cost et les mastodontes allemands hors de prix,
                        voici notre sélection <strong>honnête</strong> après plus de 500 installations.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 mb-20 relative z-10">
                <div className="bg-white rounded-3xl shadow-xl p-8 max-w-5xl mx-auto border border-slate-100">
                    <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        <div className="p-4">
                            <div className="text-4xl font-black text-blue-600 mb-2">#1</div>
                            <div className="font-bold text-slate-900">Le Choix Malin</div>
                            <div className="text-slate-500 text-sm">Wallbox Pulsar Max</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-black text-amber-500 mb-2">#2</div>
                            <div className="font-bold text-slate-900">La Premium</div>
                            <div className="text-slate-500 text-sm">Tesla Wall Connector</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-black text-green-500 mb-2">#3</div>
                            <div className="font-bold text-slate-900">L'Indestructible</div>
                            <div className="text-slate-500 text-sm">Hager Witty</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-12 max-w-7xl">
                <div className="lg:col-span-2 space-y-16">

                    {/* Intro */}
                    <div className="prose prose-lg text-slate-600 max-w-none">
                        <p>
                            En tant qu'installateurs, on en voit passer des vertes et des pas mûres.
                            Des bornes qui "disjonctent" à chaque pluie, des applications qui plantent quand vous êtes pressé le matin...
                        </p>
                        <p>
                            C'est pour ça qu'on a décidé de faire ce classement. <strong>Pas de langue de bois ici.</strong>
                            Si une borne est une galère à installer ou si son plastique jaunit au soleil, on vous le dit.
                        </p>
                        <h3>Nos critères de sélection :</h3>
                        <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0 not-prose">
                            {[
                                "Fiabilité sur 5 ans (et +)",
                                "Qualité de l'application mobile",
                                "Facilité d'utilisation au quotidien",
                                "Rapport qualité/prix réel"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                    <CheckCircle className="text-green-500 shrink-0" size={20} />
                                    <span className="font-medium text-slate-900">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ranking Items */}
                    <div className="space-y-12">

                        {/* #1 Wallbox Pulsar Max */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-3xl font-bold">
                                #1 • Le Top 2026
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                Wallbox Pulsar Max
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                                </div>
                            </h2>

                            <div className="prose text-slate-600 mb-8">
                                <p>
                                    C'est simple : c'est celle qu'on installe le plus. Pourquoi ? Parce qu'elle coche toutes les cases.
                                    Elle est toute petite, ultra-connectée, et c'est l'une des seules à proposer le délestage (Power Boost) de manière aussi fiable.
                                </p>
                                <p>
                                    <strong>Le truc en plus :</strong> L'application Wallbox est probablement la meilleure du marché. Fluide, claire, elle vous donne votre coût de recharge en euros direct.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl">
                                <div>
                                    <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                                        <CheckCircle size={18} /> On aime
                                    </h4>
                                    <ul className="space-y-2 text-sm text-slate-700">
                                        <li>• Design compact et discret</li>
                                        <li>• Application au top</li>
                                        <li>• Détection solaire (Eco-Smart)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                                        <AlertTriangle size={18} /> On aime moins
                                    </h4>
                                    <ul className="space-y-2 text-sm text-slate-700">
                                        <li>• Tout plastique (mais robuste)</li>
                                        <li>• Le support mural un peu léger</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* #2 Tesla Wall Connector */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
                            <div className="absolute top-0 right-0 bg-slate-800 text-white px-6 py-2 rounded-bl-3xl font-bold">
                                #2 • La Valeur Sûre
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                Tesla Wall Connector V3
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill={i < 5 ? "currentColor" : "none"} className={i === 5 ? "text-slate-300" : ""} />)}
                                </div>
                            </h2>

                            <div className="prose text-slate-600 mb-8">
                                <p>
                                    Vous avez une Tesla ? Ne cherchez pas plus loin. Le bouton sur le pistolet pour ouvrir la trappe de charge, c'est le petit luxe dont on ne peut plus se passer.
                                </p>
                                <p>
                                    Attention cependant : pour les autres marques de voitures, c'est une borne "bête". Pas d'application dédiée (sauf si vous avez une Tesla), pas de délestage dynamique natif facile à installer.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl">
                                <div>
                                    <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                                        <CheckCircle size={18} /> On aime
                                    </h4>
                                    <ul className="space-y-2 text-sm text-slate-700">
                                        <li>• Le Prix ! Imbattable pour du 22kW</li>
                                        <li>• Le design magnifique</li>
                                        <li>• Le bouton d'ouverture Tesla</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                                        <AlertTriangle size={18} /> On aime moins
                                    </h4>
                                    <ul className="space-y-2 text-sm text-slate-700">
                                        <li>• Câble attaché (pas le choix)</li>
                                        <li>• Pas de crédit d'impôt (souvent)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* #3 Hager Witty */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
                            <div className="absolute top-0 right-0 bg-green-600 text-white px-6 py-2 rounded-bl-3xl font-bold">
                                #3 • L'Indestructible
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                Hager Witty
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                                </div>
                            </h2>

                            <div className="prose text-slate-600 mb-8">
                                <p>
                                    Si vous habitez dans une région où il pleut des cordes ou si votre borne est exposée plein vent : c'est la Hager Witty qu'il vous faut.
                                </p>
                                <p>
                                    C'est du matériel d'électricien. Pas de chichi, pas d'écran tactile fragile. C'est du solide. C'est aussi la seule qui gère parfaitement la prise domestique intégrée pour recharger votre vélo électrique en même temps.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Besoin d'aide pour choisir ?</h3>
                            <p className="text-blue-700 mb-8 max-w-xl mx-auto">
                                Chaque maison est différente. Si vous avez du triphasé, du photovoltaïque ou une longue distance de câble, le classement peut changer.
                            </p>
                            <a href="#simulateur" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                <Zap size={20} />
                                Faire une simulation gratuite (30s)
                            </a>
                        </div>

                        {/* Comparatif Technique Table */}
                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <Table2 size={32} className="text-blue-600" />
                                Le Tableau Comparatif 2026
                            </h2>
                            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50 text-slate-900">
                                        <tr>
                                            <th className="p-4 border-b border-slate-200">Modèle</th>
                                            <th className="p-4 border-b border-slate-200">Prix Approx.</th>
                                            <th className="p-4 border-b border-slate-200">Connectivité</th>
                                            <th className="p-4 border-b border-slate-200">Délestage</th>
                                            <th className="p-4 border-b border-slate-200">Note</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr className="hover:bg-blue-50/50 transition">
                                            <td className="p-4 border-b border-slate-100 font-bold">Wallbox Pulsar Max</td>
                                            <td className="p-4 border-b border-slate-100">~650€</td>
                                            <td className="p-4 border-b border-slate-100 text-green-600">Wifi/BT</td>
                                            <td className="p-4 border-b border-slate-100">Oui (Option)</td>
                                            <td className="p-4 border-b border-slate-100 font-bold text-blue-600">9.5/10</td>
                                        </tr>
                                        <tr className="hover:bg-blue-50/50 transition">
                                            <td className="p-4 border-b border-slate-100 font-bold">Tesla Wall Connector</td>
                                            <td className="p-4 border-b border-slate-100">~500€</td>
                                            <td className="p-4 border-b border-slate-100 text-green-600">Wifi</td>
                                            <td className="p-4 border-b border-slate-100 text-red-400">Complexe</td>
                                            <td className="p-4 border-b border-slate-100 font-bold text-slate-600">9/10</td>
                                        </tr>
                                        <tr className="hover:bg-blue-50/50 transition">
                                            <td className="p-4 border-b border-slate-100 font-bold">Hager Witty</td>
                                            <td className="p-4 border-b border-slate-100">~900€</td>
                                            <td className="p-4 border-b border-slate-100 text-amber-500">Non</td>
                                            <td className="p-4 border-b border-slate-100">Oui (TIC)</td>
                                            <td className="p-4 border-b border-slate-100 font-bold text-slate-600">8.5/10</td>
                                        </tr>
                                        <tr className="hover:bg-blue-50/50 transition">
                                            <td className="p-4 border-b border-slate-100 font-bold">Copper SB</td>
                                            <td className="p-4 border-b border-slate-100">~700€</td>
                                            <td className="p-4 border-b border-slate-100 text-green-600">Wifi/BT/4G</td>
                                            <td className="p-4 border-b border-slate-100">Oui</td>
                                            <td className="p-4 border-b border-slate-100 font-bold text-slate-600">9/10</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* FAQ Section with Schema */}
                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Questions Fréquentes</h2>
                            <div className="space-y-6">
                                <details className="group bg-white rounded-2xl border border-slate-200 open:ring-2 open:ring-blue-100 transition-all overflow-hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg list-none">
                                        Quelle puissance choisir pour sa borne en 2026 ?
                                        <span className="transition group-open:rotate-180">▼</span>
                                    </summary>
                                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                        Dans 90% des cas, une borne <strong>7,4 kW (monophasé)</strong> suffit amplement. Elle permet de recharger environ 40 à 50km d'autonomie par heure de charge. Le 22 kW est réservé aux installations en triphasé (plus rares chez les particuliers) et aux gros rouleurs (VTC, Taxis).
                                    </div>
                                </details>
                                <details className="group bg-white rounded-2xl border border-slate-200 open:ring-2 open:ring-blue-100 transition-all overflow-hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg list-none">
                                        Faut-il absolument une borne connectée ?
                                        <span className="transition group-open:rotate-180">▼</span>
                                    </summary>
                                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                        Oui et non. Si vous voulez suivre votre consommation pour vous faire rembourser par votre employeur, c'est indispensable. Idem si vous voulez piloter la charge solaire. Sinon, une borne "bête" comme la Hager Witty fait très bien le travail et tombe moins souvent en panne.
                                    </div>
                                </details>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Sidebar Sticky */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-8">
                        {/* Summary Box */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                            <h3 className="font-bold text-lg mb-4 text-slate-900">En Bref</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between items-center">
                                    <span className="text-slate-500">Meilleur Rapport Q/P</span>
                                    <span className="font-bold text-blue-600">Wallbox Pulsar</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-slate-500">Meilleur Design</span>
                                    <span className="font-bold text-slate-900">Tesla V3</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-slate-500">Plus Robuste</span>
                                    <span className="font-bold text-slate-900">Hager</span>
                                </li>
                            </ul>
                        </div>

                        {/* CTA Box */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl text-white text-center shadow-xl">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                <Shield size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Devis Installateur</h3>
                            <p className="text-blue-100 text-sm mb-6">
                                Recevez 3 devis d'installateurs IRVE certifiés dans votre région. Gratuit et sans engagement.
                            </p>
                            <a href="#simulateur" className="block w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition">
                                Vérifier mon éligibilité
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lead Form Section */}
            <div id="simulateur" className="bg-white py-20 px-6 border-t border-slate-100">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                            Quel est le prix pour votre maison ?
                        </h2>
                        <p className="text-xl text-slate-500">
                            Obtenez votre devis personnalisé en moins de 2 minutes.
                        </p>
                    </div>
                    <LeadForm domain="expertbornerecharge.com" city="National" themeColor="blue" initialProjectType="maison" />
                </div>
            </div>

            {/* Schema JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Quelle puissance choisir pour sa borne en 2026 ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Dans 90% des cas, une borne 7,4 kW (monophasé) suffit amplement. Elle permet de recharger environ 40 à 50km d'autonomie par heure de charge. Le 22 kW est réservé aux installations en triphasé."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Faut-il absolument une borne connectée ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Oui et non. Si vous voulez suivre votre consommation pour vous faire rembourser par votre employeur, c'est indispensable. Sinon, une borne simple est souvent plus fiable."
                                }
                            }
                        ]
                    })
                }}
            />
        </div>
    );
}
