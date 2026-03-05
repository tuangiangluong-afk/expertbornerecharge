'use client';

import { useState, useMemo } from 'react';
import { MapPin, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { findLocalSite } from '@/app/actions/find-local-site';
import Link from 'next/link';

// Hardcoded safe list of top cities for autocomplete (Client Side)
// In a real app we'd fetch this or pass it as props
const SUGGESTIONS = [
    { name: "Paris (75)", slug: "bornerechargeparis" },
    { name: "Lyon (69)", slug: "bornerechargevolyon" },
    { name: "Marseille (13)", slug: "bornerechargemarseille" },
    { name: "Nice (06)", slug: "bornerechargenice" },
    { name: "Bordeaux (33)", slug: "bornerechargebordeaux" },
    { name: "Toulouse (31)", slug: "bornerechargetoulouse" },
    { name: "Nantes (44)", slug: "bornerechargenantes" },
    { name: "Lille (59)", slug: "bornerechargelille" },
    { name: "Strasbourg (67)", slug: "bornerechargestrasbourg" },
    { name: "Cannes (06)", slug: "bornerechargecannes" },
    { name: "Neuilly-sur-Seine (92)", slug: "bornerechargeneuilly" },
    { name: "Aix-en-Provence (13)", slug: "bornerechargeaix" },
    { name: "Annecy (74)", slug: "bornerechargeannecy" },
    { name: "Boulogne-Billancourt (92)", slug: "bornerechargeboulogne" },
    { name: "Montpellier (34)", slug: "bornerechargemontpellier" },
    { name: "Rennes (35)", slug: "bornerechargerennes" },
    { name: "Toulon (83)", slug: "bornerechargetoulon" },
    { name: "Saint-Germain-en-Laye (78)", slug: "bornerechargestgermain" }
];

export default function LocalLinker() {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'not-found'>('idle');
    const [result, setResult] = useState<{ url: string; city: string } | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Filter suggestions
    const filteredSuggestions = useMemo(() => {
        if (!query || query.length < 2) return [];
        const lower = query.toLowerCase();
        return SUGGESTIONS.filter(s => s.name.toLowerCase().includes(lower));
    }, [query]);

    const handleSelect = (slug: string, name: string) => {
        // We need the DOMAIN, usually found in suggestions if we enhanced them, 
        // but for now, the slug in SUGGESTIONS is the KEY.
        // Let's assume SUGGESTIONS slug is actually the domain prefix or we map it.
        // Actually the SUGGESTIONS list had 'bornerechargeparis' as slug.

        // QUICK FIX: Construct domain from slug for known pattern or use findLocalSite
        // To be safe, let's trigger the search logic which resolves the domain correctly
        setQuery(name);
        handleSearch({ preventDefault: () => { } } as React.FormEvent);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setShowSuggestions(false);
        setStatus('loading');
        try {
            const match = await findLocalSite(query);
            if (match.found && match.domain && match.city) {
                // CORRECT URL CONSTRUCTION LOGIC
                // Local: /demo/bornerechargeparis.fr
                // Prod: https://bornerechargeparis.fr
                const isLocal = window.location.hostname.includes("localhost");
                const finalUrl = isLocal
                    ? `/demo/${match.domain}`
                    : `https://${match.domain}`;

                setResult({ url: finalUrl, city: match.city });
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
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl ring-1 ring-white/10 relative z-50">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-white" size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Installateur Local</h3>
                    <p className="text-blue-200 text-xs">Trouvez votre expert de proximité</p>
                </div>
            </div>

            <form onSubmit={handleSearch} className="mb-4 relative">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowSuggestions(true);
                            if (status !== 'idle') setStatus('idle');
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click
                        placeholder="Ville (ex: Paris, Lyon...)"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pl-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-slate-500"
                        autoComplete="off"
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

                {/* Autocomplete Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                        <ul className="py-1">
                            {filteredSuggestions.map((s) => (
                                <li key={s.slug}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(s.slug, s.name)}
                                        className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition flex items-center justify-between group"
                                    >
                                        <span className="font-medium">{s.name}</span>
                                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
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
                                target="_blank"
                                rel="noopener noreferrer"
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
                            <Link
                                href="/#simulateur"
                                className="text-xs font-bold text-blue-400 hover:text-blue-300 underline decoration-blue-400/30"
                            >
                                Faire une demande nationale
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
