export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Tableau de Bord Global</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Sites Actifs</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">56</p>
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full mt-2 inline-block">100% Online</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Leads (Mois)</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">342</p>
                    <span className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
                        ↑ +12% <span className="text-slate-400 font-normal">vs N-1</span>
                    </span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Taux Conversion</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">4.8%</p>
                    <span className="text-xs text-slate-400">Objectif: 5%</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Avis Clients</h3>
                    <p className="text-3xl font-bold text-slate-900 mt-2">4.9/5</p>
                    <span className="text-xs text-slate-400">127 avis</span>
                </div>
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shortcuts */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Actions Rapides</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="/admin/leads" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition border border-dashed border-slate-300 hover:border-blue-500 hover:text-blue-600 group">
                            <span className="font-medium text-slate-900 group-hover:text-blue-600">Voir les derniers Leads</span>
                        </a>
                        <a href="/admin/sites" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition border border-dashed border-slate-300 hover:border-blue-500 hover:text-blue-600 group">
                            <span className="font-medium text-slate-900 group-hover:text-blue-600">Gérer un Site</span>
                        </a>
                    </div>
                </div>

                {/* Recent Activity Mockup */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Activité Récente</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                            <div>
                                <p className="text-sm font-medium text-slate-900">Nouveau Lead - Paris</p>
                                <p className="text-xs text-slate-500">Il y a 2 min • Installation Copropriété</p>
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Nouveau</span>
                        </li>
                        <li className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                            <div>
                                <p className="text-sm font-medium text-slate-900">Avis 5 Étoiles - Neuilly</p>
                                <p className="text-xs text-slate-500">Il y a 1h • "Service impeccable..."</p>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Validé</span>
                        </li>
                        <li className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                            <div>
                                <p className="text-sm font-medium text-slate-900">Mise à jour SEO</p>
                                <p className="text-xs text-slate-500">Il y a 3h • Robot Clean URLs</p>
                            </div>
                            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">Système</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
