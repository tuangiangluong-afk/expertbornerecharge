
export interface CityConfig {
    slug: string;
    domain: string;
    aliases?: string[];
    name: string;
    city: string;
    phoneNumber: string;
    email: string;
    heroImage: string;
    description: string;
    meta: {
        title: string;
        description: string;
    };
    features: string[];
    pricing: {
        base: string;
        description: string;
    };
    // Iceberg Extend
    hospitals: string[];
    stations: string[];
    neighborhoods: string[];
    points_of_interest: {
        hotels: string[];
        nightlife: string[];
        monuments: string[];
        parking_difficulty: string;
    };
    ga_id?: string; // Google Analytics G-XXXXXXXXXX
    gtm_id?: string; // Google Tag Manager GTM-XXXXXX
}

export function getCity(domain: string): CityConfig | null {
    if (CITIES[domain]) return CITIES[domain];

    // Fallback for aliases if not explicit (but we are making everything explicit now)
    const cityKey = Object.keys(CITIES).find((key) => {
        const city = CITIES[key];
        return (
            city.domain === domain ||
            city.aliases?.includes(domain)
        );
    });

    if (cityKey) return CITIES[cityKey];
    return null;
}

const TEMPLATE_FEATURES = [
    "Navette Aéroport",
    "Gare TGV / RER",
    "Berline Affaires",
    "Transport VSL"
];

const TEMPLATE_PRICING = {
    base: "25€",
    description: "Tarif estimatif jour"
};

// Helper to clone base config for .com domains
// Usage: clone(_base, "domain.com", "slug_com", "G-ANALYTICS-ID")
const clone = (base: CityConfig, domain: string, slug: string, ga_id?: string): CityConfig => ({
    ...base,
    slug,
    domain,
    aliases: [], // No aliases for the clone
    email: `contact@${domain}`,
    ga_id: ga_id // Set GA ID specifically if provided
});

// --- BASE CITIES DEFINITIONS ---

const _taxiaplaisir: CityConfig = {
    slug: "taxiaplaisir",
    domain: "taxiaplaisir.fr",
    name: "Taxi Plaisir 78",
    city: "Plaisir",
    phoneNumber: "01 84 60 78 78",
    email: "contact@taxiaplaisir.fr",
    heroImage: "/images/plaisir.jpg",
    description: "Votre taxi à Plaisir (78370). Transport vers gares et aéroports parisiens.",
    meta: {
        title: "Taxi Plaisir 78370 | Réservation Immédiate & VSL",
        description: "Taxi à Plaisir (78). Service de transport local et longue distance. Navette Gares & Aéroports. Conventionné CPAM."
    },
    features: TEMPLATE_FEATURES,
    pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Privé de l'Ouest Parisien", "Hôpital Mignot"],
    stations: ["Gare de Plaisir-Grignon", "Gare de Plaisir-Les Clayes"],
    neighborhoods: ["Valibout", "Les Gâtines", "Aqueduc de l'Avre"],
    points_of_interest: {
        hotels: ["Première Classe Plaisir", "Campanile Plaisir"],
        nightlife: ["Cinéma UGC Plaisir", "Théâtre Coluche", "Bowling de Plaisir"],
        monuments: ["Château de Plaisir"],
        parking_difficulty: "Moyenne"
    }
};

const _taxiasnieres: CityConfig = {
    slug: "taxiasnieres",
    domain: "taxiasnieres.fr",
    name: "Taxi Asnières 92",
    city: "Asnières-sur-Seine",
    phoneNumber: "01 84 60 92 92",
    email: "contact@taxiasnieres.fr",
    heroImage: "/images/asnieres.jpg",
    description: "Taxi Asnières-sur-Seine. Déplacements rapides vers Paris et La Défense.",
    meta: { title: "Taxi Asnières-sur-Seine (92) | Moto Taxi & VSL", description: "Réservez un taxi à Asnières-sur-Seine." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Beaujon"], stations: ["Gare d'Asnières"], neighborhoods: ["Bécon-les-Bruyères"],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Cimetière des Chiens"], parking_difficulty: "Difficile" }
};

const _taxiboulogne: CityConfig = {
    slug: "taxiboulogne",
    domain: "taxiboulogne.fr",
    name: "Taxi Boulogne 92",
    city: "Boulogne-Billancourt",
    phoneNumber: "01 84 60 92 00",
    email: "contact@taxiboulogne.fr",
    heroImage: "/images/boulogne.jpg",
    description: "Taxi Boulogne-Billancourt. Service premium 92.",
    meta: { title: "Taxi Boulogne-Billancourt (92) | Réservation Taxi", description: "Taxi Boulogne." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Ambroise-Paré"], stations: ["Pont de Sèvres"], neighborhoods: ["Billancourt", "Parchamp"],
    points_of_interest: { hotels: ["Radisson Blu"], nightlife: [], monuments: ["La Seine Musicale"], parking_difficulty: "Enfer" }
};

const _taxichambourcy: CityConfig = {
    slug: "taxichambourcy",
    domain: "taxichambourcy.fr",
    name: "Taxi Chambourcy 78",
    city: "Chambourcy",
    phoneNumber: "01 84 60 78 00",
    email: "contact@taxichambourcy.fr",
    heroImage: "/images/chambourcy.jpg",
    description: "Taxi Chambourcy.",
    meta: { title: "Taxi Chambourcy (78) | Transport", description: "Taxi Chambourcy." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital de Poissy"], stations: ["Gare de Poissy"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Désert de Retz"], parking_difficulty: "Facile" }
};

const _taxicolombes: CityConfig = {
    slug: "taxicolombes",
    domain: "taxicolombes.fr",
    name: "Taxi Colombes 92",
    city: "Colombes",
    phoneNumber: "01 84 60 92 01",
    email: "contact@taxicolombes.fr",
    heroImage: "/images/colombes.jpg",
    description: "Taxi Colombes.",
    meta: { title: "Taxi Colombes (92) | Transport", description: "Taxi Colombes." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Louis-Mourier"], stations: ["Gare de Colombes"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Moyenne" }
};

const _taxicourbevoie: CityConfig = {
    slug: "taxicourbevoie",
    domain: "taxicourbevoie.fr",
    name: "Taxi Courbevoie 92",
    city: "Courbevoie",
    phoneNumber: "01 84 60 92 02",
    email: "contact@taxicourbevoie.fr",
    heroImage: "/images/courbevoie.jpg",
    description: "Taxi Courbevoie.",
    meta: { title: "Taxi Courbevoie (92) | La Défense", description: "Taxi Courbevoie." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Courbevoie"], stations: ["Gare de Courbevoie"], neighborhoods: ["La Défense"],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Difficile" }
};

const _taxifeucherolles: CityConfig = {
    slug: "taxifeucherolles",
    domain: "taxifeucherolles.fr",
    name: "Taxi Feucherolles 78",
    city: "Feucherolles",
    phoneNumber: "01 84 60 78 01",
    email: "contact@taxifeucherolles.fr",
    heroImage: "/images/feucherolles.jpg",
    description: "Taxi Feucherolles.",
    meta: { title: "Taxi Feucherolles (78)", description: "Taxi Feucherolles." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: [], stations: [], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Facile" }
};

const _taxifourqueux: CityConfig = {
    slug: "taxifourqueux",
    domain: "taxifourqueux.fr",
    name: "Taxi Fourqueux 78",
    city: "Fourqueux",
    phoneNumber: "01 84 60 78 02",
    email: "contact@taxifourqueux.fr",
    heroImage: "/images/fourqueux.jpg",
    description: "Taxi Fourqueux.",
    meta: { title: "Taxi Fourqueux (78)", description: "Taxi Fourqueux." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: [], stations: ["Gare St Germain GC"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Facile" }
};

const _taxiguyancourt: CityConfig = {
    slug: "taxiguyancourt",
    domain: "taxiguyancourt.fr",
    name: "Taxi Guyancourt 78",
    city: "Guyancourt",
    phoneNumber: "01 84 60 78 03",
    email: "contact@taxiguyancourt.fr",
    heroImage: "/images/guyancourt.jpg",
    description: "Taxi Guyancourt.",
    meta: { title: "Taxi Guyancourt (78)", description: "Taxi Guyancourt." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: [], stations: ["Gare SQY"], neighborhoods: ["Villaroy"],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Technocentre Renault"], parking_difficulty: "Moyenne" }
};

const _taxiissy: CityConfig = {
    slug: "taxiissy",
    domain: "taxiissy.fr",
    name: "Taxi Issy 92",
    city: "Issy-les-Moulineaux",
    phoneNumber: "01 84 60 92 03",
    email: "contact@taxiissy.fr",
    heroImage: "/images/issy.jpg",
    description: "Taxi Issy.",
    meta: { title: "Taxi Issy-les-Moulineaux (92)", description: "Taxi Issy." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Suisse"], stations: ["Val de Seine"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Difficile" }
};

const _taxilepecq: CityConfig = {
    slug: "taxilepecq",
    domain: "taxilepecq.com",
    name: "Taxi Le Pecq 78",
    city: "Le Pecq",
    phoneNumber: "01 84 60 78 04",
    email: "contact@taxilepecq.com",
    heroImage: "/images/lepecq.jpg",
    description: "Taxi Le Pecq.",
    meta: { title: "Taxi Le Pecq (78)", description: "Taxi Le Pecq." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: [], stations: ["RER A Le Vésinet-Le Pecq"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Moyenne" }
};

const _taxilevallois: CityConfig = {
    slug: "taxilevallois",
    domain: "taxilevallois.fr",
    name: "Taxi Levallois 92",
    city: "Levallois-Perret",
    phoneNumber: "01 84 60 92 04",
    email: "contact@taxilevallois.fr",
    heroImage: "/images/levallois.jpg",
    description: "Taxi Levallois.",
    meta: { title: "Taxi Levallois-Perret (92)", description: "Taxi Levallois." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Franco-Britannique"], stations: ["Gare de Clichy-Levallois"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Difficile" }
};

const _taxilevesinet: CityConfig = {
    slug: "taxilevesinet",
    domain: "taxilevesinet.fr",
    name: "Taxi Le Vésinet 78",
    city: "Le Vésinet",
    phoneNumber: "01 84 60 78 05",
    email: "contact@taxilevesinet.fr",
    heroImage: "/images/levesinet.jpg",
    description: "Taxi Le Vésinet.",
    meta: { title: "Taxi Le Vésinet (78)", description: "Taxi Le Vésinet." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: [], stations: ["RER Le Vésinet Centre"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Facile" }
};

const _taxilouveciennes: CityConfig = {
    slug: "taxilouveciennes",
    domain: "taxilouveciennes.fr",
    name: "Taxi Louveciennes 78",
    city: "Louveciennes",
    phoneNumber: "01 84 60 78 06",
    email: "contact@taxilouveciennes.fr",
    heroImage: "/images/louveciennes.jpg",
    description: "Taxi Louveciennes.",
    meta: { title: "Taxi Louveciennes (78)", description: "Taxi Louveciennes." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: [], stations: ["Gare de Louveciennes"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Aqueduc"], parking_difficulty: "Facile" }
};

const _taximarly: CityConfig = {
    slug: "taximarly",
    domain: "taximarly.fr",
    name: "Taxi Marly 78",
    city: "Marly-le-Roi",
    phoneNumber: "01 84 60 78 07",
    email: "contact@taximarly.fr",
    heroImage: "/images/marly.jpg",
    description: "Taxi Marly.",
    meta: { title: "Taxi Marly-le-Roi (78)", description: "Taxi Marly." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: [], stations: ["Gare de Marly-le-Roi"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Parc de Marly"], parking_difficulty: "Facile" }
};

const _taximontreuil: CityConfig = {
    slug: "taximontreuil",
    domain: "taximontreuil.fr",
    name: "Taxi Montreuil 93",
    city: "Montreuil",
    phoneNumber: "01 84 60 93 00",
    email: "contact@taximontreuil.fr",
    heroImage: "/images/montreuil.jpg",
    description: "Taxi Montreuil.",
    meta: { title: "Taxi Montreuil (93)", description: "Taxi Montreuil." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital André Grégoire"], stations: ["Mairie de Montreuil"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Difficile" }
};

const _taxinanterre: CityConfig = {
    slug: "taxinanterre",
    domain: "taxinanterre.fr",
    name: "Taxi Nanterre 92",
    city: "Nanterre",
    phoneNumber: "01 84 60 92 05",
    email: "contact@taxinanterre.fr",
    heroImage: "/images/nanterre.jpg",
    description: "Taxi Nanterre.",
    meta: { title: "Taxi Nanterre (92)", description: "Taxi Nanterre." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Nanterre"], stations: ["Nanterre Université"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Moyenne" }
};

const _taxineuilly: CityConfig = {
    slug: "taxineuilly",
    domain: "taxineuilly.fr",
    name: "Taxi Neuilly 92",
    city: "Neuilly-sur-Seine",
    phoneNumber: "01 84 60 92 06",
    email: "contact@taxineuilly.fr",
    heroImage: "/images/neuilly.jpg",
    description: "Taxi Neuilly.",
    meta: { title: "Taxi Neuilly-sur-Seine (92)", description: "Taxi Neuilly." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Américain"], stations: ["Pont de Neuilly"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Difficile" }
};

const _taxipoissy: CityConfig = {
    slug: "taxipoissy",
    domain: "taxipoissy.com",
    name: "Taxi Poissy 78",
    city: "Poissy",
    phoneNumber: "01 84 60 78 08",
    email: "contact@taxipoissy.com",
    heroImage: "/images/poissy.jpg",
    description: "Taxi Poissy.",
    meta: { title: "Taxi Poissy (78)", description: "Taxi Poissy." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["CHIPS Poissy"], stations: ["Gare de Poissy"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Villa Savoye"], parking_difficulty: "Moyenne" }
};

const _taxirueil: CityConfig = {
    slug: "taxirueil",
    domain: "taxirueil.fr",
    name: "Taxi Rueil 92",
    city: "Rueil-Malmaison",
    phoneNumber: "01 84 60 92 07",
    email: "contact@taxirueil.fr",
    heroImage: "/images/rueil.jpg",
    description: "Taxi Rueil.",
    meta: { title: "Taxi Rueil-Malmaison (92)", description: "Taxi Rueil." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Clinique des Martinets"], stations: ["RER Rueil"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Château de Malmaison"], parking_difficulty: "Moyenne" }
};

const _taxisaintcloud: CityConfig = {
    slug: "taxisaintcloud",
    domain: "taxisaintcloud.fr",
    name: "Taxi Saint-Cloud 92",
    city: "Saint-Cloud",
    phoneNumber: "01 84 60 92 08",
    email: "contact@taxisaintcloud.fr",
    heroImage: "/images/saintcloud.jpg",
    description: "Taxi Saint-Cloud.",
    meta: { title: "Taxi Saint-Cloud (92)", description: "Taxi Saint-Cloud." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Huguenin"], stations: ["Gare de Saint-Cloud"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Parc de Saint-Cloud"], parking_difficulty: "Difficile" }
};

const _taxisaintcyr: CityConfig = {
    slug: "taxisaintcyr",
    domain: "taxisaintcyr.fr",
    name: "Taxi Saint-Cyr 78",
    city: "Saint-Cyr-l'École",
    phoneNumber: "01 84 60 78 09",
    email: "contact@taxisaintcyr.fr",
    heroImage: "/images/saintcyr.jpg",
    description: "Taxi Saint-Cyr.",
    meta: { title: "Taxi Saint-Cyr-l'École (78)", description: "Taxi Saint-Cyr." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: [], stations: ["Gare de Saint-Cyr"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Moyenne" }
};

const _taxisaintdenis: CityConfig = {
    slug: "taxisaintdenis",
    domain: "taxisaintdenis.fr",
    name: "Taxi Saint-Denis 93",
    city: "Saint-Denis",
    phoneNumber: "01 84 60 93 01",
    email: "contact@taxisaintdenis.fr",
    heroImage: "/images/saintdenis.jpg",
    description: "Taxi Saint-Denis.",
    meta: { title: "Taxi Saint-Denis (93)", description: "Taxi Saint-Denis." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Delafontaine"], stations: ["Gare de Saint-Denis"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Stade de France", "Basilique"], parking_difficulty: "Difficile" }
};

const _taxisaintgermain: CityConfig = {
    slug: "taxisaintgermain",
    domain: "taxisaintgermain.com",
    name: "Taxi Saint-Germain 78",
    city: "Saint-Germain-en-Laye",
    phoneNumber: "01 84 60 78 10",
    email: "contact@taxisaintgermain.com",
    heroImage: "/images/saintgermain.jpg",
    description: "Taxi Saint-Germain.",
    meta: { title: "Taxi Saint-Germain-en-Laye (78)", description: "Taxi Saint-Germain." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital de Poissy-St-Germain"], stations: ["RER A St Germain"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Château de St Germain"], parking_difficulty: "Moyenne" }
};

const _taxisaintnom: CityConfig = {
    slug: "taxisaintnom",
    domain: "taxisaintnom.fr",
    name: "Taxi Saint-Nom 78",
    city: "Saint-Nom-la-Bretèche",
    phoneNumber: "01 84 60 78 11",
    email: "contact@taxisaintnom.fr",
    heroImage: "/images/saintnom.jpg",
    description: "Taxi Saint-Nom.",
    meta: { title: "Taxi Saint-Nom-la-Bretèche (78)", description: "Taxi Saint-Nom." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: [], stations: ["Gare de St Nom"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: [], parking_difficulty: "Facile" }
};

const _taxisaintouen: CityConfig = {
    slug: "taxisaintouen",
    domain: "taxisaintouen.fr",
    name: "Taxi Saint-Ouen 93",
    city: "Saint-Ouen",
    phoneNumber: "01 84 60 93 02",
    email: "contact@taxisaintouen.fr",
    heroImage: "/images/saintouen.jpg",
    description: "Taxi Saint-Ouen.",
    meta: { title: "Taxi Saint-Ouen (93)", description: "Taxi Saint-Ouen." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: [], stations: ["Gare de St Ouen"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Puces de St Ouen"], parking_difficulty: "Difficile" }
};

const _taxisaintquentin: CityConfig = {
    slug: "taxisaintquentin",
    domain: "taxisaintquentin.com",
    name: "Taxi SQY 78",
    city: "Saint-Quentin-en-Yvelines",
    phoneNumber: "01 84 60 78 12",
    email: "contact@taxisaintquentin.com",
    heroImage: "/images/sqy.jpg",
    description: "Taxi SQY.",
    meta: { title: "Taxi Saint-Quentin-en-Yvelines (78)", description: "Taxi SQY." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Privé de l'Ouest Parisien"], stations: ["Gare de SQY"], neighborhoods: [],
    points_of_interest: { hotels: [], nightlife: [], monuments: ["Vélodrome"], parking_difficulty: "Moyenne" }
};

const _taxisversailles: CityConfig = {
    slug: "taxisversailles",
    domain: "taxisversailles.com",
    name: "Taxi Versailles 78",
    city: "Versailles",
    phoneNumber: "01 84 60 78 13",
    email: "contact@taxisversailles.com",
    heroImage: "/images/versailles.jpg",
    description: "Taxi Versailles.",
    meta: { title: "Taxi Versailles (78)", description: "Taxi Versailles." },
    features: TEMPLATE_FEATURES, pricing: TEMPLATE_PRICING,
    hospitals: ["Hôpital Mignot"], stations: ["Gare Versailles Chantiers", "Gare Rive Droite"], neighborhoods: ["Notre-Dame", "Saint-Louis"],
    points_of_interest: { hotels: ["Trianon Palace"], nightlife: [], monuments: ["Château de Versailles"], parking_difficulty: "Difficile" }
};

export const CITIES: Record<string, CityConfig> = {
    // --- .FR DOMAINS (Base) ---
    "taxiaplaisir": _taxiaplaisir,
    "taxiasnieres": _taxiasnieres,
    "taxiboulogne": _taxiboulogne,
    "taxichambourcy": _taxichambourcy,
    "taxicolombes": _taxicolombes,
    "taxicourbevoie": _taxicourbevoie,
    "taxifeucherolles": _taxifeucherolles,
    "taxifourqueux": _taxifourqueux,
    "taxiguyancourt": _taxiguyancourt,
    "taxiissy": _taxiissy,
    "taxilepecq": _taxilepecq, // Native .com but serves as base here
    "taxilevallois": _taxilevallois,
    "taxilevesinet": _taxilevesinet,
    "taxilouveciennes": _taxilouveciennes,
    "taximarly": _taximarly,
    "taximontreuil": _taximontreuil,
    "taxinanterre": _taxinanterre,
    "taxineuilly": _taxineuilly,
    "taxipoissy": _taxipoissy, // Native .com
    "taxirueil": _taxirueil,
    "taxisaintcloud": _taxisaintcloud,
    "taxisaintcyr": _taxisaintcyr,
    "taxisaintdenis": _taxisaintdenis,
    "taxisaintgermain": _taxisaintgermain, // Native .com
    "taxisaintnom": _taxisaintnom,
    "taxisaintouen": _taxisaintouen,
    "taxisaintquentin": _taxisaintquentin, // Native .com
    "taxisversailles": _taxisversailles, // Native .com

    // --- .COM ALIASES & VARIANTS (With optional GA ID support) ---
    // Usage: clone(base, "domain.com", "slug_com", "G-ANALYTICS-ID")

    "taxiaplaisir_com": clone(_taxiaplaisir, "taxiaplaisir.com", "taxiaplaisir_com"),
    "taxiasnieres_com": clone(_taxiasnieres, "taxiasnieres.com", "taxiasnieres_com"),
    "taxiboulogne_com": clone(_taxiboulogne, "taxiboulogne.com", "taxiboulogne_com"),
    "taxichambourcy_com": clone(_taxichambourcy, "taxichambourcy.com", "taxichambourcy_com"),
    "taxicolombes_com": clone(_taxicolombes, "taxicolombes.com", "taxicolombes_com"),
    "taxicourbevoie_com": clone(_taxicourbevoie, "taxicourbevoie.com", "taxicourbevoie_com"),
    "taxifeucherolles_com": clone(_taxifeucherolles, "taxifeucherolles.com", "taxifeucherolles_com"),
    "taxifourqueux_com": clone(_taxifourqueux, "taxifourqueux.com", "taxifourqueux_com"),
    "taxiguyancourt_com": clone(_taxiguyancourt, "taxiguyancourt.com", "taxiguyancourt_com"),
    "taxiissy_com": clone(_taxiissy, "taxiissy.com", "taxiissy_com"),
    "taxilevallois_com": clone(_taxilevallois, "taxilevallois.com", "taxilevallois_com"),
    "taxilevesinet_com": clone(_taxilevesinet, "taxilevesinet.com", "taxilevesinet_com"),
    "taxilouveciennes_com": clone(_taxilouveciennes, "taxilouveciennes.com", "taxilouveciennes_com"),
    "taximarly_com": clone(_taximarly, "taximarly.com", "taximarly_com"),
    "taximontreuil_com": clone(_taximontreuil, "taximontreuil.com", "taximontreuil_com"),
    "taxineuilly_com": clone(_taxineuilly, "taxineuilly.com", "taxineuilly_com"),
    "taxirueil_com": clone(_taxirueil, "taxirueil.com", "taxirueil_com"),
    "taxisaintcloud_com": clone(_taxisaintcloud, "taxisaintcloud.com", "taxisaintcloud_com"),
    "taxisaintcyr_com": clone(_taxisaintcyr, "taxisaintcyr.com", "taxisaintcyr_com"),
    "taxisaintdenis_com": clone(_taxisaintdenis, "taxisaintdenis.com", "taxisaintdenis_com"),
    "taxisaintnom_com": clone(_taxisaintnom, "taxisaintnom.com", "taxisaintnom_com"),
    "taxisaintouen_com": clone(_taxisaintouen, "taxisaintouen.com", "taxisaintouen_com"),
};
