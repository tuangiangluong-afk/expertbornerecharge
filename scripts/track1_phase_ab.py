#!/usr/bin/env python3
"""
Track 1 — Phase A (blog UX pass) + Phase B (pillar page /dpe-collectif)

Phase A — Blog conversion parity with guides:
  1. Add a LeadForm section with id="simulateur" to blog/[slug]/page.tsx
     (same pattern that was applied to guides/[slug]/page.tsx).
  2. Now that BOTH guides and blog have the anchor, flip the shared
     SimulatorWidget CTA from /#simulateur (home) to #simulateur (in-page).
     This is safe because the only two consumers are guides and blog.

Phase B — Pillar page /dpe-collectif:
  3. Create a proper landing route src/app/dpe-collectif/page.tsx that
     meshes the 3 cluster guides + a LeadForm (#simulateur section) +
     FAQPage JSON-LD. Pattern: src/app/glossaire/page.tsx (Header+Footer
     + getSiteConfig('home')).
  4. Register the new URL in src/app/sitemap.ts static routes.

Guards: git-clean repo check, dry-run mode, all edits are string-exact
and asserted before writing. Verified separately with npx next build.
"""
from pathlib import Path
import subprocess
import sys

REPO = Path("/Users/marc/Downloads/project-zero/thermostatcopropriete.fr")

BLOG_PAGE = REPO / "src/app/blog/[slug]/page.tsx"
SIMULATOR = REPO / "src/components/blog/SimulatorWidget.tsx"
PILLAR    = REPO / "src/app/dpe-collectif/page.tsx"
SITEMAP   = REPO / "src/app/sitemap.ts"


def git_clean(repo: Path) -> bool:
    out = subprocess.run(["git", "-C", str(repo), "status", "--porcelain"],
                         capture_output=True, text=True).stdout
    return out.strip() == ""


def must_replace(path: Path, old: str, new: str, expected=1):
    t = path.read_text(encoding="utf-8")
    n = t.count(old)
    assert n == expected, f"{path.name}: expected {expected} match, got {n}"
    path.write_text(t.replace(old, new, expected), encoding="utf-8")


# ---------- Phase A: blog page ----------
BLOG_IMPORT_OLD = "import SimulatorWidget from '@/components/blog/SimulatorWidget';"
BLOG_IMPORT_NEW = (
    "import SimulatorWidget from '@/components/blog/SimulatorWidget';\n"
    "import LeadForm from '@/components/LeadForm';"
)
BLOG_SECTION_OLD = (
    "                    </aside>\n"
    "                </div>\n"
    "            </div>\n"
    "        </main>"
)
BLOG_SECTION_NEW = (
    "                    </aside>\n"
    "                </div>\n"
    "            </div>\n"
    "\n"
    "            {/* In-page conversion section: gives `#simulateur` a real target on blog posts. */}\n"
    "            <section id=\"simulateur\" className=\"mt-20 max-w-4xl mx-auto scroll-mt-32\">\n"
    "                <div className=\"bg-white p-8 rounded-3xl shadow-xl border border-slate-100\">\n"
    "                    <div className=\"text-center mb-8\">\n"
    "                        <h2 className=\"text-3xl font-bold text-slate-900 mb-3\">Devis gratuit pour votre copropriété</h2>\n"
    "                        <p className=\"text-slate-600\">Estimez les aides CEE mobilisables et recevez jusqu'à 3 devis d'installateurs certifiés.</p>\n"
    "                    </div>\n"
    "                    <LeadForm city=\"France\" domain=\"thermostatcopropriete.fr\" targetType=\"COPRO\" themeColor=\"rose\" />\n"
    "                </div>\n"
    "            </section>\n"
    "        </main>"
)

# ---------- Phase A: SimulatorWidget shared by guides + blog ----------
SIM_OLD = '<a href="/#simulateur"'
SIM_NEW = '<a href="#simulateur"'

# ---------- Phase A: guides mobile sticky was already flipped ----------
# (kept as comment for future readers of this injector)

# ---------- Phase B: pillar page content ----------
PILLAR_TSX = '''export const revalidate = 86400; // 24h ISR cache
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteConfig } from "@/lib/sites-config";
import LeadForm from "@/components/LeadForm";
import { FileSearch, ClipboardList, ReceiptEuro, ArrowRight } from "lucide-react";

const BASE_URL = "https://www.thermostatcopropriete.fr";

export const metadata: Metadata = {
    title: "DPE Collectif en copropriété : obligations, prix et PPT (2026)",
    description:
        "Guide pilier du DPE collectif en copropriété : calendrier légal par taille, prix réel par lot, et Plan Pluriannuel de Travaux (Cas 1/2/3). Audit gratuit.",
    alternates: { canonical: `${BASE_URL}/dpe-collectif` },
    openGraph: {
        title: "DPE Collectif en copropriété : le guide pilier 2026",
        description:
            "Obligations légales, prix par lot, PPT et lien vers la sortie de passoire énergétique. Tout ce qu'un conseil syndical doit savoir.",
        url: `${BASE_URL}/dpe-collectif`,
        locale: "fr_FR",
        type: "website",
    },
};

const CLUSTER = [
    {
        href: "/guides/obligation-dpe-collectif-copropriete-calendrier-par-taille",
        icon: FileSearch,
        title: "Calendrier & obligations légales",
        excerpt:
            "Depuis 2025 (>200 lots) jusqu'en 2028 (<20 lots) : qui est concerné, à quelle échéance, et quelles sanctions en cas de carence.",
        kicker: "Réglementation",
    },
    {
        href: "/guides/prix-dpe-collectif-copropriete-cout-par-lot-2026",
        icon: ReceiptEuro,
        title: "Prix réel & coût par lot",
        excerpt:
            "Grille de tarifs constatée en 2026 pour un DPE collectif, en fonction de la taille, de la complexité du bâti et des options (thermographie, infiltrométrie).",
        kicker: "Budget",
    },
    {
        href: "/guides/plan-pluriannuel-travaux-ppt-copropriete-cas-1-cas-2-cas-3",
        icon: ClipboardList,
        title: "PPT : Cas 1, Cas 2, Cas 3",
        excerpt:
            "Que se passe-t-il après le DPE ? Les trois configurations de Plan Pluriannuel de Travaux, leurs obligations de vote en AG et leurs délais.",
        kicker: "Travaux",
    },
];

export default function DPECollectifPillarPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "DPE Collectif", item: `${BASE_URL}/dpe-collectif` },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Le DPE collectif est-il obligatoire pour toutes les copropriétés ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Oui, pour toute copropriété de 50 lots ou plus dont le permis de construire a été déposé avant le 1er juin 2001. Le calendrier s'étale de 2025 (>200 lots) à 2028 (20 à 49 lots). Les copropriétés de moins de 20 lots sont exclues du dispositif DPE collectif mais restent concernées par l'audit énergétique si elles sont classées E, F ou G.",
                },
            },
            {
                "@type": "Question",
                name: "Combien coûte un DPE collectif en 2026 ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Le marché 2026 se situe entre 250 € et 450 € HT par lot, avec un effet dégressif marqué au-delà de 100 lots. Pour une copropriété de 50 lots, comptez environ 12 000 à 18 000 € HT ; pour 200 lots, 30 000 à 55 000 € HT. Les options (thermographie, infiltrométrie, relevé partiel) peuvent ajouter 10 à 25 % au devis.",
                },
            },
            {
                "@type": "Question",
                name: "Un mauvais DPE oblige-t-il à faire des travaux ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Le DPE collectif seul n'oblige pas à voter des travaux. En revanche, s'il classe l'immeuble en E, F ou G, un audit énergétique « sort de passoire » est exigé, et le Plan Pluriannuel de Travaux (PPT) devient obligatoire avec un échancier décennal. Les classes F et G au niveau immeuble sont interdites de mise en location depuis le 1er janvier 2025.",
                },
            },
            {
                "@type": "Question",
                name: "Le DPE collectif peut-il ouvrir droit à MaPrimeRénov' Copro ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Oui, à condition que les travaux votés en AG atteignent au moins un saut de 2 classes énergétiques (par exemple E→C) et soient réalisés par un professionnel RGE. Les plafonds MaPrimeRénov' Copro vont jusqu'à 3 000 € par lot pour un saut de 2 classes et 3 750 € pour un passage en B ou A, cumulables avec les CEE (barème BAR-TH).",
                },
            },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header isHub={true} variant="default" themeColor="rose" />

            <main className="flex-grow pt-32 pb-16">
                {/* Hero */}
                <section className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                            <span className="w-2 h-2 bg-rose-600 rounded-full animate-pulse" />
                            Guide pilier · Mise à jour 2026
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            DPE Collectif en copropriété :
                            <span className="text-rose-600"> tout ce qu'il faut savoir en 2026</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Obligations légales, calendrier par taille de copropriété, prix réel par lot, Plan Pluriannuel
                            de Travaux (Cas 1, 2, 3) et articulation avec MaPrimeRénov' Copro et les CEE.
                            Une synthèse à jour, sourcée, pensée pour les conseils syndicaux.
                        </p>
                    </div>

                    {/* Cluster cards */}
                    <section className="grid md:grid-cols-3 gap-6 mb-16">
                        {CLUSTER.map((c) => {
                            const Icon = c.icon;
                            return (
                                <Link
                                    key={c.href}
                                    href={c.href}
                                    className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-100 transition-all hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
                                        <Icon size={22} />
                                    </div>
                                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
                                        {c.kicker}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-rose-700 transition">
                                        {c.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{c.excerpt}</p>
                                    <div className="inline-flex items-center gap-1 text-rose-700 font-semibold text-sm group-hover:gap-2 transition-all">
                                        Lire le guide <ArrowRight size={16} />
                                    </div>
                                </Link>
                            );
                        })}
                    </section>

                    {/* Réponse directe / TL;DR */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Réponse directe</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Le <strong>DPE collectif</strong> est obligatoire depuis le <strong>1er janvier 2025</strong> pour
                            les copropriétés de <strong>plus de 200 lots</strong>, et s'étend progressivement jusqu'en{" "}
                            <strong>2028</strong> pour celles de <strong>50 à 200 lots</strong> (Loi Climat &amp; Résilience,
                            art. 260). Il conditionne l'accès à <strong>MaPrimeRénov' Copro</strong> et déclenche, en cas de
                            classe E/F/G, un <strong>audit énergétique</strong> et un <strong>Plan Pluriannuel de Travaux</strong>
                            sur 10 ans.
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            Prix constaté 2026 : entre <strong>250 € et 450 € HT par lot</strong>, dégressif au-delà de 100 lots.
                            Un diagnostic de performance collective bien mené se rentabilise par les aides mobilisables —
                            jusqu'à 9 000 € par lot en MaPrimeRénov' Copro + CEE pour un saut de 3 classes.
                        </p>
                    </section>

                    {/* CTA conversion */}
                    <section id="simulateur" className="scroll-mt-32 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-3">
                                Estimer le budget DPE collectif de votre copropriété
                            </h2>
                            <p className="text-slate-600">
                                Audit gratuit, sans engagement. Recevez jusqu'à 3 devis de diagnostiqueurs certifiés.
                            </p>
                        </div>
                        <LeadForm city="France" domain="thermostatcopropriete.fr" targetType="COPRO" themeColor="rose" />
                    </section>
                </section>
            </main>

            <Footer config={getSiteConfig("home")!} />
        </div>
    );
}
'''

# ---------- Phase B: sitemap ----------
SITEMAP_OLD = (
    "        {\n"
    "            url: `${BASE_URL}/guides`,\n"
    "            lastModified: new Date(),\n"
    "            changeFrequency: 'daily',\n"
    "            priority: 0.9,\n"
    "        },"
)
SITEMAP_NEW = (
    SITEMAP_OLD
    + "\n"
    "        {\n"
    "            url: `${BASE_URL}/dpe-collectif`,\n"
    "            lastModified: new Date(),\n"
    "            changeFrequency: 'weekly',\n"
    "            priority: 0.9,\n"
    "        },"
)


def main():
    dry = "--dry-run" in sys.argv
    if not git_clean(REPO):
        print("FATAL: repo dirty, refusing"); sys.exit(3)

    actions = []

    # --- Phase A.1: blog import
    bt = BLOG_PAGE.read_text(encoding="utf-8")
    if "import LeadForm from '@/components/LeadForm';" not in bt:
        assert BLOG_IMPORT_OLD in bt, "blog import anchor not found"
        actions.append(("blog import", "add LeadForm import"))

    # --- Phase A.2: blog section
    if 'id="simulateur"' not in bt:
        assert BLOG_SECTION_OLD in bt, "blog section anchor not found"
        actions.append(("blog section", "insert #simulateur LeadForm section before </main>"))

    # --- Phase A.3: SimulatorWidget flip
    st = SIMULATOR.read_text(encoding="utf-8")
    if SIM_OLD in st:
        assert st.count(SIM_OLD) == 1, "SimulatorWidget href not unique"
        actions.append(("SimulatorWidget", "flip /#simulateur -> #simulateur"))

    # --- Phase B.1: pillar page
    if not PILLAR.exists():
        PILLAR.parent.mkdir(parents=True, exist_ok=True)
        actions.append(("pillar route", f"create {PILLAR.relative_to(REPO)}"))

    # --- Phase B.2: sitemap
    smt = SITEMAP.read_text(encoding="utf-8")
    if "/dpe-collectif" not in smt:
        assert SITEMAP_OLD in smt, "sitemap anchor not found"
        actions.append(("sitemap", "add /dpe-collectif entry"))

    if dry:
        print("[dry-run] would perform:")
        for name, detail in actions:
            print(f"  - {name}: {detail}")
        return

    for name, _ in actions:
        if name == "blog import":
            must_replace(BLOG_PAGE, BLOG_IMPORT_OLD, BLOG_IMPORT_NEW)
        elif name == "blog section":
            must_replace(BLOG_PAGE, BLOG_SECTION_OLD, BLOG_SECTION_NEW)
        elif name == "SimulatorWidget":
            must_replace(SIMULATOR, SIM_OLD, SIM_NEW)
        elif name == "pillar route":
            PILLAR.write_text(PILLAR_TSX, encoding="utf-8")
        elif name == "sitemap":
            must_replace(SITEMAP, SITEMAP_OLD, SITEMAP_NEW)
        print(f"OK   {name}")

    print("\nAll Phase A + B edits applied.")


if __name__ == "__main__":
    main()
