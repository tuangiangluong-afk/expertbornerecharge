export interface Operator {
  slug: string;
  publishedAt: string;
  updatedAt: string;
  name: string;
  shortName: string;
  category: "Opérateur Copropriété" | "Installateur National Réseau" | "Énergéticien" | "Gestionnaire de Réseau";
  targetMarket: string[];
  tagline: string;
  pricingModel: string;
  estimatedBasePrice: string;
  middlemanCommissionRate: string;
  installationDelay: string;
  installedHardwareSlugs?: string[];
  associatedDuelSlugs?: string[];
  pros: string[];
  cons: string[];
  hiddenCostsWarning: string;
  contractTerms: {
    commitment: string;
    maintenance: string;
    cancellation: string;
  };
  arbitrageVerdict: {
    directQuotePitch: string;
    savingsEstimate: string;
  };
  rating: number;
  reviewCount: number;
  faq: { question: string; answer: string }[];
  overview: string;
  strengthsSummary: string;
  weaknessesSummary: string;
  recommendation: string;
}

export const OPERATORS: Operator[] = [
  {
    slug: "chargeguru",
    publishedAt: "2025-09-12",
    updatedAt: "2026-09-18",
    name: "ChargeGuru",
    shortName: "ChargeGuru",
    category: "Installateur National Réseau",
    targetMarket: ["Maison individuelle", "Copropriété", "Entreprise"],
    tagline: "Le courtier / installateur paneuropéen de bornes de recharge",
    pricingModel: "Forfait fourniture et pose tout compris",
    estimatedBasePrice: "1 390 € à 2 100 € TTC posé (hors aides)",
    middlemanCommissionRate: "28 % à 38 % de commission d'intermédiation réseau",
    installationDelay: "3 à 5 semaines après validation du devis",
    installedHardwareSlugs: ["wallbox-pulsar-plus","schneider-charge","abb-terra-ac","hager-witty-start"],
    associatedDuelSlugs: ["chargeguru-vs-izi-by-edf"],
    pros: [
      "Large choix de bornes (Wallbox Pulsar, Schneider Charge, ABB)",
      "Accompagnement administratif sur les dossiers d'aides (crédit d'impôt, Advenir)",
      "Présence nationale via un réseau d'électriciens IRVE sous-traitants"
    ],
    cons: [
      "Tarif 300 € à 600 € plus cher qu'un artisan IRVE local en direct",
      "Qualité de pose variable selon l'électricien sous-traitant mandaté dans votre région",
      "Délais d'intervention parfois allongés en cas de SAV ou de pièces manquantes"
    ],
    hiddenCostsWarning: "Attention aux suppléments de tirage de câble au-delà du forfait standard de 10 mètres (facturés souvent entre 40 € et 65 € le mètre linéaire supplémentaire).",
    contractTerms: {
      commitment: "Sans engagement post-installation en maison individuelle",
      maintenance: "Contrat de maintenance optionnel (120 € à 180 €/an)",
      cancellation: "Délai de rétractation légal de 14 jours avant le début des travaux"
    },
    arbitrageVerdict: {
      directQuotePitch: "ChargeGuru joue le rôle d'intermédiaire commercial en sous-traitant l'intervention à des artisans IRVE locaux. En sollicitant directement un installateur IRVE de votre département, vous évitez la commission du réseau central.",
      savingsEstimate: "350 € à 650 € d'économie en direct artisan IRVE certifié"
    },
    rating: 4.3,
    reviewCount: 1420,
    faq: [
{
        question: "ChargeGuru installe-t-il les bornes avec ses propres équipes ?",
        answer: "ChargeGuru dispose de quelques techniciens en propre mais s'appuie principalement sur un réseau d'artisans électriciens sous-traitants qualifiés IRVE répartis sur toute la France."
      },
      {
        question: "Pourquoi les devis ChargeGuru sont-ils plus élevés qu'en direct ?",
        answer: "Le devis intègre les coûts de structure, la plateforme de devisage en ligne, la garantie commerciale et une marge d'intermédiaire prélevée sur la prestation de l'électricien."
      },
      {
        question: "Peut-on obtenir le crédit d'impôt de 500 € avec ChargeGuru ?",
        answer: "Oui, la pose étant effectuée par un professionnel qualifié IRVE avec facture mentionnant les spécificités de la borne, vous êtes éligible au crédit d'impôt de 500 € et à la TVA réduite à 5,5 %."
      },
      {
        question: "Pourquoi faire appel à un artisan IRVE direct plutôt qu'à ChargeGuru ?",
        answer: "ChargeGuru sous-traite la pose à des électriciens IRVE locaux tout en appliquant une commission réseau de 28 % à 38 %. En comparant 3 artisans IRVE locaux en direct sur Expert Borne Recharge, vous bénéficiez du même artisan qualifié sans payer la marge d'intermédiaire commerciale, soit une économie moyenne de 350 € à 650 €."
      },
      {
        question: "La visite technique est-elle gratuite avec ChargeGuru ?",
        answer: "La pré-visite technique s'effectue généralement en visioconférence sur photos de votre tableau électrique et de votre garage. Si une visite sur site est nécessaire pour configuration complexe, elle peut être facturée ou déduite de la commande finale."
      },
      {
        question: "Quelles sont les garanties incluses sur l'installation ChargeGuru ?",
        answer: "L'installation bénéficie de la garantie décennale de l'artisan sous-traitant (obligatoire pour tout chantier électrique) et de la garantie constructeur de 2 à 3 ans sur la borne sélectionnée."
      }
    ],
    overview: "ChargeGuru est l'un des leaders français de l'installation de bornes de recharge pour particuliers, copropriétés et flottes professionnelles. Racheté par le groupe espagnol Iberdrola, l'opérateur propose un parcours digitalisé bien rodé.",
    strengthsSummary: "Parcours client fluide, devis rapide en ligne, éligibilité aux aides garantie.",
    weaknessesSummary: "Surcoût d'intermédiation significatif par rapport à un artisan local en direct, SAV dépendant du sous-traitant.",
    recommendation: "Une solution clé en main pratique pour qui ne souhaite pas chercher d'artisan, mais financièrement moins attractive qu'une mise en concurrence directe entre 3 électriciens IRVE locaux."
  },
  {
    slug: "izi-by-edf",
    publishedAt: "2025-09-18",
    updatedAt: "2026-09-20",
    name: "IZI by EDF",
    shortName: "IZI by EDF",
    category: "Énergéticien",
    targetMarket: ["Maison individuelle", "Petite copropriété"],
    tagline: "La filiale travaux et services du groupe EDF",
    pricingModel: "Packs matériel + pose forfaitisée",
    estimatedBasePrice: "1 250 € à 1 950 € TTC posé (hors aides)",
    middlemanCommissionRate: "25 % à 35 % de marge commerciale opérateur",
    installationDelay: "2 à 4 semaines",
    installedHardwareSlugs: ["schneider-charge","hager-witty-start","wallbox-pulsar-plus"],
    associatedDuelSlugs: ["chargeguru-vs-izi-by-edf", "izi-by-edf-vs-leroy-merlin"],
    pros: [
      "Marque rassurante adossée au groupe EDF",
      "Offre couplée intéressante avec le tarif EDF Vert Électrique Auto (heures creuses avantageuses)",
      "Plateforme de suivi de chantier et garantie décennale couverte par EDF"
    ],
    cons: [
      "Catalogue de bornes restreint (partenariat privilégié avec Schneider et Hager)",
      "Sous-traitance intégrale à des installateurs partenaires locaux",
      "Devis initial souvent recalculé à la hausse lors de la visite technique réelle"
    ],
    hiddenCostsWarning: "Le prix d'appel 'à partir de' ne comprend que le forfait câble minimal (5 à 10 m). Les passages de cloisons, fourreaux extérieurs ou mise aux normes du tableau électrique font rapidement grimper la note finale.",
    contractTerms: {
      commitment: "Sans engagement sur l'offre borne seule",
      maintenance: "Assistance dépannage en option via l'écosystème EDF",
      cancellation: "Rétractation 14 jours réglementaire"
    },
    arbitrageVerdict: {
      directQuotePitch: "IZI by EDF valorise la notoriété de sa maison-mère pour appliquer une commission sur le matériel et la main d'œuvre. Les électriciens qui posent les bornes IZI sont les mêmes artisans indépendants de votre ville que vous pouvez contacter en direct.",
      savingsEstimate: "300 € à 550 € d'économie en direct sans passer par EDF"
    },
    rating: 4.1,
    reviewCount: 2850,
    faq: [
{
        question: "Faut-il être client EDF pour faire installer une borne par IZI by EDF ?",
        answer: "Non, les services d'installation IZI by EDF sont accessibles à tous les consommateurs, quel que soit leur fournisseur d'électricité (Engie, TotalEnergies, Enercoop, etc.)."
      },
      {
        question: "Quelles sont les bornes proposées par IZI by EDF ?",
        answer: "IZI by EDF propose principalement la borne Schneider Charge, la Wallbox Pulsar Plus et des modèles Hager Witty, toutes certifiées et éligibles aux aides de l'État."
      },
      {
        question: "Comment se déroule la visite technique ?",
        answer: "La visite peut se faire en visio ou sur place par l'artisan mandaté afin de valider la puissance disponible au disjoncteur d'abonné et le chemin de câble."
      },
      {
        question: "Peut-on bénéficier du crédit d'impôt de 500 € avec IZI by EDF ?",
        answer: "Oui, la pose étant obligatoirement réalisée par un professionnel qualifié IRVE, la facture émise par IZI by EDF est 100 % conforme pour déduire 500 € lors de votre déclaration fiscale."
      },
      {
        question: "Comment éviter les suppléments tarifaires imprévus avec IZI by EDF ?",
        answer: "Fournissez des photos précises de l'emplacement du compteur, du disjoncteur général, du tableau électrique et du cheminement exact des câbles pour que le devis initial intègre dès le départ le bon métrage et évite tout avenant le jour J."
      },
      {
        question: "L'offre IZI by EDF impose-t-elle de souscrire un contrat d'électricité EDF ?",
        answer: "Non, l'offre d'installation de borne est dissociable de votre contrat de fourniture d'énergie. Cependant, EDF propose des réductions sur le matériel si vous souscrivez simultanément leur contrat Vert Électrique Auto."
      }
    ],
    overview: "IZI by EDF est la branche travaux de rénovation énergétique et de transition écologique d'EDF. Elle commercialise des solutions de recharge pour particuliers avec une forte mise en avant des offres d'énergie associées.",
    strengthsSummary: "Solidité financière du groupe EDF, garanties sérieuses, simplicité du parcours de commande.",
    weaknessesSummary: "Marges d'intermédiaire sur la prestation, devis standardisé nécessitant des avenants sur chantiers atypiques.",
    recommendation: "Une option sécurisante pour les clients fidèles à EDF, mais à challenger impérativement avec un devis d'installateur IRVE indépendant."
  },
  {
    slug: "zeplug",
    publishedAt: "2025-09-25",
    updatedAt: "2026-09-21",
    name: "Zeplug",
    shortName: "Zeplug",
    category: "Opérateur Copropriété",
    targetMarket: ["Copropriété", "Entreprise"],
    tagline: "Le pionnier de la recharge en copropriété avec compteur indépendant",
    pricingModel: "Abonnement mensuel tout compris (infrastructure à 0 € pour la copropriété)",
    estimatedBasePrice: "Borne : 499 € à 899 € TTC + Abonnement 15,90 € à 29,90 €/mois + forfait kWh",
    middlemanCommissionRate: "Modèle locatif avec récurrence captive sur 3 à 5 ans",
    installationDelay: "3 à 6 mois pour l'infrastructure collective en copropriété",
    installedHardwareSlugs: ["schneider-charge","legrand-green-up-one","evbox-elvi"],
    associatedDuelSlugs: ["zeplug-vs-waat", "zeplug-vs-bornes-solutions"],
    pros: [
      "Zéro euro à débourser pour la copropriété (financement intégral de l'infrastructure par Zeplug)",
      "Compteur électrique dédié indépendant du compteur des parties communes",
      "Gestion complète des appels de fonds et de la facturation au kilowatt-heure"
    ],
    cons: [
      "Abonnement mensuel obligatoire à vie tant que vous rechargez chez vous",
      "Prix du kWh facturé par Zeplug souvent supérieur au tarif réglementé EDF Tempo ou Base",
      "Engagement contractuel et formalités complexes si vous quittez la copropriété ou changez de véhicule"
    ],
    hiddenCostsWarning: "L'électricité ne vous est pas facturée au tarif bleu EDF mais au tarif d'énergie négocié par Zeplug avec sa marge de gestion, majoré de l'abonnement fixe mensuel.",
    contractTerms: {
      commitment: "Engagement initial d'abonnement (souvent 12 à 36 mois selon la formule)",
      maintenance: "Maintenance préventive et curative incluse dans l'abonnement",
      cancellation: "Résiliation possible mais la borne reste verrouillée sur le réseau Zeplug sauf rachat d'infrastructure"
    },
    arbitrageVerdict: {
      directQuotePitch: "Zeplug séduit les syndics car il évite les dépenses au syndicat des copropriétaires. Cependant, la solution publique Enedis (colonne horizontale subventionnée à 100% par le TURPE) permet à chaque copropriétaire d'avoir son propre compteur Linky individuel et de choisir son fournisseur d'électricité sans abonnement tiers.",
      savingsEstimate: "400 € à 900 € d'économie par an sur la facture d'électricité en passant par le réseau Enedis direct"
    },
    rating: 3.9,
    reviewCount: 890,
    faq: [
{
        question: "Comment Zeplug se finance-t-il si la copropriété ne paye rien ?",
        answer: "Zeplug finance l'installation du câble d'infrastructure principal grâce aux abonnements mensuels facturés à chaque utilisateur et à la marge réalisée sur la revente des kWh consommés."
      },
      {
        question: "Quelle est la différence entre Zeplug et la solution Enedis ?",
        answer: "Avec Zeplug, l'infrastructure appartient à un opérateur privé et vous devez souscrire son abonnement. Avec Enedis, l'infrastructure devient un réseau public : vous disposez d'un compteur Linky standard et choisissez votre fournisseur (EDF, TotalEnergies, etc.)."
      },
      {
        question: "Que se passe-t-il si je vends mon appartement avec une borne Zeplug ?",
        answer: "Le nouvel acquéreur peut reprendre l'abonnement Zeplug ou demander la résiliation. En cas de résiliation, la borne est désactivée."
      },
      {
        question: "Quelle est la durée d'engagement chez Zeplug en copropriété ?",
        answer: "Le contrat cadre d'infrastructure signé avec la copropriété court généralement sur une durée de 10 ans renouvelable. L'abonnement individuel de l'utilisateur est résiliable selon les conditions du contrat de service particulier (avec frais de déconnexion éventuels)."
      },
      {
        question: "Peut-on utiliser sa propre borne avec le réseau Zeplug ?",
        answer: "Non, l'infrastructure Zeplug est un réseau propriétaire fermé. Vous devez impérativement acquérir ou louer une borne certifiée et configurée par Zeplug pour communiquer avec leur compteur divisionnaire."
      },
      {
        question: "Comment se déroule la refacturation de l'électricité chez Zeplug ?",
        answer: "Zeplug relève la consommation de votre borne via carte SIM 4G intégrée et vous envoie une facture mensuelle unique incluant l'abonnement au service et le montant des kWh consommés au tarif fixé par Zeplug."
      }
    ],
    overview: "Zeplug est l'un des premiers opérateurs à avoir démocratisé la recharge en copropriété via un modèle sans frais pour l'assemblée générale. La société a fusionné avec ChargePoint en Europe pour accélérer son déploiement.",
    strengthsSummary: "Vote facile en AG de copropriété (zéro dépense pour les copropriétaires non équipés), gestion clé en main.",
    weaknessesSummary: "Abonnement récurrent obligatoire, tarif du kWh plus onéreux qu'un contrat particulier direct, dépendance à un opérateur privé.",
    recommendation: "Idéal pour débloquer un vote difficile en AG si les copropriétaires refusent de payer, mais moins rentable sur le long terme pour les résidents qu'une colonne horizontale Enedis."
  },
  {
    slug: "waat",
    publishedAt: "2025-10-02",
    updatedAt: "2026-09-22",
    name: "Waat",
    shortName: "Waat",
    category: "Opérateur Copropriété",
    targetMarket: ["Copropriété", "Bailleurs sociaux", "Immobilier tertiaire"],
    tagline: "L'opérateur éco-responsable de recharge collective",
    pricingModel: "Investissement copro subventionné Advenir ou formule Tiers-Financement",
    estimatedBasePrice: "Borne : 650 € à 1 100 € TTC posée + abonnement supervision (6 € à 15 €/mois)",
    middlemanCommissionRate: "Marge matérielle + redevance mensuelle de supervision logicielle",
    installationDelay: "2 à 5 mois en copropriété",
    installedHardwareSlugs: ["alfen-eve-single-pro","schneider-charge","abb-terra-ac"],
    associatedDuelSlugs: ["zeplug-vs-waat"],
    pros: [
      "Flexibilité entre achat de l'infrastructure par la copro ou tiers-financement",
      "Plateforme de supervision ouverte et bornes conformes au protocole OCPP",
      "Éligibilité maximale aux primes Advenir (jusqu'à 50% de subvention)"
    ],
    cons: [
      "Frais de supervision mensuels récurrents",
      "Délais d'instruction de dossier en AG parfois contraignants",
      "Assistance téléphonique parfois saturée lors des pics d'installation"
    ],
    hiddenCostsWarning: "Vérifiez le coût de l'extension de garantie après la 2e année et les frais éventuels de désinstallation en cas de déménagement.",
    contractTerms: {
      commitment: "Contrat de service de 3 à 5 ans pour la supervision de copro",
      maintenance: "Maintenance préventive incluse dans le contrat de service",
      cancellation: "Résiliation selon conditions contractuelles d'AG"
    },
    arbitrageVerdict: {
      directQuotePitch: "Waat est plus souple que Zeplug car ses bornes utilisent le protocole ouvert OCPP. Néanmoins, pour une maison ou une petite résidence, passer par un électricien IRVE indépendant évite tout forfait de supervision mensuel récurrent.",
      savingsEstimate: "180 € à 360 € d'économie par an sur les frais de service récurrents"
    },
    rating: 4.2,
    reviewCount: 650,
    faq: [
      {
        question: "Waat propose-t-il des bornes pour maisons individuelles ?",
        answer: "Waat concentre plus de 90 % de son activité sur l'habitat collectif, les syndics et les flottes tertiaires. Pour une maison individuelle, des installateurs IRVE locaux sont plus rapides et économiques."
      },
      {
        question: "Les bornes Waat sont-elles bridées à un seul opérateur ?",
        answer: "Non, Waat utilise des bornes interopérables répondant à la norme OCPP, ce qui permet théoriquement de changer d'opérateur de supervision sans remplacer le matériel physique."
      },
      {
        question: "Les bornes Waat sont-elles compatibles avec toutes les voitures électriques ?",
        answer: "Oui, les bornes installées par Waat sont équipées d'un socle de prise Type 2 avec obturateurs (T2S) conforme à la norme NF C 15-100, compatible avec 100 % des véhicules électriques et hybrides rechargeables du marché européen."
      },
      {
        question: "Quelle est la différence entre l'offre Waat investissement copro et tiers-investisseur ?",
        answer: "En investissement copro, le syndicat des copropriétaires achète l'infrastructure (avec 50 % d'aide Advenir) et reste propriétaire du réseau. En tiers-investisseur, Waat finance l'infrastructure et la copropriété n'avance aucun fond, mais les résidents paient un abonnement mensuel d'exploitation plus élevé."
      },
      {
        question: "Waat propose-t-il des bornes pour les entreprises et flottes professionnelles ?",
        answer: "Oui, Waat dispose d'une division B2B complète avec logiciel de supervision de flotte, refacturation automatique aux collaborateurs et badge RFID d'authentification sécurisée."
      }
    ],
    overview: "Waat s'est imposé comme l'un des principaux challengers de Zeplug en copropriété, avec un positionnement axé sur la modularité technique et l'interopérabilité des bornes.",
    strengthsSummary: "Matériel interopérable OCPP, accompagnement complet des syndics et des conseils syndicaux.",
    weaknessesSummary: "Abonnement de supervision à intégrer dans le coût global, ciblage quasi exclusif habitat collectif.",
    recommendation: "Une très bonne alternative aux acteurs historiques en copropriété si vous souhaitez éviter le verrouillage d'un opérateur propriétaire."
  },
  {
    slug: "bornes-solutions",
    publishedAt: "2025-10-09",
    updatedAt: "2026-09-24",
    name: "Bornes Solutions",
    shortName: "Bornes Solutions",
    category: "Opérateur Copropriété",
    targetMarket: ["Copropriété", "Immobilier résidentiel neuf"],
    tagline: "Filiale d'OCEA Smart Building spécialisée dans la recharge résidentielle",
    pricingModel: "Formule clé en main avec tiers-investissement LogiVolt ou fonds propres",
    estimatedBasePrice: "Borne individuelle : 750 € à 1 200 € TTC posée + service de comptage",
    middlemanCommissionRate: "Frais de comptage et de gestion de l'infrastructure partagée",
    installationDelay: "3 à 6 mois en copropriété existante",
    installedHardwareSlugs: ["schneider-charge","hager-witty-start","alfen-eve-single-pro"],
    associatedDuelSlugs: ["zeplug-vs-bornes-solutions"],
    pros: [
      "Expertise du groupe OCEA Smart Building dans la répartition des charges d'énergie",
      "Conventionnement avec le programme LogiVolt de la Banque des Territoires",
      "Infrastructure évolutive permettant de raccorder jusqu'à 100 % des places de parking"
    ],
    cons: [
      "Processus administratif lourd nécessitant plusieurs passages en AG",
      "Coût de raccordement individuel parfois jugé élevé par les premiers utilisateurs",
      "Peu présent sur le segment de la maison individuelle"
    ],
    hiddenCostsWarning: "Frais d'activation de la borne et éventuels frais de clôture de compte lors de la vente du lot de copropriété.",
    contractTerms: {
      commitment: "Convention d'opérateur signée pour 10 à 15 ans avec le syndicat des copropriétaires",
      maintenance: "Maintenance complète assurée par le gestionnaire d'infrastructure",
      cancellation: "Résiliation encadrée par la convention d'AG"
    },
    arbitrageVerdict: {
      directQuotePitch: "Bornes Solutions est un acteur institutionnel solide pour les gros ensembles immobiliers. Pour les petites copropriétés de moins de 10 lots, une convention collective simple avec un artisan IRVE local revient 30 % moins cher.",
      savingsEstimate: "Jusqu'à 40 % d'économie sur les frais de raccordement pour les petits collectifs"
    },
    rating: 4.0,
    reviewCount: 410,
    faq: [
{
        question: "Qui paye l'infrastructure avec Bornes Solutions ?",
        answer: "Grâce au dispositif LogiVolt ou à des avances de tiers-financement, la copropriété n'avance pas de trésorerie : le coût est amorti via les raccordements progressifs des usagers."
      },
      {
        question: "Les bornes installées sont-elles éligibles au crédit d'impôt ?",
        answer: "Oui, la quote-part privative d'achat et de pose de la borne donne droit au crédit d'impôt de 500 € pour le copropriétaire résident."
      },
      {
        question: "Qui est Bornes Solutions et à quel groupe appartient-il ?",
        answer: "Bornes Solutions est un opérateur historique de bornes en copropriété et résidentiel collectif, filiale du groupe OCEA Smart Building, spécialiste du comptage et du sous-comptage d'énergie en France."
      },
      {
        question: "Quelles sont les aides Advenir obtenues avec Bornes Solutions ?",
        answer: "Bornes Solutions est labellisé Advenir, ce qui permet de déduire jusqu'à 50 % des coûts de l'infrastructure collective (plafond de 8 000 €) et jusqu'à 960 € par point de recharge privatif."
      },
      {
        question: "Quel est le coût moyen de l'abonnement mensuel Bornes Solutions ?",
        answer: "L'abonnement de supervision et de maintenance varie généralement entre 9,90 € et 19,90 € TTC par mois selon les services souscrits (télé-relève, assistance dépannage 24/7 et assurance dommage)."
      }
    ],
    overview: "Bornes Solutions est la filiale dédiée à la mobilité électrique d'OCEA Smart Building, leader français du télé-relevé et de la répartition des fluides en copropriété.",
    strengthsSummary: "Savoir-faire historique du comptage d'énergie, adossement à la Banque des Territoires (LogiVolt).",
    weaknessesSummary: "Délais longs inhérents aux procédures d'AG, peu adapté aux besoins urgents.",
    recommendation: "Une solution pérenne pour les syndics professionnels cherchant un tiers de confiance institutionnel pour de grandes résidences."
  },
  {
    slug: "totalenergies",
    publishedAt: "2025-10-16",
    updatedAt: "2026-09-25",
    name: "TotalEnergies Services Recharge",
    shortName: "TotalEnergies",
    category: "Énergéticien",
    targetMarket: ["Maison individuelle", "Entreprise", "Réseau public"],
    tagline: "Le géant de l'énergie et sa solution de recharge à domicile",
    pricingModel: "Forfait matériel + pose + offre d'électricité Heures Super Creuses",
    estimatedBasePrice: "1 290 € à 1 890 € TTC posé (hors aides)",
    middlemanCommissionRate: "25 % à 35 % de marge de distribution",
    installationDelay: "3 à 5 semaines",
    installedHardwareSlugs: ["evbox-elvi","schneider-charge","wallbox-pulsar-plus"],
    associatedDuelSlugs: ["totalenergies-vs-engie-my-power"],
    pros: [
      "Offre d'électricité 'Heures Super Creuses' avec 50 % de réduction de 2h à 6h du matin",
      "Réseau national d'installateurs qualifiés IRVE",
      "Marque d'envergure internationale avec application mobile dédiée"
    ],
    cons: [
      "Catalogue de bornes souvent restreint aux modèles partenaires de la marque",
      "Sous-traitance de la pose sans contact direct préalable avec l'artisan",
      "SAV parfois complexe à joindre via la hotline énergie globale"
    ],
    hiddenCostsWarning: "L'avantage tarifaire sur l'électricité nécessite de souscrire le contrat TotalEnergies avec compteur communicant Linky.",
    contractTerms: {
      commitment: "Sans engagement sur la borne",
      maintenance: "Garantie légale 2 ans avec extension possible",
      cancellation: "Rétractation standard 14 jours"
    },
    arbitrageVerdict: {
      directQuotePitch: "TotalEnergies utilise la vente de bornes comme produit d'appel pour capter des contrats d'électricité. L'installation physique est confiée à des artisans IRVE indépendants que vous pouvez mandater en direct à tarif négocié.",
      savingsEstimate: "250 € à 500 € d'économie sur la prestation d'installation"
    },
    rating: 4.0,
    reviewCount: 1680,
    faq: [
{
        question: "L'offre TotalEnergies est-elle intéressante sans changer de contrat d'électricité ?",
        answer: "Le forfait matériel et pose reste compétitif, mais l'intérêt économique majeur réside dans le couplage avec l'offre d'électricité Heures Super Creuses."
      },
      {
        question: "Quel modèle de borne installe TotalEnergies ?",
        answer: "TotalEnergies propose généralement des bornes connectées 7,4 kW compatibles avec le pilotage intelligent pour déclencher la charge automatiquement aux heures les moins chères."
      },
      {
        question: "TotalEnergies installe-t-il des bornes en direct pour les particuliers ?",
        answer: "TotalEnergies s'appuie sur son réseau de techniciens certifiés et de sous-traitants IRVE partenaires pour assurer les visites techniques préalables et la mise en service à domicile."
      },
      {
        question: "Y a-t-il des avantages tarifaires sur le kWh avec TotalEnergies ?",
        answer: "TotalEnergies propose des formules d'électricité avec option Charge Heures Creuses (réduction substantielle entre 2h et 6h du matin), permettant de recharger à coût très optimisé."
      },
      {
        question: "Quelle borne est principalement proposée par TotalEnergies ?",
        answer: "TotalEnergies préconise principalement des bornes connectées 7,4 kW à 22 kW de marques reconnues comme Schneider Electric, EVBox et Wallbox, dotées de pilotage intelligent."
      }
    ],
    overview: "TotalEnergies accélère massivement sur la mobilité électrique avec le déploiement de stations de recharge ultra-rapides et une gamme d'offres résidentielles couplées à ses offres de fourniture d'électricité.",
    strengthsSummary: "Synergie borne + contrat d'énergie ultra-compétitif en heures creuses nocturnes.",
    weaknessesSummary: "Sous-traitance généralisée, flexibilité technique limitée sur le choix des modèles de bornes.",
    recommendation: "Très pertinent si vous comptez basculer sur leur contrat d'électricité Heures Super Creuses, sinon comparez avec un artisan IRVE direct."
  },
  {
    slug: "engie-my-power",
    publishedAt: "2025-10-23",
    updatedAt: "2026-09-26",
    name: "Engie My Power & Vianeo",
    shortName: "Engie",
    category: "Énergéticien",
    targetMarket: ["Maison individuelle", "Professionnels"],
    tagline: "Les solutions de recharge intelligente par le 1er producteur d'énergies renouvelables",
    pricingModel: "Packs tout compris matériel + installation",
    estimatedBasePrice: "1 350 € à 1 990 € TTC posé",
    middlemanCommissionRate: "28 % à 36 % de marge commerciale opérateur",
    installationDelay: "3 à 6 semaines",
    installedHardwareSlugs: ["schneider-charge","hager-witty-solar","myenergi-zappi-v2"],
    associatedDuelSlugs: ["totalenergies-vs-engie-my-power"],
    pros: [
      "Optimisation de la recharge avec l'autoconsommation solaire (solution Engie My Power)",
      "Marque reconnue avec garanties solides",
      "Éligibilité complète aux aides de l'État (TVA 5,5% et crédit d'impôt 500 €)"
    ],
    cons: [
      "Tarifs positionnés dans la fourchette haute du marché",
      "Temps de réponse du service commercial parfois long",
      "Sous-traitance à des réseaux d'installateurs tiers"
    ],
    hiddenCostsWarning: "Les travaux de génie civil (tranchée dans le jardin, percement de mur porteur) ne sont pas inclus dans le forfait de base.",
    contractTerms: {
      commitment: "Sans engagement sur la borne",
      maintenance: "Options de maintenance et dépannage via le réseau Engie Home Services",
      cancellation: "Rétractation 14 jours légaux"
    },
    arbitrageVerdict: {
      directQuotePitch: "Engie fait payer cher sa marque et sa structure commerciale. Si vous avez déjà ou prévoyez des panneaux solaires, un installateur IRVE spécialisé dans le couplage photovoltaïque vous installera une borne solaire (comme la Zappi) pour 400 € de moins.",
      savingsEstimate: "350 € à 600 € d'économie en direct artisan"
    },
    rating: 3.9,
    reviewCount: 1120,
    faq: [
{
        question: "Peut-on coupler la borne Engie avec des panneaux solaires existants ?",
        answer: "Oui, Engie propose des options de délestage et de pilotage intelligent pour synchroniser la charge avec la production solaire de l'habitat."
      },
      {
        question: "Engie installe-t-il des bornes couplées avec panneaux solaires ?",
        answer: "Oui, la division Engie My Power est spécialisée dans l'autoconsommation photovoltaïque couplée à la borne de recharge, avec gestion dynamique des flux pour recharger en priorité avec l'électricité solaire produite sur votre toit."
      },
      {
        question: "Quel est le tarif d'une borne Engie avec pose comprise ?",
        answer: "Le forfait de base démarre autour de 1 350 € TTC posé pour une borne 7,4 kW monophasée, avant déduction du crédit d'impôt de 500 € pour les particuliers éligibles."
      },
      {
        question: "Engie assure-t-il la conformité Consuel de l'installation ?",
        answer: "L'installateur IRVE partenaire d'Engie fournit l'attestation de conformité réglementaire indispensable pour votre assureur habitation et pour la garantie de parfait achèvement."
      }
    ],
    overview: "Engie commercialise des bornes de recharge pour particuliers à travers ses branches Engie Home Services et Engie My Power, en ciblant notamment les propriétaires de maisons individuelles et les projets mixtes solaire + mobilité.",
    strengthsSummary: "Expertise conjointe photovoltaïque et recharge, solidité institutionnelle.",
    weaknessesSummary: "Prix élevés, parcours client administratif parfois lourd.",
    recommendation: "À considérer principalement si vous financez un projet global panneaux solaires + borne, sinon passez par un installateur IRVE indépendant."
  },
  {
    slug: "proxiserve",
    publishedAt: "2025-11-04",
    updatedAt: "2026-09-27",
    name: "Proxiserve",
    shortName: "Proxiserve",
    category: "Installateur National Réseau",
    targetMarket: ["Maison individuelle", "Bailleurs", "Flottes d'entreprises"],
    tagline: "Le spécialiste historique des services à l'habitat et de la pose IRVE",
    pricingModel: "Forfait d'installation standardisé avec techniciens intégrés",
    estimatedBasePrice: "1 190 € à 1 750 € TTC posé",
    middlemanCommissionRate: "20 % à 30 % de marge d'entreprise générale",
    installationDelay: "2 à 3 semaines (réseau d'agences locales)",
    installedHardwareSlugs: ["schneider-charge","hager-witty-start","legrand-green-up-one"],
    associatedDuelSlugs: ["chargeguru-vs-izi-by-edf", "izi-by-edf-vs-leroy-merlin"],
    pros: [
      "Réseau de techniciens salariés dans de nombreuses agences régionales",
      "Partenariats constructeurs automobiles historiques (Renault, Stellantis, BMW)",
      "Délais d'intervention généralement rapides grâce au maillage local"
    ],
    cons: [
      "Gamme de bornes souvent imposée par les accords constructeurs",
      "Rigidité sur les chantiers complexes ou les demandes sur-mesure",
      "Tarifs des options de raccordement élevés"
    ],
    hiddenCostsWarning: "Vérifiez bien la conformité de votre tableau électrique : Proxiserve impose souvent une remise aux normes préalable facturée en supplément.",
    contractTerms: {
      commitment: "Sans engagement",
      maintenance: "Contrat d'entretien annuel disponible",
      cancellation: "Rétractation 14 jours"
    },
    arbitrageVerdict: {
      directQuotePitch: "Proxiserve est le partenaire par défaut recommandé en concession automobile lors de l'achat d'un véhicule. Les concessions touchent souvent une commission sur chaque dossier apporté. Vous n'avez aucune obligation de passer par eux : vous pouvez choisir librement votre électricien IRVE.",
      savingsEstimate: "200 € à 450 € d'économie en refusant le partenaire imposé par la concession"
    },
    rating: 4.1,
    reviewCount: 3100,
    faq: [
{
        question: "Suis-je obligé d'utiliser Proxiserve si ma concession me le recommande ?",
        answer: "Absolument pas. Vous avez la liberté totale de choisir votre installateur IRVE. Les aides d'État (crédit d'impôt 500 €) s'appliquent avec n'importe quel professionnel qualifié IRVE."
      },
      {
        question: "Proxiserve emploie-t-il ses propres techniciens ?",
        answer: "Oui, Proxiserve dispose d'un réseau important d'agences avec des techniciens salariés qualifiés IRVE, complété ponctuellement par des sous-traitants agréés."
      },
      {
        question: "Proxiserve est-il agréé par les constructeurs automobiles ?",
        answer: "Oui, Proxiserve est le partenaire officiel de nombreux constructeurs automobiles (Renault, Stellantis, BMW, Nissan) pour installer les bornes des acquéreurs de véhicules neufs en concession."
      },
      {
        question: "Pourquoi les devis Proxiserve sont-ils parfois plus chers qu'un artisan local ?",
        answer: "Proxiserve est un grand groupe national avec des coûts de structure importants et des commissions versées aux concessions partenaires, ce qui se traduit par un prix de pose 20 % à 30 % plus élevé qu'un installateur IRVE indépendant."
      },
      {
        question: "Combien de temps dure l'intervention d'installation Proxiserve ?",
        answer: "La pose en maison individuelle prend généralement une demi-journée (3 à 5 heures) pour une configuration standard à proximité immédiate du tableau électrique principal."
      }
    ],
    overview: "Proxiserve est l'un des pionniers de la pose de bornes en France, fort de partenariats exclusifs signés avec les plus grands constructeurs automobiles européens.",
    strengthsSummary: "Salariés qualifiés IRVE, rapidité d'intervention, validation directe des dossiers constructeurs.",
    weaknessesSummary: "Marges d'intermédiation concession, personnalisation limitée de l'installation.",
    recommendation: "Un choix pratique si recommandé par votre concessionnaire, mais toujours à mettre en concurrence avec 2 artisans locaux."
  },
  {
    slug: "mon-rezo",
    publishedAt: "2025-11-12",
    updatedAt: "2026-09-28",
    name: "Mon Réseau Électrique (E-Station)",
    shortName: "Mon Rézo",
    category: "Installateur National Réseau",
    targetMarket: ["Maison individuelle", "TPE / PME", "Copropriété"],
    tagline: "Plateforme de mise en relation et de gestion de chantiers IRVE",
    pricingModel: "Courtage et forfait d'installation direct",
    estimatedBasePrice: "1 250 € à 1 800 € TTC posé",
    middlemanCommissionRate: "22 % à 30 % de commission de mise en relation",
    installationDelay: "2 à 4 semaines",
    installedHardwareSlugs: ["schneider-charge","wallbox-pulsar-plus"],
    associatedDuelSlugs: ["zeplug-vs-waat", "zeplug-vs-bornes-solutions"],
    pros: [
      "Large choix multimarques de bornes (Wallbox, Hager, Enelion)",
      "Accompagnement réactif et devis digitalisé",
      "Sélection d'artisans IRVE audités"
    ],
    cons: [
      "Intermédiation commerciale entre le client et l'artisan",
      "Présence inégale selon les départements ruraux",
      "SAV délégué au sous-traitant exécutant"
    ],
    hiddenCostsWarning: "Bien clarifier le périmètre des garanties pièces et main d'œuvre en cas de défaillance matérielle après la 1ère année.",
    contractTerms: {
      commitment: "Sans engagement",
      maintenance: "En option",
      cancellation: "Rétractation légale"
    },
    arbitrageVerdict: {
      directQuotePitch: "Mon Réseau Électrique sélectionne des artisans locaux pour vous, mais prélève sa commission de courtage au passage. En utilisant notre comparateur, vous entrez en contact direct avec ces mêmes installateurs certifiés.",
      savingsEstimate: "250 € à 500 € d'économie en direct"
    },
    rating: 4.2,
    reviewCount: 380,
    faq: [
{
        question: "Les devis sont-ils gratuits ?",
        answer: "Oui, l'établissement du devis et l'étude technique préliminaire sont entièrement gratuits et sans engagement."
      },
      {
        question: "Quel est le modèle d'opérateur proposé par Mon Rézo ?",
        answer: "Mon Rézo se positionne comme opérateur tiers-investisseur pour les copropriétés et parkings d'immeubles, prenant en charge le coût de l'infrastructure en contrepartie d'abonnements d'usage."
      },
      {
        question: "Les résidents non-possesseurs de VE doivent-ils payer quelque chose ?",
        answer: "Non, le modèle tiers-financeur de Mon Rézo garantit que zéro euro n'est réclamé aux copropriétaires qui n'utilisent pas de véhicule électrique."
      },
      {
        question: "Comment est mesurée la consommation d'énergie de chaque place ?",
        answer: "Chaque borne intègre un compteur certifié MID (Measuring Instruments Directive) avec transmission automatisée des données de consommation pour facturation au centime près."
      }
    ],
    overview: "Mon Réseau Électrique fédère des installateurs IRVE indépendants à travers une plateforme digitale facilitant le dimensionnement et la mise en conformité des installations.",
    strengthsSummary: "Approche multimarque, bon contact client, devis rapides.",
    weaknessesSummary: "Réseau plus récent, commission d'intermédiation classique.",
    recommendation: "Une alternative correcte aux grands groupes, mais le contact direct artisan reste plus économique."
  },
  {
    slug: "sowee",
    publishedAt: "2025-11-20",
    updatedAt: "2026-09-29",
    name: "Sowee (Station Connectée Borne)",
    shortName: "Sowee",
    category: "Énergéticien",
    targetMarket: ["Maison individuelle"],
    tagline: "La filiale connectée d'EDF dédiée au pilotage énergétique",
    pricingModel: "Pack borne connectée + thermostat piloté",
    estimatedBasePrice: "1 350 € à 1 950 € TTC posé",
    middlemanCommissionRate: "25 % à 35 % de marge packagée",
    installationDelay: "3 à 5 semaines",
    installedHardwareSlugs: ["schneider-charge","hager-witty-start"],
    associatedDuelSlugs: ["chargeguru-vs-izi-by-edf", "totalenergies-vs-engie-my-power"],
    pros: [
      "Pilotage intelligent de la charge pour éviter les dépassements de puissance Linky",
      "Écosystème domotique complet (gestion chauffage + recharge électrique)",
      "Financement possible via les mensualités d'énergie"
    ],
    cons: [
      "Choix de bornes limité à la gamme partenaire",
      "Obligation de s'inscrire dans l'écosystème domotique Sowee pour exploiter 100 % des fonctionnalités",
      "Prix du pack global élevé"
    ],
    hiddenCostsWarning: "Frais d'abonnement au service de pilotage connecté Sowee au-delà de la période de promotion initiale.",
    contractTerms: {
      commitment: "Abonnement de service associé à la station connectée",
      maintenance: "Assistance technique EDF",
      cancellation: "Rétractation 14 jours"
    },
    arbitrageVerdict: {
      directQuotePitch: "Sowee packagera souvent des services dont vous n'avez pas besoin si votre voiture ou votre borne gère déjà la programmation des heures creuses. Une borne standard avec délestage TIC Linky installée en direct fait la même chose pour 400 € de moins sans abonnement.",
      savingsEstimate: "300 € à 500 € d'économie en évitant les packs domotiques superflus"
    },
    rating: 3.8,
    reviewCount: 520,
    faq: [
{
        question: "La borne Sowee nécessite-t-elle la station connectée Sowee ?",
        answer: "Elle peut fonctionner seule, mais tout l'intérêt commercial et fonctionnel repose sur l'intégration avec la station connectée pour optimiser la facture d'électricité."
      },
      {
        question: "Sowee est-elle une filiale d'EDF ?",
        answer: "Oui, Sowee est une filiale à 100 % du groupe EDF, spécialisée dans les objets connectés, la domotique et la gestion intelligente de l'énergie dans le foyer."
      },
      {
        question: "Quelle est la particularité de la station connectée Sowee avec borne ?",
        answer: "La station Sowee pilote la borne en fonction des heures creuses, des tarifs de l'électricité et de la puissance totale disponible pour maximiser les économies d'énergie."
      },
      {
        question: "Peut-on installer une borne Sowee sans être client électricité Sowee ?",
        answer: "Les offres d'installation sont souvent couplées pour offrir une remise commerciale, mais il est possible d'obtenir la prestation avec maintien de son fournisseur actuel."
      }
    ],
    overview: "Sowee est la filiale domotique d'EDF qui propose des solutions de pilotage intelligent du chauffage et de la recharge automobile.",
    strengthsSummary: "Gestion fine de la puissance souscrite, intégration domotique soignée.",
    weaknessesSummary: "Coût élevé, dépendance à un écosystème propriétaire fermé.",
    recommendation: "Intéressant uniquement pour les foyers déjà équipés de la station connectée Sowee."
  },
  {
    slug: "yespark",
    publishedAt: "2025-11-27",
    updatedAt: "2026-09-30",
    name: "Yespark Recharge",
    shortName: "Yespark",
    category: "Opérateur Copropriété",
    targetMarket: ["Locataires", "Copropriétaires sans place privative", "Parkings partagés"],
    tagline: "La location de place de parking sécurisée avec borne de recharge dédiée",
    pricingModel: "Abonnement mensuel tout inclus (parking + borne + électricité)",
    estimatedBasePrice: "89 € à 190 €/mois (place de parking + borne incluse selon la ville)",
    middlemanCommissionRate: "Modèle locatif mensuel sans apport initial",
    installationDelay: "Immédiat (accès à des places de parking déjà équipées)",
    installedHardwareSlugs: ["schneider-charge", "wallbox-pulsar-plus"],
    associatedDuelSlugs: ["yespark-vs-parknplug"],
    pros: [
      "Zéro travaux chez soi, idéal pour les locataires ou résidences sans parking adapté",
      "Sans engagement de durée (résiliation mensuelle en 1 clic)",
      "Réseau dense de parkings souterrains dans les grandes métropoles (Paris, Lyon, Marseille)"
    ],
    cons: [
      "Coût récurrent cumulé élevé sur plusieurs années",
      "La place n'est pas située directement dans votre propre immeuble (quelques minutes de marche)",
      "Disponibilité dépendante du parc de parkings partenaires"
    ],
    hiddenCostsWarning: "Dépassement tarifaire si vous consommez au-delà du forfait de kWh mensuel inclus dans certaines formules.",
    contractTerms: {
      commitment: "Sans engagement (abonnement mensuel reconductible)",
      maintenance: "100 % prise en charge par Yespark",
      cancellation: "Résiliation libre chaque mois via l'application mobile"
    },
    arbitrageVerdict: {
      directQuotePitch: "Yespark est une formidable solution d'attente pour un locataire. Mais dès lors que vous êtes propriétaire de votre place en copropriété, faire valoir votre 'Droit à la prise' pour poser votre propre borne est rentabilisé en moins de 18 mois par rapport au coût de location mensuel Yespark.",
      savingsEstimate: "1 200 € à 1 800 € d'économie par an en devenant propriétaire de sa borne"
    },
    rating: 4.4,
    reviewCount: 2200,
    faq: [
{
        question: "À qui s'adresse l'offre Yespark Recharge ?",
        answer: "Aux automobilistes vivant en appartement sans garage ou dont la copropriété tarde à voter les travaux de recharge. Vous louez une place équipée dans un parking voisin."
      },
      {
        question: "Comment fonctionne l'offre Yespark pour la recharge de voiture électrique ?",
        answer: "Yespark, leader de la location de places de parking en sous-sol, équipe ses parkings de bornes de recharge pour proposer des forfaits mensuels combinant stationnement garanti et recharge illimitée ou au forfait."
      },
      {
        question: "L'offre Yespark s'adresse-t-elle aux locataires sans parking privé ?",
        answer: "Oui, c'est la solution idéale pour les citadins habitant en immeuble ancien sans parking qui souhaitent recharger leur véhicule chaque nuit à proximité immédiate de leur domicile."
      },
      {
        question: "Les bornes Yespark sont-elles partagées ou privatives ?",
        answer: "La place de parking louée chez Yespark est strictement privative, tout comme la borne de recharge qui y est installée."
      }
    ],
    overview: "Yespark transforme des parkings souterrains d'immeubles ou de bailleurs sociaux en hubs de stationnement et de recharge partagés.",
    strengthsSummary: "Zéro délai de travaux, flexibilité absolue pour locataires, gestion 100 % smartphone.",
    weaknessesSummary: "Coût cumulé sur le long terme, contrainte du déplacement à pied jusqu'au parking.",
    recommendation: "La meilleure solution temporaire pour les citadins en attente d'une solution dans leur propre immeuble."
  },
  {
    slug: "parknplug",
    publishedAt: "2025-12-05",
    updatedAt: "2026-10-01",
    name: "Park'n Plug",
    shortName: "Park'n Plug",
    category: "Opérateur Copropriété",
    targetMarket: ["Copropriété", "Entreprises", "Promoteurs immobiliers"],
    tagline: "L'ingénierie de recharge pour les copropriétés et ensembles tertiaires",
    pricingModel: "Investissement collectif subventionné ou délégation de service",
    estimatedBasePrice: "Borne : 790 € à 1 290 € TTC posée + frais de supervision",
    middlemanCommissionRate: "Marge d'ingénierie et redevance récurrente de gestion",
    installationDelay: "3 à 6 mois en copropriété",
    installedHardwareSlugs: ["alfen-eve-single-pro","schneider-charge"],
    associatedDuelSlugs: ["yespark-vs-parknplug"],
    pros: [
      "Bureau d'études intégré pour le dimensionnement électrique précis des colonnes de parkings",
      "Éligibilité aux subventions Advenir et dispositifs d'avances",
      "Bornes robustes certifiées pour usage intensif en sous-sol"
    ],
    cons: [
      "Tarifs de prestation d'ingénierie élevés pour les petites copropriétés",
      "Frais de gestion mensuels par point de charge",
      "Peu réactif sur les demandes individuelles hors marché groupé"
    ],
    hiddenCostsWarning: "Frais de maintenance annuelle obligatoire pour conserver la garantie sur l'infrastructure collective.",
    contractTerms: {
      commitment: "Convention pluriannuelle avec le syndicat des copropriétaires",
      maintenance: "Contrat de maintenance préventive et corrective",
      cancellation: "Selon modalités d'AG"
    },
    arbitrageVerdict: {
      directQuotePitch: "Park'n Plug est un acteur sérieux de l'ingénierie collective. Mais pour de nombreuses copropriétés, la solution publique Enedis (colonne horizontale) offre une neutralité absolue et zéro frais de supervision logicielle privée.",
      savingsEstimate: "Économie de l'intégralité des frais de supervision mensuels via le réseau public"
    },
    rating: 4.1,
    reviewCount: 320,
    faq: [
{
        question: "Park'n Plug gère-t-il les démarches avec le syndic ?",
        answer: "Oui, Park'n Plug fournit des dossiers clés en main pour l'Assemblée Générale comprenant les résolutions types, les plans de câblage et les simulations financières."
      },
      {
        question: "Quelle est la technologie utilisée par Park'n Plug en copropriété ?",
        answer: "Park'n Plug installe une infrastructure en bus d'alimentation sécurisée avec bornes intelligentes communicantes et plateforme de supervision en ligne dédiée au conseil syndical."
      },
      {
        question: "La solution Park'n Plug permet-elle l'arbitrage des heures creuses ?",
        answer: "Oui, la supervision permet aux résidents de programmer leur recharge exclusivement pendant les plages horaires les plus économiques de leur abonnement."
      },
      {
        question: "Quelles sont les qualifications des poseurs Park'n Plug ?",
        answer: "Toutes les interventions sont assurées par des techniciens titulaires de la mention IRVE Niveau P2 ou P3 requise pour les installations collectives en bâtiment d'habitation."
      }
    ],
    overview: "Park'n Plug est un opérateur spécialisé dans l'infrastructure de recharge pour les parcs de stationnement partagés et les copropriétés résidentielles.",
    strengthsSummary: "Qualité d'ingénierie, conception de réseaux évolutifs, accompagnement syndic.",
    weaknessesSummary: "Coûts de gestion récurrents, délais de prise de décision collective.",
    recommendation: "À mettre en concurrence directe avec Waat et la solution Enedis lors de votre prochaine AG."
  },
  {
    slug: "logivolt",
    publishedAt: "2025-12-14",
    updatedAt: "2026-10-01",
    name: "LogiVolt Territoires",
    shortName: "LogiVolt",
    category: "Gestionnaire de Réseau",
    targetMarket: ["Copropriété", "Bailleurs sociaux"],
    tagline: "Le tiers-financement public de la Banque des Territoires pour équiper les parkings",
    pricingModel: "Avance à 100 % du coût de l'infrastructure collective (zéro reste à charge pour la copro)",
    estimatedBasePrice: "0 € pour la copropriété / Raccordement individuel lors de l'achat de la borne",
    middlemanCommissionRate: "Dispositif public (frais financiers mutualisés et amortis sur les raccordements)",
    installationDelay: "4 à 8 mois pour le déploiement complet",
    installedHardwareSlugs: ["schneider-charge","hager-witty-start","waat"],
    associatedDuelSlugs: ["zeplug-vs-bornes-solutions", "zeplug-vs-waat"],
    pros: [
      "Zéro avance de trésorerie pour le syndicat des copropriétaires",
      "Soutien de la Caisse des Dépôts et de l'État (Banque des Territoires)",
      "Vote facilité en Assemblée Générale (aucun copropriétaire non utilisateur ne paye)"
    ],
    cons: [
      "Frais de raccordement individuel fixé par l'opérateur conventionné (souvent entre 400 € et 700 €)",
      "Processus administratif rigoureux nécessitant la validation du dossier LogiVolt",
      "Obligation de passer par un opérateur de recharge conventionné par LogiVolt"
    ],
    hiddenCostsWarning: "Chaque utilisateur qui décide d'installer une borne paye sa quote-part de raccordement à l'infrastructure LogiVolt au moment de son branchement.",
    contractTerms: {
      commitment: "Convention d'infrastructure sur 15 à 20 ans",
      maintenance: "Assurée par l'opérateur délégataire conventionné",
      cancellation: "Encadrée par la charte LogiVolt Banque des Territoires"
    },
    arbitrageVerdict: {
      directQuotePitch: "LogiVolt est le levier financier public par excellence pour débloquer les AG de copropriété réfractaires. C'est la meilleure alternative aux opérateurs privés verrouillés car LogiVolt impose un cahier des charges d'interopérabilité technique strict.",
      savingsEstimate: "100 % de l'avance de trésorerie collective économisée pour la copropriété"
    },
    rating: 4.5,
    reviewCount: 560,
    faq: [
{
        question: "Qu'est-ce que le dispositif LogiVolt ?",
        answer: "LogiVolt est une initiative de la Banque des Territoires (Caisse des Dépôts) qui préfinance l'infrastructure électrique collective des parkings de copropriété pour lever le frein financier du vote en AG."
      },
      {
        question: "Qui rembourse LogiVolt ?",
        answer: "Ce sont les seuls copropriétaires qui demandent à installer une borne qui remboursent progressivement l'infrastructure via un droit de raccordement individuel au moment de leur installation."
      },
      {
        question: "Qu'est-ce que LogiVolt et quel est le rôle de la Caisse des Dépôts ?",
        answer: "LogiVolt Territoires est une société créée par la Banque des Territoires (Groupe Caisse des Dépôts) pour financer à 100 % l'infrastructure de recharge dans les copropriétés sans aucun reste à charge pour le syndicat des copropriétaires."
      },
      {
        question: "Comment LogiVolt se rembourse-t-il sur les copropriétaires ?",
        answer: "LogiVolt applique un droit de connexion remboursé uniquement par les utilisateurs qui demandent le raccordement d'une borne sur leur place, étalé sur la durée."
      },
      {
        question: "Pourquoi LogiVolt est-il un concurrent direct de Zeplug et Waat ?",
        answer: "LogiVolt offre une garantie de neutralité publique (Caisse des Dépôts) et permet à la copropriété de choisir librement son opérateur de travaux et de maintenance, contrairement aux systèmes captifs."
      }
    ],
    overview: "Créé par la Banque des Territoires, LogiVolt est le dispositif public de référence pour accélérer l'équipement des 10 millions de places de stationnement en copropriété en France.",
    strengthsSummary: "Financement public garanti, zéro dépense pour la copro, gouvernance transparente.",
    weaknessesSummary: "Délais d'instruction de dossier, obligation de choisir un opérateur certifié LogiVolt.",
    recommendation: "La formule reine à présenter en AG de copropriété pour désamorcer les conflits entre conducteurs d'électriques et non-utilisateurs."
  },
  {
    slug: "enedis-colonne-horizontale",
    publishedAt: "2025-12-22",
    updatedAt: "2026-10-02",
    name: "Enedis (Réseau Public Colonne Horizontale)",
    shortName: "Enedis",
    category: "Gestionnaire de Réseau",
    targetMarket: ["Copropriété"],
    tagline: "Le réseau public de distribution d'électricité étendu jusqu'aux places de parking",
    pricingModel: "Préfinancement TURPE à 100 % par Enedis + quote-part individuelle au raccordement",
    estimatedBasePrice: "0 € pour la copropriété / Quote-part individuelle Linky d'environ 600 € à 1 000 €",
    middlemanCommissionRate: "Tarif public réglementé fixé par la Commission de Régulation de l'Énergie (CRE)",
    installationDelay: "6 à 12 mois selon la complexité du raccordement au réseau de distribution",
    installedHardwareSlugs: ["schneider-charge","hager-witty-start","tesla-wall-connector-gen-3","wallbox-pulsar-plus"],
    associatedDuelSlugs: ["zeplug-vs-waat", "zeplug-vs-bornes-solutions"],
    pros: [
      "Neutralité et indépendance totale : chaque résident a son propre compteur Linky",
      "Liberté absolue de choisir son fournisseur d'électricité (EDF, Total, Enercoop, Tempo)",
      "Zéro abonnement de service ou de supervision privée à payer chaque mois",
      "Infrastructure intégrée au domaine public gérée et entretenue à vie par Enedis"
    ],
    cons: [
      "Délais d'instruction et de réalisation par Enedis souvent les plus longs du marché",
      "Nécessite une convention de raccordement signée par le syndic",
      "Quote-part individuelle de raccordement non négligeable pour le résident"
    ],
    hiddenCostsWarning: "Prévoyez les frais d'ouverture de compteur Linky classique auprès du fournisseur d'énergie choisi.",
    contractTerms: {
      commitment: "Sans engagement auprès d'un tiers : vous êtes abonné standard au réseau Enedis",
      maintenance: "Maintenance du réseau public prise en charge à 100 % par Enedis via le TURPE",
      cancellation: "Résiliation libre de votre contrat d'énergie particulier"
    },
    arbitrageVerdict: {
      directQuotePitch: "C'est la solution reine sur le plan de la souveraineté et des économies à long terme. Contrairement aux opérateurs privés (Zeplug, Waat) qui vous facturent un abonnement mensuel à vie, la colonne horizontale Enedis vous donne un compteur Linky direct. Vous rechargez au tarif réglementé EDF (ex: 0,16 €/kWh en heures creuses Tempo contre 0,30 € à 0,45 € chez les opérateurs privés).",
      savingsEstimate: "500 € à 1 200 € d'économie par an sur la consommation électrique par rapport à un opérateur privé"
    },
    rating: 4.6,
    reviewCount: 4800,
    faq: [
{
        question: "Pourquoi choisir Enedis plutôt qu'un opérateur privé en copropriété ?",
        answer: "Parce que vous évitez d'être captif d'un contrat privé avec abonnement obligatoire. Vous rechargez au prix de marché réel de l'électricité avec votre propre contrat individuel."
      },
      {
        question: "Combien de temps faut-il pour qu'Enedis installe le réseau public ?",
        answer: "Le délai moyen varie entre 6 et 10 mois entre le vote en AG et la mise sous tension de la colonne électrique de parking."
      },
      {
        question: "Pourquoi la colonne horizontale Enedis est-elle la solution la plus recommandée par l'AVERE ?",
        answer: "Parce qu'elle intègre le réseau du parking au Réseau Public de Distribution d'Électricité (RPD). Chaque copropriétaire dispose de son propre compteur Linky officiel et conserve la liberté absolue de choisir son fournisseur d'énergie et son tarif."
      },
      {
        question: "Quel est le coût réel pour la copropriété avec la solution Enedis ?",
        answer: "0 € pour la copropriété lors du vote en AG. Enedis préfinance l'intégralité des travaux d'infrastructure dans le cadre du dispositif légal LOM. Seuls les résidents qui installent une borne paient une quote-part réglementée lors de leur raccordement."
      },
      {
        question: "Peut-on faire poser n'importe quelle borne de recharge sur une colonne Enedis ?",
        answer: "Oui, 100 % des bornes du marché (Tesla, Schneider, Hager, Wallbox, Legrand) sont compatibles car chaque place bénéficie d'une alimentation 230V monophasée standard indépendante."
      }
    ],
    overview: "La solution 'Réseau Public de Distribution' d'Enedis étend le réseau public d'électricité au sous-sol des copropriétés. Elle permet à chaque place de disposer d'un compteur Linky dédié, finançable sans avance grâce au TURPE (loi Climat et Résilience).",
    strengthsSummary: "Indépendance totale, tarif du kWh direct sans surtaxe opérateur, zéro abonnement de service privé, maintenance publique garantie.",
    weaknessesSummary: "Délais administratifs Enedis parfois longs.",
    recommendation: "La recommandation n°1 de notre comparateur pour toute copropriété qui souhaite une solution pérenne, souveraine et au coût d'usage le plus bas."
  }
];
