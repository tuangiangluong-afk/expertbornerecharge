"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Users, TrendingUp, Star, Globe, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalLeads: 0,
        recentLeads: 0,
        conversionRate: "0",
        activeSites: 56,
        avgRating: "4.9"
    });
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            setLoading(true);
            const now = new Date();
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

            const { data: leads, error } = await supabaseBrowser
                .from("leads")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Dashboard Fetch Error:", error);
            } else if (leads) {
                const total = leads.length;
                const converted = leads.filter(l => l.status === 'converted').length;
                const monthLeads = leads.filter(l => new Date(l.created_at) > lastMonth).length;

                setStats(prev => ({
                    ...prev,
                    totalLeads: total,
                    recentLeads: monthLeads,
                    conversionRate: total > 0 ? ((converted / total) * 100).toFixed(1) : "0"
                }));

                setRecentActivity(leads.slice(0, 5));
            }
            setLoading(false);
        }

        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Tableau de Bord Global</h1>
                <div className="flex gap-2">
                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold border border-blue-100 flex items-center gap-1">
                        <Globe size={12} /> Réseau IRVE Actif
                    </span>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                        <Globe size={14} className="text-slate-400" /> Sites Actifs
                    </h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stats.activeSites}</p>
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full mt-2 inline-block">100% Online</span>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                        <Users size={14} className="text-blue-500" /> Leads (Mois)
                    </h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{loading ? "..." : stats.recentLeads}</p>
                    <span className="text-xs text-blue-600 font-medium mt-1 inline-block">Mois en cours</span>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                        <TrendingUp size={14} className="text-green-500" /> Taux Conv.
                    </h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{loading ? "..." : stats.conversionRate}%</p>
                    <span className="text-xs text-slate-400">Leads Signés</span>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                        <Star size={14} className="text-yellow-500" /> Avis Clients
                    </h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stats.avgRating}/5</p>
                    <span className="text-xs text-slate-400">Total Réseau</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shortcuts */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        Actions Rapides
                    </h2>
                    <div className="space-y-4">
                        <Link href="/admin/leads" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition group border border-slate-100">
                            <span className="font-medium">Gestion des Leads</span>
                            <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition" />
                        </Link>
                        <Link href="/admin/sites" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition group border border-slate-100">
                            <span className="font-medium">Gestion du Réseau (50+ sites)</span>
                            <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition" />
                        </Link>
                        <Link href="/admin/analytics" className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition group border border-slate-100">
                            <span className="font-medium">Performances & Analytics</span>
                            <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition" />
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Derniers Leads Réels</h2>
                        <Link href="/admin/leads" className="text-xs text-blue-600 font-bold hover:underline">Voir tout</Link>
                    </div>
                    {loading ? (
                        <div className="py-8 text-center text-slate-400">Chargement...</div>
                    ) : recentActivity.length === 0 ? (
                        <div className="py-8 text-center text-slate-400 font-medium italic">
                            En attente du premier lead...
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {recentActivity.map((lead) => (
                                <li key={lead.id} className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center font-bold text-slate-400 text-sm">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{lead.name}</p>
                                            <p className="text-xs text-slate-500 uppercase">{lead.city || lead.tenant_id}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${lead.status === 'new' ? 'bg-blue-50 text-blue-700' :
                                            lead.status === 'converted' ? 'bg-green-50 text-green-700' :
                                                'bg-slate-50 text-slate-600'
                                        }`}>
                                        {lead.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

