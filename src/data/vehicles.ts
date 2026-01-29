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
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2940&auto=format&fit=crop" // Generic Charging
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
    },
    // VOLKSWAGEN
    {
        id: "vw-id3",
        brand: "Volkswagen",
        model: "ID.3",
        connector: "Type 2",
        maxAC: 11,
        battery: 58,
        image: "https://images.unsplash.com/photo-1620882657743-34c988ed404c?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "vw-id4",
        brand: "Volkswagen",
        model: "ID.4",
        connector: "Type 2",
        maxAC: 11,
        battery: 77,
        image: "https://images.unsplash.com/photo-1631526466336-12c8230722cc?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "vw-id-buzz",
        brand: "Volkswagen",
        model: "ID.Buzz",
        connector: "Type 2",
        maxAC: 11,
        battery: 77,
        image: "https://images.unsplash.com/photo-1662973712869-77f6b83f0607?q=80&w=2940&auto=format&fit=crop"
    },
    // AUDI
    {
        id: "audi-q4-etron",
        brand: "Audi",
        model: "Q4 e-tron",
        connector: "Type 2",
        maxAC: 11,
        battery: 77,
        image: "https://images.unsplash.com/photo-1650380720456-cc3a804797be?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "audi-etron-gt",
        brand: "Audi",
        model: "e-tron GT",
        connector: "Type 2",
        maxAC: 11,
        battery: 84,
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2940&auto=format&fit=crop"
    },
    // BMW
    {
        id: "bmw-i4",
        brand: "BMW",
        model: "i4",
        connector: "Type 2",
        maxAC: 11,
        battery: 80,
        image: "https://images.unsplash.com/photo-1667554904576-9c44569477ac?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "bmw-ix1",
        brand: "BMW",
        model: "iX1",
        connector: "Type 2",
        maxAC: 22, // Option often taken
        battery: 64,
        image: "https://images.unsplash.com/photo-1699974526563-71a763c3272e?q=80&w=2940&auto=format&fit=crop"
    },
    // MERCEDES
    {
        id: "mercedes-eqa",
        brand: "Mercedes-Benz",
        model: "EQA",
        connector: "Type 2",
        maxAC: 11,
        battery: 66,
        image: "https://images.unsplash.com/photo-1678825832791-030b65672d42?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "mercedes-eqe",
        brand: "Mercedes-Benz",
        model: "EQE",
        connector: "Type 2",
        maxAC: 11,
        battery: 90,
        image: "https://images.unsplash.com/photo-1674485526848-0ca1a94aa00d?q=80&w=2940&auto=format&fit=crop"
    },
    // KIA
    {
        id: "kia-ev6",
        brand: "Kia",
        model: "EV6",
        connector: "Type 2",
        maxAC: 11,
        battery: 77,
        image: "https://images.unsplash.com/photo-1665676059902-6c2e3678564f?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "kia-niro-ev",
        brand: "Kia",
        model: "Niro EV",
        connector: "Type 2",
        maxAC: 11,
        battery: 64,
        image: "https://images.unsplash.com/photo-1678735529402-dd196500589d?q=80&w=2940&auto=format&fit=crop"
    },
    // HYUNDAI
    {
        id: "hyundai-ioniq-5",
        brand: "Hyundai",
        model: "Ioniq 5",
        connector: "Type 2",
        maxAC: 11,
        battery: 73,
        image: "https://images.unsplash.com/photo-1632832822763-7a76c8add1b7?q=80&w=2832&auto=format&fit=crop"
    },
    {
        id: "hyundai-kona",
        brand: "Hyundai",
        model: "Kona Electric",
        connector: "Type 2",
        maxAC: 11,
        battery: 64,
        image: "https://images.unsplash.com/photo-1703640245642-127e997a9f02?q=80&w=2940&auto=format&fit=crop"
    },
    // VOLVO
    {
        id: "volvo-ex30",
        brand: "Volvo",
        model: "EX30",
        connector: "Type 2",
        maxAC: 22,
        battery: 64,
        image: "https://images.unsplash.com/photo-1686665798993-9c8491c64ac9?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "volvo-xc40",
        brand: "Volvo",
        model: "XC40 Recharge",
        connector: "Type 2",
        maxAC: 11,
        battery: 78,
        image: "https://images.unsplash.com/photo-1662998399763-8a3031024251?q=80&w=2940&auto=format&fit=crop"
    },
    // PORSCHE
    {
        id: "porsche-taycan",
        brand: "Porsche",
        model: "Taycan",
        connector: "Type 2",
        maxAC: 22, // Often optional
        battery: 83,
        image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2940&auto=format&fit=crop"
    },
    // SKODA
    {
        id: "skoda-enyaq",
        brand: "Skoda",
        model: "Enyaq iV",
        connector: "Type 2",
        maxAC: 11,
        battery: 77,
        image: "https://images.unsplash.com/photo-1658421867160-f3316669acc3?q=80&w=2832&auto=format&fit=crop"
    },
    // MINI
    {
        id: "mini-cooper-se",
        brand: "Mini",
        model: "Cooper SE",
        connector: "Type 2",
        maxAC: 11,
        battery: 32,
        image: "https://images.unsplash.com/photo-1617716127117-768ad691523a?q=80&w=2787&auto=format&fit=crop"
    },
    // FORD
    {
        id: "ford-mustang-mach-e",
        brand: "Ford",
        model: "Mustang Mach-E",
        connector: "Type 2",
        maxAC: 11,
        battery: 76,
        image: "https://images.unsplash.com/photo-1626847037657-3f19175787bb?q=80&w=2940&auto=format&fit=crop"
    },
    // NISSAN
    {
        id: "nissan-ariya",
        brand: "Nissan",
        model: "Ariya",
        connector: "Type 2",
        maxAC: 7.4, // 22 in option ! But 7.4 standard
        battery: 63,
        image: "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "nissan-leaf",
        brand: "Nissan",
        model: "Leaf",
        connector: "Type 2", // Type 1 on old ones, Type 2 on new. Mainstream is New.
        maxAC: 6.6,
        battery: 40,
        image: "https://images.unsplash.com/photo-1619362280286-f1f8fd6d7f02?q=80&w=2832&auto=format&fit=crop"
    },
    // BYD
    {
        id: "byd-atto-3",
        brand: "BYD",
        model: "Atto 3",
        connector: "Type 2",
        maxAC: 11,
        battery: 60,
        image: "https://images.unsplash.com/photo-1678122394553-7dd234da139d?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "byd-seal",
        brand: "BYD",
        model: "Seal",
        connector: "Type 2",
        maxAC: 11,
        battery: 82,
        image: "https://images.unsplash.com/photo-1701362744365-b1e16c871033?q=80&w=2940&auto=format&fit=crop"
    },
    // CITROEN
    {
        id: "citroen-e-c4",
        brand: "Citroën",
        model: "ë-C4",
        connector: "Type 2",
        maxAC: 11,
        battery: 50,
        image: "https://images.unsplash.com/photo-1632246736270-349f2b1db12e?q=80&w=2787&auto=format&fit=crop"
    },
    // OPEL
    {
        id: "opel-mokka-e",
        brand: "Opel",
        model: "Mokka-e",
        connector: "Type 2",
        maxAC: 11,
        battery: 50,
        image: "https://images.unsplash.com/photo-1647424953335-241fcc891040?q=80&w=2940&auto=format&fit=crop"
    },
    // JEEP
    {
        id: "jeep-avenger",
        brand: "Jeep",
        model: "Avenger",
        connector: "Type 2",
        maxAC: 11,
        battery: 54,
        image: "https://images.unsplash.com/photo-1675253818318-7b949822a101?q=80&w=2940&auto=format&fit=crop"
    },
    // TOYOTA
    {
        id: "toyota-bz4x",
        brand: "Toyota",
        model: "bZ4X",
        connector: "Type 2",
        maxAC: 11, // Recent update, used to be 6.6
        battery: 71,
        image: "https://images.unsplash.com/photo-1650965985834-3652613f86d8?q=80&w=2940&auto=format&fit=crop"
    },
    // SMART
    {
        id: "smart-1",
        brand: "Smart",
        model: "#1",
        connector: "Type 2",
        maxAC: 22,
        battery: 66,
        image: "https://images.unsplash.com/photo-1695759719330-9b36021379bb?q=80&w=2940&auto=format&fit=crop"
    },
    // TESLA (Extended)
    {
        id: "tesla-model-s",
        brand: "Tesla",
        model: "Model S",
        connector: "Type 2",
        maxAC: 11, // 16.5 on older models, 11 on refresh
        battery: 100,
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "tesla-model-x",
        brand: "Tesla",
        model: "Model X",
        connector: "Type 2",
        maxAC: 11,
        battery: 100,
        image: "https://images.unsplash.com/photo-1620891549027-9426c9536f16?q=80&w=2940&auto=format&fit=crop"
    },
    // RENAULT (Extended)
    {
        id: "renault-twingo",
        brand: "Renault",
        model: "Twingo E-Tech",
        connector: "Type 2",
        maxAC: 22,
        battery: 22,
        image: "https://images.unsplash.com/photo-1597007030739-5d23d8c19955?q=80&w=2832&auto=format&fit=crop"
    },
    {
        id: "renault-kangoo",
        brand: "Renault",
        model: "Kangoo E-Tech",
        connector: "Type 2",
        maxAC: 11, // 22 Option
        battery: 45,
        image: "https://images.unsplash.com/photo-1571683370617-573e0474668b?q=80&w=2832&auto=format&fit=crop"
    },
    {
        id: "renault-scenic",
        brand: "Renault",
        model: "Scenic E-Tech",
        connector: "Type 2",
        maxAC: 22,
        battery: 87,
        image: "https://images.unsplash.com/photo-1707343843598-39755549ac9a?q=80&w=2832&auto=format&fit=crop"
    },
    // PEUGEOT (Extended)
    {
        id: "peugeot-e-2008",
        brand: "Peugeot",
        model: "e-2008",
        connector: "Type 2",
        maxAC: 7.4,
        battery: 50,
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "peugeot-e-308",
        brand: "Peugeot",
        model: "e-308",
        connector: "Type 2",
        maxAC: 11,
        battery: 54,
        image: "https://images.unsplash.com/photo-1699974526563-71a763c3272e?q=80&w=2940&auto=format&fit=crop"
    },
    // VOLKSWAGEN (Extended)
    {
        id: "vw-id5",
        brand: "Volkswagen",
        model: "ID.5",
        connector: "Type 2",
        maxAC: 11,
        battery: 77,
        image: "https://images.unsplash.com/photo-1631526466336-12c8230722cc?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "vw-id7",
        brand: "Volkswagen",
        model: "ID.7",
        connector: "Type 2",
        maxAC: 11,
        battery: 77,
        image: "https://images.unsplash.com/photo-1701362744365-b1e16c871033?q=80&w=2940&auto=format&fit=crop"
    },
    // AUDI (Extended)
    {
        id: "audi-q8-etron",
        brand: "Audi",
        model: "Q8 e-tron",
        connector: "Type 2",
        maxAC: 11, // 22 Option
        battery: 106,
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2940&auto=format&fit=crop"
    },
    // BMW (Extended)
    {
        id: "bmw-i5",
        brand: "BMW",
        model: "i5",
        connector: "Type 2",
        maxAC: 22, // Often standard on high trim
        battery: 81,
        image: "https://images.unsplash.com/photo-1699974526563-71a763c3272e?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "bmw-ix",
        brand: "BMW",
        model: "iX",
        connector: "Type 2",
        maxAC: 11,
        battery: 105,
        image: "https://images.unsplash.com/photo-1667554904576-9c44569477ac?q=80&w=2940&auto=format&fit=crop"
    },
    // MERCEDES (Extended)
    {
        id: "mercedes-eqs",
        brand: "Mercedes-Benz",
        model: "EQS",
        connector: "Type 2",
        maxAC: 11,
        battery: 108,
        image: "https://images.unsplash.com/photo-1674485526848-0ca1a94aa00d?q=80&w=2940&auto=format&fit=crop"
    },
    // KIA (Extended)
    {
        id: "kia-ev9",
        brand: "Kia",
        model: "EV9",
        connector: "Type 2",
        maxAC: 11,
        battery: 99,
        image: "https://images.unsplash.com/photo-1665676059902-6c2e3678564f?q=80&w=2940&auto=format&fit=crop"
    },
    // HYUNDAI (Extended)
    {
        id: "hyundai-ioniq-6",
        brand: "Hyundai",
        model: "Ioniq 6",
        connector: "Type 2",
        maxAC: 11,
        battery: 77,
        image: "https://images.unsplash.com/photo-1703640245642-127e997a9f02?q=80&w=2940&auto=format&fit=crop"
    },
    // MG (Extended)
    {
        id: "mg-zs-ev",
        brand: "MG",
        model: "ZS EV",
        connector: "Type 2",
        maxAC: 11, // Long range
        battery: 72,
        image: "https://images.unsplash.com/photo-1678122394553-7dd234da139d?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: "mg-5",
        brand: "MG",
        model: "MG5",
        connector: "Type 2",
        maxAC: 11,
        battery: 61,
        image: "https://images.unsplash.com/photo-1678122394553-7dd234da139d?q=80&w=2940&auto=format&fit=crop"
    },
    // CUPRA
    {
        id: "cupra-born",
        brand: "Cupra",
        model: "Born",
        connector: "Type 2",
        maxAC: 11,
        battery: 58,
        image: "https://images.unsplash.com/photo-1678129299499-f529f52f3069?q=80&w=2940&auto=format&fit=crop"
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
