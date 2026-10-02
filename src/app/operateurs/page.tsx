import { Metadata } from "next";
import Link from "next/link";
import { OPERATORS } from "@/data/operators";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ShieldCheck, Zap, ArrowRight, Star, Building2, Home, Scale, Award, Info, AlertTriangle, TrendingDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Avis & Tarifs des Opérateurs de Recharge 2026 : Le Comparatif Indépendant",
  description: "ChargeGuru, IZI by EDF, Zeplug, Waat, TotalEnergies... Décryptage des offres, audit des marges d'intermédiaire et arbitrage pour éviter les surcommissions.",
  alternates: {
    canonical: "https://expertbornerecharge.com/operateurs",
  },
  robots: { index: true, follow: true }
};

export default function OperateursHubPage() {
  const hubConfig = getHubConfig();

  const breadcrumbs = [
    { name: "Accueil", href: "/" },
    { name: "Opérateurs & Réseaux Nationaux", href: "/operateurs" }
  ];

  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Comparatif des Opérateurs Nationaux de Bornes de Recharge",
    "description": "Classement et analyse indépendante des opérateurs et installateurs de bornes en France.",
    "itemListElement": OPERATORS.map((op, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": op.name,
      "url": `https://expertbornerecharge.com/operateurs/${op.slug}`,
      "description": op.tagline
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Header isHub={true} variant="default" themeColor="blue" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }} />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto my-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase mb-4">
            <Scale className="w-3.5 h-3.5" />
            Audit Indépendant 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
            Les Réseaux & Opérateurs Nationaux au Crible
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            ChargeGuru, IZI by EDF, Zeplug, Waat, TotalEnergies... Nous décryptons leurs tarifs réels, pointons leurs marges d&apos;intermédiation et vous aidons à choisir entre formule packagée et artisan IRVE direct.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-left flex items-start gap-3 text-amber-900 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">La règle d&apos;or de l&apos;arbitrage :</strong> La plupart des grands réseaux sous-traitent la pose à des artisans électriciens IRVE indépendants en prélevant <strong>25 % à 40 % de commission</strong>. En passant directement par un pro IRVE local, vous réalisez une économie moyenne de <strong>350 € à 700 €</strong> sur la même prestation.
            </div>
          </div>
        </section>

        {/* Operators Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
          {OPERATORS.map((op) => (
            <article 
              key={op.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {op.category}
                  </span>
                  <div className="flex items-center text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    {op.rating} <span className="text-xs font-normal text-slate-400 ml-1">({op.reviewCount})</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  <Link href={`/operateurs/${op.slug}`} className="hover:text-blue-600 transition-colors">
                    {op.name}
                  </Link>
                </h2>
                <p className="text-xs text-slate-500 mb-4">{op.tagline}</p>

                <div className="space-y-2 mb-4 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Cibles :</span>
                    <span className="font-medium text-slate-800">{op.targetMarket.join(", ")}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Tarif estimé :</span>
                    <span className="font-semibold text-blue-700 text-right">{op.estimatedBasePrice}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Surcommission :</span>
                    <span className="font-semibold text-rose-600 text-right">{op.middlemanCommissionRate}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Délai pose :</span>
                    <span className="font-medium text-slate-800">{op.installationDelay}</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 mb-4 text-xs text-slate-600">
                  <strong className="text-slate-800 block mb-1">Notre avis synthétique :</strong>
                  {op.strengthsSummary}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={`/operateurs/${op.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
                >
                  Lire l&apos;audit complet {op.shortName}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Global Arbitrage Banner */}
        <section className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white my-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold mb-3">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              Comparateur Direct Artisans IRVE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Évitez la surcommission des grands réseaux
            </h2>
            <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
              Pourquoi payer 30 % de plus pour une marque alors que le même électricien certifié IRVE de votre département peut intervenir en direct ? Comparez gratuitement 3 devis locaux sans intermédiaire.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl max-w-3xl mx-auto relative z-10">
            <LeadForm domain="expertbornerecharge.com" city="France" targetType="MIXED" />
          </div>
        </section>
      </main>

      <Footer config={hubConfig as any} />
    </div>
  );
}
