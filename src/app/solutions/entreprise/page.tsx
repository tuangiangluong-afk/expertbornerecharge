export const revalidate = 86400; // 24h ISR cache
import { Briefcase, BarChart3, TrendingUp, ShieldCheck, Zap, Globe, FileCheck, CheckCircle, Award } from "lucide-react";
import LeadFormPro from "@/components/LeadFormPro";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import Image from "next/image";

export const metadata = {
    title: "Bornes de Recharge Entreprise & Flottes : Obligations LOM et Solutions",
    description: "Équipez votre parking d'entreprise. Obligations loi LOM, avantages fiscaux, rechargement collaborateurs et visiteurs. Devis pour flotte pro.",
};

export default function SolutionEntreprise() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            {/* HERO (Updated Design) */}
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* Left: Content + Lead Form */}
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <div className="text-center lg:text-left space-y-6">
                                <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800 border border-emerald-200 mx-auto lg:mx-0">
                                    <Briefcase size={16} className="mr-2" />
                                    Solutions Pro & Flottes
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                    Électrifiez votre flotte et <span className="text-emerald-600">valorisez votre RSE</span>
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    De la PME au grand groupe, la transition est en marche.
                                    Répondez aux obligations de la Loi LOM, offrez un service à vos collaborateurs et optimisez vos coûts fiscaux.
                                </p>
                            </div>

                            {/* LEAD FORM - Integrated Here */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left">
                                <div id="simulateur" className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 overflow-hidden border border-slate-200">
                                    <div className="p-1 bg-gradient-to-r from-emerald-600 to-emerald-500"></div>
                                    <div className="p-6 md:p-8">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-emerald-900">Devis Entreprise / Flotte</h3>
                                            <p className="text-sm text-slate-500">Réponse sous 24h ouvrées</p>
                                        </div>
                                        <LeadFormPro city="France" domain="expertbornerecharge.com" segment="ENTREPRISE" themeColor="emerald" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Large Hero Image + Trust Badges */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full">
                            <div className="relative h-[640px] w-full mb-8">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-100 bg-white p-2">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-emerald-100">
                                        <Image
                                            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=3540&auto=format&fit=crop"
                                            alt="Parking Entreprise Borne de recharge"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                                        {/* Image Caption/Badge */}
                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="bg-white/95 backdrop-blur rounded-xl p-5 shadow-xl border border-white/50 flex items-center gap-4 cursor-default">
                                                <div className="bg-emerald-100 p-3 rounded-full shrink-0">
                                                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-slate-900">Conformité Loi LOM</div>
                                                    <div className="text-sm font-medium text-slate-500">Solutions Clé en Main</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Elements relocated - Right Column */}
                            <div className="flex flex-wrap items-center gap-4 justify-center px-4">
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <Award size={24} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-slate-900 text-base">Qualifelec IRVE</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <CheckCircle size={24} className="text-green-500 fill-green-100" />
                                    <span className="font-bold text-slate-900 text-base">Garantie Décennale</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <div className="container mx-auto px-4 py-16 grid lg:grid-cols-[1fr_350px] gap-12">
                <article className="prose prose-lg prose-slate max-w-none">
                    <h2>Pourquoi installer des bornes en entreprise ?</h2>
                    <p>
                        Au-delà de l'image moderne et écologique, c'est souvent une nécessité réglementaire et un levier RH puissant.
                        Proposer la recharge au travail est devenu un avantage en nature très recherché par les talents qui roulent en électrique.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
                        <div className="p-4 bg-slate-100 rounded-xl">
                            <FileCheck className="text-emerald-600 mb-3" size={28} />
                            <h4 className="font-bold text-slate-900 mb-2">Conformité Loi LOM</h4>
                            <p className="text-xs text-slate-600">Obligation d'équiper 20% des places pour les parkings &gt; 20 places (bâtiments non résidentiels).</p>
                        </div>
                        <div className="p-4 bg-slate-100 rounded-xl">
                            <TrendingUp className="text-emerald-600 mb-3" size={28} />
                            <h4 className="font-bold text-slate-900 mb-2">Avantages Fiscaux</h4>
                            <p className="text-xs text-slate-600">Amortissement possible, TVA récupérable sur l'électricité (selon cas), Aides ADVENIR.</p>
                        </div>
                        <div className="p-4 bg-slate-100 rounded-xl">
                            <Globe className="text-emerald-600 mb-3" size={28} />
                            <h4 className="font-bold text-slate-900 mb-2">Image de Marque</h4>
                            <p className="text-xs text-slate-600">Incarnez votre politique RSE et accueillez vos clients/visiteurs avec un service premium.</p>
                        </div>
                    </div>

                    <h2>Quels types de bornes pour une entreprise ?</h2>
                    <p>
                        Contrairement au domicile où la charge lente suffit, l'entreprise a des besoins variés.
                        On mixe souvent AC (Charge normale) et DC (Charge rapide).
                    </p>
                    <ul>
                        <li><strong>Bornes AC 7kW à 22kW :</strong> Pour les collaborateurs qui restent la journée (8h). Idéal pour les flottes de fonction.</li>
                        <li><strong>Bornes DC 50kW+ :</strong> Pour les visiteurs, commerciaux de passage ou logistique. Recharge 80% en 40 min.</li>
                    </ul>

                    <h2>Supervision et Monétisation</h2>
                    <p>
                        Installer la borne n'est que la première étape. Il faut ensuite la <strong>gérer</strong>.
                        Nos solutions incluent des logiciels de supervision :
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                        <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500" /> <strong>Contrôle d'accès :</strong> Badge RFID collaborateurs vs Visiteurs.</li>
                        <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500" /> <strong>Refacturation :</strong> Faites payer la charge aux visiteurs public (revenus additionnels).</li>
                        <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500" /> <strong>Smart Charging :</strong> Lissage de la consommation pour éviter de faire sauter le compteur du bâtiment.</li>
                    </ul>

                    <h2>Les aides ADVENIR pour les pros</h2>
                    <p>
                        Le programme ADVENIR finance aussi les parkings privés à destination de flottes ou du public.
                        Les primes peuvent couvrir jusqu'à <strong>20 à 50%</strong> des coûts selon l'ouverture au public.
                    </p>

                    <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl not-prose">
                        <h3 className="text-emerald-900 font-bold text-lg mb-2">L'Offre Flotte Expert</h3>
                        <p className="text-emerald-800 text-sm mb-4">
                            Nous accompagnons les gestionnaires de flotte dans l'électrification globale :
                        </p>
                        <ul className="space-y-2 text-sm text-emerald-800">
                            <li>1. Installation au siège de l'entreprise.</li>
                            <li>2. Installation <strong>au domicile des collaborateurs</strong> (avec refacturation automatique des kWh pro à l'entreprise).</li>
                        </ul>
                    </div>

                </article>

                <div className="hidden lg:block space-y-6 sticky top-24 h-fit">
                    <div className="bg-white border-2 border-emerald-500 rounded-xl p-6 shadow-lg">
                        <h4 className="font-bold text-emerald-900 mb-4 text-center text-lg">Un projet multi-sites ?</h4>
                        <p className="text-sm text-slate-600 mb-6 text-center">
                            Nous déployons des infrastructures de recharge sur l'ensemble de vos sites en France, avec un interlocuteur unique.
                        </p>
                        <div className="flex flex-col gap-3">
                            <a href="#simulateur" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg text-center hover:bg-emerald-700 transition">
                                Demander un audit flotte
                            </a>
                            <p className="text-xs text-center text-slate-400">Réponse sous 24h ouvrées</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h5 className="font-bold mb-3">Ils nous font confiance</h5>
                        <p className="text-xs text-slate-500 mb-4">
                            Des PME aux grandes surfaces, nous équipons tous les parkings professionnels.
                        </p>
                        {/* Logos placeholder using text for simplicity */}
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-white px-2 py-1 border rounded text-xs font-bold text-slate-400">Hôtels</span>
                            <span className="bg-white px-2 py-1 border rounded text-xs font-bold text-slate-400">Bureaux</span>
                            <span className="bg-white px-2 py-1 border rounded text-xs font-bold text-slate-400">Commerces</span>
                            <span className="bg-white px-2 py-1 border rounded text-xs font-bold text-slate-400">Logistique</span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer config={hub} />
        </div>
    );
}
