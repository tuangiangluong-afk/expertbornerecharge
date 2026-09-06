import { getGuideBySlug, getAllGuides } from '@/lib/mdx';
import { notFound, permanentRedirect } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { ArrowLeft, Clock, Calendar, Zap, ArrowRight } from 'lucide-react';
import SimulatorWidget from '@/components/blog/SimulatorWidget';
import LocalLinker from '@/components/blog/LocalLinker';
import { createClient } from "@supabase/supabase-js";
import { marked } from 'marked';
import { headers } from 'next/headers';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export const revalidate = 60;

// ==========================================
// COMPOSANTS MDX CUSTOM (Pour vendre dans le texte)
// ==========================================
const components = {
    // Un encart bleu pour les conseils pro
    Callout: ({ children, title }: { children: React.ReactNode, title?: string }) => (
        <div className="my-8 border-l-4 border-blue-600 bg-blue-50 p-6 rounded-r-xl">
            {title && <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><Zap size={18} /> {title}</h4>}
            <div className="text-blue-800">{children}</div>
        </div>
    ),
    // Le bouton magique à mettre au milieu de l'article
    CtaButton: ({ text, url }: { text: string, url: string }) => (
        <div className="my-8 text-center not-prose">
            <a href={url} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1">
                {text} <ArrowRight size={20} />
            </a>
        </div>
    ),
    // Widget de maillage local (pour le mettre au milieu du texte)
    LocalLinker: () => (
        <div className="my-8 not-prose">
            <LocalLinker />
        </div>
    )
};

export async function generateStaticParams() {
    const guides = getAllGuides();
    // We only statically generate filesystem guides. DB posts are ISR.
    return guides.map((guide: any) => ({
        slug: guide.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const guide = await getGuideBySlug(resolvedParams.slug);
    const canonicalUrl = `https://expertbornerecharge.com/guides/${resolvedParams.slug}`;
    
    if (guide) {
        return {
            title: guide.meta.title,
            description: guide.meta.description,
            alternates: {
                canonical: canonicalUrl,
            },
            openGraph: {
                title: guide.meta.title,
                description: guide.meta.description,
                type: 'article',
                url: canonicalUrl,
            },
            robots: { index: true, follow: true },
        };
    }

    // Try DB: if it is a DB post, canonical points to /blog/[slug] and noindex on /guides/
    const { data: post } = await supabase
        .from('blog_posts')
        .select('seo_title, title, seo_description, excerpt')
        .eq('slug', resolvedParams.slug)
        .eq('status', 'published')
        .single();
    
    if (post) {
         return {
            title: post.seo_title || post.title,
            description: post.seo_description || post.excerpt,
            alternates: {
                canonical: `https://expertbornerecharge.com/blog/${resolvedParams.slug}`,
            },
            openGraph: {
                title: post.seo_title || post.title,
                description: post.seo_description || post.excerpt,
                type: 'article',
                url: `https://expertbornerecharge.com/blog/${resolvedParams.slug}`,
            },
            robots: { index: false, follow: true },
        };
    }

    return {};
}

import rehypeSlug from 'rehype-slug';

// ... (existing imports)

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    
    // 1. Try Static Guide
    const guide = await getGuideBySlug(resolvedParams.slug);

    // 2. If it's a DB blog post, permanently redirect to /blog/[slug]
    if (!guide) {
        const { data: post } = await supabase
            .from('blog_posts')
            .select('slug')
            .eq('slug', resolvedParams.slug)
            .eq('status', 'published')
            .single();
        
        if (post) {
            permanentRedirect(`/blog/${resolvedParams.slug}`);
        }
    }

    if (!guide) return notFound();

    // Parse Headers for TOC
    let headings: string[] = [];
    let toc: any[] = [];

    // MDX Parsing for TOC
    headings = guide.content.match(/^#{1,3} .+/gm) || [];
    toc = headings.map((heading: string) => {
        const level = heading.match(/^#+/)?.[0].length || 1;
        const text = heading.replace(/^#+ /, '');
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        return { text, id, level };
    });

    // Dynamically retrieve the current domain or fallback
    const headersList = await headers();
    const canonicalDomain = headersList.get("x-irve-canonical-domain") || "expertbornerecharge.com";
    const siteUrl = `https://${canonicalDomain}`; 

    // Article Schema for SEO/AEO
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": guide.meta.title,
        "description": guide.meta.description,
        "image": guide.meta.image ? `${siteUrl}${guide.meta.image}` : undefined,
        "datePublished": guide.meta.date,
        "dateModified": guide.meta.date,
        "author": {
            "@type": "Organization",
            "name": guide.meta.author || "Expert Borne Recharge"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Expert Borne Recharge",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteUrl}/guides/${resolvedParams.slug}`
        },
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["h1", "article h2", "article p:first-of-type"]
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            {/* Article Schema JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            {/* Nav */}
            <Header isHub={true} variant="default" />

            <main className="container mx-auto px-4 py-12 pt-40">
                {/* GRID LAYOUT : Contenu à gauche, Pub à droite */}
                <div className="grid lg:grid-cols-[1fr_350px] gap-12 max-w-7xl mx-auto">

                    {/* COLONNE GAUCHE : ARTICLE */}
                    <div>
                        {/* Header Article */}
                        <div className="mb-10">
                            <Link href="/guides" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6 group">
                                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                Retour aux guides
                            </Link>

                            {/* Meta Data */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                                <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                                    <Clock size={14} />
                                    {guide.meta.readTime || '5 min'}
                                </span>
                                <span className="text-slate-300">|</span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {new Date(guide.meta.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                                {guide.meta.title}
                            </h1>

                            {/* Hero Image */}
                            {guide.meta.image && (
                                <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src={guide.meta.image}
                                        alt={guide.meta.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                {guide.meta.description}
                            </p>
                        </div>

                        {/* Content Body */}
                        <article className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-headings:scroll-mt-32 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-2xl max-w-none">
                            <MDXRemote
                                source={guide.content}
                                components={components}
                                options={{
                                    mdxOptions: {
                                        rehypePlugins: [rehypeSlug]
                                    }
                                }}
                            />
                        </article>

                        {/* Author Box (Améliorée) */}
                        <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-200">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md">
                                    EB
                                </div>
                                <div>
                                    <div className="font-bold text-lg text-slate-900">Expert Borne Recharge</div>
                                    <div className="text-sm text-slate-500">Pôle Technique &amp; Réglementation</div>
                                </div>
                            </div>
                            <p className="text-slate-600 mb-4">
                                Nos guides sont rédigés par des experts en mobilité électrique pour vous aider à comparer les meilleures solutions du marché. Les informations sur les aides (Advenir, Crédit d&apos;Impôt) sont vérifiées régulièrement auprès des organismes officiels.
                            </p>
                        </div>

                        {/* Dossiers Liés & Guides Recommandés (Topical Silo) */}
                        <div className="mt-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm not-prose">
                            <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
                                <Zap className="text-blue-600" size={22} />
                                Dossiers Techniques &amp; Guides Recommandés
                            </h3>
                            <p className="text-sm text-slate-500 mb-6">
                                Approfondissez votre projet de recharge avec les analyses de nos experts IRVE :
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { slug: "tesla-wall-connector-installation-france", title: "Tesla Wall Connector Gen 3", desc: "Guide de pose, compatibilité & prix d'installation 2026" },
                                    { slug: "recharger-tesla-domicile", title: "Recharger sa Tesla à Domicile", desc: "Wallbox vs prise renforcée : temps de charge et rentabilité" },
                                    { slug: "schneider-evlink-pro-ac-installation", title: "Schneider EVlink Pro AC", desc: "Avis technique, caractéristiques et retour d'expérience" },
                                    { slug: "comparatif-wallbox-schneider-legrand", title: "Comparatif Schneider vs Legrand", desc: "Quelle borne choisir pour sa maison individuelle ?" },
                                    { slug: "cout-installation-borne-recharge", title: "Prix & Coût Installation Borne", desc: "Budget complet avec pose IRVE et déduction d'aides" },
                                    { slug: "obligation-installateur-irve-particulier", title: "Obligation Installateur IRVE", desc: "Que dit la loi pour les particuliers et assurances ?" },
                                ]
                                    .filter(item => item.slug !== resolvedParams.slug)
                                    .slice(0, 4)
                                    .map(item => (
                                        <Link
                                            key={item.slug}
                                            href={`/guides/${item.slug}`}
                                            className="p-4 bg-slate-50 hover:bg-blue-50/50 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all group"
                                        >
                                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 mb-1 flex items-center justify-between">
                                                {item.title}
                                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-600" />
                                            </h4>
                                            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* COLONNE DROITE : STICKY SIDEBAR (Le Cash) */}
                    <aside className="hidden lg:block relative">
                        <div className="sticky top-24 space-y-8">

                            {/* Widget de conversion */}
                            <SimulatorWidget />

                            {/* NOUVEAU : Local Linker (Le Maillage) */}
                            <LocalLinker />

                            {/* Dynamic Table of Contents */}
                            {toc.length > 0 && (
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                    <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-4">Dans cet article</h4>
                                    <ul className="space-y-3 text-sm text-slate-600">
                                        {toc.map((item: any, i: number) => (
                                            <li key={i} className={`
                                                hover:text-blue-600 cursor-pointer transition-colors
                                                ${item.level > 2 ? 'pl-4 border-l border-slate-200' : ''}
                                            `}>
                                                <a href={`#${item.id}`} className="block w-full">
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </main>

            {/* MOBILE STICKY CTA (Bottom Bar) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-slate-200 lg:hidden z-40">
                <a href="/#simulateur" className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg">
                    <Zap size={18} />
                    Comparer les devis gratuits
                </a>
            </div>
        </div>
    );
}
