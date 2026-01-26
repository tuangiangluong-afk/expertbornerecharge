// Simple seeded random generator
function seededRandom(seed: number) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// String hash function to generate a numerical seed from a string (e.g. city name)
function stringHash(str: string): number {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

export function spin(text: string, seedString: string): string {
    let seed = stringHash(seedString);

    let processed = text;
    let hasSpintax = true;

    while (hasSpintax) {
        const next = processed.replace(/{([^{}]+)}/g, (match, content) => {
            const choices = content.split("|");
            // Use the seed to pick a choice deterministically
            const choiceIndex = Math.floor(seededRandom(seed) * choices.length);
            seed++; // Increment seed for next choice to avoid pattern repetition
            return choices[choiceIndex];
        });

        if (next === processed) {
            hasSpintax = false;
        } else {
            processed = next;
        }
    }

    return processed;
}

export type SpintaxType =
    | "hero_title"
    | "hero_subtitle"
    | "hero_badge"
    | "intro_p1"
    | "services_intro"
    | "cta_primary"
    | "cta_secondary"
    | "meta_title"
    | "meta_description"
    | "review_text_1"
    | "review_text_2"
    | "review_text_3"
    | "review_name_1"
    | "review_name_2"
    | "review_name_3";

export type SpintaxContext = 'HUB' | 'LOCAL';

import type { SiteConfig } from "@/lib/sites-config";
import type { CityConfig } from "@/lib/db";

type BaseConfig = {
    city: string;
    department: string;
    region: string;
};

export function getSpintaxContent(type: SpintaxType, site: BaseConfig | SiteConfig | CityConfig, context: SpintaxContext = 'LOCAL'): string {
    const city = site.city;
    const dept = site.department || ""; // ex: "92"
    const region = site.region || "";   // ex: "Île-de-France"

    const templates: Record<SpintaxType, Record<SpintaxContext, string[]>> = {
        meta_title: {
            HUB: [
                "Les Meilleurs Installateurs IRVE à {city} | Comparatif 2026",
                "Prix Installation Borne Recharge {city} - Comparateur",
                "Trouver un Électricien IRVE à {city} | Devis Gratuits",
                "Top 3 Installateurs Borne de Recharge à {city}"
            ],
            LOCAL: [
                "Installation Borne de Recharge {city} | Expert Local",
                "Votre Électricien IRVE à {city} - Devis en 24h",
                "Pose de Borne Électrique {city} | Certifié Qualifelec",
                "Installateur Agréé Borne de Recharge {city}"
            ]
        },
        meta_description: {
            HUB: [
                "Comparez les devis d'installation de borne à {city}. Recevez 3 offres d'électriciens certifiés IRVE. Économisez sur votre recharge.",
                "Annuaire des installateurs Qualifelec à {city}. Avis, Prix et Aides de l'État. Trouvez le meilleur pro pour votre copropriété."
            ],
            LOCAL: [
                "Intervention rapide à {city} pour votre borne de recharge. Expert local certifié IRVE. Devis gratuit et accompagnement Advenir complet.",
                "Installation de votre Wallbox à {city} sous 48h. Électricien de quartier spécialisé Tesla et Zoé. Garantie 2 ans."
            ]
        },
        hero_title: {
            HUB: [
                "Comparez les <span class=\"spintax-highlight\">Meilleurs Installateurs</span> à {city}",
                "Annuaire des <span class=\"spintax-highlight\">Bornes de Recharge</span> {city}",
                "Trouvez votre Installateur IRVE à <span class=\"spintax-highlight\">{city}</span>",
                "Prix Installation Borne <span class=\"spintax-highlight\">{city}</span>"
            ],
            LOCAL: [
                "Trouvez un Installateur Borne à <span class=\"spintax-highlight\">{city}</span>",
                "Comparateur Installateurs IRVE <span class=\"spintax-highlight\">{city}</span>",
                "Réseau d'Experts Recharge à <span class=\"spintax-highlight\">{city}</span>",
                "Devis Installation Borne sur <span class=\"spintax-highlight\">{city}</span>"
            ]
        },
        hero_subtitle: {
            HUB: [
                "Comparez gratuitement 3 devis d'artisans locaux certifiés. Ne signez pas sans comparer les prix.",
                "Mise en concurrence des meilleurs électriciens de {city}. Service gratuit et sans engagement."
            ],
            LOCAL: [
                "Comparez les meilleurs artisans locaux certifiés IRVE. Devis gratuits sous 24h.",
                "Mise en relation directe avec les installateurs agréés de votre région."
            ]
        },
        hero_badge: {
            HUB: [
                "Comparateur Gratuit",
                "Annuaire IRVE",
                "Offres Multiples"
            ],
            LOCAL: [
                "Réseau National",
                "Comparateur Local",
                "Devis Gratuits"
            ]
        },
        // Fallback or generic content can be duplicated or specialized further
        intro_p1: {
            HUB: [
                "Vous cherchez à installer une borne de recharge à {city} ? Notre plateforme compare pour vous les artisans."
            ],
            LOCAL: [
                "Profitez de notre réseau d'installateurs qualifiés à {city} pour votre projet de recharge.",
                "Sélectionnez le meilleur professionnel IRVE pour votre installation à {city} grâce à notre comparateur."
            ]
        },
        services_intro: {
            HUB: ["Comparez les offres"],
            LOCAL: ["Offres Partenaires"]
        },
        cta_primary: {
            HUB: ["Comparer les devis"],
            LOCAL: ["Comparer 3 devis"]
        },
        cta_secondary: {
            HUB: ["Voir les prix"],
            LOCAL: ["Parler à un conseiller"]
        },
        // Reviews, can be shared or split. Sharing for now to keep volume up.
        review_text_1: {
            HUB: ["J'ai pu comparer 3 devis et choisir le moins cher à {city}."],
            LOCAL: ["Merci pour la mise en relation rapide avec un électricien à {city}."]
        },
        review_text_2: {
            HUB: ["Service de comparaison très utile pour ma copro."],
            LOCAL: ["J'ai trouvé un installateur pro grâce à ce site."]
        },
        review_text_3: {
            HUB: ["Rapide et efficace pour trouver un pro."],
            LOCAL: ["Excellent service pour comparer les prix sur {city}."]
        },
        review_name_1: { HUB: ["Thomas D."], LOCAL: ["Thomas D."] },
        review_name_2: { HUB: ["Lucie F."], LOCAL: ["Lucie F."] },
        review_name_3: { HUB: ["Eric L."], LOCAL: ["Eric L."] }
    };

    // Correctly accessing the nested structure + Fallback
    const contextOptions = templates[type]?.[context];
    const fallbackOptions = templates[type]?.['LOCAL']; // Fallback to local if context missing? Or HUB?

    // Safety check
    const options = (contextOptions && contextOptions.length > 0) ? contextOptions : fallbackOptions;

    // Final safety (should not happen if templates are complete)
    if (!options || options.length === 0) return `[${type}]`;

    let seed = stringHash(city + type + context);
    const chosenTemplate = options[Math.floor(seededRandom(seed) * options.length)];

    let content = chosenTemplate
        .replace(/{city}/g, city)
        .replace(/{dept}/g, dept)
        .replace(/{region}/g, region);

    return spin(content, city + type + content);
}
