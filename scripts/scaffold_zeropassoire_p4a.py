#!/usr/bin/env python3
"""
zeropassoire.fr — scaffold partie 4a/4 (renderer guides, légal, SQL, .env)
Le contenu rédactionnel des 3 guides est dans 4b.
"""
from pathlib import Path
import sys

ROOT = Path("/Users/marc/Downloads/project-zero/zeropassoire.fr")
FILES: dict[str, str] = {}

# ==================== /guides listing ====================
FILES["src/app/guides/page.tsx"] = r'''import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getAllGuides } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Guides sortie de passoire énergétique",
  description:
    "Guides indépendants : obligations légales, aides financières 2026, parcours de travaux, interdiction de location. Sans démarchage, sans jargon.",
  alternates: { canonical: "https://zeropassoire.fr/guides" },
};

export default function GuidesListingPage() {
  const guides = getAllGuides();
  return (
    <section className="py-16 bg-stone-50 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-3">
            <BookOpen size={14} /> Ressources
          </div>
          <h1 className="font-display text-4xl font-bold text-stone-900 mb-3">Guides</h1>
          <p className="text-stone-600 max-w-2xl">
            Tout ce qu'il faut savoir pour sortir d'un DPE F ou G. Sources L&eacute;gifrance, ADEME, JO.
            Maj des bar&egrave;mes 2026.
          </p>
        </div>
        <div className="space-y-4">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="block card hover:border-brand-600 transition group"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wide text-stone-500 mb-1">
                    {g.category} &middot; {g.readTime} &middot; {new Date(g.publishedAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                  </div>
                  <h2 className="font-display text-xl font-bold text-stone-900 group-hover:text-brand-700 transition">
                    {g.title}
                  </h2>
                  <p className="mt-2 text-sm text-stone-600 leading-relaxed">{g.description}</p>
                </div>
                <ArrowRight className="text-brand-600 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-6" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
'''

# ==================== /guides/[slug] renderer ====================
FILES["src/app/guides/[slug]/page.tsx"] = r'''import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllGuides, getGuideBySlug } from "@/lib/mdx";

const BASE = "https://zeropassoire.fr";

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const url = `${BASE}/guides/${slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      locale: "fr_FR",
      type: "article",
      publishedTime: guide.publishedAt,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    author: { "@type": "Organization", name: "Zéro Passoire" },
    publisher: { "@type": "Organization", name: "Zéro Passoire", url: BASE },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/guides/${slug}` },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: `${BASE}/guides/${slug}` },
    ],
  };

  return (
    <article className="py-16 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-brand-700 mb-6"
        >
          <ArrowLeft size={16} /> Tous les guides
        </Link>
        <div className="text-xs uppercase tracking-widest text-brand-700 font-semibold mb-3">
          {guide.category} &middot; {guide.readTime}
        </div>
        <h1 className="font-display text-4xl font-bold text-stone-900 leading-tight mb-4">
          {guide.title}
        </h1>
        <p className="text-lg text-stone-600 mb-10 leading-relaxed">{guide.description}</p>

        <div
          className="prose-zeropassoire max-w-none"
          dangerouslySetInnerHTML={{ __html: guide.htmlBody }}
        />

        {/* Bottom-of-guide funnel */}
        <div className="mt-16 p-6 rounded-2xl bg-brand-50 border border-brand-200 text-center">
          <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">
            Votre situation m&eacute;rite des chiffres &agrave; jour
          </h3>
          <p className="text-stone-700 mb-5 text-sm">
            Le simulateur vous donne votre reste &agrave; charge pr&eacute;cis en 40 secondes.
          </p>
          <Link href="/simulateur" className="btn-primary inline-flex">
            Estimer mon reste &agrave; charge
          </Link>
        </div>
      </div>
    </article>
  );
}
'''

# ==================== /mentions-legales ====================
FILES["src/app/mentions-legales/page.tsx"] = r'''import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <section className="py-16 bg-white min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-6">Mentions l&eacute;gales</h1>
        <div className="prose-zeropassoire max-w-none space-y-6 text-sm leading-relaxed">
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Éditeur</h2>
            <p className="text-stone-700">
              Le pr&eacute;sent site est &eacute;dité par la soci&eacute;t&eacute; exploitant la marque
              <strong> z&eacute;ropassoire.fr</strong>. Identifiant SIRET et adresse du si&egrave;ge
              social disponibles sur simple demande via la page Contact (conform&eacute;ment &agrave;
              l'article 6 de la loi n&deg; 2004-575 pour la confiance dans l'&eacute;conomie num&eacute;rique).
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Directeur de la publication</h2>
            <p className="text-stone-700">Le repr&eacute;sentant l&eacute;gal de la soci&eacute;t&eacute; &eacute;ditrice.</p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">H&eacute;bergement</h2>
            <p className="text-stone-700">
              Site h&eacute;berg&eacute; par Vercel Inc., 440 N Barranca Ave #1565, Covina, CA 91723, &Eacute;tats-Unis.
              Donn&eacute;es personnelles stock&eacute;es au sein de l'Union europ&eacute;enne (Supabase, Francfort).
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Nature du service</h2>
            <p className="text-stone-700">
              Z&eacute;ro Passoire est un site &eacute;ditorial et un simulateur ind&eacute;pendant &agrave; usage
              informatif. Il ne constitue ni un devis, ni un conseil personnalis&eacute;, ni un
              engagement contractuel. Les montants affich&eacute;s sont des estimations bas&eacute;es sur
              des bar&egrave;mes publics &agrave; ±15&nbsp;% pr&egrave;s.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Propri&eacute;t&eacute; intellectuelle</h2>
            <p className="text-stone-700">
              L'ensemble des contenus (textes, code source, design, logo SVG) est prot&eacute;g&eacute;.
              Toute reproduction int&eacute;grale ou partielle sans autorisation &eacute;crite est interdite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

# ==================== /cgv ====================
FILES["src/app/cgv/page.tsx"] = r'''import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  robots: { index: false },
};

export default function CgvPage() {
  return (
    <section className="py-16 bg-white min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-6">Conditions g&eacute;n&eacute;rales d'utilisation</h1>
        <div className="prose-zeropassoire max-w-none space-y-6 text-sm leading-relaxed">
          <div>
            <h2 className="font-bold text-stone-900 mb-2">1. Objet</h2>
            <p className="text-stone-700">
              Les pr&eacute;sentes CGU r&eacute;gissent l'utilisation du simulateur z&eacute;ropassoire.fr et des guides
              &eacute;ditoriaux associ&eacute;s. L'utilisation du site vaut acceptation pleine et enti&egrave;re des CGU.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">2. Absence de valeur contractuelle</h2>
            <p className="text-stone-700">
              Les r&eacute;sultats du simulateur sont fournis &agrave; titre indicatif. Ils ne constituent pas un devis,
              une promesse de vente ou un engagement de financement. Les aides mobilisables d&eacute;pendent
              d'une &eacute;tude de situation r&eacute;alis&eacute;e par un professionnel RGE qualifi&eacute;, seul habilit&eacute; &agrave;
              confirmer l'&eacute;ligibilit&eacute; &agrave; MaPrimeR&eacute;nov', aux CEE ou aux aides locales.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">3. Responsabilit&eacute;</h2>
            <p className="text-stone-700">
              Z&eacute;ro Passoire met tout en œuvre pour maintenir les bar&egrave;mes &agrave; jour. Elle ne saurait
              &ecirc;tre tenue responsable des &eacute;volutions r&eacute;glementaires post&eacute;rieures &agrave; la derni&egrave;re mise &agrave;
              jour, ni des d&eacute;cisions prises par l'utilisateur &agrave; partir des r&eacute;sultats.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">4. Propri&eacute;t&eacute; des leads</h2>
            <p className="text-stone-700">
              Les coordonn&eacute;es collect&eacute;es restent la propri&eacute;t&eacute; de leur titulaire, trait&eacute;es
              conform&eacute;ment au RGPD et &agrave; la politique de confidentialit&eacute;. Aucune cession &agrave; des tiers
              commerciaux n'est op&eacute;r&eacute;e.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">5. Droit applicable</h2>
            <p className="text-stone-700">
              Les pr&eacute;sentes sont r&eacute;gies par le droit fran&ccedil;ais. Tout litige sera soumis aux
              tribunaux comp&eacute;tents du si&egrave;ge de l'&eacute;diteur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

# ==================== /politique-confidentialite ====================
FILES["src/app/politique-confidentialite/page.tsx"] = r'''import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <section className="py-16 bg-white min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-6">Politique de confidentialit&eacute;</h1>
        <div className="prose-zeropassoire max-w-none space-y-6 text-sm leading-relaxed">
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Responsable de traitement</h2>
            <p className="text-stone-700">
              La soci&eacute;t&eacute; &eacute;ditrice de z&eacute;ropassoire.fr, joignable via la page Contact.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Donn&eacute;es collect&eacute;es</h2>
            <p className="text-stone-700">
              Uniquement les donn&eacute;es strictement n&eacute;cessaires &agrave; la r&eacute;alisation de la simulation
              et, si vous le souhaitez, &agrave; l'envoi de votre plan : email (requis), t&eacute;l&eacute;phone (optionnel),
              inputs du simulateur (classe DPE, surface, code postal, tranche de revenus, mode de chauffage,
              type de bien).
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Finalit&eacute;s et base l&eacute;gale</h2>
            <ul className="list-disc pl-5 text-stone-700 space-y-1">
              <li>Envoi du plan de sortie chiffr&eacute; &mdash; ex&eacute;cution du service que vous demandez (art. 6.1.b RGPD)</li>
              <li>Rappel par un conseiller RGE &mdash; consentement explicite (art. 6.1.a)</li>
              <li>Newsletter &eacute;volutions des aides &mdash; consentement s&eacute;par&eacute;, r&eacute;vocable</li>
              <li>Statistiques d'usage anonymis&eacute;es &mdash; int&eacute;r&ecirc;t l&eacute;gitime (art. 6.1.f)</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Dur&eacute;e de conservation</h2>
            <p className="text-stone-700">
              3 ans &agrave; compter du dernier contact, conform&eacute;ment &agrave; la recommandation CNIL.
              Les leads non-consentants &agrave; tout rappel sont supprim&eacute;s &agrave; J+30.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Sous-traitants</h2>
            <ul className="list-disc pl-5 text-stone-700 space-y-1">
              <li>Supabase (UE, Francfort) &mdash; base de donn&eacute;es</li>
              <li>Vercel (USA, Privacy Shield) &mdash; h&eacute;bergement applicatif</li>
            </ul>
            <p className="text-stone-700 mt-2">
              <strong>Aucun</strong> partage avec des tiers commerciaux (artisans, n&eacute;gociateurs, courtiers).
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Vos droits</h2>
            <p className="text-stone-700">
              Acc&egrave;s, rectification, effacement, limitation, opposition, portabilit&eacute;. &Agrave; exercer par email
              via la page Contact. R&eacute;ponse sous 30 jours. R&eacute;clamation possible aupr&egrave;s de la CNIL.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

# ==================== /not-found ====================
FILES["src/app/not-found.tsx"] = r'''import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 bg-stone-50 min-h-[60vh]">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="font-display text-7xl font-bold text-brand-700 mb-4">404</div>
        <h1 className="font-display text-2xl font-bold text-stone-900 mb-3">Cette page n'existe pas (encore)</h1>
        <p className="text-stone-600 mb-8">
          Le lien est peut-&ecirc;tre p&eacute;rim&eacute;. Revenez &agrave; l'accueil, ou filez directement
          vers le simulateur.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary">Retour &agrave; l'accueil</Link>
          <Link href="/simulateur" className="btn-secondary">Lancer une simulation</Link>
        </div>
      </div>
    </section>
  );
}
'''

# ==================== Supabase migration ====================
FILES["supabase/migrations/0001_init.sql"] = r'''-- zeropassoire.fr — Schema initial Supabase
-- À appliquer via : `supabase db push` ou l'éditeur SQL du dashboard Supabase.

create extension if not exists "pgcrypto";

-- Table principale des leads
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  phone text,
  simulation jsonb not null,
  consent_callback boolean not null default false,
  consent_newsletter boolean not null default false,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  gclid text,
  fbclid text,
  session_id text,
  processed_at timestamptz,
  processed_by text
);
create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_email on public.leads (lower(email));
create index if not exists idx_leads_session on public.leads (session_id);

-- Events funnel (pas de FK pour ne pas bloquer l'insert en cas de timeout)
create table if not exists public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  session_id text,
  event_name text not null,
  properties jsonb not null default '{}'::jsonb
);
create index if not exists idx_events_name on public.events (event_name, created_at desc);
create index if not exists idx_events_session on public.events (session_id, created_at desc);

-- Row Level Security : seul le service_role peut écrire/lire (via API Next.js).
-- Aucun accès anonyme.
alter table public.leads enable row level security;
alter table public.events enable row level security;

-- Politique de refus total pour les clés `anon`.
-- (Pas besoin de CREATE POLICY : le default RLS deny si aucune policy.)

-- Rétention : suppression automatique à J+1095 (3 ans).
-- Nécessite pg_cron activé sur le projet Supabase (Dashboard > Database > Extensions).
-- Décommenter et exécuter une fois :
--
-- create extension if not exists pg_cron;
-- select cron.schedule('leads-purge-3y', '0 3 * * *',
--   $$delete from public.leads where created_at < now() - interval '3 years'$$
-- );
'''

# ==================== .env.example ====================
FILES[".env.example"] = r'''# Supabase (projet dédié zeropassoire — ne PAS mutualiser avec les autres sites de l'empire)
NEXT_PUBLIC_SUPABASE_URL=https://VOTRE-REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...        # service_role, JAMAIS exposé côté client

# Optionnel — pour personnaliser l'expéditeur du mail de confirmation (via Resend, Postmark, etc.)
# RESEND_API_KEY=
# LEAD_NOTIFY_EMAIL=contact@zeropassoire.fr
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
    print(f"\nP4a scaffold — {written} file(s) written.")

if __name__ == "__main__":
    main()
