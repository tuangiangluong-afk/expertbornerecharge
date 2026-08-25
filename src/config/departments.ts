
export const DEPARTMENTS: Record<string, { code: string; name: string; slug: string; center: { lat: number; lng: number }; description: string; heroColor: string; accentColor: string; image: string }> = {
    "92-hauts-de-seine": {
        code: "92",
        name: "Hauts-de-Seine",
        slug: "92-hauts-de-seine",
        center: { lat: 48.828, lng: 2.220 },
        description: "Le département des Hauts-de-Seine concentre une forte demande d'installation de bornes de recharge pour véhicules électriques, de La Défense à Boulogne-Billancourt. Nos installateurs certifiés IRVE interviennent dans les copropriétés, maisons individuelles et parkings d'entreprise pour la pose de votre Wallbox, avec dossier d'aides ADVENIR constitué gratuitement.",
        heroColor: "from-blue-900 to-slate-900",
        accentColor: "blue",
        image: "https://images.unsplash.com/photo-1577713451555-d3dceb22570b?q=80&w=3181&auto=format&fit=crop" // La Défense / Business District style
    },
    "78-yvelines": {
        code: "78",
        name: "Yvelines",
        slug: "78-yvelines",
        center: { lat: 48.804, lng: 2.120 },
        description: "Des Yvelines, de Versailles à Saint-Germain-en-Laye en passant par Poissy, nos installateurs certifiés IRVE posent votre borne de recharge à domicile, en copropriété ou en entreprise. Villas, pavillons et résidences : devis gratuit sous 24h, installation rapide et aides de l'État (ADVENIR, crédit d'impôt, TVA réduite).",
        heroColor: "from-emerald-900 to-slate-900",
        accentColor: "emerald",
        image: "https://images.unsplash.com/photo-1549271576-963c6d70d743?q=80&w=3087&auto=format&fit=crop" // Versailles / Chateau style or Greenery
    },
    "93-seine-saint-denis": {
        code: "93",
        name: "Seine-Saint-Denis",
        slug: "93-seine-saint-denis",
        center: { lat: 48.936, lng: 2.357 },
        description: "Au cœur du Grand Paris, notre réseau d'installateurs IRVE couvre toute la Seine-Saint-Denis : Saint-Denis, Montreuil, Bobigny, Aubervilliers, Roissy... Installation de bornes de recharge en copropriété et en entreprise, avec prime ADVENIR, crédit d'impôt et TVA réduite à 5,5%.",
        heroColor: "from-purple-900 to-slate-900",
        accentColor: "purple",
        image: "https://images.unsplash.com/photo-1565060169123-5e9ad0c15926?q=80&w=3174&auto=format&fit=crop" // Stade de France / Urban dynamic
    },
};
