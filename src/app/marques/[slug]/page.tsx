import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HARDWARE_PRODUCTS } from "@/data/hardware";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Zap, ShieldCheck, Star, ExternalLink, ArrowRight, Sun, Cpu, Check, AlertTriangle, CheckCircle, XCircle, Wrench, HelpCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return HARDWARE_PRODUCTS.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = HARDWARE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.brand} ${product.modelName} : Prix, Avis & Fiche Technique 2026`,
    description: `Fiche technique complète ${product.brand} ${product.modelName}. Puissance ${product.maxPowerKw} kW, délestage dynamique TIC Linky, prix d'installation et devis électricien IRVE agréé.`,
    alternates: {
      canonical: `https://expertbornerecharge.com/marques/${product.slug}`,
    },
    robots: { index: true, follow: true }
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = HARDWARE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const hubConfig = getHubConfig();

  const breadcrumbs = [
    { name: "Accueil", href: "/" },
    { name: "Bornes & Marques", href: "/marques" },
    { name: `${product.brand} ${product.modelName}`, href: `/marques/${product.slug}` }
  ];

  // Exact Google Merchant & Product Rich Results Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.brand} ${product.modelName}`,
    "image": `https://expertbornerecharge.com/images/products/${product.slug}.jpg`,
    "description": `${product.tagline}. Puissance ${product.maxPowerKw} kW, ${product.voltage}, connecteur ${product.connectorType}.`,
    "sku": `IRVE-${product.slug.toUpperCase()}`,
    "mpn": product.slug,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "price": product.estimatedHardwarePrice.replace(/[^0-9]/g, "").slice(0, 3) || "650",
      "priceCurrency": "EUR",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": product.affiliateStore
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0.00",
          "currency": "EUR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "FR"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "d"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 4,
            "unitCode": "d"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "FR",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 14,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": {
      "@type": "Review",
      "author": {
        "@type": "Organization",
        "name": "Expert Borne Recharge"
      },
      "datePublished": "2026-01-15",
      "reviewBody": product.verdict,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": product.rating,
        "bestRating": "5"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": product.faq.map((item) => ({
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mt-6 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {product.brand} · {product.category}
            </span>
            <div className="flex items-center text-amber-500 font-bold text-sm bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1.5" />
              {product.rating} / 5 <span className="text-xs font-normal text-slate-500 ml-1.5">({product.reviewCount} avis certifiés)</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {product.brand} {product.modelName} : Fiche Technique, Prix & Avis (2026)
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            {product.tagline}. Retrouvez l&apos;ensemble des caractéristiques électriques (ampérage, puissance de {product.maxPowerKw} kW, gestion du délestage dynamique), les conditions de conformité NF C 15-100 et le chiffrage de pose par un électricien IRVE qualifié.
          </p>

          {/* Dual Action CTA Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-b sm:border-b-0 sm:border-r border-slate-200 pb-4 sm:pb-0 sm:pr-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Option 1 : Matériel seul</span>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">{product.estimatedHardwarePrice}</div>
                <p className="text-xs text-slate-500 mb-3">Acheter la borne nue pour livraison à domicile</p>
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  Commander sur {product.affiliateStore}
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              <div className="sm:pl-2">
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide block mb-1">Option 2 : Fourniture & Pose IRVE</span>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 mb-1">{product.averageInstalledPrice}</div>
                <p className="text-xs text-slate-500 mb-3">Éligible crédit d&apos;impôt 500 € et TVA 5,5 %</p>
                <a
                  href="#devis-pose"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  Demander 3 devis de pose IRVE
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications Matrix */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-blue-600" />
            Spécifications Techniques Détaillées
          </h2>

          <div className="divide-y divide-slate-100 text-sm">
            <div className="py-3 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Puissance maximale</span>
              <strong className="text-slate-900">{product.maxPowerKw} kW (Réglable de 1,4 à {product.maxPowerKw} kW)</strong>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Intensité maximale</span>
              <strong className="text-slate-900">{product.maxCurrentAmps} Ampères</strong>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Type d&apos;alimentation</span>
              <span className="text-slate-900 font-semibold">{product.voltage}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Type de prise / connecteur</span>
              <span className="text-slate-900 font-semibold text-right max-w-xs">{product.connectorType}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Délestage dynamique</span>
              <span className="text-slate-900 font-semibold text-right max-w-xs">{product.dynamicLoadShedding}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Compatibilité panneaux solaires</span>
              <span className="text-slate-900 font-semibold text-right max-w-xs">{product.solarCompatibility}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Indice de protection & résistance</span>
              <strong className="text-slate-900">{product.ipRating}</strong>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Connectivité & Pilotage</span>
              <span className="text-slate-900 font-semibold">{product.connectivity.join(", ")}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Protections au tableau requises</span>
              <span className="text-slate-900 font-semibold text-right max-w-xs">{product.protectionRequired}</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <span className="text-slate-500 font-medium">Aides & Fiscalité</span>
              <span className="text-emerald-700 font-bold">Crédit d&apos;impôt 500 € + TVA 5,5 %</span>
            </div>
          </div>
        </section>

        {/* Suitable Vehicles */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Véhicules Électriques Recommandés
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            La borne {product.brand} {product.modelName} est particulièrement adaptée aux modèles suivants :
          </p>
          <div className="flex flex-wrap gap-2">
            {product.suitableVehicles.map((car, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold">
                {car}
              </span>
            ))}
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 text-emerald-600">
              <CheckCircle className="w-5 h-5" />
              Points forts constatés
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {product.pros.map((p, idx) => (
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
              Points à surveiller
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {product.cons.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Expert Verdict */}
        <section className="bg-blue-50/70 rounded-2xl p-6 sm:p-8 border border-blue-100 mb-10">
          <h2 className="text-xl font-bold text-blue-950 mb-2">
            Notre Avis d&apos;Expert sur la {product.brand} {product.modelName}
          </h2>
          <p className="text-slate-700 text-base leading-relaxed">
            {product.verdict}
          </p>
        </section>

        {/* LeadForm Anchor */}
        <section id="devis-pose" className="bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl text-white mb-12 scroll-mt-20">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-semibold mb-3">
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              Devis Pose IRVE Agréée
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Faites Poser Votre {product.brand} {product.modelName}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Comparez 3 installateurs qualifiés IRVE de votre département. Bénéficiez des 500 € de crédit d&apos;impôt, de la garantie décennale et d&apos;un raccordement certifié conforme au tableau électrique.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl max-w-2xl mx-auto">
            <LeadForm domain="expertbornerecharge.com" city="France" targetType="MIXED" />
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Questions Fréquentes
          </h2>
          <div className="space-y-4">
            {product.faq.map((item, idx) => (
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

        {/* Cross Link to other products */}
        <section className="mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Autres modèles et bornes populaires
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {HARDWARE_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 8).map((other) => (
              <Link
                key={other.slug}
                href={`/marques/${other.slug}`}
                className="p-3 bg-white border border-slate-200 rounded-xl text-center hover:border-blue-500 hover:text-blue-600 transition-colors text-xs font-semibold text-slate-700"
              >
                {other.brand} {other.modelName}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer config={hubConfig as any} />
    </div>
  );
}
