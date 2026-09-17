import type { CityConfig } from "@/lib/db";
import { clampDescription, clampTitle } from "@/lib/seo-meta";
import { composeLocalIntro } from "@/lib/pseo-local";

// Structure d'une page pSEO générée
export interface PseoPageContent {
    meta_title: string;
    meta_description: string;
    hero_title: string;
    hero_badge: string;
    intro_html: string;
    cta_primary: string;
    pricing_estimated: string;
    regional_subsidy: string;
    expert_tip: string;
}

// ============================================
// Données régionales et métropolitaines étendues
// ============================================
const REGIONAL_DATA: Record<string, { subsidyName: string; subsidyAmount: string; gridOperator: string; avgPrice: string; }> = {
    "75": { subsidyName: "Paris Éco-Rénovation", subsidyAmount: "Jusqu'à 4 000€ (Ville de Paris + Advenir)", gridOperator: "Enedis Île-de-France", avgPrice: "1 200€ – 2 500€" },
    "92": { subsidyName: "Hauts-de-Seine Mobilité Propre", subsidyAmount: "Prime Advenir + Crédit d'impôt 500€", gridOperator: "Enedis Île-de-France", avgPrice: "1 150€ – 2 400€" },
    "93": { subsidyName: "Grand Paris Mobilité Durable", subsidyAmount: "Prime Advenir + Aide Métropole du Grand Paris", gridOperator: "Enedis Île-de-France", avgPrice: "1 100€ – 2 300€" },
    "94": { subsidyName: "Val-de-Marne Éco-Mobilité", subsidyAmount: "Prime Advenir + Crédit d'impôt 500€", gridOperator: "Enedis Île-de-France", avgPrice: "1 100€ – 2 300€" },
    "78": { subsidyName: "Yvelines Mobilité Verte", subsidyAmount: "Prime Advenir + Aides départementales", gridOperator: "Enedis Île-de-France", avgPrice: "1 050€ – 2 200€" },
    "91": { subsidyName: "Essonne Éco-Transition", subsidyAmount: "Prime Advenir + Crédit d'impôt 500€", gridOperator: "Enedis Île-de-France", avgPrice: "950€ – 2 000€" },
    "95": { subsidyName: "Val-d'Oise Éco-Mobilité", subsidyAmount: "Prime Advenir + Crédit d'impôt 500€", gridOperator: "Enedis Île-de-France", avgPrice: "950€ – 2 000€" },
    "77": { subsidyName: "Seine-et-Marne Transition", subsidyAmount: "Prime Advenir + Crédit d'impôt 500€", gridOperator: "Enedis Île-de-France", avgPrice: "950€ – 1 950€" },
    "69": { subsidyName: "Métropole de Lyon Éco-Énergie", subsidyAmount: "Prime Advenir + Bonus Métropole Lyon", gridOperator: "Enedis Rhône", avgPrice: "890€ – 1 800€" },
    "13": { subsidyName: "Région Sud Mobilité Verte", subsidyAmount: "Prime Advenir + Aide Région Sud", gridOperator: "Enedis Provence", avgPrice: "850€ – 1 700€" },
    "06": { subsidyName: "Métropole Nice Côte d'Azur", subsidyAmount: "Prime Advenir + Aide MNCA", gridOperator: "Enedis Alpes-Maritimes", avgPrice: "950€ – 2 200€" },
    "33": { subsidyName: "Bordeaux Métropole Climat", subsidyAmount: "Prime Advenir + Bonus Gironde", gridOperator: "Enedis Gironde", avgPrice: "890€ – 1 800€" },
    "31": { subsidyName: "Toulouse Métropole Transition", subsidyAmount: "Prime Advenir + Aide Occitanie", gridOperator: "Enedis Haute-Garonne", avgPrice: "850€ – 1 700€" },
    "59": { subsidyName: "MEL Mobilité Électrique", subsidyAmount: "Prime Advenir + Aide MEL", gridOperator: "Enedis Nord", avgPrice: "890€ – 1 800€" },
    "67": { subsidyName: "Eurométropole de Strasbourg", subsidyAmount: "Prime Advenir + Aide Grand Est", gridOperator: "Électricité de Strasbourg", avgPrice: "890€ – 1 800€" },
    "44": { subsidyName: "Nantes Métropole Climat", subsidyAmount: "Prime Advenir + Aide Pays de la Loire", gridOperator: "Enedis Loire-Atlantique", avgPrice: "850€ – 1 600€" },
    "34": { subsidyName: "Montpellier Méditerranée Métropole", subsidyAmount: "Prime Advenir + Aide 3M", gridOperator: "Enedis Hérault", avgPrice: "850€ – 1 700€" },
    "35": { subsidyName: "Rennes Métropole Éco-Mobilité", subsidyAmount: "Prime Advenir + Crédit d'impôt 500€", gridOperator: "Enedis Bretagne", avgPrice: "850€ – 1 650€" },
    "38": { subsidyName: "Grenoble-Alpes Métropole", subsidyAmount: "Prime Advenir + Aide Air Climat", gridOperator: "GreenAlp / Enedis", avgPrice: "890€ – 1 750€" },
    "83": { subsidyName: "Toulon Provence Méditerranée", subsidyAmount: "Prime Advenir + Crédit d'impôt 500€", gridOperator: "Enedis Var", avgPrice: "890€ – 1 750€" },
};

const DEFAULT_REGIONAL = {
    subsidyName: "Programme national ADVENIR & Crédit d'impôt",
    subsidyAmount: "Jusqu'à 500€ de crédit d'impôt + Prime Advenir (jusqu'à 960€)",
    gridOperator: "Enedis",
    avgPrice: "890€ – 1 800€"
};

// 8 conseils d'experts diversifiés et techniques
function getExpertTip(city: string, dept: string, neighborhoods: string[], priceStart?: number): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";
    const prepCapital = isFrance ? "En" : "À";

    const tips = [
        `${prepCapital} ${city}, ${priceStart && priceStart >= 1000 ? "les maisons individuelles et résidences pavillonnaires sont majoritaires" : "les copropriétés représentent plus de 60% des demandes"}. Pour un usage quotidien sans surcoût d'abonnement, nous préconisons une borne 7.4 kW monophasée avec gestion dynamique de délestage.`,
        `Pour une installation en copropriété ${prep} ${city}, faites valoir votre "Droit à la prise" (décret 2020-1720) : le syndic ne peut s'y opposer sans motif sérieux et légitime. Notre bureau d'études prépare gratuitement votre dossier technique pour l'AG.`,
        `À ${city}, les pics de demande électrique imposent de choisir une borne communicante compatible avec la tarification dynamique Tempo ou Heures Pleines / Heures Creuses d'EDF afin de recharger à moindre coût la nuit.`,
        `Les résidents de ${neighborhoods[0] || (isFrance ? "votre secteur" : city)} privilégient les Wallbox connectées en Wi-Fi / 4G avec contrôle d'accès par badge RFID pour sécuriser l'usage de la borne en extérieur ou en parking partagé.`,
        `Avant toute pose ${prep} ${city}, notre électricien IRVE contrôle l'état de votre disjoncteur d'abonné et s'assure de la présence d'une prise de terre conforme (inférieure à 100 Ohms, exigée par la norme NF C 15-100).`,
        `En ${dept || "territoire local"}, l'installation d'une borne de 11 kW ou 22 kW nécessite un raccordement triphasé. Si votre compteur Linky est en monophasé, nous vous guidons pour demander le passage en triphasé auprès d'Enedis sans coupure prolongée.`,
        `Profitez des aides 2026 : le crédit d'impôt de 500€ est accessible sans conditions de ressources pour votre résidence principale ou secondaire ${prep} ${city}. La facture de l'installateur certifié IRVE fait office de justificatif fiscal.`,
        `Nos installateurs qualifiés ${prep} ${city} intègrent systématiquement un interrupteur différentiel 30mA de type F ou B ainsi qu'un disjoncteur courbe C adapté, garantissant la protection intégrale de vos équipements électroniques.`
    ];
    return tips[hash % tips.length];
}

// ============================================
// Génération du contenu pSEO — données réelles
// ============================================
export async function getPseoContent(cityConfig: CityConfig, targetType: string = 'MIXED'): Promise<PseoPageContent> {
    const { city, department, region, postalCode, neighborhoods, pricing } = cityConfig;
    const dept = department || "";
    const postal = postalCode || "";
    const quartiers = neighborhoods || [];

    // Récupérer les données régionales réelles
    const deptCode = dept.length >= 2 ? dept.substring(0, 2) : "";
    const regionalInfo = REGIONAL_DATA[deptCode] || DEFAULT_REGIONAL;

    // Prix réel depuis la config de la ville
    const realPrice = pricing?.base || `À partir de ${regionalInfo.avgPrice.split('–')[0].trim()}`;

    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";

    // Meta title optimisé pour le CTR
    const meta_title = clampTitle(`Borne de recharge à ${isFrance ? "France" : city} | Devis IRVE`);
    const meta_description = clampDescription(`Installation borne de recharge ${prep} ${city} par un électricien certifié IRVE. ${realPrice} avant aides. ${regionalInfo.subsidyAmount}. Devis gratuit en 2 min.`);

    const hero_title = `Installateur <span class="text-blue-500">Borne de Recharge</span> ${prep} ${city}${postal ? ` <span class="text-slate-400 text-3xl">(${postal})</span>` : ''}`;
    const hero_badge = regionalInfo.subsidyName;

    // Intro : six emplacements factuels assemblés par pseo-local.ts. Les
    // accroches et la prestation viennent de la verticale, les quatre autres
    // emplacements sont mutualisés. L'ancienne version piochait un texte parmi
    // cinq par hash, donc toutes les communes recevaient la même introduction à
    // un mot près : le motif « doorway ».
    const intro_html = composeLocalIntro(
        {
            city,
            postal,
            deptCode: dept,
            region,
            quartiers,
            authority: regionalInfo.gridOperator,
        },
        {
            audience: "Les particuliers, les copropriétés et les entreprises",
            service: "l'étude, la fourniture et la pose de la borne de recharge",
            norms: "la norme NF C 15-100 et le référentiel IRVE",
            document: "l'attestation de conformité IRVE et la fiche d'intervention",
            authorityLabel: "le gestionnaire du réseau public de distribution",
            project: "votre projet d'équipement de recharge",
        },
        {
            openers: [
                (f) => `Besoin d'une borne de recharge à ${f.city}${f.postal ? ` (${f.postal})` : ""} ? Nos électriciens qualifiés IRVE étudient votre tableau électrique et posent une wallbox 7,4 ou 11 kW en une demi-journée.`,
                (f) => `À ${f.city}, recharger sur une simple prise domestique plafonne à 2,3 kW et dépasse vingt heures : une borne murale dédiée ramène ce délai à quelques heures.`,
                (f) => `Vous cherchez un installateur de borne de recharge à ${f.city} ? Nos équipes interviennent ${f.quartiers?.length ? `dans les secteurs de ${f.quartiers.slice(0, 3).join(", ")}` : "sur toute la commune"} et dans les communes limitrophes.`,
                (f) => `Faire poser une borne à ${f.city} met l'installation en conformité avec la NF C 15-100 et sécurise la charge de votre véhicule au quotidien.`,
                (f) => `Le budget d'une installation clé en main à ${f.city} se situe autour de ${realPrice} avant déduction des aides.`,
            ],
            middles: [
                () => `Le chantier couvre l'étude de la puissance disponible, la fourniture de la borne, le passage de câble et la pose du disjoncteur différentiel dédié.`,
                () => `Nous prenons en charge la mise en service, l'attestation de conformité et le calcul des aides : crédit d'impôt de 500 €, TVA à 5,5 % et prime Advenir.`,
                (f) => `En copropriété à ${f.city}, nous préparons le dossier technique pour l'assemblée générale au titre du droit à la prise (décret 2020-1720) et coordonnons les travaux avec le syndic.`,
                (f) => `Sur ${f.city}, la pose se fait en une demi-journée : tests de charge, réglage du délestage dynamique et prise en main de la borne.`,
                () => `Chaque devis détaille la puissance retenue, la longueur de câble, le prix du matériel et le reste à charge après ${regionalInfo.subsidyName}.`,
            ],
        },
    );

    return {
        meta_title,
        meta_description,
        hero_title,
        hero_badge,
        intro_html,
        cta_primary: "Obtenir 3 devis gratuits",
        pricing_estimated: realPrice,
        regional_subsidy: regionalInfo.subsidyAmount,
        expert_tip: getExpertTip(city, dept, quartiers, parseInt(realPrice.replace(/\D/g, '')) || undefined),
    };
}
