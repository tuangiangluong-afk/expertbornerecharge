export default function AdminAnalyticsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                <div className="max-w-md mx-auto">
                    <h2 className="text-lg font-semibold text-slate-900 mb-2">Rapports de Performance</h2>
                    <p className="text-slate-500 mb-6">
                        Intégration des données GA4 et GTM pour chaque site.
                        Suivez le trafic et les conversions par ville.
                    </p>
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Coming Soon
                    </span>
                </div>
            </div>
        </div>
    );
}
