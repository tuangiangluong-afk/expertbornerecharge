import { Briefcase, BarChart3, TrendingUp, ShieldCheck, Zap, Globe, FileCheck } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";

export const metadata = {
    title: "Bornes de Recharge Entreprise & Flottes : Obligations LOM et Solutions",
    description: "Équipez votre parking d'entreprise. Obligations loi LOM, avantages fiscaux, rechargement collaborateurs et visiteurs. Devis pour flotte pro.",
};

export default function SolutionEntreprise() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            {/* HERO */}
            <section className="relative pt-24 pb-16 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800 mb-6 border border-emerald-200">
                                <Briefcase size={16} className="mr-2" />
                                Solutions Pro & Flottes
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                Électrifiez votre flotte et <span className="text-emerald-600">valorisez votre RSE</span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                De la PME au grand groupe, la transition est en marche.
                                Répondez aux obligations de la Loi LOM, offrez un service à vos collaborateurs et optimisez vos coûts fiscaux.
                            </p>
                        </div>
                        <div className="lg:w-1/2 relative bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                                <h3 className="text-center font-bold text-lg mb-4 text-emerald-900">Devis Entreprise / Flotte</h3>
                                <LeadForm city="France" domain="expertbornerecharge.com" targetType="ENTREPRISE" themeColor="emerald" />
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
                            <p className="text-xs text-slate-600">Obligation d'équiper 20% des places pour les parkings > 20 places (bâtiments non résidentiels).</p>
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
                            <a href="#top" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg text-center hover:bg-emerald-700 transition">
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
