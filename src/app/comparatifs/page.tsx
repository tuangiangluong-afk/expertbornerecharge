import { Metadata } from "next";
import Link from "next/link";
import { DUELS } from "@/data/comparatives";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Scale, ArrowRight, CheckCircle, Zap, Building2, Cpu } from "lucide-react";

import { ogImageUrl } from "@/lib/seo-meta";

const comparatifsOgImage = ogImageUrl({
  q: "Duels & Comparatifs",
  sub: "Face-à-face impartiaux : 17 duels opérateurs et bornes de recharge décryptés",
  badge: "COMPARATIF 2026",
});

export const metadata: Metadata = {
  title: "Comparatifs & Duels Bornes de Recharge 2026 : Le Face-à-Face",
  description: "ChargeGuru vs IZI by EDF, Zeplug vs Waat, Tesla vs Wallbox, Schneider vs Hager... Nos duels comparatifs complets avec matrices de décision pour choisir le bon matériel.",
  alternates: {
    canonical: "https://expertbornerecharge.com/comparatifs",
  },
  openGraph: {
    title: "Comparatifs & Duels Bornes de Recharge 2026 : Le Face-à-Face",
    description: "Analyses comparatives critère par critère et matrices de décision neutres pour bien choisir son installateur ou sa borne.",
    url: "https://expertbornerecharge.com/comparatifs",
    siteName: "Expert Borne Recharge",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: comparatifsOgImage,
        width: 1200,
        height: 630,
        alt: "Comparatifs et Duels Bornes de Recharge 2026",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparatifs & Duels Bornes de Recharge 2026",
    description: "ChargeGuru vs IZI, Zeplug vs Waat, Tesla vs Wallbox... Le face-à-face.",
    images: [comparatifsOgImage],
  },
  robots: { index: true, follow: true }
};

export default function ComparatifsHubPage() {
  const hubConfig = getHubConfig();

  const breadcrumbs = [
    { name: "Accueil", href: "/" },
    { name: "Comparatifs & Duels", href: "/comparatifs" }
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
        "name": "Comparatifs & Duels",
        "item": "https://expertbornerecharge.com/comparatifs"
      }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Comparatifs et Duels Face-à-Face Bornes de Recharge 2026",
    "description": "Les grands duels du marché de la recharge électrique analysés critère par critère.",
    "itemListElement": DUELS.map((duel, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": duel.title,
      "url": `https://expertbornerecharge.com/comparatif/${duel.slug}`,
      "description": duel.directAnswerSummary
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment départager deux bornes ou deux opérateurs de recharge ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les 4 critères déterminants sont : la gestion du délestage dynamique (liaison TIC Linky ou pince ampèremétrique), la compatibilité solaire si vous avez des panneaux, le coût total pose comprise avec qualification IRVE, et l'absence de verrouillage propriétaire sur l'application mobile."
        }
      },
      {
        "@type": "Question",
        "name": "Les duels comparent-ils les prix réels ou seulement le catalogue matériel ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos benchmarks comparent à la fois le coût du matériel nu et le budget réel tout compris (fourniture + pose certifiée IRVE + protections électriques différentielles + délestage), déduction faite du crédit d'impôt de 500 € et de la TVA réduite à 5,5 %."
        }
      },
      {
        "@type": "Question",
        "name": "Peut-on faire installer une borne achetée soi-même sur internet ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Attention : si vous achetez le matériel vous-même et ne payez que la main d'œuvre à un artisan, vous perdez le bénéfice du taux de TVA réduit à 5,5 % sur le matériel (facturé à 20 %) et vous compliquez la prise en charge du crédit d'impôt de 500 €. Le devis global matériel + pose par un installateur IRVE est systématiquement plus avantageux fiscalement."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Header isHub={true} variant="default" themeColor="blue" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <section className="text-center max-w-3xl mx-auto my-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase mb-4">
            <Scale className="w-3.5 h-3.5" />
            Duels Directs & Benchmarks
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
            Les Grands Face-à-Face de la Recharge
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Opérateurs de copropriété, installateurs nationaux ou matériels phares : nous comparons les meilleures solutions du marché critère par critère pour vous aider à trancher.
          </p>

          {/* Quick Cross-Nav Bar */}
          <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold mb-6">
            <Link
              href="/operateurs"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 shadow-sm transition"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              Voir les Opérateurs & Réseaux nationaux →
            </Link>
            <Link
              href="/marques"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 shadow-sm transition"
            >
              <Cpu className="w-4 h-4 text-blue-600" />
              Voir les Bornes & Matériels testés →
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
          {DUELS.map((duel) => (
            <article 
              key={duel.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {duel.entityA.type} vs {duel.entityB.type}
                  </span>
                  <span className="font-medium text-blue-600">Mise à jour 2026</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  <Link href={`/comparatif/${duel.slug}`} className="hover:text-blue-600 transition-colors">
                    {duel.h1}
                  </Link>
                </h2>

                <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
                  <strong className="block text-xs uppercase font-bold text-slate-500 mb-1">
                    Réponse Directe IA :
                  </strong>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {duel.directAnswerSummary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-6">
                  <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100">
                    <strong className="block text-blue-950 font-bold mb-1">{duel.entityA.name}</strong>
                    <span className="text-slate-600 block">{duel.entityA.priceEst}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-50/60 border border-indigo-100">
                    <strong className="block text-indigo-950 font-bold mb-1">{duel.entityB.name}</strong>
                    <span className="text-slate-600 block">{duel.entityB.priceEst}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={`/comparatif/${duel.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
                >
                  Lire le face-à-face complet
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* LeadForm CTA */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white my-16 shadow-xl">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-semibold mb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              Arbitrage Impartial & Devis IRVE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Besoin d&apos;un Avis Neutre pour Votre Projet ?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Ne signez rien sans avoir comparé. Obtenez 3 devis d&apos;artisans électriciens qualifiés IRVE de votre département et choisissez la meilleure option au juste prix.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl max-w-3xl mx-auto">
            <LeadForm domain="expertbornerecharge.com" city="France" targetType="MIXED" />
          </div>
        </section>
      </main>

      <Footer config={hubConfig as any} />
    </div>
  );
}
