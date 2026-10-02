export interface DuelComparison {
  slug: string;
  publishedAt: string;
  updatedAt: string;
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
  directAnswerSummary: string;
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
    "slug": "chargeguru-vs-izi-by-edf",
    "publishedAt": "2025-10-12",
    "updatedAt": "2026-09-18",
    "title": "ChargeGuru vs IZI by EDF : Comparatif Prix, Avis & Délais 2026",
    "metaDescription": "ChargeGuru ou IZI by EDF pour installer votre borne de recharge ? Analyse des tarifs, marges d'intermédiaires et arbitrage pour économiser 400 €.",
    "h1": "ChargeGuru vs IZI by EDF : Quel Installateur Choisir en 2026 ?",
    "entityA": {
      "name": "ChargeGuru",
      "type": "Opérateur",
      "slug": "chargeguru",
      "priceEst": "1 390 € à 2 100 € TTC posé",
      "pros": [
        "Large catalogue multimarques",
        "Parcours client 100% digitalisé",
        "Présence nationale"
      ],
      "cons": [
        "Tarif 300 € à 500 € plus cher qu'un artisan en direct",
        "Qualité variable selon le sous-traitant"
      ],
      "targetAudience": "Particuliers et copropriétés cherchant une solution clé en main sans négocier."
    },
    "entityB": {
      "name": "IZI by EDF",
      "type": "Opérateur",
      "slug": "izi-by-edf",
      "priceEst": "1 250 € à 1 950 € TTC posé",
      "pros": [
        "Solidité de la marque EDF",
        "Offre couplée avantageuse avec EDF Vert Électrique",
        "Garantie de pose assurée"
      ],
      "cons": [
        "Catalogue de bornes restreint",
        "Avenants fréquents lors de la visite technique"
      ],
      "targetAudience": "Clients fidèles EDF souhaitant coupler leur borne à une offre d'électricité heures creuses."
    },
    "directAnswerSummary": "IZI by EDF est légèrement plus économique sur le forfait de base et très avantageux si vous souscrivez leur contrat d'électricité dédié. ChargeGuru offre en revanche un choix de bornes bien plus vaste (Wallbox, Schneider, ABB). Toutefois, les deux groupes sous-traitent à des artisans locaux : passer en direct vous fera économiser entre 350 € et 600 €.",
    "comparisonTable": [
      {
        "criteria": "Tarif moyen pose comprise",
        "entityAValue": "1 550 €",
        "entityBValue": "1 420 €",
        "winner": "B"
      },
      {
        "criteria": "Choix des modèles de bornes",
        "entityAValue": "Catalogue multimarque ouvert",
        "entityBValue": "Schneider & Hager principalement",
        "winner": "A"
      },
      {
        "criteria": "Couplage contrat électricité",
        "entityAValue": "Non (indépendant)",
        "entityBValue": "Oui (Tarif Vert Électrique Auto EDF)",
        "winner": "B"
      },
      {
        "criteria": "Délai moyen d'intervention",
        "entityAValue": "3 à 5 semaines",
        "entityBValue": "2 à 4 semaines",
        "winner": "B"
      },
      {
        "criteria": "Éligibilité crédit d'impôt 500 €",
        "entityAValue": "Oui (Artisans certifiés IRVE)",
        "entityBValue": "Oui (Artisans certifiés IRVE)",
        "winner": "Égalité"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous souhaitez un modèle précis de borne (ex: Wallbox Pulsar ou borne solaire Zappi)",
        "Vous préférez un accompagnement multimarques sans être poussé vers un fournisseur d'énergie",
        "Vous avez un projet en copropriété ou en entreprise"
      ],
      "chooseBIf": [
        "Vous voulez coupler votre borne à un tarif d'énergie avantageux en heures creuses EDF",
        "Vous cherchez la notoriété rassurante du groupe EDF pour votre garantie",
        "Votre configuration électrique est standard et sans complexité"
      ]
    },
    "arbitrageCtaTitle": "Évitez la marge d'intermédiaire de ChargeGuru et d'IZI by EDF",
    "arbitrageCtaText": "Les techniciens qui interviennent pour ChargeGuru ou IZI by EDF sont des artisans électriciens IRVE indépendants de votre région. En demandant un chiffrage en direct, vous économisez 300 € à 600 € sur la même installation.",
    "relatedDuelSlugs": [
      "izi-by-edf-vs-leroy-merlin",
      "zeplug-vs-waat",
      "schneider-charge-vs-hager-witty"
    ],
    "faq": [
      {
        "question": "Qui est le moins cher entre ChargeGuru et IZI by EDF ?",
        "answer": "Sur les configurations standards en maison individuelle, IZI by EDF affiche généralement un prix d'appel inférieur de 100 € à 150 €. Cependant, les suppléments de câblage sont facturés de façon similaire."
      },
      {
        "question": "Les deux permettent-ils de toucher le crédit d'impôt ?",
        "answer": "Oui, les deux prestataires font obligatoirement appel à des techniciens qualifiés IRVE, condition indispensable pour déduire 500 € sur votre déclaration de revenus."
      },
      {
        "question": "Comment éviter la surcommission de ChargeGuru ou IZI by EDF ?",
        "answer": "En effectuant une demande de devis comparatif direct auprès d'électriciens IRVE locaux sur Expert Borne Recharge, vous bénéficiez du même artisan technicien sans la marge de 28% à 38% prélevée par la plateforme nationale."
      },
      {
        "question": "Quel est le délai moyen d'intervention constaté ?",
        "answer": "IZI by EDF intervient en 2 à 4 semaines en moyenne, contre 3 à 5 semaines pour ChargeGuru, sous réserve de la disponibilité du matériel et du planning de l'artisan sous-traitant."
      },
      {
        "question": "Que se passe-t-il en cas de panne ou SAV ?",
        "answer": "Avec IZI by EDF, vous contactez le support central EDF qui mandate un technicien. ChargeGuru dispose également d'un service client centralisé mais les délais de SAV peuvent être rallongés car la responsabilité est partagée avec l'artisan poseur."
      }
    ]
  },
  {
    "slug": "zeplug-vs-waat",
    "publishedAt": "2025-10-24",
    "updatedAt": "2026-09-20",
    "title": "Zeplug vs Waat : Quel Opérateur Choisir en Copropriété en 2026 ?",
    "metaDescription": "Zeplug ou Waat pour équiper votre parking de copropriété ? Comparatif des frais d'infrastructure, coût des abonnements mensuels et liberté contractuelle.",
    "h1": "Zeplug vs Waat : Le Grand Match de la Recharge en Copropriété",
    "entityA": {
      "name": "Zeplug",
      "type": "Opérateur",
      "slug": "zeplug",
      "priceEst": "Borne : 499-899 € + Abonnement 15,90-29,90 €/mois + kWh",
      "pros": [
        "Zéro euro pour la copropriété",
        "Compteur électrique indépendant du TGBT",
        "Gestion locative sans souci"
      ],
      "cons": [
        "Abonnement obligatoire à vie pour recharger",
        "Prix du kWh fixé unilatéralement par Zeplug",
        "Système propriétaire fermé"
      ],
      "targetAudience": "Copropriétés frileuses où les copropriétaires refusent tout investissement collectif."
    },
    "entityB": {
      "name": "Waat",
      "type": "Opérateur",
      "slug": "waat",
      "priceEst": "Borne : 650-1 100 € + Supervision (6-15 €/mois)",
      "pros": [
        "Bornes interopérables répondant au protocole ouvert OCPP",
        "Flexibilité investissement copro ou tiers-financement",
        "Frais mensuels plus modérés"
      ],
      "cons": [
        "Démarches administratives parfois plus techniques",
        "Nécessite souvent une contribution financière initiale"
      ],
      "targetAudience": "Copropriétés souhaitant garder la maîtrise de leur infrastructure sans verrouillage opérateur."
    },
    "directAnswerSummary": "Zeplug l'emporte sur la simplicité du vote en AG car la copropriété n'a absolument rien à débourser. En contrepartie, les utilisateurs payent un abonnement mensuel élevé et un kWh plus cher. Waat propose des bornes ouvertes au protocole OCPP et des frais récurrents plus faibles, mais exige souvent un investissement collectif initial amorti par les subventions Advenir.",
    "comparisonTable": [
      {
        "criteria": "Coût pour la copropriété au vote en AG",
        "entityAValue": "0 € (Financement 100% Zeplug)",
        "entityBValue": "Souvent subventionné Advenir à 50%",
        "winner": "A"
      },
      {
        "criteria": "Abonnement mensuel de l'utilisateur",
        "entityAValue": "15,90 € à 29,90 €/mois",
        "entityBValue": "6 € à 15 €/mois",
        "winner": "B"
      },
      {
        "criteria": "Interopérabilité (changer d'opérateur)",
        "entityAValue": "Non (Réseau propriétaire fermé)",
        "entityBValue": "Oui (Protocole ouvert OCPP)",
        "winner": "B"
      },
      {
        "criteria": "Prix du kWh facturé",
        "entityAValue": "Tarif fixé par Zeplug (marge incluse)",
        "entityBValue": "Tarif au réel selon contrat d'énergie",
        "winner": "B"
      },
      {
        "criteria": "Rapidité d'adoption en AG",
        "entityAValue": "Très élevée (zéro dépense copro)",
        "entityBValue": "Moyenne (débat sur l'investissement)",
        "winner": "A"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "L'Assemblée Générale rejette systématiquement les dépenses pour les véhicules électriques",
        "Vous êtes un particulier isolé et voulez faire installer une borne rapidement sans convaincre toute la résidence",
        "Vous acceptez de payer un abonnement mensuel en échange de zéro tracas de copro"
      ],
      "chooseBIf": [
        "La copropriété souhaite rester propriétaire de son infrastructure et libre de changer de gestionnaire",
        "Vous voulez payer vos recharges au coût réel de l'électricité sans surtaxe d'opérateur privé",
        "Vous visez une rentabilité optimale sur 5 à 10 ans"
      ]
    },
    "arbitrageCtaTitle": "Pensez aussi à la colonne horizontale Enedis !",
    "arbitrageCtaText": "Avant de signer avec Zeplug ou Waat pour 10 ans, étudiez la solution publique Enedis. Financée à 100% par le TURPE, elle amène un compteur Linky à chaque place : vous payez votre électricité au tarif réglementé sans AUCUN abonnement d'opérateur privé.",
    "relatedDuelSlugs": [
      "zeplug-vs-bornes-solutions",
      "yespark-vs-parknplug",
      "chargeguru-vs-izi-by-edf"
    ],
    "faq": [
      {
        "question": "Zeplug est-il vraiment gratuit pour la copropriété ?",
        "answer": "Oui, le syndicat des copropriétaires ne paye rien pour installer le câble d'alimentation principal dans le parking. Zeplug se rémunère uniquement sur les utilisateurs finaux via le prix de la borne, l'abonnement mensuel et la marge sur chaque kWh."
      },
      {
        "question": "Peut-on résilier son abonnement Zeplug en gardant sa borne ?",
        "answer": "Non, chez Zeplug la borne est indissociable du contrat d'exploitation de l'infrastructure. Si vous résiliez l'abonnement, la borne est désactivée car le courant passe par le compteur privé Zeplug."
      },
      {
        "question": "Pourquoi Waat est-il considéré comme plus ouvert ?",
        "answer": "Waat installe des bornes compatibles OCPP (Open Charge Point Protocol). Si la copropriété décide de changer d'opérateur de supervision après quelques années, les bornes physiques restent opérationnelles avec le nouveau prestataire."
      },
      {
        "question": "Quelle est la différence avec la solution Enedis (colonne horizontale) ?",
        "answer": "Avec le réseau Enedis, le réseau électrique du parking appartient au domaine public concédé. Chaque résident a son propre compteur Linky et choisit librement son fournisseur d'électricité, sans abonnement de supervision."
      },
      {
        "question": "Quelles aides Advenir s'appliquent en copropriété en 2026 ?",
        "answer": "Le programme Advenir finance 50% de l'infrastructure collective (plafond 8 000 €) et jusqu'à 960 € par borne individuelle installée sur une place dédiée."
      }
    ]
  },
  {
    "slug": "tesla-wall-connector-vs-wallbox-pulsar-plus",
    "publishedAt": "2025-11-06",
    "updatedAt": "2026-09-22",
    "title": "Tesla Wall Connector vs Wallbox Pulsar Plus : Le Duel 2026",
    "metaDescription": "Tesla Wall Connector Gen 3 ou Wallbox Pulsar Plus ? Comparatif puissance 22 kW, compatibilité toutes marques, prix et fonctionnalités connectées.",
    "h1": "Tesla Wall Connector vs Wallbox Pulsar Plus : Quel Choix pour Votre Garage ?",
    "entityA": {
      "name": "Tesla Wall Connector (Gen 3)",
      "type": "Borne",
      "slug": "tesla-wall-connector-gen-3",
      "priceEst": "500 € à 550 € TTC (matériel seul)",
      "pros": [
        "Rapport puissance/prix imbattable",
        "Câble 7,3m inclus avec bouton Tesla",
        "Design verre trempé élégant",
        "22 kW triphasé inclus"
      ],
      "cons": [
        "Pas de délestage direct TIC Linky",
        "Câble non détachable (non T2S)",
        "Moins de stats de coût pour véhicules non-Tesla"
      ],
      "targetAudience": "Propriétaires de Tesla et conducteurs cherchant la borne 22 kW la moins chère du marché."
    },
    "entityB": {
      "name": "Wallbox Pulsar Plus",
      "type": "Borne",
      "slug": "wallbox-pulsar-plus",
      "priceEst": "599 € à 749 € TTC (matériel seul)",
      "pros": [
        "Format ultra-compact (16 cm)",
        "Application myWallbox très complète avec suivi en euros",
        "Compatibilité recharge solaire Eco-Smart"
      ],
      "cons": [
        "Boîtier de délestage Power Boost en supplément (+120 €)",
        "Câble attaché",
        "Coque plastique plus légère"
      ],
      "targetAudience": "Garages étroits, maisons avec panneaux solaires ou conducteurs souhaitant un suivi fin des dépenses."
    },
    "directAnswerSummary": "Pour les possesseurs de Tesla, le Wall Connector Gen 3 est imbattable en prix (500 €) et offre le confort incomparable du bouton d'ouverture de trappe. Pour les autres marques ou pour optimiser une installation photovoltaïque, la Wallbox Pulsar Plus est supérieure grâce à son application myWallbox et son mode solaire Eco-Smart.",
    "comparisonTable": [
      {
        "criteria": "Prix du matériel seul",
        "entityAValue": "Environ 500 € TTC",
        "entityBValue": "Environ 650 € TTC",
        "winner": "A"
      },
      {
        "criteria": "Longueur du câble inclus",
        "entityAValue": "7,3 mètres",
        "entityBValue": "5,0 mètres (7m en option)",
        "winner": "A"
      },
      {
        "criteria": "Gestion recharge solaire",
        "entityAValue": "Réservée aux Tesla (Charge on Solar)",
        "entityBValue": "Universelle (Mode Eco-Smart)",
        "winner": "B"
      },
      {
        "criteria": "Délestage dynamique",
        "entityAValue": "Nécessite passerelle Neurio",
        "entityBValue": "Via Power Boost optionnel",
        "winner": "B"
      },
      {
        "criteria": "Compacité",
        "entityAValue": "34 x 15 cm",
        "entityBValue": "16 x 16 cm (La plus petite)",
        "winner": "B"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous roulez en Tesla Model 3, Model Y, S ou X",
        "Vous avez besoin d'un câble long (7,3 m pour stationner en marche avant ou arrière)",
        "Vous recherchez le prix matériel le plus bas pour du 22 kW"
      ],
      "chooseBIf": [
        "Vous voulez une borne miniature quasi invisible sur votre mur",
        "Vous produisez votre propre électricité avec des panneaux solaires",
        "Vous voulez suivre précisément le coût de vos recharges en euros sur votre smartphone"
      ]
    },
    "arbitrageCtaTitle": "Faites poser votre Tesla ou Wallbox par un pro IRVE",
    "arbitrageCtaText": "Achetez votre borne au meilleur prix en ligne et confiez sa pose à un électricien qualifié IRVE local pour bénéficier du crédit d'impôt de 500 € et de la TVA réduite à 5,5 %.",
    "relatedDuelSlugs": [
      "wallbox-pulsar-plus-vs-wallbox-pulsar-max",
      "schneider-charge-vs-hager-witty",
      "prise-green-up-vs-borne-7kw"
    ],
    "faq": [
      {
        "question": "Puis-je installer le Wall Connector Tesla moi-même ?",
        "answer": "La loi française (décret IRVE de 2017) impose qu'au-delà de 3,7 kW, toute installation soit réalisée par un professionnel qualifié IRVE. L'auto-installation vous prive du crédit d'impôt de 500 € et de la couverture d'assurance."
      },
      {
        "question": "Le Wall Connector Tesla charge-t-il les autres marques de voitures ?",
        "answer": "Oui, le connecteur Type 2 est le standard européen universel. Il recharge parfaitement une Peugeot e-208, une Renault Mégane E-Tech, une MG4 ou une Volkswagen ID.4."
      },
      {
        "question": "La Wallbox Pulsar Plus gère-t-elle le délestage avec le compteur Linky ?",
        "answer": "Oui, via le module optionnel Power Boost ou EM112 installé au tableau électrique. La borne ajuste sa puissance en temps réel pour ne jamais faire disjoncter le compteur."
      },
      {
        "question": "Quelle est la différence de garantie entre Tesla et Wallbox ?",
        "answer": "Tesla offre une garantie de 4 ans pour un usage résidentiel privé. Wallbox garantit la Pulsar Plus pendant 3 ans (extensible à 5 ans)."
      },
      {
        "question": "Laquelle est la plus facile à intégrer avec des panneaux solaires ?",
        "answer": "La Wallbox Pulsar Plus est nettement supérieure sur le solaire : sa fonction Eco-Smart fonctionne avec n'importe quel onduleur photovoltaïque pour charger 100% à l'énergie solaire gratuite."
      }
    ]
  },
  {
    "slug": "schneider-charge-vs-hager-witty",
    "publishedAt": "2025-11-18",
    "updatedAt": "2026-09-24",
    "title": "Schneider Charge vs Hager Witty : Le Duel des Géants Français",
    "metaDescription": "Schneider Charge ou Hager Witty Start ? Comparatif des deux bornes françaises de référence : conformité NF C 15-100, prise T2S, délestage Linky et avis 2026.",
    "h1": "Schneider Charge vs Hager Witty : Quelle Borne Française Choisir ?",
    "entityA": {
      "name": "Schneider Charge",
      "type": "Borne",
      "slug": "schneider-charge",
      "priceEst": "649 € à 799 € TTC",
      "pros": [
        "Prise T2S 100% conforme NF C 15-100",
        "Connectée Wi-Fi/Bluetooth d'origine",
        "Écosystème domotique Wiser moderne"
      ],
      "cons": [
        "Câble non fourni",
        "Application nécessitant parfois des mises à jour"
      ],
      "targetAudience": "Foyers recherchant une borne connectée moderne, sécurisée et pilotable à distance."
    },
    "entityB": {
      "name": "Hager Witty Start",
      "type": "Borne",
      "slug": "hager-witty-start",
      "priceEst": "790 € à 950 € TTC",
      "pros": [
        "Fiabilité industrielle légendaire (zéro panne)",
        "Délestage direct par liaison filaire TIC Linky sans boîtier",
        "Fabrication alsacienne"
      ],
      "cons": [
        "Design austère et lourd",
        "Pas de Wi-Fi sur version Start (verrouillage mécanique à clé)"
      ],
      "targetAudience": "Ceux qui veulent du matériel increvable sans fonctionnalités connectées superflues."
    },
    "directAnswerSummary": "Schneider Charge l'emporte sur la connectivité (Wi-Fi natif, application Wiser moderne et délestage Linky intelligent). Hager Witty Start l'emporte sur la robustesse mécanique pure et l'absence totale de bugs logiciels. Pour une maison connectée, choisissez Schneider ; pour une fiabilité à toute épreuve sur 20 ans, choisissez Hager.",
    "comparisonTable": [
      {
        "criteria": "Prise T2S avec obturateurs",
        "entityAValue": "Oui (Conforme NF C 15-100)",
        "entityBValue": "Oui (Conforme NF C 15-100)",
        "winner": "Égalité"
      },
      {
        "criteria": "Connectivité smartphone native",
        "entityAValue": "Wi-Fi & Bluetooth intégrés",
        "entityBValue": "En option (Filaire sur Start)",
        "winner": "A"
      },
      {
        "criteria": "Délestage automatique Linky",
        "entityAValue": "Via module TIC Wiser",
        "entityBValue": "Connexion filaire directe TIC Linky",
        "winner": "B"
      },
      {
        "criteria": "Fabrication",
        "entityAValue": "Conception française",
        "entityBValue": "Fabriqué en France (Alsace)",
        "winner": "B"
      },
      {
        "criteria": "Rapport prix/équipements",
        "entityAValue": "Plus abordable",
        "entityBValue": "Plus onéreux",
        "winner": "A"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous souhaitez programmer et piloter vos charges depuis votre smartphone en Wi-Fi",
        "Vous aimez l'écosystème domotique Schneider Electric",
        "Vous recherchez le design le plus épuré"
      ],
      "chooseBIf": [
        "Vous refusez de dépendre d'une application ou d'une connexion Wi-Fi capricieuse",
        "Vous voulez un raccordement direct sur la télé-information client (TIC) de votre Linky",
        "Vous privilégiez la marque préférée des installateurs professionnels"
      ]
    },
    "arbitrageCtaTitle": "Faites chiffrer l'installation par un électricien agréé Schneider ou Hager",
    "arbitrageCtaText": "Comparez gratuitement 3 devis d'installateurs qualifiés IRVE près de chez vous pour obtenir le meilleur prix matériel + pose avec le crédit d'impôt de 500 € déduit.",
    "relatedDuelSlugs": [
      "legrand-green-up-one-vs-schneider-charge",
      "hager-witty-start-vs-hager-witty-solar",
      "prise-green-up-vs-borne-7kw"
    ],
    "faq": [
      {
        "question": "Les deux bornes sont-elles éligibles au crédit d'impôt ?",
        "answer": "Oui, Schneider Charge et Hager Witty répondent aux exigences techniques les plus strictes de la réglementation française (norme NF C 15-100 et prise T2S avec obturateurs)."
      },
      {
        "question": "Pourquoi les électriciens français recommandent-ils souvent Hager ?",
        "answer": "Hager est le fabricant alsacien le plus réputé pour les tableaux électriques. La Witty Start est réputée indestructible et son raccordement filaire TIC Linky ne tombe jamais en panne."
      },
      {
        "question": "Schneider Charge nécessite-t-elle un abonnement payant ?",
        "answer": "Non, l'application Wiser de Schneider Electric est 100% gratuite et permet de planifier les heures creuses, consulter la consommation et verrouiller la borne à distance."
      },
      {
        "question": "Peut-on brider ces bornes à 3,7 kW ou 7,4 kW selon son abonnement ?",
        "answer": "Oui, les deux bornes permettent de régler le courant maximum (de 10A à 32A) lors de l'installation par micro-interrupteurs ou via l'application pour s'adapter à votre puissance souscrite."
      },
      {
        "question": "Quel est le surcoût de pose pour un délestage dynamique Linky ?",
        "answer": "Pour Hager Witty, le câble TIC se branche directement dans la borne (surcoût de 30 à 60 € de câble). Pour Schneider Charge, le module Wiser coûte entre 80 € et 120 €."
      }
    ]
  },
  {
    "slug": "prise-green-up-vs-borne-7kw",
    "publishedAt": "2025-11-28",
    "updatedAt": "2026-09-25",
    "title": "Prise Green'up vs Borne 7 kW : Quel Choix pour Recharger à Domicile ?",
    "metaDescription": "Prise renforcée Legrand Green'up ou borne 7,4 kW ? Comparatif prix d'installation (400 € vs 1 200 €), vitesse de charge et rentabilité selon votre usage.",
    "h1": "Prise Green'up vs Borne 7 kW : Le Comparatif Définitif 2026",
    "entityA": {
      "name": "Prise Legrand Green'up (3,7 kW)",
      "type": "Prise",
      "slug": "legrand-prise-green-up",
      "priceEst": "400 € à 700 € TTC posée",
      "pros": [
        "Prix d'installation 2 à 3 fois moins cher",
        "Sécurité totale par rapport à une prise standard",
        "Aucun abonnement électrique à augmenter"
      ],
      "cons": [
        "Recharge lente (15-20 km d'autonomie par heure)",
        "Pas de crédit d'impôt borne de 500 €",
        "Pas de délestage dynamique"
      ],
      "targetAudience": "Hybrides rechargeables et conducteurs roulant moins de 50 km par jour."
    },
    "entityB": {
      "name": "Borne de Recharge 7,4 kW (32A)",
      "type": "Borne",
      "slug": "schneider-charge",
      "priceEst": "1 150 € à 1 600 € TTC posée (avant crédit d'impôt)",
      "pros": [
        "Recharge 3 fois plus rapide (40 à 50 km par heure)",
        "Crédit d'impôt de 500 € et TVA 5,5%",
        "Délestage dynamique et programmation heures creuses"
      ],
      "cons": [
        "Coût d'investissement initial plus élevé",
        "Nécessite souvent de passer son compteur à 9 kVA ou 12 kVA"
      ],
      "targetAudience": "Véhicules 100% électriques et familles roulant plus de 50 km par jour."
    },
    "directAnswerSummary": "Pour un hybride rechargeable ou si vous parcourez moins de 50 km/jour, la prise Green'up est amplement suffisante et coûte 500 € posée. Pour un véhicule 100% électrique avec une batterie de 50 à 80 kWh, la borne 7,4 kW est indispensable pour récupérer 100% de la batterie en une nuit d'heures creuses. Grâce au crédit d'impôt de 500 €, l'écart de prix réel n'est que de 300 € à 400 €.",
    "comparisonTable": [
      {
        "criteria": "Temps pour charger une batterie de 60 kWh",
        "entityAValue": "Environ 18 heures",
        "entityBValue": "Environ 7 à 8 heures",
        "winner": "B"
      },
      {
        "criteria": "Coût moyen matériel + pose",
        "entityAValue": "Environ 500 € TTC",
        "entityBValue": "Environ 1 250 € TTC (750 € après crédit)",
        "winner": "A"
      },
      {
        "criteria": "Crédit d'impôt de l'État",
        "entityAValue": "0 € (Exclu du dispositif)",
        "entityBValue": "500 € déductibles",
        "winner": "B"
      },
      {
        "criteria": "Taux de TVA applicable",
        "entityAValue": "10 % (logement > 2 ans)",
        "entityBValue": "5,5 % (Taux super-réduit)",
        "winner": "B"
      },
      {
        "criteria": "Délestage dynamique anti-disjonction",
        "entityAValue": "Non",
        "entityBValue": "Oui (TIC Linky / Tore)",
        "winner": "B"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous possédez un véhicule hybride rechargeable avec une petite batterie (10 à 15 kWh)",
        "Vous effectuez de courts trajets quotidiens et avez 10 heures devant vous chaque nuit",
        "Votre budget travaux immédiat est très limité"
      ],
      "chooseBIf": [
        "Vous roulez en 100% électrique (Tesla, Peugeot e-208, Renault R5, MG4, etc.)",
        "Vous souhaitez optimiser vos heures creuses pour charger vite au tarif le moins cher",
        "Vous voulez valoriser votre bien immobilier avec un équipement pérenne"
      ]
    },
    "arbitrageCtaTitle": "Faites chiffrer les deux solutions par un électricien qualifié",
    "arbitrageCtaText": "Demandez à votre installateur un devis comparatif Green'up vs Borne 7 kW. Avec le crédit d'impôt de 500 € et la TVA à 5,5 %, la borne 7 kW est souvent bien plus accessible qu'on ne le pense !",
    "relatedDuelSlugs": [
      "legrand-green-up-one-vs-schneider-charge",
      "tesla-wall-connector-vs-wallbox-pulsar-plus",
      "schneider-charge-vs-hager-witty"
    ],
    "faq": [
      {
        "question": "La prise Green'up nécessite-t-elle un électricien IRVE ?",
        "answer": "Législativement, la qualification IRVE n'est obligatoire qu'au-dessus de 3,7 kW. Faire appel à un électricien reste vivement conseillé pour dimensionner la ligne dédiée 3x2,5mm² et le disjoncteur différentiel."
      },
      {
        "question": "Pourquoi la prise Green'up ne donne-t-elle pas droit au crédit d'impôt ?",
        "answer": "L'administration fiscale réserve le crédit d'impôt aux systèmes de charge pilotables pour véhicules électriques (article 200 quater C du CGI). Les prises renforcées en sont exclues."
      },
      {
        "question": "Peut-on faire disjoncter sa maison avec une prise Green'up ?",
        "answer": "Oui, si votre puissance souscrite est de 6 kVA et que la prise tire 16A (3,7 kW) en même temps qu'un four, une pompe à chaleur ou un lave-linge, faute de délestage dynamique."
      },
      {
        "question": "Quel est le coût en électricité aux 100 km sur Green'up vs borne ?",
        "answer": "Le tarif du kWh est identique. Mais une borne 7,4 kW permet de concentrer la charge sur les heures super-creuses (ex: Tempo EDF à 0,13 €/kWh), réduisant la facture annuelle de 40%."
      },
      {
        "question": "Peut-on remplacer plus tard une prise Green'up par une borne ?",
        "answer": "Attention : une prise Green'up est câblée en 2,5 mm². Une borne 7,4 kW nécessite un câble de 6 mm² ou 10 mm² et un disjoncteur 40A Type F/B. Il faudra donc repasser un câble."
      }
    ]
  },
  {
    "slug": "totalenergies-vs-engie-my-power",
    "publishedAt": "2025-12-08",
    "updatedAt": "2026-09-26",
    "title": "TotalEnergies vs Engie My Power : Le Choc des Énergéticiens 2026",
    "metaDescription": "TotalEnergies Charge ou Engie My Power pour votre borne de recharge ? Tarifs d'installation, offres d'électricité couplées et audit des marges intermédiaires.",
    "h1": "TotalEnergies vs Engie My Power : Quel Fournisseur d'Énergie Choisir ?",
    "entityA": {
      "name": "TotalEnergies",
      "type": "Opérateur",
      "slug": "totalenergies",
      "priceEst": "1 290 € à 1 990 € TTC posé",
      "pros": [
        "Tarif d'appel agressif",
        "Offre électricité Heures Super Creuses (-50% la nuit)",
        "Accès au réseau public de recharge Total"
      ],
      "cons": [
        "Sous-traitance massive avec suivi de chantier inégal",
        "Frais de devis ou acomptes stricts"
      ],
      "targetAudience": "Particuliers cherchant le coût de recharge nocturne le plus bas possible."
    },
    "entityB": {
      "name": "Engie My Power",
      "type": "Opérateur",
      "slug": "engie-my-power",
      "priceEst": "1 350 € à 2 100 € TTC posé",
      "pros": [
        "Excellente synergie avec les panneaux solaires",
        "Électricité 100% verte d'origine garantie",
        "Interface client et suivi clairs"
      ],
      "cons": [
        "Forfait borne un peu plus cher",
        "Délais de visite technique parfois longs"
      ],
      "targetAudience": "Propriétaires de maisons individuelles intéressés par le couplage solaire + borne."
    },
    "directAnswerSummary": "TotalEnergies propose des forfaits borne légèrement plus agressifs et l'offre Heures Super Creuses (-50% la nuit). Engie My Power brille par son couplage avec l'autoconsommation solaire et l'électricité verte garantie. Dans les deux cas, vous payez 350 € à 500 € de commission d'intermédiaire par rapport à un électricien IRVE en direct.",
    "comparisonTable": [
      {
        "criteria": "Tarif de base installation comprise",
        "entityAValue": "Dès 1 290 € TTC",
        "entityBValue": "Dès 1 350 € TTC",
        "winner": "A"
      },
      {
        "criteria": "Couplage électricité heures creuses",
        "entityAValue": "Heures Super Creuses (très économique)",
        "entityBValue": "Elec Charge Auto (électricité verte)",
        "winner": "A"
      },
      {
        "criteria": "Intégration solaire photovoltaïque",
        "entityAValue": "Basique",
        "entityBValue": "Avancée (Écosystème My Power)",
        "winner": "B"
      },
      {
        "criteria": "Application mobile & suivi",
        "entityAValue": "Correcte mais basique",
        "entityBValue": "Intuitive et complète",
        "winner": "B"
      },
      {
        "criteria": "Garantie matérielle",
        "entityAValue": "2 à 3 ans",
        "entityBValue": "3 ans constructeur",
        "winner": "Égalité"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous souhaitez souscrire à l'offre Heures Super Creuses TotalEnergies pour recharger à prix cassé",
        "Vous utilisez souvent les bornes rapides du réseau autoroutier TotalEnergies",
        "Vous cherchez le prix d'appel le plus serré parmi les énergéticiens"
      ],
      "chooseBIf": [
        "Vous avez ou projetez d'installer des panneaux photovoltaïques sur votre toit",
        "Vous tenez à une fourniture d'électricité verte certifiée par des garanties d'origine",
        "Vous souhaitez un accompagnement axé sur la transition énergétique globale de votre foyer"
      ]
    },
    "arbitrageCtaTitle": "Évitez la commission d'intermédiaire des géants de l'énergie",
    "arbitrageCtaText": "TotalEnergies et Engie ne disposent pas de leurs propres poseurs salariés : ils sous-traitent à des artisans locaux. Comparez 3 devis d'électriciens IRVE en direct pour économiser 350 € à 550 € tout en gardant la liberté de choisir votre fournisseur d'électricité.",
    "relatedDuelSlugs": [
      "chargeguru-vs-izi-by-edf",
      "freshmile-vs-electra",
      "zeplug-vs-waat"
    ],
    "faq": [
      {
        "question": "Est-on obligé d'être client électricité pour faire poser une borne ?",
        "answer": "Non, ni TotalEnergies ni Engie n'obligent à souscrire leur contrat de fourniture électrique, mais ils accordent souvent des remises commerciales si vous combinez les deux."
      },
      {
        "question": "Qui fabrique les bornes proposées par TotalEnergies et Engie ?",
        "answer": "TotalEnergies et Engie s'appuient principalement sur Schneider Electric, Alfen et Wallbox. Ce ne sont pas des bornes propriétaires."
      },
      {
        "question": "Quelle est la marge prélevée par TotalEnergies et Engie ?",
        "answer": "La commission de courtage et d'apport d'affaires est estimée entre 30% et 42% du montant total facturé au particulier."
      },
      {
        "question": "Le crédit d'impôt de 500 € fonctionne-t-il avec ces deux opérateurs ?",
        "answer": "Oui, car ils mandatent obligatoirement des électriciens titulaires de la mention IRVE et fournissent une facture acquittée conforme pour l'administration fiscale."
      },
      {
        "question": "Comment maximiser ses économies avec ces deux acteurs ?",
        "answer": "Achetez votre matériel au meilleur prix et mandatez un installateur IRVE indépendant local. Vous pourrez ensuite librement souscrire l'offre Heures Super Creuses Total ou Elec Charge Engie sans payer de surtaxe sur la pose."
      }
    ]
  },
  {
    "slug": "zeplug-vs-bornes-solutions",
    "publishedAt": "2025-12-18",
    "updatedAt": "2026-09-27",
    "title": "Zeplug vs Bornes Solutions : Comparatif Copropriété 2026",
    "metaDescription": "Zeplug ou Bornes Solutions pour équiper votre copropriété ? Frais d'infrastructure, abonnement mensuel, liberté de résiliation et comparatif neutre.",
    "h1": "Zeplug vs Bornes Solutions : Quel Opérateur pour Votre Immeuble ?",
    "entityA": {
      "name": "Zeplug",
      "type": "Opérateur",
      "slug": "zeplug",
      "priceEst": "0 € copro / Borne 499-899 € + 15,90-29,90 €/mois",
      "pros": [
        "Zéro euro à débourser pour le syndicat",
        "Aucun vote financier complexe en AG",
        "Gestion intégrale clé en main"
      ],
      "cons": [
        "Abonnement obligatoire permanent",
        "Prix du kWh non négociable par l'usager",
        "Matériel verrouillé sur leur réseau"
      ],
      "targetAudience": "Copropriétés frileuses refusant tout vote de budget travaux."
    },
    "entityB": {
      "name": "Bornes Solutions",
      "type": "Opérateur",
      "slug": "bornes-solutions",
      "priceEst": "0 € à 50% Advenir / Borne 690-1 200 € + 9-18 €/mois",
      "pros": [
        "Bornes ouvertes au standard OCPP",
        "Abonnements mensuels plus accessibles",
        "Alternative colonne Enedis ou tiers-financement"
      ],
      "cons": [
        "Parcours en AG demandant plus de pédagogie",
        "Frais de raccordement individuel parfois supérieurs"
      ],
      "targetAudience": "Copropriétés souhaitant un opérateur structuré mais refusant le monopole à vie."
    },
    "directAnswerSummary": "Zeplug gagne haut la main sur la rapidité de vote en Assemblée Générale grâce à son offre '0 € pour la copropriété'. Mais sur 5 ans, Bornes Solutions est plus économique pour les utilisateurs grâce à des abonnements plus faibles et une infrastructure compatible avec le standard ouvert OCPP.",
    "comparisonTable": [
      {
        "criteria": "Investissement pour la copropriété",
        "entityAValue": "0 € (Financement 100% opérateur)",
        "entityBValue": "0 € ou subventionné Advenir 50%",
        "winner": "Égalité"
      },
      {
        "criteria": "Abonnement mensuel de l'usager",
        "entityAValue": "15,90 € à 29,90 € / mois",
        "entityBValue": "9 € à 18 € / mois",
        "winner": "B"
      },
      {
        "criteria": "Standard ouvert (changement possible)",
        "entityAValue": "Propriétaire fermé",
        "entityBValue": "Interopérable OCPP",
        "winner": "B"
      },
      {
        "criteria": "Autonomie du choix de fournisseur d'énergie",
        "entityAValue": "Non (imposé par Zeplug)",
        "entityBValue": "Possible selon modèle contractuel",
        "winner": "B"
      },
      {
        "criteria": "Service client et réactivité SAV",
        "entityAValue": "Service client national très rodé",
        "entityBValue": "Support technique réactif",
        "winner": "A"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Le conseil syndical est hostile à toute dépense liée aux voitures électriques",
        "Vous voulez faire voter la convention d'installation sans aucune contestation budgétaire",
        "Vous acceptez de payer un forfait mensuel d'exploitation pour une tranquillité d'esprit"
      ],
      "chooseBIf": [
        "Vous refusez de lier définitivement le destin électrique de l'immeuble à un opérateur privé unique",
        "Les usagers souhaitent payer des frais de gestion mensuels les plus bas possibles",
        "La copropriété recherche une solution technique évolutive sur 10 à 15 ans"
      ]
    },
    "arbitrageCtaTitle": "Comparez avec la colonne Enedis avant de signer",
    "arbitrageCtaText": "Le réseau public Enedis peut déployer une colonne horizontale sans reste à charge immédiat pour la copropriété (financé par le préfinancement Enedis). Chaque propriétaire est alors 100% autonome avec son propre compteur Linky sans abonnement opérateur.",
    "relatedDuelSlugs": [
      "zeplug-vs-waat",
      "yespark-vs-parknplug",
      "chargeguru-vs-izi-by-edf"
    ],
    "faq": [
      {
        "question": "Pourquoi la gratuité de Zeplug coûte-t-elle cher à l'usager ?",
        "answer": "Pour rentabiliser l'investissement de câblage consenti au départ, Zeplug prélève chaque mois un abonnement fixe de 16 € à 30 € sur chaque utilisateur branché, ainsi qu'une marge commerciale sur chaque kWh consommé."
      },
      {
        "question": "Bornes Solutions appartient-il à un grand groupe ?",
        "answer": "Bornes Solutions est une filiale du groupe Océan / IES Synergy, acteur industriel français de référence dans la conception d'électronique de puissance et de bornes de recharge."
      },
      {
        "question": "La copropriété peut-elle résilier la convention d'exploitation ?",
        "answer": "La convention est généralement conclue pour une durée de 10 à 15 ans. Une résiliation anticipée entraîne le remboursement de l'infrastructure non amortie selon un barème contractuel dégressif."
      },
      {
        "question": "Quelles sont les aides Advenir en copropriété ?",
        "answer": "Le programme Advenir accorde 50% d'aide pour l'infrastructure collective plafonnée à 8 000 € (ou 3 000 € pour les travaux de voirie) et 960 € d'aide par point de charge individuel."
      },
      {
        "question": "Combien de temps faut-il pour équiper un immeuble ?",
        "answer": "Entre la première mise à l'ordre du jour en AG, la signature de la convention, le passage d'Enedis et l'installation des bornes, comptez entre 6 et 12 mois."
      }
    ]
  },
  {
    "slug": "yespark-vs-parknplug",
    "publishedAt": "2026-01-05",
    "updatedAt": "2026-09-28",
    "title": "Yespark vs Park'n Plug : Recharge en Parking Privé 2026",
    "metaDescription": "Yespark ou Park'n Plug ? Location de place avec borne sans engagement vs déploiement d'infrastructure pour copropriétaires : comparatif complet.",
    "h1": "Yespark vs Park'n Plug : Deux Visions de la Recharge en Parking",
    "entityA": {
      "name": "Yespark",
      "type": "Opérateur",
      "slug": "yespark",
      "priceEst": "Forfait mensuel 49 € à 89 € / mois tout inclus",
      "pros": [
        "Zéro travaux pour le locataire",
        "Sans engagement de durée",
        "Accès smartphone instantané"
      ],
      "cons": [
        "Réservé aux parkings bailleurs Yespark",
        "Vous ne devenez jamais propriétaire de la borne",
        "Coût élevé sur le long terme"
      ],
      "targetAudience": "Locataires urbains n'ayant pas de place de stationnement privative équipée."
    },
    "entityB": {
      "name": "Park'n Plug",
      "type": "Opérateur",
      "slug": "parknplug",
      "priceEst": "Borne 750-1 200 € + Supervision 12 €/mois",
      "pros": [
        "Gestion de puissance intelligente multi-bornes",
        "Matériel robuste conçu pour parkings collectifs",
        "Supervision transparente"
      ],
      "cons": [
        "Nécessite vote en AG de copropriété",
        "Frais d'installation initiaux"
      ],
      "targetAudience": "Copropriétaires résidents souhaitant équiper durablement leur propre place de parking."
    },
    "directAnswerSummary": "Yespark propose une solution locative tout-en-un sans aucun travaux, idéale si vous louez un parking à proximité. Park'n Plug est un installateur et opérateur technique qui équipe votre propre copropriété avec gestion de charge dynamique. Pour une solution sans engagement, Yespark ; pour valoriser votre patrimoine, Park'n Plug.",
    "comparisonTable": [
      {
        "criteria": "Modèle économique",
        "entityAValue": "Location mensuelle sans engagement",
        "entityBValue": "Achat matériel + abonnement supervision",
        "winner": "A"
      },
      {
        "criteria": "Nécessité de voter en AG",
        "entityAValue": "Non (parking loué déjà équipé)",
        "entityBValue": "Oui (convention d'équipement copro)",
        "winner": "A"
      },
      {
        "criteria": "Valorisation immobilière de votre place",
        "entityAValue": "Nulle (vous louez)",
        "entityBValue": "Forte plus-value patrimoniale",
        "winner": "B"
      },
      {
        "criteria": "Délai pour commencer à recharger",
        "entityAValue": "Immédiat (quelques clics)",
        "entityBValue": "3 à 6 mois (vote et travaux)",
        "winner": "A"
      },
      {
        "criteria": "Coût sur 3 ans (recharge comprise)",
        "entityAValue": "Environ 2 800 €",
        "entityBValue": "Environ 1 950 € (amortissement inclus)",
        "winner": "B"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous êtes locataire de votre logement et votre propriétaire refuse de financer une borne",
        "Votre copropriété bloque tout projet de recharge depuis plusieurs années",
        "Vous cherchez une place de parking sécurisée avec recharge immédiate sans démarche"
      ],
      "chooseBIf": [
        "Vous êtes propriétaire de votre appartement et de votre place de stationnement en sous-sol",
        "Vous souhaitez une installation pérenne et subventionnée par le programme Advenir",
        "Vous voulez maîtriser votre consommation électrique avec un coût mensuel réduit"
      ]
    },
    "arbitrageCtaTitle": "Faites valoir votre Droit à la Prise en copropriété",
    "arbitrageCtaText": "Même sans opérateur national, la loi française vous confère le 'Droit à la Prise'. Vous pouvez mandater directement un électricien IRVE pour raccorder votre place au compteur des services généraux avec sous-compteur MID, pour un coût 40% moins cher.",
    "relatedDuelSlugs": [
      "zeplug-vs-waat",
      "zeplug-vs-bornes-solutions",
      "prise-green-up-vs-borne-7kw"
    ],
    "faq": [
      {
        "question": "Comment fonctionne la recharge avec Yespark ?",
        "answer": "Yespark loue des places de parking sécurisées dans des résidences partenaires. Certaines places sont équipées de bornes 7,4 kW : vous payez un loyer mensuel comprenant la place, l'accès à la borne et un forfait de kWh."
      },
      {
        "question": "Qu'est-ce que le Droit à la Prise ?",
        "answer": "Inscrit dans le Code de la Construction et de l'Habitation, il permet à tout résident de poser une borne à ses frais. Le syndic ne peut s'y opposer que s'il justifie de travaux collectifs imminents ou pour motif sérieux devant le tribunal sous 3 mois."
      },
      {
        "question": "Park'n Plug gère-t-il la répartition de puissance ?",
        "answer": "Oui, Park'n Plug intègre un algorithme d'équilibrage de charge dynamique qui module la puissance délivrée à chaque borne pour ne jamais dépasser la puissance souscrite au TGBT."
      },
      {
        "question": "Peut-on bénéficier du crédit d'impôt avec Yespark ?",
        "answer": "Non, le crédit d'impôt de 500 € s'applique uniquement à l'achat et à l'installation d'une borne pérenne dont vous êtes propriétaire, pas à une location de service."
      },
      {
        "question": "Combien coûte la recharge moyenne d'une citadine en copropriété ?",
        "answer": "Entre 2 € et 3,50 € aux 100 km en heures creuses, contre 10 € à 14 € pour un véhicule essence équivalent."
      }
    ]
  },
  {
    "slug": "izi-by-edf-vs-leroy-merlin",
    "publishedAt": "2026-01-16",
    "updatedAt": "2026-09-29",
    "title": "IZI by EDF vs Leroy Merlin : Pose de Borne de Recharge 2026",
    "metaDescription": "IZI by EDF ou forfait pose Leroy Merlin pour votre borne électrique ? Comparatif des prix matériel + pose, garanties, démarches crédit d'impôt et avis.",
    "h1": "IZI by EDF vs Forfait Pose Leroy Merlin : Le Comparatif",
    "entityA": {
      "name": "IZI by EDF",
      "type": "Opérateur",
      "slug": "izi-by-edf",
      "priceEst": "1 250 € à 1 950 € TTC posé",
      "pros": [
        "Package clé en main avec audit électrique",
        "Couplage offre énergie Vert Électrique Auto",
        "Garantie et SAV gérés par EDF"
      ],
      "cons": [
        "Catalogue de bornes limité",
        "Avenants réguliers sur la longueur de câble"
      ],
      "targetAudience": "Clients privilégiant un interlocuteur unique de l'énergie de A à Z."
    },
    "entityB": {
      "name": "Leroy Merlin",
      "type": "Opérateur",
      "slug": "leroy-merlin",
      "priceEst": "Forfait pose 599-850 € + Borne (Total 1 150-1 800 €)",
      "pros": [
        "Liberté totale de choisir sa borne en rayon ou en ligne",
        "Tarif forfaitaire de pose très compétitif",
        "Possibilité de payer en plusieurs fois sans frais"
      ],
      "cons": [
        "Sous-traitance artisanale sans audit approfondi préalable",
        "Démarches administratives parfois moins fluides"
      ],
      "targetAudience": "Bricoleurs et acheteurs pragmatiques voulant choisir leur borne au meilleur prix."
    },
    "directAnswerSummary": "Leroy Merlin est souvent moins cher sur le coût total si vous achetez une borne en promotion en magasin et souscrivez leur forfait pose partenaire. IZI by EDF offre un accompagnement plus structuré et des démarches administratives parfaitement rodées pour le crédit d'impôt de 500 €. En direct avec un artisan IRVE, vous économisez encore 200 à 400 €.",
    "comparisonTable": [
      {
        "criteria": "Prix moyen matériel + pose de base",
        "entityAValue": "1 350 € à 1 500 €",
        "entityBValue": "1 190 € à 1 400 €",
        "winner": "B"
      },
      {
        "criteria": "Choix du modèle de borne",
        "entityAValue": "Restreint (partenariats EDF)",
        "entityBValue": "Très large (toutes marques Leroy Merlin)",
        "winner": "B"
      },
      {
        "criteria": "Prise en charge crédit d'impôt 500 €",
        "entityAValue": "Facturation irréprochable",
        "entityBValue": "Conforme (artisans certifiés IRVE)",
        "winner": "Égalité"
      },
      {
        "criteria": "Visite technique préalable",
        "entityAValue": "Visite virtuelle ou physique rigoureuse",
        "entityBValue": "Généralement au moment de la pose",
        "winner": "A"
      },
      {
        "criteria": "Offres tarifaires d'électricité associées",
        "entityAValue": "Offres heures creuses EDF dédiées",
        "entityBValue": "Aucune (non fournisseur d'énergie)",
        "winner": "A"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous souhaitez un contrat d'électricité heures creuses négocié avec EDF en même temps",
        "Vous préférez un devis tout-en-un sans avoir à transporter ou stocker vous-même la borne",
        "Vous voulez l'assurance d'un grand groupe national pour votre SAV électrique"
      ],
      "chooseBIf": [
        "Vous avez repéré une promotion intéressante sur une borne spécifique chez Leroy Merlin",
        "Vous préférez voir et toucher le produit en magasin avant d'acheter",
        "Vous recherchez le prix global le plus bas parmi les enseignes grand public"
      ]
    },
    "arbitrageCtaTitle": "Obtenez un devis direct auprès de l'artisan qui posera votre borne",
    "arbitrageCtaText": "L'artisan envoyé par Leroy Merlin ou IZI by EDF est un électricien IRVE indépendant de votre département. En le contactant directement, vous évitez la commission prise par la grande surface ou la plateforme et obtenez un prix plus juste.",
    "relatedDuelSlugs": [
      "chargeguru-vs-izi-by-edf",
      "schneider-charge-vs-hager-witty",
      "prise-green-up-vs-borne-7kw"
    ],
    "faq": [
      {
        "question": "Les installateurs de Leroy Merlin sont-ils certifiés IRVE ?",
        "answer": "Oui, pour les puissances supérieures à 3,7 kW, Leroy Merlin mandate exclusivement des artisans partenaires possédant la qualification IRVE délivrée par Qualifelec ou l'AFNOR."
      },
      {
        "question": "Que comprend le forfait pose Leroy Merlin de base ?",
        "answer": "Il comprend la pose murale de la borne, le raccordement au tableau électrique jusqu'à 5 ou 10 mètres de câble selon le forfait, la pose des protections obligatoires et les tests de mise en service."
      },
      {
        "question": "Pourquoi y a-t-il souvent des suppléments de devis ?",
        "answer": "Si votre tableau est éloigné (plus de 10 m), nécessite le percement de murs porteurs ou si la mise à la terre est défaillante (> 100 ohms), l'électricien devra facturer des prestations complémentaires."
      },
      {
        "question": "La TVA à 5,5% s'applique-t-elle chez Leroy Merlin ?",
        "answer": "Oui, si la borne et la pose sont achetées conjointement sur la même facture et que votre logement a plus de deux ans d'ancienneté."
      },
      {
        "question": "Que vaut la borne Enki connectée de Leroy Merlin ?",
        "answer": "La solution Enki permet de piloter la borne avec les autres équipements de la maison (volets, radiateurs). C'est pratique mais les fonctionnalités de recharge pure sont moins poussées que sur Wallbox ou Schneider."
      }
    ]
  },
  {
    "slug": "freshmile-vs-electra",
    "publishedAt": "2026-01-27",
    "updatedAt": "2026-09-30",
    "title": "Freshmile vs Electra : Le Duel de la Recharge Rapide 2026",
    "metaDescription": "Freshmile ou Electra pour vos recharges électriques ? Comparatif des tarifs au kWh, vitesse de charge ultra-rapide (300 kW), application et couverture réseau.",
    "h1": "Freshmile vs Electra : Deux Références de la Recharge Publique",
    "entityA": {
      "name": "Freshmile",
      "type": "Opérateur",
      "slug": "freshmile",
      "priceEst": "Pass RFID gratuit ou 4,99 € / Tarifs variables au kWh + temps",
      "pros": [
        "Interopérabilité sur plus de 300 000 bornes en Europe",
        "Tarifs souvent avantageux sur certaines bornes publiques",
        "Historique et fiabilité"
      ],
      "cons": [
        "Facturation mixte (kWh + minute) parfois trompeuse pour batteries lentes",
        "Moins de stations de recharge ultra-rapide en propre"
      ],
      "targetAudience": "Conducteurs au long cours cherchant une carte passe-partout économique."
    },
    "entityB": {
      "name": "Electra",
      "type": "Opérateur",
      "slug": "electra",
      "priceEst": "0,49 € à 0,59 € / kWh (puissance jusqu'à 300-400 kW)",
      "pros": [
        "Réservation de créneau à l'avance sur l'application",
        "Stations urbaines premium ultra-rapides et propres",
        "Expérience utilisateur exceptionnelle (Plug & Charge)"
      ],
      "cons": [
        "Tarif au kWh plus élevé qu'en recharge lente",
        "Moins adapté à la recharge résidentielle quotidienne"
      ],
      "targetAudience": "Conducteurs urbains et professionnels pressés exigeant zéro attente."
    },
    "directAnswerSummary": "Freshmile est un opérateur et agrégateur d'itinérance multi-réseaux parfait comme carte universelle dans sa boîte à gants. Electra est le pure-player français des stations ultra-rapides haut de gamme avec réservation de borne unique en son genre. Les deux sont complémentaires mais ne répondent pas au même besoin.",
    "comparisonTable": [
      {
        "criteria": "Puissance maximale disponible",
        "entityAValue": "Jusqu'à 150-300 kW selon stations partenaires",
        "entityBValue": "Jusqu'à 300-400 kW (Ultra-rapide)",
        "winner": "B"
      },
      {
        "criteria": "Réservation de borne avant d'arriver",
        "entityAValue": "Non disponible",
        "entityBValue": "Oui (créneau garanti sans attente)",
        "winner": "B"
      },
      {
        "criteria": "Couverture réseau européenne",
        "entityAValue": "300 000+ points de charge",
        "entityBValue": "Réseau propriétaire en forte expansion",
        "winner": "A"
      },
      {
        "criteria": "Simplicité de tarification",
        "entityAValue": "Mixte (kWh + minute selon réseau)",
        "entityBValue": "Transparente au kWh strict",
        "winner": "B"
      },
      {
        "criteria": "Solution pour borne à domicile",
        "entityAValue": "Supervision B2B et copropriétés",
        "entityBValue": "Non (exclusivement stations publiques)",
        "winner": "A"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous cherchez un Pass RFID universel pour recharger sur tous les réseaux locaux et autoroutiers",
        "Votre véhicule charge très vite en courant continu (permettant de profiter des tarifs à la minute avantageux)",
        "Vous souhaitez superviser une borne partagée en entreprise ou copropriété"
      ],
      "chooseBIf": [
        "Vous roulez beaucoup en ville et détestez faire la queue aux stations de recharge",
        "Vous voulez réserver votre créneau de recharge 30 minutes avant d'arriver",
        "Vous appréciez les stations soignées situées près d'hôtels, commerces et restaurants"
      ]
    },
    "arbitrageCtaTitle": "La recharge à domicile reste 4 à 5 fois moins chère !",
    "arbitrageCtaText": "Même sur les meilleurs réseaux publics, recharger coûte entre 0,40 € et 0,65 € par kWh. Chez vous sur une borne 7,4 kW en heures creuses, le kWh ne coûte que 0,13 € à 0,20 €, soit 2,50 € aux 100 km. Installez votre borne avec un artisan IRVE pour amortir vos trajets quotidiens.",
    "relatedDuelSlugs": [
      "totalenergies-vs-engie-my-power",
      "bump-vs-e-totem",
      "chargeguru-vs-izi-by-edf"
    ],
    "faq": [
      {
        "question": "Pourquoi la facturation Freshmile à la minute peut-elle coûter cher ?",
        "answer": "Sur certaines bornes, Freshmile facture des centimes au kWh plus des centimes à la minute. Si votre voiture charge lentement ou que vous restez branché au-delà de 80% (quand la courbe de charge s'effondre), le coût total explose."
      },
      {
        "question": "Comment fonctionne la réservation de borne chez Electra ?",
        "answer": "Sur l'application Electra, vous réservez une place 15 à 30 minutes avant votre arrivée. La borne vous est attribuée et un arceau bloque l'accès physique pour vous garantir une place disponible."
      },
      {
        "question": "Peut-on utiliser le badge Freshmile sur les bornes Electra ?",
        "answer": "Oui, via l'itinérance GIREVE, mais le tarif appliqué par Freshmile peut comporter une commission par rapport au tarif direct de l'application Electra."
      },
      {
        "question": "Quel est le temps moyen de charge sur une station Electra ?",
        "answer": "Sur un véhicule acceptant 150 kW ou plus (Tesla, Hyundai Ioniq, Porsche), passer de 10% à 80% prend entre 18 et 25 minutes."
      },
      {
        "question": "Electra installe-t-il des bornes chez les particuliers ?",
        "answer": "Non, Electra développe et exploite exclusivement des stations de recharge ultra-rapides publiques ou semi-publiques pour les flottes et automobilistes."
      }
    ]
  },
  {
    "slug": "bump-vs-e-totem",
    "publishedAt": "2026-02-06",
    "updatedAt": "2026-10-01",
    "title": "Bump vs E-Totem : Bornes B2B & Voirie Professionnelle 2026",
    "metaDescription": "Bump Charge ou E-Totem ? Comparatif des solutions de recharge pour flottes d'entreprises, parkings tertiaires et voiries urbaines : modèles et tarifs.",
    "h1": "Bump vs E-Totem : Quelle Solution pour Flottes & Tertiaire ?",
    "entityA": {
      "name": "Bump Charge",
      "type": "Opérateur",
      "slug": "bump-charge",
      "priceEst": "Modèle tiers-financement 0 € investissement ou achat",
      "pros": [
        "Modèle sans investissement initial pour flottes",
        "Spécialiste de la livraison du dernier kilomètre et taxis/VTC",
        "Maintenance prédictive très performante"
      ],
      "cons": [
        "Engagement contractuel sur les volumes de charge",
        "Moins orienté particuliers"
      ],
      "targetAudience": "Gestionnaires de flottes d'entreprises, logisticiens et parkings de commerce."
    },
    "entityB": {
      "name": "E-Totem",
      "type": "Opérateur",
      "slug": "e-totem",
      "priceEst": "Bornes 1 200 € à 3 200 € / Forfaits voirie et collectivités",
      "pros": [
        "Fabricant 100% français (Origine France Garantie)",
        "Bornes métalliques ultra-robustes anti-vandalisme",
        "Expert des marchés publics et voiries"
      ],
      "cons": [
        "Démarches commerciales traditionnelles",
        "Moins orienté leasing de services"
      ],
      "targetAudience": "Collectivités locales, bailleurs sociaux et entreprises cherchant du matériel souverain."
    },
    "directAnswerSummary": "Bump est le champion de la transition énergétique des flottes d'entreprises avec son modèle sans investissement initial (Capex zéro). E-Totem est le concepteur et fabricant industriel stéphanois réputé pour ses bornes en acier ultra-robustes adaptées à la voirie publique et aux usages intensifs.",
    "comparisonTable": [
      {
        "criteria": "Modèle financier proposé",
        "entityAValue": "Tiers-financement 100% ou achat",
        "entityBValue": "Achat matériel + contrat supervision",
        "winner": "A"
      },
      {
        "criteria": "Fabrication du matériel",
        "entityAValue": "Multimarques sélectionnées",
        "entityBValue": "100% Fabriqué en France (Saint-Étienne)",
        "winner": "B"
      },
      {
        "criteria": "Robustesse mécanique et vandalisme",
        "entityAValue": "Standard tertiaire (IK10)",
        "entityBValue": "Exceptionnelle (Châssis acier voirie lourde)",
        "winner": "B"
      },
      {
        "criteria": "Plateforme de gestion de flotte",
        "entityAValue": "Très poussée (suivi conducteurs et coûts)",
        "entityBValue": "Conforme standard OCPP",
        "winner": "A"
      },
      {
        "criteria": "Éligibilité aides Advenir pro",
        "entityAValue": "Oui",
        "entityBValue": "Oui",
        "winner": "Égalité"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous dirigez une entreprise avec une flotte commerciale et refusez d'immobiliser de la trésorerie (Capex)",
        "Vous avez besoin de bornes rapides dédiées à des véhicules de livraison ou chauffeurs",
        "Vous cherchez un opérateur qui prend 100% du risque technique et d'exploitation"
      ],
      "chooseBIf": [
        "Vous représentez une collectivité ou un bailleur souhaitant acheter des bornes pérennes sur 15 ans",
        "Vous exigez un cahier des charges avec le label Origine France Garantie",
        "Vos bornes sont exposées aux intempéries extrêmes ou à des risques de dégradation sur l'espace public"
      ]
    },
    "arbitrageCtaTitle": "Équipez votre entreprise avec un artisan IRVE qualifié EVREADY",
    "arbitrageCtaText": "Pour vos dépôts d'entreprises et parkings salariés, mandatez un installateur IRVE indépendant certifié EVREADY. Vous profiterez des primes Advenir Entreprise tout en restant propriétaire de vos équipements au coût le plus juste.",
    "relatedDuelSlugs": [
      "freshmile-vs-electra",
      "totalenergies-vs-engie-my-power",
      "zeplug-vs-bornes-solutions"
    ],
    "faq": [
      {
        "question": "Comment Bump propose-t-il une installation à 0 € ?",
        "answer": "Bump finance l'intégralité du matériel, du génie civil et des raccordements électriques en échange d'un engagement de consommation sur la durée du contrat avec un prix négocié au kWh."
      },
      {
        "question": "Où sont fabriquées les bornes E-Totem ?",
        "answer": "Les bornes E-Totem sont entièrement conçues, tôlées, assemblées et testées dans les ateliers de la société à Saint-Étienne, dans le département de la Loire."
      },
      {
        "question": "Quelles sont les aides pour installer des bornes en entreprise ?",
        "answer": "Le programme Advenir accorde des subventions pour les points de recharge sur parkings privés réservés aux flottes ou salariés, finançant jusqu'à 20% à 40% du coût selon les profils."
      },
      {
        "question": "Peut-on refacturer la recharge aux salariés ?",
        "answer": "Oui, grâce à des bornes communicantes OCPP dotées de compteurs MID certifiés et d'un lecteur de badge RFID, l'entreprise peut refacturer au coût réel ou appliquer des avantages en nature déclarés."
      },
      {
        "question": "Quelle puissance choisir pour une flotte d'utilitaires ?",
        "answer": "Pour une recharge nocturne, du 7,4 kW ou 11 kW triphasé suffit amplement. Pour des rotations en journée, des bornes DC rapides de 30 à 60 kW sont préconisées."
      }
    ]
  },
  {
    "slug": "legrand-green-up-one-vs-schneider-charge",
    "publishedAt": "2026-02-17",
    "updatedAt": "2026-10-01",
    "title": "Legrand Green'up One vs Schneider Charge : Duel 7,4 kW 2026",
    "metaDescription": "Legrand Green'up One ou Schneider Charge ? Comparatif des deux meilleures bornes françaises 7,4 kW pour maison individuelle : prix, sécurité T2S et avis.",
    "h1": "Legrand Green'up One vs Schneider Charge : Quelle Borne 7,4 kW Choisir ?",
    "entityA": {
      "name": "Legrand Green'up One",
      "type": "Borne",
      "slug": "legrand-green-up-one",
      "priceEst": "620 € à 780 € TTC (matériel seul)",
      "pros": [
        "Design épuré et compact",
        "Intégration écosystème Legrand Home+Control",
        "Solidité et réputation de la marque Legrand"
      ],
      "cons": [
        "Connectivité de base en Bluetooth (passerelle nécessaire pour Wi-Fi distant)",
        "Moins de stats avancées sur smartphone"
      ],
      "targetAudience": "Maisons déjà équipées en domotique Legrand Netatmo et amateurs de simplicité."
    },
    "entityB": {
      "name": "Schneider Charge",
      "type": "Borne",
      "slug": "schneider-charge",
      "priceEst": "649 € à 799 € TTC (matériel seul)",
      "pros": [
        "Wi-Fi et Bluetooth natifs d'origine",
        "Application Wiser très complète",
        "Délestage dynamique intelligent avec Linky"
      ],
      "cons": [
        "Câble non fourni (prise T2S)",
        "Configuration initiale de l'application demandant un peu de rigueur"
      ],
      "targetAudience": "Maisons connectées voulant un pilotage à distance et un suivi énergétique précis."
    },
    "directAnswerSummary": "Les deux bornes respectent scrupuleusement la réglementation NF C 15-100 avec prise T2S à obturateurs. Schneider Charge l'emporte d'une courte tête grâce à sa connectivité Wi-Fi native sans passerelle additionnelle et son application Wiser plus aboutie. Legrand Green'up One reste un choix de premier ordre pour s'intégrer à un intérieur Legrand.",
    "comparisonTable": [
      {
        "criteria": "Prix du matériel seul",
        "entityAValue": "620 € à 750 € TTC",
        "entityBValue": "649 € à 799 € TTC",
        "winner": "A"
      },
      {
        "criteria": "Connectivité smartphone d'origine",
        "entityAValue": "Bluetooth (Wi-Fi via passerelle)",
        "entityBValue": "Wi-Fi + Bluetooth natifs",
        "winner": "B"
      },
      {
        "criteria": "Prise T2S avec obturateurs de sécurité",
        "entityAValue": "Oui (Conforme NF C 15-100)",
        "entityBValue": "Oui (Conforme NF C 15-100)",
        "winner": "Égalité"
      },
      {
        "criteria": "Gestion du délestage dynamique Linky",
        "entityAValue": "Via tore de mesure",
        "entityBValue": "Via module TIC Wiser filaire ou radio",
        "winner": "B"
      },
      {
        "criteria": "Éligibilité au crédit d'impôt 500 €",
        "entityAValue": "Oui (Borne pilotable certifiée)",
        "entityBValue": "Oui (Borne pilotable certifiée)",
        "winner": "Égalité"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous utilisez déjà l'application Legrand Home+Control pour vos interrupteurs et prises",
        "Vous cherchez la borne la plus discrète et esthétique sur un mur de façade blanche",
        "Vous privilégiez la marque leader de l'appareillage électrique en France"
      ],
      "chooseBIf": [
        "Vous voulez connecter votre borne directement à votre box internet Wi-Fi sans boîtier supplémentaire",
        "Vous voulez suivre avec précision le coût de chaque session de recharge en euros",
        "Vous souhaitez programmer facilement vos heures creuses depuis n'importe où"
      ]
    },
    "arbitrageCtaTitle": "Faites chiffrer la pose par un électricien qualifié IRVE",
    "arbitrageCtaText": "Legrand et Schneider Electric recommandent tous deux la pose par un installateur certifié IRVE pour bénéficier de la garantie constructeur, du crédit d'impôt de 500 € et de la TVA réduite à 5,5 %.",
    "relatedDuelSlugs": [
      "schneider-charge-vs-hager-witty",
      "prise-green-up-vs-borne-7kw",
      "tesla-wall-connector-vs-wallbox-pulsar-plus"
    ],
    "faq": [
      {
        "question": "Quelle est la différence entre la prise Green'up et la borne Green'up One ?",
        "answer": "La prise Green'up délivre 3,7 kW (16A) et met 15 à 18h pour charger une batterie de 60 kWh. La borne Green'up One délivre 7,4 kW (32A), charge en 7 à 8h et donne droit au crédit d'impôt de 500 €."
      },
      {
        "question": "Pourquoi la prise T2S avec obturateurs est-elle obligatoire en France ?",
        "answer": "La norme française NF C 15-100 impose des obturateurs de sécurité enfants sur toutes les prises domestiques jusqu'à 32A pour empêcher l'insertion accidentelle d'un objet métallique."
      },
      {
        "question": "Peut-on utiliser le câble fourni avec la voiture sur ces deux bornes ?",
        "answer": "Oui, le câble Type 2 - Type 2 livré avec votre véhicule électrique se branche directement dans la façade de la borne."
      },
      {
        "question": "Les deux bornes fonctionnent-elles en triphasé 22 kW ?",
        "answer": "Ces deux modèles spécifiques sont des versions monophasées 7,4 kW (les plus courantes en maison individuelle). Des versions triphasées 22 kW existent dans les deux gammes respectives."
      },
      {
        "question": "Quelle protection électrique installer au tableau pour ces bornes ?",
        "answer": "La norme impose un disjoncteur différentiel 40A 30mA Type F (ou Type B) à déclenchement immunisé, ainsi qu'un déclencheur à émission de tension (bobine MX) associé."
      }
    ]
  },
  {
    "slug": "myenergi-zappi-vs-sma-ev-charger",
    "publishedAt": "2026-02-28",
    "updatedAt": "2026-10-02",
    "title": "Myenergi Zappi vs SMA EV Charger : Le Match Solaire 2026",
    "metaDescription": "Myenergi Zappi ou SMA EV Charger ? Comparatif des deux meilleures bornes de recharge pour panneaux photovoltaïques : délestage solaire et rentabilité.",
    "h1": "Myenergi Zappi vs SMA EV Charger : Quelle Borne Photovoltaïque Choisir ?",
    "entityA": {
      "name": "Myenergi Zappi",
      "type": "Borne",
      "slug": "myenergi-zappi-v2",
      "priceEst": "950 € à 1 250 € TTC (matériel seul)",
      "pros": [
        "Universelle : fonctionne avec 100% des onduleurs solaires",
        "3 modes solaires puissants (Eco, Eco+, Fast)",
        "Écran LCD complet directement sur la borne"
      ],
      "cons": [
        "Design britannique volumineux",
        "Prix matériel plus élevé que la moyenne"
      ],
      "targetAudience": "Propriétaires de panneaux solaires (Enphase, SolarEdge, Huawei...) cherchant 100% d'autoconsommation."
    },
    "entityB": {
      "name": "SMA EV Charger",
      "type": "Borne",
      "slug": "sma-ev-charger",
      "priceEst": "1 150 € à 1 450 € TTC (matériel seul)",
      "pros": [
        "Intégration parfaite avec l'écosystème SMA Sunny Home Manager",
        "Commutation automatique monophasé/triphasé",
        "Qualité de fabrication industrielle allemande"
      ],
      "cons": [
        "Nécessite impérativement un environnement SMA pour exprimer son plein potentiel",
        "Tarif haut de gamme"
      ],
      "targetAudience": "Foyers déjà équipés d'onduleurs SMA souhaitant une gestion domotique solaire centralisée."
    },
    "directAnswerSummary": "Zappi est la championne universelle de la recharge solaire : elle fonctionne avec n'importe quelle marque de panneaux solaires grâce à ses pinces ampèremétriques CT indépendantes. SMA EV Charger est plus perfectionnée techniquement (commutation de phase automatique) mais n'a de sens que si vous possédez déjà des onduleurs de marque SMA.",
    "comparisonTable": [
      {
        "criteria": "Compatibilité onduleurs solaires",
        "entityAValue": "Universelle (100% marques)",
        "entityBValue": "Optimale sur SMA Sunny Home Manager",
        "winner": "A"
      },
      {
        "criteria": "Commutation auto monophasé / triphasé",
        "entityAValue": "Manuelle ou semi-automatique",
        "entityBValue": "100% Automatique sans interruption",
        "winner": "B"
      },
      {
        "criteria": "Modes de charge solaire",
        "entityAValue": "3 modes (Eco, Eco+ 100% solaire, Fast)",
        "entityBValue": "Charge optimisée prédictive météo",
        "winner": "A"
      },
      {
        "criteria": "Écran et contrôle local sur borne",
        "entityAValue": "Écran LCD rétroéclairé avec boutons",
        "entityBValue": "Bouton rotatif (contrôle via app)",
        "winner": "A"
      },
      {
        "criteria": "Garantie constructeur",
        "entityAValue": "3 ans",
        "entityBValue": "5 ans garantie allemande",
        "winner": "B"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Votre installation solaire utilise des micro-onduleurs Enphase, APSystems ou des onduleurs Huawei/SolarEdge",
        "Vous voulez brancher votre voiture et n'utiliser strictement que vos surplus d'électricité solaire gratuite",
        "Vous aimez visualiser instantanément vos flux d'énergie sur l'écran de la borne sans ouvrir votre smartphone"
      ],
      "chooseBIf": [
        "Toute votre installation photovoltaïque est pilotée par le Sunny Home Manager 2.0 de SMA",
        "Vous êtes en triphasé et voulez commencer à charger dès 1,3 kW de surplus solaire grâce à la commutation de phase",
        "Vous exigez la réputation industrielle du groupe allemand SMA"
      ]
    },
    "arbitrageCtaTitle": "Rentabilisez vos panneaux solaires avec un artisan IRVE",
    "arbitrageCtaText": "Le raccordement d'une borne solaire exige des compétences pointues à la fois en qualification IRVE et en électricité photovoltaïque. Comparez 3 devis d'installateurs qualifiés pour configurer vos tores de mesure au millimètre.",
    "relatedDuelSlugs": [
      "tesla-wall-connector-vs-wallbox-pulsar-plus",
      "schneider-charge-vs-hager-witty",
      "wallbox-pulsar-plus-vs-wallbox-pulsar-max"
    ],
    "faq": [
      {
        "question": "Comment la borne sait-elle qu'il y a du surplus solaire ?",
        "answer": "Des pinces ampèremétriques (tores CT) mesurent en temps réel le flux électrique au point de livraison du compteur. Dès que du courant repart gratuitement vers le réseau Enedis, la borne l'injecte dans la voiture."
      },
      {
        "question": "Que fait le mode 'Eco+' de la borne Zappi ?",
        "answer": "Le mode Eco+ bloque la recharge tant que le surplus solaire ne dépasse pas 1,4 kW (seuil minimal pour charger une voiture électrique). Vous ne payez donc pas un centime d'électricité sur le réseau."
      },
      {
        "question": "Pourquoi la commutation monophasé/triphasé de SMA est-elle un atout ?",
        "answer": "En triphasé, la charge démarre à 4,1 kW minimum. Si votre toit ne produit que 2 kW, une borne classique s'arrête. La borne SMA bascule automatiquement en monophasé pour charger dès 1,3 kW."
      },
      {
        "question": "Ces deux bornes sont-elles éligibles au crédit d'impôt 500 € ?",
        "answer": "Oui, les deux bornes sont pilotables, intelligentes et conformes aux exigences fiscales françaises pour obtenir 500 € de déduction d'impôt."
      },
      {
        "question": "Combien de kilomètres peut-on recharger par jour avec 3 kWc de panneaux ?",
        "answer": "Entre mai et septembre, une toiture de 3 kWc produit entre 12 et 18 kWh par jour de surplus, soit l'équivalent de 80 à 120 km d'autonomie quotidienne 100% gratuite."
      }
    ]
  },
  {
    "slug": "abb-terra-ac-vs-autel-maxicharger",
    "publishedAt": "2026-03-09",
    "updatedAt": "2026-10-02",
    "title": "ABB Terra AC vs Autel MaxiCharger : Comparatif 2026",
    "metaDescription": "ABB Terra AC ou Autel MaxiCharger ? Comparatif des deux bornes connectées nouvelle génération : connectivité 4G/RFID, robustesse et rapport qualité/prix.",
    "h1": "ABB Terra AC vs Autel MaxiCharger : Le Match des Bornes Connectées",
    "entityA": {
      "name": "ABB Terra AC",
      "type": "Borne",
      "slug": "abb-terra-ac",
      "priceEst": "750 € à 980 € TTC (matériel seul)",
      "pros": [
        "Fiabilité industrielle de classe mondiale (ABB)",
        "Comptage d'énergie MID certifié de haute précision",
        "Compatible avec tous les superviseurs OCPP"
      ],
      "cons": [
        "Application mobile parfois austère pour le grand public",
        "Configuration technique initiale plus pointue"
      ],
      "targetAudience": "Flottes d'entreprises, copropriétés et particuliers exigeant une longévité industrielle."
    },
    "entityB": {
      "name": "Autel MaxiCharger",
      "type": "Borne",
      "slug": "autel-maxicharger",
      "priceEst": "599 € à 799 € TTC (matériel seul)",
      "pros": [
        "Rapport prix/équipements très agressif",
        "Application mobile ultra-intuitive et riche en graphiques",
        "Triple connectivité Wi-Fi, Bluetooth et 4G optionnelle"
      ],
      "cons": [
        "Marque plus récente sur le marché européen de la recharge",
        "Coque plastique esthétique mais plus légère"
      ],
      "targetAudience": "Particuliers technophiles voulant une borne connectée moderne sans payer le prix fort."
    },
    "directAnswerSummary": "ABB Terra AC est le choix de la durabilité industrielle avec sa certification MID et son protocole OCPP éprouvé par des milliers d'entreprises. Autel MaxiCharger gagne sur l'ergonomie applicative grand public et le prix d'achat plus compétitif de 150 €. ABB pour les pros, Autel pour la maison connectée.",
    "comparisonTable": [
      {
        "criteria": "Tarif matériel seul",
        "entityAValue": "750 € à 980 € TTC",
        "entityBValue": "599 € à 799 € TTC",
        "winner": "B"
      },
      {
        "criteria": "Ergonomie de l'application mobile",
        "entityAValue": "Technique et sobre (TerraConfig)",
        "entityBValue": "Moderne, fluide et claire (Autel Charge)",
        "winner": "B"
      },
      {
        "criteria": "Précision de comptage d'énergie",
        "entityAValue": "Compteur certifié MID intégré",
        "entityBValue": "Comptage électronique standard",
        "winner": "A"
      },
      {
        "criteria": "Authentification d'accès",
        "entityAValue": "RFID + Application",
        "entityBValue": "RFID + Application + Carte sans contact",
        "winner": "Égalité"
      },
      {
        "criteria": "Interopérabilité supervision OCPP",
        "entityAValue": "OCPP 1.6J natif certifié",
        "entityBValue": "OCPP 1.6J supporté",
        "winner": "A"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous devez refacturer précisément l'électricité consommée à votre employeur ou en copropriété (norme MID)",
        "Vous recherchez la fiabilité à long terme garantie par un géant mondial de l'électrotechnique",
        "La borne sera installée dans un environnement professionnel ou semi-public"
      ],
      "chooseBIf": [
        "Vous cherchez le meilleur rapport équipements/prix pour une borne connectée avec badge RFID",
        "Vous voulez une application smartphone réactive qui affiche vos dépenses avec précision",
        "Votre borne est éloignée du Wi-Fi de la maison et nécessite une connexion 4G"
      ]
    },
    "arbitrageCtaTitle": "Faites installer votre borne ABB ou Autel par un artisan IRVE",
    "arbitrageCtaText": "Pour garantir l'obtention du crédit d'impôt de 500 € et sécuriser votre tableau électrique, comparez gratuitement 3 devis d'installateurs IRVE locaux.",
    "relatedDuelSlugs": [
      "alfen-eve-single-vs-evbox-elvi",
      "schneider-charge-vs-hager-witty",
      "tesla-wall-connector-vs-wallbox-pulsar-plus"
    ],
    "faq": [
      {
        "question": "Pourquoi la certification MID est-elle importante sur une borne ?",
        "answer": "La directive européenne MID garantit que le compteur d'électricité intégré est juridiquement infalsifiable, condition indispensable pour refacturer les kWh à un tiers ou à son entreprise."
      },
      {
        "question": "Autel est-il une marque fiable dans l'automobile ?",
        "answer": "Oui, Autel est l'un des leaders mondiaux reconnus du diagnostic électronique automobile professionnel depuis plus de 20 ans, ce qui lui confère une grande maîtrise des protocoles de communication des véhicules."
      },
      {
        "question": "Ces deux bornes disposent-elles d'une prise T2S conforme en France ?",
        "answer": "Oui, les versions distribuées sur le marché français par les canaux agréés intègrent la prise T2S avec obturateurs imposée par la norme NF C 15-100."
      },
      {
        "question": "Peut-on verrouiller ces bornes pour empêcher les voisins de se brancher ?",
        "answer": "Oui, les deux modèles se verrouillent par badge RFID ou directement depuis l'application pour empêcher toute recharge non autorisée."
      },
      {
        "question": "Sont-elles compatibles avec le délestage dynamique de la maison ?",
        "answer": "Oui, les deux marques proposent un compteur intelligent de délestage à installer au tableau pour adapter la puissance à la consommation du foyer."
      }
    ]
  },
  {
    "slug": "alfen-eve-single-vs-evbox-elvi",
    "publishedAt": "2026-03-18",
    "updatedAt": "2026-10-02",
    "title": "Alfen Eve Single vs EVBox Elvi : Le Match Haut de Gamme 2026",
    "metaDescription": "Alfen Eve Single Pro-Line ou EVBox Elvi ? Comparatif des deux géants néerlandais de la recharge intelligente : écran couleur, modularité et avis d'experts.",
    "h1": "Alfen Eve Single vs EVBox Elvi : Quelle Référence Européenne Choisir ?",
    "entityA": {
      "name": "Alfen Eve Single Pro-Line",
      "type": "Borne",
      "slug": "alfen-eve-single-pro",
      "priceEst": "980 € à 1 350 € TTC (matériel seul)",
      "pros": [
        "Écran couleur LCD 3,5 pouces intégré",
        "Réseau intelligent Smart Charging Network (jusqu'à 100 bornes)",
        "Composants de qualité militaire certifiés"
      ],
      "cons": [
        "Tarif premium élevé",
        "Design imposant"
      ],
      "targetAudience": "Copropriétés, entreprises et conducteurs premium voulant le nec plus ultra européen."
    },
    "entityB": {
      "name": "EVBox Elvi",
      "type": "Borne",
      "slug": "evbox-elvi",
      "priceEst": "850 € à 1 150 € TTC (matériel seul)",
      "pros": [
        "Architecture modulaire 'Click-on' pour maintenance éclair",
        "Évolutive de 3,7 kW à 22 kW sans changer de socle",
        "Application mobile Everon intuitive"
      ],
      "cons": [
        "Pas d'écran intégré (voyants LED uniquement)",
        "Application dépendant du serveur cloud EVBox"
      ],
      "targetAudience": "Particuliers et professionnels cherchant une borne modulaire et facile à faire évoluer."
    },
    "directAnswerSummary": "Alfen Eve Single Pro-Line est la référence absolue de l'ingénierie hollandaise grâce à son écran LCD couleur intégré et sa capacité d'interconnexion en grappe sans égal. EVBox Elvi séduit par sa modularité ingénieuse 'click-on' qui permet de changer le câble ou la puissance en quelques secondes. Alfen pour l'exhaustivité, EVBox pour la modularité.",
    "comparisonTable": [
      {
        "criteria": "Interface visuelle directe",
        "entityAValue": "Écran couleur LCD 3,5 pouces",
        "entityBValue": "Anneau lumineux LED d'état",
        "winner": "A"
      },
      {
        "criteria": "Modularité et maintenance",
        "entityAValue": "Boîtier monobloc standard",
        "entityBValue": "Système 'Click-on' débrochable",
        "winner": "B"
      },
      {
        "criteria": "Gestion de grappe de bornes (load balancing)",
        "entityAValue": "Smart Charging Network (jusqu'à 100 bornes)",
        "entityBValue": "Jusqu'à 4 à 8 bornes",
        "winner": "A"
      },
      {
        "criteria": "Tarif d'achat moyen matériel",
        "entityAValue": "980 € à 1 350 € TTC",
        "entityBValue": "850 € à 1 150 € TTC",
        "winner": "B"
      },
      {
        "criteria": "Compteur MID pour refacturation",
        "entityAValue": "Inclus de série certifié MID",
        "entityBValue": "Inclus ou option selon version",
        "winner": "A"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous voulez voir sur un écran couleur votre vitesse de charge exacte, les kWh consommés et le coût de la session",
        "Vous prévoyez d'installer plusieurs bornes qui doivent se partager la puissance électrique disponible",
        "Vous recherchez la marque préférée des grands opérateurs de flottes européens"
      ],
      "chooseBIf": [
        "Vous souhaitez commencer en monophasé 7,4 kW avec la possibilité de passer en triphasé 22 kW plus tard sans refaire l'installation",
        "Vous cherchez une borne épurée sans écran qui s'intègre discrètement dans votre allée",
        "Vous privilégiez la simplicité de maintenance grâce aux modules interchangeables"
      ]
    },
    "arbitrageCtaTitle": "Faites poser votre borne européenne par un artisan certifié IRVE",
    "arbitrageCtaText": "Bénéficiez du crédit d'impôt de 500 € et de la TVA réduite à 5,5 % en confiant la fourniture et la pose à un électricien qualifié de votre région.",
    "relatedDuelSlugs": [
      "abb-terra-ac-vs-autel-maxicharger",
      "schneider-charge-vs-hager-witty",
      "tesla-wall-connector-vs-wallbox-pulsar-plus"
    ],
    "faq": [
      {
        "question": "Pourquoi les Pays-Bas dominent-ils le marché des bornes de recharge ?",
        "answer": "Les Pays-Bas possèdent le réseau de recharge par habitant le plus dense d'Europe. Des marques comme Alfen et EVBox y sont nées il y a plus de 15 ans avec un niveau d'exigence technique et de fiabilité exceptionnel."
      },
      {
        "question": "Qu'est-ce que le système 'Click-on' de l'EVBox Elvi ?",
        "answer": "Le socle mural et le bornier électrique sont fixés au mur une bonne fois pour toutes. Le module de charge contenant l'électronique se clipse dessus sans aucun outil, facilitant les réparations et évolutions."
      },
      {
        "question": "Peut-on personnaliser l'affichage de l'écran Alfen ?",
        "answer": "Oui, les entreprises et copropriétés peuvent télécharger leur logo ou afficher des consignes personnalisées directement sur l'écran couleur d'accueil."
      },
      {
        "question": "Les deux bornes gèrent-elles le délestage dynamique de la maison ?",
        "answer": "Oui, toutes deux disposent de modules de comptage déportés pour ajuster la charge à la puissance disponible au compteur général."
      },
      {
        "question": "Ces bornes sont-elles étanches pour une pose en extérieur sans abri ?",
        "answer": "Oui, certifiées IP54/IP55 et IK10, elles résistent aux fortes pluies, au gel jusqu'à -25°C et aux chocs accidentels."
      }
    ]
  },
  {
    "slug": "wallbox-pulsar-plus-vs-wallbox-pulsar-max",
    "publishedAt": "2026-03-27",
    "updatedAt": "2026-10-02",
    "title": "Wallbox Pulsar Plus vs Pulsar Max : Le Duel des Générations 2026",
    "metaDescription": "Wallbox Pulsar Plus ou Pulsar Max ? Comparatif des évolutions : résistance aux chocs IK10, commande vocale Alexa, plaque de montage et écart de prix.",
    "h1": "Wallbox Pulsar Plus vs Pulsar Max : Que Vaut la Nouvelle Version ?",
    "entityA": {
      "name": "Wallbox Pulsar Plus",
      "type": "Borne",
      "slug": "wallbox-pulsar-plus",
      "priceEst": "599 € à 749 € TTC (matériel seul)",
      "pros": [
        "Format ultra-compact pionnier du marché (16 cm)",
        "Prix désormais très attractif avec les promotions",
        "Application myWallbox complète et éprouvée"
      ],
      "cons": [
        "Indice de résistance aux chocs IK08 (plus fragile)",
        "Plaque de montage un peu étroite pour les câbles épais"
      ],
      "targetAudience": "Garages intérieurs privés et budgets serrés voulant une excellente borne connectée."
    },
    "entityB": {
      "name": "Wallbox Pulsar Max",
      "type": "Borne",
      "slug": "wallbox-pulsar-max",
      "priceEst": "749 € à 899 € TTC (matériel seul)",
      "pros": [
        "Coque renforcée IK10 ultra-robuste",
        "Nouvelle plaque de montage simplifiée pour les installateurs",
        "Compatible commande vocale Alexa et Google Assistant"
      ],
      "cons": [
        "Surcoût de 150 € par rapport à la Pulsar Plus",
        "Mêmes performances de puissance brute (7,4 ou 22 kW)"
      ],
      "targetAudience": "Installations en extérieur, allées ouvertes ou utilisateurs d'assistants vocaux domotiques."
    },
    "directAnswerSummary": "La Pulsar Max est l'évolution directe de la Pulsar Plus. Elle améliore la robustesse mécanique (passage de IK08 à IK10), modernise la fixation murale et ajoute la compatibilité avec Alexa et Google Home. Si votre borne est dans un garage fermé, la Pulsar Plus reste l'affaire du siècle. Pour un mur extérieur exposé, la Pulsar Max justifie ses 150 € d'écart.",
    "comparisonTable": [
      {
        "criteria": "Tarif matériel seul constaté",
        "entityAValue": "599 € à 749 € TTC",
        "entityBValue": "749 € à 899 € TTC",
        "winner": "A"
      },
      {
        "criteria": "Résistance mécanique aux chocs",
        "entityAValue": "Indice IK08 (5 Joules)",
        "entityBValue": "Indice IK10 (20 Joules, renforcée)",
        "winner": "B"
      },
      {
        "criteria": "Commande vocale (Alexa / Google)",
        "entityAValue": "Non disponible",
        "entityBValue": "Oui (Intégration vocale native)",
        "winner": "B"
      },
      {
        "criteria": "Facilité d'installation pour l'électricien",
        "entityAValue": "Standard",
        "entityBValue": "Plaque 'Easy Install' plus rapide",
        "winner": "B"
      },
      {
        "criteria": "Gestion solaire Eco-Smart",
        "entityAValue": "Oui (avec Power Boost optionnel)",
        "entityBValue": "Oui (avec Power Boost optionnel)",
        "winner": "Égalité"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Votre borne sera installée à l'abri dans votre garage privatif sans risque de choc",
        "Vous souhaitez économiser 150 € sur l'achat du matériel",
        "Vous n'avez pas l'utilité de commander votre borne à la voix avec Alexa"
      ],
      "chooseBIf": [
        "La borne sera fixée en extérieur sur une clôture, un piquet ou une façade exposée aux intempéries",
        "Vous voulez la finition mate anti-rayures la plus résistante dans le temps",
        "Vous utilisez des routines domotiques avec Amazon Alexa ou Google Assistant"
      ]
    },
    "arbitrageCtaTitle": "Faites poser votre Wallbox par un artisan agréé IRVE",
    "arbitrageCtaText": "Bénéficiez du crédit d'impôt de 500 € et de la TVA réduite à 5,5 % en confiant la pose de votre Pulsar Plus ou Pulsar Max à un installateur certifié de votre secteur.",
    "relatedDuelSlugs": [
      "tesla-wall-connector-vs-wallbox-pulsar-plus",
      "schneider-charge-vs-hager-witty",
      "myenergi-zappi-vs-sma-ev-charger"
    ],
    "faq": [
      {
        "question": "La vitesse de charge est-elle plus rapide sur la Pulsar Max ?",
        "answer": "Non, la vitesse de charge dépend de la puissance électrique : les deux modèles délivrent rigoureusement les mêmes puissances (7,4 kW en monophasé 32A et jusqu'à 22 kW en triphasé 32A)."
      },
      {
        "question": "Peut-on utiliser le boîtier Power Boost de la Pulsar Plus sur la Max ?",
        "answer": "Oui, les accessoires de mesure dynamique Power Boost (compteurs Carlo Gavazzi EM112 ou EM340) sont 100% compatibles entre les deux générations."
      },
      {
        "question": "Que change concrètement la certification IK10 ?",
        "answer": "L'indice IK10 signifie que la borne peut encaisser un impact de 20 Joules (par exemple une chute de masse de 5 kg à 40 cm de haut ou un coup de portière) sans que le boîtier ne se fende."
      },
      {
        "question": "Le câble est-il détachable sur la Pulsar Max ?",
        "answer": "Non, comme la Pulsar Plus, la Pulsar Max dispose d'un câble attaché solidaire de 5 m (ou 7 m en option) avec une prise Type 2 intégrée."
      },
      {
        "question": "L'application myWallbox change-t-elle entre les deux bornes ?",
        "answer": "L'application mobile est identique et offre les mêmes fonctions de programmation horaire, gestion des coûts en euros et recharge solaire Eco-Smart."
      }
    ]
  },
  {
    "slug": "hager-witty-start-vs-hager-witty-solar",
    "publishedAt": "2026-03-30",
    "updatedAt": "2026-10-02",
    "title": "Hager Witty Start vs Witty Solaire : Quel Modèle Hager en 2026 ?",
    "metaDescription": "Hager Witty Start ou Witty Solaire XEV1K ? Comparatif des deux bornes alsaciennes : délestage TIC Linky filaire vs pilotage dynamique des surplus photovoltaïques.",
    "h1": "Hager Witty Start vs Witty Solaire : Laquelle Choisir pour Votre Maison ?",
    "entityA": {
      "name": "Hager Witty Start",
      "type": "Borne",
      "slug": "hager-witty-start",
      "priceEst": "790 € à 950 € TTC (matériel seul)",
      "pros": [
        "Fiabilité industrielle légendaire (zéro électronique superflue)",
        "Raccordement direct sur la télé-information TIC Linky",
        "Verrouillage physique à clé"
      ],
      "cons": [
        "Pas de pilotage solaire dynamique avancé",
        "Pas de Wi-Fi natif"
      ],
      "targetAudience": "Maisons traditionnelles sans panneaux solaires cherchant une borne robuste pour 20 ans."
    },
    "entityB": {
      "name": "Hager Witty Solaire",
      "type": "Borne",
      "slug": "hager-witty-solar",
      "priceEst": "1 050 € à 1 350 € TTC (matériel seul)",
      "pros": [
        "Gestion intelligente des surplus d'électricité photovoltaïque",
        "Application Hager Flow moderne",
        "Commutation monophasé/triphasé pour optimiser l'autoconsommation"
      ],
      "cons": [
        "Tarif plus onéreux",
        "Installation nécessitant le gestionnaire d'énergie Hager"
      ],
      "targetAudience": "Maisons équipées de panneaux solaires souhaitant maximiser l'autoconsommation sans gaspiller d'énergie."
    },
    "directAnswerSummary": "La Hager Witty Start est la reine de la simplicité et de la durabilité pour recharger en heures creuses sans aucun risque de panne logicielle. La Hager Witty Solaire apporte l'intelligence de gestion des surplus photovoltaïques pour charger votre voiture 100% gratuitement avec le soleil. Choisissez Start sans panneaux solaires, Solaire si vous avez une toiture photovoltaïque.",
    "comparisonTable": [
      {
        "criteria": "Tarif matériel seul",
        "entityAValue": "790 € à 950 € TTC",
        "entityBValue": "1 050 € à 1 350 € TTC",
        "winner": "A"
      },
      {
        "criteria": "Optimisation des surplus solaires",
        "entityAValue": "Non (charge classique réseau)",
        "entityBValue": "Oui (Module solaire Hager Flow)",
        "winner": "B"
      },
      {
        "criteria": "Délestage dynamique Linky",
        "entityAValue": "Filaire direct bornier TIC",
        "entityBValue": "Intégré dans le gestionnaire d'énergie",
        "winner": "Égalité"
      },
      {
        "criteria": "Connectivité et application mobile",
        "entityAValue": "Verrouillage à clé physique",
        "entityBValue": "Application mobile Hager Flow",
        "winner": "B"
      },
      {
        "criteria": "Lieu de fabrication",
        "entityAValue": "Fabriqué en France (Alsace)",
        "entityBValue": "Fabriqué en France (Alsace)",
        "winner": "Égalité"
      }
    ],
    "decisionMatrix": {
      "chooseAIf": [
        "Vous n'avez pas de panneaux solaires et comptez recharger la nuit en heures creuses",
        "Vous préférez un verrouillage mécanique à clé simple plutôt qu'une application sur votre téléphone",
        "Vous cherchez le matériel le plus robuste possible recommandé par les électriciens"
      ],
      "chooseBIf": [
        "Vous produisez votre propre électricité avec des panneaux solaires en toiture",
        "Vous voulez que votre voiture se recharge automatiquement quand le soleil brille",
        "Vous appréciez de suivre votre production et consommation sur une application dédiée"
      ]
    },
    "arbitrageCtaTitle": "Faites chiffrer l'installation par un électricien agréé Hager",
    "arbitrageCtaText": "Hager dispose du réseau d'installateurs qualifiés le plus dense de France. Comparez gratuitement 3 devis d'électriciens IRVE locaux pour bénéficier du crédit d'impôt de 500 € et de la TVA réduite à 5,5 %.",
    "relatedDuelSlugs": [
      "schneider-charge-vs-hager-witty",
      "myenergi-zappi-vs-sma-ev-charger",
      "prise-green-up-vs-borne-7kw"
    ],
    "faq": [
      {
        "question": "Où sont fabriquées les bornes Hager Witty ?",
        "answer": "Toutes les bornes Witty sont entièrement fabriquées en France dans l'usine historique du groupe Hager à Obernai, en Alsace."
      },
      {
        "question": "La Witty Start peut-elle être raccordée au Linky sans boîtier additionnel ?",
        "answer": "Oui, un simple câble blindé 2 paires entre le bornier TIC du compteur Linky et la borne Witty Start suffit pour assurer un délestage dynamique 100% infaillible."
      },
      {
        "question": "Comment fonctionne la recharge solaire sur la Witty Solaire ?",
        "answer": "Le gestionnaire Hager Flow mesure la production solaire et la consommation du logement. Dès qu'un surplus suffisant est détecté, la borne s'active et module sa puissance pour absorber exactement l'énergie gratuite."
      },
      {
        "question": "Les deux modèles sont-ils conformes à la norme NF C 15-100 ?",
        "answer": "Oui, les deux bornes sont équipées de prises T2S avec obturateurs de protection enfants, obligatoires en France pour les installations résidentielles."
      },
      {
        "question": "Peut-on faire évoluer une Witty Start vers une version connectée ?",
        "answer": "Hager propose des cartes électroniques et modules d'extension, mais pour un usage solaire complet, il est plus avantageux d'opter dès le départ pour la Witty Solaire."
      }
    ]
  }
];
