export interface Vehicle {
    id: string; // unique slug (ex: tesla-model-3)
    brand: string; // Tesla
    model: string; // Model 3
    connector: "Type 2" | "Combo CCS";
    maxAC: number; // 11 (kW)
    battery: number; // 60 (kWh) - Standard Range / Entry level
    image: string;
}

export const VEHICLES: Vehicle[] = [
    // TESLA
    {
        id: "tesla-model-3",
        brand: "Tesla",
        model: "Model 3",
        connector: "Type 2",
        maxAC: 11,
        battery: 60,
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2941&auto=format&fit=crop"
    },
    {
        id: "tesla-model-y",
        brand: "Tesla",
        model: "Model Y",
        connector: "Type 2",
        maxAC: 11,
        battery: 60,
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2748&auto=format&fit=crop"
    },
    // RENAULT
    {
        id: "renault-megane-e-tech",
        brand: "Renault",
        model: "Megane E-Tech",
        connector: "Type 2",
        maxAC: 22, // The killer feature of Renault
        battery: 60,
        image: "https://images.unsplash.com/photo-1669288591871-33160a0c2049?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "renault-zoe",
        brand: "Renault",
        model: "Zoe",
        connector: "Type 2",
        maxAC: 22,
        battery: 52,
        image: "https://images.unsplash.com/photo-1609529669235-c07e4e1bd6e9?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "renault-5-e-tech",
        brand: "Renault",
        model: "R5 E-Tech",
        connector: "Type 2",
        maxAC: 11,
        battery: 52,
        image: "https://images.unsplash.com/photo-1709589865668-d0553935db31?q=80&w=2832&auto=format&fit=crop"
    },
    // PEUGEOT
    {
        id: "peugeot-e-208",
        brand: "Peugeot",
        model: "e-208",
        connector: "Type 2",
        maxAC: 7.4, // Standard 7.4, Option 11. Let's stay safe with 7.4 or mention 11.
        battery: 50,
        image: "https://images.unsplash.com/photo-1662497670557-04764b8e214d?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "peugeot-e-3008",
        brand: "Peugeot",
        model: "e-3008",
        connector: "Type 2",
        maxAC: 11,
        battery: 73,
        image: "https://images.unsplash.com/photo-1706647230588-299f19cae674?q=80&w=2940&auto=format&fit=crop"
    },
    // MG
    {
        id: "mg-4",
        brand: "MG",
        model: "MG4",
        connector: "Type 2",
        maxAC: 6.6, // Often 6.6 or 11 depending on version.
        battery: 51,
        image: "https://images.unsplash.com/photo-1678122394553-7dd234da139d?q=80&w=2940&auto=format&fit=crop"
    },
    // FIAT
    {
        id: "fiat-500e",
        brand: "Fiat",
        model: "500e",
        connector: "Type 2",
        maxAC: 11,
        battery: 42,
        image: "https://images.unsplash.com/photo-1632246736270-349f2b1db12e?q=80&w=2787&auto=format&fit=crop"
    },
    // DACIA
    {
        id: "dacia-spring",
        brand: "Dacia",
        model: "Spring",
        connector: "Type 2",
        maxAC: 6.6,
        battery: 27,
        image: "https://images.unsplash.com/photo-1672322521102-38d01d4a8ec3?q=80&w=2000&auto=format&fit=crop"
    }
];

export function getAllVehicles() {
    return VEHICLES;
}

export function getVehicleById(id: string) {
    return VEHICLES.find(v => v.id === id);
}

export function getVehiclesByBrand(brand: string) {
    return VEHICLES.filter(v => v.brand.toLowerCase() === brand.toLowerCase());
}

export function getAllBrands() {
    // Unique brands
    return Array.from(new Set(VEHICLES.map(v => v.brand)));
}
