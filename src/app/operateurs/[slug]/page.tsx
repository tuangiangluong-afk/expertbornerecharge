import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { OPERATORS } from "@/data/operators";
import { HARDWARE_PRODUCTS } from "@/data/hardware";
import { DUELS } from "@/data/comparatives";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ShieldCheck, Zap, ArrowRight, Star, Building2, Home, Scale, Award, Info, AlertTriangle, TrendingDown, CheckCircle, XCircle, Clock, FileText, Cpu } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return OPERATORS.map((op) => ({
    slug: op.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const operator = OPERATORS.find((o) => o.slug === slug);
  if (!operator) return {};

  const title = `Avis ${operator.name} (2026) : Tarifs, Coûts Cachés & Devis Pose IRVE`;
  const description = `Avis complet et audit indépendant sur ${operator.name} en 2026. Marge d'intermédiaire (${operator.middlemanCommissionRate}), prix moyen (${operator.estimatedBasePrice}), avis clients vérifiés et arbitrage direct électricien IRVE.`;
  const url = `https://expertbornerecharge.com/operateurs/${operator.slug}`;

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
          url: "https://expertbornerecharge.com/icon.png",
          width: 512,
          height: 512,
          alt: `Audit Avis ${operator.name} 2026`,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://expertbornerecharge.com/icon.png"],
    },
    robots: { index: true, follow: true }
  };
}

export default async function OperatorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const operator = OPERATORS.find((o) => o.slug === slug);
  if (!operator) notFound();

  const hubConfig = getHubConfig();

  const breadcrumbs = [
    { name: "Accueil", href: "/" },
    { name: "Opérateurs", href: "/operateurs" },
    { name: operator.name, href: `/operateurs/${operator.slug}` }
  ];

  // Match installed hardware models
  const installedHardware = (operator.installedHardwareSlugs || [])
    .map((hSlug) => HARDWARE_PRODUCTS.find((p) => p.slug === hSlug))
    .filter(Boolean);

  // Match associated duels
  const associatedDuels = DUELS.filter(
    (d) =>
      (operator.associatedDuelSlugs || []).includes(d.slug) ||
      d.entityA.slug === operator.slug ||
      d.entityB.slug === operator.slug
  );

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": operator.name,
        "item": `https://expertbornerecharge.com/operateurs/${operator.slug}`
      }
    ]
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": operator.name,
    "url": `https://expertbornerecharge.com/operateurs/${operator.slug}`,
    "description": operator.tagline,
    "priceRange": operator.estimatedBasePrice,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": operator.rating,
      "reviewCount": operator.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Organization",
      "name": operator.name
    },
    "author": {
      "@type": "Organization",
      "name": "Expert Borne Recharge",
      "url": "https://expertbornerecharge.com"
    },
    "datePublished": "2026-01-15",
    "dateModified": "2026-03-25",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": operator.rating,
      "bestRating": "5"
    },
    "reviewBody": operator.recommendation
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": operator.faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Header isHub={true} variant="default" themeColor="blue" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Header */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mt-6 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {operator.category}
            </span>
            <div className="flex items-center text-amber-500 font-bold text-sm bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1.5" />
              {operator.rating} / 5 <span className="text-xs font-normal text-slate-500 ml-1.5">({operator.reviewCount} avis vérifiés)</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Avis & Tarifs {operator.name} (2026) : L&apos;Audit Indépendant
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            {operator.tagline}. Retrouvez notre décryptage complet : prix réel au mètre carré ou au point de charge, délais d&apos;installation constatés, modèle contractuel et calcul d&apos;arbitrage en direct.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100 text-center">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block">Tarif estimé</span>
              <strong className="text-sm sm:text-base font-bold text-slate-900">{operator.estimatedBasePrice}</strong>
            </div>
            <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-100">
              <span className="text-xs text-rose-700 block">Marge intermédiaire</span>
              <strong className="text-sm sm:text-base font-bold text-rose-800">{operator.middlemanCommissionRate}</strong>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block">Délai moyen</span>
              <strong className="text-sm sm:text-base font-bold text-slate-900">{operator.installationDelay}</strong>
            </div>
            <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-100">
              <span className="text-xs text-emerald-700 block">Gain en direct</span>
              <strong className="text-sm sm:text-base font-bold text-emerald-800">{operator.arbitrageVerdict.savingsEstimate.split(" ")[0]} {operator.arbitrageVerdict.savingsEstimate.split(" ")[1]}</strong>
            </div>
          </div>
        </section>

        {/* The Arbitrage Verdict Box */}
        <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg mb-10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-800 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">L&apos;Arbitrage de notre expert : Faut-il signer avec {operator.shortName} ?</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                {operator.arbitrageVerdict.directQuotePitch}
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                {operator.arbitrageVerdict.savingsEstimate}
              </div>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 text-emerald-600">
              <CheckCircle className="w-5 h-5" />
              Ce qu&apos;on aime chez {operator.shortName}
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {operator.pros.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 text-rose-600">
              <XCircle className="w-5 h-5" />
              Les limites & points de vigilance
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {operator.cons.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Associated Duels Callout If Any */}
        {associatedDuels.length > 0 && (
          <section className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-indigo-700 flex-shrink-0 mt-1" />
              <div className="w-full">
                <h3 className="text-base font-bold text-indigo-950 mb-1">
                  Face-à-Face Comparatif : {operator.shortName} au banc d&apos;essai
                </h3>
                <p className="text-xs text-indigo-800 mb-4">
                  Découvrez nos duels directs avec tableau comparatif critère par critère et matrice de décision :
                </p>
                <div className="space-y-2">
                  {associatedDuels.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/comparatif/${d.slug}`}
                      className="block p-3.5 rounded-xl bg-white border border-indigo-100 hover:border-indigo-400 hover:shadow-sm transition group"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs sm:text-sm font-bold text-indigo-950 group-hover:text-indigo-600 transition">
                          {d.title}
                        </strong>
                        <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {d.directAnswerSummary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Installed Hardware Cross-linking */}
        {installedHardware.length > 0 && (
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                Bornes & Matériels Recommandés avec {operator.shortName}
              </h2>
              <Link href="/marques" className="text-xs font-semibold text-blue-600 hover:underline">
                Voir toutes les bornes →
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Cet opérateur s&apos;appuie sur du matériel certifié conforme aux normes NF C 15-100. Découvrez les fiches techniques complètes de ces bornes :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {installedHardware.map((hw: any) => (
                <Link
                  key={hw.slug}
                  href={`/marques/${hw.slug}`}
                  className="group p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 hover:shadow-sm transition flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-28 mb-3 bg-white rounded-lg p-2 border border-slate-100 overflow-hidden">
                      <Image
                        src={hw.image}
                        alt={`${hw.brand} ${hw.modelName}`}
                        fill
                        className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <strong className="block text-slate-900 font-bold text-sm mb-0.5 group-hover:text-blue-600 transition">
                      {hw.brand} {hw.modelName}
                    </strong>
                    <span className="text-xs text-blue-700 font-semibold block mb-1">
                      {hw.maxPowerKw} kW · {hw.estimatedHardwarePrice}
                    </span>
                    <span className="text-xs text-slate-500 line-clamp-2">
                      {hw.tagline}
                    </span>
                  </div>
                  <div className="mt-3 text-xs font-bold text-blue-600 inline-flex items-center gap-1">
                    Fiche & avis <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Hidden Costs & Contractual Fine Print */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            Coûts cachés & Petites lignes contractuelles
          </h2>
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-amber-900 text-sm mb-6 leading-relaxed">
            {operator.hiddenCostsWarning}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="text-slate-900 block mb-1">Durée d&apos;engagement :</strong>
              <span className="text-slate-600">{operator.contractTerms.commitment}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="text-slate-900 block mb-1">Entretien & Maintenance :</strong>
              <span className="text-slate-600">{operator.contractTerms.maintenance}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <strong className="text-slate-900 block mb-1">Résiliation :</strong>
              <span className="text-slate-600">{operator.contractTerms.cancellation}</span>
            </div>
          </div>
        </section>

        {/* Full Overview & Review Body */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 not-prose mb-4">
            Analyse Détaillée : Notre Avis d&apos;Expert
          </h2>
          <p className="text-base text-slate-700 leading-relaxed mb-4">
            {operator.overview}
          </p>
          <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-100 not-prose text-sm text-blue-950">
            <strong className="block text-blue-900 font-bold mb-1">Verdict et Recommandation :</strong>
            {operator.recommendation}
          </div>
        </section>

        {/* LeadForm Direct Arbitration CTA */}
        <section className="bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl text-white mb-12">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Mise en Concurrence Directe
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Comparez {operator.shortName} avec 3 Installateurs IRVE Locaux
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Obtenez des devis directs de techniciens qualifiés IRVE de votre département. Évitez les frais de structure des plateformes nationales et économisez jusqu&apos;à 35 % sur votre facture.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl max-w-2xl mx-auto">
            <LeadForm domain="expertbornerecharge.com" city="France" targetType="MIXED" />
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Questions Fréquentes sur {operator.name}
          </h2>
          <div className="space-y-4">
            {operator.faq.map((item, idx) => (
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

        {/* Cross-linking to other operators */}
        <section className="mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Découvrez aussi les autres réseaux nationaux
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {OPERATORS.filter((o) => o.slug !== operator.slug).slice(0, 8).map((other) => (
              <Link
                key={other.slug}
                href={`/operateurs/${other.slug}`}
                className="p-3 bg-white border border-slate-200 rounded-xl text-center hover:border-blue-500 hover:text-blue-600 transition-colors text-xs font-semibold text-slate-700"
              >
                Avis {other.shortName}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer config={hubConfig as any} />
    </div>
  );
}
