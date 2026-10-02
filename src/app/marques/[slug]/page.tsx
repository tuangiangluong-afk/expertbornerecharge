import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { HARDWARE_PRODUCTS } from "@/data/hardware";
import { OPERATORS } from "@/data/operators";
import { DUELS } from "@/data/comparatives";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Zap, ShieldCheck, Star, ExternalLink, ArrowRight, Sun, Cpu, Check, AlertTriangle, CheckCircle, XCircle, Wrench, HelpCircle, Scale, Building2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getMarquesJsonData(): any[] {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "marques.json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (e) {
    console.error("Failed to load marques.json", e);
  }
  return [];
}

export async function generateStaticParams() {
  const hardwareSlugs = HARDWARE_PRODUCTS.map((prod) => prod.slug);
  const jsonSlugs = getMarquesJsonData().map((item: any) => item.slug);
  const allSlugs = Array.from(new Set([...hardwareSlugs, ...jsonSlugs]));

  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = HARDWARE_PRODUCTS.find((p) => p.slug === slug);

  if (product) {
    const title = `${product.brand} ${product.modelName} : Prix, Avis & Fiche Technique 2026`;
    const description = `Fiche technique complète ${product.brand} ${product.modelName}. Puissance ${product.maxPowerKw} kW, délestage dynamique TIC Linky, prix d'installation et devis électricien IRVE agréé.`;
    const url = `https://expertbornerecharge.com/marques/${product.slug}`;
    const imageUrl = `https://expertbornerecharge.com${product.image}`;

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
            url: imageUrl,
            width: 1024,
            height: 1024,
            alt: `${product.brand} ${product.modelName}`,
          }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
      robots: { index: true, follow: true }
    };
  }

  const legacyItem = getMarquesJsonData().find((m: any) => m.slug === slug);
  if (legacyItem) {
    const title = legacyItem.title;
    const description = legacyItem.meta_description;
    const url = `https://expertbornerecharge.com/marques/${legacyItem.slug}`;

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
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      robots: { index: true, follow: true }
    };
  }

  return {};
}

export default async function ProductOrBrandDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = HARDWARE_PRODUCTS.find((p) => p.slug === slug);
  const legacyItem = !product ? getMarquesJsonData().find((m: any) => m.slug === slug) : null;

  if (!product && !legacyItem) notFound();

  const hubConfig = getHubConfig();

  // ==========================================
  // CASE 1: SPECIFIC HARDWARE PRODUCT
  // ==========================================
  if (product) {
    const breadcrumbs = [
      { name: "Accueil", href: "/" },
      { name: "Bornes & Marques", href: "/marques" },
      { name: `${product.brand} ${product.modelName}`, href: `/marques/${product.slug}` }
    ];

    // Find associated duels
    const associatedDuels = DUELS.filter(
      (d) =>
        (product.associatedDuelSlugs || []).includes(d.slug) ||
        d.entityA.slug === product.slug ||
        d.entityB.slug === product.slug
    );

    // Find associated operators
    const associatedOperators = (product.associatedOperatorSlugs || [])
      .map((opSlug) => OPERATORS.find((o) => o.slug === opSlug))
      .filter(Boolean);

    // Find sibling products
    const siblingProducts = HARDWARE_PRODUCTS.filter(
      (p) => p.slug !== product.slug && (p.category === product.category || p.brand === product.brand)
    ).slice(0, 3);

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
          "name": "Bornes & Marques",
          "item": "https://expertbornerecharge.com/marques"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${product.brand} ${product.modelName}`,
          "item": `https://expertbornerecharge.com/marques/${product.slug}`
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${product.brand} ${product.modelName}`,
      "image": `https://expertbornerecharge.com${product.image}`,
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
          "name": "Expert Borne Recharge",
          "url": "https://expertbornerecharge.com"
        },
        "datePublished": "2026-01-15",
        "dateModified": "2026-03-25",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          {/* Hero Card */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mt-6 mb-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-64 h-64 rounded-2xl bg-slate-100 p-2 border border-slate-200 overflow-hidden flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={`${product.brand} ${product.modelName}`}
                    width={256}
                    height={256}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    {product.brand} · {product.category}
                  </span>
                  <div className="flex items-center text-amber-500 font-bold text-sm bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1.5" />
                    {product.rating} / 5 <span className="text-xs font-normal text-slate-500 ml-1">({product.reviewCount} avis certifiés)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                  {product.brand} {product.modelName}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
                  {product.tagline}
                </p>

                {/* Price Matrix */}
                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-0.5">Matériel seul (en ligne) :</span>
                    <strong className="text-lg font-bold text-blue-700">{product.estimatedHardwarePrice}</strong>
                    <span className="text-xs text-slate-400 block mt-0.5">{product.affiliateStore}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-xs text-emerald-800 block mb-0.5">Fourniture + Pose IRVE :</span>
                    <strong className="text-lg font-bold text-emerald-700">{product.averageInstalledPrice}</strong>
                    <span className="text-xs text-emerald-600 block mt-0.5">
                      {product.taxCreditEligible ? "Crédit d'impôt 500 € déductible" : "TVA 5,5 % incluse"}
                    </span>
                  </div>
                </div>

                {/* Dual CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#devis-pose"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors"
                  >
                    Devis Pose par un Pro IRVE
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors"
                  >
                    Acheter le matériel ({product.affiliateStore})
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Specs Bento Grid */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-blue-600" />
              Spécifications Électriques & Normes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">Puissance de charge max</span>
                <strong className="text-base text-slate-900">{product.maxPowerKw} kW ({product.maxCurrentAmps}A)</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">Tension d&apos;alimentation</span>
                <strong className="text-base text-slate-900">{product.voltage}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">Type de connecteur</span>
                <strong className="text-base text-slate-900">{product.connectorType}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">Câble de recharge</span>
                <strong className="text-base text-slate-900">
                  {product.cableIncluded ? `Inclus (${product.cableLengthMeters} mètres)` : "Non inclus (prise socle T2S)"}
                </strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">Délestage dynamique</span>
                <strong className="text-base text-slate-900">{product.dynamicLoadShedding}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">Compatibilité Solaire</span>
                <strong className="text-base text-slate-900">{product.solarCompatibility}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">Indice de protection</span>
                <strong className="text-base text-slate-900">{product.ipRating}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">Connectivité</span>
                <strong className="text-base text-slate-900">{product.connectivity.join(" · ")}</strong>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">Protection tableau requise</span>
                <strong className="text-xs text-slate-900 leading-tight block">{product.protectionRequired}</strong>
              </div>
            </div>
          </section>

          {/* Associated Duels Section */}
          {associatedDuels.length > 0 && (
            <section className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-10">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-indigo-700 flex-shrink-0 mt-1" />
                <div className="w-full">
                  <h3 className="text-base font-bold text-indigo-950 mb-1">
                    Duels & Face-à-Face impliquant la {product.brand} {product.modelName}
                  </h3>
                  <p className="text-xs text-indigo-800 mb-4">
                    Consultez nos comparatifs directs critère par critère pour trancher avant d&apos;acheter :
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

          {/* Associated Operators Section */}
          {associatedOperators.length > 0 && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Réseaux Nationaux Installant ce Matériel
                </h2>
                <Link href="/operateurs" className="text-xs font-semibold text-blue-600 hover:underline">
                  Voir tous les opérateurs →
                </Link>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Des grands groupes proposent l&apos;installation clé en main de cette borne, mais appliquent une marge d&apos;intermédiaire. Consultez nos audits indépendants :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {associatedOperators.map((op: any) => (
                  <Link
                    key={op.slug}
                    href={`/operateurs/${op.slug}`}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <strong className="text-slate-900 font-bold text-sm group-hover:text-blue-600 transition">
                          Avis {op.name}
                        </strong>
                        <span className="text-xs text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-semibold border border-rose-100">
                          Marge : {op.middlemanCommissionRate.split(" ")[0]}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-2">{op.tagline}</p>
                    </div>
                    <div className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 pt-2 border-t border-slate-200/60">
                      Lire l&apos;audit & arbitrage <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Suitable Vehicles */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Véhicules Électriques Recommandés
            </h2>
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

          {/* Sibling Products */}
          {siblingProducts.length > 0 && (
            <section className="mb-10">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Découvrez aussi dans la même catégorie
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {siblingProducts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/marques/${p.slug}`}
                    className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 transition group flex flex-col justify-between"
                  >
                    <div>
                      <strong className="block text-slate-900 font-bold text-sm group-hover:text-blue-600 transition">
                        {p.brand} {p.modelName}
                      </strong>
                      <span className="text-xs text-blue-700 font-semibold block mb-1">
                        {p.maxPowerKw} kW · {p.estimatedHardwarePrice}
                      </span>
                      <span className="text-xs text-slate-500 line-clamp-2">{p.tagline}</span>
                    </div>
                    <div className="mt-3 text-xs font-bold text-blue-600 inline-flex items-center gap-1">
                      Voir la fiche <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

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
        </main>

        <Footer config={hubConfig as any} />
      </div>
    );
  }

  // ==========================================
  // CASE 2: LEGACY BRAND / GUIDE FROM MARQUES.JSON
  // ==========================================
  const breadcrumbs = [
    { name: "Accueil", href: "/" },
    { name: "Bornes & Marques", href: "/marques" },
    { name: legacyItem.h1 || legacyItem.title, href: `/marques/${legacyItem.slug}` }
  ];

  // Find any related hardware products matching this brand slug
  const relatedHardware = HARDWARE_PRODUCTS.filter((p) => 
    p.slug.includes(legacyItem.slug) || 
    p.brand.toLowerCase().includes(legacyItem.slug.split("-")[0].toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Header isHub={true} variant="default" themeColor="blue" />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <article className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm mt-6 mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            {legacyItem.h1 || legacyItem.title}
          </h1>

          {legacyItem.introduction ? (
            <div 
              className="prose prose-lg prose-blue max-w-none text-slate-600 mb-8"
              dangerouslySetInnerHTML={{ __html: legacyItem.introduction }}
            />
          ) : legacyItem.meta_description ? (
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {legacyItem.meta_description}
            </p>
          ) : null}

          {legacyItem.price_estimate && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10 flex items-center justify-between">
              <div>
                <h3 className="text-blue-900 font-bold mb-1">Estimation Prix (2026)</h3>
                <p className="text-blue-700 font-medium">{legacyItem.price_estimate}</p>
              </div>
              {legacyItem.rating && (
                <div className="text-right">
                  <div className="flex text-amber-400 text-lg mb-0.5">
                    {"★".repeat(Math.round(legacyItem.rating))}
                  </div>
                  <p className="text-xs font-semibold text-slate-600">{legacyItem.rating}/5 Avis vérifiés</p>
                </div>
              )}
            </div>
          )}

          {/* Related Hardware Models If Brand */}
          {relatedHardware.length > 0 && (
            <div className="my-10 pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Modèles de bornes recommandés pour {legacyItem.h1 || legacyItem.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedHardware.map((h) => (
                  <div key={h.slug} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                    <div>
                      <strong className="block text-slate-900 font-bold">{h.brand} {h.modelName}</strong>
                      <span className="text-xs text-slate-500 block mb-2">{h.tagline}</span>
                      <span className="text-xs font-semibold text-blue-700 block">{h.maxPowerKw} kW · {h.estimatedHardwarePrice}</span>
                    </div>
                    <Link
                      href={`/marques/${h.slug}`}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      Voir la fiche technique & avis <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-8">
            {(legacyItem.sections || []).map((section: any, idx: number) => (
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

          {legacyItem.faq && legacyItem.faq.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Questions Fréquentes</h2>
              <div className="space-y-4">
                {legacyItem.faq.map((faqItem: any, idx: number) => (
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
              Devis Installation IRVE Agréée
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Obtenez 3 Devis pour Votre Installation
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Comparez les installateurs certifiés IRVE près de chez vous. Devis gratuit, 500 € de crédit d&apos;impôt et installation garantie.
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
