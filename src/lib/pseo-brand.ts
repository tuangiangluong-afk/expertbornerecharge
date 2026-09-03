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
    const dept = site?.department || '';
    const modelsList = brand.models.slice(0, 3).join(', ');

    const introVariants = [
        `<p class="mb-4">
            Vous êtes propriétaire d'un véhicule électrique <strong>${brand.name}</strong> (${modelsList}) à <strong>${city}${postal}</strong> ?
            Pour préserver la chimie de votre batterie lithium-ion (NMC ou LFP) et sécuriser votre installation domestique, la pose d'une borne murale <strong>certifiée IRVE</strong> est incontournable.
            Conformément au <strong>décret n° 2017-26</strong> et à la <strong>norme NF C 15-100 section 722</strong>, toute borne de recharge d'une puissance supérieure à 3,7 kW doit être raccordée sur un circuit dédié avec protection différentielle Type F / Type B.
        </p>
        <p>
            Nos électriciens qualifiés interviennent à ${city} et dans le ${dept} pour analyser votre tableau électrique (monophasé 6/9/12 kVA ou triphasé), installer un délestage dynamique asservi au compteur Linky (TIC) et configurer la puissance de charge maximale (${brand.maxPower}) sans risque de disjonction générale.
        </p>`,

        `<p class="mb-4">
            Rouler en <strong>${brand.name}</strong> à <strong>${city}</strong> offre un confort de conduite exceptionnel. Cependant, recharger sur une prise domestique standard peut nécessiter plus de 24 heures et risque d'échauffer votre réseau électrique.
        </p>
        <p>
            Avec une borne de recharge murale (Wallbox) 7,4 kW ou 11 kW installée par nos experts IRVE à ${city}, vous divisez votre temps de charge par trois (${brand.chargeTime} en moyenne) et bénéficiez du tarif avantageux des heures creuses Enedis. Notre prestation clé en main inclut le tirage de ligne en câble R2V 3G10mm², la mise en service et la validation Consuel.
        </p>`,

        `<p class="mb-4">
            Optimisez l'autonomie et la recharge de votre <strong>${brand.name}</strong> à <strong>${city}</strong> grâce à une borne intelligente sur mesure. Que votre véhicule soit équipé d'un chargeur embarqué monophasé 7.4 kW ou triphasé 11/22 kW, notre réseau d'artisans IRVE conçoit une installation parfaitement calibrée.
        </p>
        <p>
            Nous intervenons en maison individuelle (garage, allée extérieure étanche IP54/IK10) ainsi qu'en copropriété (procédure Droit à la Prise décret 2020-1720). Profitez des aides de l'État pour financer votre projet à ${city} : crédit d'impôt de 500 €, TVA réduite à 5,5 % et prime ADVENIR jusqu'à 960 €.
        </p>`
    ];

    const localAdviceVariants = [
        {
            title: `Installation sur-mesure pour ${brand.name} à ${city}`,
            content: `À ${city}, nos électriciens certifiés IRVE adaptent la pose selon votre typologie de logement. En maison individuelle, nous fixons une borne étanche IP54/IK10 sur socle ou mur avec passage de câble enterré sous gaine TPC rouge. En copropriété, nous prenons en charge la convention technique avec le syndic pour raccorder votre place de parking privative en toute légalité.`
        },
        {
            title: `Sécurité électrique et puissance souscrite à ${city}`,
            content: `Pour alimenter votre ${brand.name} à ${city}, nous vérifions la résistance de votre prise de terre (&lt; 100 ohms selon NF C 15-100) et posons une protection dédiée : disjoncteur courbe C 40A et interrupteur différentiel 30mA haute immunité (${brand.technicalSpecs.protection}). Le délestage dynamique adapte instantanément la charge selon vos appareils ménagers en marche.`
        },
        {
            title: `Accompagnement administratif et subventions à ${city}`,
            content: `En confiant votre installation ${brand.name} à un technicien agréé Qualifelec IRVE à ${city}, vous bénéficiez du crédit d'impôt forfaitaire de 500 € par borne (sans condition de ressources) et de la TVA réduite à 5,5%. Nous établissons la facture acquittée avec attestation de conformité pour déclencher vos remboursements.`
        }
    ];

    const chargingTable = [
        {
            power: "Prise Renforcée Green'up (3.7 kW)",
            time: "14h à 18h",
            current: "Monophasé 16A",
            usage: "Recharge d'appoint pour petits trajets quotidiens (&lt; 50 km/jour)"
        },
        {
            power: "Borne Murale Standard (7.4 kW)",
            time: "6h à 8h",
            current: "Monophasé 32A",
            usage: "La solution recommandée pour 90% des maisons à " + city + " (nuit complète)"
        },
        {
            power: `Borne Rapide (${brand.maxPower.split(' ')[0] || '11 kW'})`,
            time: brand.chargeTime,
            current: "Triphasé 16A / 32A",
            usage: "Recharge accélérée pour gros rouleurs, flottes professionnelles et SUV électriques"
        }
    ];

    const faqs = [
        {
            question: `Quel est le temps de recharge moyen pour une ${brand.name} à domicile à ${city} ?`,
            answer: `Sur une borne 7.4 kW installée à votre domicile à ${city}, la recharge complète d'une ${brand.name} (${modelsList}) prend environ 6 à 8 heures (pendant la nuit en heures creuses). Sur une borne triphasée 11 kW ou 22 kW, ce délai tombe à ${brand.chargeTime}.`
        },
        {
            question: `Quelle puissance de borne choisir pour ma ${brand.name} à ${city} ?`,
            answer: `Pour la plupart des modèles ${brand.name}, une borne de 7.4 kW en monophasé (32A) est le compromis idéal entre vitesse de charge et coût d'abonnement électrique Enedis. Si vous disposez déjà d'un compteur triphasé à ${city}, une borne 11 kW permet d'exploiter la puissance maximale du chargeur embarqué sans surcoût.`
        },
        {
            question: `L'attestation Consuel ou qualification IRVE est-elle obligatoire à ${city} ?`,
            answer: `Oui. Conformément à la législation française (décret 2017-26), toute borne de recharge d'une puissance supérieure à 3,7 kW doit obligatoirement être installée par un professionnel certifié IRVE. Sans cette mention sur votre facture, les assurances refusent la prise en charge en cas de sinistre et le crédit d'impôt de 500 € est rejeté par le fisc.`
        },
        {
            question: `Quelles sont les aides financières disponibles à ${city} (${dept}) ?`,
            answer: `Pour financer votre borne ${brand.name} à ${city}, vous cumulez le crédit d'impôt de 500 € (accessible aux propriétaires et locataires), le taux de TVA réduit à 5,5%, ainsi que la prime ADVENIR allant jusqu'à 960 € si vous résidez en copropriété.`
        }
    ];

    return {
        meta_title: `Installateur Borne ${brand.name} à ${city}${postal} | Devis IRVE Gratuit 24h`,
        meta_description: `Installation certifiée IRVE de bornes de recharge pour ${brand.name} (${modelsList}) à ${city}. Charge ${brand.chargeTime}, délestage Linky, crédit d'impôt 500€. Devis gratuit sous 24h.`,
        hero_title: `Installation Borne ${brand.name} à ${city}`,
        hero_badge: `Installateurs Certifiés IRVE • ${city}`,
        intro_html: introVariants[hash % introVariants.length],
        battery_charging_table: chargingTable,
        local_advice: localAdviceVariants[hash % localAdviceVariants.length],
        faqs
    };
}
