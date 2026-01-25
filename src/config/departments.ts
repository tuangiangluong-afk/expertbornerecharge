
export const DEPARTMENTS: Record<string, { code: string; name: string; slug: string; center: { lat: number; lng: number }; description: string; heroColor: string; accentColor: string }> = {
    "92-hauts-de-seine": {
        code: "92",
        name: "Hauts-de-Seine",
        slug: "92-hauts-de-seine",
        center: { lat: 48.828, lng: 2.220 },
        description: "Le quartier d'affaires de l'Ouest Parisien. De la Défense à Boulogne-Billancourt, nos chauffeurs assurent vos déplacements professionnels et personnels avec une ponctualité exemplaire.",
        heroColor: "from-blue-900 to-slate-900",
        accentColor: "blue"
    },
    "78-yvelines": {
        code: "78",
        name: "Yvelines",
        slug: "78-yvelines",
        center: { lat: 48.804, lng: 2.120 },
        description: "L'excellence du transport dans l'Ouest Parisien. Versailles, Saint-Germain-en-Laye, Poissy... Profitez d'un service de taxi haut de gamme pour vos transferts gares et aéroports.",
        heroColor: "from-emerald-900 to-slate-900",
        accentColor: "emerald"
    },
    "93-seine-saint-denis": {
        code: "93",
        name: "Seine-Saint-Denis",
        slug: "93-seine-saint-denis",
        center: { lat: 48.936, lng: 2.357 },
        description: "Au cœur de la dynamique du Grand Paris. Saint-Denis, Montreuil, Roissy... Un maillage complet pour vos trajets quotidiens et urgences, avec prise en charge CPAM disponible.",
        heroColor: "from-purple-900 to-slate-900",
        accentColor: "purple"
    },
};
