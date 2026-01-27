"use client";

import { useState, useEffect, useCallback } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Users, Filter, Download, Eye, Phone, Mail, Building, Home, Briefcase } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Lead {
    id: string;
    tenant_id: string;
    status: string;
    type: string;
    name: string;
    email: string;
    phone: string;
    company: string | null;
    city: string | null;
    message: string | null;
    postal_code: string | null;
    housing_type: string | null;
    created_at: string;
}

export default function AdminLeadsPage() {
    const searchParams = useSearchParams();
    const currentTenantId = searchParams.get("tenantId");

    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        let query = supabaseBrowser
            .from("leads")
            .select("*")
            .order("created_at", { ascending: false });

        if (currentTenantId && currentTenantId !== 'all') {
            query = query.eq("tenant_id", currentTenantId);
        }

        const { data, error } = await query;
        if (error) {
            console.error("Error fetching leads:", error);
        } else {
            setLeads(data || []);
        }
        setLoading(false);
    }, [currentTenantId]);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-700';
            case 'contacted': return 'bg-yellow-100 text-yellow-700';
            case 'converted': return 'bg-green-100 text-green-700';
            case 'lost': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getTypeIcon = (type: string) => {
        if (type?.includes('copro')) return <Building size={16} className="text-purple-600" />;
        if (type?.includes('entreprise')) return <Briefcase size={16} className="text-slate-600" />;
        return <Home size={16} className="text-blue-600" />;
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Users className="text-blue-600" />
                        Leads & Devis
                    </h1>
                    <p className="text-slate-500">
                        {leads.length} leads trouvés {currentTenantId ? `pour ${currentTenantId}` : "au total"}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition font-medium">
                        <Filter size={18} />
                        Filtrer
                    </button>
                    <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition shadow-lg shadow-slate-900/20">
                        <Download size={18} />
                        Exporter CSV
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-slate-400">Chargement des leads...</div>
                ) : leads.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <p className="mb-2">Aucun lead pour le moment.</p>
                        <p className="text-sm">Vérifiez que le formulaire frontal enregistre bien en base.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Date</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Site</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Statut</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Contact</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold text-slate-500 uppercase">Projet</th>
                                    <th className="text-right px-6 py-3 text-xs font-bold text-slate-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50 transition group">
                                        <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                                            {format(new Date(lead.created_at), "dd MMM yyyy", { locale: fr })}
                                            <div className="text-xs text-slate-400">
                                                {format(new Date(lead.created_at), "HH:mm")}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">
                                                {lead.tenant_id}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${getStatusColor(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900">{lead.name}</span>
                                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                                    <Mail size={12} /> {lead.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <Phone size={12} /> {lead.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                {getTypeIcon(lead.type)}
                                                <span className="text-sm font-medium text-slate-700 capitalize">{lead.type || "N/A"}</span>
                                            </div>
                                            {lead.city && (
                                                <div className="text-xs text-slate-500">
                                                    📍 {lead.city}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition opacity-0 group-hover:opacity-100">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
