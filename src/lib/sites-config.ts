import { slugify } from "@/lib/slugify";
/**
 * IRVE Multi-Domain Site Configuration
 * 
 * Maps domains to city-specific configurations for the "Empire IRVE" network.
 * One codebase, 50 domains, targeting €50/lead high-ticket conversions.
 */

export interface SiteConfig {
    // Identification
    slug: string;
    domain: string;
    aliases?: string[];

    // Location
    city: string;
    postalCode: string;
    department: string;
    region: string;

    // Business
    name: string;
    phoneNumber: string;
    email: string;

    // Target Priority
    targetType: 'COPRO' | 'MAISON' | 'ENTREPRISE' | 'MIXED';
    priceRange: 'STANDARD' | 'PREMIUM' | 'LUXE';

    // Theme: 'premium' = Dark/Tech (Vaisseau Mère), 'trust' = Light/Institutionnel (Sites Locaux)
    theme: 'premium' | 'trust';

    // Content
    heroImage: string;
    description: string;
    meta: {
        title: string;
        description: string;
    };

    // Trust Signals
    certifications: string[];
    aidesDisponibles: string[];

    // SEO
    features: string[];
    localKeywords: string[];

    // Points of Interest (for internal linking)
    quartiers: string[];
    coproprietes: string[];
    centresCommerciaux: string[];

    // Analytics
    ga_id?: string;
    gtm_id?: string;

    // Geo-Spatial (Deep Mesh)
    coordinates?: {
        lat: number;
        lng: number;
    };
}

// ============================================
// TEMPLATE CONFIGS
// ============================================

const TEMPLATE_CERTIFICATIONS = [
    "Qualifelec IRVE",
    "RGE",
    "Advenir",
    "Assurance décennale"
];

const TEMPLATE_AIDES = [
    "Prime ADVENIR (Copropriété)",
    "Crédit d'Impôt 500€",
    "TVA Réduite 5.5%"
];

const TEMPLATE_FEATURES = [
    "Devis gratuit en 24h",
    "Installation en 48h",
    "Garantie 2 ans",
    "SAV 7j/7"
];

// ============================================
// MAIN HUB CONFIG (expertbornerecharge.com)
// ============================================

const _hubConfig: SiteConfig = {
    slug: "home",
    domain: "expertbornerecharge.com",
    city: "France",
    postalCode: "",
    department: "",
    region: "National",
    name: "Expert Borne Recharge",
    phoneNumber: "01 84 80 00 00",
    email: "contact@expertbornerecharge.com",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'premium', // Vaisseau Mère = Dark/Tech
    heroImage: "/images/generated/modern-home.png",
    description: "Le réseau n°1 d'installateurs de bornes de recharge en France. Devis gratuit, installation rapide, certifié Qualifelec IRVE.",
    meta: {
        title: "Expert Borne Recharge | Installation Borne de Recharge France",
        description: "Installation de bornes de recharge pour véhicules électriques partout en France. Devis gratuit en 24h. Certifié Qualifelec IRVE & Advenir. Jusqu'à 960€ d'aides."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: [
        "installation borne de recharge",
        "borne recharge maison",
        "borne recharge copropriété",
        "installateur IRVE",
        "borne électrique domicile"
    ],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    coordinates: { lat: 46.2276, lng: 2.2137 } // Centre France
};

// ============================================
// SATELLITE CITY CONFIGS (TOP 20 SNIPERS)
// ============================================

// 1. Paris (Volume)
const _parisConfig: SiteConfig = {
    slug: "paris",
    domain: "bornerechargeparis.fr",
    aliases: ["borne-recharge-paris.fr"],
    city: "Paris",
    postalCode: "75000",
    department: "75",
    region: "Île-de-France",
    name: "Borne Recharge Paris",
    phoneNumber: "01 84 80 75 00",
    email: "paris@expertbornerecharge.com",
    targetType: 'COPRO',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "/images/generated/city-street.png",
    description: "Installation borne de recharge Paris. Expert copropriété et parking souterrain.",
    meta: {
        title: "Installation Borne de Recharge Paris | Devis Gratuit Copropriété",
        description: "Installateur IRVE Paris. Spécialiste bornes de recharge en copropriété et parking souterrain. Prime ADVENIR. Devis 24h."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: [...TEMPLATE_AIDES, "Aide Mairie de Paris"],
    features: [...TEMPLATE_FEATURES, "Expert Copropriétés Ancien", "Syndic Partenaire"],
    localKeywords: ["borne recharge paris", "installation borne paris", "copropriété paris", "parking électrique paris"],
    quartiers: ["Marais", "Bastille", "Montmartre", "Champs-Elysées"],
    coproprietes: ["Haussmannien", "Résidences 70s"],
    centresCommerciaux: [],
    ga_id: "G-00EBCXCPYG",
    coordinates: { lat: 48.8566, lng: 2.3522 }
};

// 2. Neuilly-sur-Seine (Luxe)
const _neuillyConfig: SiteConfig = {
    slug: "neuilly-sur-seine",
    domain: "bornerechargeneuilly.fr",
    aliases: ["borne-recharge-neuilly.fr"],
    city: "Neuilly-sur-Seine",
    postalCode: "92200",
    department: "92",
    region: "Île-de-France",
    name: "Borne Recharge Neuilly",
    phoneNumber: "01 84 80 92 00",
    email: "neuilly@expertbornerecharge.com",
    targetType: 'MAISON',
    priceRange: 'LUXE',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1594535182308-8ff240fde6a6?q=80&w=2865&auto=format&fit=crop", // Porsche Taycan Charging vibe
    description: "Installation borne de recharge Neuilly-sur-Seine. Service premium.",
    meta: {
        title: "Borne de Recharge Neuilly-sur-Seine | Installation Premium",
        description: "Installation borne de recharge Neuilly. Service discret et premium pour particuliers et flottes. Tesla, Porsche. Devis sur mesure."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Installation Discrète", "Marques Premium", "SAV Prioritaire"],
    localKeywords: ["borne recharge neuilly", "installateur 92", "borne tesla neuilly"],
    quartiers: ["Sablons", "Saint-James", "Bagatelle", "Pont de Neuilly"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-288041ZWT2",
    coordinates: { lat: 48.8846, lng: 2.2688 }
};

// 3. Lyon (Capitale Province)
const _lyonConfig: SiteConfig = {
    slug: "lyon",
    domain: "bornerechargelyon.fr",
    aliases: ["borne-recharge-lyon.fr"],
    city: "Lyon",
    postalCode: "69000",
    department: "69",
    region: "Auvergne-Rhône-Alpes",
    name: "Borne Recharge Lyon",
    phoneNumber: "04 84 80 69 00",
    email: "lyon@expertbornerecharge.com",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1629816677935-716447c23bc4?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne de recharge à Lyon et région Rhône.",
    meta: {
        title: "Installation Borne de Recharge Lyon | Installateur IRVE 69",
        description: "Votre borne de recharge à Lyon. Installation domicile et entreprise. Devis gratuit en 24h. Certifié Qualifelec."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["borne recharge lyon", "installateur borne 69", "irve lyon"],
    quartiers: ["Presqu'île", "Part-Dieu", "Confluence", "Croix-Rousse"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-CCE7KCSVJZ",
    coordinates: { lat: 45.7640, lng: 4.8357 }
};

// 4. Boulogne-Billancourt (Roi de la Copro)
const _boulogneConfig: SiteConfig = {
    slug: "boulogne-billancourt",
    domain: "bornerechargeboulogne.fr",
    city: "Boulogne-Billancourt",
    postalCode: "92100",
    department: "92",
    region: "Île-de-France",
    name: "Borne Recharge Boulogne",
    phoneNumber: "01 84 80 92 10",
    email: "boulogne@expertbornerecharge.com",
    targetType: 'COPRO',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1565514020176-857de743ebc9?q=80&w=2940&auto=format&fit=crop",
    description: "Spécialiste borne de recharge Boulogne-Billancourt.",
    meta: {
        title: "Installation Borne de Recharge Boulogne-Billancourt",
        description: "Expert installation borne Boulogne. Spécialiste copropriétés et parkings. Devis gratuit syndic et particuliers."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Spécialiste Copro", "Gestion Syndic"],
    localKeywords: ["borne recharge boulogne", "copropriété boulogne", "syndic 92"],
    quartiers: ["Point-du-Jour", "Silly-Gallieni", "Centre-Ville"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-PRTNVL73RE",
    coordinates: { lat: 48.8397, lng: 2.2426 }
};

// 5. Bordeaux (Bobos Riches)
const _bordeauxConfig: SiteConfig = {
    slug: "bordeaux",
    domain: "bornerechargebordeaux.fr",
    city: "Bordeaux",
    postalCode: "33000",
    department: "33",
    region: "Nouvelle-Aquitaine",
    name: "Borne Recharge Bordeaux",
    phoneNumber: "05 57 80 33 00",
    email: "bordeaux@expertbornerecharge.com",
    targetType: 'MAISON',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne électrique Bordeaux et Gironde.",
    meta: {
        title: "Installation Borne de Recharge Bordeaux | Expert 33",
        description: "Installateur borne recharge Bordeaux. Échoppes et maisons individuelles. Devis gratuit. Certifié IRVE."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["borne recharge bordeaux", "installation borne 33", "wallbox bordeaux"],
    quartiers: ["Chartrons", "Saint-Michel", "Caudéran"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-QR6VYF1LM5",
    coordinates: { lat: 44.8378, lng: -0.5792 }
};

// 6. Toulouse (Aéronautique)
const _toulouseConfig: SiteConfig = {
    slug: "toulouse",
    domain: "bornerechargetoulouse.fr",
    city: "Toulouse",
    postalCode: "31000",
    department: "31",
    region: "Occitanie",
    name: "Borne Recharge Toulouse",
    phoneNumber: "05 34 80 31 00",
    email: "toulouse@expertbornerecharge.com",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1549241517-385d883cb0d0?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne de recharge Toulouse.",
    meta: {
        title: "Installation Borne de Recharge Toulouse | Devis Gratuit",
        description: "Installateur borne recharge Toulouse. Particuliers et entreprises (Airbus, Thales...). Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["borne recharge toulouse", "installation borne 31"],
    quartiers: ["Capitole", "Minimes", "Saint-Cyprien"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-4G7LZYW8ZF"
};

// 7. Annecy (Frontaliers Suisses - Cash) - Remplacement Toulouse #2
const _annecyConfig: SiteConfig = {
    slug: "annecy",
    domain: "bornerechargeannecy.fr",
    city: "Annecy",
    postalCode: "74000",
    department: "74",
    region: "Auvergne-Rhône-Alpes",
    name: "Borne Recharge Annecy",
    phoneNumber: "04 50 80 74 00",
    email: "annecy@expertbornerecharge.com",
    targetType: 'MAISON',
    priceRange: 'LUXE',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1548777123-e216912df7d8?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne recharge Annecy et Haute-Savoie.",
    meta: {
        title: "Borne de Recharge Annecy | Installation Haute-Savoie",
        description: "Installation de bornes électriques à Annecy. Service premium pour frontaliers. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Installation Premium", "Frontaliers"],
    localKeywords: ["borne recharge annecy", "installateur 74", "geneve"],
    quartiers: ["Veyrier", "Annecy-le-Vieux"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-XCX2S9LBJB",
    coordinates: { lat: 45.8992, lng: 6.1294 }
};

// 8. Saint-Germain-en-Laye (78 Riche) - Remplacement Toulouse #3
const _stgermainConfig: SiteConfig = {
    slug: "saint-germain-en-laye",
    domain: "bornerechargestgermain.fr",
    city: "Saint-Germain-en-Laye",
    postalCode: "78100",
    department: "78",
    region: "Île-de-France",
    name: "Borne Recharge St-Germain",
    phoneNumber: "01 30 80 78 00",
    email: "stgermain@expertbornerecharge.com",
    targetType: 'MAISON',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1563720743-7f215d2e7d77?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne recharge Saint-Germain-en-Laye.",
    meta: {
        title: "Borne de Recharge Saint-Germain-en-Laye | 78",
        description: "Installation borne recharge Saint-Germain et Yvelines. Particuliers et villas. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Maisons Individuelles", "Villas"],
    localKeywords: ["borne recharge saint germain", "installateur 78"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-1VS7642FBL"
};

// 9. Nice (PACA Luxe)
const _niceConfig: SiteConfig = {
    slug: "nice",
    domain: "bornerechargenice.fr",
    city: "Nice",
    postalCode: "06000",
    department: "06",
    region: "Provence-Alpes-Côte d'Azur",
    name: "Borne Recharge Nice",
    phoneNumber: "04 93 80 06 00",
    email: "nice@expertbornerecharge.com",
    targetType: 'MIXED',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1533512930330-4ac257c86793?q=80&w=2940&auto=format&fit=crop",
    description: "Installation de bornes à Nice et Côte d'Azur.",
    meta: {
        title: "Installation Borne de Recharge Nice | Côte d'Azur",
        description: "Installateur IRVE Nice. Devis gratuit pour particuliers et copropriétés niçoises."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["borne recharge nice", "installateur 06"],
    quartiers: ["Promenade", "Cimiez", "Mont Boron"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-EVVGL6MRJQ",
    coordinates: { lat: 43.7102, lng: 7.2620 }
};

// 10. Nantes (Maisons individuelles)
const _nantesConfig: SiteConfig = {
    slug: "nantes",
    domain: "bornerechargenantes.fr",
    city: "Nantes",
    postalCode: "44000",
    department: "44",
    region: "Pays de la Loire",
    name: "Borne Recharge Nantes",
    phoneNumber: "02 40 80 44 00",
    email: "nantes@expertbornerecharge.com",
    targetType: 'MAISON',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1572273614138-0382343a411e?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne recharge Nantes.",
    meta: {
        title: "Installation Borne de Recharge Nantes | Loire-Atlantique",
        description: "Votre borne électrique à Nantes. Spécialiste maison individuelle. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["borne recharge nantes", "installateur 44"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-G6Y4NQ5XBY",
    coordinates: { lat: 47.2184, lng: -1.5536 }
};

// 11. Aix-en-Provence (PACA Luxe)
const _aixConfig: SiteConfig = {
    slug: "aix-en-provence",
    domain: "bornerechargeaix.fr",
    city: "Aix-en-Provence",
    postalCode: "13100",
    department: "13",
    region: "Provence-Alpes-Côte d'Azur",
    name: "Borne Recharge Aix",
    phoneNumber: "04 42 80 13 00",
    email: "aix@expertbornerecharge.com",
    targetType: 'MAISON',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1596323605664-558c490bc89c?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne recharge Aix-en-Provence.",
    meta: {
        title: "Borne de Recharge Aix-en-Provence | Installation",
        description: "Installation de bornes à Aix-en-Provence. Villas et résidences. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Villas", "Piscine"],
    localKeywords: ["borne recharge aix", "installateur 13"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-CDB4C36VM6",
    coordinates: { lat: 43.5297, lng: 5.4474 }
};

// 12. Strasbourg (L'Est riche)
const _strasbourgConfig: SiteConfig = {
    slug: "strasbourg",
    domain: "bornerechargestrasbourg.fr",
    city: "Strasbourg",
    postalCode: "67000",
    department: "67",
    region: "Grand Est",
    name: "Borne Recharge Strasbourg",
    phoneNumber: "03 88 80 67 00",
    email: "strasbourg@expertbornerecharge.com",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1568225556276-888e7d8d2146?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne recharge Strasbourg.",
    meta: {
        title: "Installation Borne de Recharge Strasbourg | Alsace",
        description: "Installateur IRVE Strasbourg. Spécialiste Grand Est. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["borne recharge strasbourg", "installateur 67"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-M2LGC1MP16"
};

// 13. Lille (Le Nord riche)
const _lilleConfig: SiteConfig = {
    slug: "lille",
    domain: "bornerechargelille.fr",
    city: "Lille",
    postalCode: "59000",
    department: "59",
    region: "Hauts-de-France",
    name: "Borne Recharge Lille",
    phoneNumber: "03 20 80 59 00",
    email: "lille@expertbornerecharge.com",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1502484214532-6a84ebfa21ec?q=80&w=2940&auto=format&fit=crop", // Lille Architecture
    description: "Installation borne recharge Lille et métropole.",
    meta: {
        title: "Installation Borne de Recharge Lille | Nord",
        description: "Votre borne électrique à Lille, Marcq-en-Barœul, Bondues. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Métropole Lilloise", "Frontaliers Belges"],
    localKeywords: ["borne recharge lille", "installateur 59"],
    quartiers: ["Vieux-Lille"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-GJ9TKQNC9S",
    coordinates: { lat: 50.6292, lng: 3.0573 }
};

// 14. Montpellier (Croissance)
const _montpellierConfig: SiteConfig = {
    slug: "montpellier",
    domain: "bornerechargemontpellier.fr",
    city: "Montpellier",
    postalCode: "34000",
    department: "34",
    region: "Occitanie",
    name: "Borne Recharge Montpellier",
    phoneNumber: "04 67 80 34 00",
    email: "montpellier@expertbornerecharge.com",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1563294379-cb2563d72221?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne recharge Montpellier.",
    meta: {
        title: "Installation Borne de Recharge Montpellier | Hérault",
        description: "Installateur borne recharge Montpellier. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["borne recharge montpellier", "installateur 34"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-HJ5E9K54C6"
};

// 15. Versailles (Patrimoine)
const _versaillesConfig: SiteConfig = {
    slug: "versailles",
    domain: "bornerechargeversailles.fr",
    city: "Versailles",
    postalCode: "78000",
    department: "78",
    region: "Île-de-France",
    name: "Borne Recharge Versailles",
    phoneNumber: "01 39 80 78 00",
    email: "versailles@expertbornerecharge.com",
    targetType: 'COPRO',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1549272658-95493c048704?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne recharge Versailles.",
    meta: {
        title: "Installation Borne de Recharge Versailles | 78",
        description: "Expert installation borne Versailles. Spécialiste copropriétés historiques. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Copropriétés Historiques"],
    localKeywords: ["borne recharge versailles", "installateur 78"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-1LDSBWTLCG"
};

// 16. Saint-Maur-des-Fossés (Volume Maison)
const _stmaurConfig: SiteConfig = {
    slug: "saint-maur-des-fosses",
    domain: "bornerechargestmaur.fr",
    city: "Saint-Maur-des-Fossés",
    postalCode: "94100",
    department: "94",
    region: "Île-de-France",
    name: "Borne Recharge St-Maur",
    phoneNumber: "01 42 80 94 00",
    email: "stmaur@expertbornerecharge.com",
    targetType: 'MAISON',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2940&auto=format&fit=crop", // Suburb House
    description: "Installation borne recharge Saint-Maur-des-Fossés.",
    meta: {
        title: "Borne de Recharge Saint-Maur-des-Fossés | 94",
        description: "Installation borne recharge Saint-Maur. Spécialiste pavillons. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Maisons Individuelles"],
    localKeywords: ["borne recharge saint maur", "installateur 94"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-GBZH52JQ6H"
};

// 17. Levallois (Business + Copro)
const _levalloisConfig: SiteConfig = {
    slug: "levallois-perret",
    domain: "bornerechargelevallois.fr",
    city: "Levallois-Perret",
    postalCode: "92300",
    department: "92",
    region: "Île-de-France",
    name: "Borne Recharge Levallois",
    phoneNumber: "01 47 80 92 00",
    email: "levallois@expertbornerecharge.com",
    targetType: 'COPRO',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop", // Modern buildings
    description: "Installation borne recharge Levallois-Perret.",
    meta: {
        title: "Installation Borne de Recharge Levallois-Perret",
        description: "Installateur borne Levallois. Copropriétés et entreprises. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Entreprises", "Flottes"],
    localKeywords: ["borne recharge levallois", "installateur 92"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-P230GJZZ4G"
};

// 18. Rennes
const _rennesConfig: SiteConfig = {
    slug: "rennes",
    domain: "bornerechargerennes.fr",
    city: "Rennes",
    postalCode: "35000",
    department: "35",
    region: "Bretagne",
    name: "Borne Recharge Rennes",
    phoneNumber: "02 99 80 35 00",
    email: "rennes@expertbornerecharge.com",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne recharge Rennes.",
    meta: {
        title: "Installation Borne de Recharge Rennes | Bretagne",
        description: "Installateur borne électrique Rennes. Devis gratuit 24h."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["borne recharge rennes", "installateur 35"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-3ZD47BWJN0"
};

// 19. Cannes (Résidences secondaires)
const _cannesConfig: SiteConfig = {
    slug: "cannes",
    domain: "bornerechargecannes.fr",
    city: "Cannes",
    postalCode: "06400",
    department: "06",
    region: "Provence-Alpes-Côte d'Azur",
    name: "Borne Recharge Cannes",
    phoneNumber: "04 93 80 06 40",
    email: "cannes@expertbornerecharge.com",
    targetType: 'COPRO',
    priceRange: 'LUXE',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1545622080-60b545d19ec6?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne recharge Cannes.",
    meta: {
        title: "Borne de Recharge Cannes | Installation Luxe",
        description: "Installateur borne recharge Cannes. Résidences secondaires et villas. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Résidences Secondaires", "Conciergeries"],
    localKeywords: ["borne recharge cannes", "installateur 06"],
    quartiers: ["La Croisette", "Californie"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-GMX71FCL9E",
    coordinates: { lat: 43.5528, lng: 7.0174 }
};

// 20. Biarritz (Le 16ème sur la plage)
const _biarritzConfig: SiteConfig = {
    slug: "biarritz",
    domain: "bornerechargebiarritz.fr",
    city: "Biarritz",
    postalCode: "64200",
    department: "64",
    region: "Nouvelle-Aquitaine",
    name: "Borne Recharge Biarritz",
    phoneNumber: "05 59 80 64 00",
    email: "biarritz@expertbornerecharge.com",
    targetType: 'MAISON',
    priceRange: 'LUXE',
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1579489569080-87a30349312c?q=80&w=2940&auto=format&fit=crop",
    description: "Installation borne recharge Biarritz.",
    meta: {
        title: "Borne de Recharge Biarritz | Pays Basque",
        description: "Installation borne recharge Biarritz. Service premium Pays Basque. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Villas", "Surf & Recharge"],
    localKeywords: ["borne recharge biarritz", "installateur 64"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-3GHBT5VLHW",
    coordinates: { lat: 43.4832, lng: -1.5586 }
};

// 21. Marseille (Le Sud + Solaire + Carport)
const _marseilleConfig: SiteConfig = {
    slug: "marseille",
    domain: "bornerechargemarseille.fr",
    city: "Marseille",
    postalCode: "13000",
    department: "13",
    region: "Provence-Alpes-Côte d'Azur",
    name: "Borne Recharge Marseille",
    phoneNumber: "04 91 80 13 00",
    email: "marseille@expertbornerecharge.com",
    targetType: 'MAISON', // On vise les villas et le Solaire
    priceRange: 'PREMIUM', // On monte en gamme pour l'upsell Solaire
    theme: 'trust',
    heroImage: "https://images.unsplash.com/photo-1559441142-e1d51a665243?q=80&w=2940&auto=format&fit=crop", // Vieux Port ou Calanques
    description: "Installation borne de recharge et Carport Solaire à Marseille, Cassis, Carry. Roulez gratuit au soleil.",
    meta: {
        title: "Installation Borne Recharge & Carport Solaire Marseille | 13",
        description: "Expert Borne & Solaire Marseille. Transformez votre parking en centrale verte. Spécialiste Villas 8ème, Cassis, Carry. Devis Carport Solaire."
    },
    certifications: [...TEMPLATE_CERTIFICATIONS, "Expert Solaire", "RGE QualiPV"],
    aidesDisponibles: [...TEMPLATE_AIDES, "Aide Département 13"],
    features: ["Carport Solaire (Upsell)", "Ombrières Photovoltaïques", "Villas & Piscines", "Installation Extérieure"],
    localKeywords: ["borne recharge marseille", "carport solaire marseille", "borne solaire 13", "cassis borne recharge", "carry le rouet"],
    quartiers: ["Le Prado", "Périer", "Roucas-Blanc", "La Corniche", "Cassis", "Carry-le-Rouet"], // La Ceinture Dorée
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-TY9Z3692S5"
};

// ============================================
// CITIES REGISTRY
// ============================================

export const SITES: Record<string, SiteConfig> = {
    // Main Hub
    "expertbornerecharge.com": _hubConfig,
    "www.expertbornerecharge.com": _hubConfig,
    "home": _hubConfig,

    // 1. Paris
    "bornerechargeparis.fr": _parisConfig,
    "www.bornerechargeparis.fr": _parisConfig,
    "paris": _parisConfig,

    "bornerechargeneuilly.fr": _neuillyConfig,
    "www.bornerechargeneuilly.fr": _neuillyConfig,
    "neuilly-sur-seine": _neuillyConfig,
    "neuilly": _neuillyConfig,

    // 3. Lyon
    "bornerechargelyon.fr": _lyonConfig,
    "www.bornerechargelyon.fr": _lyonConfig,
    "lyon": _lyonConfig,

    "bornerechargeboulogne.fr": _boulogneConfig,
    "boulogne-billancourt": _boulogneConfig,
    "boulogne": _boulogneConfig,

    // 5. Bordeaux
    "bornerechargebordeaux.fr": _bordeauxConfig,
    "bordeaux": _bordeauxConfig,

    // 6. Toulouse
    "bornerechargetoulouse.fr": _toulouseConfig,
    "toulouse": _toulouseConfig,

    // 7. Annecy
    "bornerechargeannecy.fr": _annecyConfig,
    "annecy": _annecyConfig,

    "bornerechargestgermain.fr": _stgermainConfig,
    "saint-germain-en-laye": _stgermainConfig,
    "saint-germain": _stgermainConfig,
    "st-germain": _stgermainConfig,

    // 9. Nice
    "bornerechargenice.fr": _niceConfig,
    "nice": _niceConfig,

    // 10. Nantes
    "bornerechargenantes.fr": _nantesConfig,
    "nantes": _nantesConfig,

    "bornerechargeaix.fr": _aixConfig,
    "aix-en-provence": _aixConfig,
    "aix": _aixConfig,

    // 12. Strasbourg
    "bornerechargestrasbourg.fr": _strasbourgConfig,
    "strasbourg": _strasbourgConfig,

    // 13. Lille
    "bornerechargelille.fr": _lilleConfig,
    "lille": _lilleConfig,

    // 14. Montpellier
    "bornerechargemontpellier.fr": _montpellierConfig,
    "montpellier": _montpellierConfig,

    // 15. Versailles
    "bornerechargeversailles.fr": _versaillesConfig,
    "versailles": _versaillesConfig,

    "bornerechargestmaur.fr": _stmaurConfig,
    "saint-maur-des-fosses": _stmaurConfig,
    "saint-maur": _stmaurConfig,
    "st-maur": _stmaurConfig,

    "bornerechargelevallois.fr": _levalloisConfig,
    "levallois-perret": _levalloisConfig,
    "levallois": _levalloisConfig,

    // 18. Rennes
    "bornerechargerennes.fr": _rennesConfig,
    "rennes": _rennesConfig,

    // 19. Cannes
    "bornerechargecannes.fr": _cannesConfig,
    "cannes": _cannesConfig,

    // 20. Biarritz
    "bornerechargebiarritz.fr": _biarritzConfig,
    "biarritz": _biarritzConfig,

    // 21. Marseille
    "bornerechargemarseille.fr": _marseilleConfig,
    "bornerechargemarseille": _marseilleConfig,
    "marseille": _marseilleConfig,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get site configuration from hostname or slug
 */
export function getSiteConfig(hostnameOrSlug: string): SiteConfig | null {
    // Normalize hostname
    let hostname = hostnameOrSlug.split(':')[0]; // Remove port
    hostname = hostname.replace(/^www\./, ''); // Remove www

    // First try direct lookup by slug (for localhost routing)
    const bySlug = Object.values(SITES).find(s => s.slug === hostname);
    if (bySlug) return bySlug;

    // DEV: Handle localhost subdomains (e.g., bornerechargeparis.localhost)
    if (hostname.endsWith('.localhost')) {
        const subdomain = hostname.split('.')[0];
        const found = Object.values(SITES).find(s =>
            s.slug === subdomain ||
            s.domain.startsWith(`${subdomain}.`) ||
            s.domain.includes(subdomain)
        );
        if (found) return found;
    }

    // Direct lookup by domain
    if (SITES[hostname]) return SITES[hostname];

    // Fallback: search by domain or alias
    const found = Object.values(SITES).find(s =>
        s.domain === hostname ||
        s.aliases?.includes(hostname)
    );

    return found || null;
}

/**
 * Get site configuration by slug
 */
export function getSiteBySlug(slug: string): SiteConfig | null {
    return Object.values(SITES).find(s => s.slug === slug) || null;
}

/**
 * Get all satellite sites (excluding main hub)
 */
export function getSatelliteSites(): SiteConfig[] {
    return Object.values(SITES).filter(s => s.slug !== 'home');
}

/**
 * Check if hostname is main hub
 */
export function isMainHub(hostname: string): boolean {
    hostname = hostname.split(':')[0].replace(/^www\./, '');
    return (
        hostname === 'expertbornerecharge.com' ||
        hostname.includes('localhost') && !hostname.includes('.localhost') ||
        hostname.includes('.vercel.app') ||
        hostname.includes('192.168.')
    );
}

/**
 * Get default hub configuration
 */
export function getHubConfig(): SiteConfig {
    return _hubConfig;
}

// Le slug public est derive du nom de la commune avec le meme slugify que la
// route /ville/[slug] : les slugs ecrits a la main laissaient tomber les accents
// (« Munchen » -> m-nchen, « Nimes » -> n-mes) et cassaient le maillage, le
// sitemap et les liens internes.
for (const site of Object.values(SITES)) {
    site.slug = slugify(site.city);
}
