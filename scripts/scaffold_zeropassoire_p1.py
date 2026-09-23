#!/usr/bin/env python3
"""
zeropassoire.fr — scaffold partie 1/4
Configs + public assets + root layout + libs (pricing 2026, mdx loader).

Design intent: distinct brand from the 10 Empire sites.
- Palette: emerald + amber + stone (not rose, not blue)
- Fonts: Space Grotesk for headings, Inter for body (both via next/font/google)
- Minimal package.json (only what's actually used — no residue).
"""
from pathlib import Path
import sys

ROOT = Path("/Users/marc/Downloads/project-zero/zeropassoire.fr")

FILES: dict[str, str] = {}

FILES["package.json"] = r'''{
  "name": "zeropassoire",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.1.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.469.0",
    "gray-matter": "^4.0.3",
    "marked": "^15.0.6"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/marked": "^6.0.0",
    "tailwindcss": "^3.4.17",
    "postcss": "^8",
    "autoprefixer": "^10.4.20"
  }
}
'''

FILES["tsconfig.json"] = r'''{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'''

FILES["next.config.ts"] = r'''import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
};

export default nextConfig;
'''

FILES["tailwind.config.ts"] = r'''import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        alert: {
          50:  "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [typography],
};
export default config;
'''

FILES["postcss.config.mjs"] = r'''export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
'''

FILES["next-env.d.ts"] = r'''/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
'''

FILES[".gitignore"] = r'''# dependencies
/node_modules
/.pnp
.pnp.*

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env
.env*
!.env.example

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts.bak
'''

FILES["README.md"] = r'''# zeropassoire.fr

Site de sensibilisation et simulateur de sortie de passoire énergétique (logements classés F ou G au DPE).

## Stack

- Next.js 15 App Router, TypeScript
- Tailwind 3 avec palette personnalisée (`brand` emerald, `alert` amber, `stone` neutres)
- Fonts : Space Grotesk (display) + Inter (body) via `next/font/google`
- Contenu guides : Markdown + gray-matter, lu au runtime via `src/lib/mdx.ts`

## Démarrer

```bash
npm install
npm run dev
```

## Simulateur

La logique de calcul est dans `src/lib/pricing.ts` (barèmes 2026 : prix travaux par m², plafonds MaPrimeRénov', CEE BAR-TH, sortie de passoire). Modifier dans ce seul fichier pour garder le simulateur cohérent avec les guides.

## Capture de leads

`POST /api/leads` accepte le payload du `LeadForm`. En local, log en console. En prod, brancher sur la base de votre choix (Supabase, Postgres, webhook n8n — voir commentaire dans la route).

## Déploiement

Vercel, output « Standalone » non requis (serverless default).
'''

FILES["public/logo.svg"] = r'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
  <path d="M6 24 L24 8 L42 24" stroke="#047857" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 26 V40 H38 V26" stroke="#047857" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24 34 V20 M18 25 L24 19 L30 25" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'''

FILES["public/icon.svg"] = FILES["public/logo.svg"]

FILES["src/app/globals.css"] = r'''@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body {
    @apply bg-stone-50 text-stone-900 antialiased;
    font-feature-settings: "cv11", "ss01";
  }
  h1, h2, h3, h4 { @apply font-display tracking-tight; }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-900/10 transition hover:bg-brand-800 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2;
  }
  .btn-secondary {
    @apply inline-flex items-center justify-center gap-2 rounded-xl border-2 border-stone-300 bg-white px-6 py-3 font-semibold text-stone-900 transition hover:border-brand-700 hover:text-brand-700;
  }
  .card {
    @apply rounded-2xl border border-stone-200 bg-white p-6 shadow-sm;
  }
}

/* Prose overrides for MDX-rendered guide bodies */
.prose-zeropassoire :where(h2) { @apply text-3xl font-bold text-stone-900 mt-12 mb-4; }
.prose-zeropassoire :where(h3) { @apply text-xl font-bold text-stone-900 mt-8 mb-3; }
.prose-zeropassoire :where(p)  { @apply text-stone-700 leading-relaxed my-4; }
.prose-zeropassoire :where(a)  { @apply text-brand-700 underline decoration-brand-500/40 hover:decoration-brand-700; }
.prose-zeropassoire :where(table) { @apply w-full my-6 text-sm border-collapse; }
.prose-zeropassoire :where(th) { @apply bg-stone-100 text-left p-3 font-semibold border border-stone-200; }
.prose-zeropassoire :where(td) { @apply p-3 border border-stone-200 align-top; }
.prose-zeropassoire :where(ul), .prose-zeropassoire :where(ol) { @apply my-4 pl-6 space-y-2 text-stone-700; }
.prose-zeropassoire :where(strong) { @apply text-stone-900 font-semibold; }
'''

FILES["src/app/layout.tsx"] = r'''import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["500", "700"],
  display: "swap",
});

const BASE_URL = "https://zeropassoire.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Zéro Passoire — Sortir de son DPE F ou G sans se ruiner",
    template: "%s | Zéro Passoire",
  },
  description:
    "Simulateur gratuit de sortie de passoire énergétique. Estimez le coût des travaux, les aides MaPrimeRénov' et CEE mobilisables, et le gain sur votre facture.",
  openGraph: {
    title: "Zéro Passoire — Sortir de son DPE F ou G",
    description:
      "Simulateur gratuit : coût des travaux, aides mobilisables et gain énergétique pour les passoires thermiques.",
    url: BASE_URL,
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#047857",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
'''

# ---------------- lib/pricing.ts ----------------
FILES["src/lib/pricing.ts"] = r'''/**
 * Barèmes 2026 pour simulateur de sortie de passoire énergétique.
 * Sources : ARRETE du 2 octobre 2025 (MaPrimeRénov' 2026), Barème CEE
 * BAR-TH-105 / 106 / 129, prix observés ADEME 2025-2026.
 * Toute modification doit être répercutée dans les guides MDX.
 */

export type DpeClass = "E" | "F" | "G";
export type ChauffageType = "electrique" | "gaz" | "fioul" | "granule" | "pac" | "bois";
export type LogementType = "maison" | "appartement";

export interface SimulateurInput {
  classe: DpeClass;
  surface: number;         // m²
  cp: string;              // code postal 5 chiffres
  chauffage: ChauffageType;
  type: LogementType;
  menageIncomeBracket: "tres_modeste" | "modeste" | "intermediaire" | "superieur";
}

export interface SimulateurResult {
  coutTravauxMin: number;
  coutTravauxMax: number;
  primeMpr: number;
  primeCee: number;
  resteAMinerMin: number;
  resteAMinerMax: number;
  gainFactureMensuel: number;   // euros / mois économisés
  nouvelleClasse: string;
  contexte: {
    zone: 1 | 2 | 3;
    climat: "H1" | "H2" | "H3";
  };
}

const ZONES: Record<string, 1 | 2 | 3> = {
  // zone H1 (nord, océanique) — on snappe par 2 premiers chiffres du CP
  59: 1, 62: 1, 80: 1, 2: 1, 51: 1, 8: 1, 10: 1, 21: 1, 25: 1, 39: 1, 70: 1, 88: 1, 89: 1, 90: 1,
  // zone H3 (méditerranéen) — outlier sud-est
  13: 3, 30: 3, 34: 3, 83: 3, 6: 3, 20: 3, 11: 3, 66: 3,
};

function zoneFromCp(cp: string): 1 | 2 | 3 {
  const k = cp.slice(0, 2);
  if (k === "75" || k === "92" || k === "93" || k === "94") return 1; // IdF froid
  return ZONES[k] ?? 2;
}

function climatFromZone(z: 1 | 2 | 3): "H1" | "H2" | "H3" {
  return z === 1 ? "H1" : z === 3 ? "H3" : "H2";
}

// Coût poste isolé (€ HT) par m², mediane ADEME + retours installateurs
const POSTE_COUT: Record<string, { perM2: number; forfait: number }> = {
  isolation_murs_exterieurs: { perM2: 185, forfait: 0 },
  isolation_combles:         { perM2: 45,  forfait: 0 },
  isolation_sous_sol:        { perM2: 60,  forfait: 0 },
  remplacement_fenetres:     { perM2: 120, forfait: 0 },
  pompe_a_chaleur_air_eau:   { perM2: 0,   forfait: 13500 },
  chaudiere_granules:        { perM2: 0,   forfait: 9500 },
  vmc_double_flux:           { perM2: 0,   forfait: 4800 },
  audit_energetique:         { perM2: 0,   forfait: 550 },
  dpe:                       { perM2: 0,   forfait: 250 },
};

// Plafonds MaPrimeRénov' 2026 par profil bleu/jaune/ocre/vert
const MPR_PLAFOND: Record<SimulateurInput["menageIncomeBracket"], number> = {
  tres_modeste:  90_000,
  modeste:       75_000,
  intermediaire: 60_000,
  superieur:     40_000,
};

const MPR_PAC_TAUX: Record<SimulateurInput["menageIncomeBracket"], number> = {
  tres_modeste:  0.90,
  modeste:       0.75,
  intermediaire: 0.50,
  superieur:     0.30,
};

const MPR_ISOLATION_TAUX: Record<SimulateurInput["menageIncomeBracket"], number> = {
  tres_modeste:  0.90,
  modeste:       0.75,
  intermediaire: 0.50,
  superieur: 0.30,
};

/**
 * Estimation "parcours de sortie" typique.
 * - G : audit + PAC + isolation combles + menuiseries
 * - F : PAC + isolation combles ou murs + VMC
 * - E : PAC + isolation combles
 */
function parcoursPour(classe: DpeClass): { postes: string[]; nouvelleClasse: string } {
  switch (classe) {
    case "G":
      return {
        postes: [
          "audit_energetique",
          "dpe",
          "isolation_combles",
          "remplacement_fenetres",
          "pompe_a_chaleur_air_eau",
        ],
        nouvelleClasse: "C",
      };
    case "F":
      return {
        postes: [
          "dpe",
          "isolation_combles",
          "pompe_a_chaleur_air_eau",
          "vmc_double_flux",
        ],
        nouvelleClasse: "C",
      };
    case "E":
    default:
      return {
        postes: ["dpe", "isolation_combles", "pompe_a_chaleur_air_eau"],
        nouvelleClasse: "B",
      };
  }
}

function ceePrime(classe: DpeClass, surface: number, zone: 1 | 2 | 3): number {
  // ARRETE BAR-TH-105/106/129 (PAC air/eau, H1/H2/H3, maison individuelle)
  // Ordre de grandeur 2026, cumulable.
  const base = classe === "G" ? 5200 : classe === "F" ? 4400 : 2800;
  const surfaceBoost = Math.min(surface / 100, 1.5) - 1;
  const zoneBoost = zone === 1 ? 250 : zone === 3 ? -150 : 0;
  return Math.round(base * (1 + surfaceBoost * 0.15) + zoneBoost);
}

function factureMensuelleActuelle(classe: DpeClass, surface: number, chauffage: ChauffageType): number {
  // Consommation conventionnelle DPE (kWh/m²/an) × prix kWh selon énergie
  const kwhM2An = classe === "G" ? 400 : classe === "F" ? 300 : 230;
  const priokwh: Record<ChauffageType, number> = {
    electrique: 0.2516,
    gaz: 0.174,
    fioul: 0.185,
    granule: 0.093,
    pac: 0.2516 / 3.2,  // COP 3.2 moyen
    bois: 0.082,
  };
  return Math.round(surface * kwhM2An * priokwh[chauffage] / 12);
}

function factureApres(nouvelleClasse: string, surface: number): number {
  const kwhM2An = nouvelleClasse === "C" ? 130 : nouvelleClasse === "B" ? 90 : 180;
  // Post-sortie, chauffage quasi-systématiquement électrique (PAC)
  return Math.round(surface * kwhM2An * 0.079 / 12);
}

export function simulate(input: SimulateurInput): SimulateurResult {
  const zone = zoneFromCp(input.cp);
  const { postes, nouvelleClasse } = parcoursPour(input.classe);

  let travaux = 0;
  for (const poste of postes) {
    const p = POSTE_COUT[poste];
    if (p.perM2) travaux += p.perM2 * input.surface;
    if (p.forfait) travaux += p.forfait;
  }

  const mprTauxPac = MPR_PAC_TAUX[input.menageIncomeBracket];
  const mprTauxIso = MPR_ISOLATION_TAUX[input.menageIncomeBracket];
  const pacPoste = POSTE_COUT.pompe_a_chaleur_air_eau.forfait;
  const isoPosts = postes
    .filter((p) => p.startsWith("isolation") || p === "remplacement_fenetres")
    .reduce((acc, p) => acc + POSTE_COUT[p].perM2 * input.surface, 0);

  const plafond = MPR_PLAFOND[input.menageIncomeBracket];
  const mpr = Math.min(plafond, Math.round(pacPoste * mprTauxPac + isoPosts * mprTauxIso));
  const cee = ceePrime(input.classe, input.surface, zone);

  const min = Math.max(0, Math.round(travaux - mpr - cee));
  const max = Math.round(min + travaux * 0.18); // fourchette +18% (aléas chantier)

  const avant = factureMensuelleActuelle(input.classe, input.surface, input.chauffage);
  const apres = factureApres(nouvelleClasse, input.surface);
  const gain = Math.max(0, avant - apres);

  return {
    coutTravauxMin: Math.round(travaux * 0.92),
    coutTravauxMax: Math.round(travaux * 1.15),
    primeMpr: mpr,
    primeCee: cee,
    resteAMinerMin: min,
    resteAMinerMax: max,
    gainFactureMensuel: gain,
    nouvelleClasse,
    contexte: { zone, climat: climatFromZone(zone) },
  };
}
'''

# ---------------- lib/mdx.ts (guide loader) ----------------
FILES["src/lib/mdx.ts"] = r'''/**
 * Guide loader — lit src/content/guides/*.md, parse le frontmatter via gray-matter
 * et rend le corps en HTML via marked. Aucun MDX runtime, aucun composant custom:
 * les <Callout> et <CTA> sont rendus en post-processing sur des blocs markdown
 * dédiés (voir parseMarkers).
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const GUIDES_DIR = path.join(process.cwd(), "src/content/guides");

export interface Guide {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  category: string;
  htmlBody: string;
}

function parseMarkers(md: string): { html: string } {
  // Convertit ::: callout <titre>\n...\n:::  →  <div class="callout"><h4>Titre</h4>...</div>
  let out = md.replace(
    /:::\s*callout\s+([^\n]*)\n([\s\S]*?):::/g,
    (_m, title, body) =>
      `<div class="my-6 rounded-2xl border-l-4 border-brand-600 bg-brand-50 p-5">
         <h4 class="text-brand-800 font-semibold mb-2">${title.trim() || "À retenir"}</h4>
         <div class="text-stone-700">${marked.parse(body.trim()) as string}</div>
       </div>`
  );

  // Convertit ::: cta <texte>|<url> :::  →  <a class="btn-primary mt-6 inline-block">texte</a>
  out = out.replace(
    /:::\s*cta\s+([^|\n]+)\|([^\s]+)\s*:::/g,
    (_m, label, href) =>
      `<a href="${href}" class="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white shadow-lg hover:bg-brand-800 transition">${label.trim()}</a>`
  );

  return { html: marked.parse(out, { async: false }) as string };
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".md"));
  const guides = files.map((f) => {
    const raw = fs.readFileSync(path.join(GUIDES_DIR, f), "utf-8");
    const { data, content } = matter(raw);
    const slug = f.replace(/\.md$/, "");
    const { html } = parseMarkers(content);
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      publishedAt: String(data.publishedAt ?? "2026-01-01"),
      readTime: String(data.readTime ?? "5 min"),
      category: String(data.category ?? "Guide"),
      htmlBody: html,
    };
  });
  return guides.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getGuideBySlug(slug: string): Guide | null {
  return getAllGuides().find((g) => g.slug === slug) ?? null;
}
'''

# ---------------- execute ----------------
def main():
    dry = "--dry-run" in sys.argv
    if not ROOT.exists():
        ROOT.mkdir(parents=True)
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
    print(f"\nP1 scaffold — {written} file(s) written.")

if __name__ == "__main__":
    main()
