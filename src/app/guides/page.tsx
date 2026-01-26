import { getAllGuides } from '@/lib/mdx';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Guides et Conseils Borne de Recharge | Expert IRVE",
    description: "Tout comprendre sur l'installation de bornes de recharge. Guides experts pour copropriété, maison individuelle et entreprises.",
};

export default function GuidesIndex() {
    const guides = getAllGuides();

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-slate-900">
            {/* Nav */}
            <Header isHub={true} variant="default" />

            <main className="container mx-auto px-4 py-16 pt-32">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Le Centre de Ressources IRVE
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Guides, comparatifs et conseils d'experts pour réussir votre installation.
                        Sans jargon, 100% utile.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {guides.map((guide: any) => (
                        <Link
                            key={guide.slug}
                            href={`/guides/${guide.slug}`}
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="mb-4">
                                <span className="inline-flex items-center text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider mb-3">
                                    {guide.category || 'Guide'}
                                </span>
                                <h2 className="text-xl font-bold group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {guide.title}
                                </h2>
                            </div>

                            <p className="text-slate-600 mb-6 flex-grow line-clamp-3">
                                {guide.description}
                            </p>

                            <div className="flex items-center justify-between text-sm text-slate-400 mt-auto pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-4">
                                    {guide.readTime && (
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} /> {guide.readTime}
                                        </span>
                                    )}
                                </div>
                                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-blue-600 font-medium">
                                    Lire <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {guides.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                        <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500">Aucun guide publié pour le moment.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
