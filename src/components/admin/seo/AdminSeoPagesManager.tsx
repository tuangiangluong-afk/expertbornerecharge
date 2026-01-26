'use client';

import { useState, useEffect } from "react";
import { getTenantPages, generatePagesBatch, getPatterns } from "@/app/actions/seo";
import { Zap, ExternalLink, RefreshCw } from "lucide-react";

export function AdminSeoPagesManager({ tenantId }: { tenantId: string }) {
    const [pages, setPages] = useState<any[]>([]);
    const [patterns, setPatterns] = useState<any[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [stats, setStats] = useState<any>(null);

    // Generation State
    const [selectedPattern, setSelectedPattern] = useState("");
    const [targetCities, setTargetCities] = useState("Paris, Lyon, Marseille");

    const loadData = async () => {
        const [pData, patData] = await Promise.all([
            getTenantPages(tenantId),
            getPatterns(tenantId)
        ]);
        setPages(pData || []);
        setPatterns(patData || []);
    };

    useEffect(() => {
        loadData();
    }, [tenantId]);

    const handleGenerate = async () => {
        if (!selectedPattern) return alert("Sélectionnez un modèle");

        setIsGenerating(true);
        try {
            const citiesList = targetCities.split(",").map(c => c.trim()).filter(c => c.length > 0);
            const result = await generatePagesBatch(tenantId, selectedPattern, citiesList);
            setStats(result);
            await loadData(); // Refresh list
        } catch (e: any) {
            alert("Erreur: " + e.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* The War Machine Control Panel */}
            <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-yellow-400 p-2 rounded-lg text-black">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Générateur PSEO (Machine de Guerre)</h2>
                        <p className="text-neutral-400 text-sm">Créez des centaines de pages en un clic.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-neutral-300">1. Choisir le Modèle</label>
                        <select
                            className="w-full bg-white/10 border border-white/20 rounded p-2 text-white"
                            value={selectedPattern}
                            onChange={e => setSelectedPattern(e.target.value)}
                        >
                            <option value="">-- Sélectionner un pattern --</option>
                            {patterns.map(p => (
                                <option key={p.id} value={p.id}>{p.name} ({p.slug_pattern})</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-neutral-300">2. Cibles (Villes séparées par des virgules)</label>
                        <textarea
                            className="w-full bg-white/10 border border-white/20 rounded p-2 text-white h-24 text-sm font-mono"
                            value={targetCities}
                            onChange={e => setTargetCities(e.target.value)}
                            placeholder="Paris, Lyon, Marseille, Bordeaux, Lille..."
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center bg-white/5 p-4 rounded-lg">
                    <div className="text-sm">
                        {stats && (
                            <span className="text-yellow-400">
                                Résultat : {stats.created} créées, {stats.skipped} ignorées, {stats.errors} erreurs.
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="bg-yellow-400 text-black px-6 py-2 rounded font-bold hover:bg-yellow-300 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isGenerating && <RefreshCw className="animate-spin" size={18} />}
                        {isGenerating ? "Génération en cours..." : "LANCER LA GÉNÉRATION"}
                    </button>
                </div>
            </div>

            {/* AI AGENT SECTION */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-xl shadow-lg border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-400 p-2 rounded-lg text-black">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Agent AI Gemini (Rédaction Autonome)</h2>
                        <p className="text-blue-200 text-sm">Laissez l'IA trouver les sujets et rédiger les articles.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        <input
                            placeholder="Thématique (ex: Borne en Copropriété)"
                            className="flex-1 bg-white/10 border border-white/20 rounded p-3 text-white placeholder:text-blue-300/50"
                            id="ai-topic-input"
                        />
                        <button
                            onClick={async () => {
                                const input = document.getElementById('ai-topic-input') as HTMLInputElement;
                                if (!input.value) return;
                                const topics = await import("@/app/actions/seo").then(m => m.findAITopics(input.value));
                                // Hacky state management for demo speed - purely via DOM is risky but fast for MVP
                                const container = document.getElementById('ai-results');
                                if (container && topics) {
                                    container.innerHTML = topics.map((t: any) => `
                                        <div class="flex justify-between items-center bg-white/5 p-3 rounded mb-2 border border-white/10">
                                            <div>
                                                <div class="font-bold text-white">${t.topic}</div>
                                                <div class="text-xs text-blue-300">Potentiel: ${t.estimated_interest}/100 | ${t.intent}</div>
                                            </div>
                                            <button 
                                                onclick="(async () => { this.disabled=true; this.innerText='Rédaction...'; await window.generateArticle('${t.topic}'); window.location.reload(); })()"
                                                class="px-3 py-1 bg-green-500 hover:bg-green-400 text-white text-xs font-bold rounded"
                                            >
                                                Générer
                                            </button>
                                        </div>
                                    `).join('');

                                    // Inject generator function to window scope for the inline onclick above (Dirty but effective for single-file MVP)
                                    (window as any).generateArticle = async (topic: string) => {
                                        await import("@/app/actions/seo").then(m => m.generateAIArticle(tenantId, topic));
                                    };
                                }
                            }}
                            className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded font-bold"
                        >
                            Brainstorming
                        </button>
                    </div>

                    <div id="ai-results" className="mt-4 space-y-2">
                        {/* Results will appear here */}
                    </div>
                </div>
            </div>

            {/* List of Pages */}
            <div>
                <h3 className="text-lg font-bold mb-4">Pages Générées ({pages.length})</h3>
                <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-3 font-medium text-gray-500">Slug / URL</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Titre H1</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Cible</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Pattern/IA</th>
                                <th className="px-4 py-3 font-medium text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {pages.map(page => (
                                <tr key={page.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-mono text-xs max-w-[200px] truncate">{page.slug}</td>
                                    <td className="px-4 py-3 font-semibold text-neutral-900">{page.h1_title}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${page.target_service === 'Guide' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {page.target_city || page.target_service || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {page.seo_patterns?.name || (page.content_json?.[0]?.type === 'markdown' ? '🤖 Gemini Agent' : 'Inconnu')}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <a
                                            href={page.url_path}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 justify-end font-medium"
                                        >
                                            Voir <ExternalLink size={14} />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            {pages.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                                        Aucune page générée pour le moment.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
