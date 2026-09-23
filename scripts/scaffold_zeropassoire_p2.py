#!/usr/bin/env python3
"""
zeropassoire.fr — scaffold partie 2/4 (la MACHINE)
Composants de conversion + Supabase + API leads/events.
"""
from pathlib import Path
import sys

ROOT = Path("/Users/marc/Downloads/project-zero/zeropassoire.fr")
FILES: dict[str, str] = {}

# ==================== LOGO ====================
FILES["src/components/Logo.tsx"] = r'''export default function Logo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <path
        d="M6 24 L24 8 L42 24"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 26 V40 H38 V26"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 34 V20 M18 25 L24 19 L30 25"
        stroke="#f59e0b"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
'''

# ==================== HEADER ====================
FILES["src/components/Header.tsx"] = r'''import Link from "next/link";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-brand-800 hover:text-brand-900">
          <Logo />
          <div className="font-display text-lg font-bold tracking-tight text-stone-900">
            z&eacute;ro<span className="text-brand-700">passoire</span>
            <span className="text-stone-400">.fr</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
          <Link href="/simulateur" className="hover:text-brand-700">Simulateur</Link>
          <Link href="/guides" className="hover:text-brand-700">Guides</Link>
          <Link href="/contact" className="hover:text-brand-700">Contact</Link>
        </nav>
        <Link
          href="/#simulateur"
          className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 transition shadow-sm"
        >
          Estimer mon reste &agrave; charge
        </Link>
      </div>
    </header>
  );
}
'''

# ==================== FOOTER ====================
FILES["src/components/Footer.tsx"] = r'''import Link from "next/link";
import Logo from "@/components/Logo";
import { ShieldCheck, Lock, PhoneOff } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-stone-900 text-stone-300">
      {/* Trust strip */}
      <div className="border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <PhoneOff className="w-5 h-5 text-brand-500" />
            <span>Aucun d&eacute;marchage t&eacute;l&eacute;phonique</span>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-brand-500" />
            <span>Vos donn&eacute;es ne sont jamais revendues</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            <span>Bar&egrave;mes officiels 2026 (L&eacute;gifrance)</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-brand-500">
            <Logo className="w-8 h-8" />
            <span className="font-display font-bold text-white text-lg">
              z&eacute;ro<span className="text-brand-500">passoire</span>
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed max-w-sm">
            Simulateur ind&eacute;pendant de sortie de passoire &eacute;nerg&eacute;tique.
            On vous donne les chiffres avant de vous demander quoi que ce soit.
          </p>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">Navigation</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/simulateur" className="hover:text-white">Simulateur</Link></li>
            <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3 text-sm">Informations</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/mentions-legales" className="hover:text-white">Mentions l&eacute;gales</Link></li>
            <li><Link href="/cgv" className="hover:text-white">CGU</Link></li>
            <li><Link href="/politique-confidentialite" className="hover:text-white">Confidentialit&eacute;</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 py-6 text-center text-xs text-stone-500">
        &copy; {new Date().getFullYear()} z&eacute;ropassoire.fr — Site ind&eacute;pendant.
        Les montants affich&eacute;s sont des estimations, non contractuelles.
      </div>
    </footer>
  );
}
'''

# ==================== DPE SELECTOR ====================
FILES["src/components/DpeSelector.tsx"] = r'''const CLASSES = [
  { code: "A", color: "#0e7a3c", label: "Excellent", hidden: true },
  { code: "B", color: "#3ba55d", label: "Tr&egrave;s bon", hidden: true },
  { code: "C", color: "#a8cf45", label: "Bon", hidden: true },
  { code: "D", color: "#f4d93c", label: "Correct", hidden: true },
  { code: "E", color: "#f5a623", label: "&Eacute;carts &agrave; am&eacute;liorer" },
  { code: "F", color: "#ef6c35", label: "Passoire" },
  { code: "G", color: "#c9252d", label: "D&eacute;perditoire" },
] as const;

export type DpeClass = "E" | "F" | "G";

export default function DpeSelector({
  value,
  onChange,
}: {
  value: DpeClass | null;
  onChange: (v: DpeClass) => void;
}) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {CLASSES.map((c) => {
        const clickable = !c.hidden;
        const active = value === c.code;
        return (
          <button
            key={c.code}
            type="button"
            disabled={!clickable}
            onClick={() => clickable && onChange(c.code as DpeClass)}
            className={[
              "flex flex-col items-center justify-center rounded-xl py-4 px-1 transition",
              clickable ? "cursor-pointer hover:scale-105" : "opacity-30 cursor-not-allowed",
              active ? "ring-4 ring-stone-900 scale-105" : "",
            ].join(" ")}
            style={{ backgroundColor: c.color, color: ["A", "B", "G", "D"].includes(c.code) ? "white" : "black" }}
          >
            <span className="font-display text-2xl font-bold">{c.code}</span>
            {clickable && <span className="text-[10px] leading-tight mt-1 opacity-90">{c.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
'''

# ==================== SIMULATOR (MACHINE) ====================
FILES["src/components/Simulator.tsx"] = r'''"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import DpeSelector, { type DpeClass } from "@/components/DpeSelector";
import ResultCard from "@/components/ResultCard";
import LeadCaptureCard from "@/components/LeadCaptureCard";
import type { SimulateurInput, SimulateurResult } from "@/lib/pricing";

const STEPS = ["Classe DPE", "Votre logement", "Situation", "Code postal", "R&eacute;sultat"] as const;

interface SimState {
  classe: DpeClass | null;
  surface: number;
  type: "maison" | "appartement";
  chauffage: SimulateurInput["chauffage"];
  revenus: SimulateurInput["menageIncomeBracket"];
  cp: string;
}

export default function Simulator() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<SimState>({
    classe: null,
    surface: 90,
    type: "maison",
    chauffage: "fioul",
    revenus: "intermediaire",
    cp: "",
  });
  const [result, setResult] = useState<SimulateurResult | null>(null);
  const [loading, setLoading] = useState(false);

  function set<K extends keyof SimState>(k: K, v: SimState[K]) {
    setState((s) => ({ ...s, [k]: v }));
  }

  function next() {
    if (step === 0 && !state.classe) return;
    if (step === 3 && !/^\d{5}$/.test(state.cp)) return;
    const newStep = step + 1;
    setStep(newStep);
    if (newStep === 4) {
      setLoading(true);
      // Import statique evite pour garder le bundle initial petit.
      import("@/lib/pricing").then(({ simulate }) => {
        setResult(simulate(state as SimulateurInput));
        setLoading(false);
      });
      // Funnel event (fire-and-forget)
      fetch("/api/events", {
        method: "POST",
        body: JSON.stringify({ session_id: getSessionId(), event_name: "simulator_completed", properties: { classe: state.classe, surface: state.surface } }),
      }).catch(() => {});
    }
  }

  function back() { setStep(Math.max(0, step - 1)); }

  function restart() {
    setStep(0);
    setResult(null);
    setState({ classe: null, surface: 90, type: "maison", chauffage: "fioul", revenus: "intermediaire", cp: "" });
  }

  return (
    <div className="card p-0 overflow-hidden">
      {/* Progress */}
      <div className="px-6 py-4 bg-stone-50 border-b border-stone-200">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
          <span>
            &Eacute;tape {step + 1} / {STEPS.length}
          </span>
          <span>~40 secondes</span>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {step === 0 && (
          <StepWrapper title="Quelle est la classe &eacute;nerg&eacute;tique de votre logement&nbsp;?" hint="Elle figure sur votre DPE ou avis d'imposition.">
            <DpeSelector value={state.classe} onChange={(v) => set("classe", v)} />
            <p className="mt-4 text-xs text-stone-500">
              Seuls les logements <strong className="text-stone-800">E, F ou G</strong> sont consid&eacute;r&eacute;s comme
              passoires thermiques et &eacute;ligibles aux aides de sortie.
            </p>
          </StepWrapper>
        )}

        {step === 1 && (
          <StepWrapper title="Parlez-nous de votre logement">
            <div className="space-y-6">
              <Field label="Surface habitable (m&sup2;)">
                <input
                  type="number"
                  min={20}
                  max={400}
                  value={state.surface}
                  onChange={(e) => set("surface", Number(e.target.value) || 0)}
                  className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 focus:border-brand-600 focus:outline-none"
                />
              </Field>
              <Field label="Type de bien">
                <div className="grid grid-cols-2 gap-3">
                  {(["maison", "appartement"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set("type", t)}
                      className={
                        "rounded-xl border-2 px-4 py-3 font-medium capitalize transition " +
                        (state.type === t ? "border-brand-600 bg-brand-50 text-brand-800" : "border-stone-300 bg-white text-stone-700 hover:border-stone-400")
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Mode de chauffage principal">
                <select
                  value={state.chauffage}
                  onChange={(e) => set("chauffage", e.target.value as SimState["chauffage"])}
                  className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 bg-white focus:border-brand-600 focus:outline-none"
                >
                  <option value="electrique">Radiateurs &eacute;lectriques</option>
                  <option value="gaz">Chaudi&egrave;re gaz</option>
                  <option value="fioul">Chaudi&egrave;re fioul</option>
                  <option value="granule">Chaudi&egrave;re granul&eacute;s</option>
                  <option value="pac">Pompe &agrave; chaleur</option>
                  <option value="bois">Po&ecirc;le / chemin&eacute;e bois</option>
                </select>
              </Field>
            </div>
          </StepWrapper>
        )}

        {step === 2 && (
          <StepWrapper title="Votre situation fiscale" hint="D&eacute;termine le taux MaPrimeR&eacute;nov' applicable. Aucun justificatif demand&eacute;.">
            <div className="space-y-3">
              {([
                ["tres_modeste", "Tr&egrave;s modeste", "Jusqu'&agrave; ~22 000 &euro; / part"],
                ["modeste", "Modeste", "~22 000 &ndash; 28 000 &euro;"],
                ["intermediaire", "Interm&eacute;diaire", "~28 000 &ndash; 42 000 &euro;"],
                ["superieur", "Sup&eacute;rieur", "Au-del&agrave; de 42 000 &euro;"],
              ] as const).map(([val, label, sub]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => set("revenus", val)}
                  className={
                    "w-full text-left rounded-xl border-2 px-5 py-4 transition " +
                    (state.revenus === val ? "border-brand-600 bg-brand-50" : "border-stone-300 bg-white hover:border-stone-400")
                  }
                >
                  <div className="font-semibold text-stone-900">{label}</div>
                  <div className="text-sm text-stone-600 mt-0.5">{sub}</div>
                </button>
              ))}
            </div>
          </StepWrapper>
        )}

        {step === 3 && (
          <StepWrapper title="O&ugrave; se situe le bien&nbsp;?" hint="Zone climatique H1/H2/H3 : impact sur le montant CEE.">
            <Field label="Code postal">
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="Ex. 69003"
                value={state.cp}
                onChange={(e) => set("cp", e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 focus:border-brand-600 focus:outline-none"
              />
            </Field>
            {state.cp.length === 5 && (
              <p className="mt-3 text-sm text-stone-600">
                Zone climatique d&eacute;tect&eacute;e &mdash; calcul imm&eacute;diat.
              </p>
            )}
          </StepWrapper>
        )}

        {step === 4 && (
          <div>
            {loading && (
              <div className="flex items-center justify-center py-16 text-stone-500">
                <Loader2 className="animate-spin mr-2" /> Calcul en cours&hellip;
              </div>
            )}
            {!loading && result && (
              <>
                <ResultCard result={result} state={state} />
                <div className="mt-8">
                  <LeadCaptureCard state={state} result={result} />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={back} className="btn-secondary text-sm">
                    <ArrowLeft size={16} /> Modifier une r&eacute;ponse
                  </button>
                  <button type="button" onClick={restart} className="text-sm text-stone-600 hover:text-brand-700 underline underline-offset-2">
                    Refaire la simulation
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {step < 4 && (
          <div className="mt-8 flex items-center justify-between">
            <div>
              {step > 0 && (
                <button type="button" onClick={back} className="text-sm text-stone-600 hover:text-stone-900">
                  &larr; Retour
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={next}
              disabled={
                (step === 0 && !state.classe) ||
                (step === 3 && !/^\d{5}$/.test(state.cp))
              }
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 3 ? "Voir mon r&eacute;sultat" : "Continuer"}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepWrapper({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900 mb-2" dangerouslySetInnerHTML={{ __html: title }} />
      {hint && <p className="text-sm text-stone-600 mb-6" dangerouslySetInnerHTML={{ __html: hint }} />}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm font-semibold text-stone-800 mb-2">{label}</div>
      {children}
    </label>
  );
}

function getSessionId(): string {
  if (typeof window === "undefined") return "srv";
  let id = sessionStorage.getItem("zp_session");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem("zp_session", id);
  }
  return id;
}
'''

# ==================== RESULT CARD (instant value) ====================
FILES["src/components/ResultCard.tsx"] = r'''"use client";
import { TrendingDown, TrendingUp, FileCheck, Check } from "lucide-react";
import type { SimulateurResult } from "@/lib/pricing";

const eur = (n: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n)) + " &euro;";

export default function ResultCard({
  result,
  state,
}: {
  result: SimulateurResult;
  state: { classe: string; surface: number };
}) {
  const gainYear = result.gainFactureMensuel * 12;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white p-6 sm:p-8">
        <div className="text-brand-100 text-sm font-semibold uppercase tracking-wide mb-2">
          Votre sortie de passoire
        </div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <div className="font-display text-5xl font-bold">
            {result.nouvelleClasse}
          </div>
          <div className="text-brand-200 text-lg">
            <span className="line-through">{state.classe}</span> &rarr; {result.nouvelleClasse}
          </div>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
          <Stat icon={<TrendingUp size={18} />} label="Coût travaux estimé">
            {eur(result.coutTravauxMin)} &ndash; {eur(result.coutTravauxMax)}
          </Stat>
          <Stat icon={<Check size={18} />} label="Aides mobilisables">
            {eur(result.primeMpr + result.primeCee)}
          </Stat>
          <Stat icon={<TrendingDown size={18} />} label="Reste &agrave; charge estim&eacute;">
            <span className="font-bold">{eur(result.resteAMinerMin)} &ndash; {eur(result.resteAMinerMax)}</span>
          </Stat>
          <Stat icon={<FileCheck size={18} />} label="Gain facture &eacute;nergie">
            {eur(result.gainFactureMensuel)}/mois &middot; {eur(gainYear)}/an
          </Stat>
        </div>
      </div>

      <div className="card">
        <h4 className="font-display font-bold text-stone-900 mb-3">D&eacute;tail des aides retenues</h4>
        <div className="text-sm space-y-2 text-stone-700">
          <Row label="MaPrimeR&eacute;nov' (parcours accompagn&eacute;)" value={eur(result.primeMpr)} />
          <Row label="CEE (BAR-TH-105 / 106)" value={eur(result.primeCee)} />
          <div className="border-t border-stone-200 my-2" />
          <Row label={<strong>Total aides</strong>} value={<strong>{eur(result.primeMpr + result.primeCee)}</strong>} />
        </div>
        <div className="mt-4 text-xs text-stone-500 leading-relaxed">
          Zone climatique {result.contexte.climat} &middot; bar&egrave;mes arr&ecirc;t&eacute;s MPR&nbsp;2026&nbsp;(2 oct. 2025),
          CEE&nbsp;P6&nbsp;(janv.&nbsp;2026). Montants indicatifs, non contractuels. Un audit &eacute;nerg&eacute;tique RGE
          affine le r&eacute;sultat &agrave; votre situation.
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 opacity-80">{icon}</div>
      <div>
        <div className="text-brand-200 text-xs">{label}</div>
        <div className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: String(children) }} />
      </div>
    </div>
  );
}
function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <span dangerouslySetInnerHTML={{ __html: String(label) }} />
      <span className="tabular-nums" dangerouslySetInnerHTML={{ __html: String(value) }} />
    </div>
  );
}
'''

# ==================== LEAD CAPTURE (post-value) ====================
FILES["src/components/LeadCaptureCard.tsx"] = r'''"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Send, Loader2, Lock } from "lucide-react";
import type { SimulateurInput, SimulateurResult } from "@/lib/pricing";

export default function LeadCaptureCard({
  state,
  result,
}: {
  state: SimulateurInput;
  result: SimulateurResult;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [callback, setCallback] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Email invalide.");
      return;
    }
    setSubmitting(true);
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone: phone || null,
          simulation: { input: state, result },
          consent_callback: callback,
          consent_newsletter: newsletter,
          utm: readUtm(),
          session_id: sessionStorage.getItem("zp_session") || undefined,
        }),
      });
      if (!r.ok) throw new Error("submit_failed");
      const { id } = await r.json();
      sessionStorage.setItem("zp_lead_id", id);
      router.push("/success");
    } catch {
      setError("Une erreur est survenue. R&eacute;essayez ou &eacute;crivez-nous via la page Contact.");
      setSubmitting(false);
    }
  }

  return (
    <div className="card border-2 border-brand-200 bg-brand-50/50">
      <div className="flex items-center gap-2 text-brand-800 mb-2">
        <Mail size={18} />
        <div className="text-sm font-semibold uppercase tracking-wide">Recevoir ce plan par email</div>
      </div>
      <h3 className="text-xl font-display font-bold text-stone-900 mb-2">
        On vous envoie le d&eacute;tail chiffr&eacute; + la liste des pros RGE de votre secteur.
      </h3>
      <p className="text-sm text-stone-700 mb-6">
        Vous pouvez aussi fermer cette page, vos r&eacute;sultats restent affich&eacute;s ci-dessus.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1.5">Email *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 focus:border-brand-600 focus:outline-none"
            placeholder="vous@exemple.fr"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-1.5">
            T&eacute;l&eacute;phone <span className="font-normal text-stone-500">(optionnel)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border-2 border-stone-300 bg-white px-4 py-3 focus:border-brand-600 focus:outline-none"
            placeholder="06 12 34 56 78"
          />
        </div>
        <div className="space-y-2 text-sm text-stone-700">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={callback}
              onChange={(e) => setCallback(e.target.checked)}
              className="mt-1"
            />
            <span>Un conseiller RGE de mon d&eacute;partement peut me rappeler <strong>une seule fois</strong>, sur le cr&eacute;neau de mon choix.</span>
          </label>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="mt-1"
            />
            <span>Je souhaite recevoir les &eacute;volutions des aides (2 mails/mois max).</span>
          </label>
        </div>
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800" dangerouslySetInnerHTML={{ __html: error }} />
        )}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          Recevoir mon plan complet
        </button>
        <p className="text-xs text-stone-500 flex items-center justify-center gap-1">
          <Lock size={12} /> Donn&eacute;es chiffr&eacute;es. Aucune revente &agrave; des tiers.
        </p>
      </form>
    </div>
  );
}

function readUtm() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || undefined,
    utm_medium: p.get("utm_medium") || undefined,
    utm_campaign: p.get("utm_campaign") || undefined,
    gclid: p.get("gclid") || undefined,
    fbclid: p.get("fbclid") || undefined,
  };
}
'''

# ==================== MOBILE STICKY BAR ====================
FILES["src/components/MobileStickyBar.tsx"] = r'''"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MobileStickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 700);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white border-t border-stone-200 p-3 shadow-lg">
      <Link href="/#simulateur" className="btn-primary w-full text-sm">
        Estimer mon reste &agrave; charge
      </Link>
    </div>
  );
}
'''

# ==================== SUPABASE CLIENT ====================
FILES["src/lib/supabase.ts"] = r'''import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client, server-only. Never import from a client component.
 * Returns null if env vars aren't set — route handlers must guard.
 */
let _admin: SupabaseClient | null | undefined;
export function supabaseAdmin(): SupabaseClient | null {
  if (_admin !== undefined) return _admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  _admin = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return _admin;
}
'''

# ==================== API /api/leads ====================
FILES["src/app/api/leads/route.ts"] = r'''import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.\-]*\d{2}){4}$/;

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const phone = body.phone ? String(body.phone).trim() : null;
  const simulation = body.simulation;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (phone && !PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }
  if (!simulation || !simulation.result) {
    return NextResponse.json({ error: "simulation_required" }, { status: 400 });
  }

  const client = supabaseAdmin();
  const record = {
    email,
    phone,
    simulation,
    consent_callback: !!body.consent_callback,
    consent_newsletter: !!body.consent_newsletter,
    utm_source: body.utm?.utm_source || null,
    utm_medium: body.utm?.utm_medium || null,
    utm_campaign: body.utm?.utm_campaign || null,
    gclid: body.utm?.gclid || null,
    fbclid: body.utm?.fbclid || null,
    session_id: body.session_id || null,
    created_at: new Date().toISOString(),
  };

  if (!client) {
    // Fallback dev sans Supabase configuré — log en console, retourne succès mock.
    console.log("[zeropassoire][DEV][lead]", record);
    return NextResponse.json({ ok: true, id: "dev-" + Math.random().toString(36).slice(2), mode: "dev" });
  }

  const { data, error } = await client.from("leads").insert(record).select("id").single();
  if (error) {
    console.error("[zeropassoire][supabase]", error);
    return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  }

  // Funnel event
  await client.from("events").insert({
    session_id: record.session_id,
    event_name: "lead_submitted",
    properties: { lead_id: data.id, classe: simulation.result.nouvelleClasse },
    created_at: record.created_at,
  });

  return NextResponse.json({ ok: true, id: data.id });
}
'''

# ==================== API /api/events (funnel analytics) ====================
FILES["src/app/api/events/route.ts"] = r'''import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: true }); }

  const client = supabaseAdmin();
  if (!client) return NextResponse.json({ ok: true, mode: "dev" });

  await client.from("events").insert({
    session_id: body.session_id || null,
    event_name: String(body.event_name || "unknown").slice(0, 60),
    properties: body.properties ?? {},
    created_at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
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
    print(f"\nP2 scaffold (la machine) — {written} file(s) written.")

if __name__ == "__main__":
    main()
