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
}

export function getCity(domain: string): CityConfig | null {
    if (CITIES[domain]) return CITIES[domain];

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
            title: "Taxi Aix-en-Provence | Gare TGV & Aéroport - Business",
            description: "Navette Taxi Aix-en-Provence vers Gare TGV et Aéroport Marseille. Service Affaires & Particuliers. Prix Fixe et Chauffeur Privé."
        },
        features: [
            "Gare TGV Aix",
            "Aéroport Marseille",
            "Berline Affaires",
            "Taxi Conventionné"
        ],
        pricing: {
            base: "35€",
            description: "Course centre-ville"
        },
        hospitals: ["Hôpital Privé de Provence", "Centre Hospitalier du Pays d'Aix", "Clinique Axium"],
        stations: ["Gare Aix-en-Provence TGV", "Gare Routière Aix Centre"],
        neighborhoods: ["Centre Historique", "Jas de Bouffan", "Les Milles", "Luynes", "Puyricard", "Val Saint-André"],
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
            title: "Taxi Toulon Hyères | Port & Aéroport - VTC Business",
            description: "Transfert Taxi Toulon vers Port (Corse) et Aéroport Hyères. Berline Confort pour trajets pro et privés. Réservation immédiate."
        },
        features: [
            "Port Toulon (Corse)",
            "Aéroport Hyères",
            "Gare de Toulon",
            "Transport Business"
        ],
        pricing: {
            base: "30€",
            description: "Moyenne ville/port"
        },
        hospitals: ["Hôpital Sainte-Musse", "Hôpital Privé Toulon Hyères", "HIA Sainte-Anne"],
        stations: ["Gare de Toulon Centre", "Gare Routière"],
        neighborhoods: ["Le Mourillon", "Haute-Ville", "Saint-Jean-du-Var", "Pont du Las", "Siblas"],
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
        name: "Taxi Marseille",
        city: "Marseille",
        phoneNumber: "04 91 00 00 00",
        email: "contact@taximarseille.fr",
        heroImage: "/images/marseille-hero.jpg",
        description: "Taxis officiels Marseille. Accès priorité Gare Saint-Charles et Aéroport Marignane.",
        meta: {
            title: "Taxi Marseille | Gare St-Charles & Aéroport - Business",
            description: "Centrale Taxi Marseille. Transfert Gare Saint-Charles et Aéroport Marignane. Service classe Affaires et Tourisme. Prix Fixes."
        },
        features: ["Gare St-Charles", "Aéroport Marignane", "Berline Premium", "Circuit Touristique"],
        pricing: { base: "40€", description: "Moyenne ville (jour)" },
        hospitals: ["Hôpital de la Timone", "Hôpital Nord", "Hôpital Européen"],
        stations: ["Gare Saint-Charles", "Gare de la Blancarde"],
        neighborhoods: ["Vieux-Port", "Le Panier", "La Joliette", "Le Prado", "Endoume"],
        points_of_interest: {
            hotels: ["Intercontinental", "Sofitel Vieux-Port", "Mama Shelter"],
            nightlife: ["Le Vieux-Port", "Cours Julien", "Rooftop des Terrasses"],
            monuments: ["Notre-Dame de la Garde", "MUCEM", "Stade Vélodrome"],
            parking_difficulty: "Enfer sur terre"
        }
    },
    // --- NOUVELLES VILLES (Yvelines & Hauts-de-Seine) ---
    "taxiaplaisir": {
        slug: "taxiaplaisir",
        domain: "taxiaplaisir.fr",
        aliases: ["taxiaplaisir.com"],
        name: "Taxi Plaisir (78)",
        city: "Plaisir",
        phoneNumber: "01 89 78 00 00",
        email: "contact@taxiaplaisir.fr",
        heroImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920&auto=format&fit=crop",
        description: "Votre taxi à Plaisir (78370). Desserte Clayes-sous-Bois, Élancourt. Gare de Plaisir-Grignon.",
        meta: { title: "Taxi Plaisir 78 | Gare Plaisir-Grignon & Hôpital", description: "Taxi Plaisir (78370). Service 24/7. Gare Plaisir-Grignon, Centre Commercial Grand Plaisir." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Privé de l'Ouest Parisien", "Centre Hospitalier de Plaisir"],
        stations: ["Gare de Plaisir-Grignon", "Gare de Plaisir-Les Clayes"],
        neighborhoods: ["Centre-Ville", "Les Gâtines", "Valibout", "Aqueduc"],
        points_of_interest: { hotels: ["Première Classe", "Campanile"], nightlife: ["Cinéma CGR"], monuments: ["Château de Plaisir", "Parc du Château"], parking_difficulty: "Moyenne" }
    },
    "taxiasnieres": {
        slug: "taxiasnieres",
        domain: "taxiasnieres.fr",
        aliases: ["taxiasnieres.com"],
        name: "Taxi Asnières-sur-Seine",
        city: "Asnières-sur-Seine",
        phoneNumber: "01 89 92 00 01",
        email: "contact@taxiasnieres.fr",
        heroImage: "https://images.unsplash.com/photo-1549144511-f099e773cca4?q=80&w=1920",
        description: "Taxi Asnières-sur-Seine (92). Liaison rapide Paris et La Défense.",
        meta: { title: "Taxi Asnières-sur-Seine (92) | Réservation Immédiate", description: "Taxi à Asnières. Desserte Bécon, Les Bourguignons. Transfert gares parisiennes." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Beaujon (Clichy)", "Institut Franco-Britannique"],
        stations: ["Gare d'Asnières", "Métro Gabriel Péri", "Métro Les Agnettes"],
        neighborhoods: ["Bécon-les-Bruyères", "Les Bourguignons", "Alma", "Philosophes"],
        points_of_interest: { hotels: ["Ibis Styles", "Hôtel Vivaldi"], nightlife: ["Quais de Seine"], monuments: ["Château d'Asnières", "Cimetière des Chiens"], parking_difficulty: "Difficile" }
    },
    "taxiboulogne": {
        slug: "taxiboulogne",
        domain: "taxiboulogne.fr",
        aliases: ["taxiboulogne.com"],
        name: "Taxi Boulogne-Billancourt",
        city: "Boulogne-Billancourt",
        phoneNumber: "01 89 92 00 02",
        email: "contact@taxiboulogne.fr",
        heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1920",
        description: "Taxi Boulogne-Billancourt. Premier pôle économique après Paris. Service entreprises.",
        meta: { title: "Taxi Boulogne-Billancourt | VTC & Taxi 92", description: "Taxi Boulogne. Marcel Sembat, Pont de Sèvres. Accès rapide Paris 16 et périph." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Ambroise-Paré", "Clinique des Princes"],
        stations: ["Métro Marcel Sembat", "Pont de Sèvres", "Boulogne Jean Jaurès"],
        neighborhoods: ["Centre-Ville", "Le Trapèze", "Parchamp", "Silly-Gallieni"],
        points_of_interest: { hotels: ["Radisson Blu", "Courtyard by Marriott"], nightlife: ["La Seine Musicale"], monuments: ["Musée Albert-Kahn", "Parc de Saint-Cloud"], parking_difficulty: "Très difficile" }
    },
    "taxichambourcy": {
        slug: "taxichambourcy",
        domain: "taxichambourcy.fr",
        aliases: ["taxichambourcy.com"],
        name: "Taxi Chambourcy",
        city: "Chambourcy",
        phoneNumber: "01 89 78 00 03",
        email: "contact@taxichambourcy.fr",
        heroImage: "https://images.unsplash.com/photo-1570737142831-7e8e5033281c?q=80&w=1920",
        description: "Taxi à Chambourcy (78). Proche Saint-Germain-en-Laye et A14.",
        meta: { title: "Taxi Chambourcy 78 | Réservation locale", description: "Taxi Chambourcy. Desserte Lycée International, Centre Commercial." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["CHI Poissy-Saint-Germain"],
        stations: ["Gare de poissy (proche)", "RER A Saint-Germain"],
        neighborhoods: ["Centre Village", "La Chataigneraie"],
        points_of_interest: { hotels: ["Ibis Budget"], nightlife: ["Centre Commercial"], monuments: ["Désert de Retz"], parking_difficulty: "Facile" }
    },
    "taxicolombes": {
        slug: "taxicolombes",
        domain: "taxicolombes.fr",
        aliases: ["taxicolombes.com"],
        name: "Taxi Colombes",
        city: "Colombes",
        phoneNumber: "01 89 92 00 04",
        email: "contact@taxicolombes.fr",
        heroImage: "https://images.unsplash.com/photo-1444084316824-dc26d6657664?q=80&w=1920",
        description: "Taxi Colombes (92). Stade Yves-du-Manoir et zones résidentielles.",
        meta: { title: "Taxi Colombes 92 | Gare & Stade", description: "Commander un taxi à Colombes. Service rapide vers La Défense et Paris." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Louis-Mourier"],
        stations: ["Gare de Colombes", "Gare du Stade", "Gare de la Garenne-Colombes"],
        neighborhoods: ["Centre", "Petit-Colombes", "Stade", "Les Vallées"],
        points_of_interest: { hotels: ["Kyriad", "Courtyard Marriot"], nightlife: ["Rue Saint-Denis"], monuments: ["Stade Yves-du-Manoir", "Ancienne Église"], parking_difficulty: "Moyenne" }
    },
    "taxicourbevoie": {
        slug: "taxicourbevoie",
        domain: "taxicourbevoie.fr",
        aliases: ["taxicourbevoie.com"],
        name: "Taxi Courbevoie",
        city: "Courbevoie",
        phoneNumber: "01 89 92 00 05",
        email: "contact@taxicourbevoie.fr",
        heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920",
        description: "Taxi Courbevoie & La Défense. Service prioritaire quartier d'affaires.",
        meta: { title: "Taxi Courbevoie La Défense | Business & Particuliers", description: "Taxi Courbevoie. Accès direct La Défense, Esplanade, Bécon." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Courbevoie-Neuilly", "Centre Médical La Défense"],
        stations: ["Gare de Courbevoie", "Gare de Bécon-les-Bruyères", "La Défense Grande Arche"],
        neighborhoods: ["Bécon", "Cœur de Ville", "Faubourg de l'Arche", "Gambetta"],
        points_of_interest: { hotels: ["Pullman La Défense", "Melia", "Hilton"], nightlife: ["La Défense Arena", "Rooftops La Défense"], monuments: ["Grande Arche", "Parc de Bécon"], parking_difficulty: "Difficile" }
    },
    "taxifeucherolles": {
        slug: "taxifeucherolles",
        domain: "taxifeucherolles.fr",
        aliases: ["taxifeucherolles.com"],
        name: "Taxi Feucherolles",
        city: "Feucherolles",
        phoneNumber: "01 89 78 00 06",
        email: "contact@taxifeucherolles.fr",
        heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920",
        description: "Taxi rural Feucherolles et environs. Desserte Plaine de Versailles.",
        meta: { title: "Taxi Feucherolles 78 | Saint-Nom & Crespières", description: "Taxi Feucherolles. Liaison gares Plaisir ou Saint-Nom-la-Bretèche." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital de Plaisir", "Hôpital Mignot"],
        stations: ["Gare de Saint-Nom-la-Bretèche"],
        neighborhoods: ["Village", "Sainte-Gemme"],
        points_of_interest: { hotels: ["Chambres d'hôtes"], nightlife: ["Golf de Feucherolles"], monuments: ["Golf de Feucherolles", "Église Saint-Geneviève"], parking_difficulty: "Facile" }
    },
    "taxifourqueux": {
        slug: "taxifourqueux",
        domain: "taxifourqueux.fr",
        aliases: ["taxifourqueux.com"],
        name: "Taxi Fourqueux",
        city: "Fourqueux",
        phoneNumber: "01 89 78 00 07",
        email: "contact@taxifourqueux.fr",
        heroImage: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1920",
        description: "Taxi Fourqueux (Saint-Germain-en-Laye). Proche Lycée International.",
        meta: { title: "Taxi Fourqueux 78 | Lycée International", description: "Taxi Fourqueux. Service local et scolaire. Accès RER A Saint-Germain." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["CHI Poissy-Saint-Germain"],
        stations: ["Gare de Saint-Germain-en-Laye Bel-Air"],
        neighborhoods: ["Village", "L'Étang", "Golf"],
        points_of_interest: { hotels: ["Hôtel du Golf"], nightlife: ["Golf de Fourqueux"], monuments: ["Lycée International", "Forêt de Marly"], parking_difficulty: "Moyenne" }
    },
    "taxiguyancourt": {
        slug: "taxiguyancourt",
        domain: "taxiguyancourt.fr",
        aliases: ["taxiguyancourt.com"],
        name: "Taxi Guyancourt",
        city: "Guyancourt",
        phoneNumber: "01 89 78 00 08",
        email: "contact@taxiguyancourt.fr",
        heroImage: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1920",
        description: "Taxi Guyancourt / Saint-Quentin-en-Yvelines. Technocentre Renault.",
        meta: { title: "Taxi Guyancourt 78 | Technocentre & SQY", description: "Taxi à Guyancourt. Desserte Technocentre Renault, Université UVSQ." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Privé de l'Ouest Parisien"],
        stations: ["Gare de Saint-Quentin-en-Yvelines"],
        neighborhoods: ["Villaroy", "Les Saules", "Le Pont du Routoir", "Europe"],
        points_of_interest: { hotels: ["Best Western The Wish", "Mercure"], nightlife: ["Le Golf National"], monuments: ["Golf National (Ryder Cup)", "La Batterie"], parking_difficulty: "Moyenne" }
    },
    "taxiissy": {
        slug: "taxiissy",
        domain: "taxiissy.fr",
        aliases: ["taxiissy.com"],
        name: "Taxi Issy-les-Moulineaux",
        city: "Issy-les-Moulineaux",
        phoneNumber: "01 89 92 00 09",
        email: "contact@taxiissy.fr",
        heroImage: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=1920",
        description: "Taxi Issy-les-Moulineaux. Val de Seine, Mairie d'Issy.",
        meta: { title: "Taxi Issy-les-Moulineaux | Val de Seine", description: "Commandez votre taxi à Issy. Siège Microsoft, Coca-Cola. Accès Porte de Versailles." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Suisse", "Hôpital Corentin-Celton"],
        stations: ["Mairie d'Issy", "Val de Seine", "Corentin Celton"],
        neighborhoods: ["Val de Seine", "Les Îles", "Corentin Celton", "La Ferme"],
        points_of_interest: { hotels: ["Novotel", "Ibis"], nightlife: ["Les Arches"], monuments: ["Parc de l'Île Saint-Germain", "Tour aux Figures"], parking_difficulty: "Difficile" }
    },
    "taxilepecq": {
        slug: "taxilepecq",
        domain: "taxilepecq.com",
        name: "Taxi Le Pecq",
        city: "Le Pecq",
        phoneNumber: "01 89 78 00 10",
        email: "contact@taxilepecq.com",
        heroImage: "https://images.unsplash.com/photo-1549488347-15d2a216fc69?q=80&w=1920",
        description: "Taxi Le Pecq-sur-Seine. Rive gauche et droite. Proche Saint-Germain.",
        meta: { title: "Taxi Le Pecq 78 | Bords de Seine", description: "Taxi Le Pecq. Desserte RER A Saint-Germain ou Le Vésinet-Le Pecq." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["CHI Poissy-Saint-Germain"],
        stations: ["Gare RER Le Vésinet-Le Pecq"],
        neighborhoods: ["Saint-Wandrille", "Mexique", "Vignes-Benettes"],
        points_of_interest: { hotels: ["Hôtel des Vignes"], nightlife: ["Bords de Seine"], monuments: ["Parc Corbière", "Pont du Pecq"], parking_difficulty: "Moyenne" }
    },
    "taxilevallois": {
        slug: "taxilevallois",
        domain: "taxilevallois.fr",
        aliases: ["taxilevallois.com"],
        name: "Taxi Levallois-Perret",
        city: "Levallois-Perret",
        phoneNumber: "01 89 92 00 11",
        email: "contact@taxilevallois.fr",
        heroImage: "https://images.unsplash.com/photo-1444723121867-2600d1537bbf?q=80&w=1920",
        description: "Taxi Levallois-Perret. Quartier d'affaires et résidentiel chic.",
        meta: { title: "Taxi Levallois | Service VIP 92", description: "Taxi à Levallois. Pont de Levallois, Mairie. Service rapide vers Paris 17." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Américain (Neuilly)", "Institut Hospitalier Franco-Britannique"],
        stations: ["Pont de Levallois", "Anatole France", "Louise Michel"],
        neighborhoods: ["Front de Seine", "Greffulhe", "Alsace"],
        points_of_interest: { hotels: ["Evergreen Laurel", "Mercure"], nightlife: ["Quais de Seine"], monuments: ["Mairie de Levallois (Architecture)", "Parc de la Planchette"], parking_difficulty: "Difficile" }
    },
    "taxilevesinet": {
        slug: "taxilevesinet",
        domain: "taxilevesinet.fr",
        aliases: ["taxilevesinet.com"],
        name: "Taxi Le Vésinet",
        city: "Le Vésinet",
        phoneNumber: "01 89 78 00 12",
        email: "contact@taxilevesinet.fr",
        heroImage: "https://images.unsplash.com/photo-1506158669146-619067262a00?q=80&w=1920",
        description: "Taxi Le Vésinet. Ville-Parc d'excellence. RER A.",
        meta: { title: "Taxi Le Vésinet 78 | Ville Parc", description: "Taxi Le Vésinet. Transfert Gare RER Le Vésinet-Centre et Le Vésinet-Le Pecq." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital du Vésinet"],
        stations: ["Gare du Vésinet-Centre", "Gare du Vésinet-Le Pecq"],
        neighborhoods: ["Centre", "Les Ibis", "Princesse", "Charmettes"],
        points_of_interest: { hotels: ["Auberge des 3 Marches"], nightlife: ["Théâtre du Vésinet"], monuments: ["Lac des Ibis", "Villa Beau-Chêne"], parking_difficulty: "Facile" }
    },
    "taxilouveciennes": {
        slug: "taxilouveciennes",
        domain: "taxilouveciennes.fr",
        aliases: ["taxilouveciennes.com"],
        name: "Taxi Louveciennes",
        city: "Louveciennes",
        phoneNumber: "01 89 78 00 13",
        email: "contact@taxilouveciennes.fr",
        heroImage: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=1920",
        description: "Taxi Louveciennes. Cadre historique proche Versailles.",
        meta: { title: "Taxi Louveciennes 78 | Aqueduc & Seine", description: "Taxi Louveciennes. Desserte locale et gares ligne L." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Mignot (Le Chesnay)"],
        stations: ["Gare de Louveciennes"],
        neighborhoods: ["Village", "Quai de Conti", "Princesse"],
        points_of_interest: { hotels: ["B&B Louveciennes"], nightlife: ["Sur les quais"], monuments: ["Aqueduc de Louveciennes", "Château Voisins"], parking_difficulty: "Moyenne" }
    },
    "taximarly": {
        slug: "taximarly",
        domain: "taximarly.fr",
        aliases: ["taximarly.com"],
        name: "Taxi Marly-le-Roi",
        city: "Marly-le-Roi",
        phoneNumber: "01 89 78 00 14",
        email: "contact@taximarly.fr",
        heroImage: "https://images.unsplash.com/photo-1490217525287-eb4499d34208?q=80&w=1920",
        description: "Taxi Marly-le-Roi. Ville royale, parc et forêt.",
        meta: { title: "Taxi Marly-le-Roi 78 | Gare & Parc", description: "Taxi Marly-le-Roi. Accès Gare de Marly (Ligne L). Domaine de Marly." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Mignot"],
        stations: ["Gare de Marly-le-Roi"],
        neighborhoods: ["Vieux Marly", "Grandes Terres", "Montval"],
        points_of_interest: { hotels: ["Hôtel Le Parc"], nightlife: ["Vieux Marly"], monuments: ["Parc de Marly", "Abreuvoir"], parking_difficulty: "Facile" }
    },
    "taximontreuil": {
        slug: "taximontreuil",
        domain: "taximontreuil.fr",
        aliases: ["taximontreuil.com"],
        name: "Taxi Montreuil",
        city: "Montreuil",
        phoneNumber: "01 89 93 00 01",
        email: "contact@taximontreuil.fr",
        heroImage: "https://images.unsplash.com/photo-1493605828821-698fde7c9431?q=80&w=1920",
        description: "Taxi Montreuil (93). Mairie de Montreuil, Croix de Chavaux.",
        meta: { title: "Taxi Montreuil 93 | Banlieue Est", description: "Taxi à Montreuil. Service rapide vers Paris Est, Vincennes, Bagnolet." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital André Grégoire"],
        stations: ["Mairie de Montreuil", "Croix de Chavaux"],
        neighborhoods: ["Mairie", "Bas-Montreuil", "Haut-Montreuil", "La Noue"],
        points_of_interest: { hotels: ["Ibis Styles"], nightlife: ["La Marbrerie"], monuments: ["Murs à pêches", "Parc Montreau"], parking_difficulty: "Difficile" }
    },
    "taxinanterre": {
        slug: "taxinanterre",
        domain: "taxinanterre.fr",
        name: "Taxi Nanterre",
        city: "Nanterre",
        phoneNumber: "01 89 92 00 12",
        email: "contact@taxinanterre.fr",
        heroImage: "https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=1920",
        description: "Taxi Nanterre (Préfecture). Université et Palais de Justice.",
        meta: { title: "Taxi Nanterre 92 | Université & La Défense", description: "Taxi Nanterre. Desserte Université Paris X, La Défense, Préfecture." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital de Nanterre"],
        stations: ["Nanterre-Préfecture", "Nanterre-Université", "Nanterre-Ville"],
        neighborhoods: ["Parc Nord", "Mont-Valérien", "Chemin de l'Île"],
        points_of_interest: { hotels: ["Campanile", "Ibis"], nightlife: ["Quartier Université"], monuments: ["Paris La Défense Arena", "Parc André Malraux"], parking_difficulty: "Moyenne" }
    },
    "taxineuilly": {
        slug: "taxineuilly",
        domain: "taxineuilly.fr",
        aliases: ["taxineuilly.com"],
        name: "Taxi Neuilly-sur-Seine",
        city: "Neuilly-sur-Seine",
        phoneNumber: "01 89 92 00 13",
        email: "contact@taxineuilly.fr",
        heroImage: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?q=80&w=1920",
        description: "Taxi Neuilly-sur-Seine. Service prestige proche Paris.",
        meta: { title: "Taxi Neuilly 92 | Service Premium", description: "Taxi Neuilly-sur-Seine. Sablons, Pont de Neuilly. Liaisons aéroports." },
        features: TEMPLATE_FEATURES,
        pricing: { base: "30€", description: "Course Min" },
        hospitals: ["Hôpital Américain", "Clinique Hartmann"],
        stations: ["Les Sablons", "Pont de Neuilly", "Porte Maillot (proche)"],
        neighborhoods: ["Saint-James", "Sablons", "Bagatelle"],
        points_of_interest: { hotels: ["Neuilly Park Hotel"], nightlife: ["Porte Maillot"], monuments: ["Fondation Louis Vuitton (proche)", "Jardin d'Acclimatation"], parking_difficulty: "Très difficile" }
    },
    "taxipoissy": {
        slug: "taxipoissy",
        domain: "taxipoissy.com",
        name: "Taxi Poissy",
        city: "Poissy",
        phoneNumber: "01 89 78 00 15",
        email: "contact@taxipoissy.com",
        heroImage: "https://images.unsplash.com/photo-1583096114844-065dc8a18fa3?q=80&w=1920",
        description: "Taxi Poissy. Technoparc et usine PSA.",
        meta: { title: "Taxi Poissy 78 | Gare RER & Technoparc", description: "Taxi Poissy. Transfert Usine Stallantis, Technoparc, Centre Hospitalier." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["CHI Poissy-Saint-Germain"],
        stations: ["Gare de Poissy (RER A)"],
        neighborhoods: ["Centre-Ville", "Noailles", "Saint-Exupéry"],
        points_of_interest: { hotels: ["Ibis Poissy"], nightlife: ["Bords de Seine"], monuments: ["Villa Savoye (Le Corbusier)", "Collégiale Notre-Dame"], parking_difficulty: "Moyenne" }
    },
    "taxirueil": {
        slug: "taxirueil",
        domain: "taxirueil.fr",
        aliases: ["taxirueil.com"],
        name: "Taxi Rueil-Malmaison",
        city: "Rueil-Malmaison",
        phoneNumber: "01 89 92 00 14",
        email: "contact@taxirueil.fr",
        heroImage: "https://images.unsplash.com/photo-1516550893923-42d28e560348?q=80&w=1920",
        description: "Taxi Rueil-Malmaison A86. Rueil 2000.",
        meta: { title: "Taxi Rueil 92 | Rueil 2000 & Buzenval", description: "Commandez un taxi à Rueil-Malmaison. Quartier d'affaires Rueil 2000." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Clinique des Martinets"],
        stations: ["Gare RER Rueil-Malmaison"],
        neighborhoods: ["Rueil 2000", "Buzenval", "Jonchère"],
        points_of_interest: { hotels: ["Novotel", "Renaissance"], nightlife: ["Centre Ville"], monuments: ["Château de Malmaison", "Forêt de Saint-Cucufa"], parking_difficulty: "Moyenne" }
    },
    "taxisaintcloud": {
        slug: "taxisaintcloud",
        domain: "taxisaintcloud.fr",
        aliases: ["taxisaintcloud.com"],
        name: "Taxi Saint-Cloud",
        city: "Saint-Cloud",
        phoneNumber: "01 89 92 00 15",
        email: "contact@taxisaintcloud.fr",
        heroImage: "https://images.unsplash.com/photo-1549488428-22f309a066ec?q=80&w=1920",
        description: "Taxi Saint-Cloud. Sur les hauteurs de Paris.",
        meta: { title: "Taxi Saint-Cloud 92 | Vue Tour Eiffel", description: "Taxi Saint-Cloud. Val d'Or, Montretout. Accès rapide A13." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Centre René Huguenin (Curie)"],
        stations: ["Gare du Val d'Or", "Gare de Saint-Cloud", "Tram T2"],
        neighborhoods: ["Montretout", "Val d'Or", "Coteaux"],
        points_of_interest: { hotels: ["Villa Escudier"], nightlife: ["Hippodrome"], monuments: ["Parc de Saint-Cloud", "Hippodrome de Saint-Cloud"], parking_difficulty: "Difficile" }
    },
    "taxisaintcyr": {
        slug: "taxisaintcyr",
        domain: "taxisaintcyr.fr",
        aliases: ["taxisaintcyr.com"],
        name: "Taxi Saint-Cyr-l'École",
        city: "Saint-Cyr-l'École",
        phoneNumber: "01 89 78 00 16",
        email: "contact@taxisaintcyr.fr",
        heroImage: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1920",
        description: "Taxi Saint-Cyr-l'École. Proche Versailles et Aérodrome.",
        meta: { title: "Taxi Saint-Cyr 78 | Gare RER C", description: "Taxi Saint-Cyr. Desserte Lycée Militaire, Aérodrome. Gare RER C." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Mignot (proche)"],
        stations: ["Gare de Saint-Cyr (RER C, N, U)"],
        neighborhoods: ["L'Épi d'Or", "Gérard Philipe"],
        points_of_interest: { hotels: ["Ibis Budget"], nightlife: ["Versailles (proche)"], monuments: ["Lycée Militaire", "Aérodrome"], parking_difficulty: "Moyenne" }
    },
    "taxisaintdenis": {
        slug: "taxisaintdenis",
        domain: "taxisaintdenis.fr",
        aliases: ["taxisaintdenis.com"],
        name: "Taxi Saint-Denis",
        city: "Saint-Denis",
        phoneNumber: "01 89 93 00 02",
        email: "contact@taxisaintdenis.fr",
        heroImage: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1920",
        description: "Taxi Saint-Denis (93). Stade de France et Basilique.",
        meta: { title: "Taxi Saint-Denis 93 | Stade de France", description: "Taxi Saint-Denis. Pleyel, Porte de Paris. Accès événements Stade de France." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Delafontaine", "Hôpital Casanova"],
        stations: ["Gare de Saint-Denis", "RER B Stade de France", "Métro 13"],
        neighborhoods: ["Centre", "Pleyel", "Franc-Moisin", "La Plaine"],
        points_of_interest: { hotels: ["Novotel Suites"], nightlife: ["Stade de France (Events)"], monuments: ["Basilique Saint-Denis", "Stade de France"], parking_difficulty: "Difficile" }
    },
    "taxisaintgermain": {
        slug: "taxisaintgermain",
        domain: "taxisaintgermain.com",
        name: "Taxi Saint-Germain-en-Laye",
        city: "Saint-Germain-en-Laye",
        phoneNumber: "01 89 78 00 17",
        email: "contact@taxisaintgermain.com",
        heroImage: "https://images.unsplash.com/photo-1548663470-345091444ba7?q=80&w=1920",
        description: "Taxi Saint-Germain-en-Laye. Ville Royale.",
        meta: { title: "Taxi Saint-Germain-en-Laye | RER A", description: "Taxi officiel Saint-Germain. Château, Terrasse. Transfert aéroports et Paris." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["CHI Poissy-Saint-Germain"],
        stations: ["Gare RER A Saint-Germain-en-Laye", "Gare Grande Ceinture"],
        neighborhoods: ["Centre", "Bel-Air", "Fourqueux", "Lisière Pereire"],
        points_of_interest: { hotels: ["Pavillon Henri IV"], nightlife: ["Place du Marché"], monuments: ["Château de Saint-Germain", "Grande Terrasse"], parking_difficulty: "Difficile" }
    },
    "taxisaintnom": {
        slug: "taxisaintnom",
        domain: "taxisaintnom.fr",
        aliases: ["taxisaintnom.com"],
        name: "Taxi Saint-Nom-la-Bretèche",
        city: "Saint-Nom-la-Bretèche",
        phoneNumber: "01 89 78 00 18",
        email: "contact@taxisaintnom.fr",
        heroImage: "https://images.unsplash.com/photo-1565520651265-2a6288924b4b?q=80&w=1920",
        description: "Taxi Saint-Nom-la-Bretèche. Golf et résidence.",
        meta: { title: "Taxi Saint-Nom 78 | Golf et Gare", description: "Taxi Saint-Nom. Service calme et discret. Accès Golf de Saint-Nom." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Mignot (Le Chesnay)"],
        stations: ["Gare de Saint-Nom-la-Bretèche"],
        neighborhoods: ["Village", "Le Tuilier"],
        points_of_interest: { hotels: ["Relais"], nightlife: ["Club House Golf"], monuments: ["Golf de Saint-Nom", "Forêt de Marly"], parking_difficulty: "Facile" }
    },
    "taxisaintouen": {
        slug: "taxisaintouen",
        domain: "taxisaintouen.fr",
        aliases: ["taxisaintouen.com"],
        name: "Taxi Saint-Ouen",
        city: "Saint-Ouen",
        phoneNumber: "01 89 93 00 03",
        email: "contact@taxisaintouen.fr",
        heroImage: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=1920",
        description: "Taxi Saint-Ouen. Puces et Docks.",
        meta: { title: "Taxi Saint-Ouen 93 | Puces & Mairie", description: "Taxi Saint-Ouen-sur-Seine. Accès Puces de Saint-Ouen et Siège Région IDF." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Bichat (Paris 18)"],
        stations: ["Mairie de Saint-Ouen (Ligne 14/13)", "Garibaldi"],
        neighborhoods: ["Vieux Saint-Ouen", "Docks", "Rosiers"],
        points_of_interest: { hotels: ["Mob Hotel"], nightlife: ["Puces de Saint-Ouen"], monuments: ["Marché aux Puces", "Château de Saint-Ouen"], parking_difficulty: "Difficile" }
    },
    "taxisaintquentin": {
        slug: "taxisaintquentin",
        domain: "taxisaintquentin.com",
        name: "Taxi Saint-Quentin-en-Yvelines",
        city: "Montigny-le-Bretonneux",
        phoneNumber: "01 89 78 00 19",
        email: "contact@taxisaintquentin.com",
        heroImage: "https://images.unsplash.com/photo-1558487847-a859666df37e?q=80&w=1920",
        description: "Taxi SQY (Saint-Quentin-en-Yvelines). Pôle économique 78.",
        meta: { title: "Taxi SQY 78 | Montigny & Guyancourt", description: "Taxi Saint-Quentin-en-Yvelines. Gare SQY, Vélodrome National." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Privé de l'Ouest Parisien"],
        stations: ["Gare de Saint-Quentin-en-Yvelines (RER C, N, U)"],
        neighborhoods: ["Le Pas du Lac", "Saint-Quentin", "Sourderie"],
        points_of_interest: { hotels: ["Campanile", "Ibis"], nightlife: ["Cinéma UGC", "Espace Saint-Quentin"], monuments: ["Vélodrome National", "Théâtre de SQY"], parking_difficulty: "Moyenne" }
    },
    "taxisversailles": {
        slug: "taxisversailles",
        domain: "taxisversailles.com",
        name: "Taxi Versailles",
        city: "Versailles",
        phoneNumber: "01 89 78 00 20",
        email: "contact@taxisversailles.com",
        heroImage: "https://images.unsplash.com/photo-1574787968412-4c2847253509?q=80&w=1920",
        description: "Taxi Versailles. Château et Ville Royale.",
        meta: { title: "Taxi Versailles 78 | Château & Gares", description: "Taxi Versailles. Accès Château de Versailles (Grille d'Honneur), Gare Chantiers, Rive Droite." },
        features: TEMPLATE_FEATURES,
        pricing: TEMPLATE_PRICING,
        hospitals: ["Hôpital Mignot", "Clinique des Franciscaines"],
        stations: ["Gare Versailles Chantiers", "Gare Versailles Rive Droite", "Gare Versailles Rive Gauche"],
        neighborhoods: ["Notre-Dame", "Saint-Louis", "Porchefontaine", "Montreuil", "Clagny-Glatigny"],
        points_of_interest: { hotels: ["Trianon Palace", "Hôtel Le Versailles"], nightlife: ["Place du Marché"], monuments: ["Château de Versailles", "Jardins du Château"], parking_difficulty: "Moyenne" }
    }
};
