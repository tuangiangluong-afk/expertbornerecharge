export default function AdminLeadsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Leads & Devis</h1>
                <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium">
                    Exporter CSV
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                <div className="max-w-md mx-auto">
                    <h2 className="text-lg font-semibold text-slate-900 mb-2">CRM Leads</h2>
                    <p className="text-slate-500 mb-6">
                        Visualisez et traitez les demandes de devis entrants pour tous vos sites.
                        Nécessite une connexion à votre base de données Leads.
                    </p>
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Coming Soon
                    </span>
                </div>
            </div>
        </div>
    );
}
