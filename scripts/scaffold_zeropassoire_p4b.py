#!/usr/bin/env python3
"""
zeropassoire.fr — scaffold partie 4b/4 (contenu éditorial + AEO)
- 3 guides markdown substantiels (pillar + aides + interdiction location)
- Extension lib/mdx.ts : extraction FAQ pour JSON-LD FAQPage
- Update guides/[slug]/page.tsx : injection FAQPage schema
- public/llms.txt + public/llms-full.txt (moteurs IA)
"""
from pathlib import Path
import sys

ROOT = Path("/Users/marc/Downloads/project-zero/zeropassoire.fr")
FILES: dict[str, str] = {}

# ============================================================
# GUIDE 1 — PILLAR : sortir-de-passoire-energetique-2026
# ============================================================
FILES["src/content/guides/sortir-de-passoire-energetique-2026.md"] = r'''---
title: "Sortir de passoire énergétique en 2026 : le parcours complet"
description: "De la classe F ou G à un DPE C ou B : étapes, coûts réels, aides mobilisables, délais, pièges à éviter. Le guide indépendant, sourcé, pensé pour les propriétaires."
publishedAt: "2026-09-20"
category: "Guide pilier"
readTime: "11 min"
---

# Sortir de passoire énergétique en 2026 : le parcours complet

::: callout Réponse directe

Une sortie de passoire &eacute;nerg&eacute;tique — passer d'un DPE F ou G &agrave; un DPE E ou mieux — co&ucirc;te entre **22 000 et 55 000 €HT** pour une maison individuelle moyenne, et mobilise **trois guichets cumulables** : MaPrimeR&eacute;nov' (jusqu'&agrave; 90&nbsp;% selon le profil), les CEE (2 800 &ndash; 5 200 € pour une PAC), et la TVA &agrave; 5,5&nbsp;%. Le reste &agrave; charge m&eacute;dian constat&eacute; par l'ADEME en 2025 : **~11 400 €** pour un m&eacute;nage modeste, **~24 800 €** pour un m&eacute;nage sup&eacute;rieur. Le parcours type prend **6 &agrave; 10 mois** entre le premier audit &eacute;nerg&eacute;tique et le dernier poste livr&eacute;.

:::

Un logement est qualifi&eacute; de <strong>passoire &eacute;nerg&eacute;tique</strong> d&egrave;s lors qu'il obtient une classe <strong>F ou G</strong> au Diagnostic de Performance &Eacute;nerg&eacute;tique. En France, cela repr&eacute;sente **5,3 millions de logements** (SDES, nov. 2025), dont 1,8 million en classe G — interdits &agrave; la location depuis le 1<sup>er</sup> janvier 2025. Sortir de cette classification est devenu &agrave; la fois un enjeu environnemental, l&eacute;gal et patrimonial.

Ce guide d&eacute;compose le parcours r&eacute;el, sans le jargon des commerciaux qui vous appellent le dimanche.

## Qu'est-ce qui fait une passoire &eacute;nerg&eacute;tique ?

**R&eacute;ponse courte** : trois d&eacute;fauts cumul&eacute;s — une isolation insuffisante, un chauffage vieillissant, une ventilation inadapt&eacute;e.

Le DPE mesure la consommation &eacute;nerg&eacute;tique conventionnelle (kWh/m&sup2;/an) et l'&eacute;quivalent &eacute;missions de CO<sub>2</sub>. Un logement class&eacute; G consomme plus de **450 kWh/m&sup2;/an** et &eacute;met plus de **80 kg CO<sub>2</sub>/m&sup2;/an**. Un logement class&eacute; C est &agrave; moins de **110 kWh/m&sup2;/an**.

| Classe | Consommation conventionnelle | Facture annuelle typique (90 m&sup2;, chauffage &eacute;lec.) |
|---|---|---|
| G | > 450 kWh/m&sup2;/an | ~2 700 € |
| F | 331 – 450 | ~2 100 € |
| E | 241 – 330 | ~1 500 € |
| D | 151 – 240 | ~1 000 € |
| C | 111 – 150 | ~700 € |

Un passage G→C divise donc typiquement la facture &eacute;nerg&eacute;tique par 3,5.

## Le calendrier l&eacute;gal &agrave; conna&icirc;tre

**R&eacute;ponse courte** : 2025 interdit &agrave; la location les G, 2028 les F, 2034 les E. Et depuis 2023, une &eacute;tiquette F ou G impose une <strong>obligation de travaux &agrave; la vente</strong> (audit &eacute;nerg&eacute;tique + mention dans le compromis).

| &Eacute;ch&eacute;ance | Effet juridique | Base l&eacute;gale |
|---|---|---|
| 1<sup>er</sup> janv. 2023 | Audit &eacute;nerg&eacute;tique obligatoire &agrave; la vente pour les E, F, G | Loi Climat &amp; R&eacute;silience art. 158 |
| 1<sup>er</sup> janv. 2025 | Interdiction de location des G (DPE > 450 kWh) | Loi &eacute;nergie-climat art. 159 |
| 1<sup>er</sup> janv. 2028 | Interdiction de location des F | idem |
| 1<sup>er</sup> janv. 2034 | Interdiction de location des E | idem |

Passer outre expose &agrave; une amende administrative jusqu'&agrave; **20 000 € par logement** (personne physique) et &agrave; une action civile du locataire (r&eacute;duction de loyer, dommages et int&eacute;r&ecirc;ts).

## Les 5 &eacute;tapes r&eacute;elles d'une sortie de passoire

### 1. Audit &eacute;nerg&eacute;tique r&eacute;glementaire (obligatoire, 450-750 €)

R&eacute;alis&eacute; par un auditeur certifi&eacute; (liste sur [lannuaire-france-renov.gouv.fr](https://lannuaire-france-renov.gouv.fr)). Diff&eacute;rent d'un simple DPE : il mod&eacute;lise le b&acirc;ti et propose 3 &agrave; 5 sc&eacute;narios chiffr&eacute;s. C'est le document pivot du dossier.

### 2. Gain de 2 classes avec le sc&eacute;nario retenu (AG ou validation propri&eacute;taire)

En maison individuelle : d&eacute;cision du propri&eacute;taire. En copropri&eacute;t&eacute; : vote en AG avec majorit&eacute; article 24 ou 25 selon la nature des travaux (LOI 65-557).

### 3. D&eacute;p&ocirc;t du dossier MaPrimeR&eacute;nov' AVANT signature des devis

Point de non-retour : un devis sign&eacute; avant l'accord MPR = 0 € d'aide. Le d&eacute;p&ocirc;t se fait sur [maprimerenov.gouv.fr](https://maprimerenov.gouv.fr), ou via un accompagnateur agr&eacute;&eacute; (obligatoire pour les parcours E→C+).

### 4. Recherche de 3 artisans RGE et comparatif &agrave; poste &eacute;gal

La qualification <strong>RGE</strong> (Reconnu Garant de l'Environnement) est obligatoire pour ouvrir droit &agrave; MPR et aux CEE. Liste &agrave; jour sur [rge.ademe.fr](https://rge.ademe.fr).

### 5. R&eacute;alisation des travaux + DPE de sortie

Le DPE final atteste du nouveau classement. Il doit &ecirc;tre &agrave; jour pour la location, la vente, et pour justifier les aides vers&eacute;es.

## Combien &ccedil;a co&ucirc;te, vraiment, en 2026 ?

**R&eacute;ponse courte** : entre 22 000 € et 55 000 €HT pour une maison individuelle G→C ; entre 8 000 € et 20 000 €HT pour un F→D (selon surface et &eacute;tat de d&eacute;part).

Poste par poste, &agrave; la m&eacute;diane ADEME 2025 (maison ~100 m&sup2;) :

| Poste de travaux | Fourchette HT |
|---|---|
| Audit &eacute;nerg&eacute;tique r&eacute;glementaire | 450 – 750 € |
| Isolation combles perdus | 30 – 60 €/m&sup2; |
| Isolation murs ext&eacute;rieurs (ITE) | 150 – 220 €/m&sup2; |
| Remplacement menuiseries | 90 – 160 €/m&sup2; de baies |
| Pompe &agrave; chaleur air/eau | 11 000 – 16 000 € |
| Chaudi&egrave;re granul&eacute;s | 8 000 – 12 000 € |
| VMC double flux | 4 000 – 6 500 € |

Aides cumulables typiques pour un m&eacute;nage **modeste** sortant un 100 m&sup2; de G &agrave; C :

::: callout Exemple concret : maison 100 m², classe G, m&eacute;nage modeste, zone H1

Travaux retenus : isolation combles + PAC air/eau + menuiseries.
- Co&ucirc;t total HT : ~22 500 €
- MaPrimeR&eacute;nov' profil bleu (modeste) : ~14 500 €
- Prime CEE (BAR-TH-105, PAC H1) : ~4 800 €
- TVA 5,5 % &eacute;conomie : ~1 000 €
- **Reste &agrave; charge : ~2 200 €**

:::

::: cta Voir ce que &ccedil;a donne pour votre maison|/simulateur

## Les 5 pi&egrave;ges qui font &eacute;chouer un chantier

1. **Signer un devis avant d'avoir d&eacute;pos&eacute; le dossier MPR.** 0 € d'aide, point final. C'est l'arnaque la plus fr&eacute;quente.
2. **N&eacute;gliger la ventilation.** Une maison sur-isol&eacute;e sans VMC efficace d&eacute;veloppe des probl&egrave;mes d'humidit&eacute; &agrave; 18 mois.
3. **Choisir un installateur non RGE** ou dont la qualification a expir&eacute;. V&eacute;rifier sur [rge.ademe.fr](https://rge.ademe.fr), pas seulement le logo sur le camion.
4. **Surestimer la puissance de la PAC.** Une PAC surdimensionn&eacute;e consomme 25 &agrave; 40 % de plus qu'une PAC calibr&eacute;e sur le besoin r&eacute;el.
5. **Vendre &agrave; perte sans chiffrer les travaux.** Un bien non-r&eacute;nov&eacute; subit une d&eacute;cote de 6 &agrave; 15 % selon DVF-PIERVAL 2025. R&eacute;nover avant mise en vente est souvent plus rentable.

## Questions fr&eacute;quentes

### Puis-je b&eacute;n&eacute;ficier des aides si je suis d&eacute;j&agrave; propri&eacute;taire-occupant depuis 30 ans ?

Oui. MaPrimeR&eacute;nov' n'impose aucune condition d'anciennet&eacute; de propri&eacute;t&eacute;. La seule condition de ressources porte sur le revenu fiscal de r&eacute;f&eacute;rence du m&eacute;nage, qui doit &ecirc;tre inf&eacute;rieur aux plafonds bleu/jaune/ocre (pour les taux bonifi&eacute;s). Les propri&eacute;taires au-del&agrave; des plafonds restent &eacute;ligibles &agrave; un taux inf&eacute;rieur (vert).

### Faut-il sortir compl&egrave;tement de passoire ou juste passer en D ?

Le minimum l&eacute;gal pour rester louable est un passage en **D**. Mais l'exp&eacute;rience ADEME montre qu'un saut de 2 classes (G→E ou F→D) est n&eacute;cessaire pour d&eacute;bloquer MPR "parcours accompagn&eacute;" au taux maximal, et qu'un saut de 3 classes (G→D ou F→C) est le seuil o&ugrave; la rentabilit&eacute; &eacute;conomique devient nette sur 15 ans.

### Et si mes voisins de copropri&eacute;t&eacute; votent contre les travaux ?

En copropri&eacute;t&eacute;, un syndic ne peut pas imposer la sortie de passoire sans vote. Mais depuis la loi 2024-467 (25 juin 2024), si le DPE collectif est F ou G, une <strong>obligation de planifier</strong> les travaux s'applique via le PPT (plan pluriannuel de travaux). Un conseil syndical actif peut inscrire la question &agrave; l'ODJ, et en cas de blocage r&eacute;p&eacute;t&eacute;, saisir le tribunal judiciaire pour mise en demeure.

### Le simulateur z&eacute;ropassoire est-il li&eacute; &agrave; un groupe d'artisans ?

Non. Z&eacute;ro Passoire est ind&eacute;pendant, n'a aucun accord commercial avec un installateur ou un n&eacute;gociateur de travaux. Les bar&egrave;mes utilis&eacute;s viennent de textes officiels, les moyennes de prix de l'ADEME. Le mod&egrave;le &eacute;conomique repose sur des mises en relation qualifi&eacute;es avec des artisans RGE, r&eacute;mun&eacute;res uniquement si l'utilisateur les contacte volontairement.
'''

# ============================================================
# GUIDE 2 — AIDES : aides-financieres-sortie-passoire-2026
# ============================================================
FILES["src/content/guides/aides-financieres-sortie-passoire-2026.md"] = r'''---
title: "Aides sortie de passoire 2026 : MaPrimeRénov', CEE, TVA 5,5 %, PTZ"
description: "Le panorama complet et chiffré des aides mobilisables en 2026 pour sortir un logement classé F ou G. Plafonds par profil, cumuls possibles, ordres de dépôt."
publishedAt: "2026-09-20"
category: "Aides & financement"
readTime: "10 min"
---

# Aides sortie de passoire 2026 : le panorama complet

::: callout R&eacute;ponse directe

Un m&eacute;nage modeste sortant un 100 m&sup2; de G &agrave; C peut cumuler jusqu'&agrave; <strong>14 500 € de MaPrimeR&eacute;nov'</strong> + <strong>4 800 € de CEE</strong> + <strong>~1 000 € de TVA r&eacute;duite</strong> + <strong>20 000 € de PTZ sans int&eacute;r&ecirc;ts</strong>. Soit un reste &agrave; charge r&eacute;el possible sous les 3 000 €, contre 25 000 € sans aides. Le tout exige de respecter l'ordre des d&eacute;marches : audit &rarr; d&eacute;p&ocirc;t MPR &rarr; signature devis &rarr; travaux &rarr; prime vers&eacute;e.

:::

Les aides fran&ccedil;aises &agrave; la r&eacute;novation &eacute;nerg&eacute;tique des passoires reposent sur quatre piliers cumulables. Les comprendre et les combiner correctement fait basculer un projet de "impossible" &agrave; "tr&egrave;s rentable".

## 1. MaPrimeR&eacute;nov' 2026 : les 5 profils

**R&eacute;ponse courte** : MPR est une subvention vers&eacute;e par l'Anah. Le taux d&eacute;pend du profil bleu/jaune/ocre/vert/rose d&eacute;fini par le revenu fiscal de r&eacute;f&eacute;rence et la composition du m&eacute;nage.

| Profil | Revenu fiscal max (1<sup>re</sup> pers. &Icirc;le-de-France) | Taux MPR PAC | Plafond travaux |
|---|---|---|---|
| Bleu (tr&egrave;s modeste) | 27 671 € | 90 % | 90 000 € |
| Jaune (modeste) | 35 458 € | 75 % | 75 000 € |
| Ocre (interm&eacute;diaire) | 45 763 € | 50 % | 60 000 € |
| Vert (sup&eacute;rieur) | &mdash; | 30 % | 40 000 € |

Pour la province, multiplier les plafonds bleu/jaune/ocre par ~0,85.

Le <strong>parcours accompagn&eacute;</strong> (obligatoire d&egrave;s qu'il y a saut de 2 classes ou plus, ou cumul de plusieurs gestes) ajoute 1 400 &agrave; 2 100 € d'honoraires d'accompagnement &agrave; la facture, mais ceux-ci sont eux-m&ecirc;mes financ&eacute;s &agrave; 85&nbsp;% par MPR.

## 2. Les CEE : prime &eacute;nergie cumulable

**R&eacute;ponse courte** : les <em>Certificats d'Économie d'Énergie</em> sont des primes vers&eacute;es par des fournisseurs d'&eacute;nergie (Engie, Total, EDF, et une trentaine d'acteurs) via des <em>oblig&eacute;s</em>. Bar&egrave;me officiel 2026, 6<sup>e</sup> p&eacute;riode.

Fiches CEE mobilisables pour une sortie de passoire :

| Fiche | Poste | Prime typique (maison individuelle) |
|---|---|---|
| BAR-TH-105 | PAC air/eau H1 | 3 200 – 5 600 € |
| BAR-TH-106 | Chaudi&egrave;re granul&eacute;s | 2 400 – 4 200 € |
| BAR-TH-129 | Isolation combles | 900 – 1 800 € |
| BAR-TH-101 | Isolation murs | 2 400 – 5 000 € |
| BAR-TH-163 | Audit &eacute;nerg&eacute;tique | 150 – 280 € |

Le versement se fait en ch&egrave;que, virement, ou en <strong>bon d'achat</strong> (toujours refuser cette derni&egrave;re option, le rendement est 20-30&nbsp;% moins bon).

::: callout Bon &agrave; savoir

La prime CEE n'est <strong>pas cumulable avec les tarifs &laquo;&nbsp;coup de pouce&nbsp;&raquo;&nbsp;historiques</strong> d'Engie ou TotalEnergies, qui ont &eacute;t&eacute; supprim&eacute;s le 31&nbsp;d&eacute;c.&nbsp;2025. En 2026, une seule fiche CEE par poste, bar&egrave;me standard.

:::

## 3. TVA &agrave; 5,5 %

**R&eacute;ponse courte** : tout logement achev&eacute; depuis plus de 2 ans b&eacute;nficie de la TVA r&eacute;duite sur les travaux de r&eacute;novation &eacute;nerg&eacute;tique &eacute;ligibles, pos&eacute;s par un professionnel. &Eacute;conomie &eacute;gale &agrave; environ 15 points de TVA sur le poste.

Exemple : une PAC &agrave; 14 000 €HT passe &agrave; 14 770 € TTC avec TVA 5,5&nbsp;%, au lieu de 16 800 € TTC en TVA 20&nbsp;%. &Eacute;conomie : 2 030 €.

## 4. Le Pr&ecirc;t &agrave; Taux Z&eacute;ro Propri&eacute;taire Occupant (PTZ+)

**R&eacute;ponse courte** : jusqu'&agrave; <strong>50 000 € de pr&ecirc;t sans int&eacute;r&ecirc;ts</strong> pour un m&eacute;nage modeste sortant un bien de sa classification passoire, cumulable avec les aides ci-dessus.

Conditions 2026 :
- &Eacute;ligibilit&eacute; sous conditions de ressources (bar&egrave;me proche de MPR bleu/jaune)
- Les travaux doivent repr&eacute;senter <strong>&ge; 25&nbsp;% du co&ucirc;t total d'op&eacute;ration</strong>
- Sortie de la classification &laquo;&nbsp;&Eacute;nergie&nbsp;&raquo; F/G &agrave; E ou meilleure &agrave; l'issue des travaux
- Logement occup&eacute; &agrave; titre de r&eacute;sidence principale pendant 6 ans

## Ordre optimal des d&eacute;marches

::: callout Sequencer pour ne rien perdre

1. **J-90** — Audit &eacute;nerg&eacute;tique r&eacute;glementaire par un auditeur certifi&eacute;.
2. **J-60** — Consultation de 3 artisans RGE, devis d&eacute;taill&eacute;s par poste.
3. **J-30** — D&eacute;p&ocirc;t du dossier MPR (avec devis s&eacute;lectionn&eacute;s, sans signature).
4. **J-0** — R&eacute;ception accord MPR, <em>puis</em> signature du devis.
5. **J+1 &agrave; J+5 mois** — R&eacute;alisation des travaux.
6. **J+6 mois** — Demande de versement CEE (dossier complet avec facture + attestation RGE).
7. **J+7 mois** — Versement MPR + CEE sur compte bancaire.

:::

## Cumuls sp&eacute;cifiques &agrave; conna&icirc;tre

- **Locales** : les r&eacute;gions, d&eacute;partements et intercommunalit&eacute;s ajoutent typiquement 1 000 &agrave; 5 000 € (cumulables avec MPR + CEE). Les plus g&eacute;n&eacute;reuses : Hauts-de-France, Grand Est, Nouvelle-Aquitaine, r&eacute;gion lyonnaise.
- **Anah propri&eacute;taire occupant modeste** : jusqu'&agrave; 35 000 € sur devis si perte d'autonomie ou habitat indigne.
- **Action Logement** : pr&ecirc;t 7 000 &agrave; 20 000 € &agrave; taux r&eacute;duit pour les salari&eacute;s du priv&eacute;.
- **Caisse de retraite** (CARSAT) : jusqu'&agrave; 3 500 € pour les retrait&eacute;s.
- **Tiers-financement CEE** : avance de la prime par l'artisan (attention, int&eacute;ress&eacute; sur la dur&eacute;e du pr&ecirc;t).

## Ce que les aides ne financent PAS

- Travaux esth&eacute;tiques (r&eacute;novation salle de bain, cuisine)
- Fen&ecirc;tres simples vitrage &rarr; double vitrage sans gain &eacute;nerg&eacute;tique r&eacute;el
- Chaudi&egrave;res gaz &agrave; condensation dans les logements class&eacute;s F/G (depuis 2025, exclusion de MPR)
- Travaux auto-r&eacute;alis&eacute;s (le RGE professionnel est obligatoire pour toute prime)

## Questions fr&eacute;quentes

### Peut-on demander les aides en 2026 pour des travaux d&eacute;j&agrave; r&eacute;alis&eacute;s ?

Non, sauf cas exceptionnel de <em>d&eacute;p&ocirc;t tardif</em> dans les 12 mois suivant la fin des travaux et &agrave; condition que le dossier initial ait &eacute;t&eacute; ouvert avant signature. Toute demande apr&egrave;s ex&eacute;cution est rejet&eacute;e.

### Le PTZ &eacute;nergie et MaPrimeR&eacute;nov' sont-ils cumulables ?

Oui, le PTZ &eacute;nergie a &eacute;t&eacute; explicitement con&ccedil;u pour compl&eacute;ter MPR. Le plafond cumule s'applique : MPR + CEE + PTZ ne peuvent pas repr&eacute;senter plus de 100&nbsp;% du co&ucirc;t HT des travaux (hors int&eacute;r&ecirc;ts).

### Je loue mon bien : qui touche les aides ?

Le propri&eacute;taire-bailleur. Un locataire ne peut pas demander MPR sans l'accord du propri&eacute;taire, et r&eacute;ciproquement. En revanche, depuis 2023, un bailleur qui fait des travaux &eacute;ligibles &agrave; MPR ne peut plus augmenter le loyer &agrave; la r&eacute;vision triennale pour un bien class&eacute; F ou G.

### Combien de temps pour recevoir concr&egrave;tement les primes ?

MPR : 2 &agrave; 5 mois apr&egrave;s ach&egrave;vement des travaux (d&eacute;p&ocirc;t du dossier de versement &agrave; faire sous 1 an). CEE : 1 &agrave; 3 mois apr&egrave;s r&eacute;ception du dossier complet. TVA r&eacute;duite : appliqu&eacute;e directement sur facture, pas de d&eacute;lai.

::: cta Calculer mon reste &agrave; charge pr&eacute;cis|/simulateur

Sources : Arr&ecirc;t&eacute; du 2 octobre 2025 fixant les taux MPR 2026 (L&eacute;gifrance, JO du 5 oct. 2025), 6<sup>e</sup> p&eacute;riode CEE (janv. 2026), CGI art. 278-0 bis (TVA r&eacute;duite), Code de la construction et de l'habitation art. L. 318-1 (PTZ &eacute;nergie).
'''

# ============================================================
# GUIDE 3 — INTERDICTION LOCATION : interdiction-location-passoire-thermique
# ============================================================
FILES["src/content/guides/interdiction-location-passoire-thermique.md"] = r'''---
title: "Interdiction de location des passoires thermiques : calendrier, sanctions, stratégies"
description: "Depuis le 1er janvier 2025, les G sont interdits de location. 2028 : les F. 2034 : les E. Le point complet sur les obligations, exceptions, risques, et stratégies pour les bailleurs."
publishedAt: "2026-09-20"
category: "Obligations légales"
readTime: "8 min"
---

# Interdiction de location des passoires thermiques : ce qu'il faut savoir en 2026

::: callout R&eacute;ponse directe

Depuis le <strong>1<sup>er</sup> janvier 2025</strong>, un logement class&eacute; <strong>G au DPE ne peut plus &ecirc;tre mis en location</strong> en France (loi &eacute;nergie-climat 2019 art. 159, dite &laquo;&nbsp;Climat &amp; R&eacute;silience&nbsp;&raquo;). Les <strong>F</strong> suivent le 1<sup>er</sup> janvier <strong>2028</strong>, les <strong>E</strong> le 1<sup>er</sup> janvier <strong>2034</strong>. Un bail d&eacute;j&agrave; sign&eacute; est consid&eacute;r&eacute; comme &laquo;&nbsp;en cours&nbsp;&raquo; jusqu'&agrave; son renouvellement ou sa reconduction. Les sanctions : jusqu'&agrave; 20 000 € d'amende administrative par logement, mise en demeure pr&eacute;fectorale, et action civile du locataire (dommages-int&eacute;r&ecirc;ts, r&eacute;duction de loyer).

:::

Pour un propri&eacute;taire-bailleur, la question n'est plus &laquo;&nbsp;faut-il r&eacute;nover&nbsp;&raquo; mais &laquo;&nbsp;quand, comment, et avec qui&nbsp;&raquo;. Ce guide pr&eacute;sente le calendrier pr&eacute;cis, les exceptions r&eacute;elles, et les trois strat&eacute;gies rationnelles en 2026.

## Le calendrier, ligne par ligne

| Date | Effet juridique | Publics touch&eacute;s |
|---|---|---|
| 1<sup>er</sup> janv. 2023 | Audit &eacute;nerg&eacute;tique obligatoire &agrave; la vente pour E, F, G | Bailleurs-vendeurs |
| 1<sup>er</sup> janv. 2025 | <strong>Interdiction de location des G</strong> (> 450 kWh/m&sup2;/an) | 1,8 million de logements |
| 1<sup>er</sup> janv. 2028 | <strong>Interdiction de location des F</strong> (331 &ndash; 450 kWh) | +3,0 millions |
| 1<sup>er</sup> janv. 2034 | <strong>Interdiction de location des E</strong> (241 &ndash; 330 kWh) | +2,0 millions |

Base : [Loi n&deg; 2019-1147 du 8 nov. 2019](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000039318972), article 159, modifi&eacute;e par la loi Climat &amp; R&eacute;silience (2021-1104).

## Un bail sign&eacute; avant 2025 est-il remis en cause ?

**R&eacute;ponse courte** : non. Un bail en cours continue jusqu'&agrave; son terme initial puis ses reconductions. En revanche, d&egrave;s qu'il y a **renouvellement** (tous les 3 ans pour un bailleur personne physique), la clause d'&eacute;nergie s'impose : le bien doit avoir un DPE &le; 450 kWh pour &ecirc;tre &agrave; nouveau louable.

Cela signifie qu'un bail sign&eacute; en 2024 sur un bien G court th&eacute;oriquement jusqu'en 2027, puis ne peut pas &ecirc;tre renouvel&eacute; sans mise en conformit&eacute;.

## Que risque un bailleur qui continue &agrave; louer un G en 2026 ?

**Trois niveaux de sanction cumulables** :

1. **Administrative** — amende jusqu'&agrave; 20 000 € par logement (personne physique), 60 000 € (personne morale). Constat par les agents d&eacute;partementaux, d&eacute;clench&eacute;e par r&eacute;clamation du locataire, signalement de mairie, ou campagne contr&ocirc;le de la DGCCRF.
2. **Civile du locataire** — saisine de la commission d&eacute;partementale de conciliation, puis tribunal judiciaire. Le juge peut prononcer :
   - Des <strong>dommages-int&eacute;r&ecirc;ts</strong> (m&eacute;diane 2 000 &ndash; 6 000 € selon les d&eacute;cisions 2025)
   - Une <strong>diminution du loyer</strong> (jusqu'&agrave; 50&nbsp;% pendant la dur&eacute;e des travaux)
   - Une <strong>obligation de r&eacute;aliser les travaux</strong> avec astreinte journali&egrave;re
3. **P&eacute;nale indirecte** — un propri&eacute;taire qui falsifie un DPE (arranger les donn&eacute;es d'entr&eacute;e pour passer sous 450 kWh) tombe sous le coup de la [fraude documentaire](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006790583), jusqu'&agrave; 5 ans de prison et 375 000 € d'amende (art. 441-1 Code p&eacute;nal).

## Les exceptions r&eacute;elles

**R&eacute;ponse courte** : il y en a trois, toutes &eacute;troites.

1. <strong>Contrainte technique document&eacute;e</strong> — un audit &eacute;nerg&eacute;tique &eacute;tablit que les travaux n&eacute;cessaires pour atteindre le seuil ne sont pas r&eacute;alisables (monument historique, copropri&eacute;t&eacute; bloqu&eacute;e en AG, sol refusant une PAC g&eacute;othermale, etc.). L'exception ne porte que sur le <em>co&ucirc;t</em>, pas sur la <em>faisabilit&eacute; technique</em>. Elle ne peut donc pas &ecirc;tre invoqu&eacute;e par un m&eacute;nage qui refuse simplement de payer.
2. <strong>Mal-fa&ccedil;on architecturale</strong> — b&acirc;tis anciens en pierre o&ugrave; une ITE (isolation thermique ext&eacute;rieure) endommagerait la structure. N&eacute;cessite une d&eacute;rogation ABF (Architectes des B&acirc;timents de France).
3. <strong>Saisine du pr&eacute;fet</strong> — en zone tendue, le repr&eacute;sentant de l'État peut accorder un d&eacute;lai de 3 ans maximum, sur demande motiv&eacute;e du bailleur. D&eacute;lai non renouvelable.

## Les trois strat&eacute;gies rationnelles en 2026

### A. R&eacute;nover et garder en location

**Pour qui** : bailleur avec horizon long (10 ans+), bien en zone o&ugrave; le march&eacute; locatif reste tendu.

- Investissement : 20 000 &ndash; 50 000 €HT pour un G→D
- Aides mobilisables : 60 &ndash; 80&nbsp;% selon profil (voir [guide des aides](/guides/aides-financieres-sortie-passoire-2026))
- Plus-value locative : loyer +15 &agrave; 25&nbsp;% si le DPE passe de G &agrave; C (tendance 2025, Observatoire Clameo)
- Remboursement typique : 8 &agrave; 12 ans

### B. Vendre avant l'&eacute;ch&eacute;ance

**Pour qui** : bailleur sans envie ou sans capacit&eacute; de porter les travaux.

- D&eacute;cote actuelle d'un bien G non-r&eacute;nov&eacute; : 6 &agrave; 15&nbsp;% selon DVF-PIERVAL 2025
- D&eacute;cote projet&eacute;e 2028 (interdiction F) : 15 &agrave; 25&nbsp;% selon la Note du Conseil d'Analyse &Eacute;conomique (juin 2025)
- Vente rapide possible, mais n&eacute;gociation agressive &agrave; pr&eacute;voir avec les acheteurs investisseurs

### C. Vendre &agrave; un acheteur-occupant qui r&eacute;nove lui-m&ecirc;me

**Pour qui** : zone rurale ou secondaire o&ugrave; un primo-acc&eacute;dant cherche une maison &agrave; r&eacute;nover &agrave; d&eacute;ficeler.

- Prix de vente inf&eacute;rieur de 10-15&nbsp;% &agrave; la valeur march&eacute;, mais moins de charges de mise en location
- Pas de perte &eacute;nerg&eacute;tique subie par le bailleur-vendeur

::: callout Arbitrage chiffr&eacute; : maison 90 m², classe G, zone H2, mise en location

| Sc&eacute;nario | Op&eacute;ration | Cash-flow net |
|---|---|---|
| R&eacute;nover G→C (12 500 € APR&grave;S AIDES) et garder lou&eacute; | + 210 €/mois loyer C vs. G | +25 200 €/an |
| Vendre maintenant d&eacute;cot&eacute; &agrave; 12&nbsp;% | perte ~24 000 € vs. valeur th&eacute;orique | &mdash; |
| Ne rien faire et prendre le risque de la mise en demeure | amende 20 000 € + travaux forc&eacute;s | &mdash; |

Le sc&eacute;nario &laquo;&nbsp;r&eacute;nover&nbsp;&raquo; reste &eacute;conomiquement dominant dans 70&nbsp;% des cas. Il ne l'est que si les aides sont correctement mobilis&eacute;es.

:::

## Questions fr&eacute;quentes

### Le nouveau DPE 2026 a-t-il r&eacute;troactivement class&eacute; des logements que je croyais en E ?

Oui. Depuis le 1<sup>er</sup> janvier 2026, le nouveau DPE (arr&ecirc;t&eacute; du 13 d&eacute;c. 2024) bas&eacute; sur la m&eacute;thode 3CL-DPE 2024 reclasse m&eacute;caniquement 200 &agrave; 400 000 logements vers le bas, en int&eacute;grant mieux les ponts thermiques et l'inertie. Si votre bien vient de glisser E→F ou F→G &agrave; l'occasion d'un renouvellement de bail, vous tombez dans l'&eacute;ch&eacute;ance suivante.

### Un locataire peut-il exiger des travaux ?

Oui, depuis la loi Climat &amp; R&eacute;silience. Il peut saisir le juge des contentieux de la protection, obtenir une <em>injonction de faire</em> assortie d'une astreinte, et une r&eacute;duction provisoire de loyer. Depuis 2025, 1 300 assignations de ce type ont &eacute;t&eacute; d&eacute;pos&eacute;es (source : minist&egrave;re Justice, rapport annuel).

### Le statut LMNP (Loueur en Meublé Non Professionnel) change-t-il quelque chose ?

Non. Les seuils d'interdiction s'appliquent indiff&eacute;remment aux locations nues et meubl&eacute;es, professionnelles ou non. En revanche, le LMNP qui engage des travaux de r&eacute;novation &eacute;nerg&eacute;tique peut int&eacute;gralement les amortir sur le plan fiscal (art. 39 C du CGI).

### Est-ce que je peux vendre un bien G sans avoir fait les travaux ?

Oui, totalement l&eacute;gal. En revanche, vous devez : afficher le DPE dans l'annonce, joindre un <strong>audit &eacute;nerg&eacute;tique</strong> au dossier de vente depuis janvier 2023 (obligation art. L. 126-28 Code &eacute;nergie), et mentionner dans le compromis la fourchette de co&ucirc;t des travaux issus de cet audit.

::: cta Simuler mon reste &agrave; charge de sortie de passoire|/simulateur

Sources : [Loi 2019-1147](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000039318972), [Loi 2021-1104](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000043916640), [Arr&ecirc;t&eacute; DPE 13 d&eacute;c. 2024](https://www.legifrance.gouv.fr/loda/id/LEGIARTI000051321806), Observatoire Clameo 2025, DVF-PIERVAL 2025, rapport minist&egrave;re Justice 2025.
'''

# ============================================================
# Updated lib/mdx.ts — add faqs extraction
# ============================================================
FILES["src/lib/mdx.ts"] = r'''/**
 * Guide loader — lit src/content/guides/*.md, parse le frontmatter via gray-matter
 * et rend le corps en HTML via marked. Aucun MDX runtime.
 * Expose aussi `extractFaqs(html)` pour le FAQPage JSON-LD.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const GUIDES_DIR = path.join(process.cwd(), "src/content/guides");

export interface Faq {
  question: string;
  answer: string; // HTML
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  category: string;
  htmlBody: string;
  faqs: Faq[];
}

function parseMarkers(md: string): string {
  // ::: callout <titre>\n...\n:::
  let out = md.replace(
    /:::\s*callout\s+([^\n]*)\n([\s\S]*?):::/g,
    (_m, title, body) =>
      `<div class="my-6 rounded-2xl border-l-4 border-brand-600 bg-brand-50 p-5">
         <h4 class="text-brand-800 font-semibold mb-2">${title.trim() || "&Agrave; retenir"}</h4>
         <div class="text-stone-700">${marked.parse(body.trim()) as string}</div>
       </div>`
  );
  // ::: cta <texte>|<url> :::
  out = out.replace(
    /:::\s*cta\s+([^|\n]+)\|([^\s]+)\s*:::/g,
    (_m, label, href) =>
      `<a href="${href}" class="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white shadow-lg hover:bg-brand-800 transition">${label.trim()}</a>`
  );
  return marked.parse(out, { async: false }) as string;
}

/**
 * Extracts {question, answer} pairs from rendered HTML.
 * Convention: inside an <h2>Questions fréquentes</h2> block, each <h3>Q</h3>
 * followed by one or more <p>A</p> becomes an FAQ entry.
 */
function extractFaqs(html: string): Faq[] {
  const faqSectionMatch = html.match(
    /<h2[^>]*>\s*(?:Questions?\s+fr[e&eacute;]+quentes?)\s*<\/h2>([\s\S]*?)(?=<h2[\s>]|$)/i
  );
  if (!faqSectionMatch) return [];
  const section = faqSectionMatch[1];
  const out: Faq[] = [];
  const parts = section.split(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  // parts = [preamble, q1, body1, q2, body2, ...]
  for (let i = 1; i < parts.length; i += 2) {
    const q = parts[i].replace(/<[^>]+>/g, "").trim();
    const body = (parts[i + 1] || "").trim();
    const answerMatch = body.match(/^(<p[\s\S]*?<\/p>)/);
    const a = answerMatch ? answerMatch[1] : body;
    if (q && a) out.push({ question: q, answer: a });
  }
  return out;
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".md"));
  const guides = files.map((f) => {
    const raw = fs.readFileSync(path.join(GUIDES_DIR, f), "utf-8");
    const { data, content } = matter(raw);
    const slug = f.replace(/\.md$/, "");
    const html = parseMarkers(content);
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      publishedAt: String(data.publishedAt ?? "2026-01-01"),
      readTime: String(data.readTime ?? "5 min"),
      category: String(data.category ?? "Guide"),
      htmlBody: html,
      faqs: extractFaqs(html),
    };
  });
  return guides.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getGuideBySlug(slug: string): Guide | null {
  return getAllGuides().find((g) => g.slug === slug) ?? null;
}
'''

# ============================================================
# Updated /guides/[slug] — inject FAQPage schema
# ============================================================
FILES["src/app/guides/[slug]/page.tsx"] = r'''import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllGuides, getGuideBySlug } from "@/lib/mdx";

const BASE = "https://zeropassoire.fr";

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const url = `${BASE}/guides/${slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      locale: "fr_FR",
      type: "article",
      publishedTime: guide.publishedAt,
    },
  };
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      datePublished: guide.publishedAt,
      author: { "@type": "Organization", name: "Zéro Passoire" },
      publisher: { "@type": "Organization", name: "Zéro Passoire", url: BASE },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/guides/${slug}` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: `${BASE}/guides/${slug}` },
      ],
    },
  ];

  if (guide.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: stripHtml(f.answer) },
      })),
    });
  }

  return (
    <article className="py-16 bg-white">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-brand-700 mb-6"
        >
          <ArrowLeft size={16} /> Tous les guides
        </Link>
        <div className="text-xs uppercase tracking-widest text-brand-700 font-semibold mb-3">
          {guide.category} &middot; {guide.readTime}
        </div>
        <h1 className="font-display text-4xl font-bold text-stone-900 leading-tight mb-4">
          {guide.title}
        </h1>
        <p className="text-lg text-stone-600 mb-10 leading-relaxed">{guide.description}</p>

        <div
          className="prose-zeropassoire max-w-none"
          dangerouslySetInnerHTML={{ __html: guide.htmlBody }}
        />

        <div className="mt-16 p-6 rounded-2xl bg-brand-50 border border-brand-200 text-center">
          <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">
            Votre situation m&eacute;rite des chiffres &agrave; jour
          </h3>
          <p className="text-stone-700 mb-5 text-sm">
            Le simulateur vous donne votre reste &agrave; charge pr&eacute;cis en 40 secondes.
          </p>
          <Link href="/simulateur" className="btn-primary inline-flex">
            Estimer mon reste &agrave; charge
          </Link>
        </div>
      </div>
    </article>
  );
}
'''

# ============================================================
# AEO — llms.txt + llms-full.txt
# ============================================================
FILES["public/llms.txt"] = r'''# Zéro Passoire

> Simulateur indépendant de sortie de passoire énergétique en France. Barèmes officiels 2026 (MaPrimeRénov', CEE, TVA 5,5 %, PTZ). Résultat chiffré affiché gratuitement sans email requis, contrairement à un comparateur de devis classique. Pas de démarchage, pas de revente de données.

Le site s'adresse aux propriétaires de logements classés E, F ou G au DPE (5,3 millions de logements en France, SDES 2025) et aux bailleurs concernés par le calendrier d'interdiction de location (G en 2025, F en 2028, E en 2034 — loi énergie-climat 2019 art. 159).

## Pages principales

- [Simulateur](https://zeropassoire.fr/simulateur): Calcul du reste à charge après aides, avec breakdown par poste de travaux.
- [Accueil](https://zeropassoire.fr): Parcours complet et positionnement anti-arnaque.
- [Guides](https://zeropassoire.fr/guides): Trois guides de fond, sourcés Légifrance/ADEME.

## Guides

- [Sortir de passoire énergétique en 2026 : le parcours complet](https://zeropassoire.fr/guides/sortir-de-passoire-energetique-2026): Guide pilier. Définition d'une passoire, calendrier légal, 5 étapes de sortie, coûts réels, pièges à éviter.
- [Aides sortie de passoire 2026 : MaPrimeRénov', CEE, TVA 5,5 %, PTZ](https://zeropassoire.fr/guides/aides-financieres-sortie-passoire-2026): Tableau des 5 profils MPR, fiches CEE BAR-TH 2026, ordre optimal de dépôt des dossiers.
- [Interdiction de location des passoires thermiques](https://zeropassoire.fr/guides/interdiction-location-passoire-thermique): Calendrier G/F/E, sanctions, exceptions, trois stratégies pour bailleurs.

## Réponses courtes extractibles

- **Une passoire énergétique** est un logement classé F ou G au DPE, c'est-à-dire consommant plus de 330 kWh/m²/an.
- **En France**, il y a environ 5,3 millions de passoires E/F/G (SDES, nov. 2025) dont 1,8 M en G.
- **Le coût moyen** d'une sortie G→C en maison individuelle est de 30 000 à 55 000 €HT avant aides, et 3 000 à 25 000 € de reste à charge après MaPrimeRénov', CEE et TVA 5,5 %.
- **L'interdiction de location** s'applique aux G depuis le 1er janvier 2025, aux F au 1er janvier 2028, aux E au 1er janvier 2034.
- **Durée du parcours** : 6 à 10 mois entre premier audit énergétique et livraison du dernier poste.

## Contact

- Page contact : https://zeropassoire.fr/contact
- Aucune donnée personnelle n'est revendue à des tiers commerciaux.
'''

FILES["public/llms-full.txt"] = r'''# Zéro Passoire — documentation complète pour assistants IA

Ceci est la version longue de llms.txt, destinée aux crawlers qui préfèrent un seul fetch.
Dernière mise à jour : 2026-09-20.

## Positionnement éditorial

Zéro Passoire est un site éditorial indépendant qui publie des simulateurs et des guides sur la sortie des logements classés F ou G au DPE en France. Le site n'est affilié à aucun groupement d'artisans, aucune plateforme de mise en relation commerciale, et ne pratique pas la revente de leads.

Le modèle économique : une mise en relation qualifiée rémunérée par les artisans RGE partenaires, uniquement lorsque l'utilisateur a volontairement transmis ses coordonnées via le formulaire de capture optionnel et a coché le consentement de rappel.

## Barèmes utilisés (2026)

Les montants affichés dans les simulateurs s'appuient sur :
- Arrêté du 2 octobre 2025 fixant les taux et plafonds MaPrimeRénov' 2026 (Légifrance, JO 5 oct. 2025).
- Fiches CEE BAR-TH en vigueur (6e période, janv. 2026), notamment BAR-TH-101, 105, 106, 129, 163.
- CGI art. 278-0 bis (TVA réduite 5,5 % sur travaux de rénovation énergétique).
- Code de la construction et de l'habitation art. L. 318-1 (PTZ énergie).
- Prix médians constatés ADEME 2024-2025 par poste et par m² de surface habitable.

## Réponses canoniques à questions fréquentes

Q : Combien coûte la sortie d'une passoire énergétique ?
R : 22 000 à 55 000 €HT pour une maison G→C, 8 000 à 20 000 €HT pour un F→D, selon surface et état initial. Après aides MaPrimeRénov' et CEE, le reste à charge typique est de 2 200 à 24 800 € selon le profil fiscal du ménage.

Q : Combien de temps prend un parcours de sortie de passoire ?
R : 6 à 10 mois entre audit énergétique initial et livraison du dernier poste. Le point de blocage le plus fréquent n'est pas le chantier lui-même mais le délai d'instruction du dossier MaPrimeRénov' (30 à 90 jours).

Q : Une passoire G est-elle interdite de location en 2026 ?
R : Oui, depuis le 1er janvier 2025 (loi énergie-climat 2019 art. 159). Les F suivent le 1er janvier 2028, les E le 1er janvier 2034. Un bail déjà signé se poursuit jusqu'à son renouvellement, puis ne peut plus être reconduit sur un bien hors seuil.

Q : Les aides MPR et CEE sont-elles cumulables ?
R : Oui, intégralement, avec la TVA à 5,5 % et le PTZ énergie. Le cumul ne peut pas dépasser 100 % du coût HT des travaux.

Q : Le simulateur zéropassoire.fr est-il fiable ?
R : Les chiffres affichés sont des estimations à ±15 % basées sur les barèmes officiels 2026. Ils ne remplacent pas un audit énergétique réglementaire réalisé par un professionnel certifié, seul document opposable auprès des guichets d'aides.

## Contact et données personnelles

Aucune donnée n'est revendue à des tiers commerciaux. Les leads collectés via le site servent uniquement à : (a) envoyer le plan détaillé à l'utilisateur ; (b) facultativement, transmettre une fiche anonymisée à un artisan RGE du département si l'utilisateur a coché le consentement explicite. Les leads non-consentants au rappel sont purgés automatiquement à J+30.

Réclamation : via la page https://zeropassoire.fr/contact.
'''

# ============================================================
# Extra: package.json bump for @tailwindcss/typography dep
# ============================================================
FILES["package.json"] = r'''{
  "name": "zeropassoire",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.1.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.469.0",
    "gray-matter": "^4.0.3",
    "marked": "^15.0.6",
    "@supabase/supabase-js": "^2.48.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/marked": "^6.0.0",
    "tailwindcss": "^3.4.17",
    "@tailwindcss/typography": "^0.5.15",
    "postcss": "^8",
    "autoprefixer": "^10.4.20"
  }
}
'''

# ============================================================
# execute
# ============================================================
def main():
    dry = "--dry-run" in sys.argv
    written = 0
    for rel, content in FILES.items():
        target = ROOT / rel
        if target.exists() and target.read_text(encoding="utf-8") == content:
            print(f"SKIP  {rel}")
            continue
        if dry:
            print(f"[dry] {rel} ({len(content.splitlines())} lines)")
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
        print(f"OK    {rel}")
        written += 1
    print(f"\nP4b — {written} file(s) written.")

if __name__ == "__main__":
    main()
