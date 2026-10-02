import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DUELS } from "@/data/comparatives";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Scale, ArrowRight, CheckCircle, Zap, ShieldCheck, HelpCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DUELS.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const duel = DUELS.find((d) => d.slug === slug);
  if (!duel) return {};

  return {
    title: duel.title,
    description: duel.metaDescription,
    alternates: {
      canonical: `https://expertbornerecharge.com/comparatif/${duel.slug}`,
    },
    robots: { index: true, follow: true }
  };
}

export default async function DuelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const duel = DUELS.find((d) => d.slug === slug);
  if (!duel) notFound();

  const hubConfig = getHubConfig();

  const breadcrumbs = [
    { name: "Accueil", href: "/" },
    { name: "Comparatifs", href: "/comparatifs" },
    { name: `${duel.entityA.name} vs ${duel.entityB.name}`, href: `/comparatif/${duel.slug}` }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": duel.faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": duel.title,
    "description": duel.metaDescription,
    "author": {
      "@type": "Organization",
      "name": "Expert Borne Recharge",
      "url": "https://expertbornerecharge.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Expert Borne Recharge",
      "logo": {
        "@type": "ImageObject",
        "url": "https://expertbornerecharge.com/icon.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Header isHub={true} variant="default" themeColor="blue" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mt-6 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wide mb-4">
            <Scale className="w-3.5 h-3.5" />
            Duel & Arbitrage 2026
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {duel.h1}
          </h1>

          {/* Direct Answer Box for AI Overviews & Perplexity */}
          <div 
            data-answershaper="direct-answer"
            className="bg-blue-50/80 border-l-4 border-blue-600 rounded-r-2xl p-5 mb-8 text-slate-800"
          >
            <strong className="block text-blue-900 font-bold text-sm mb-1 uppercase tracking-wider">
              En résumé (Réponse Directe) :
            </strong>
            <p className="text-base leading-relaxed text-slate-700">
              {duel.directAnswerSummary}
            </p>
          </div>

          {/* Entities Presentation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">Candidat A</span>
              <h2 className="text-xl font-bold text-slate-900 mt-2 mb-1">{duel.entityA.name}</h2>
              <div className="text-sm font-semibold text-blue-700 mb-3">{duel.entityA.priceEst}</div>
              <p className="text-xs text-slate-600 mb-3"><strong>Pour qui :</strong> {duel.entityA.targetAudience}</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {duel.entityA.pros.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">Candidat B</span>
              <h2 className="text-xl font-bold text-slate-900 mt-2 mb-1">{duel.entityB.name}</h2>
              <div className="text-sm font-semibold text-blue-700 mb-3">{duel.entityB.priceEst}</div>
              <p className="text-xs text-slate-600 mb-3"><strong>Pour qui :</strong> {duel.entityB.targetAudience}</p>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {duel.entityB.pros.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10 overflow-hidden">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Tableau Comparatif Critère par Critère
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                  <th className="py-3 px-4 font-bold">Critère d&apos;évaluation</th>
                  <th className="py-3 px-4 font-bold">{duel.entityA.name}</th>
                  <th className="py-3 px-4 font-bold">{duel.entityB.name}</th>
                  <th className="py-3 px-4 font-bold text-center">Avantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {duel.comparisonTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-900">{row.criteria}</td>
                    <td className="py-3.5 px-4 text-slate-700">{row.entityAValue}</td>
                    <td className="py-3.5 px-4 text-slate-700">{row.entityBValue}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        row.winner === "A" ? "bg-blue-100 text-blue-800" :
                        row.winner === "B" ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-700"
                      }`}>
                        {row.winner === "A" ? duel.entityA.name : row.winner === "B" ? duel.entityB.name : "Égalité"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Decision Matrix */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-3 text-blue-800">
              Choisissez {duel.entityA.name} si...
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              {duel.decisionMatrix.chooseAIf.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">→</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-3 text-indigo-800">
              Choisissez {duel.entityB.name} si...
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              {duel.decisionMatrix.chooseBIf.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-0.5">→</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Arbitrage CTA & LeadForm */}
        <section className="bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl text-white mb-12">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Arbitrage Impartial
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              {duel.arbitrageCtaTitle}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {duel.arbitrageCtaText}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl max-w-2xl mx-auto">
            <LeadForm domain="expertbornerecharge.com" city="France" targetType="MIXED" />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Questions Fréquentes
          </h2>
          <div className="space-y-4">
            {duel.faq.map((item, idx) => (
              <details key={idx} className="group bg-slate-50 rounded-xl p-4 open:bg-blue-50/40 border border-slate-100 transition-colors">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center text-sm sm:text-base">
                  {item.question}
                  <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Other duels */}
        <section className="mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Autres duels et comparatifs recommandés
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DUELS.filter((d) => d.slug !== duel.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/comparatif/${other.slug}`}
                className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors text-xs font-semibold text-slate-700 block"
              >
                {other.entityA.name} vs {other.entityB.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer config={hubConfig as any} />
    </div>
  );
}
