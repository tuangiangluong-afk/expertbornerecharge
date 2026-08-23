import type { BrandData } from "@/data/brands";
import type { CityConfig } from "@/lib/db";

export interface PseoBrandContent {
    meta_title: string;
    meta_description: string;
    hero_title: string;
    hero_badge: string;
    intro_html: string;
    battery_charging_table: {
        power: string;
        time: string;
        current: string;
        usage: string;
    }[];
    local_advice: {
        title: string;
        content: string;
    };
    faqs: {
        question: string;
        answer: string;
    }[];
}

export function getPseoBrandContent(city: string, brand: BrandData, site?: CityConfig): PseoBrandContent {
    const hash = (city + brand.slug).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const postal = site?.postalCode ? ` (${site.postalCode})` : '';
    const modelsList = brand.models.slice(0, 3).join(', ');

    const introVariants = [
        `<p class="mb-4">
            Vous êtes propriétaire d'un véhicule électrique <strong>${brand.name}</strong> (${modelsList}) à <strong>${city}${postal}</strong> ?
            Pour préserver la durée de vie de votre batterie haute tension et profiter d'une recharge rapide en toute sécurité, l'installation d'une borne <strong>certifiée IRVE</strong> à domicile ou sur votre lieu de travail est la solution idéale.
        </p>
        <p>
            Nos électriciens qualifiés interviennent à ${city} pour analyser votre abonnement électrique (monophasé ou triphasé), poser une protection différentielle adaptée et configurer la puissance de charge maximale (${brand.maxPower}) tout en évitant les disjonctions grâce au délestage intelligent.
        </p>`,

        `<p class="mb-4">
            Rouler en <strong>${brand.name}</strong> à <strong>${city}</strong> offre un confort de conduite exceptionnel. Cependant, recharger sur une prise domestique standard peut nécessiter plus de 24 heures et risque d'échauffer votre réseau électrique.
        </p>
        <p>
            Avec une borne de recharge murale (Wallbox) installée par nos experts IRVE à ${city}, vous divisez votre temps de charge par trois (${brand.chargeTime} en moyenne) et bénéficiez du tarif avantageux des heures creuses. Notre prestation clé en main inclut le passage de câble, la mise en service et la validation Consuel.
        </p>`,

        `<p class="mb-4">
            Optimisez l'autonomie et la recharge de votre <strong>${brand.name}</strong> à <strong>${city}</strong> grâce à une borne de recharge sur mesure. Que votre véhicule soit équipé d'un chargeur embarqué monophasé 7.4 kW ou triphasé 11/22 kW, notre réseau d'artisans IRVE conçoit une installation parfaitement calibrée.
        </p>
        <p>
            Nous intervenons en maison individuelle (garage, allée extérieure) ainsi qu'en copropriété (procédure Droit à la Prise). Profitez des aides de l'État pour financer votre projet à ${city} : crédit d'impôt de 500 €, TVA réduite à 5,5 % et prime ADVENIR.
        </p>`
    ];

    const localAdviceVariants = [
        {
            title: `Installation sur-mesure pour ${brand.name} à ${city}`,
            content: `À ${city}, nos techniciens adaptent la pose selon votre type de logement. En maison individuelle, nous installons des bornes étanches IP54/IK10 résistantes aux intempéries. En copropriété, nous prenons en charge la convention avec le syndic pour raccorder votre place de parking au tableau des services généraux.`
        },
        {
            title: `Sécurité électrique et puissance souscrite à ${city}`,
            content: `Pour alimenter votre ${brand.name} à ${city}, nous effectuons un contrôle de la terre (NF C 15-100) et installons une protection dédiée avec disjoncteur et différentiel ${brand.technicalSpecs.protection}. Un module de délestage dynamique module la charge en temps réel selon la consommation de votre foyer.`
        },
        {
            title: `Accompagnement administratif et subventions à ${city}`,
            content: `En faisant appel à un électricien IRVE agréé à ${city}, votre installation de borne ${brand.name} est éligible au crédit d'impôt forfaitaire de 500 € par point de charge. Nous fournissons la facture acquittée avec mention RGE/IRVE et gérons les dossiers d'aides locales.`
        }
    ];

    const chargingTable = [
        {
            power: "Prise Renforcée (3.7 kW)",
            time: "14h à 18h",
            current: "Monophasé 16A",
            usage: "Recharge d'appoint pour petits trajets quotidiens"
        },
        {
            power: "Borne Standard (7.4 kW)",
            time: "6h à 8h",
            current: "Monophasé 32A",
            usage: "La solution recommandée pour 90% des maisons à " + city
        },
        {
            power: `Borne Rapide (${brand.maxPower.split(' ')[0] || '11 kW'})`,
            time: brand.chargeTime,
            current: "Triphasé 16A / 32A",
            usage: "Recharge accélérée pour gros rouleurs et flottes"
        }
    ];

    const faqs = [
        {
            question: `Quel est le temps de recharge moyen pour une ${brand.name} à domicile à ${city} ?`,
            answer: `Sur une borne 7.4 kW installée à votre domicile à ${city}, la recharge complète d'une ${brand.name} (${modelsList}) prend environ 6 à 8 heures (par exemple pendant la nuit en heures creuses). Sur une borne triphasée 11 kW ou 22 kW, ce délai tombe à ${brand.chargeTime}.`
        },
        {
            question: `Quelle puissance de borne choisir pour ma ${brand.name} à ${city} ?`,
            answer: `Pour la plupart des modèles ${brand.name}, une borne de 7.4 kW en monophasé (32A) est le compromis idéal entre vitesse de charge et coût d'abonnement électrique. Si vous disposez déjà d'un compteur triphasé à ${city}, une borne 11 kW ou 22 kW permet d'exploiter la puissance maximale du véhicule.`
        },
        {
            question: `Quelles sont les aides pour installer une borne ${brand.name} à ${city} ?`,
            answer: `Vous bénéficiez d'un crédit d'impôt de 500 € par borne (sans condition de revenus), d'un taux de TVA réduit à 5,5 %, et d'une prime ADVENIR allant jusqu'à 960 € si vous résidez en copropriété à ${city}.`
        }
    ];

    return {
        meta_title: `Installateur Borne ${brand.name} à ${city}${postal} | Devis IRVE Gratuit`,
        meta_description: `Installation certifiée IRVE de bornes de recharge pour ${brand.name} (${modelsList}) à ${city}. ${brand.chargeTime} de charge. Devis gratuit sous 24h, crédit d'impôt 500€.`,
        hero_title: `Installation Borne ${brand.name} à ${city}`,
        hero_badge: `Installateurs Certifiés IRVE • ${city}`,
        intro_html: introVariants[hash % introVariants.length],
        battery_charging_table: chargingTable,
        local_advice: localAdviceVariants[hash % localAdviceVariants.length],
        faqs
    };
}
