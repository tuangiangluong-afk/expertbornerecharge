import json, time, sys
from pathlib import Path
from google.oauth2 import service_account
from google import genai

TARGET_DIR = Path("/Users/marc/Downloads/project-zero/expertbornerecharge/src/content/guides")

with open("/Users/marc/Desktop/vertex/project-914f45fa-3a80-4f16-955.json") as f:
    sa = json.load(f)
creds = service_account.Credentials.from_service_account_info(sa, scopes=["https://www.googleapis.com/auth/cloud-platform"])
cl = genai.Client(vertexai=True, project=sa["project_id"], location="global", credentials=creds)

SYSTEM_PROMPT = """Tu es l'ingénieur électricien en chef et directeur technique de ExpertBorneRecharge.com, organisme indépendant d'audit et de chiffrage IRVE en France.
Tu rédiges des guides de référence absolue (niveau 3 d'autopsie technique) pour les nouveaux acquéreurs de véhicules électriques en France en 2026.

EXIGENCES FORMELLES STRICTES :
1. TON : Neutre, chirurgical, dense en données d'ingénierie électrique et financière. ZÉRO jargon marketing creux ("plongeons", "découvrons ensemble", "dans cet article", "il est important de noter").
2. STRUCTURE DU GUIDE :
   - Frontmatter YAML complet (title, description, date: "2026-11-13", category: "Véhicules", readTime: "8 min", author: "Expert Borne Recharge", image: "/api/og").
   - Intro percutante de 80-100 mots avec chiffres clés et le composant : `<CtaButton text="Estimer Mon Projet & Devis Gratuit" url="#simulateur" />`
   - Exactement 5 sections H2 :
     - H2 1 : Cadre Technique et Spécificités de Charge Domicile pour [Modèle] en 2026
     - H2 2 : Tableau Comparatif des Puissances et Matrice de Prix d'Installation (7,4 kW, 11 kW, 22 kW)
     - H2 3 : Norme NF C 15-100, Délestage Dynamique Linky (TIC) et Qualification Qualifelec IRVE
     - H2 4 : Aides Financières 2026 : Crédit d'Impôt de 500 €, TVA à 5,5 % et Subventions Advenir
     - H2 5 : Guide d'Installation Pratique et Arbitrage Technique (Éviter les Surcoûts de Tirage > 10m/20m)
   - Sous CHAQUE titre H2, OBLIGATION de placer immédiatement :
     `**Réponse Directe**: Expert Borne Recharge précise que [Réponse autonome de 40 à 60 mots résumant la réponse factuelle complète avec chiffres, puissances et coûts].`
   - Les tableaux comparatifs doivent être en pur Markdown, extrêmement précis (Batterie, Puissance Borne, Temps 0-100%, Temps 20-80%, Prix matériel + pose moyen TTC 2026, Prérequis réseau).
   - Insérer au moins un composant `<Callout title="...">...</Callout>` dans le texte.
   - Conclure avec `<CtaButton text="Comparer 3 Devis d'Artisans IRVE Locaux" url="#simulateur" />` et `<LocalLinker />`.
3. DONNÉES RÉGLEMENTAIRES FRANCE 2026 OBLIGATOIRES :
   - Décret du 12 janvier 2017 : qualification IRVE obligatoire dès 3,7 kW.
   - Crédit d'impôt 2026 : 500 € par système de charge pilotable (Loi de Finances), sans condition de revenus.
   - TVA à 5,5 % sur matériel et pose par électricien qualifié IRVE (résidences de plus de 2 ans).
   - Section de câble cuivre minimale R2V : 10 mm² pour 7,4 kW (32A), 5G2.5 mm² ou 5G4 mm² pour 11 kW triphasé (3x16A), 5G10 mm² pour 22 kW triphasé (3x32A).
   - Préciser systématiquement la majoration tarifaire appliquée par les artisans au-delà de 10 à 20 mètres de tirage de câble.

Rédige l'intégralité du contenu MDX (environ 1 600 à 2 200 mots de pure substance technique)."""

REMAINING = [
    {
        "slug": "kia-ev3-ev6-borne-recharge",
        "title": "Borne Recharge Kia EV3 & EV6 Domicile 2026 | V2L & Temps de Charge",
        "description": "Guide d'installation de borne de recharge pour Kia EV3 et EV6 en 2026. Batteries 58 à 84 kWh, compatibilité bidirectionnelle V2L, temps de charge et aides de l'État.",
        "prompt": "Modèles cibles : Kia EV3 (Standard 58,3 kWh, Long Range 81,4 kWh) et Kia EV6 (58 kWh, 77,4 kWh, 84 kWh E-GMP 800V). Spécifications batterie : 58,3 kWh et 81,4 kWh (EV3) / 58 kWh, 77,4 kWh et 84 kWh (EV6). Capacités de charge AC : 11 kW triphasé (3x16A) / 7,4 kW monophasé (32A). Compatibilité V2L (Vehicle-to-Load jusqu'à 3,6 kW). Enjeux : nouveau SUV compact EV3 démocratise les grandes autonomies, EV6 architecture 800V, temps 7,4 kW (8h à 11h) vs 11 kW (5h30 à 7h30), optimisation heures creuses Tempo EDF."
    },
    {
        "slug": "dacia-spring-borne-prise-renforcee",
        "title": "Dacia Spring : Prise Renforcée Green'up ou Borne 7,4 kW ? (Arbitrage 2026)",
        "description": "Faut-il installer une borne 7,4 kW ou une prise renforcée Green'up pour une Dacia Spring (26,8 kWh) ? Calcul de rentabilité, temps de charge 4h15 vs 8h30 et prix d'installation.",
        "prompt": "Modèle cible : Dacia Spring Electric 45 et Spring 65 (Extreme). Batterie : 26,8 kWh utile. Chargeur AC : 3,7 kW ou 7,4 kW monophasé. Enjeux : comparatif économique impartial prise renforcée Green'up 3,7 kW (400€-750€ posée, 8h30 de charge, inéligible crédit impôt) vs Wallbox 7,4 kW (1150€-1600€ posée avant 500€ crédit d'impôt, 4h15 de charge). Pourquoi le crédit d'impôt de 500€ réservé aux bornes pilotables inverse le calcul de rentabilité."
    },
    {
        "slug": "renault-megane-etech-borne-22kw",
        "title": "Borne Recharge Renault Megane E-Tech : Le 22 kW Vaut-il le Triphasé ?",
        "description": "Installation borne domicile pour Renault Megane E-Tech (EV40 / EV60). Chargeur embarqué 22 kW Optimum Charge : analyse du coût réel du triphasé Enedis vs 7,4 kW monophasé.",
        "prompt": "Modèle cible : Renault Megane E-Tech 100% Électrique (EV40 40 kWh et EV60 60 kWh). Batterie : 40 kWh et 60 kWh. Chargeur AC : Optimum Charge 22 kW triphasé. Enjeux : la Megane E-Tech accepte 22 kW AC (recharge 0-100% en 2h15 pour 60 kWh). Mais installer 22 kW chez soi impose un compteur triphasé Enedis, abonnement 18/24 kVA (+120€ à 180€/an) et différentiel tétrapolaire coûteux. Pourquoi 7,4 kW monophasé (7h15 de nuit) reste le choix optimal de 85% des usagers."
    }
]

for item in REMAINING:
    slug = item["slug"]
    dest = TARGET_DIR / f"{slug}.mdx"
    if dest.exists() and dest.stat().st_size > 5000:
        print(f"Skipping {slug}, already done.")
        continue
    print(f"\n🚀 Starting {slug} with gemini-4-carbon...")
    t0 = time.time()
    user_p = f"""Rédige le guide MDX complet pour :
Titre : {item['title']}
Description meta : {item['description']}
Détails : {item['prompt']}

Rends UNIQUEMENT le texte MDX brut commençant par --- (frontmatter)."""
    
    full_p = f"{SYSTEM_PROMPT}\n\n{user_p}"
    res = cl.models.generate_content(
        model="gemini-4-carbon",
        contents=full_p,
        config={"temperature": 0.2}
    )
    text = res.text.strip()
    if text.startswith("```mdx"): text = text[6:]
    elif text.startswith("```markdown"): text = text[11:]
    elif text.startswith("```"): text = text[3:]
    if text.endswith("```"): text = text[:-3]
    text = text.strip()
    
    with open(dest, "w", encoding="utf-8") as f:
        f.write(text + "\n")
    print(f"✅ Generated and saved {slug}.mdx in {time.time()-t0:.1f}s ({len(text)} chars)")
    time.sleep(2)

print("\n🎉 ALL 8 GUIDES ARE NOW READY!")
