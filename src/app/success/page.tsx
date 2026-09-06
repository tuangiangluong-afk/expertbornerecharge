'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const devisId = searchParams.get('devis_id') || '';
  const devisHash = searchParams.get('devis_hash') || '';
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!devisId) return;

    const scriptId = 'vud-spinner-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.src = `https://www.viteundevis.com/mb/spinner.php?devis_id=${devisId}&devis_hash=${devisHash}&box=944163`;

      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.body.appendChild(script);
      }

      script.onload = () => setLoaded(true);
    } else {
      setLoaded(true);
    }

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [devisId, devisHash]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-3">
          Demande reçue avec succès !
        </h1>
        <p className="text-slate-600 text-base mb-6 leading-relaxed">
          Merci pour votre confiance. Votre dossier a été transmis à nos artisans partenaires certifiés. Un conseiller va vous recontacter sous <strong>24h ouvrées</strong>.
        </p>

        {devisId ? (
          <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-200/80 my-6">
            <div id="vud_spin_944163" className="w-full flex justify-center"></div>
            {!loaded && (
              <div className="flex flex-col items-center gap-3 text-slate-500 py-4">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <p className="text-xs font-medium">Validation en cours...</p>
              </div>
            )}
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 text-left text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-emerald-500 shrink-0" />
            <span>Artisans qualifiés & certifiés</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-blue-500 shrink-0" />
            <span>Étude gratuite sous 24h</span>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Chargement...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
