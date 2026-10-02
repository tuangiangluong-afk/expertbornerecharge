import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { DUELS } from "@/data/comparatives";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Scale, Zap, ShieldCheck, ArrowRight, CheckCircle, XCircle, FileText } from "lucide-react";
import { ogImageUrl } from "@/lib/seo-meta";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getLegacyComparatifs(): any[] {
  const results: any[] = [];
  try {
    const compPath = path.join(process.cwd(), "src", "data", "comparatifs.json");
    if (fs.existsSync(compPath)) {
      results.push(...JSON.parse(fs.readFileSync(compPath, "utf-8")));
    }
  } catch (e) {
    console.error("Failed to load legacy comparatifs JSONs", e);
  }
  return results;
}

export async function generateStaticParams() {
  const duelSlugs = DUELS.map((d) => d.slug);
  const legacySlugs = getLegacyComparatifs().map((item: any) => item.slug).filter(Boolean);
  const allSlugs = Array.from(new Set([...duelSlugs, ...legacySlugs]));

  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const duel = DUELS.find((d) => d.slug === slug);
  if (duel) {
    const title = duel.title;
    const description = duel.metaDescription;
    const url = `https://expertbornerecharge.com/comparatif/${duel.slug}`;
    const ogCardUrl = ogImageUrl({
      q: `${duel.entityA.name} vs ${duel.entityB.name}`,
      sub: "Comparatif technique, tarifs, pose IRVE et matrice de décision 2026",
      badge: "DUEL FACE-À-FACE 2026",
    });

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "Expert Borne Recharge",
        locale: "fr_FR",
        type: "article",
        images: [
          {
            url: ogCardUrl,
            width: 1200,
            height: 630,
            alt: duel.title,
          }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogCardUrl],
      },
      robots: { index: true, follow: true }
    };
  }

  const legacy = getLegacyComparatifs().find((item: any) => item.slug === slug);
  if (legacy) {
    const title = legacy.title;
    const description = legacy.meta_description;
    const url = `https://expertbornerecharge.com/comparatif/${legacy.slug}`;
    const ogCardUrl = ogImageUrl({
      q: legacy.h1 || legacy.title,
      sub: "Guide comparatif et analyse technique IRVE 2026",
      badge: "COMPARATIF EXPERT",
    });

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "Expert Borne Recharge",
        locale: "fr_FR",
        type: "article",
        images: [
          {
            url: ogCardUrl,
            width: 1200,
            height: 630,
            alt: legacy.title,
          }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogCardUrl],
      },
      robots: { index: true, follow: true }
    };
  }

  return {};
}

export default async function DuelOrComparativeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const duel = DUELS.find((d) => d.slug === slug);
  const legacy = !duel ? getLegacyComparatifs().find((item: any) => item.slug === slug) : null;

  if (!duel && !legacy) notFound();

  const hubConfig = getHubConfig();

  // ==========================================
  // CASE 1: RICH DUEL FROM DUELS
  // ==========================================
  if (duel) {
    const breadcrumbs = [
      { name: "Accueil", href: "/" },
      { name: "Comparatifs", href: "/comparatifs" },
      { name: `${duel.entityA.name} vs ${duel.entityB.name}`, href: `/comparatif/${duel.slug}` }
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${duel.entityA.name} vs ${duel.entityB.name}`,
          "item": `https://expertbornerecharge.com/comparatif/${duel.slug}`
        }
      ]
    };

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
      "datePublished": duel.publishedAt,
      "dateModified": duel.updatedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://expertbornerecharge.com/comparatif/${duel.slug}`
      },
      "image": ogImageUrl({
        q: `${duel.entityA.name} vs ${duel.entityB.name}`,
        sub: "Comparatif technique, tarifs, pose IRVE et matrice de décision 2026",
        badge: "DUEL FACE-À-FACE 2026",
      }),
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

    const tableSchema = {
      "@context": "https://schema.org",
      "@type": "Table",
      "about": `${duel.entityA.name} vs ${duel.entityB.name}`,
      "name": `Tableau comparatif : ${duel.entityA.name} contre ${duel.entityB.name}`
    };

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
        <Header isHub={true} variant="default" themeColor="blue" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tableSchema) }} />

        <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          {/* Hero Card */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mt-6 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wide mb-3">
              <Scale className="w-3.5 h-3.5" />
              Duel & Arbitrage 2026
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium mb-3">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                Duel publié le {new Date(duel.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/60">
                Tarifs vérifiés le {new Date(duel.updatedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {duel.h1}
            </h1>

            {/* AnswerShaper Direct Answer Callout */}
            <div 
              id="reponse-directe"
              className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 mb-8 text-blue-950"
            >
              <strong className="block text-blue-900 font-bold text-sm mb-1 uppercase tracking-wider">
                En résumé (Réponse Directe) :
              </strong>
              <p className="text-base leading-relaxed text-slate-700">
                {duel.directAnswerSummary}
              </p>
            </div>

            {/* Entities Presentation with Cross-linking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">Candidat A</span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2 mb-1">{duel.entityA.name}</h2>
                  <div className="text-sm font-semibold text-blue-700 mb-3">{duel.entityA.priceEst}</div>
                  <p className="text-xs text-slate-600 mb-3"><strong>Pour qui :</strong> {duel.entityA.targetAudience}</p>
                  <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
                    {duel.entityA.pros.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <Link
                    href={duel.entityA.type === "Opérateur" ? `/operateurs/${duel.entityA.slug}` : `/marques/${duel.entityA.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                  >
                    Voir la fiche & avis complet {duel.entityA.name} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">Candidat B</span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2 mb-1">{duel.entityB.name}</h2>
                  <div className="text-sm font-semibold text-blue-700 mb-3">{duel.entityB.priceEst}</div>
                  <p className="text-xs text-slate-600 mb-3"><strong>Pour qui :</strong> {duel.entityB.targetAudience}</p>
                  <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
                    {duel.entityB.pros.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <Link
                    href={duel.entityB.type === "Opérateur" ? `/operateurs/${duel.entityB.slug}` : `/marques/${duel.entityB.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                  >
                    Voir la fiche & avis complet {duel.entityB.name} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
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

          {/* Related Duels (Cross-linking Mesh) */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                Autres Face-à-Face & Duels à Consulter
              </h2>
              <Link href="/comparatifs" className="text-xs font-semibold text-blue-600 hover:underline">
                Voir tous les duels →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DUELS.filter((d) => d.slug !== duel.slug).map((other) => (
                <Link
                  key={other.slug}
                  href={`/comparatif/${other.slug}`}
                  className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition group flex flex-col justify-between"
                >
                  <div>
                    <strong className="block text-slate-900 font-bold text-sm group-hover:text-blue-600 transition mb-1">
                      {other.title}
                    </strong>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {other.directAnswerSummary}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 inline-flex items-center gap-1">
                    Lire le comparatif <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Recommended Expert Guides */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Guides & Réglementation Associés
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Complétez votre réflexion avec nos dossiers techniques et administratifs de référence 2026.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/guides/aides-subventions-borne-recharge"
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Aides de l&apos;État</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-blue-600">
                    Crédit d&apos;impôt 500 € & TVA 5,5%
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Comment financer votre installation et vérifier la qualification IRVE de votre électricien.
                  </p>
                </div>
                <span className="text-xs text-blue-600 font-semibold mt-3 flex items-center gap-1">
                  Lire le guide fiscal →
                </span>
              </Link>

              <Link
                href="/guides/borne-7kw-vs-11kw-prix-installation"
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Dimensionnement</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-blue-600">
                    7,4 kW vs 11 kW vs 22 kW
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Comprendre le monophasé, le triphasé et l&apos;impact sur votre facture d&apos;énergie.
                  </p>
                </div>
                <span className="text-xs text-blue-600 font-semibold mt-3 flex items-center gap-1">
                  Lire le guide puissance →
                </span>
              </Link>

              <Link
                href="/guides/borne-copropriete-droit-a-la-prise-advenir-2026"
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Copropriété</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-blue-600">
                    Droit à la Prise & Advenir
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Les démarches juridiques incontournables face au syndic et au conseil syndical.
                  </p>
                </div>
                <span className="text-xs text-blue-600 font-semibold mt-3 flex items-center gap-1">
                  Lire le guide copro →
                </span>
              </Link>
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
        </main>

        <Footer config={hubConfig as any} />
      </div>
    );
  }

  // ==========================================
  // CASE 2: LEGACY COMPARISON FROM JSON
  // ==========================================
  const breadcrumbs = [
    { name: "Accueil", href: "/" },
    { name: "Comparatifs", href: "/comparatifs" },
    { name: legacy.h1 || legacy.title, href: `/comparatif/${legacy.slug}` }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Header isHub={true} variant="default" themeColor="blue" />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <article className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm mt-6 mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            {legacy.h1 || legacy.title}
          </h1>

          {legacy.introduction ? (
            <div 
              className="prose prose-lg prose-blue max-w-none text-slate-600 mb-8"
              dangerouslySetInnerHTML={{ __html: legacy.introduction }}
            />
          ) : legacy.meta_description ? (
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {legacy.meta_description}
            </p>
          ) : null}

          {legacy.price_estimate && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10 flex items-center justify-between">
              <div>
                <h3 className="text-blue-900 font-bold mb-1">Estimation Tarifaire (2026)</h3>
                <p className="text-blue-700 font-medium">{legacy.price_estimate}</p>
              </div>
              {legacy.rating && (
                <div className="text-right">
                  <div className="flex text-amber-400 text-lg mb-0.5">
                    {"★".repeat(Math.round(legacy.rating))}
                  </div>
                  <p className="text-xs font-semibold text-slate-600">{legacy.rating}/5 Note moyenne</p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-8">
            {(legacy.sections || []).map((section: any, idx: number) => (
              <section key={idx}>
                {section.h2 && (
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                    {section.h2}
                  </h2>
                )}
                {section.content && (
                  <div 
                    className="prose prose-slate max-w-none text-slate-600"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
              </section>
            ))}
          </div>

          {legacy.faq && legacy.faq.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Questions Fréquentes</h2>
              <div className="space-y-4">
                {legacy.faq.map((faqItem: any, idx: number) => (
                  <details key={idx} className="group bg-slate-50 rounded-xl p-4 open:bg-blue-50/40 border border-slate-100 transition-colors">
                    <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center text-sm">
                      {faqItem.question}
                      <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2">▼</span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                      {faqItem.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* LeadForm Section */}
        <section className="bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl text-white mb-12">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Devis Pose IRVE Agréée
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Comparez les Offres pour Votre Projet
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Obtenez jusqu&apos;à 3 devis sans engagement d&apos;électriciens qualifiés IRVE de votre secteur.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl max-w-2xl mx-auto">
            <LeadForm domain="expertbornerecharge.com" city="France" targetType="MIXED" />
          </div>
        </section>
      </main>

      <Footer config={hubConfig as any} />
    </div>
  );
}
