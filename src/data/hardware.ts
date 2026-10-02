export interface HardwareProduct {
  slug: string;
  publishedAt: string;
  updatedAt: string;
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
  associatedDuelSlugs?: string[];
  associatedOperatorSlugs?: string[];
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
    publishedAt: "2025-09-15",
    updatedAt: "2026-09-20",
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
    associatedDuelSlugs: ["tesla-wall-connector-vs-wallbox-pulsar-plus"],
    associatedOperatorSlugs: ["enedis-colonne-horizontale"],
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
      },
      {
        question: "Le Wall Connector Tesla est-il compatible avec les voitures électriques non-Tesla ?",
        answer: "Oui, il est équipé d'un câble attaché avec connecteur Type 2 standard européen et recharge 100 % des véhicules électriques (Renault, Peugeot, Volkswagen, BMW, Hyundai, etc.)."
      },
      {
        question: "Peut-on l'installer en monophasé 7,4 kW ou triphasé 22 kW ?",
        answer: "Le Wall Connector est commutable : il peut être câblé en monophasé 230V jusqu'à 32A (7,4 kW) ou en triphasé 400V jusqu'à 32A (22 kW) selon votre abonnement électrique."
      },
      {
        question: "Le câble de 7,3 mètres est-il pratique au quotidien ?",
        answer: "La longueur de 7,3 m est l'une des plus généreuses du marché, permettant de recharger facilement que la voiture soit garée en marche avant ou en marche arrière sans déplacer le véhicule."
      }
    ]
  },
  {
    slug: "schneider-charge",
    publishedAt: "2025-09-22",
    updatedAt: "2026-09-21",
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
    associatedDuelSlugs: ["schneider-charge-vs-hager-witty", "prise-green-up-vs-borne-7kw", "legrand-green-up-one-vs-schneider-charge"],
    associatedOperatorSlugs: ["chargeguru","izi-by-edf","proxiserve","totalenergies","enedis-colonne-horizontale"],
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
      },
      {
        question: "La borne Schneider Charge est-elle conforme à la norme NF C 15-100 ?",
        answer: "Oui, elle dispose d'une prise T2S avec obturateurs de sécurité enfants, exigence réglementaire absolue en France pour les installations résidentielles privées."
      },
      {
        question: "Comment fonctionne l'application Wiser avec la borne Schneider Charge ?",
        answer: "L'application mobile gratuite Wiser permet de programmer la recharge pendant les heures creuses, de suivre la consommation en kWh et en euros, et de verrouiller la borne à distance en Wi-Fi."
      },
      {
        question: "Quel est le temps nécessaire pour recharger une batterie de 60 kWh sur Schneider Charge ?",
        answer: "À 7,4 kW (32A monophasé), il faut environ 7h30 pour récupérer 100 % d'autonomie (soit environ 40 km d'autonomie par heure de charge)."
      },
      {
        question: "Faut-il un disjoncteur spécifique pour Schneider Charge ?",
        answer: "Oui, la réglementation impose un disjoncteur 40A courbe C associé à un interrupteur différentiel 30mA Type F (ou Type B) pour sécuriser le circuit contre les courants résiduels continus."
      }
    ]
  },
  {
    slug: "wallbox-pulsar-plus",
    publishedAt: "2025-09-29",
    updatedAt: "2026-09-22",
    image: "/images/chargers/wallbox-pulsar-plus.png",
    associatedDuelSlugs: ["tesla-wall-connector-vs-wallbox-pulsar-plus", "wallbox-pulsar-plus-vs-wallbox-pulsar-max"],
    associatedOperatorSlugs: ["chargeguru", "totalenergies", "mon-rezo"],
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
      },
      {
        question: "Comment activer le délestage dynamique Power Boost sur la Wallbox Pulsar Plus ?",
        answer: "Le module de délestage Power Boost s'installe dans le tableau électrique et communique via un câble blindé avec la borne pour moduler la puissance en temps réel selon la consommation des autres appareils de la maison."
      },
      {
        question: "Peut-on recharger avec l'énergie solaire grâce à la fonction Eco-Smart ?",
        answer: "Oui, l'application myWallbox propose deux modes solaires : le mode Full Green (recharge 100 % à l'énergie solaire excédentaire) et le mode Eco (mix énergie solaire + réseau)."
      },
      {
        question: "La Wallbox Pulsar Plus peut-elle être installée en extérieur ?",
        answer: "Oui, son boîtier étanche est certifié IP54 contre la pluie et la poussière et résiste aux impacts avec un indice IK08."
      },
      {
        question: "Quelle est la garantie constructeur de la Pulsar Plus ?",
        answer: "Wallbox offre une garantie de 3 ans pièces, extensible jusqu'à 5 ans via leur service de garantie prolongée."
      }
    ]
  },
  {
    slug: "wallbox-pulsar-max",
    publishedAt: "2025-10-06",
    updatedAt: "2026-09-23",
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
    associatedDuelSlugs: ["wallbox-pulsar-plus-vs-wallbox-pulsar-max"],
    associatedOperatorSlugs: ["chargeguru"],
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
      },
      {
        question: "Quelles sont les différences entre la Pulsar Max et la Pulsar Plus ?",
        answer: "La Pulsar Max bénéficie d'une coque renforcée certifiée IK10 (résistance maximale aux chocs), de la compatibilité avec commande vocale (Alexa et Google Assistant), d'un support mural Easy-install plus rapide pour l'installateur et d'un processeur plus rapide."
      },
      {
        question: "La Pulsar Max est-elle éligible au crédit d'impôt de 500 € ?",
        answer: "Oui, étant un système de charge pilotable installé par un technicien qualifié IRVE, elle ouvre droit au crédit d'impôt de 500 € et à la TVA à 5,5 %."
      },
      {
        question: "Peut-on partager la puissance entre deux bornes Pulsar Max ?",
        answer: "Oui, la fonctionnalité Power Sharing permet de connecter jusqu'à 25 bornes Wallbox sur le même circuit électrique avec répartition automatique et équitable de la puissance disponible."
      },
      {
        question: "Quelle application utiliser pour piloter la Pulsar Max ?",
        answer: "L'application myWallbox (iOS et Android) ou le portail web myWallbox permettent la programmation horaire, le suivi des coûts et le verrouillage automatique de la borne."
      }
    ]
  },
  {
    slug: "hager-witty-start",
    publishedAt: "2025-10-14",
    updatedAt: "2026-09-24",
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
    associatedDuelSlugs: ["schneider-charge-vs-hager-witty", "hager-witty-start-vs-hager-witty-solar"],
    associatedOperatorSlugs: ["chargeguru","izi-by-edf","proxiserve","bornes-solutions"],
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
      },
      {
        question: "Pourquoi choisir Hager Witty Start plutôt qu'une borne connectée en Wi-Fi ?",
        answer: "La Witty Start privilégie la fiabilité mécanique et l'absence totale de pannes électroniques : pas de bugs d'application, pas de perte de réseau Wi-Fi, verrouillage sécurisé par clé physique et délestage filaire direct avec le compteur Linky."
      },
      {
        question: "Comment se branche le câble de délestage TIC Linky sur Hager Witty ?",
        answer: "Deux fils de télé-information client (TIC) relient directement les bornes I1 et I2 du compteur Linky à la carte électronique de la borne, sans nécessiter de module radio ou de passerelle payante."
      },
      {
        question: "Où est fabriquée la borne Hager Witty Start ?",
        answer: "Les bornes de la gamme Hager Witty sont intégralement conçues et fabriquées en France, dans les usines Hager situées en Alsace (Obernai)."
      },
      {
        question: "La borne Hager Witty Start est-elle garantie contre les intempéries ?",
        answer: "Oui, elle affiche un indice de protection IP54 et IK10, ce qui la rend parfaitement adaptée à une installation en extérieur non abritée sur un potelet ou sur une façade de garage."
      }
    ]
  },
  {
    slug: "hager-witty-solar",
    publishedAt: "2025-10-21",
    updatedAt: "2026-09-25",
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
    associatedDuelSlugs: ["hager-witty-start-vs-hager-witty-solar", "myenergi-zappi-vs-sma-ev-charger"],
    associatedOperatorSlugs: ["engie-my-power"],
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
      },
      {
        question: "Comment la borne Hager Witty Solaire communique-t-elle avec les panneaux photovoltaïques ?",
        answer: "Elle analyse la production solaire via le gestionnaire d'énergie Hager ou directement via les tores de mesure au tableau pour n'injecter dans la batterie que les surplus d'électricité solaire non consommés par la maison."
      },
      {
        question: "Peut-on forcer la charge rapide si le soleil ne brille pas ?",
        answer: "Oui, un simple appui sur le bouton en façade permet de basculer instantanément en mode Boost (charge à pleine puissance 7,4 kW sur le réseau) en cas d'urgence de déplacement."
      },
      {
        question: "La Hager Witty Solaire fonctionne-t-elle avec n'importe quel onduleur (Enphase, SolarEdge, SMA) ?",
        answer: "Oui, la détection des surplus se fait au niveau du tableau électrique principal et est totalement indépendante de la marque des onduleurs ou micro-onduleurs solaires."
      },
      {
        question: "Quel est le temps d'amortissement d'une borne solaire Hager ?",
        answer: "En rechargeant 60 % à 80 % de vos kilomètres annuels avec l'électricité solaire gratuite de votre toit, la borne est amortie en moyenne en 3 à 4 ans par rapport au tarif réseau standard."
      }
    ]
  },
  {
    slug: "legrand-green-up-one",
    publishedAt: "2025-10-28",
    updatedAt: "2026-09-26",
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
    associatedDuelSlugs: ["legrand-green-up-one-vs-schneider-charge"],
    associatedOperatorSlugs: ["proxiserve","zeplug"],
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
      },
      {
        question: "Quelle est la différence entre Legrand Green'up One et la prise Green'up ?",
        answer: "La prise Green'up est une prise renforcée limitée à 3,7 kW (16A), tandis que la borne Green'up One délivre jusqu'à 7,4 kW (32A) ou 22 kW (triphasé), soit une charge 2 à 3 fois plus rapide, avec éligibilité au crédit d'impôt de 500 €."
      },
      {
        question: "La borne Legrand Green'up One est-elle fabriquée en France ?",
        answer: "Oui, Legrand est un groupe industriel français basé à Limoges et conçoit ses solutions de recharge selon les normes de sécurité les plus strictes."
      },
      {
        question: "L'application Legrand Home + Control gère-t-elle la borne ?",
        answer: "Oui, la borne Green'up One s'intègre nativement dans l'écosystème Legrand Home + Control aux côtés de vos interrupteurs, thermostats et disjoncteurs connectés."
      },
      {
        question: "Peut-on brider la puissance de la borne Green'up One ?",
        answer: "L'installateur IRVE peut configurer la borne à 3,7 kW, 4,6 kW, 5,8 kW ou 7,4 kW selon la capacité de votre abonnement électrique existant."
      }
    ]
  },
  {
    slug: "legrand-prise-green-up",
    publishedAt: "2025-11-05",
    updatedAt: "2026-09-27",
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
    associatedDuelSlugs: ["prise-green-up-vs-borne-7kw"],
    associatedOperatorSlugs: ["proxiserve"],
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
      },
      {
        question: "Pourquoi une prise Green'up charge-t-elle plus vite qu'une prise classique ?",
        answer: "La prise Green'up intègre un aimant breveté détecté par le câble de recharge du véhicule (câble avec système Green'up), autorisant une puissance continue de 16A (3,7 kW) sans risque d'échauffement, contre 8A à 10A (2,3 kW) sur une prise standard."
      },
      {
        question: "Quel disjoncteur différentiel doit obligatoirement protéger la prise Green'up ?",
        answer: "Le pack Green'up comprend obligatoirement un disjoncteur différentiel 20A courbe C, 30mA Type F (ou Hpi) pour couper le circuit en cas de fuite de courant."
      },
      {
        question: "La prise Green'up convient-elle pour une Tesla ou une grosse batterie ?",
        answer: "Elle convient si vous roulez moins de 40 à 50 km par jour. En revanche, pour remplir une batterie de 60 kWh de 20 % à 80 %, il faudra compter environ 12 à 14 heures de charge."
      },
      {
        question: "Peut-on installer la prise Green'up en extérieur sous la pluie ?",
        answer: "Oui, la prise Green'up Plexo est certifiée IP66 (étanche aux jets d'eau puissants) et IK08 (résistance aux chocs), idéale sur un mur extérieur ou un potelet de jardin."
      }
    ]
  },
  {
    slug: "myenergi-zappi-v2",
    publishedAt: "2025-11-13",
    updatedAt: "2026-09-28",
    image: "/images/chargers/myenergi-zappi.png",
    associatedDuelSlugs: ["myenergi-zappi-vs-sma-ev-charger"],
    associatedOperatorSlugs: ["engie-my-power"],
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
      },
      {
        question: "Pourquoi la borne Zappi est-elle considérée comme la meilleure pour le solaire ?",
        answer: "La Zappi dispose de 3 modes intelligents uniques : Eco (maintient la puissance minimale avec apport réseau si besoin), Eco+ (charge UNIQUEMENT avec 100 % de surplus solaire gratuit, pause automatique si un nuage passe) et Fast (charge maximale 7,4 kW ou 22 kW)."
      },
      {
        question: "Faut-il installer un boîtier de communication Harvi avec la Zappi ?",
        answer: "Le boîtier sans fil Harvi est fortement recommandé car il évite de tirer un câble entre le compteur électrique et la borne en transmettant les données de production solaire par radio."
      },
      {
        question: "La Zappi est-elle compatible avec les batteries domestiques (Tesla Powerwall, etc.) ?",
        answer: "Oui, elle gère intelligemment la priorité de charge entre la batterie domestique de la maison et la batterie du véhicule électrique."
      },
      {
        question: "Peut-on verrouiller l'accès à la borne Zappi ?",
        answer: "Oui, elle intègre un code PIN de sécurité sur son écran LCD pour empêcher toute utilisation non autorisée si elle est installée dans une allée accessible."
      }
    ]
  },
  {
    slug: "abb-terra-ac",
    publishedAt: "2025-11-21",
    updatedAt: "2026-09-29",
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
    associatedDuelSlugs: ["abb-terra-ac-vs-autel-maxicharger"],
    associatedOperatorSlugs: ["chargeguru","waat"],
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
      },
      {
        question: "Quelles sont les caractéristiques de l'ABB Terra AC Wallbox ?",
        answer: "L'ABB Terra AC offre une connectivité complète (Wi-Fi, Bluetooth, Ethernet, 4G optionnelle), un lecteur de badges RFID intégré, un compteur de kWh certifié MID et une compatibilité OCPP 1.6J pour la supervision."
      },
      {
        question: "L'ABB Terra AC est-elle adaptée pour une copropriété ou une entreprise ?",
        answer: "C'est l'une des bornes les plus utilisées en résidentiel collectif et petit tertiaire grâce à son authentification par carte RFID et sa gestion fine des droits d'accès."
      },
      {
        question: "Quelle est l'application mobile pour piloter la borne ABB ?",
        answer: "L'application TerraConfig permet à l'installateur de paramétrer la borne, et l'application ChargerSync permet à l'utilisateur de suivre ses sessions de charge et ses dépenses."
      },
      {
        question: "La borne ABB Terra AC dispose-t-elle d'un délestage dynamique ?",
        answer: "Oui, elle peut être raccordée à un compteur d'énergie compatible Modbus pour adapter sa puissance de charge et éviter toute disjonction générale."
      }
    ]
  },
  {
    slug: "autel-maxicharger",
    publishedAt: "2025-11-28",
    updatedAt: "2026-09-30",
    image: "/images/chargers/autel-maxicharger.png",
    associatedDuelSlugs: ["abb-terra-ac-vs-autel-maxicharger"],
    associatedOperatorSlugs: ["chargeguru"],
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
      },
      {
        question: "Quels sont les atouts de la borne Autel MaxiCharger AC ?",
        answer: "Elle se distingue par un design ultra-moderne avec indicateur LED dynamique, une triple connectivité (4G, Wi-Fi, Bluetooth), un lecteur RFID et une application mobile très poussée avec diagnostic de santé de batterie."
      },
      {
        question: "L'Autel MaxiCharger fonctionne-t-elle sans connexion Internet ?",
        answer: "Oui, l'authentification par carte RFID ou par détection Bluetooth de votre smartphone permet de lancer la charge même dans un sous-sol sans couverture réseau."
      },
      {
        question: "Quelle est la résistance aux chocs de l'Autel MaxiCharger ?",
        answer: "Elle bénéficie d'une certification IP65 (étanchéité totale à la poussière et aux projections d'eau) et d'un indice IK08 contre les chocs mécaniques."
      },
      {
        question: "La borne Autel est-elle éligible aux 500 € de crédit d'impôt ?",
        answer: "Oui, lorsqu'elle est installée par un électricien certifié IRVE et bridée selon la réglementation en vigueur."
      }
    ]
  },
  {
    slug: "evbox-elvi",
    publishedAt: "2025-12-06",
    updatedAt: "2026-10-01",
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
    associatedDuelSlugs: ["alfen-eve-single-vs-evbox-elvi"],
    associatedOperatorSlugs: ["totalenergies","zeplug"],
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
      },
      {
        question: "Pourquoi la borne EVBox Elvi est-elle dite modulaire ?",
        answer: "L'EVBox Elvi est conçue en deux parties : un socle mural de fixation et une station débrochable. Elle permet de passer facilement de 3,7 kW à 22 kW ou de remplacer un composant sans réintervention lourde sur le câblage."
      },
      {
        question: "Où est fabriquée la borne EVBox Elvi ?",
        answer: "EVBox est un fabricant historique né aux Pays-Bas, l'un des pionniers européens de la mobilité électrique avec plus de 500 000 points de charge installés dans le monde."
      },
      {
        question: "L'EVBox Elvi est-elle compatible avec les badges de recharge d'entreprise ?",
        answer: "Oui, son lecteur RFID est compatible avec toutes les cartes et badges RFID standards (ISO 14443) utilisés par les gestionnaires de flotte d'entreprise."
      },
      {
        question: "Quelle application utiliser avec l'EVBox Elvi ?",
        answer: "L'application EVBox Connect permet de configurer le comportement de la borne, gérer les cartes RFID et activer l'autodémarrage sécurisé."
      }
    ]
  },
  {
    slug: "alfen-eve-single-pro",
    publishedAt: "2025-12-15",
    updatedAt: "2026-10-01",
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
    associatedDuelSlugs: ["alfen-eve-single-vs-evbox-elvi"],
    associatedOperatorSlugs: ["waat","parknplug","bornes-solutions"],
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
      },
      {
        question: "Pourquoi l'Alfen Eve Single Pro est-elle la référence des flottes et copropriétés ?",
        answer: "Elle intègre un écran couleur 3,5 pouces d'une grande clarté, un compteur d'énergie certifié MID obligatoire pour la refacturation fiscale des kWh en entreprise, et une intelligence de réseau de pointe (Smart Charging Network)."
      },
      {
        question: "La borne Alfen peut-elle être raccordée à un système de supervision tiers ?",
        answer: "Oui, Alfen est 100 % ouvert et compatible avec tous les superviseurs du marché (Waat, Freshmile, Virta, Izivia, Dreev) grâce au protocole OCPP 1.6 et 2.0.1."
      },
      {
        question: "Comment fonctionne le Smart Charging Network d'Alfen ?",
        answer: "Jusqu'à 100 bornes Alfen peuvent communiquer entre elles en réseau local pour se répartir la puissance maximale du transformateur ou du TGBT sans jamais disjoncter."
      },
      {
        question: "L'Alfen Eve Single est-elle adaptée pour un particulier en maison ?",
        answer: "Elle est parfois installée par des conducteurs exigeants ou des salariés en télétravail dont l'employeur rembourse les recharges à domicile sur relevé MID certifié."
      }
    ]
  },
  {
    slug: "sma-ev-charger",
    publishedAt: "2025-12-24",
    updatedAt: "2026-10-02",
    image: "/images/chargers/sma-ev-charger.png",
    associatedDuelSlugs: ["myenergi-zappi-vs-sma-ev-charger"],
    associatedOperatorSlugs: ["engie-my-power"],
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
      },
      {
        question: "Pourquoi choisir la borne SMA EV Charger avec une installation solaire SMA ?",
        answer: "Elle s'intègre nativement avec l'onduleur SMA et le Sunny Home Manager 2.0 pour une optimisation prédictive basée sur les prévisions météorologiques locales et vos habitudes de déplacement."
      },
      {
        question: "La borne SMA est-elle capable de basculer automatiquement de monophasé à triphasé ?",
        answer: "Oui, la borne 22 kW dispose de la commutation automatique de phase (de 1,3 kW à 22 kW), permettant de démarrer la charge solaire dès un faible ensoleillement (dès 1,3 kW de surplus)."
      },
      {
        question: "Quelle application permet de piloter la borne SMA ?",
        answer: "L'application SMA Energy permet de surveiller la production solaire, la consommation du foyer et de régler le mode de charge de la voiture en un clic."
      },
      {
        question: "La borne SMA est-elle protégée contre les surtensions ?",
        answer: "Oui, elle intègre des composants de détection et de protection industrielle avancés conformément aux standards de qualité allemands de SMA Solar Technology."
      }
    ]
  }
];
