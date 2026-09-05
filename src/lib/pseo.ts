import type { CityConfig } from "@/lib/db";

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

// 5 variantes d'introductions ultra-riches et structurées (3 paragraphes chacune)
function getIntroHtml(city: string, dept: string, neighborhoods: string[], postalCode: string, avgPrice: string): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";

    const neighborhoodMention = neighborhoods.length >= 2
        ? `Nos artisans électriciens se déplacent dans tous les secteurs de la commune : <strong>${neighborhoods.slice(0, 3).join(', ')}</strong> ainsi que dans les localités périphériques.`
        : "Nos installateurs qualifiés assurent une couverture totale de l'ensemble de votre secteur et de ses environs.";

    const postalCodeMention = postalCode ? ` (${postalCode})` : "";

    const intros = [
        `<p class="mb-4 leading-relaxed">
            Vous souhaitez faire poser une <strong>borne de recharge électrique</strong> ${prep} <strong>${city}${postalCodeMention}</strong> ? 
            Face à l'essor des véhicules 100% électriques et hybrides rechargeables, disposer d'une borne de recharge dédiée à domicile ou sur son lieu de travail constitue la solution la plus rapide, économique et sécurisée pour recharger votre batterie au quotidien.
            ${neighborhoodMention}
        </p>
        <p class="mb-4 leading-relaxed">
            En faisant appel à un électricien détenteur de la qualification <strong>IRVE (Infrastructure de Recharge pour Véhicules Électriques)</strong> ${prep} ${city}, vous avez l'assurance d'un raccordement conforme à la norme <strong>NF C 15-100</strong> et aux exigences des constructeurs automobiles. Le coût moyen d'une installation clé en main se situe entre <strong>${avgPrice}</strong> selon la distance au tableau électrique.
        </p>
        <p class="leading-relaxed">
            Bénéficiez immédiatement du <strong>crédit d'impôt de 500€</strong>, de la TVA réduite à 5,5% et des subventions du programme national ADVENIR. Nos artisans partenaires établissent un devis gratuit et personnalisé sous 24h après étude de votre installation électrique.
        </p>`,

        `<p class="mb-4 leading-relaxed">
            Faites installer votre <strong>Wallbox à ${city}</strong>${dept ? ` (${dept})` : ''} par un installateur certifié et reconnu. 
            Recharger sur une simple prise domestique présente des risques de surchauffe et limite la puissance à 2,3 kW, nécessitant plus de 20 heures pour une charge complète. Une borne murale de 7,4 kW ou 11 kW réduit ce délai à seulement quelques heures tout en préservant la longévité de votre batterie.
        </p>
        <p class="mb-4 leading-relaxed">
            ${neighborhoodMention} Que votre projet concerne une maison individuelle, un emplacement de parking en copropriété ou une flotte professionnelle, nous concevons une installation sur mesure avec passage de câble discret et protection différentielle dédiée. Budget moyen constaté : <strong>${avgPrice}</strong> tout compris avant déduction des aides.
        </p>
        <p class="leading-relaxed">
            De la visite technique préliminaire jusqu'à la remise de l'attestation de conformité, nous prenons en charge la gestion administrative de votre dossier de primes pour minimiser votre reste à charge réel.
        </p>`,

        `<p class="mb-4 leading-relaxed">
            À <strong>${city}</strong>, la transition vers la mobilité électrique s'accélère. Pour accompagner cette évolution, notre réseau d'électriciens certifiés IRVE vous propose un service complet d'installation et de maintenance de bornes de recharge privées et professionnelles.
            ${neighborhoodMention}
        </p>
        <p class="mb-4 leading-relaxed">
            La loi française impose l'intervention d'un technicien certifié IRVE pour tout équipement de recharge d'une puissance supérieure à 3,7 kW. Cette certification est la condition indispensable pour que votre assurance habitation couvre l'installation et pour débloquer les aides financières de l'État. Pour une pose réalisée dans les règles de l'art ${prep} ${city}, comptez un investissement moyen de <strong>${avgPrice}</strong>.
        </p>
        <p class="leading-relaxed">
            Nos bornes intelligentes sont équipées de modules de gestion dynamique pour moduler la charge en fonction des appareils électroménagers en marche, évitant toute surconsommation ou disjonction inopinée de votre compteur.
        </p>`,

        `<p class="mb-4 leading-relaxed">
            Recherchez-vous le meilleur <strong>installateur de borne électrique à ${city}${postalCodeMention}</strong> ? 
            Nous vous mettons en relation avec les installateurs les plus qualifiés de votre département, formés aux dernières technologies de recharge pilotable (Schneider, Legrand, Wallbox, Circontrol, Zaptec, Tesla Wall Connector).
        </p>
        <p class="mb-4 leading-relaxed">
            ${neighborhoodMention} En maison individuelle comme en immeuble collectif, nos installateurs procèdent à une étude précise de la puissance disponible sur votre tableau de répartition et déterminent le tracé de câble optimal pour sécuriser l'installation. Tarifs moyens de référence à ${city} : <strong>${avgPrice}</strong> (matériel et main-d'œuvre certifiée inclus).
        </p>
        <p class="leading-relaxed">
            Profitez des dispositifs d'aide en vigueur : prime ADVENIR jusqu'à 960€ en résidentiel collectif, crédit d'impôt forfaitaire de 500€ par borne et taux de TVA allégé à 5,5%. Demandez votre étude de faisabilité et votre devis gratuit dès aujourd'hui.
        </p>`,

        `<p class="mb-4 leading-relaxed">
            Installer une <strong>borne de recharge rapide et sécurisée à ${city}</strong> n'a jamais été aussi simple. Notre équipe d'électriciens locaux agréés IRVE intervient sous 48 heures pour évaluer vos besoins et configurer la solution de recharge parfaitement adaptée à votre véhicule et à vos habitudes de déplacement.
        </p>
        <p class="mb-4 leading-relaxed">
            ${neighborhoodMention} Grâce à un équipement adapté doté d'une programmation horaire, vous rechargez automatiquement votre voiture pendant les heures creuses, réduisant jusqu'à 70% le coût de vos trajets par rapport à un véhicule thermique. Le budget moyen observé sur le secteur de ${city} est compris entre <strong>${avgPrice}</strong> avant aides.
        </p>
        <p class="leading-relaxed">
            Tous nos chantiers bénéficient de la garantie décennale et du suivi après-vente. Obtenez une estimation détaillée immédiate et lancez votre projet en toute sérénité avec nos spécialistes de proximité.
        </p>`
    ];

    return intros[hash % intros.length];
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
    const meta_title = `Installateur Borne de Recharge ${isFrance ? "en France" : city}${postal ? ` (${postal})` : ''} | Devis Gratuit IRVE`;
    const meta_description = `Installation borne de recharge ${prep} ${city} par un électricien certifié IRVE. ${realPrice} avant aides. ${regionalInfo.subsidyAmount}. Devis gratuit en 2 min.`;

    const hero_title = `Installateur <span class="text-blue-500">Borne de Recharge</span> ${prep} ${city}${postal ? ` <span class="text-slate-400 text-3xl">(${postal})</span>` : ''}`;
    const hero_badge = regionalInfo.subsidyName;

    const intro_html = getIntroHtml(city, dept, quartiers, postal, regionalInfo.avgPrice);

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
