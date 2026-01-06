"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Save, Loader2, Sparkles, Plus, Trash2 } from "lucide-react";

// Spintax types from the code
const SPINTAX_TYPES = [
    { key: "hero_title", label: "Hero - Titre Principal", category: "Hero" },
    { key: "hero_subtitle", label: "Hero - Sous-titre", category: "Hero" },
    { key: "hero_badge", label: "Hero - Badge (Pill)", category: "Hero" },
    { key: "cta_button", label: "CTA - Bouton Principal", category: "CTA" },
    { key: "vehicle_sedan_title", label: "Véhicule Berline - Titre", category: "Véhicules" },
    { key: "vehicle_sedan_desc", label: "Véhicule Berline - Description", category: "Véhicules" },
    { key: "vehicle_van_title", label: "Véhicule Van - Titre", category: "Véhicules" },
    { key: "vehicle_van_desc", label: "Véhicule Van - Description", category: "Véhicules" },
    { key: "review_speed", label: "Avis - Rapidité", category: "Avis" },
    { key: "review_trust", label: "Avis - Confiance", category: "Avis" },
    { key: "review_courtesy", label: "Avis - Courtoisie", category: "Avis" },
    { key: "guide_intro", label: "Guide - Introduction", category: "Guides pSEO" },
    { key: "guide_bus_pain", label: "Guide - Pain Point (Bus)", category: "Guides pSEO" },
    { key: "guide_taxi_solution", label: "Guide - Solution (Taxi)", category: "Guides pSEO" },
];

interface SpintaxTemplate {
    id: string;
    tenant_id: string;
    type: string;
    variations: string[];
}

export default function SpintaxEditor() {
    const searchParams = useSearchParams();
    const tenantId = searchParams.get("tenantId") || "taxiaix";

    const [templates, setTemplates] = useState<SpintaxTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [variations, setVariations] = useState<string[]>([]);

    useEffect(() => {
        fetchTemplates();
    }, [tenantId]);

    async function fetchTemplates() {
        setLoading(true);
        const { data } = await supabase
            .from("spintax_templates")
            .select("*")
            .eq("tenant_id", tenantId);

        if (data) setTemplates(data);
        setLoading(false);
    }

    function handleSelectType(type: string) {
        setSelectedType(type);
        const existing = templates.find(t => t.type === type);
        setVariations(existing?.variations || [""]);
    }

    async function handleSave() {
        if (!selectedType) return;
        setSaving(true);

        const existing = templates.find(t => t.type === selectedType);

        if (existing) {
            // Update
            await supabase
                .from("spintax_templates")
                .update({ variations: variations.filter(v => v.trim()) })
                .eq("id", existing.id);
        } else {
            // Insert
            await supabase
                .from("spintax_templates")
                .insert({
                    tenant_id: tenantId,
                    type: selectedType,
                    variations: variations.filter(v => v.trim())
                });
        }

        await fetchTemplates();
        setSaving(false);
    }

    function addVariation() {
        setVariations([...variations, ""]);
    }

    function removeVariation(index: number) {
        setVariations(variations.filter((_, i) => i !== index));
    }

    function updateVariation(index: number, value: string) {
        const newVars = [...variations];
        newVars[index] = value;
        setVariations(newVars);
    }

    // Group types by category
    const groupedTypes = SPINTAX_TYPES.reduce((acc, type) => {
        if (!acc[type.category]) acc[type.category] = [];
        acc[type.category].push(type);
        return acc;
    }, {} as Record<string, typeof SPINTAX_TYPES>);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                        <Sparkles className="text-yellow-500" size={24} />
                        Éditeur Spintax
                    </h1>
                    <p className="text-sm text-neutral-500">Personnalisez les variations de texte automatiques pour {tenantId}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Types List */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-700">
                        Types de Contenu
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                        {Object.entries(groupedTypes).map(([category, types]) => (
                            <div key={category}>
                                <div className="px-4 py-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                                    {category}
                                </div>
                                {types.map((type) => {
                                    const hasOverride = templates.some(t => t.type === type.key);
                                    return (
                                        <button
                                            key={type.key}
                                            onClick={() => handleSelectType(type.key)}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition flex items-center justify-between ${selectedType === type.key ? "bg-blue-50 text-blue-600" : ""
                                                }`}
                                        >
                                            <span>{type.label}</span>
                                            {hasOverride && (
                                                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
                                                    Custom
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Editor */}
                <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-700 flex items-center justify-between">
                        <span>Variations {selectedType ? `(${selectedType})` : ""}</span>
                        {selectedType && (
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                Sauvegarder
                            </button>
                        )}
                    </div>

                    {!selectedType ? (
                        <div className="p-12 text-center text-gray-400">
                            Sélectionnez un type de contenu pour éditer ses variations.
                        </div>
                    ) : loading ? (
                        <div className="p-12 text-center text-gray-400">Chargement...</div>
                    ) : (
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-500 mb-4">
                                Ajoutez plusieurs variations. Une sera choisie aléatoirement à chaque affichage.
                                Utilisez <code className="bg-gray-100 px-1 rounded">{"{city}"}</code> pour insérer le nom de la ville.
                            </p>

                            {variations.map((variation, index) => (
                                <div key={index} className="flex gap-2">
                                    <textarea
                                        className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition min-h-[80px]"
                                        placeholder={`Variation ${index + 1}...`}
                                        value={variation}
                                        onChange={(e) => updateVariation(index, e.target.value)}
                                    />
                                    <button
                                        onClick={() => removeVariation(index)}
                                        className="text-gray-400 hover:text-red-500 transition p-2"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={addVariation}
                                className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-500 transition"
                            >
                                <Plus size={16} />
                                Ajouter une variation
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
