import type { CityConfig } from "@/lib/db";

export interface PseoQuartierContent {
    meta_title: string;
    meta_description: string;
    hero_title: string;
    hero_badge: string;
    intro_html: string;
    housing_advice: {
        title: string;
        content: string;
    };
    tech_specs: {
        power: string;
        protection: string;
        subvention: string;
    };
    faqs: {
        question: string;
        answer: string;
    }[];
    client_review: {
        author: string;
        vehicle: string;
        text: string;
    };
}

export function getPseoQuartierContent(quartierName: string, city: string, cityConfig?: CityConfig): PseoQuartierContent {
    const hash = (quartierName + city).split('').reduce((a, c) => a + c.charCodeAt(0), 0);

    const introVariants = [
        `<p class="mb-4">
            Vous envisagez d'installer une borne de recharge électrique dans le secteur de <strong>${quartierName}</strong> à <strong>${city}</strong> ?
            Que vous habitiez en maison individuelle, en pavillon ou au sein d'une copropriété, le passage à la mobilité électrique nécessite une infrastructure certifiée et conforme aux normes de sécurité électrique françaises.
        </p>
        <p>
            Nos électriciens qualifiés <strong>IRVE (Indice de Recharge pour Véhicules Électriques)</strong> interviennent directement à ${quartierName} pour réaliser un diagnostic complet de votre tableau électrique, déterminer la puissance optimale (de 7,4 kW à 22 kW) et assurer une pose garantie 2 ans avec attestation de conformité Consuel.
        </p>`,

        `<p class="mb-4">
            À <strong>${quartierName}</strong> (${city}), l'adoption des véhicules électriques et hybrides rechargeables progresse rapidement. Pour recharger votre véhicule en toute sérénité sans risquer de surchauffe sur une prise domestique standard, la pose d'une <strong>Wallbox dédiée</strong> est vivement recommandée par les constructeurs.
        </p>
        <p>
            Nous accompagnons les particuliers et professionnels de ${quartierName} de l'étude de faisabilité jusqu'à la mise en service : choix de la borne (connectée, avec délestage dynamique), passage de câble aux normes NFC 15-100 et constitution du dossier pour déduire vos aides financières et primes ADVENIR.
        </p>`,

        `<p class="mb-4">
            Résidents et entreprises du quartier <strong>${quartierName}</strong> à <strong>${city}</strong>, facilitez votre quotidien en installant une borne de recharge rapide et intelligente à domicile ou sur votre lieu de travail.
        </p>
        <p>
            Fini les temps d'attente sur les bornes publiques : rechargez votre batterie pendant la nuit en heures creuses à coût réduit. Nos installateurs agréés IRVE basés à proximité de ${quartierName} vous garantissent une intervention rapide, un devis transparent sans frais cachés et un matériel haute performance (Schneider, Hager, Wallbox, Legrand).
        </p>`
    ];

    const housingVariants = [
        {
            title: `Spécificités d'installation à ${quartierName}`,
            content: `Dans le secteur de ${quartierName}, nous adaptons la pose à votre configuration : en maison individuelle avec garage ou allée extérieure (étanchéité IP54/IK10), ou en résidence collective grâce au Droit à la Prise sans frais pour le syndic.`
        },
        {
            title: `Solutions pour maisons et résidences à ${quartierName}`,
            content: `Que votre compteur électrique soit situé en intérieur ou en limite de propriété dans le quartier ${quartierName}, nos techniciens calculent la section de câble exacte pour éliminer toute chute de tension et intègrent un module de délestage automatique.`
        },
        {
            title: `Raccordement électrique sécurisé à ${quartierName}`,
            content: `Pour les habitations de ${quartierName}, nous installons un disjoncteur différentiel Type A ou Type B dédié et raccordons la borne directement à la télé-information client (TIC) de votre compteur Linky pour optimiser la charge.`
        }
    ];

    const reviewVariants = [
        {
            author: "Marc L.",
            vehicle: "Tesla Model Y",
            text: `Pose impeccable d'une Wallbox 7.4 kW dans mon garage à ${quartierName}. Électricien IRVE ponctuel, travail propre avec goulottes soignées. Je recommande vivement.`
        },
        {
            author: "Sophie V.",
            vehicle: "Peugeot e-208",
            text: `Installation très rapide à ${quartierName}. L'artisan m'a aidée à remplir les papiers pour le crédit d'impôt et la prime. La recharge en heures creuses fonctionne parfaitement.`
        },
        {
            author: "Alexandre B.",
            vehicle: "Renault Mégane E-Tech",
            text: `Devis reçu en 24h et intervention la semaine suivante à ${quartierName}. Borne connectée très facile d'utilisation, équipe très professionnelle.`
        },
        {
            author: "Julien D.",
            vehicle: "Volkswagen ID.4",
            text: `Excellent travail pour notre copropriété à ${quartierName}. Dossier Droit à la prise validé sans souci, installation sécurisée et aux normes.`
        }
    ];

    const faqs = [
        {
            question: `Quel est le prix d'installation d'une borne de recharge à ${quartierName} ?`,
            answer: `Le coût moyen d'une installation certifiée IRVE à ${quartierName} se situe entre 890 € et 1 490 € TTC (matériel et pose compris), avant déduction du crédit d'impôt de 500 € et de la TVA réduite à 5,5 %.`
        },
        {
            question: `Quelles sont les aides financières disponibles pour les résidents de ${quartierName} ?`,
            answer: `Vous pouvez bénéficier d'un crédit d'impôt de 500 € par borne (sans condition de revenus), de la TVA à 5,5 %, et d'une prime ADVENIR pouvant atteindre 50 % du coût (jusqu'à 960 €) pour les installations en copropriété à ${city}.`
        },
        {
            question: `Quel est le délai pour faire installer ma borne à ${quartierName} (${city}) ?`,
            answer: `Après validation de votre devis gratuit en ligne, nos installateurs partenaires certifiés IRVE interviennent généralement sous 5 à 10 jours ouvrés à ${quartierName}. L'installation dure en moyenne une demi-journée.`
        }
    ];

    return {
        meta_title: `Installation Borne Recharge ${quartierName} - ${city} | Devis IRVE Gratuit`,
        meta_description: `Installateur certifié IRVE à ${quartierName} (${city}). Pose de bornes de recharge pour particuliers et copropriétés. Devis gratuit sous 24h, crédit d'impôt 500€.`,
        hero_title: `Installation Borne de Recharge à ${quartierName}`,
        hero_badge: `Électriciens IRVE Certifiés • ${city}`,
        intro_html: introVariants[hash % introVariants.length],
        housing_advice: housingVariants[hash % housingVariants.length],
        tech_specs: {
            power: (hash % 2 === 0) ? "7.4 kW (Monophasé 32A)" : "11 kW / 22 kW (Triphasé)",
            protection: "Disjoncteur différentiel Type A-EV / Type B + Bobine MNx",
            subvention: "Crédit d'impôt 500 € + TVA 5.5% + Prime ADVENIR"
        },
        faqs,
        client_review: reviewVariants[hash % reviewVariants.length]
    };
}
