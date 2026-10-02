import { Metadata } from "next";
import Link from "next/link";
import { OPERATORS } from "@/data/operators";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ShieldCheck, Zap, ArrowRight, Star, Building2, Home, Scale, Award, Info, AlertTriangle, TrendingDown, Cpu } from "lucide-react";

import { ogImageUrl } from "@/lib/seo-meta";

const hubOgImage = ogImageUrl({
  q: "Opérateurs Recharge",
  sub: "Audit indépendant des 14 grands réseaux IRVE 2026 : avis, tarifs et marges",
  badge: "AUDIT OPÉRATEURS 2026",
});

export const metadata: Metadata = {
  title: "Avis & Tarifs des Opérateurs de Recharge 2026 : Le Comparatif Indépendant",
  description: "ChargeGuru, IZI by EDF, Zeplug, Waat, TotalEnergies... Décryptage des offres, audit des marges d'intermédiaire et arbitrage pour éviter les surcommissions.",
  alternates: {
    canonical: "https://expertbornerecharge.com/operateurs",
  },
  openGraph: {
    title: "Avis & Tarifs des Opérateurs de Recharge 2026 : Le Comparatif Indépendant",
    description: "ChargeGuru, IZI by EDF, Zeplug, Waat... Audit des marges d'intermédiaire et devis directs d'électriciens IRVE.",
    url: "https://expertbornerecharge.com/operateurs",
    siteName: "Expert Borne Recharge",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: hubOgImage,
        width: 1200,
        height: 630,
        alt: "Opérateurs de bornes de recharge 2026",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Avis & Tarifs des Opérateurs de Recharge 2026 : Le Comparatif Indépendant",
    description: "ChargeGuru, IZI by EDF, Zeplug, Waat... Audit des marges d'intermédiaire.",
    images: [hubOgImage],
  },
  robots: { index: true, follow: true }
};

export default function OperateursHubPage() {
  const hubConfig = getHubConfig();

  const breadcrumbs = [
    { name: "Accueil", href: "/" },
    { name: "Opérateurs & Réseaux Nationaux", href: "/operateurs" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://expertbornerecharge.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Opérateurs & Réseaux Nationaux",
        "item": "https://expertbornerecharge.com/operateurs"
      }
    ]
  };

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Pourquoi passer par un électricien IRVE direct plutôt qu'un grand opérateur national ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les grands opérateurs nationaux (ChargeGuru, IZI by EDF, Zeplug) sous-traitent l'intervention à des électriciens IRVE locaux tout en prélevant une marge commerciale de 25 % à 42 %. En sollicitant directement un installateur IRVE indépendant local, vous réalisez une économie moyenne de 300 € à 650 € pour la même prestation et le même matériel garanti."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est le délai moyen d'installation d'une borne chez les opérateurs ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le délai varie de 2 à 4 semaines chez les opérateurs en maison individuelle, contre 3 à 6 mois en copropriété avec vote en AG. En direct avec un artisan IRVE local, la pose peut intervenir sous 5 à 10 jours ouvrés."
        }
      },
      {
        "@type": "Question",
        "name": "Tous les opérateurs permettent-ils de bénéficier du crédit d'impôt de 500 € ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, tant que la fourniture et la pose sont facturées par une entreprise qualifiée IRVE et que la borne installée intègre un système de pilotage énergétique intelligent (norme NF EN 61851-1)."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Header isHub={true} variant="default" themeColor="blue" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto my-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase mb-4">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            Audit Indépendant 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
            Les Grands Opérateurs de Recharge au Crible
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            ChargeGuru, IZI by EDF, Zeplug, Waat, TotalEnergies, Bornes Solutions... Nous analysons en toute transparence leurs grilles tarifaires, les marges d&apos;intermédiation prélevées sur les artisans, et vous donnons les clés pour arbitrer.
          </p>

          {/* Quick Cross-Nav Bar */}
          <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold mb-6">
            <Link
              href="/marques"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 shadow-sm transition"
            >
              <Cpu className="w-4 h-4 text-blue-600" />
              Voir les Bornes & Matériels testés →
            </Link>
            <Link
              href="/comparatifs"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 shadow-sm transition"
            >
              <Scale className="w-4 h-4 text-indigo-600" />
              Voir les Duels & Comparatifs directs →
            </Link>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-left flex items-start gap-3 text-amber-950 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">La règle d&apos;or de l&apos;automobiliste averti :</strong> La quasi-totalité des opérateurs nationaux sous-traitent l&apos;installation à des artisans électriciens IRVE locaux en prélevant <strong>25 % à 40 % de commission</strong>. En passant en direct avec un électricien qualifié de votre secteur, vous obtenez la même garantie pour 300 € à 650 € de moins.
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

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Tarif moyen posé :</span>
                    <span className="font-bold text-slate-900">{op.estimatedBasePrice.split("(")[0]}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Marge réseau estimée :</span>
                    <span className="font-semibold text-rose-700">{op.middlemanCommissionRate.split(" ")[0]} {op.middlemanCommissionRate.split(" ")[1]}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Délai d&apos;installation :</span>
                    <span className="font-medium text-slate-800">{op.installationDelay}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-xl p-3 mb-4 text-xs text-emerald-950 border border-emerald-100">
                  <strong className="text-emerald-900 block mb-0.5">Gain en direct artisan :</strong>
                  {op.arbitrageVerdict.savingsEstimate}
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
