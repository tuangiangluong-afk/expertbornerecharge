#!/usr/bin/env python3
"""
Track 1 for thermostatcopropriete.fr - graft the "DPE Collectif & PPT" cluster.

Pure content addition: three new MDX files under src/content/guides/. No
Header / route / lib / TS change. The existing guides/[slug] page renderer,
generateStaticParams, sitemap, and HowTo-schema generator all enumerate
src/content/guides/ via getAllGuides() -> fs.readdirSync, so new files
propagate automatically to the /guides index, /sitemap.xml, and prerender.

The 3 files form a tight topic cluster (obligation + prix + PPT) with
in-body links to the existing guides (decret-bacs, CEE, audit-chaufferie) and
one contextual external link to expertpompeachaleur.com (the vertical
integration loop). No sitewide mesh - only topically-relevant, contextual.
"""
from pathlib import Path
import subprocess
import sys

REPO = Path("/Users/marc/Downloads/project-zero/thermostatcopropriete.fr")
GUIDES_DIR = REPO / "src/content/guides"

FILES = {
    "obligation-dpe-collectif-copropriete-calendrier-par-taille.mdx": '''---
title: "DPE Collectif Obligatoire en Copropriété : Calendrier, Seuils et Sanctions"
image: "/api/og"
description: "Le DPE immeuble (ex-CREPE) devient progressivement obligatoire pour les copropriétés dont le permis date d'avant juin 2001. Qui est concerné, selon quel calendrier, que couvre l'étude, et quelles sanctions en cas de carence."
publishedAt: "2026-09-15"
category: "Obligation"
readTime: "9 min"
author: "Expert Thermostat Copropriété"
---

# DPE Collectif Obligatoire en Copropriété : Calendrier, Seuils et Sanctions

Le **DPE collectif** — officiellement « **diagnostic de performance énergétique de l'immeuble** », l'ex-**CREPE** — s'impose progressivement à toutes les copropriétés françaises dont le permis de construire a été déposé **avant le 1er juin 2001**. Introduit par la loi Énergie-Climat de 2019, structuré par la loi **Climat & Résilience** (n° 2021-1104 du 22 août 2021, art. 260), puis **étendu à l'ensemble des copropriétés** par la loi n° 2024-467 du 25 juin 2024, il devient le document-clef sur lequel s'appuient à la fois l'affichage obligatoire, les décisions d'Assemblée Générale et le **plan pluriannuel de travaux** ([PPT](/guides/plan-pluriannuel-travaux-ppt-copropriete-cas-1-cas-2-cas-3)).

<CtaButton text="Estimer le budget DPE collectif pour votre copro" url="#simulateur" />

## Le DPE Collectif est-il Obligatoire pour ma Copropriété ?

**Réponse Directe** : **oui**, dès lors que votre immeuble a un permis de construire déposé **avant le 1er juin 2001** et comporte des **lots à usage de résidence principale**. Les copropriétés dont le permis est postérieur à cette date sont déjà couvertes par le DPE « immeuble neuf ». Le calendrier d'entrée en vigueur est **dégressif selon le nombre de lots** : les plus grandes copropriétés sont concernées en premier, les plus petites suivent jusqu'en 2028.

| Taille de la copropriété | Échéance d'obligation du DPE immeuble |
|---|---|
| Plus de 200 lots | Depuis le **1er janvier 2025** |
| 50 à 200 lots | À partir du **1er janvier 2026** |
| 20 à 49 lots | À partir du **1er janvier 2027** |
| Moins de 20 lots | À partir du **1er janvier 2028** |

<Callout title="À retenir">
Ces dates proviennent de la **loi 2021-1104** et de la **loi 2024-467**. Le décret d'application par tranche reste **ajustable** : vérifiez systématiquement l'échéance applicable à votre copropriété sur [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F14580) avant de voter un budget.
</Callout>

## Que Couvre Concrètement le DPE Collectif ?

**Réponse Directe** : le DPE immeuble évalue la performance énergétique et climatique de **la copropriété en tant que bâtiment** — ses **parties communes**, ses **équipements collectifs** (chauffage, eau chaude sanitaire, ventilation, éclairage), son **enveloppe** (toiture, façades, menuiseries communes) et un **échantillon de logements privatifs** représentatif. Il aboutit à une **étiquette globale** (A à G) et à un classement des secteurs de la copropriété.

Trois méthodes sont admises (arrêté du 13 décembre 2024) :

| Méthode | Principe | Usage typique |
|---|---|---|
| **148** | Factures réelles (3 ans) | Copros avec chauffage collectif centralisé |
| **158-3CL** | Calcul 3CL-Collectif | Copros avec données physiques complètes |
| **163** | Logement témoin | Copros homogènes, échantillon représentatif |

Le choix de la méthode dépend fortement du **type de chauffage** et de la **qualité des données disponibles** : il influence directement le coût de l'étude.

## Différence entre DPE Collectif, DPE de Logement et CREPE

**Réponse Directe** : trois diagnostics souvent confondus mais juridiquement distincts.

| Diagnostic | Objet | Portée |
|---|---|---|
| **DPE logement** | Un appartement ou une maison | Vente / location d'un lot privatif |
| **CREPE** (ex-DPE immeuble) | L'immeuble entier, depuis 2007 | Abrogé au profit du nouveau DPE immeuble pour les copros |
| **DPE collectif (ex-CREPE)** | L'immeuble + échantillon de lots | Base du PPT et de l'affichage obligatoire |

Le passage du **CREPE** au **DPE collectif** a notamment été marqué par l'intégration de l'**étiquette climat (GES)**, d'un format visuel commun au DPE logement, et d'une méthodologie rénovée.

## Qui Mandate le DPE Collectif et Qui le Paie ?

Le **syndic** lance la consultation après **vote en AG** (majorité de l'article 24 du décret du 17 mars 1967). Le coût est inscrit au **budget prévisionnel** et réparti entre copropriétaires selon les **tantièmes de parties communes**. Un **conseil syndical actif** doit systématiquement mettre en concurrence au moins **trois bureaux d'études thermiques ou diagnostiqueurs certifiés DPE immeuble** avec assurance professionnelle valide.

## Que Risque une Copropriété sans DPE Collectif ?

**Réponse Directe** : il n'existe **pas d'amende pénale directe** pour une copropriété qui ne réalise pas son DPE collectif dans les délais. Les risques sont **d'un autre ordre, et souvent plus coûteux** :

- **Responsabilité civile du syndicat** en cas de préjudice démontré (décote à la vente d'un lot, litige locatif).
- **Opposabilité au syndicat** : un acquéreur ou locataire qui subit un préjudice tiré d'une information manquante peut attaquer.
- **PPT impossible à élaborer** : sans DPE collectif à jour, le plan pluriannuel de travaux (cas 2 et 3) ne peut pas être voté valablement en AG.
- **Affichage obligatoire non réalisé** dans les immeubles de 50 lots et plus.
- **Perte d'accès à certaines aides** (CEE « coup de pouce », MaPrimeRénov' Copropriété) qui conditionnent le dossier à un DPE récent.

## DPE Collectif et Passoires Énergétiques : le Déclencheur du Plan de Travaux

Le DPE collectif n'est **pas une fin en soi** : c'est le document qui va **débloquer la discussion en AG** sur le scénario de travaux. Une copropriété classée **F ou G** entrera presque mécaniquement dans le champ du [plan pluriannuel de travaux renforcé (Cas 3)](/guides/plan-pluriannuel-travaux-ppt-copropriete-cas-1-cas-2-cas-3), avec **audit énergétique préalable obligatoire** pour certaines tailles de copro. Pour les immeubles équipés d'une chaufferie collective vieillissante, le passage naturel se fait vers une **remise en cause du mode de chauffage** : [audit de chaufferie collective](/guides/audit-chaufferie-collective-vote-ag-copropriete), puis solution **pompe à chaleur collective ou hybride** (voir par exemple [Expert Pompe à Chaleur](https://www.expertpompeachaleur.com/) pour le volet individuel et collectif du remplacement).

Le DPE collectif devient donc la **tête d'entonnoir réglementaire** de toute la chaîne : il déclenche le PPT, le PPT déclenche l'audit, l'audit déclenche les travaux, et les travaux se financent en grande partie via les [certificats d'économie d'énergie (CEE)](/guides/subventions-cee-fiches-bar-th-118-bar-th-158).

## Questions Fréquentes

### Le DPE collectif est-il obligatoire pour les petites copropriétés ?
Oui, mais avec une échéance repoussée : les copropriétés de moins de 20 lots basculent dans l'obligation à partir de 2028, selon la loi 2024-467.

### Un DPE immeuble de moins de 10 ans est-il encore valable ?
En principe la **validité est de 10 ans**, sauf modification significative des équipements communs ou de l'enveloppe. Un renouvellement anticipé est souvent conseillé pour sécuriser un dossier d'aides.

### Le DPE collectif remplace-t-il le DPE de chaque appartement ?
Non. Le DPE collectif porte sur **l'immeuble**. Chaque vendeur ou bailleur reste tenu de fournir un **DPE propre à son lot** lors de la transaction.

### Le DPE collectif est-il affiché obligatoirement ?
Oui dans les immeubles de **50 lots et plus** à usage principal d'habitation, dans les parties communes.

### Qui peut réaliser un DPE collectif ?
Un **diagnostiqueur certifié DPE immeuble** avec une assurance professionnelle en cours de validité, ou un **bureau d'études thermiques** habilité. La certification « DPE, tous types de biens » est le prérequis.

## Sources Officielles

- **LOI n° 2021-1104 du 22 août 2021** portant lutte contre le dérèglement climatique (art. 260)
- **LOI n° 2024-467 du 25 juin 2024** portant diverses dispositions de simplification et de clarification du droit (art. 89)
- **Décret n° 2022-1299 du 7 octobre 2022** relatif au plan pluriannuel de travaux
- **Arrêté du 13 décembre 2024** portant approbation des méthodes de calcul du DPE immeuble
- [ADEME — Le parc de bâtiments en France](https://www.ademe.fr/)
- [Service Public — DPE immeuble](https://www.service-public.fr/particuliers/vosdroits/F14580)
''',

    "prix-dpe-collectif-copropriete-cout-par-lot-2026.mdx": '''---
title: "Prix DPE Collectif Copropriété : Coût Réel par Lot et Budget 2026"
image: "/api/og"
description: "Combien coûte un DPE collectif en 2026 ? Grille de prix par taille de copropriété, ce qui fait varier le devis, quand le coupler au PPT, et comment mobiliser les aides CEE et MaPrimeRénov' Copro."
publishedAt: "2026-09-15"
category: "Prix"
readTime: "9 min"
author: "Expert Thermostat Copropriété"
---

# Prix DPE Collectif Copropriété : Coût Réel par Lot et Budget 2026

Pour une copropriété de **30 lots**, un DPE collectif seul se facture généralement entre **1 200 € et 2 200 € HT** en 2026. Le pack le plus courant chez les syndics — **DPE collectif + PPT** — se situe entre **2 500 € et 6 000 € HT** pour ce même immeuble. Le prix dépend surtout de trois facteurs : le **nombre de logements visitables** dans l'échantillon, la **complexité de la chaufferie**, et le **choix de la méthode de calcul** (148, 158-3CL ou 163).

<CtaButton text="Obtenir 3 devis DPE collectif & PPT" url="#simulateur" />

## Combien Coûte un DPE Collectif en 2026 ?

**Réponse Directe** : le prix d'un DPE collectif se situe entre **60 € et 150 € par lot** pour une prestation standard, avec un minimum de passage qui rend les très petites copropriétés proportionnellement plus chères. Le budget global dépend directement de la taille de l'immeuble et de la méthode retenue.

| Taille de la copropriété | Prix DPE collectif HT (indicatif) | Prix par lot |
|---|---|---|
| 5 à 20 lots | 800 – 1 400 € | 60 – 120 € |
| 20 à 50 lots | 1 200 – 2 500 € | 45 – 90 € |
| 50 à 100 lots | 2 000 – 4 000 € | 30 – 70 € |
| 100 à 200 lots | 3 500 – 6 500 € | 25 – 55 € |
| Plus de 200 lots | 6 000 – 12 000 € | 20 – 45 € |

Ces fourchettes couvrent la prestation de base : visite des parties communes, relevé terrain, visite de l'échantillon de logements, calcul de la méthode retenue, rapport, étiquette. Elles n'incluent **ni** les études complémentaires (thermographie, test d'infiltrométrie), **ni** les éventuels travaux de mise en accessibilité des locaux techniques.

## Ce Qui Fait Varier le Prix d'un Devis à l'Autre

**Réponse Directe** : cinq postes dominent l'écart entre deux devis.

| Facteur | Impact sur le prix | Pourquoi |
|---|---|---|
| **Taille de l'échantillon** de logements à visiter | +80 à +250 € par logement ajouté | Temps de visite + recueil de données |
| **Méthode de calcul retenue** (148 / 158-3CL / 163) | Variable | 3CL-collectif = relevés physiques plus longs |
| **Complexité de la chaufferie** (multi-chaudières, boucle, régulation) | +200 à +800 € | Relevé technique détaillé, schémas |
| **Nombre de bâtiments / îlots distincts** | +15 à +30 % | Visites et calculs par entité |
| **Région et accès** (Paris intra-muros, copro en site occupé) | +10 à +20 % | Logistique, stationnement, horaires |

## DPE Seul ou Pack DPE + PPT : Lequel Est Rentable ?

**Réponse Directe** : dans presque tous les cas où la copropriété entre dans le champ du PPT (cas 2 et cas 3), le **pack DPE + PPT coûte 30 à 50 % de moins** que les deux prestations commandées séparément — parce que le relevé terrain est fait une seule fois et que les données alimentent directement le plan de travaux.

| Configuration | Budget indicatif (30 lots) | Budget indicatif (100 lots) |
|---|---|---|
| DPE collectif seul | 1 200 – 2 200 € | 2 500 – 4 000 € |
| PPT seul | 1 800 – 3 000 € | 3 500 – 6 000 € |
| **Pack DPE + PPT** | **2 500 – 4 500 €** | **4 500 – 8 000 €** |
| Pack DPE + PPT + audit chaufferie | 3 500 – 6 500 € | 6 500 – 12 000 € |

Pour une copropriété qui doit engager des travaux de régulation thermique dans le cadre du [décret BACS](/guides/obligation-decret-bacs-copropriete-2027-echeances-sanctions), le pack complet est le seul qui donne une vision d'ensemble chiffrée avant l'AG.

## Quelles Aides pour Financer un DPE Collectif et le Plan de Travaux ?

**Réponse Directe** : le **DPE collectif seul n'est pas directement subventionné**, mais il est **financé indirectement** par les CEE lorsqu'il est intégré à un **programme CEE** portant sur des travaux de rénovation. Les dispositifs réellement mobilisables :

| Dispositif | Ce qu'il finance | Qui en bénéficie |
|---|---|---|
| **CEE « Coup de pouce rénovation de copropriété »** | Bonification pour les programmes CEE intégrant étude et travaux | Copros qui engagent un programme avec un obligé |
| **[Fiches CEE BAR-TH](/guides/subventions-cee-fiches-bar-th-118-bar-th-158)** | Les travaux de régulation / isolation / chauffage suivants le PPT | Immeubles résidentiels collectifs |
| **MaPrimeRénov' Copropriété (Anah)** | Études préalables (dont DPE, audit, PPT) + travaux | Copros fragiles / passoires, sur accord Anah |
| **Éco-PTZ collectif** | Avance de trésorerie pour le syndicat | Copros votant des travaux d'économie d'énergie |
| **Fonds travaux (loi ALUR)** | Épargne de précaution inscrite au budget | Toutes les copros (à partir de 15 € / lot / an, extensible) |
| **Aides locales (régions, ALE, villes)** | Abondement études / audits | Variable selon territoire |

## Comment Lire un Devis de DPE Collectif ?

Vérifiez systématiquement **six points** avant de voter :

1. **La certification du diagnostiqueur** (mention « DPE, tous types de biens ») et son attestation d'assurance.
2. **La méthode de calcul proposée** (148, 158-3CL, 163) et sa justification.
3. **La taille de l'échantillon** de logements visités (moyenne : 3 à 8 % des lots, minimum 2 logements).
4. **Le nombre de visites de parties communes** (toiture, sous-sol, local technique, cave, halls).
5. **Le contenu exact du rapport** : étiquette globale + étiquettes par secteur + préconisations chiffrées + articulation avec le PPT.
6. **Les modalités de mise à jour** si des travaux modifient significativement le bâtiment.

<Callout title="Piège fréquent à éviter">
Un devis anormalement bas cache souvent un rapport « format DPE logement » qui ne couvre pas les parties communes ni l'échantillon de lots. Le rapport doit explicitement mentionner le périmètre immeuble au sens de l'arrêté du 13 décembre 2024.
</Callout>

## Questions Fréquentes

### Le DPE collectif est-il déductible des charges ?
Oui. Les frais de DPE collectif sont engagés pour la conservation de l'immeuble ; ils sont inscrits au budget prévisionnel et répartis entre copropriétaires au titre des charges courantes.

### Peut-on défalquer le coût du DPE d'une aide CEE ?
Indirectement, oui : dans le cadre d'un programme CEE global, l'étude peut être financée partiellement par le obligé via une prime ou une bonification négociée.

### Combien de temps dure un DPE collectif ?
Comptez **2 à 3 semaines** entre la visite terrain et la remise du rapport, selon la disponibilité des logements témoins et l'accès à la chaufferie.

### Faut-il un DPE collectif tous les 10 ans ?
La validité légale est de **10 ans**, mais un renouvellement anticipé est recommandé après tout lot significatif de travaux modifiant l'enveloppe ou les équipements communs.

## Sources Officielles

- **Arrêté du 13 décembre 2024** — méthodes de calcul du DPE immeuble
- **Décret n° 2022-1299** relatif au PPT
- [ADEME — Fiches CEE et programmes copropriété](https://www.ademe.fr/)
- [Anah — MaPrimeRénov' Copropriété](https://www.anah.fr/)
- [Service Public — Fonds travaux](https://www.service-public.fr/particuliers/vosdroits/F35352)
''',

    "plan-pluriannuel-travaux-ppt-copropriete-cas-1-cas-2-cas-3.mdx": '''---
title: "PPT Copropriété : Les 3 Cas (1, 2, 3) Expliqués et le Lien avec le DPE Collectif"
image: "/api/og"
description: "Plan Pluriannuel de Travaux : savez-vous si votre copropriété est en Cas 1, Cas 2 ou Cas 3 ? Décryptage des obligations selon la taille et la consommation, calendrier, audit énergétique déclenché par un DPE F/G, et moyens de financement."
publishedAt: "2026-09-15"
category: "Obligation"
readTime: "9 min"
author: "Expert Thermostat Copropriété"
---

# PPT Copropriété : Les 3 Cas (1, 2, 3) Expliqués et le Lien avec le DPE Collectif

Le **plan pluriannuel de travaux (PPT)** est le document qui structure, sur **10 ans**, la politique patrimoniale et énergétique d'une copropriété. Créé par l'ordonnance du 10 février 2016 et rendu obligatoire par la loi ELAN, son régime a été profondément remanié par le **décret n° 2022-1299 du 7 octobre 2022**, qui distingue **trois cas** selon la **taille de la copropriété** et sa **consommation conventionnelle d'énergie**. Le [DPE collectif](/guides/obligation-dpe-collectif-copropriete-calendrier-par-taille) en est la matière première : sans lui, le PPT est inopérant.

<CtaButton text="Simuler un PPT pour votre copropriété" url="#simulateur" />

## Qu'est-ce que le PPT Exactement ?

**Réponse Directe** : le PPT est un **document stratégique annexé au carnet d'information du logement collectif**. Il liste, sur dix ans, les travaux nécessaires à la préservation de l'immeuble, à sa performance énergétique et au confort des occupants, avec pour chacun : estimation sommaire du coût, hiérarchisation par urgence, et projection financière par lot. Il est élaboré à l'initiative du **syndic**, discuté en **Assemblée Générale**, et peut être modifié par décisions successives.

<Callout title="Ne pas confondre">
Le PPT n'est **pas** une obligation de réaliser les travaux qu'il liste. C'est un **outil de planification opposable** : un copropriétaire peut reprocher au syndicat de ne pas l'avoir établi, ou d'avoir voté des décisions sans s'y référer.
</Callout>

## Votre Copropriété est-elle en Cas 1, Cas 2 ou Cas 3 ?

**Réponse Directe** : la distinction repose sur deux critères cumulatifs — le **nombre de lots** et la **consommation conventionnelle annuelle d'énergie** du bâtiment. Depuis le 1er décembre 2022 :

| Cas | Nombre de lots | Consommation | Obligation principale |
|---|---|---|---|
| **Cas 1** | ≥ 200 lots | Indifférent | **PPT obligatoire** + **audit énergétique** en AG |
| **Cas 2** | 50 à 199 lots | < 125 kWhEP/m²/an | **PPT obligatoire** (10 ans), pas d'audit obligatoire |
| **Cas 3** | < 50 lots | < 125 kWhEP/m²/an | PPT non obligatoire ; **inscription au registre des fonds travaux** suffit |

<Callout title="Le détail qui change tout">
Une copropriété de moins de 50 lots **mais** dont la consommation dépasse **125 kWhEP/m²/an** bascule dans le régime « Cas 2 ». Autrement dit : plus votre immeuble est énergivore, plus l'obligation de PPT est anticipée, indépendamment de sa taille.
</Callout>

## Le PPT Cas 2 : Contenu Minimal

Pour les copropriétés de **50 à 199 lots** (ou < 50 lots avec forte consommation), le PPT comprend obligatoirement :

1. Un **état des lieux** de l'immeuble (enveloppe, équipements communs, logements).
2. Une **liste de travaux** hiérarchisée sur au moins 10 ans, avec estimation du coût par poste.
3. Une **estimation des économies d'énergie** associées.
4. Un **plan de financement** par lot.
5. Le cas échéant, une priorité cohérente avec le [décret BACS](/guides/obligation-decret-bacs-copropriete-2027-echeances-sanctions) pour la régulation thermique.

## Le PPT Cas 1 : Le Régime Renforcé avec Audit Énergétique

**Réponse Directe** : les copropriétés **de 200 lots et plus** sont tenues d'adosser leur PPT à un **audit énergétique** qui va plus loin que le DPE collectif. Cet audit est obligatoire **avant toute AG votant des travaux de rénovation significative**, selon les règles du décret 2022-1299. Il doit porter sur **au moins 5 % des lots** et proposer **au minimum deux scénarios de travaux** avec estimation chiffrée, priorisation, et projection sur 10 ans.

L'audit Cas 1 est le déclencheur direct des **gros chantiers** :

- **Remplacement de la chaufferie collective** (gaz → biomasse, PAC collective, ou récupération de chaleur urbaine).
- **Isolation thermique par l'extérieur (ITE)** sur les façades communes.
- **Rééquilibrage hydraulique complet** des colonnes et [régulation thermostatique individuelle](/guides/prix-installation-robinets-thermostatiques-connectes-copropriete-cout-par-lot).
- **Ventilation** (VMC simple flux → hygroréglable, ou double flux).

Ces travaux se situent dans le champ des [fiches CEE BAR-TH](/guides/subventions-cee-fiches-bar-th-118-bar-th-158), mobilisables en bloc dans le cadre d'un programme CEE avec obligé.

## Cas 3 : l'Exception des Petites Copros Économes

**Réponse Directe** : en dessous de 50 lots **et** avec une consommation inférieure à 125 kWhEP/m²/an, aucune obligation de PPT n'existe. Le syndicat doit simplement **inscrire le relevé du fonds travaux** (loi ALUR, 15 € minimum par lot et par an, extensible jusqu'à 30 €) au carnet d'entretien. Cette exemption est toutefois **fragile** : un changement d'équipement commun, une extension, ou une modification de consommation peut faire basculer l'immeuble en Cas 2 au prochain DPE.

## Le DPE Collectif est le Carburant du PPT

Sans [DPE collectif](/guides/obligation-dpe-collectif-copropriete-calendrier-par-taille) à jour, un PPT est **inconstructible** : la classification énergétique de l'immeuble, la consommation conventionnelle et les enjeux prioritaires en sont les données d'entrée. Le calendrier réglementaire 2025-2028 rend donc le DPE collectif **obligatoire pour toutes les copropriétés** au fil de l'eau, ce qui fait de ces deux documents **un couple à traiter en même temps**, idéalement dans le même marché de prestation.

Un immeuble dont le DPE collectif affiche **F ou G** entrera mécaniquement en régime Cas 1 ou Cas 2 (selon sa taille), avec **vote de travaux** à l'AG et mobilisation des aides disponibles. Pour la question du **choix du mode de chauffage** en sortie de passoire collective, le remplacement d'une chaudière gaz par une solution **pompe à chaleur collective ou hybride** est la trajectoire la plus fréquente : voir le volet technique chez nos confrères spécialisés d'[Expert Pompe à Chaleur](https://www.expertpompeachaleur.com/).

## Questions Fréquentes

### Le PPT peut-il être voté sans DPE collectif préalable ?
Techniquement oui, mais le PPT perd alors sa base factuelle et ne peut pas s'appuyer sur une étiquette officielle. En pratique, les syndics sérieux manditent les deux ensemble.

### Combien coûte l'audit énergétique en Cas 1 ?
Entre **6 000 € et 25 000 €** selon la taille, l'accès aux logements et la présence d'un bureau d'études thermiques. Cette dépense est partiellement récupérable via les aides CEE « programme » et Anah.

### Le PPT lie-t-il la copropriété financièrement ?
Non. Il est un document de planification. Seuls les **votes d'AG** engagent la copropriété financièrement, travaux par travaux.

### Qui est responsable en l'absence de PPT obligatoire ?
Le **syndic** qui n'a pas convoqué l'AG pour l'établir peut voir sa **responsabilité civile engagée** par un copropriétaire qui démontre un préjudice, par exemple une décote à la revente.

### Le PPT peut-il être révisé ?
Oui. Une mise à jour tous les **3 ans** est recommandée, et une révision est obligatoire si des travaux non prévus sont réalisés ou si le DPE collectif change de classe après intervention.

## Sources Officielles

- **Décret n° 2022-1299 du 7 octobre 2022** relatif au plan pluriannuel de travaux
- **LOI n° 2018-1021 (ELAN)** art. 21 — création du PPT
- **Arrêté du 13 décembre 2024** — méthodes DPE immeuble
- [ADEME — Copropriété & rénovation énergétique](https://www.ademe.fr/)
- [ANIL — Info copropriété](https://www.anil.org/)
- [Service Public — Plan pluriannuel de travaux](https://www.service-public.fr/particuliers/vosdroits/F35352)
''',
}


def git_clean(repo: Path) -> bool:
    out = subprocess.run(["git", "-C", str(repo), "status", "--porcelain"],
                         capture_output=True, text=True).stdout
    return out.strip() == ""


def main():
    dry = "--dry-run" in sys.argv
    if not GUIDES_DIR.is_dir():
        print("FATAL: guides dir missing"); sys.exit(2)
    if not git_clean(REPO):
        print("FATAL: repo not clean - refusing to write"); sys.exit(3)
    for fname, body in FILES.items():
        path = GUIDES_DIR / fname
        if path.is_file():
            print(f"SKIP (exists): {fname}"); continue
        if dry:
            print(f"[dry] would write {fname} ({len(body)} chars)"); continue
        path.write_text(body, encoding="utf-8")
        print(f"WROTE {fname} ({len(body)} chars)")
    print("\nDone.")


if __name__ == "__main__":
    main()
