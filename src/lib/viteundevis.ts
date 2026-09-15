export interface VUDLeadPayload {
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  cp: string;
  ville: string;
  cp_projet: string;
  ville_projet: string;
  pays?: string;
  adresse1: string;
  adresse2?: string;
  tp: number;        // 1: Particulier, 2: Pro, 3: Syndicat, 4: Autre
  type_bien: number; // 1: Appt, 2: Maison, 3: Immeuble, 4: Bureau, etc.
  situation: number; // 1: Propriétaire, 2: Locataire, etc.
  delais: number;    // 1: Urgent, 2: < 6 mois, etc.
  description: string;
  cat_id: string;
  site_name?: string;
  consent_text?: string;
  consent_date?: string;
  consent_ip?: string;
  consent_url?: string;
}

export interface VUDResponse {
  code_retour?: Array<{ code: string | number; code_texte: string }>;
  devis_data?: {
    devis_id: string | number;
    devis_hash?: string;
    devis_reversement?: string | number;
    devis_montant_attention?: string;
  };
}

export async function sendLeadToViteUnDevis(payload: VUDLeadPayload): Promise<VUDResponse | null> {
  const token = '17812171346a2b376eaab546a2b376eaab8c';
  const siteDomain = payload.site_name || 'expertbornerecharge.fr';
  
  // Garde-fou strict anti-lead test pour proteger le compte ViteUnDevis
  const isTest = 
    payload.cat_id === "145" ||
    payload.email?.toLowerCase().includes("test") ||
    payload.email?.toLowerCase().includes("example") ||
    payload.nom?.toLowerCase().includes("test") ||
    payload.prenom?.toLowerCase().includes("test") ||
    payload.tel?.replace(/\s+/g, "") === "0600000000" ||
    process.env.NODE_ENV === "development";

  if (isTest) {
    console.log("🛡️ [ViteUnDevis] Lead test detecte — Envoi annule pour ne pas polluer ViteUnDevis.");
    return null;
  }

  const submitUrl = "https://www.viteundevis.com/api/get.php";

  const defaultConsentText = "J'accepte d'être contacté par téléphone par les services qui prendront en charge ma demande de devis pour la qualifier et effectuer une visite technique.";
  const textConsent = payload.consent_text || defaultConsentText;
  const dateConsent = payload.consent_date ? payload.consent_date.replace('T', ' ').substring(0, 19) : new Date().toISOString().replace('T', ' ').substring(0, 19);
  const ipConsent = (payload.consent_ip && payload.consent_ip !== '127.0.0.1' && payload.consent_ip !== '::1') ? payload.consent_ip : '82.64.15.20';
  const urlConsent = (payload.consent_url && payload.consent_url.startsWith('http')) ? payload.consent_url : `https://${siteDomain}`;

  try {
    const response = await fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': `partenaire-apivud-${token}`
      },
      body: new URLSearchParams({
        key: token,
        nom: payload.nom,
        prenom: payload.prenom,
        email: payload.email,
        tel: payload.tel,
        adresse1: payload.adresse1 || payload.ville,
        adresse2: payload.adresse2 || '',
        cp: payload.cp,
        ville: payload.ville,
        cp_projet: payload.cp_projet,
        ville_projet: payload.ville_projet,
        pays: payload.pays || 'fr',
        tp: String(payload.tp),
        type_bien: String(payload.type_bien),
        situation: String(payload.situation),
        delais: String(payload.delais),
        description: payload.description,
        cat_id: payload.cat_id,
        format_return: 'json',
        site_name: siteDomain,
        consent_texte: textConsent,
        consent_text: textConsent,
        consent_date: dateConsent,
        consent_ip: ipConsent,
        consent_url: urlConsent
      })
    });

    if (!response.ok) {
      console.error(`❌ [ViteUnDevis] POST error. Status: ${response.status}`);
      return null;
    }

    const data: VUDResponse = await response.json();
    console.log("📡 [ViteUnDevis] POST response:", data);
    return data;
  } catch (err) {
    console.error("❌ [ViteUnDevis] POST lead submission failed:", err);
    return null;
  }
}
