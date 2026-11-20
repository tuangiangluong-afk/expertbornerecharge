import socket
socket.setdefaulttimeout(120)
#!/usr/bin/env python3
"""
ExpertBorneRecharge - High-Intent Vehicle Guides Generator
Powered by Gemini 4 Carbon (Vertex AI)
Generates 8 high-conversion MDX guides for top-selling electric vehicles in France.
"""

import json
import os
import random
import re
import sys
import time
from pathlib import Path
from google.oauth2 import service_account
from google import genai

TARGET_DIR = Path("/Users/marc/Downloads/project-zero/expertbornerecharge/src/content/guides")
TARGET_DIR.mkdir(parents=True, exist_ok=True)

VERTEX_KEYS = [
    Path("/Users/marc/Desktop/vertex/project-914f45fa-3a80-4f16-955.json"),
    Path("/Users/marc/Desktop/vertex/lebaraswitzerland-gen-lang-client-0686480985.json")
]

clients = []
for k in VERTEX_KEYS:
    if k.exists():
        try:
            with open(k) as f:
                sa = json.load(f)
            pid = sa.get("project_id")
            creds = service_account.Credentials.from_service_account_info(
                sa, scopes=["https://www.googleapis.com/auth/cloud-platform"]
            )
            cl = genai.Client(vertexai=True, project=pid, location="global", credentials=creds)
            clients.append({"client": cl, "project_id": pid})
            print(f"✅ Initialized Vertex AI on project: {pid}")
        except Exception as e:
            print(f"⚠️ Could not init {k.name}: {e}")

if not clients:
    print("❌ No valid Vertex AI clients.")
    sys.exit(1)

MODELS = ["gemini-4-carbon", "gemini-4-argon"]
current_client_idx = 0

def call_gemini(prompt: str, max_retries: int = 5) -> str:
    global current_client_idx
    for attempt in range(max_retries):
        cl_info = clients[current_client_idx]
        cl = cl_info["client"]
        pid = cl_info["project_id"]

        for m in MODELS:
            try:
                res = cl.models.generate_content(
                    model=m,
                    contents=prompt,
                    config={"temperature": 0.2}
                )
                if res and res.text:
                    return res.text
            except Exception as e:
                err = str(e)
                print(f"⚠️ [{pid} | {m}] Error: {err[:120]}")
                if "429" in err or "RESOURCE_EXHAUSTED" in err:
                    sleep_s = (2 ** attempt) * 4 + random.uniform(1.0, 3.0)
                    print(f"⏳ Sleeping {sleep_s:.1f}s...")
                    time.sleep(sleep_s)
                    if len(clients) > 1:
                        current_client_idx = (current_client_idx + 1) % len(clients)
                else:
                    time.sleep(2)
        current_client_idx = (current_client_idx + 1) % len(clients)
    raise RuntimeError("Failed to generate content after max retries.")

VEHICLE_SPECS = [
    {
        "slug": "citroen-ec3-borne-recharge",
        "title": "Borne Recharge Citroën ë-C3 & ë-C4 Domicile 2026 | Temps & Prix Pose",
        "description": "Optimisez la recharge à domicile de votre Citroën ë-C3 (44 kWh) ou ë-C4 en 2026. Borne 7,4 kW vs Green'up, temps de charge de 4h15 à 24h et devis pose certifiée IRVE dès 1150€.",
        "brand_models": "Citroën ë-C3 (batterie LFP 44 kWh) et Citroën ë-C4 (50 kWh et 54 kWh)",
        "battery_details": "44 kWh LFP (ë-C3, charge 100% sans dégradation) / 50 et 54 kWh NMC (ë-C4)",
        "ac_charging": "De série 7,4 kW monophasé (32A). Option 11 kW triphasé (3x16A) sur finition Max.",
        "key_angles": "Citadine la plus vendue de France sous leasing social (sub-25k€). Débat crucial : prise domestique (24h d'immobilisation risquée) vs prise Green'up 3,7 kW (12h) vs borne 7,4 kW (4h15 en 20-80%). Crédit d'impôt 500€ et TVA 5,5%."
    },
    {
        "slug": "peugeot-e3008-e5008-borne-recharge",
        "title": "Borne Recharge Peugeot e-3008 & e-5008 Domicile 2026 | Temps & Prix Pose",
        "description": "Guide technique d'installation borne domicile pour Peugeot e-3008 et e-5008 (batteries 73 kWh et 98 kWh STLA Medium). Borne 7,4 kW vs 11 kW triphasé, prix et aides 2026.",
        "brand_models": "Peugeot e-3008 et Peugeot e-5008 (Plateforme STLA Medium)",
        "battery_details": "73 kWh (Autonomie Standard 525 km) et 98 kWh (Grande Autonomie 700 km)",
        "ac_charging": "De série 11 kW triphasé (3x16A), compatible 7,4 kW monophasé (32A). Option 22 kW triphasé.",
        "key_angles": "SUV familiaux star en France. Batteries géantes de 73 et 98 kWh impossibles à recharger sur prise standard (43 heures !). Borne 7,4 kW (13h30 pour 98 kWh) vs 11 kW triphasé (8h50). Majoration pour tirage de câble supérieur à 10 ou 20 mètres en maison individuelle."
    },
    {
        "slug": "tesla-model-y-borne-recharge",
        "title": "Borne Recharge Tesla Model Y Domicile 2026 : Monophasé ou Triphasé ?",
        "description": "Quelle borne installer pour Tesla Model Y (Propulsion 60 kWh / Grande Autonomie 78 kWh) ? Tesla Wall Connector vs bornes universelles, 7,4 kW vs 11 kW et délestage Linky TIC.",
        "brand_models": "Tesla Model Y (Propulsion, Grande Autonomie Long Range, Performance)",
        "battery_details": "60 kWh LFP (Propulsion BYD/CATL) et 78 kWh NMC (Grande Autonomie & Performance)",
        "ac_charging": "Chargeur embarqué AC 11 kW triphasé (3x16A) / 7,4 kW monophasé (1x32A)",
        "key_angles": "Véhicule électrique N°1 des ventes en France. Débat technique : Tesla Wall Connector V3 (sans écran mais piloté via appli) vs bornes universelles françaises certifiées NF (Schneider Charge, Wallbox Pulsar Plus, Hager Witty avec contacteur jour/nuit et délestage TIC Linky). Faut-il passer son abonnement Enedis en triphasé ?"
    },
    {
        "slug": "mg4-mg-zs-ev-borne-recharge",
        "title": "Borne Recharge MG4 & MG ZS EV Domicile 2026 | Guide Électrique & Prix",
        "description": "Installation borne de recharge pour MG4 et MG ZS EV en 2026. Chargeur 6,6 kW monophasé vs 11 kW triphasé, temps de charge 0-100% et prix de pose IRVE dès 1100€ TTC.",
        "brand_models": "MG4 (Standard, Comfort, Luxury, Trophy, XPower) et MG ZS EV",
        "battery_details": "51 kWh LFP (Standard), 64 kWh NMC (Comfort/Luxury), 77 kWh NMC (Trophy Long Range)",
        "ac_charging": "6,6 kW monophasé (Standard) / 11 kW triphasé (Comfort, Luxury, Trophy, XPower)",
        "key_angles": "Rapport qualité/prix N°1 du marché compact. Attention technique majeure : le chargeur 6,6 kW de la version Standard tire 29A sur une seule phase, nécessitant un disjoncteur 32A et une ligne dédiée 10 mm². Budget matériel + pose maîtrisé dès 1100€ TTC déduction faite du crédit d'impôt."
    },
    {
        "slug": "volvo-ex30-borne-recharge",
        "title": "Borne Recharge Volvo EX30 Domicile 2026 : 7,4 kW, 11 kW ou 22 kW ?",
        "description": "Quelle borne domicile pour le Volvo EX30 (51 kWh LFP / 69 kWh NMC) ? Analyse du chargeur 22 kW de la finition Ultra, contraintes d'abonnement Enedis et devis IRVE 2026.",
        "brand_models": "Volvo EX30 (Single Motor, Single Motor Extended Range, Twin Motor Performance)",
        "battery_details": "51 kWh LFP (Single Motor) et 69 kWh NMC (Extended Range & Twin Motor)",
        "ac_charging": "11 kW triphasé de série (Plus/Core) / 22 kW triphasé de série sur finition Ultra",
        "key_angles": "Carton commercial premium de l'année. La finition Ultra dispose d'un chargeur embarqué 22 kW AC. Faut-il pour autant installer une borne 22 kW à la maison ? Analyse du surcoût d'abonnement Enedis (18 kVA ou 24 kVA triphasé) et pourquoi 85% des propriétaires privilégient une borne 7,4 kW ou 11 kW avec délestage dynamique."
    },
    {
        "slug": "kia-ev3-ev6-borne-recharge",
        "title": "Borne Recharge Kia EV3 & EV6 Domicile 2026 | V2L & Temps de Charge",
        "description": "Guide d'installation de borne de recharge pour Kia EV3 et EV6 en 2026. Batteries 58 à 84 kWh, compatibilité bidirectionnelle V2L, temps de charge et aides de l'État.",
        "brand_models": "Kia EV3 (Standard 58,3 kWh, Long Range 81,4 kWh) et Kia EV6 (58 kWh, 77,4 kWh, 84 kWh E-GMP 800V)",
        "battery_details": "58,3 kWh et 81,4 kWh (EV3) / 58 kWh, 77,4 kWh et 84 kWh (EV6)",
        "ac_charging": "11 kW triphasé (3x16A) / 7,4 kW monophasé (32A). Compatibilité V2L (Vehicle-to-Load jusqu'à 3,6 kW).",
        "key_angles": "Le nouveau SUV compact EV3 démocratise les grandes autonomies. L'EV6 propose une architecture 800V et la fonction V2L pour alimenter des appareils domestiques. Analyse des temps de charge 7,4 kW (8h à 11h) vs 11 kW (5h30 à 7h30) et optimisation des heures creuses Tempo EDF."
    },
    {
        "slug": "dacia-spring-borne-prise-renforcee",
        "title": "Dacia Spring : Prise Renforcée Green'up ou Borne 7,4 kW ? (Arbitrage 2026)",
        "description": "Faut-il installer une borne 7,4 kW ou une prise renforcée Green'up pour une Dacia Spring (26,8 kWh) ? Calcul de rentabilité, temps de charge 4h15 vs 8h30 et prix d'installation.",
        "brand_models": "Dacia Spring Electric 45 et Spring 65 (Extreme)",
        "battery_details": "26,8 kWh utile (Lithium-ion)",
        "ac_charging": "De série max 3,7 kW ou 7,4 kW monophasé selon millésime / option Combo CCS 30 kW",
        "key_angles": "Le dilemme de 100 000 automobilistes en France : est-il rationnel de payer une borne de recharge à 1400€ pour une batterie de seulement 27 kWh ? Comparatif économique impartial : prise renforcée Legrand Green'up 3,7 kW (16A, 400€ à 750€ posée, 8h30 de charge) vs Wallbox 7,4 kW pilotable (1150€ à 1600€ posée avant crédit d'impôt 500€, 4h15 de charge). Pourquoi le crédit d'impôt de 500€ réservé aux bornes pilotables inverse le calcul de rentabilité."
    },
    {
        "slug": "renault-megane-etech-borne-22kw",
        "title": "Borne Recharge Renault Megane E-Tech : Le 22 kW Vaut-il le Triphasé ?",
        "description": "Installation borne domicile pour Renault Megane E-Tech (EV40 / EV60). Chargeur embarqué 22 kW Optimum Charge : analyse du coût réel du triphasé Enedis vs 7,4 kW monophasé.",
        "brand_models": "Renault Megane E-Tech 100% Électrique (EV40 40 kWh et EV60 60 kWh)",
        "battery_details": "40 kWh (EV40) et 60 kWh (EV60)",
        "ac_charging": "Chargeur embarqué AC Optimum Charge 22 kW triphasé (ou Boost Charge 7,4 kW mono)",
        "key_angles": "La Megane E-Tech possède l'atout rare d'encaisser 22 kW en courant alternatif (recharge 0-100% en 2h15 pour la batterie 60 kWh). Cependant, installer une borne 22 kW à domicile impose un compteur triphasé Enedis, un abonnement 18 kVA ou 24 kVA (surcoût annuel d'abonnement d'environ 120€ à 180€) et un disjoncteur différentiel tétrapolaire coûteux. Pourquoi la borne 7,4 kW monophasée (7h15 de nuit) reste le choix de 85% des usagers."
    }
]

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

def generate_guide(spec: dict):
    slug = spec["slug"]
    target_file = TARGET_DIR / f"{slug}.mdx"
    print(f"\n==========================================")
    print(f"🚀 Generating guide: {slug}...")
    print(f"==========================================")

    user_prompt = f"""Rédige le guide MDX complet pour :
Modèles cibles : {spec['brand_models']}
Titre : {spec['title']}
Description meta : {spec['description']}
Spécifications batterie : {spec['battery_details']}
Capacités de charge AC : {spec['ac_charging']}
Enjeux et angles critiques : {spec['key_angles']}

Rends UNIQUEMENT le texte MDX brut, commençant directement par --- (le frontmatter). Aucun commentaire extérieur."""

    full_prompt = f"{SYSTEM_PROMPT}\n\n{user_prompt}"
    content = call_gemini(full_prompt)

    # Clean markdown backticks if any
    clean_content = content.strip()
    if clean_content.startswith("```mdx"):
        clean_content = clean_content[6:]
    elif clean_content.startswith("```markdown"):
        clean_content = clean_content[11:]
    elif clean_content.startswith("```"):
        clean_content = clean_content[3:]
    if clean_content.endswith("```"):
        clean_content = clean_content[:-3]
    clean_content = clean_content.strip()

    with open(target_file, "w", encoding="utf-8") as f:
        f.write(clean_content + "\n")

    print(f"✅ Saved: {target_file.name} ({len(clean_content)} characters)")

def main():
    print(f"🎯 Starting generation of {len(VEHICLE_SPECS)} vehicle guides...")
    for spec in VEHICLE_SPECS:
        target_file = TARGET_DIR / f"{spec['slug']}.mdx"
        if target_file.exists() and target_file.stat().st_size > 1500:
            print(f"⏩ {target_file.name} already exists ({target_file.stat().st_size} bytes). Skipping.")
            continue
        try:
            generate_guide(spec)
            time.sleep(3) # Small breather between calls
        except Exception as e:
            print(f"❌ Failed to generate {spec['slug']}: {e}")

if __name__ == "__main__":
    main()
