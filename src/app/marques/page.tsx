import { Metadata } from "next";
import Link from "next/link";
import { HARDWARE_PRODUCTS } from "@/data/hardware";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Zap, ShieldCheck, Star, ExternalLink, ArrowRight, Sun, Cpu, Check, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Les Meilleures Bornes de Recharge 2026 : Comparatif, Prix & Fiches Techniques",
  description: "Tesla Wall Connector, Schneider Charge, Wallbox Pulsar, Hager Witty, Legrand Green'up... Fiches techniques complètes, compatibilité solaire TIC Linky et devis pose IRVE.",
  alternates: {
    canonical: "https://expertbornerecharge.com/marques",
  },
  robots: { index: true, follow: true }
};

export default function MarquesHubPage() {
  const hubConfig = getHubConfig();

  const breadcrumbs = [
    { name: "Accueil", href: "/" },
    { name: "Bornes & Matériel", href: "/marques" }
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Les Meilleures Bornes de Recharge pour Véhicules Électriques en 2026",
    "description": "Comparatif technique et fiches produits des bornes de recharge résidentielles et tertiaires.",
    "itemListElement": HARDWARE_PRODUCTS.map((prod, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": `${prod.brand} ${prod.modelName}`,
      "url": `https://expertbornerecharge.com/marques/${prod.slug}`,
      "description": prod.tagline
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Header isHub={true} variant="default" themeColor="blue" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto my-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            Matériel Homologué IRVE 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
            Les Bornes de Recharge au Banc d&apos;Essai
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Tesla, Schneider Electric, Wallbox, Hager, Legrand, MyEnergi... Découvrez nos fiches techniques détaillées, les spécifications de délestage dynamique TIC Linky, l&apos;optimisation photovoltaïque et la double monétisation matériel seul vs pose clé en main.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 text-left flex items-start gap-3 text-blue-950 text-sm">
            <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Bon à savoir :</strong> En France, toute borne d&apos;une puissance supérieure à 3,7 kW doit obligatoirement être installée par un professionnel qualifié IRVE (Décret du 12 janvier 2017). La pose par un pro certifié vous donne droit au <strong>crédit d&apos;impôt de 500 €</strong> et à la <strong>TVA réduite à 5,5 %</strong>.
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
          {HARDWARE_PRODUCTS.map((prod) => (
            <article 
              key={prod.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {prod.brand}
                  </span>
                  <div className="flex items-center text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    {prod.rating} <span className="text-xs font-normal text-slate-400 ml-1">({prod.reviewCount})</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  <Link href={`/marques/${prod.slug}`} className="hover:text-blue-600 transition-colors">
                    {prod.modelName}
                  </Link>
                </h2>
                <p className="text-xs text-slate-500 mb-4">{prod.tagline}</p>

                {/* Technical Specs Summary */}
                <div className="space-y-2 mb-4 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Puissance max :</span>
                    <span className="font-bold text-slate-900">{prod.maxPowerKw} kW ({prod.maxCurrentAmps}A)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Tension :</span>
                    <span className="font-medium text-slate-800">{prod.voltage}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Délestage dynamique :</span>
                    <span className="font-medium text-slate-800 text-right">{prod.dynamicLoadShedding.split("(")[0]}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Prix matériel seul :</span>
                    <span className="font-semibold text-blue-700">{prod.estimatedHardwarePrice}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Prix posé moyen :</span>
                    <span className="font-semibold text-emerald-700">{prod.averageInstalledPrice}</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 mb-4 text-xs text-slate-700">
                  <strong className="text-slate-900 block mb-1">Notre verdict :</strong>
                  {prod.verdict}
                </div>
              </div>

              {/* Action Buttons: Dual Monetization */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <Link
                  href={`/marques/${prod.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                >
                  Fiche technique & Devis pose IRVE
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={prod.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                >
                  Acheter le matériel seul ({prod.affiliateStore})
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* LeadForm Installation Section */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white my-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Installation Conforme & Aides d&apos;État
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Faites chiffrer la pose de votre borne
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Vous avez déjà choisi votre borne ou vous hésitez encore ? Obtenez 3 devis comparatifs auprès d&apos;électriciens IRVE certifiés près de chez vous avec le crédit d&apos;impôt de 500 € déduit.
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
