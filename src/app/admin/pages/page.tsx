export default function AdminPagesPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Pages & Contenu</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                <div className="max-w-md mx-auto">
                    <h2 className="text-lg font-semibold text-slate-900 mb-2">Éditeur de Contenu</h2>
                    <p className="text-slate-500 mb-6">
                        Interface d'édition pour les pages solutions, guides et articles de blog.
                        Ce module permettra de modifier les textes sans toucher au code.
                    </p>
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Coming Soon
                    </span>
                </div>
            </div>
        </div>
    );
}
