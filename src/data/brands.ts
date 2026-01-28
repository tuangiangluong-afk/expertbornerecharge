export interface BrandData {
    slug: string;
    name: string;
    models: string[];
    connectorType: "Type 2" | "Tesla NACS";
    maxPower: string;
    chargeTime: string;
    image: string;
    // Enhanced War Architecture Specs
    technicalSpecs: {
        cable: string;
        protection: string;
        grounding: string;
        expertTip: string;
    }
}

export const brands: BrandData[] = [
    {
        slug: "tesla",
        name: "Tesla",
        models: ["Model 3", "Model Y", "Model S", "Model X"],
        connectorType: "Tesla NACS", // or Type 2 for EU
        maxPower: "11kW (AC) / 250kW (DC)",
        chargeTime: "6h à 8h",
        image: "/brands/tesla.png",
        technicalSpecs: {
            cable: "Connecteur Mobile ou Wall Connector T2",
            protection: "Interrupteur Différentiel Type A (si Wall Connector Gen 3) ou Type B",
            grounding: "Standard (<100 Ohms)",
            expertTip: "Le Wall Connector Tesla Gen 3 offre un bouton sur la prise pour ouvrir la trappe. Un confort indispensable au quotidien."
        }
    },
    {
        slug: "renault",
        name: "Renault",
        models: ["Zoé", "Megane E-Tech", "R5"],
        connectorType: "Type 2",
        maxPower: "22kW (AC)",
        chargeTime: "3h (Zoé)",
        image: "/brands/renault.png",
        technicalSpecs: {
            cable: "Câble Type 2 Triphasé (indispensable pour 22kW)",
            protection: "Type B obligatoire (Chargeur Caméléon sensible aux fuites DC)",
            grounding: "CRITIQUE : Terre < 100 Ohms impératif sinon charge impossible.",
            expertTip: "La Zoé est la seule à charger en 22kW AC. Installez une borne triphasée si votre abonnement le permet !"
        }
    },
    {
        slug: "peugeot",
        name: "Peugeot",
        models: ["e-208", "e-2008", "e-3008"],
        connectorType: "Type 2",
        maxPower: "7.4kW / 11kW",
        chargeTime: "5h à 7h",
        image: "/brands/peugeot.png",
        technicalSpecs: {
            cable: "Type 2 Monophasé (7kW) ou Triphasé (11kW option)",
            protection: "Type A Hi ou Type A SI (Immunité Renforcée) conseillé",
            grounding: "Standard",
            expertTip: "Attention, le chargeur embarqué 11kW est souvent une option. Vérifiez votre bon de commande avant d'installer du triphasé."
        }
    },
    {
        slug: "bmw",
        name: "BMW",
        models: ["i4", "iX", "iX1"],
        connectorType: "Type 2",
        maxPower: "11kW",
        chargeTime: "6h à 8h",
        image: "/brands/bmw.png",
        technicalSpecs: {
            cable: "Type 2 Triphasé",
            protection: "Type A classique suffisant (Hager / Schneider)",
            grounding: "Standard",
            expertTip: "Les BMW gèrent très bien la programmation horaire. Une borne simple suffit, la voiture fait l'intelligence."
        }
    },
    {
        slug: "audi",
        name: "Audi",
        models: ["e-tron", "Q4 e-tron"],
        connectorType: "Type 2",
        maxPower: "11kW / 22kW (Option)",
        chargeTime: "6h à 9h",
        image: "/brands/audi.png",
        technicalSpecs: {
            cable: "Type 2 Triphasé",
            protection: "Type B recommandé pour les modèles e-tron GT",
            grounding: "Standard",
            expertTip: "Pour les gros rouleurs en Q8 e-tron, l'option chargeur 22kW AC vaut le coût d'installer une borne 22kW à domicile."
        }
    },
    {
        slug: "volkswagen",
        name: "Volkswagen",
        models: ["ID.3", "ID.4", "ID.5", "ID.Buzz"],
        connectorType: "Type 2",
        maxPower: "11kW",
        chargeTime: "6h à 8h",
        image: "/brands/vw.png",
        technicalSpecs: {
            cable: "Type 2 Triphasé",
            protection: "Type A",
            grounding: "Standard",
            expertTip: "La gamme ID supporte le Plug & Charge sur certaines bornes. Privilégiez une Wallbox connectée OCPP."
        }
    }
];
