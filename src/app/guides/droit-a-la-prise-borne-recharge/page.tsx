
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, FileText, Send, Shield, Zap } from "lucide-react";
import LeadForm from "@/components/LeadForm";

export const metadata = {
    title: "Droit à la Prise Borne de Recharge Copropriété | Guide 2026",
    description: "Tout savoir sur le droit à la prise en copropriété. Délais, notification syndic, installation borne de recharge. Modèle de lettre gratuit.",
};

export default function DroitALaPrisePage() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            {/* Hero Article */}
            <section className="pt-32 pb-12 lg:pt-40 lg:pb-20 px-6 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <Link href="/home" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Retour Accueil
                    </Link>

                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-6">
                        Guide Copropriété
                    </span>

                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                        Droit à la Prise : Installez votre borne en copropriété sans vote en AG
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed mb-8">
                        Vous habitez en copropriété et souhaitez installer une borne de recharge ?
                        Bonne nouvelle : le <strong>droit à la prise</strong> vous permet d'équiper votre place de parking
                        sans avoir besoin de l'autorisation de l'assemblée générale. Voici comment faire valoir vos droits en 2026.
                    </p>

                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12">
                        <Image
                            src="/images/generated/underground-parking.png"
                            alt="Installation borne recharge parking souterrain"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-20 px-6">
                <div className="container mx-auto max-w-4xl grid md:grid-cols-[1fr_300px] gap-12">

                    {/* Main Text */}
                    <article className="prose prose-lg prose-slate max-w-none">
                        <h3>Qu'est-ce que le Droit à la Prise ?</h3>
                        <p>
                            Instauré par le décret de 2011 et renforcé par la loi LOM, le "droit à la prise" permet à tout utilisateur de véhicule électrique
                            (propriétaire ou locataire) d'installer à ses frais une borne de recharge sur sa place de stationnement,
                            qu'elle soit close ou extérieure.
                        </p>
                        <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 not-prose rounded-r-xl">
                            <h4 className="font-bold text-green-900 flex items-center gap-2 mb-2">
                                <CheckCircle size={20} /> Ce que dit la loi
                            </h4>
                            <p className="text-green-800 text-sm">
                                Le syndic ne peut pas s'opposer à votre demande sans motif légitime et sérieux (ex: mise en danger de la sécurité de l'immeuble).
                                Il ne peut pas non plus imposer un vote en Assemblée Générale. C'est une simple notification.
                            </p>
                        </div>

                        <h3>La procédure en 3 étapes simples</h3>

                        <div className="space-y-8 my-8 not-prose">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Demandez un devis à un installateur agréé</h4>
                                    <p className="text-slate-600">
                                        Avant tout, vous devez obtenir un devis descriptif détaillé. L'installateur doit être certifié IRVE (comme ceux de notre réseau).
                                        Il vérifiera la faisabilité technique.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Notifiez votre syndic</h4>
                                    <p className="text-slate-600">
                                        Envoyez une lettre recommandée avec accusé de réception (LRAR) à votre syndic.
                                        Joignez-y le devis et un schéma d'installation fourni par l'électricien.
                                    </p>
                                    <a href="#modele-lettre" className="inline-flex items-center gap-2 text-blue-600 font-bold mt-2 hover:underline">
                                        <FileText size={16} /> Voir notre modèle de lettre gratuit
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Installation et suivi</h4>
                                    <p className="text-slate-600">
                                        Le syndic a 3 mois pour s'opposer (très rare) ou proposer une solution collective.
                                        Passé ce délai, ou dès signature d'une convention, les travaux peuvent commencer.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <h3>Frais et Subventions</h3>
                        <p>
                            Les travaux sont à votre charge (ou partagés si infrastructure collective).
                            Cependant, vous bénéficiez d'aides importantes :
                        </p>
                        <ul>
                            <li><strong>Prime ADVENIR</strong> : Jusqu'à 960€ (50% du coût)</li>
                            <li><strong>Crédit d'Impôt</strong> : 500€ par système de charge</li>
                            <li><strong>TVA Réduite</strong> : 5.5% sur le matériel et la pose</li>
                        </ul>

                        <hr className="my-12" />

                        <div id="modele-lettre" className="bg-slate-100 p-8 rounded-2xl not-prose border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Send size={24} className="text-blue-600" /> Modèle de courrier pour le syndic
                            </h3>
                            <div className="bg-white p-6 rounded-xl text-sm font-mono text-slate-600 border border-slate-200 mb-4 whitespace-pre-wrap">
                                {`Madame, Monsieur le Syndic,

Je vous informe par la présente de mon intention de faire installer une borne de recharge pour véhicule électrique sur ma place de stationnement située [Numéro de place/Description].

Conformément au décret n° 2011-873 du 25 juillet 2011 relatif aux installations dédiées à la recharge des véhicules électriques ou hybrides rechargeables dans les bâtiments, je fais valoir mon "droit à la prise".

Vous trouverez ci-joint :
- Le descriptif détaillé des travaux à entreprendre.
- Un schéma d'installation.
- Le devis de l'installateur certifié IRVE retenu.

Je vous rappelle que ces travaux seront réalisés à mes frais exclusifs et incluront la pose d'un sous-compteur individuel permettant la refacturation de ma consommation.

Dans l'attente de la signature de la convention avec le prestataire, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[Votre Signature]`}
                            </div>
                            <p className="text-xs text-slate-500 text-center">Copiez-collez ce texte dans votre éditeur favori.</p>
                        </div>

                    </article>

                    {/* Sidebar CTA */}
                    <div className="space-y-6">
                        <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20 sticky top-32">
                            <h3 className="text-xl font-bold mb-4">Besoin d'un devis pour votre syndic ?</h3>
                            <p className="text-blue-100 text-sm mb-6">
                                Obtenez rapidement un devis conforme et une étude technique gratuite pour votre dossier.
                            </p>
                            <LeadForm
                                city="France"
                                domain="expertbornerecharge.com"
                                targetType="COPRO"
                                themeColor="blue"
                            />
                            <p className="text-xs text-blue-200 mt-4 text-center">
                                <Shield size={12} className="inline mr-1" /> Installateurs certifiés IRVE
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <Footer config={hub} />
        </div>
    );
}
