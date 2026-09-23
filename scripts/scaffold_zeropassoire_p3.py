#!/usr/bin/env python3
"""
zeropassoire.fr — scaffold partie 3/4 (pages funnel)
Home (la machine en 7 sections), /simulateur, /success, /contact,
+ sitemap + robots. Les pages guides + légal + contenu MDX + SQL Supabase
sont dans P4.
"""
from pathlib import Path
import sys

ROOT = Path("/Users/marc/Downloads/project-zero/zeropassoire.fr")
FILES: dict[str, str] = {}

# ==================== HOME (la machine) ====================
FILES["src/app/page.tsx"] = r'''import Link from "next/link";
import { ChevronDown, FileText, Wallet, Users, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";
import Simulator from "@/components/Simulator";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO — miroir douleur + promesse anti-arnaque */}
      <section className="relative pt-16 pb-20 bg-stone-900 text-white overflow-hidden">
        {/* Subtle DPE gradient wash */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(120deg, transparent 40%, rgba(201,37,45,0.4) 60%, rgba(245,166,35,0.35) 75%, transparent 100%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-900/60 border border-brand-700/50 px-4 py-1.5 text-xs font-semibold text-brand-100 mb-6">
              <Sparkles size={14} /> Simulateur ind&eacute;pendant &middot; Bar&egrave;mes officiels 2026
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Votre maison est une{" "}
              <span className="relative">
                <span className="relative z-10">passoire &eacute;nerg&eacute;tique</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-alert-500/30 z-0" />
              </span>
              &nbsp;? On vous dit combien &ccedil;a co&ucirc;te d'en sortir.
            </h1>
            <p className="mt-6 text-lg text-stone-200 leading-relaxed max-w-2xl">
              Vrais chiffres, aides &agrave; jour (MaPrimeR&eacute;nov', CEE, TVA&nbsp;5,5&nbsp;%), reste &agrave; charge estim&eacute;.
              <strong className="text-white"> Sans laisser votre t&eacute;l&eacute;phone.</strong> Sans démarchage. Sans revente de vos coordonn&eacute;es.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#simulateur" className="btn-primary">
                Estimer mon reste &agrave; charge <ChevronDown size={18} />
              </Link>
              <Link href="/guides" className="btn-secondary !border-stone-600 !text-white !bg-transparent hover:!bg-stone-800">
                Lire les guides
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-xs text-stone-300">
              <Badge>✓ Aucun numéro obligatoire</Badge>
              <Badge>✓ Résultat affiché tout de suite</Badge>
              <Badge>✓ Sources Légifrance &amp; ADEME</Badge>
            </div>
          </div>

          {/* DPE gauge visual */}
          <div className="mt-16 max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-stone-400 mb-3">
              Vous êtes probablement ici&nbsp;:
            </div>
            <DpeGauge />
          </div>
        </div>
      </section>

      {/* 2. SIMULATOR — the machine */}
      <section id="simulateur" className="py-20 scroll-mt-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-brand-700 font-semibold mb-2">
              Simulateur gratuit &middot; 40 secondes
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              Votre plan de sortie chiffr&eacute; en 5 questions
            </h2>
            <p className="mt-3 text-stone-600 max-w-xl mx-auto">
              R&eacute;sultats affich&eacute;s imm&eacute;diatement, sans email requis.
              Vous choisissez ensuite si oui ou non on vous les envoie par &eacute;crit.
            </p>
          </div>
          <Simulator />
        </div>
      </section>

      {/* 3. ANTI-ARNAQUE — what we DON'T do */}
      <section className="py-20 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-red-700 text-xs font-semibold uppercase tracking-widest mb-2">
              <ShieldAlert size={14} /> Ce qu'on ne fait pas
            </div>
            <h2 className="font-display text-3xl font-bold text-stone-900">
              On n'est pas un comparateur de devis.
            </h2>
            <p className="text-stone-600 mt-3 max-w-2xl mx-auto">
              2,3&nbsp;millions de m&eacute;nages fra&ccedil;ais ont &eacute;t&eacute; victimes d'une arnaque &agrave; la r&eacute;novation
              &eacute;nerg&eacute;tique en 2024 (DGCCRF). On a construit z&eacute;ropassoire pour &ecirc;tre l'exact inverse.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <AntiCard title="Pas de démarchage">
              Personne ne vous appelle sans que vous l'ayez demand&eacute;. Votre num&eacute;ro est optionnel,
              et si vous le laissez, on ne l'appelle qu'une seule fois, sur le cr&eacute;neau que vous choisissez.
            </AntiCard>
            <AntiCard title="Pas de revente">
              Vos coordonn&eacute;es ne sont jamais c&eacute;d&eacute;es &agrave; des artisans, des courtiers
              ou des soci&eacute;t&eacute;s de r&eacute;novation. Point.
            </AntiCard>
            <AntiCard title="Pas de &laquo;&nbsp;1&nbsp;€&nbsp;&raquo;">
              On vous donne des fourchettes r&eacute;alistes, pas des montants marketing.
              Une PAC bien pos&eacute;e co&ucirc;te entre 9&nbsp;000 et 16&nbsp;000&nbsp;&euro; apr&egrave;s aides.
              M&ecirc;me quand c'est moins vendeur.
            </AntiCard>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 text-center mb-4">
            Comment &ccedil;a se passe, concr&egrave;tement
          </h2>
          <p className="text-center text-stone-600 mb-14 max-w-xl mx-auto">
            3 &eacute;tapes, z&eacute;ro engagement. Vous gardez la main du d&eacute;but &agrave; la fin.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <StepCard
              n={1}
              icon={<Wallet className="text-brand-700" />}
              title="Vous simulez"
              time="≈ 40 secondes"
            >
              R&eacute;pondez aux 5 questions, consultez imm&eacute;diatement le co&ucirc;t r&eacute;el des travaux,
              les primes mobilisables et votre reste &agrave; charge. Aucune inscription requise.
            </StepCard>
            <StepCard
              n={2}
              icon={<FileText className="text-brand-707" />}
              title="On vous envoie le plan"
              time="Email sous 30 secondes"
            >
              R&eacute;capitulatif chiffr&eacute;, liste des postes de travaux prioritaires,
              contacts d'artisans RGE de votre d&eacute;partement. Un PDF, consultable hors-ligne.
            </StepCard>
            <StepCard
              n={3}
              icon={<Users className="text-brand-700" />}
              title="Vous choisissez"
              time="Sans aucune pression"
            >
              Vous contactez qui vous voulez, quand vous voulez. On reste joignables pour r&eacute;pondre
              aux questions techniques. On ne relance jamais.
            </StepCard>
          </div>
        </div>
      </section>

      {/* 5. SOCIAL MARKET PROOF (facts, not testimonials) */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-3">
            5,3 millions de logements francais sont des passoires
          </h2>
          <p className="text-center text-stone-300 mb-14 max-w-2xl mx-auto">
            Chiffres officiels Observatoire de la Pr&eacute;carit&eacute; &Eacute;nerg&eacute;tique &amp; SDES (minist&egrave;re &Eacute;nergie), 2025.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <BigStat n="1,8 M" label=" passoires G (logements interdits de location depuis le 1er janv. 2025)" />
            <BigStat n="4,8 M" label=" passoires E, F, G encore louables aujourd'hui" />
            <BigStat n="~ 45 000 €" label="coût moyen d'une sortie G→C en maison individuelle" />
          </div>
          <p className="text-center text-xs text-stone-400 mt-10">
            Sources : SDES &laquo;&nbsp;Données de performance énergétique des logements&nbsp;&raquo; (nov. 2025)
            &middot; OPE, 8<sup>&egrave;me</sup> &eacute;dition &middot; ADEME bar&egrave;mes 2026
          </p>
        </div>
      </section>

      {/* 6. FAQ objections */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 text-center mb-12">
            Les questions qu'on nous pose vraiment
          </h2>
          <details className="faq-item">
            <summary>Les chiffres du simulateur sont-ils fiables&nbsp;?</summary>
            <p>
              Les bar&egrave;mes utilis&eacute;s viennent des textes officiels 2026 (arr&ecirc;t&eacute; MaPrimeR&eacute;nov' du 2 octobre 2025,
              fiches CEE BAR-TH en vigueur). Les co&ucirc;ts de travaux sont des m&eacute;dianes constat&eacute;es ADEME sur
              les chantiers 2024-2025. Ce sont des estimations &agrave; ±15&nbsp;%, pas un devis contractuel.
            </p>
          </details>
          <details className="faq-item">
            <summary>Puis-je vendre mon bien sans faire les travaux&nbsp;?</summary>
            <p>
              Oui. Le DPE F ou G n'interdit pas la vente, il oblige seulement &agrave; afficher un
              <em> avis &eacute;nerg&eacute;tique</em> &agrave; l'acheteur et &agrave; chiffrer les travaux dans l'annonce.
              En pratique, un bien non-r&eacute;nov&eacute; subit une d&eacute;cote &agrave; la revente estim&eacute;e entre 6&nbsp;% et 15&nbsp;%
              par l'Observatoire DVF-PIERVAL 2025.
            </p>
          </details>
          <details className="faq-item">
            <summary>Je suis d&eacute;j&agrave; en contact avec un artisan, &ccedil;a change quoi&nbsp;?</summary>
            <p>
              Rien, &agrave; part un contre-pouvoir. Vous pouvez comparer le devis que vous avez re&ccedil;u avec
              le co&ucirc;t moyen constat&eacute; par le simulateur, et v&eacute;rifier que les aides sont bien
              int&eacute;gr&eacute;es (un devis sans ligne &laquo;&nbsp;MaPrimeR&eacute;nov'&nbsp;&raquo; ou &laquo;&nbsp;CEE&nbsp;&raquo;,
              c'est suspect).
            </p>
          </details>
          <details className="faq-item">
            <summary>Combien de temps pour sortir de passoire&nbsp;?</summary>
            <p>
              4 &agrave; 10 mois entre le premier rendez-vous avec un auditeur &eacute;nerg&eacute;tique et la livraison
              du dernier poste. Le frein principal n'est pas le chantier lui-m&ecirc;me, c'est le vote en AG
              pour les copropri&eacute;t&eacute;s, et le d&eacute;p&ocirc;t de dossier MPR pour les maisons individuelles.
            </p>
          </details>
          <details className="faq-item">
            <summary>Et si je ne peux vraiment pas financer, m&ecirc;me avec les aides&nbsp;?</summary>
            <p>
              Il existe : le <em>pr&ecirc;t &agrave; taux z&eacute;ro propri&eacute;taire occupants</em> (jusqu'&agrave; 50&nbsp;000&nbsp;&euro;),
              l'avance de MaPrimeR&eacute;nov' par le syndic ou un organisme associatif, les aides locales
              cumulables (Anah, r&eacute;gions, intercommunalit&eacute;s), et pour les m&eacute;nages en situation
              de pr&eacute;carit&eacute;, le fonds <em>Tiers-lieu Financement Collective</em>. On en parle
              dans le <Link href="/guides/aides-financieres-sortie-passoire-2026" className="text-brand-700 underline">guide des aides 2026</Link>.
            </p>
          </details>
        </div>
      </section>

      {/* 7. FINAL SOFT CTA + guides teaser */}
      <section className="py-20 bg-brand-50 border-t border-brand-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Pr&ecirc;t &agrave; voir vos vrais chiffres&nbsp;?
          </h2>
          <p className="text-stone-700 mb-8 max-w-xl mx-auto">
            40 secondes, sans t&eacute;l&eacute;phone, sans engagement. Vous saurez exactement
            o&ugrave; vous en &ecirc;tes.
          </p>
          <a href="#simulateur" className="btn-primary inline-flex">
            Lancer la simulation <ArrowRight size={18} />
          </a>
          <div className="mt-16 text-left">
            <h3 className="font-display text-lg font-bold text-stone-900 mb-4">
              Pour aller plus loin
            </h3>
            <ul className="grid sm:grid-cols-3 gap-4 text-sm">
              <li>
                <Link href="/guides/sortir-de-passoire-energetique-2026" className="block p-4 rounded-xl bg-white border border-stone-200 hover:border-brand-600 transition">
                  <div className="font-semibold text-stone-900 mb-1">Le guide pilier</div>
                  <div className="text-stone-600">Sortir de passoire : le parcours complet</div>
                </Link>
              </li>
              <li>
                <Link href="/guides/aides-financieres-sortie-passoire-2026" className="block p-4 rounded-xl bg-white border border-stone-200 hover:border-brand-600 transition">
                  <div className="font-semibold text-stone-900 mb-1">Aides 2026</div>
                  <div className="text-stone-600">MPR&nbsp;+&nbsp;CEE&nbsp;+&nbsp;TVA&nbsp;5,5&nbsp;%&nbsp;+&nbsp;aides locales</div>
                </Link>
              </li>
              <li>
                <Link href="/guides/interdiction-location-passoire-thermique" className="block p-4 rounded-xl bg-white border border-stone-200 hover:border-brand-600 transition">
                  <div className="font-semibold text-stone-900 mb-1">Location 2025</div>
                  <div className="text-stone-600">Interdiction G puis F&nbsp;: calendrier</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <MobileStickyBar />
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-stone-800/70 border border-stone-700 px-3 py-1">
      {children}
    </span>
  );
}

function DpeGauge() {
  const bars = [
    { c: "A", col: "#0e7a3c", w: 25 },
    { c: "B", col: "#3ba55d", w: 40 },
    { c: "C", col: "#a8cf45", w: 65 },
    { c: "D", col: "#f4d93c", w: 90 },
    { c: "E", col: "#f5a623", w: 120 },
    { c: "F", col: "#ef6c35", w: 175 },
    { c: "G", col: "#c9252d", w: 235 },
  ];
  return (
    <div className="space-y-1">
      {bars.map((b) => (
        <div key={b.c} className="flex items-center gap-3">
          <div
            className="h-8 rounded-r-md flex items-center justify-center text-white text-sm font-bold"
            style={{ width: `${b.w}px`, backgroundColor: b.col }}
          >
            {b.c}
          </div>
          {(b.c === "F" || b.c === "G") && (
            <div className="text-xs text-stone-300">
              {b.c === "G" ? "← Interdit à la location depuis 01/2025" : "← Interdit à la location au 01/01/2028"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AntiCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50">
      <div className="text-red-700 font-semibold text-sm uppercase tracking-wide mb-2">
        ✗ {title}
      </div>
      <p className="text-stone-700 leading-relaxed">{children}</p>
    </div>
  );
}

function StepCard({ n, icon, title, time, children }: { n: number; icon: React.ReactNode; title: string; time: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-brand-100 flex items-center justify-center">{icon}</div>
        <div className="text-4xl font-display font-bold text-stone-200 leading-none">0{n}</div>
      </div>
      <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{time}</div>
      <h3 className="font-display text-lg font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-sm text-stone-600 leading-relaxed">{children}</p>
    </div>
  );
}

function BigStat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl sm:text-5xl font-bold text-brand-500 mb-2">{n}</div>
      <div className="text-sm text-stone-300 leading-relaxed">{label}</div>
    </div>
  );
}
'''

# ==================== /simulateur (SEO-targeted standalone) ====================
FILES["src/app/simulateur/page.tsx"] = r'''import type { Metadata } from "next";
import Simulator from "@/components/Simulator";

export const metadata: Metadata = {
  title: "Simulateur sortie de passoire énergétique 2026",
  description:
    "Combien coûte la sortie d'un DPE F ou G ? Simulateur indépendant basé sur les barèmes MaPrimeRénov' et CEE 2026. Résultat gratuit, sans email requis.",
  alternates: { canonical: "https://zeropassoire.fr/simulateur" },
};

export default function SimulateurPage() {
  return (
    <section className="py-16 bg-stone-50 min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-brand-700 font-semibold mb-3">
            Simulateur ind&eacute;pendant &middot; 40 secondes
          </div>
          <h1 className="font-display text-4xl font-bold text-stone-900 mb-3">
            Combien co&ucirc;te votre sortie de passoire&nbsp;?
          </h1>
          <p className="text-stone-600 max-w-xl mx-auto">
            Bar&egrave;mes officiels 2026 (arr&ecirc;t&eacute; MPR du 2 oct. 2025, fiches CEE BAR-TH).
            R&eacute;sultat affich&eacute; imm&eacute;diatement, sans email requis.
          </p>
        </div>
        <Simulator />
      </div>
    </section>
  );
}
'''

# ==================== /success (next steps checklist, viral loop) ====================
FILES["src/app/success/page.tsx"] = r'''import Link from "next/link";
import { CheckCircle2, Download, Share2, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  // In a real deployment, this page could fetch the lead's snapshot via session_id from
  // sessionStorage and personalize the checklist. Kept static to avoid extra fetch at load.
  return (
    <section className="py-20 bg-stone-50 min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <CheckCircle2 className="w-16 h-16 text-brand-600 mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold text-stone-900 mb-3">
            C'est envoy&eacute;.
          </h1>
          <p className="text-stone-600">
            V&eacute;rifiez votre bo&icirc;te mail&nbsp;: le PDF de votre plan de sortie + la liste
            des pros RGE de votre secteur y sont (et pensez &agrave; regarder les spams).
          </p>
        </div>

        <div className="card">
          <h2 className="font-display text-xl font-bold text-stone-900 mb-4">
            Les 3 choses &agrave; faire dans les 30 prochains jours
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-semibold flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <div className="font-semibold text-stone-900">Demander un audit &eacute;nerg&eacute;tique</div>
                <p className="text-sm text-stone-600 mt-1">
                  Obligatoire pour les E/F/G vendus ou lou&eacute;s. Entre 450&nbsp;&euro; et 750&nbsp;&euro;, pris en charge &agrave; 100&nbsp;% par MPR bleu et
                  CEE. Il affine votre reste &agrave; charge &agrave; ±5&nbsp;%.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-semibold flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <div className="font-semibold text-stone-900">Contacter 2&ndash;3 artisans RGE diff&eacute;rents</div>
                <p className="text-sm text-stone-600 mt-1">
                  Comparez &agrave; poste &eacute;gal (m&ecirc;me mat&eacute;riel, m&ecirc;me surface d'isolant). Un &eacute;cart de 30&nbsp;%+ entre deux devis
                  est suspect.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-semibold flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <div className="font-semibold text-stone-900">D&eacute;poser le dossier MaPrimeR&eacute;nov' AVANT signature</div>
                <p className="text-sm text-stone-600 mt-1">
                  Un devis sign&eacute; avant l'accord MPR = 0&nbsp;&euro; d'aide. Point de non-retour &agrave; ne pas rater.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Viral loop */}
        <div className="mt-8 card bg-brand-50 border-brand-200">
          <div className="flex items-center gap-2 text-brand-800 mb-2">
            <Share2 size={18} />
            <div className="font-display font-bold">Une id&eacute;e&nbsp;? Partagez ce simulateur</div>
          </div>
          <p className="text-sm text-stone-700 mb-3">
            Vous connaissez un voisin, un coll&egrave;gue, un parent coinc&eacute; avec un DPE F&nbsp;?
            Il m&eacute;rite les m&ecirc;mes chiffres que vous.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href={`whatsapp://send?text=${encodeURIComponent("J'ai utilisé zéropassoire.fr pour estimer mon reste à charge de sortie de passoire énergétique. Le simulateur est honnête, sans démarchage : https://zeropassoire.fr")}`}
               className="btn-secondary !py-2 !text-sm">
              Partager sur WhatsApp
            </a>
            <a href={`mailto:?subject=${encodeURIComponent("Un simulateur honnête pour les passoires thermiques")}&body=${encodeURIComponent("Salut,\n\nJe viens de tomber sur zéropassoire.fr, un simulateur qui donne les vrais chiffres sans te demander ton téléphone. Je me suis dit que ça pourrait te servir.\n\n→ https://zeropassoire.fr\n\nÀ plus.")}`}
               className="btn-secondary !py-2 !text-sm">
              Par email
            </a>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/guides" className="inline-flex items-center gap-1 text-brand-700 font-semibold hover:gap-2 transition-all">
            Continuer avec les guides <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
'''

# ==================== /contact ====================
FILES["src/app/contact/page.tsx"] = r'''import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur le simulateur, les barèmes, ou le site ? Écrivez-nous.",
  alternates: { canonical: "https://zeropassoire.fr/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-20 bg-stone-50 min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold text-stone-900 mb-3">Contact</h1>
        <p className="text-stone-600 mb-8">
          On r&eacute;pond en 48h ouvr&eacute;es. Pas de t&eacute;l&eacute;phone, uniquement par &eacute;crit,
          pour garder une trace.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
'''

FILES["src/components/ContactForm.tsx"] = r'''"use client";
import { useState } from "react";
import { Loader2, Check } from "lucide-react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          simulation: { kind: "contact", message: msg },
          consent_callback: false,
          consent_newsletter: false,
        }),
      });
      setStatus(r.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="card text-center">
        <Check className="w-12 h-12 text-brand-600 mx-auto mb-3" />
        <div className="font-display font-bold text-stone-900 text-xl mb-2">Message bien re&ccedil;u</div>
        <p className="text-stone-600">On vous r&eacute;pond sous 48h ouvr&eacute;es &agrave; l'adresse indiqu&eacute;e.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-4">
      <div>
        <label className="block text-sm font-semibold text-stone-800 mb-1.5">Votre email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 focus:border-brand-600 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone-800 mb-1.5">Votre message</label>
        <textarea
          required
          rows={6}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 focus:border-brand-600 focus:outline-none"
        />
      </div>
      {status === "err" && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
          Envoi impossible. R&eacute;essayez dans un instant.
        </div>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary">
        {status === "sending" && <Loader2 size={16} className="animate-spin" />}
        Envoyer
      </button>
    </form>
  );
}
'''

# ==================== SITEMAP ====================
FILES["src/app/sitemap.ts"] = r'''import { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/mdx";

const BASE = "https://zeropassoire.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/simulateur`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/guides`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/cgv`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/politique-confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];
  const guides = getAllGuides().map((g) => ({
    url: `${BASE}/guides/${g.slug}`,
    lastModified: new Date(g.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));
  return [...statics, ...guides];
}
'''

# ==================== ROBOTS ====================
FILES["src/app/robots.ts"] = r'''import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/success"],
    },
    sitemap: "https://zeropassoire.fr/sitemap.xml",
    host: "https://zeropassoire.fr",
  };
}
'''

# ==================== execute ====================
def main():
    dry = "--dry-run" in sys.argv
    written = 0
    for rel, content in FILES.items():
        target = ROOT / rel
        if target.exists() and target.read_text(encoding="utf-8") == content:
            print(f"SKIP  {rel} (unchanged)")
            continue
        if dry:
            print(f"[dry] {rel} ({len(content.splitlines())} lines)")
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
        print(f"OK    {rel}")
        written += 1
    print(f"\nP3 scaffold (pages machine) — {written} file(s) written.")

if __name__ == "__main__":
    main()
