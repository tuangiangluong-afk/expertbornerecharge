export interface HardwareProduct {
  slug: string;
  brand: string;
  modelName: string;
  tagline: string;
  image: string;
  category: "Borne de recharge" | "Prise renforcée";
  maxPowerKw: number;
  voltage: string;
  maxCurrentAmps: number;
  connectorType: string;
  cableIncluded: boolean;
  cableLengthMeters?: number;
  dynamicLoadShedding: string;
  solarCompatibility: string;
  ipRating: string;
  connectivity: string[];
  protectionRequired: string;
  estimatedHardwarePrice: string;
  averageInstalledPrice: string;
  taxCreditEligible: boolean;
  tvaRate: string;
  affiliateStore: string;
  affiliateUrl: string;
  pros: string[];
  cons: string[];
  verdict: string;
  suitableVehicles: string[];
  rating: number;
  reviewCount: number;
  faq: { question: string; answer: string }[];
}

export const HARDWARE_PRODUCTS: HardwareProduct[] = [
  {
    slug: "tesla-wall-connector-gen-3",
    image: "/images/chargers/tesla-wall-connector.png",
    brand: "Tesla",
    modelName: "Wall Connector (Génération 3)",
    tagline: "La borne au meilleur rapport puissance/prix, compatible avec tous les VE",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé commutable",
    maxCurrentAmps: 32,
    connectorType: "Câble attaché Type 2 (avec bouton d'ouverture de trappe Tesla)",
    cableIncluded: true,
    cableLengthMeters: 7.3,
    dynamicLoadShedding: "Via compteur d'énergie tiers Neurio / Dynamic Power Management",
    solarCompatibility: "Compatible recharge solaire directe avec véhicule Tesla (Charge on Solar)",
    ipRating: "IP55 / IK08 (Résistant aux intempéries extérieures)",
    connectivity: ["Wi-Fi", "Application Tesla"],
    protectionRequired: "Disjoncteur 40A + Interrupteur différentiel 30mA Type A ou F (protection DC 6mA intégrée)",
    estimatedHardwarePrice: "500 € à 550 € TTC",
    averageInstalledPrice: "1 150 € à 1 450 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "Tesla Direct / ManoMano",
    affiliateUrl: "/go/tesla-wall-connector",
    pros: [
      "Tarif matériel imbattable pour une borne 22 kW avec câble de 7,3 m inclus",
      "Bouton d'ouverture de trappe magique pour les propriétaires de Tesla",
      "Design ultra-soigné en verre trempé blanc, très compact et robuste"
    ],
    cons: [
      "Câble attaché non démontable (attention : en France, la norme NF C 15-100 privilégie la prise T2S avec obturateurs en copropriété)",
      "Pas de délestage direct sur la télé-information Linky (TIC) sans boîtier additionnel",
      "Moins d'options de supervision domotique que des bornes OCPP pures"
    ],
    verdict: "Le choix n°1 des propriétaires de Tesla en maison individuelle. Elle charge aussi n'importe quel autre véhicule électrique en Type 2 à pleine vitesse.",
    suitableVehicles: ["Tesla Model 3", "Tesla Model Y", "Tesla Model S", "Tesla Model X", "Renault Megane E-Tech", "Peugeot e-208", "Tout véhicule Type 2"],
    rating: 4.8,
    reviewCount: 3450,
    faq: [
      {
        question: "Le Tesla Wall Connector fonctionne-t-il avec d'autres marques de voitures ?",
        answer: "Oui, à 100 %. La prise Type 2 est le standard européen universel. Il recharge parfaitement une Peugeot, une Renault, une Volkswagen, une BMW ou une Hyundai."
      },
      {
        question: "Est-elle éligible au crédit d'impôt de 500 € ?",
        answer: "Oui, à condition impérative qu'elle soit fournie et installée par un électricien qualifié IRVE mention P1 ou P2."
      }
    ]
  },
  {
    slug: "schneider-charge",
    image: "/images/chargers/schneider-charge.png",
    brand: "Schneider Electric",
    modelName: "Schneider Charge",
    tagline: "La nouvelle référence française de la borne connectée pour l'habitat",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé commutable",
    maxCurrentAmps: 32,
    connectorType: "Prise T2S avec obturateurs (100% conforme norme NF C 15-100)",
    cableIncluded: false,
    dynamicLoadShedding: "Direct via module TIC Linky ou tore de mesure Schneider Wiser",
    solarCompatibility: "Optimisation de charge solaire avec l'écosystème Wiser Home",
    ipRating: "IP55 / IK10 (Résistance maximale aux chocs)",
    connectivity: ["Wi-Fi", "Bluetooth", "OCPP 1.6J", "Application Wiser"],
    protectionRequired: "Interrupteur différentiel 30mA Type A-EV ou Type A + détection DC 6mA intégrée",
    estimatedHardwarePrice: "649 € à 799 € TTC",
    averageInstalledPrice: "1 290 € à 1 650 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "ManoMano / Distributeur Pro",
    affiliateUrl: "/go/schneider-charge",
    pros: [
      "Prise T2S avec obturateurs assurant une conformité totale à la réglementation française",
      "Délestage dynamique ultra-simple via connexion directe au compteur Linky",
      "Écosystème domotique Schneider Wiser pour piloter charge et chauffe-eau"
    ],
    cons: [
      "Câble de recharge non fourni d'origine",
      "Application mobile nécessitant parfois un temps d'appairage initial",
      "Tarif du pack avec module de délestage plus élevé que le Tesla Wall Connector"
    ],
    verdict: "La borne idéale pour ceux qui veulent une sécurité absolue, la conformité NF C 15-100 sans discussion et un délestage automatique sur le compteur Linky.",
    suitableVehicles: ["Renault R5", "Peugeot e-3008", "Citroën ë-C3", "BMW i4", "Volkswagen ID.4", "Tous véhicules"],
    rating: 4.7,
    reviewCount: 1820,
    faq: [
      {
        question: "Pourquoi la prise T2S avec obturateurs est-elle importante en France ?",
        answer: "La norme NF C 15-100 impose des obturateurs de sécurité enfant sur toute prise domestique jusqu'à 32A pour éviter tout contact direct avec les broches sous tension."
      }
    ]
  },
  {
    slug: "wallbox-pulsar-plus",
    image: "/images/chargers/wallbox-pulsar-plus.png",
    brand: "Wallbox",
    modelName: "Pulsar Plus",
    tagline: "La borne intelligente la plus compacte du marché mondial",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé commutable",
    maxCurrentAmps: 32,
    connectorType: "Câble attaché Type 2 (5 m ou 7 m)",
    cableIncluded: true,
    cableLengthMeters: 5.0,
    dynamicLoadShedding: "Power Boost (via compteur d'énergie Carlo Gavazzi en option)",
    solarCompatibility: "Mode Eco-Smart (charge 100% énergie solaire ou mixte)",
    ipRating: "IP54 / IK08",
    connectivity: ["Wi-Fi", "Bluetooth", "myWallbox Cloud", "OCPP 1.6J"],
    protectionRequired: "Différentiel Type A classique (détection fuite DC 6mA intégrée)",
    estimatedHardwarePrice: "599 € à 749 € TTC",
    averageInstalledPrice: "1 250 € à 1 590 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "Amazon / ManoMano",
    affiliateUrl: "/go/wallbox-pulsar-plus",
    pros: [
      "Format de poche (16 cm de côté pour seulement 1 kg), discrète sur façade",
      "Application myWallbox très complète avec programmation horaire et historique des dépenses en euros",
      "Mode solaire Eco-Smart très efficace"
    ],
    cons: [
      "Boîtier Power Boost vendu en supplément pour le délestage dynamique (environ 120 €)",
      "Câble attaché (non T2S)",
      "Coque plastique légère par rapport aux standards industriels"
    ],
    verdict: "Le best-seller pour les garages résidentiels exigus grâce à son encombrement minimaliste et son interface mobile ultra-intuitive.",
    suitableVehicles: ["Tesla Model 3 / Y", "Kia EV6", "Hyundai Ioniq 5", "Fiat 500e", "Cupra Born"],
    rating: 4.6,
    reviewCount: 2900,
    faq: [
      {
        question: "La Wallbox Pulsar Plus permet-elle de charger en heures creuses ?",
        answer: "Oui, l'application myWallbox permet de définir des plages horaires strictes pour que la charge démarre automatiquement pendant vos heures creuses EDF ou Tempo."
      }
    ]
  },
  {
    slug: "wallbox-pulsar-max",
    image: "/images/chargers/wallbox-pulsar-max.png",
    brand: "Wallbox",
    modelName: "Pulsar Max",
    tagline: "L'évolution blindée de la Pulsar avec résistance IK10 et commande vocale",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé commutable",
    maxCurrentAmps: 32,
    connectorType: "Câble attaché Type 2 (5 m ou 7 m)",
    cableIncluded: true,
    cableLengthMeters: 5.0,
    dynamicLoadShedding: "Power Boost intelligent compatible TIC",
    solarCompatibility: "Eco-Smart complet (Full Green ou Eco Mode)",
    ipRating: "IP55 / IK10 (Ultra robuste pour extérieur exposé)",
    connectivity: ["Wi-Fi", "Bluetooth", "Alexa / Google Assistant", "OCPP"],
    protectionRequired: "Type A + disjoncteur adapté",
    estimatedHardwarePrice: "749 € à 899 € TTC",
    averageInstalledPrice: "1 390 € à 1 790 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "ManoMano / Amazon",
    affiliateUrl: "/go/wallbox-pulsar-max",
    pros: [
      "Finition mate texturée ultra-résistante aux rayures et indice anti-chocs IK10",
      "Commande vocale compatible Alexa et Google Assistant",
      "Partage d'énergie entre plusieurs bornes sur le même tableau"
    ],
    cons: [
      "Tarif en hausse par rapport à la Pulsar Plus",
      "Nécessite le compteur de mesure externe pour le délestage"
    ],
    verdict: "La version tout-terrain de Wallbox, recommandée si la borne est installée en extérieur sur un poteau ou sur une façade exposée aux intempéries.",
    suitableVehicles: ["Audi Q4 e-tron", "Skoda Enyaq", "Volvo EX30", "Renault Scenic E-Tech"],
    rating: 4.7,
    reviewCount: 940,
    faq: [
      {
        question: "Quelle est la différence entre la Pulsar Plus et la Pulsar Max ?",
        answer: "La Pulsar Max bénéficie d'une coque renforcée IK10, d'un processeur plus rapide, d'une compatibilité avec les assistants vocaux et d'une installation simplifiée pour l'électricien."
      }
    ]
  },
  {
    slug: "hager-witty-start",
    image: "/images/chargers/hager-witty-start.png",
    brand: "Hager",
    modelName: "Witty Start (XEV1K)",
    tagline: "La robustesse industrielle française, la borne préférée des électriciens IRVE",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé commutable",
    maxCurrentAmps: 32,
    connectorType: "Prise T2S avec obturateurs (Norme française)",
    cableIncluded: false,
    dynamicLoadShedding: "Délestage direct par liaison filaire avec la TIC du Linky",
    solarCompatibility: "Compatible recharge solaire via gestionnaire d'énergie Hager",
    ipRating: "IP54 / IK10",
    connectivity: ["Filaire TIC Linky", "Verrouillage à clé", "Carte de communication optionnelle"],
    protectionRequired: "Disjoncteur courbe C 40A + différentiel 30mA Type A Hi / SI",
    estimatedHardwarePrice: "790 € à 950 € TTC",
    averageInstalledPrice: "1 350 € à 1 750 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "Distributeur Pro / Rexel",
    affiliateUrl: "/go/hager-witty-start",
    pros: [
      "Fiabilité légendaire de la marque alsacienne Hager : quasi zéro retour SAV",
      "Prise T2S robuste avec verrouillage mécanique du câble pendant la charge",
      "Délestage TIC Linky natif sans module électronique fragile"
    ],
    cons: [
      "Design austère et volumineux",
      "Pas de Wi-Fi natif sur la version Start (connectivité en option sur version Premium)",
      "Prix du matériel élevé chez les grossistes"
    ],
    verdict: "La borne 'blindée' que les artisans installent les yeux fermés. Moins gadget que les autres, mais d'une longévité à toute épreuve.",
    suitableVehicles: ["Tous véhicules électriques et hybrides rechargeables"],
    rating: 4.8,
    reviewCount: 2150,
    faq: [
      {
        question: "Pourquoi les électriciens recommandent-ils souvent Hager Witty ?",
        answer: "Hager est le fabricant de référence du tableau électrique en France. Ses bornes sont faciles à raccorder, extrêmement fiables et disposent d'un SAV basé en Alsace."
      }
    ]
  },
  {
    slug: "hager-witty-solar",
    image: "/images/chargers/hager-witty-solar.png",
    brand: "Hager",
    modelName: "Witty Solaire (XEV1K-Solar)",
    tagline: "La recharge optimisée pour les maisons avec panneaux photovoltaïques",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé",
    maxCurrentAmps: 32,
    connectorType: "Prise T2S avec obturateurs",
    cableIncluded: false,
    dynamicLoadShedding: "Inclus avec tore de mesure et pilotage TIC",
    solarCompatibility: "100% optimisé pour absorber le surplus solaire en temps réel",
    ipRating: "IP54 / IK10",
    connectivity: ["Application Hager Flow", "Wi-Fi / Ethernet", "OCPP"],
    protectionRequired: "Différentiel Type A Hi + disjoncteur dédié",
    estimatedHardwarePrice: "1 050 € à 1 290 € TTC",
    averageInstalledPrice: "1 690 € à 2 150 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "Distributeur Spécialisé",
    affiliateUrl: "/go/hager-witty-solar",
    pros: [
      "Permet de rouler 'gratuitement' grâce au surplus de vos panneaux solaires",
      "Transition automatique mono/triphasé pour démarrer la charge solaire dès 1,4 kW de production",
      "Qualité de fabrication irréprochable"
    ],
    cons: [
      "Investissement de départ élevé",
      "Nécessite une installation photovoltaïque d'au moins 3 kWc pour être rentable"
    ],
    verdict: "L'arme absolue pour rentabiliser vos panneaux solaires sans réinjecter votre électricité à bas prix sur le réseau.",
    suitableVehicles: ["Tesla Model Y", "Renault R5", "Peugeot e-208", "Hyundai Kona"],
    rating: 4.7,
    reviewCount: 420,
    faq: [
      {
        question: "À partir de quelle puissance solaire la borne Hager démarre-t-elle ?",
        answer: "Elle démarre dès 6A en monophasé, soit environ 1 380 Watts de surplus solaire disponible sur votre toiture."
      }
    ]
  },
  {
    slug: "legrand-green-up-one",
    image: "/images/chargers/legrand-green-up-one.png",
    brand: "Legrand",
    modelName: "Green'up One",
    tagline: "La simplicité Legrand au service de la recharge sécurisée",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé",
    maxCurrentAmps: 32,
    connectorType: "Prise T2S avec obturateurs",
    cableIncluded: false,
    dynamicLoadShedding: "Compatible TIC Linky et compteur d'énergie Legrand",
    solarCompatibility: "Pilotage possible via l'application Legrand Home + Control",
    ipRating: "IP54 / IK08",
    connectivity: ["Bluetooth", "Wi-Fi", "Application Home + Control"],
    protectionRequired: "Disjoncteur différentiel Legrand dédié",
    estimatedHardwarePrice: "690 € à 850 € TTC",
    averageInstalledPrice: "1 290 € à 1 600 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "ManoMano / Leroy Merlin Pro",
    affiliateUrl: "/go/legrand-green-up-one",
    pros: [
      "Intégration native dans l'application Legrand Home + Control (avec vos interrupteurs et prises)",
      "Très simple d'utilisation pour toute la famille",
      "Fabricant français historique, disponibilité immédiate des pièces"
    ],
    cons: [
      "Fonctionnalités avancées de suivi d'énergie moins poussées que Wallbox",
      "Câble non inclus"
    ],
    verdict: "Idéal pour les foyers déjà équipés d'appareillages connectés Legrand Netatmo, pour centraliser toute la maison dans une seule application.",
    suitableVehicles: ["Tous véhicules électriques"],
    rating: 4.5,
    reviewCount: 1100,
    faq: [
      {
        question: "Peut-on programmer la charge avec Legrand Green'up One ?",
        answer: "Oui, via l'application smartphone Legrand Home + Control en Bluetooth ou Wi-Fi."
      }
    ]
  },
  {
    slug: "legrand-prise-green-up",
    image: "/images/chargers/legrand-prise-green-up.png",
    brand: "Legrand",
    modelName: "Prise Renforcée Green'up Access (Pack complet)",
    tagline: "La solution la plus économique et sécurisée pour les petits rouleurs",
    category: "Prise renforcée",
    maxPowerKw: 3.7,
    voltage: "Monophasé (230V)",
    maxCurrentAmps: 16,
    connectorType: "Prise domestique renforcée avec contact magnétique breveté",
    cableIncluded: false,
    dynamicLoadShedding: "Non nécessaire (puissance limitée à 3,7 kW / 16A)",
    solarCompatibility: "Charge de base",
    ipRating: "IP66 / IK08 (Étanche jets d'eau puissants)",
    connectivity: ["Non connecté (mécanique)"],
    protectionRequired: "Disjoncteur différentiel 20A 30mA Type F / Hpi (fourni dans le pack)",
    estimatedHardwarePrice: "160 € à 210 € TTC (Pack prise + disjoncteur)",
    averageInstalledPrice: "450 € à 750 € TTC posé par électricien",
    taxCreditEligible: false,
    tvaRate: "10 % (logement > 2 ans)",
    affiliateStore: "Amazon / ManoMano",
    affiliateUrl: "/go/prise-green-up",
    pros: [
      "Coût imbattable : 3 fois moins cher qu'une borne de recharge",
      "Sécurité totale : contacts argentés évitant toute surchauffe par rapport à une prise standard",
      "Étanche IP66, parfaite sur une façade ou dans un jardin"
    ],
    cons: [
      "Recharge lente : environ 15 à 20 km d'autonomie récupérés par heure (nuit complète requise)",
      "Non éligible au crédit d'impôt borne de 500 €",
      "Pas de connectivité ni de délestage automatique"
    ],
    verdict: "La solution parfaite pour les hybrides rechargeables (PHEV) ou les conducteurs parcourant moins de 50 km par jour avec une citadine.",
    suitableVehicles: ["Peugeot 308 Hybride", "Renault Captur E-Tech", "Dacia Spring", "Toyota Yaris Cross", "Citroën ë-C3"],
    rating: 4.8,
    reviewCount: 6200,
    faq: [
      {
        question: "Pourquoi ne pas charger sur une prise domestique standard plutôt qu'une Green'up ?",
        answer: "Une prise standard n'est pas conçue pour délivrer 10A à 16A en continu pendant 8 heures. Le risque d'échauffement des câbles et d'incendie est réel. La prise Green'up dispose de contacts renforcés et d'un disjoncteur différentiel dédié."
      }
    ]
  },
  {
    slug: "myenergi-zappi-v2",
    image: "/images/chargers/myenergi-zappi.png",
    brand: "MyEnergi",
    modelName: "Zappi V2.1",
    tagline: "La reine incontestée de la recharge solaire avec 3 modes intelligents",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé",
    maxCurrentAmps: 32,
    connectorType: "Prise T2S ou Câble attaché (selon version)",
    cableIncluded: true,
    cableLengthMeters: 6.5,
    dynamicLoadShedding: "Inclus via capteurs CT (tores de mesure sans fil)",
    solarCompatibility: "La référence mondiale : modes ECO, ECO+ (100% solaire) et FAST",
    ipRating: "IP65 (Excellente étanchéité)",
    connectivity: ["Wi-Fi intégré", "Ethernet", "Application MyEnergi"],
    protectionRequired: "Protection DC 6mA intégrée, différentiel Type A suffisant",
    estimatedHardwarePrice: "980 € à 1 190 € TTC",
    averageInstalledPrice: "1 550 € à 2 050 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "ManoMano / Distributeur Solaire",
    affiliateUrl: "/go/myenergi-zappi",
    pros: [
      "Mode ECO+ : ne charge la voiture que si vos panneaux solaires produisent du surplus net",
      "Écran LCD intégré pour piloter la borne sans ouvrir son smartphone",
      "Tores de mesure sans fil harvi très faciles à installer dans le tableau"
    ],
    cons: [
      "Design volumineux très typé 'technologique'",
      "Prix du matériel élevé",
      "Notice et paramétrages techniques pouvant dérouter les novices"
    ],
    verdict: "Le graal pour les propriétaires de panneaux solaires qui veulent maximiser leur taux d'autoconsommation et charger leur batterie à 0 euro.",
    suitableVehicles: ["Tesla Model 3 / Y", "Kia EV6", "Hyundai Ioniq 5 / 6", "Renault Megane E-Tech"],
    rating: 4.8,
    reviewCount: 1650,
    faq: [
      {
        question: "Comment fonctionne le mode ECO+ de la Zappi ?",
        answer: "La Zappi surveille en temps réel ce que votre maison consomme et ce que vos panneaux solaires produisent. S'il y a plus de 1,4 kW de surplus réinjecté, elle envoie exactement cette énergie dans la batterie du véhicule. Si un nuage passe, elle met la charge en pause."
      }
    ]
  },
  {
    slug: "abb-terra-ac",
    image: "/images/chargers/abb-terra-ac.png",
    brand: "ABB",
    modelName: "Terra AC Wallbox",
    tagline: "Le savoir-faire de l'électronique industrielle au service de votre domicile",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé",
    maxCurrentAmps: 32,
    connectorType: "Prise T2S avec obturateurs",
    cableIncluded: false,
    dynamicLoadShedding: "Compatible compteur d'énergie Modbus et gestion dynamique",
    solarCompatibility: "Intégration domotique",
    ipRating: "IP54 / IK10",
    connectivity: ["Wi-Fi", "Bluetooth", "Ethernet", "Lecteur RFID", "OCPP 1.6J"],
    protectionRequired: "Type A classique (détection DC 6mA incluse)",
    estimatedHardwarePrice: "750 € à 920 € TTC",
    averageInstalledPrice: "1 350 € à 1 700 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "Distributeur Pro",
    affiliateUrl: "/go/abb-terra-ac",
    pros: [
      "Composants de qualité industrielle ABB conçus pour durer 15 ans",
      "Lecteur de badge RFID inclus pour verrouiller la borne contre le vol d'électricité",
      "Compteur d'énergie certifié MID intégré (idéal pour notes de frais d'entreprise)"
    ],
    cons: [
      "Application mobile TerraConfig un peu austère",
      "Configuration initiale réservée aux installateurs aguerris"
    ],
    verdict: "Particulièrement recommandée pour les professions libérales et salariés avec véhicule de fonction qui doivent refacturer leurs recharges à domicile à leur employeur.",
    suitableVehicles: ["Véhicules de fonction", "Flottes d'entreprises", "Tous VE"],
    rating: 4.6,
    reviewCount: 880,
    faq: [
      {
        question: "À quoi sert la certification MID sur la borne ABB ?",
        answer: "La certification MID garantit la précision légale de la mesure d'électricité consommée. Elle est exigée par les entreprises pour rembourser fiscalement les recharges à domicile des salariés."
      }
    ]
  },
  {
    slug: "autel-maxicharger",
    image: "/images/chargers/autel-maxicharger.png",
    brand: "Autel",
    modelName: "MaxiCharger AC Wallbox",
    tagline: "La technologie de pointe avec triple connectivité 4G/Wi-Fi et design moderne",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé",
    maxCurrentAmps: 32,
    connectorType: "Prise T2S ou câble attaché",
    cableIncluded: false,
    dynamicLoadShedding: "Délestage dynamique via tore Autel",
    solarCompatibility: "Compatible solaire",
    ipRating: "IP65 / IK08",
    connectivity: ["4G (en option)", "Wi-Fi", "Bluetooth", "Ethernet", "RFID", "OCPP 1.6J"],
    protectionRequired: "Type A (protection DC intégrée)",
    estimatedHardwarePrice: "620 € à 780 € TTC",
    averageInstalledPrice: "1 250 € à 1 580 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "Amazon / ManoMano",
    affiliateUrl: "/go/autel-maxicharger",
    pros: [
      "Option carte SIM 4G idéale pour les box de parking en sous-sol sans Wi-Fi",
      "Application Autel Charge parmi les plus fluides du marché",
      "Rapport équipement / prix très agressif"
    ],
    cons: [
      "Marque plus récente sur le marché français que Schneider ou Legrand",
      "Câble en sus sur version T2S"
    ],
    verdict: "La solution de choix pour les parkings souterrains de copropriété grâce à sa connectivité 4G autonome.",
    suitableVehicles: ["Tesla", "Peugeot", "Renault", "MG4", "BYD Seal"],
    rating: 4.5,
    reviewCount: 710,
    faq: [
      {
        question: "Comment connecter une borne dans un sous-sol sans Wi-Fi ?",
        answer: "La borne Autel avec modem 4G intégré fonctionne avec une simple carte SIM de données, vous permettant de piloter la borne même au 2ème sous-sol."
      }
    ]
  },
  {
    slug: "evbox-elvi",
    image: "/images/chargers/evbox-elvi.png",
    brand: "EVBox",
    modelName: "Elvi V2",
    tagline: "La borne modulaire et évolutive fabriquée aux Pays-Bas",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé",
    maxCurrentAmps: 32,
    connectorType: "Prise T2S ou Câble attaché",
    cableIncluded: false,
    dynamicLoadShedding: "Smart Charging avec compteur d'énergie",
    solarCompatibility: "Intégrable",
    ipRating: "IP55 / IK10",
    connectivity: ["Wi-Fi", "4G", "RFID", "OCPP"],
    protectionRequired: "Type A classique",
    estimatedHardwarePrice: "790 € à 980 € TTC",
    averageInstalledPrice: "1 390 € à 1 790 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "Distributeur Pro",
    affiliateUrl: "/go/evbox-elvi",
    pros: [
      "Architecture modulaire en 3 pièces clipsables, très facile à faire évoluer",
      "Câble facilement interchangeable si vous passez d'un câble 5m à 8m",
      "Robuste et élégante"
    ],
    cons: [
      "Plateforme logicielle de supervision historique payante pour certaines fonctionnalités",
      "Prix du matériel élevé"
    ],
    verdict: "Une borne haut de gamme pour les utilisateurs qui veulent une installation évolutive sur 10 ans.",
    suitableVehicles: ["Porsche Taycan", "Audi e-tron", "Mercedes EQE", "BMW iX3"],
    rating: 4.4,
    reviewCount: 1150,
    faq: [
      {
        question: "Que signifie la modularité de l'EVBox Elvi ?",
        answer: "Le socle mural est fixé définitivement. Le bloc de charge et le câble se clipsent dessus et peuvent être remplacés ou mis à niveau en 2 minutes sans toucher au câblage électrique."
      }
    ]
  },
  {
    slug: "alfen-eve-single-pro",
    image: "/images/chargers/alfen-eve-single.png",
    brand: "Alfen",
    modelName: "Eve Single Pro-line",
    tagline: "L'écran couleur et l'intelligence de réseau des pays nordiques",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé / Triphasé",
    maxCurrentAmps: 32,
    connectorType: "Prise T2S avec obturateurs",
    cableIncluded: false,
    dynamicLoadShedding: "Gestion dynamique de charge et répartition de flotte (Load Balancing)",
    solarCompatibility: "Compatible recharge solaire dynamique",
    ipRating: "IP54 / IK10",
    connectivity: ["Écran couleur 3,5 pouces", "Ethernet", "4G", "RFID", "OCPP"],
    protectionRequired: "Type A classique (protection 6mA DC interne)",
    estimatedHardwarePrice: "950 € à 1 200 € TTC",
    averageInstalledPrice: "1 600 € à 2 100 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "Distributeur Pro Spécialisé",
    affiliateUrl: "/go/alfen-eve-single",
    pros: [
      "Magnifique écran couleur affichant le coût en direct, la vitesse et le temps restant",
      "Gestionnaire de charge de groupe le plus performant du marché (recharge de 2 à 20 véhicules simultanés)",
      "Matériel néerlandais ultra-fiable"
    ],
    cons: [
      "L'une des bornes les plus chères du marché",
      "Surdimensionnée pour un usage domestique simple"
    ],
    verdict: "Le summum pour les copropriétés haut de gamme, les gîtes et les professions libérales avec parking client.",
    suitableVehicles: ["Tous véhicules"],
    rating: 4.8,
    reviewCount: 920,
    faq: [
      {
        question: "Pourquoi choisir Alfen pour une entreprise ou une profession libérale ?",
        answer: "Son écran couleur personnalisable permet d'afficher les instructions claires et un logo, et son lecteur RFID permet de facturer les clients ou employés en toute simplicité."
      }
    ]
  },
  {
    slug: "sma-ev-charger",
    image: "/images/chargers/sma-ev-charger.png",
    brand: "SMA",
    modelName: "SMA EV Charger 7.4 / 22",
    tagline: "La borne native pour les propriétaires d'onduleurs solaires SMA",
    category: "Borne de recharge",
    maxPowerKw: 22,
    voltage: "Monophasé (7.4 kW) ou Triphasé (22 kW)",
    maxCurrentAmps: 32,
    connectorType: "Câble attaché Type 2 (5 m)",
    cableIncluded: true,
    cableLengthMeters: 5.0,
    dynamicLoadShedding: "Intégrée avec le SMA Home Manager 2.0",
    solarCompatibility: "Optimisation solaire prédictive météo via SMA Sunny Portal",
    ipRating: "IP65 / IK08",
    connectivity: ["Wi-Fi", "Ethernet", "SMA Energy App"],
    protectionRequired: "Type A (protection DC intégrée)",
    estimatedHardwarePrice: "1 150 € à 1 450 € TTC",
    averageInstalledPrice: "1 750 € à 2 250 € TTC posé par pro IRVE",
    taxCreditEligible: true,
    tvaRate: "5,5 %",
    affiliateStore: "Distributeur Solaire",
    affiliateUrl: "/go/sma-ev-charger",
    pros: [
      "Prévision météo intégrée pour planifier la recharge aux heures de pic d'ensoleillement",
      "Commutation automatique monophasé / triphasé pour optimiser même les petits surplus solaires",
      "Écosystème SMA allemand de très haute réputation"
    ],
    cons: [
      "Très onéreuse si vous n'avez pas déjà un onduleur SMA",
      "Câble attaché non démontable"
    ],
    verdict: "Indispensable si votre toit est équipé d'un onduleur SMA Sunny Boy ou Sunny Tripower.",
    suitableVehicles: ["Tous véhicules électriques"],
    rating: 4.7,
    reviewCount: 390,
    faq: [
      {
        question: "Faut-il obligatoirement des panneaux solaires pour utiliser la borne SMA ?",
        answer: "Non, elle fonctionne comme une borne standard connectée au réseau. Mais sa valeur ajoutée unique réside dans sa communication native avec le Sunny Home Manager."
      }
    ]
  }
];
