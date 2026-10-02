export interface DuelComparison {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  entityA: {
    name: string;
    type: "Opérateur" | "Borne" | "Prise";
    slug: string;
    priceEst: string;
    pros: string[];
    cons: string[];
    targetAudience: string;
  };
  entityB: {
    name: string;
    type: "Opérateur" | "Borne" | "Prise";
    slug: string;
    priceEst: string;
    pros: string[];
    cons: string[];
    targetAudience: string;
  };
  directAnswerSummary: string; // AnswerShaper Direct Answer < 60 words for AI Overviews
  comparisonTable: {
    criteria: string;
    entityAValue: string;
    entityBValue: string;
    winner: "A" | "B" | "Égalité";
  }[];
  decisionMatrix: {
    chooseAIf: string[];
    chooseBIf: string[];
  };
  arbitrageCtaTitle: string;
  arbitrageCtaText: string;
  relatedDuelSlugs: string[];
  faq: { question: string; answer: string }[];
}

export const DUELS: DuelComparison[] = [
  {
    slug: "chargeguru-vs-izi-by-edf",
    title: "ChargeGuru vs IZI by EDF : Comparatif Prix, Avis & Délais 2026",
    metaDescription: "ChargeGuru ou IZI by EDF pour installer votre borne de recharge ? Analyse des tarifs, marges d'intermédiaires et arbitrage pour économiser 400 €.",
    h1: "ChargeGuru vs IZI by EDF : Quel Installateur Choisir en 2026 ?",
    entityA: {
      name: "ChargeGuru",
      type: "Opérateur",
      slug: "chargeguru",
      priceEst: "1 390 € à 2 100 € TTC posé",
      pros: ["Large catalogue multimarques", "Parcours client 100% digitalisé", "Présence nationale"],
      cons: ["Tarif 300 € à 500 € plus cher qu'un artisan en direct", "Qualité variable selon le sous-traitant"],
      targetAudience: "Particuliers et copropriétés cherchant une solution clé en main sans négocier."
    },
    entityB: {
      name: "IZI by EDF",
      type: "Opérateur",
      slug: "izi-by-edf",
      priceEst: "1 250 € à 1 950 € TTC posé",
      pros: ["Solidité de la marque EDF", "Offre couplée avantageuse avec EDF Vert Électrique", "Garantie de pose assurée"],
      cons: ["Catalogue de bornes restreint", "Avenants fréquents lors de la visite technique"],
      targetAudience: "Clients fidèles EDF souhaitant coupler leur borne à une offre d'électricité heures creuses."
    },
    directAnswerSummary: "IZI by EDF est légèrement plus économique sur le forfait de base et très avantageux si vous souscrivez leur contrat d'électricité dédié. ChargeGuru offre en revanche un choix de bornes bien plus vaste (Wallbox, Schneider, ABB). Toutefois, les deux groupes sous-traitent à des artisans locaux : passer en direct vous fera économiser entre 350 € et 600 €.",
    comparisonTable: [
      { criteria: "Tarif moyen pose comprise", entityAValue: "1 550 €", entityBValue: "1 420 €", winner: "B" },
      { criteria: "Choix des modèles de bornes", entityAValue: "Catalogue multimarque ouvert", entityBValue: "Schneider & Hager principalement", winner: "A" },
      { criteria: "Couplage contrat électricité", entityAValue: "Non (indépendant)", entityBValue: "Oui (Tarif Vert Électrique Auto EDF)", winner: "B" },
      { criteria: "Délai moyen d'intervention", entityAValue: "3 à 5 semaines", entityBValue: "2 à 4 semaines", winner: "B" },
      { criteria: "Éligibilité crédit d'impôt 500 €", entityAValue: "Oui (Artisans certifiés IRVE)", entityBValue: "Oui (Artisans certifiés IRVE)", winner: "Égalité" }
    ],
    decisionMatrix: {
      chooseAIf: [
        "Vous souhaitez un modèle précis de borne (ex: Wallbox Pulsar ou borne solaire Zappi)",
        "Vous préférez un accompagnement multimarques sans être poussé vers un fournisseur d'énergie",
        "Vous avez un projet en copropriété ou en entreprise"
      ],
      chooseBIf: [
        "Vous voulez coupler votre borne à un tarif d'énergie avantageux en heures creuses EDF",
        "Vous cherchez la notoriété rassurante du groupe EDF pour votre garantie",
        "Votre configuration électrique est standard et sans complexité"
      ]
    },
    arbitrageCtaTitle: "Évitez la marge d'intermédiaire de ChargeGuru et d'IZI by EDF",
    arbitrageCtaText: "Les techniciens qui interviennent pour ChargeGuru ou IZI by EDF sont des artisans électriciens IRVE indépendants de votre région. En demandant un chiffrage en direct, vous économisez 300 € à 600 € sur la même installation.",
    relatedDuelSlugs: [
      "zeplug-vs-waat",
      "schneider-charge-vs-hager-witty",
      "tesla-wall-connector-vs-wallbox-pulsar-plus"
    ],
    faq: [
      {
        question: "Qui est le moins cher entre ChargeGuru et IZI by EDF ?",
        answer: "Sur les configurations standards en maison individuelle, IZI by EDF affiche généralement un prix d'appel inférieur de 100 € à 150 €. Cependant, les suppléments de câblage sont facturés de façon similaire."
      },
      {
        question: "Les deux permettent-ils de toucher le crédit d'impôt ?",
        answer: "Oui, les deux prestataires font obligatoirement appel à des techniciens qualifiés IRVE, condition indispensable pour déduire 500 € sur votre déclaration de revenus."
      },
      {
        question: "Comment éviter la surcommission de ChargeGuru ou IZI by EDF ?",
        answer: "En effectuant une demande de devis comparatif direct auprès d'électriciens IRVE locaux sur Expert Borne Recharge, vous bénéficiez du même artisan technicien sans la marge de 28% à 38% prélevée par la plateforme nationale."
      },
      {
        question: "Quel est le délai moyen d'intervention constaté ?",
        answer: "IZI by EDF intervient en 2 à 4 semaines en moyenne, contre 3 à 5 semaines pour ChargeGuru, sous réserve de la disponibilité du matériel et du planning de l'artisan sous-traitant."
      },
      {
        question: "Que se passe-t-il en cas de panne ou SAV ?",
        answer: "Avec IZI by EDF, vous contactez le support central EDF qui mandate un technicien. ChargeGuru dispose également d'un service client centralisé mais les délais de SAV peuvent être rallongés car la responsabilité est partagée avec l'artisan poseur."
      }
    ]
  },
  {
    slug: "zeplug-vs-waat",
    title: "Zeplug vs Waat : Quel Opérateur Choisir en Copropriété en 2026 ?",
    metaDescription: "Zeplug ou Waat pour équiper votre parking de copropriété ? Comparatif des frais d'infrastructure, coût des abonnements mensuels et liberté contractuelle.",
    h1: "Zeplug vs Waat : Le Grand Match de la Recharge en Copropriété",
    entityA: {
      name: "Zeplug",
      type: "Opérateur",
      slug: "zeplug",
      priceEst: "Borne : 499-899 € + Abonnement 15,90-29,90 €/mois + kWh",
      pros: ["Zéro euro pour la copropriété", "Compteur électrique indépendant du TGBT", "Gestion locative sans souci"],
      cons: ["Abonnement obligatoire à vie pour recharger", "Prix du kWh fixé unilatéralement par Zeplug", "Système propriétaire fermé"],
      targetAudience: "Copropriétés frileuses où les copropriétaires refusent tout investissement collectif."
    },
    entityB: {
      name: "Waat",
      type: "Opérateur",
      slug: "waat",
      priceEst: "Borne : 650-1 100 € + Supervision (6-15 €/mois)",
      pros: ["Bornes interopérables répondant au protocole ouvert OCPP", "Flexibilité investissement copro ou tiers-financement", "Frais mensuels plus modérés"],
      cons: ["Démarches administratives parfois plus techniques", "Nécessite souvent une contribution financière initiale"],
      targetAudience: "Copropriétés souhaitant garder la maîtrise de leur infrastructure sans verrouillage opérateur."
    },
    directAnswerSummary: "Zeplug l'emporte sur la simplicité du vote en AG car la copropriété n'a absolument rien à débourser. En contrepartie, les utilisateurs payent un abonnement mensuel élevé et un kWh plus cher. Waat propose des bornes ouvertes au protocole OCPP et des frais récurrents plus faibles, mais exige souvent un investissement collectif initial amorti par les subventions Advenir.",
    comparisonTable: [
      { criteria: "Coût pour la copropriété au vote en AG", entityAValue: "0 € (Financement 100% Zeplug)", entityBValue: "Souvent subventionné Advenir à 50%", winner: "A" },
      { criteria: "Abonnement mensuel de l'utilisateur", entityAValue: "15,90 € à 29,90 €/mois", entityBValue: "6 € à 15 €/mois", winner: "B" },
      { criteria: "Interopérabilité (changer d'opérateur)", entityAValue: "Non (Réseau propriétaire fermé)", entityBValue: "Oui (Protocole ouvert OCPP)", winner: "B" },
      { criteria: "Prix du kWh facturé", entityAValue: "Tarif fixé par Zeplug (marge incluse)", entityBValue: "Tarif au réel selon contrat d'énergie", winner: "B" },
      { criteria: "Rapidité d'adoption en AG", entityAValue: "Très élevée (zéro dépense copro)", entityBValue: "Moyenne (débat sur l'investissement)", winner: "A" }
    ],
    decisionMatrix: {
      chooseAIf: [
        "L'Assemblée Générale rejette systématiquement les dépenses pour les véhicules électriques",
        "Vous êtes un particulier isolé et voulez faire installer une borne rapidement sans convaincre toute la résidence",
        "Vous acceptez de payer un abonnement mensuel en échange de zéro tracas de copro"
      ],
      chooseBIf: [
        "La copropriété souhaite rester propriétaire de son infrastructure et libre de changer de gestionnaire",
        "Vous voulez payer vos recharges au coût réel de l'électricité sans surtaxe d'opérateur privé",
        "Vous visez une rentabilité optimale sur 5 à 10 ans"
      ]
    },
    arbitrageCtaTitle: "Pensez aussi à la colonne horizontale Enedis !",
    arbitrageCtaText: "Avant de signer avec Zeplug ou Waat pour 10 ans, étudiez la solution publique Enedis. Financée à 100% par le TURPE, elle amène un compteur Linky à chaque place : vous payez votre électricité au tarif réglementé sans AUCUN abonnement d'opérateur privé.",
    relatedDuelSlugs: [
      "chargeguru-vs-izi-by-edf",
      "prise-green-up-vs-borne-7kw",
      "schneider-charge-vs-hager-witty"
    ],
    faq: [
      {
        question: "Zeplug est-il vraiment gratuit pour la copropriété ?",
        answer: "Oui, le syndicat des copropriétaires ne paye rien pour installer le câble d'alimentation principal dans le parking. Zeplug se rémunère uniquement sur les utilisateurs finaux via le prix de la borne, l'abonnement mensuel et la marge sur chaque kWh."
      },
      {
        question: "Peut-on résilier son abonnement Zeplug en gardant sa borne ?",
        answer: "Non, chez Zeplug la borne est indissociable du contrat d'exploitation de l'infrastructure. Si vous résiliez l'abonnement, la borne est désactivée car le courant passe par le compteur privé Zeplug."
      },
      {
        question: "Pourquoi Waat est-il considéré comme plus ouvert ?",
        answer: "Waat installe des bornes compatibles OCPP (Open Charge Point Protocol). Si la copropriété décide de changer d'opérateur de supervision après quelques années, les bornes physiques restent opérationnelles avec le nouveau prestataire."
      },
      {
        question: "Quelle est la différence avec la solution Enedis (colonne horizontale) ?",
        answer: "Avec le réseau Enedis, le réseau électrique du parking appartient au domaine public concédé. Chaque résident a son propre compteur Linky et choisit librement son fournisseur d'électricité (EDF, Total, etc.), sans payer aucun abonnement de supervision à un opérateur tiers."
      },
      {
        question: "Quelles aides Advenir s'appliquent en copropriété en 2026 ?",
        answer: "Le programme Advenir finance 50% de l'infrastructure collective (plafond 8 000 €) et jusqu'à 960 € par borne individuelle installée sur une place dédiée."
      }
    ]
  },
  {
    slug: "tesla-wall-connector-vs-wallbox-pulsar-plus",
    title: "Tesla Wall Connector vs Wallbox Pulsar Plus : Le Duel 2026",
    metaDescription: "Tesla Wall Connector Gen 3 ou Wallbox Pulsar Plus ? Comparatif puissance 22 kW, compatibilité toutes marques, prix et fonctionnalités connectées.",
    h1: "Tesla Wall Connector vs Wallbox Pulsar Plus : Quel Choix pour Votre Garage ?",
    entityA: {
      name: "Tesla Wall Connector (Gen 3)",
      type: "Borne",
      slug: "tesla-wall-connector-gen-3",
      priceEst: "500 € à 550 € TTC (matériel seul)",
      pros: ["Rapport puissance/prix imbattable", "Câble 7,3m inclus avec bouton Tesla", "Design verre trempé élégant", "22 kW triphasé inclus"],
      cons: ["Pas de délestage direct TIC Linky", "Câble non détachable (non T2S)", "Moins de stats de coût pour véhicules non-Tesla"],
      targetAudience: "Propriétaires de Tesla et conducteurs cherchant la borne 22 kW la moins chère du marché."
    },
    entityB: {
      name: "Wallbox Pulsar Plus",
      type: "Borne",
      slug: "wallbox-pulsar-plus",
      priceEst: "599 € à 749 € TTC (matériel seul)",
      pros: ["Format ultra-compact (16 cm)", "Application myWallbox très complète avec suivi en euros", "Compatibilité recharge solaire Eco-Smart"],
      cons: ["Boîtier de délestage Power Boost en supplément (+120 €)", "Câble attaché", "Coque plastique plus légère"],
      targetAudience: "Garages étroits, maisons avec panneaux solaires ou conducteurs souhaitant un suivi fin des dépenses."
    },
    directAnswerSummary: "Pour les possesseurs de Tesla, le Wall Connector Gen 3 est imbattable en prix (500 €) et offre le confort incomparable du bouton d'ouverture de trappe. Pour les autres marques ou pour optimiser une installation photovoltaïque, la Wallbox Pulsar Plus est supérieure grâce à son application myWallbox et son mode solaire Eco-Smart.",
    comparisonTable: [
      { criteria: "Prix du matériel seul", entityAValue: "Environ 500 € TTC", entityBValue: "Environ 650 € TTC", winner: "A" },
      { criteria: "Longueur du câble inclus", entityAValue: "7,3 mètres", entityBValue: "5,0 mètres (7m en option)", winner: "A" },
      { criteria: "Gestion recharge solaire", entityAValue: "Réservée aux Tesla (Charge on Solar)", entityBValue: "Universelle (Mode Eco-Smart)", winner: "B" },
      { criteria: "Délestage dynamique", entityAValue: "Nécessite passerelle Neurio", entityBValue: "Via Power Boost optionnel", winner: "B" },
      { criteria: "Compacité", entityAValue: "34 x 15 cm", entityBValue: "16 x 16 cm (La plus petite)", winner: "B" }
    ],
    decisionMatrix: {
      chooseAIf: [
        "Vous roulez en Tesla Model 3, Model Y, S ou X",
        "Vous avez besoin d'un câble long (7,3 m pour stationner en marche avant ou arrière)",
        "Vous recherchez le prix matériel le plus bas pour du 22 kW"
      ],
      chooseBIf: [
        "Vous voulez une borne miniature quasi invisible sur votre mur",
        "Vous produisez votre propre électricité avec des panneaux solaires",
        "Vous voulez suivre précisément le coût de vos recharges en euros sur votre smartphone"
      ]
    },
    arbitrageCtaTitle: "Faites poser votre Tesla ou Wallbox par un pro IRVE",
    arbitrageCtaText: "Achetez votre borne au meilleur prix en ligne et confiez sa pose à un électricien qualifié IRVE local pour bénéficier du crédit d'impôt de 500 € et de la TVA réduite à 5,5 %.",
    relatedDuelSlugs: [
      "schneider-charge-vs-hager-witty",
      "prise-green-up-vs-borne-7kw",
      "chargeguru-vs-izi-by-edf"
    ],
    faq: [
      {
        question: "Puis-je installer le Wall Connector Tesla moi-même ?",
        answer: "La loi française (décret IRVE de 2017) impose qu'au-delà de 3,7 kW, toute installation soit réalisée par un professionnel qualifié IRVE. De plus, l'auto-installation vous prive du crédit d'impôt de 500 € et de la couverture d'assurance en cas de sinistre."
      },
      {
        question: "Le Wall Connector Tesla charge-t-il les autres marques de voitures électriques ?",
        answer: "Oui, le connecteur Type 2 est le standard européen universel. Il recharge parfaitement une Peugeot e-208, une Renault Mégane E-Tech, une MG4 ou une Volkswagen ID.4."
      },
      {
        question: "La Wallbox Pulsar Plus gère-t-elle le délestage avec le compteur Linky ?",
        answer: "Oui, via le module optionnel Power Boost ou EM112 installé au tableau électrique. La borne ajuste sa puissance en temps réel pour ne jamais faire disjoncter le compteur de la maison."
      },
      {
        question: "Quelle est la différence de garantie entre Tesla et Wallbox ?",
        answer: "Tesla offre une garantie de 4 ans pour un usage résidentiel privé. Wallbox garantit la Pulsar Plus pendant 3 ans (extensible à 5 ans)."
      },
      {
        question: "Laquelle est la plus facile à intégrer avec des panneaux solaires ?",
        answer: "La Wallbox Pulsar Plus est nettement supérieure sur le solaire : sa fonction Eco-Smart fonctionne avec n'importe quel onduleur photovoltaïque pour charger 100% à l'énergie solaire gratuite."
      }
    ]
  },
  {
    slug: "schneider-charge-vs-hager-witty",
    title: "Schneider Charge vs Hager Witty : Le Duel des Géants Français",
    metaDescription: "Schneider Charge ou Hager Witty Start ? Comparatif des deux bornes françaises de référence : conformité NF C 15-100, prise T2S, délestage Linky et avis 2026.",
    h1: "Schneider Charge vs Hager Witty : Quelle Borne Française Choisir ?",
    entityA: {
      name: "Schneider Charge",
      type: "Borne",
      slug: "schneider-charge",
      priceEst: "649 € à 799 € TTC",
      pros: ["Prise T2S 100% conforme NF C 15-100", "Connectée Wi-Fi/Bluetooth d'origine", "Écosystème domotique Wiser moderne"],
      cons: ["Câble non fourni", "Application nécessitant parfois des mises à jour"],
      targetAudience: "Foyers recherchant une borne connectée moderne, sécurisée et pilotable à distance."
    },
    entityB: {
      name: "Hager Witty Start",
      type: "Borne",
      slug: "hager-witty-start",
      priceEst: "790 € à 950 € TTC",
      pros: ["Fiabilité industrielle légendaire (zéro panne)", "Délestage direct par liaison filaire TIC Linky sans boîtier", "Fabrication alsacienne"],
      cons: ["Design austère et lourd", "Pas de Wi-Fi sur version Start (verrouillage mécanique à clé)"],
      targetAudience: "Ceux qui veulent du matériel increvable sans fonctionnalités connectées superflues."
    },
    directAnswerSummary: "Schneider Charge l'emporte sur la connectivité (Wi-Fi natif, application Wiser moderne et délestage Linky intelligent). Hager Witty Start l'emporte sur la robustesse mécanique pure et l'absence totale de bugs logiciels. Pour une maison connectée, choisissez Schneider ; pour une fiabilité à toute épreuve sur 20 ans, choisissez Hager.",
    comparisonTable: [
      { criteria: "Prise T2S avec obturateurs", entityAValue: "Oui (Conforme NF C 15-100)", entityBValue: "Oui (Conforme NF C 15-100)", winner: "Égalité" },
      { criteria: "Connectivité smartphone native", entityAValue: "Wi-Fi & Bluetooth intégrés", entityBValue: "En option (Filaire sur Start)", winner: "A" },
      { criteria: "Délestage automatique Linky", entityAValue: "Via module TIC Wiser", entityBValue: "Connexion filaire directe TIC Linky", winner: "B" },
      { criteria: "Fabrication", entityAValue: "Conception française", entityBValue: "Fabriqué en France (Alsace)", winner: "B" },
      { criteria: "Rapport prix/équipements", entityAValue: "Plus abordable", entityBValue: "Plus onéreux", winner: "A" }
    ],
    decisionMatrix: {
      chooseAIf: [
        "Vous souhaitez programmer et piloter vos charges depuis votre smartphone en Wi-Fi",
        "Vous aimez l'écosystème domotique Schneider Electric",
        "Vous recherchez le design le plus épuré"
      ],
      chooseBIf: [
        "Vous refusez de dépendre d'une application ou d'une connexion Wi-Fi capricieuse",
        "Vous voulez un raccordement direct sur la télé-information client (TIC) de votre Linky",
        "Vous privilégiez la marque préférée des installateurs professionnels"
      ]
    },
    arbitrageCtaTitle: "Faites chiffrer l'installation par un électricien agréé Schneider ou Hager",
    arbitrageCtaText: "Comparez gratuitement 3 devis d'installateurs qualifiés IRVE près de chez vous pour obtenir le meilleur prix matériel + pose avec le crédit d'impôt de 500 € déduit.",
    relatedDuelSlugs: [
      "tesla-wall-connector-vs-wallbox-pulsar-plus",
      "prise-green-up-vs-borne-7kw",
      "chargeguru-vs-izi-by-edf"
    ],
    faq: [
      {
        question: "Les deux bornes sont-elles éligibles au crédit d'impôt ?",
        answer: "Oui, Schneider Charge et Hager Witty répondent aux exigences techniques les plus strictes de la réglementation française (norme NF C 15-100 et prise T2S avec obturateurs)."
      },
      {
        question: "Pourquoi les électriciens français recommandent-ils souvent Hager ?",
        answer: "Hager est historiquement le fabricant alsacien le plus réputé pour les tableaux électriques. La Witty Start est réputée quasi indestructible et son raccordement filaire TIC Linky ne tombe jamais en panne."
      },
      {
        question: "Schneider Charge nécessite-t-elle un abonnement payant ?",
        answer: "Non, l'application Wiser de Schneider Electric est 100% gratuite et permet de planifier les heures creuses, consulter la consommation et verrouiller la borne à distance."
      },
      {
        question: "Peut-on brider ces bornes à 3,7 kW ou 7,4 kW selon son abonnement ?",
        answer: "Oui, les deux bornes permettent de régler le courant maximum (de 10A à 32A) lors de l'installation par micro-interrupteurs ou via l'application pour s'adapter à votre puissance souscrite."
      },
      {
        question: "Quel est le surcoût de pose pour un délestage dynamique Linky ?",
        answer: "Pour Hager Witty, le câble TIC se branche directement dans la borne (surcoût de 30 à 60 € de câble). Pour Schneider Charge, le module radio ou filaire Wiser coûte entre 80 € et 120 €."
      }
    ]
  },
  {
    slug: "prise-green-up-vs-borne-7kw",
    title: "Prise Green'up vs Borne 7 kW : Quel Choix pour Recharger à Domicile ?",
    metaDescription: "Prise renforcée Legrand Green'up ou borne 7,4 kW ? Comparatif prix d'installation (400 € vs 1 200 €), vitesse de charge et rentabilité selon votre usage.",
    h1: "Prise Green'up vs Borne 7 kW : Le Comparatif Définitif 2026",
    entityA: {
      name: "Prise Legrand Green'up (3,7 kW)",
      type: "Prise",
      slug: "legrand-prise-green-up",
      priceEst: "400 € à 700 € TTC posée",
      pros: ["Prix d'installation 2 à 3 fois moins cher", "Sécurité totale par rapport à une prise standard", "Aucun abonnement électrique à augmenter"],
      cons: ["Recharge lente (15-20 km d'autonomie par heure)", "Pas de crédit d'impôt borne de 500 €", "Pas de délestage dynamique"],
      targetAudience: "Hybrides rechargeables et conducteurs roulant moins de 50 km par jour."
    },
    entityB: {
      name: "Borne de Recharge 7,4 kW (32A)",
      type: "Borne",
      slug: "schneider-charge",
      priceEst: "1 150 € à 1 600 € TTC posée (avant crédit d'impôt)",
      pros: ["Recharge 3 fois plus rapide (40 à 50 km par heure)", "Crédit d'impôt de 500 € et TVA 5,5%", "Délestage dynamique et programmation heures creuses"],
      cons: ["Coût d'investissement initial plus élevé", "Nécessite souvent de passer son compteur à 9 kVA ou 12 kVA"],
      targetAudience: "Véhicules 100% électriques et familles roulant plus de 50 km par jour."
    },
    directAnswerSummary: "Pour un hybride rechargeable ou si vous parcourez moins de 50 km/jour, la prise Green'up est amplement suffisante et coûte 500 € posée. Pour un véhicule 100% électrique avec une batterie de 50 à 80 kWh, la borne 7,4 kW est indispensable pour récupérer 100% de la batterie en une nuit d'heures creuses. Grâce au crédit d'impôt de 500 €, l'écart de prix réel n'est que de 300 € à 400 €.",
    comparisonTable: [
      { criteria: "Temps pour charger une batterie de 60 kWh (ex: Mégane, Model Y)", entityAValue: "Environ 18 heures", entityBValue: "Environ 7 à 8 heures", winner: "B" },
      { criteria: "Coût moyen matériel + pose", entityAValue: "Environ 500 € TTC", entityBValue: "Environ 1 250 € TTC (soit 750 € après crédit d'impôt)", winner: "A" },
      { criteria: "Crédit d'impôt de l'État", entityAValue: "0 € (Exclu du dispositif)", entityBValue: "500 € déductibles", winner: "B" },
      { criteria: "Taux de TVA applicable", entityAValue: "10 % (logement > 2 ans)", entityBValue: "5,5 % (Taux super-réduit)", winner: "B" },
      { criteria: "Délestage dynamique anti-disjonction", entityAValue: "Non", entityBValue: "Oui (TIC Linky / Tore)", winner: "B" }
    ],
    decisionMatrix: {
      chooseAIf: [
        "Vous possédez un véhicule hybride rechargeable avec une petite batterie (10 à 15 kWh)",
        "Vous effectuez de courts trajets quotidiens et avez 10 heures devant vous chaque nuit",
        "Votre budget travaux immédiat est très limité"
      ],
      chooseBIf: [
        "Vous roulez en 100% électrique (Tesla, Peugeot e-208, Renault R5, MG4, etc.)",
        "Vous souhaitez optimiser vos heures creuses pour charger vite au tarif le moins cher",
        "Vous voulez valoriser votre bien immobilier avec un équipement pérenne"
      ]
    },
    arbitrageCtaTitle: "Faites chiffrer les deux solutions par un électricien qualifié",
    arbitrageCtaText: "Demandez à votre installateur un devis comparatif Green'up vs Borne 7 kW. Avec le crédit d'impôt de 500 € et la TVA à 5,5 %, la borne 7 kW est souvent bien plus accessible qu'on ne le pense !",
    relatedDuelSlugs: [
      "tesla-wall-connector-vs-wallbox-pulsar-plus",
      "schneider-charge-vs-hager-witty",
      "zeplug-vs-waat"
    ],
    faq: [
      {
        question: "La prise Green'up nécessite-t-elle un électricien IRVE ?",
        answer: "Législativement, la qualification IRVE n'est obligatoire qu'au-dessus de 3,7 kW. Néanmoins, pour des raisons de garantie d'assurance et de dimensionnement de la ligne dédiée 3x2,5mm², faire appel à un électricien qualifié reste vivement conseillé."
      },
      {
        question: "Pourquoi la prise Green'up ne donne-t-elle pas droit au crédit d'impôt de 500 € ?",
        answer: "L'administration fiscale réserve le crédit d'impôt aux systèmes de charge pilotables pour véhicules électriques (définis par l'article 200 quater C du CGI). Les prises renforcées en sont exclues."
      },
      {
        question: "Peut-on faire disjoncter sa maison avec une prise Green'up ?",
        answer: "Oui, si votre puissance souscrite est de 6 kVA et que la prise tire 16A (3,7 kW) en même temps qu'un four, une pompe à chaleur ou un lave-linge, car la prise Green'up ne possède pas de délestage dynamique."
      },
      {
        question: "Quel est le coût en électricité aux 100 km sur une prise Green'up vs borne ?",
        answer: "Le coût du kWh est strictement identique. Cependant, avec une borne 7,4 kW, vous pouvez concentrer 100% de votre charge pendant les heures super-creuses (ex: tarif Tempo EDF à 0,13 €/kWh), ce qui réduit la facture annuelle de 40%."
      },
      {
        question: "Peut-on remplacer plus tard une prise Green'up par une borne ?",
        answer: "Attention : la prise Green'up est câblée en 2,5 mm² protégé par un disjoncteur 20A. Une borne 7,4 kW nécessite impérativement un câble de section 6 mm² ou 10 mm² et un disjoncteur 40A Type F ou B. Il faudra donc repasser un câble."
      }
    ]
  }
];
