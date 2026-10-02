import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
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
    return {
      title: `${product.brand} ${product.modelName} : Prix, Avis & Fiche Technique 2026`,
      description: `Fiche technique complète ${product.brand} ${product.modelName}. Puissance ${product.maxPowerKw} kW, délestage dynamique TIC Linky, prix d'installation et devis électricien IRVE agréé.`,
      alternates: {
        canonical: `https://expertbornerecharge.com/marques/${product.slug}`,
      },
      robots: { index: true, follow: true }
    };
  }

  const legacyItem = getMarquesJsonData().find((m: any) => m.slug === slug);
  if (legacyItem) {
    return {
      title: legacyItem.title,
      description: legacyItem.meta_description,
      alternates: {
        canonical: `https://expertbornerecharge.com/marques/${legacyItem.slug}`,
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
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-64 h-64 rounded-2xl bg-slate-900 p-2 shadow-inner border border-slate-700 overflow-hidden flex items-center justify-center">
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
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {product.tagline}. Puissance jusqu&apos;à {product.maxPowerKw} kW, raccordement sécurisé conforme NF C 15-100 et éligible aux 500 € de crédit d&apos;impôt.
                </p>

                {/* Dual Action CTA Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <a
                    href="#devis-pose"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm"
                  >
                    Devis Pose IRVE (500 € déduits)
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                  >
                    Matériel seul ({product.estimatedHardwarePrice})
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
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
