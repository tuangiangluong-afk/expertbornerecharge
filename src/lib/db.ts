export interface CityConfig {
    slug: string;
    domain: string;
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
}

export const CITIES: Record<string, CityConfig> = {
    "taxiaix": {
        slug: "taxiaix",
        domain: "taxiaix.fr",
        name: "Taxi Aix-en-Provence",
        city: "Aix-en-Provence",
        phoneNumber: "04 42 00 00 01",
        email: "contact@taxiaix.fr",
        heroImage: "/images/aix-hero.jpg",
        description: "Le service de taxi n°1 à Aix-en-Provence. Disponible 24/7 pour vos transferts gare TGV et aéroport.",
        meta: {
            title: "Taxi Aix-en-Provence | Réservation 24/7 - Officiel",
            description: "Réservez votre taxi à Aix-en-Provence. Chauffeurs expérimentés, véhicules confortables. Transferts Gare TGV et Aéroport Marseille Provence."
        },
        features: [
            "Transfert Gare TGV Aix",
            "Aéroport Marseille Provence",
            "Longue distance",
            "Véhicules Premium"
        ],
        pricing: {
            base: "35€",
            description: "Course moyenne centre-ville"
        },
        hospitals: ["Hôpital Privé de Provence", "Centre Hospitalier du Pays d'Aix", "Clinique Axium"],
        stations: ["Gare Aix-en-Provence TGV", "Gare Routière Aix Centre"],
        neighborhoods: ["Centre Historique", "Jas de Bouffan", "Les Milles"],
        points_of_interest: {
            hotels: ["Hôtel Renaissance", "Aquabella", "Negrecoste", "Villa Gallici"],
            nightlife: ["Le Mistral", "IPN Club", "Rue de la Verrerie"],
            monuments: ["La Rotonde", "Cours Mirabeau", "Atelier Cézanne"],
            parking_difficulty: "Très difficile (Centre piéton)"
        }
    },
    "taxitoulon": {
        slug: "taxitoulon",
        domain: "taxitoulon.fr",
        name: "Taxi Toulon Hyères",
        city: "Toulon",
        phoneNumber: "04 94 00 00 00",
        email: "contact@taxitoulon.fr",
        heroImage: "/images/toulon-hero.jpg",
        description: "Votre taxi à Toulon et Hyères. Liaisons portuaire (Corsica Ferries) et aéroport Toulon-Hyères.",
        meta: {
            title: "Taxi Toulon Hyères | Port & Aéroport - Réservation",
            description: "Taxi officiel à Toulon. Accès direct Port (Corsica Ferries) et Aéroport de Hyères. Tous trajets Var."
        },
        features: [
            "Port Toulon (Corse)",
            "Aéroport Hyères",
            "Gare de Toulon",
            "Base Navale"
        ],
        pricing: {
            base: "30€",
            description: "Moyenne ville/port"
        },
        hospitals: ["Hôpital Sainte-Musse", "Hôpital Privé Toulon Hyères", "HIA Sainte-Anne"],
        stations: ["Gare de Toulon Centre", "Gare Routière"],
        neighborhoods: ["Le Mourillon", "Haute-Ville", "Saint-Jean-du-Var"],
        points_of_interest: {
            hotels: ["L'Eautel", "Grand Hôtel Dauphiné", "Okko Hotels"],
            nightlife: ["Le Mourillon", "Plages du Mourillon", "Le Zinc"],
            monuments: ["Mont Faron", "Stade Mayol", "Opéra de Toulon"],
            parking_difficulty: "Difficile (Jours de match)"
        }
    },
    "taximarseille": {
        slug: "taximarseille",
        domain: "taximarseille.fr",
        name: "Taxi Marseille Provence",
        city: "Marseille",
        phoneNumber: "04 91 00 00 00",
        email: "contact@taximarseille.fr",
        heroImage: "/images/marseille-hero.jpg",
        description: "Taxi Marseille : Gare Saint-Charles, Aéroport Marignane et Croisières. Service VIP.",
        meta: {
            title: "Taxi Marseille | Gare St-Charles & Aéroport - N°1",
            description: "Réservez votre taxi à Marseille. Liaison Gare Saint-Charles, Aéroport Marignane, Port de Croisière. Berlines Premium."
        },
        features: [
            "Gare Saint-Charles",
            "Aéroport Marignane",
            "Port Croisière",
            "Circuit Calanques"
        ],
        pricing: {
            base: "40€",
            description: "Moyenne ville/gare"
        },
        hospitals: ["Hôpital de la Timone", "Hôpital Nord", "Hôpital Européen"],
        stations: ["Gare Marseille Saint-Charles", "Gare de la Blancarde"],
        neighborhoods: ["Vieux-Port", "Le Panier", "La Joliette"],
        points_of_interest: {
            hotels: ["Intercontinental Hôtel Dieu", "Sofitel Vieux-Port", "Mama Shelter"],
            nightlife: ["Le Trolleybus", "R2 Le Rooftop", "Cours Julien"],
            monuments: ["Notre-Dame de la Garde", "Mucem", "Palais Longchamp"],
            parking_difficulty: "Impossible (Vieux-Port piéton)"
        }
    }
};
