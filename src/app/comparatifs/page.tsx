import { Metadata } from "next";
import Link from "next/link";
import { DUELS } from "@/data/comparatives";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Scale, ArrowRight, CheckCircle, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Comparatifs & Duels Bornes de Recharge 2026 : Le Face-à-Face",
  description: "ChargeGuru vs IZI by EDF, Zeplug vs Waat, Tesla vs Wallbox, Schneider vs Hager... Nos duels comparatifs complets avec matrices de décision pour choisir le bon matériel.",
  alternates: {
    canonical: "https://expertbornerecharge.com/comparatifs",
  },
  robots: { index: true, follow: true }
};

export default function ComparatifsHubPage() {
  const hubConfig = getHubConfig();

  const breadcrumbs = [
    { name: "Accueil", href: "/" },
    { name: "Comparatifs & Duels", href: "/comparatifs" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Header isHub={true} variant="default" themeColor="blue" />

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
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
          {DUELS.map((duel) => (
            <article 
              key={duel.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold uppercase tracking-wider text-blue-600">Duel Comparatif</span>
                  <span>Mise à jour 2026</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  <Link href={`/comparatif/${duel.slug}`} className="hover:text-blue-600 transition-colors">
                    {duel.entityA.name} <span className="text-slate-400 font-normal">vs</span> {duel.entityB.name}
                  </Link>
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {duel.directAnswerSummary}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 rounded-xl p-4 text-xs">
                  <div>
                    <strong className="block text-slate-900 font-bold mb-1">{duel.entityA.name}</strong>
                    <span className="text-slate-500 block">{duel.entityA.priceEst}</span>
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold mb-1">{duel.entityB.name}</strong>
                    <span className="text-slate-500 block">{duel.entityB.priceEst}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={`/comparatif/${duel.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
                >
                  Voir le comparatif complet & matrice de décision
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* LeadForm */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white my-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800 text-blue-200 text-xs font-semibold mb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              Accompagnement Neutre & Gratuit
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Besoin d&apos;aide pour arbitrer votre projet ?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Décrivez votre configuration (maison ou copropriété, marque de véhicule, distance tableau-parking) et comparez gratuitement 3 solutions d&apos;installateurs IRVE locaux.
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
