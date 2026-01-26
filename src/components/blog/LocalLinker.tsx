'use client';

import { useState } from 'react';
import { MapPin, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { findLocalSite } from '@/app/actions/find-local-site';

export default function LocalLinker() {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'not-found'>('idle');
    const [result, setResult] = useState<{ url: string; city: string } | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setStatus('loading');
        try {
            const match = await findLocalSite(query);
            if (match.found && match.domain && match.city) {
                setResult({ url: match.domain, city: match.city });
                setStatus('success');
            } else {
                setStatus('not-found');
            }
        } catch (err) {
            console.error(err);
            setStatus('not-found');
        }
    };

    return (
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl ring-1 ring-white/10">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-white" size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Installateur Local</h3>
                    <p className="text-blue-200 text-xs">Trouvez votre expert de proximité</p>
                </div>
            </div>

            <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (status !== 'idle') setStatus('idle');
                        }}
                        placeholder="Code postal ou Ville..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pl-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-slate-500"
                    />
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

                    <button
                        type="submit"
                        disabled={status === 'loading' || !query}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 transition"
                    >
                        {status === 'loading' ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <ArrowRight size={16} />
                        )}
                    </button>
                </div>
            </form>

            {status === 'success' && result && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={18} />
                        <div>
                            <p className="text-sm font-medium text-green-100 mb-2">
                                Bonne nouvelle ! Nous avons un installateur partenaire à <span className="text-white font-bold">{result.city}</span>.
                            </p>
                            <a
                                href={result.url}
                                className="inline-flex items-center gap-2 text-xs font-bold bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-400 transition shadow-lg shadow-green-900/20 w-full justify-center"
                            >
                                Voir les offres locales <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {status === 'not-found' && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="text-slate-400 shrink-0 mt-0.5" size={18} />
                        <div>
                            <p className="text-xs text-slate-300 mb-2">
                                Pas de site dédié pour cette zone, mais notre réseau national couvre toute la France.
                            </p>
                            <a
                                href="/#simulateur"
                                className="text-xs font-bold text-blue-400 hover:text-blue-300 underline decoration-blue-400/30"
                            >
                                Faire une demande nationale
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
