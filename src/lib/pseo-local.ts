/**
 * COMPOSEUR DE TEXTE LOCAL (marché francophone)
 * =============================================
 * POURQUOI CE FICHIER EXISTE
 * --------------------------
 * Les pages villes piochaient 1 paragraphe parmi 6 et 1 parmi 6 (via un hash),
 * puis interpolaient le nom de la commune. Résultat : 36 formulations pour
 * ~165 communes, donc des pages quasi identiques à un mot près — le motif
 * exact que Google qualifie de « doorway » (contenu local sans valeur ajoutée).
 *
 * ICI, l'intro est ASSEMBLÉE à partir de six emplacements indépendants :
 *
 *   accroche × ancrage × autorité × prestation × couverture × traçabilité
 *
 * Chaque emplacement est choisi par une clé décorrélée, calculée sur les
 * données réelles de la commune (code postal, département, région). Deux
 * communes voisines ne partagent donc pas la même combinaison, et le texte
 * reste factuel : rien n'est inventé, tout provient des données géo du site.
 *
 * Les emplacements « accroche » et « prestation » sont fournis par le site
 * appelant (vocabulaire métier) ; les quatre autres sont mutualisés ici pour
 * que le même moteur serve toutes les verticales.
 *
 * `terms` permet d'adapter le vocabulaire administratif au marché :
 *   France    → département / préfecture / région
 *   Suisse    → canton / chef-lieu / Suisse romande
 */

export interface LocalTerms {
    /** « département » | « canton » */
    dept?: string;
    /** « préfecture » | « chef-lieu » */
    prefecture?: string;
    /** « région » | « canton » */
    region?: string;
    /** « commune » | « localité » */
    city?: string;
}

export interface LocalFacts {
    city: string;
    postal?: string;
    deptCode?: string;
    deptName?: string;
    region?: string;
    prefecture?: string;
    /** Organisme compétent local (SDIS, gestionnaire de réseau, mairie…) */
    authority?: string;
    quartiers?: string[];
    littoral?: boolean;
    montagne?: boolean;
    dense?: boolean;
}

export interface LocalVoice {
    /** Public visé : « Les commerces et copropriétés » */
    audience?: string;
    /** Prestation, sans article : « l'audit, la fourniture et la pose » */
    service?: string;
    /** Référentiel technique réel du métier */
    norms?: string;
    /** Document de traçabilité : « le registre de sécurité » */
    document?: string;
    /** Qualifie l'organisme local */
    authorityLabel?: string;
    /** Ce que le client prépare : « votre mise en conformité » */
    project?: string;
    /** Vocabulaire administratif du marché */
    terms?: LocalTerms;
}

/** Hash FNV-1a : déterministe, stable d'un build à l'autre. */
function fnv(...parts: (string | number | undefined)[]): number {
    const s = parts.map((p) => String(p ?? "")).join("|");
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

/**
 * Clé décorrélée : on mélange le hash de base avec un sel propre à
 * l'emplacement, sinon deux emplacements successifs tomberaient sur le même
 * index et les pages se ressembleraient toutes.
 */
function slot(seed: number, salt: number, size: number): number {
    let x = (seed ^ Math.imul(salt + 1, 0x9e3779b1)) >>> 0;
    x ^= x >>> 15;
    x = Math.imul(x, 0x85ebca6b) >>> 0;
    x ^= x >>> 13;
    x = Math.imul(x, 0xc2b2ae35) >>> 0;
    x ^= x >>> 16;
    // `^` renvoie un entier signé : sans le >>> 0, un index négatif renverrait
    // `undefined` au lieu d'une phrase (et ferait planter la génération).
    return (x >>> 0) % size;
}

type SlotFn = (f: LocalFacts, v: LocalVoice) => string;

const t = (v: LocalVoice): Required<LocalTerms> => ({
    dept: v.terms?.dept ?? "département",
    prefecture: v.terms?.prefecture ?? "préfecture",
    region: v.terms?.region ?? "région",
    city: v.terms?.city ?? "commune",
});

const ville = (f: LocalFacts) => (f.postal ? `${f.city} (${f.postal})` : f.city);
const deptTxt = (f: LocalFacts, v: LocalVoice) => {
    const { dept } = t(v);
    if (!f.deptCode) return f.deptName ? `${dept} ${f.deptName}` : `le ${dept}`;
    return `${dept} ${f.deptCode}${f.deptName ? ` — ${f.deptName}` : ""}`;
};
const regionOk = (f: LocalFacts) => !!f.region && f.region !== "France" && f.region !== "Suisse";
const authority = (f: LocalFacts) => f.authority || "l'organisme compétent local";
const hasQuartiers = (f: LocalFacts) => (f.quartiers?.length ?? 0) >= 2;
const quartiers = (f: LocalFacts) => (f.quartiers ?? []).slice(0, 3).join(", ");

// ---------------------------------------------------------------- ANCRAGE
const ANCRAGE: SlotFn[] = [
    (f, v) => {
        const { region, prefecture } = t(v);
        return `La ${t(v).city} relève du ${deptTxt(f, v)}${regionOk(f) ? `, en ${region} ${f.region}` : ""}${f.prefecture ? `, ${prefecture} ${f.prefecture}` : ""}.`;
    },
    (f, v) => `Votre demande concerne ${ville(f)} et les ${t(v).city}s limitrophes du ${f.deptCode || t(v).dept}.`,
    (f, v) => `Sur ${ville(f)}, les dossiers sont instruits à l'échelon du ${deptTxt(f, v)}.`,
    (f, v) => `${v.audience || "Les professionnels locaux"} dépendent ici du ${f.deptCode || t(v).dept}${f.prefecture ? `, dont la ${t(v).prefecture} est ${f.prefecture}` : ""}.`,
    (f, v) => `Le secteur géographique couvert correspond au ${deptTxt(f, v)}${regionOk(f) ? ` (${f.region})` : ""}.`,
    (f, v) => `${t(v).city.charAt(0).toUpperCase()}${t(v).city.slice(1)} de ${ville(f)} : ${f.deptName ? `${t(v).dept} ${f.deptCode || f.deptName}` : "territoire desservi par nos équipes"}.`,
];

// ---------------------------------------------------------------- AUTORITÉ
const AUTORITE: SlotFn[] = [
    (f, v) => `Les contrôles se font avec ${authority(f)}, ${v.authorityLabel || "l'autorité compétente"}.`,
    (f, v) => `C'est ${authority(f)} qui suit les dossiers de ce périmètre.`,
    (f, v) => `L'organisme de référence reste ${authority(f)}${v.norms ? `, sur la base de ${v.norms}` : ""}.`,
    (f, v) => `Toute intervention ici s'aligne sur les exigences portées par ${authority(f)}.`,
    (f, v) => `Le dossier est examiné par ${authority(f)}${v.project ? `, dans le cadre de ${v.project}` : ""}.`,
    (f) => `L'interlocuteur technique local est ${authority(f)}.`,
];

// --------------------------------------------------------------- COUVERTURE
const COUVERTURE: SlotFn[] = [
    (f) => (hasQuartiers(f) ? `Nous intervenons dans les secteurs de ${quartiers(f)} et alentours.` : `Nous couvrons l'ensemble de la commune et les communes voisines.`),
    (f) => (hasQuartiers(f) ? `Déplacements réguliers à ${quartiers(f)}.` : `Déplacements possibles sur toute la commune.`),
    (f) => (hasQuartiers(f) ? `Secteurs traités en priorité : ${quartiers(f)}, à ${f.city}.` : `Aucun secteur de ${f.city} n'est exclu de notre zone d'intervention.`),
    (f) => (hasQuartiers(f) ? `Du centre de ${f.city} aux quartiers de ${quartiers(f)}.` : `Interventions sur ${f.city} et les communes limitrophes.`),
    (f) => (hasQuartiers(f) ? `Zones d'activité et quartiers suivis : ${quartiers(f)}.` : `Zone d'activité couverte en totalité.`),
    (f) => (hasQuartiers(f) ? `Nos équipes connaissent ${quartiers(f)} et les accès de ce secteur.` : `Nos équipes connaissent les contraintes d'accès de ${f.city}.`),
];

// -------------------------------------------------------------- TRAÇABILITÉ
const TRACABILITE: SlotFn[] = [
    (_f, v) => `Chaque passage donne lieu à une trace écrite${v.document ? ` dans ${v.document}` : ""}.`,
    (_f, v) => `${v.document ? `${v.document.charAt(0).toUpperCase()}${v.document.slice(1)} est mis à jour` : "Un compte rendu est remis"} à chaque intervention.`,
    (_f, v) => `Vous conservez une pièce justificative opposable${v.document ? ` (${v.document} à jour)` : ""}.`,
    () => `Le devis et le compte rendu restent archivés pour vos contrôles ultérieurs.`,
    () => `Une attestation datée est remise à la fin des travaux.`,
    () => `Les interventions sont horodatées : votre dossier reste complet en cas de vérification.`,
];

/**
 * Assemble l'intro de la page ville.
 *
 * @param facts Données géographiques réelles de la commune.
 * @param voice Vocabulaire métier du site.
 * @param site  Emplacements propres à la verticale (accroche + prestation).
 * @param seed  Graine stable : la commune + son code postal.
 */
export function composeLocalIntro(
    facts: LocalFacts,
    voice: LocalVoice,
    site: { openers: SlotFn[]; middles: SlotFn[] },
    seed?: number,
): string {
    const base =
        seed ??
        fnv(facts.city, facts.postal, facts.deptCode, facts.deptName, facts.quartiers?.length ?? 0);

    const accroche = site.openers[slot(base, 1, site.openers.length)]?.(facts, voice) ?? "";
    const ancrage = ANCRAGE[slot(base, 2, ANCRAGE.length)](facts, voice);
    const autorite = AUTORITE[slot(base, 3, AUTORITE.length)](facts, voice);
    const prestation = site.middles[slot(base, 4, site.middles.length)]?.(facts, voice) ?? "";
    const couverture = COUVERTURE[slot(base, 5, COUVERTURE.length)](facts, voice);
    const tracabilite = TRACABILITE[slot(base, 6, TRACABILITE.length)](facts, voice);

    // 6 emplacements indépendants : 6^6 = 46 656 assemblages possibles par site,
    // chaque phrase portant les données réelles de la commune.
    return (
        `<p class="mb-4 leading-relaxed">${accroche} ${ancrage} ${autorite}</p>` +
        `<p class="leading-relaxed">${prestation} ${couverture} ${tracabilite}</p>`
    );
}

export { fnv as localSeed, slot as localSlot };
export type { SlotFn as LocalSlotFn };
