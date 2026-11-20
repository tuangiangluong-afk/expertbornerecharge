#!/usr/bin/env python3
"""
ExpertBorneRecharge Skyscraper Pillar Generator
Topic: Nouvelle Prime de 500 € pour Borne de Recharge Pilotable (2027 vs 2026)
Uses 100% of our Vertex AI Multi-Key Pool (Round-Robin with fallback & backoff)
Inserts directly into Supabase 'blog_posts' with tags ['borne', 'aide-financiere', 'irve', 'fiscalite'].
"""

import os
import glob
import json
import random
import re
import socket
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

socket.setdefaulttimeout(180)

# Paths & Env
BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env.local"

env_vars = {}
if ENV_PATH.exists():
    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                env_vars[k.strip()] = v.strip().strip("'\"")

SUPABASE_URL = env_vars.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = env_vars.get("SUPABASE_SERVICE_ROLE_KEY") or env_vars.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Missing Supabase credentials in .env.local")
    sys.exit(1)


def supabase_get(endpoint: str) -> list:
    url = f"{SUPABASE_URL}/rest/v1/{endpoint}"
    req = urllib.request.Request(url, headers={
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    })
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))


def supabase_insert(table: str, data: dict):
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    payload = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers={
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }, method="POST")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))


# Vertex AI Multi-Key Pool Setup (100% of available keys)
VERTEX_DIR = Path("/Users/marc/Desktop/vertex")
SA_KEYS = [
    VERTEX_DIR / "jaeger-491711-3f3b6971c60b.json",
    VERTEX_DIR / "storyloop-511807-a191c7cc2afc.json",
    VERTEX_DIR / "project-914f45fa-3a80-4f16-955.json"
]

from google.oauth2 import service_account
from google import genai

clients = []
for sa_path in SA_KEYS:
    if sa_path.exists():
        try:
            with open(sa_path) as f:
                sa_data = json.load(f)
            creds = service_account.Credentials.from_service_account_info(
                sa_data,
                scopes=["https://www.googleapis.com/auth/cloud-platform"]
            )
            proj_id = sa_data.get("project_id")
            cl = genai.Client(vertexai=True, project=proj_id, location="global", credentials=creds)
            clients.append({"client": cl, "project_id": proj_id})
            print(f"✅ Initialized Vertex AI on project: {proj_id}")
        except Exception as e:
            print(f"⚠️ Could not init {sa_path.name}: {e}")

if not clients:
    print("❌ No valid Vertex AI clients initialized.")
    sys.exit(1)

MODELS = ["gemini-4-argon", "gemini-3.8-flash"]
current_client_idx = 0


def call_llm(prompt: str, max_retries: int = 5) -> str:
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
                    config={"temperature": 0.25}
                )
                if res and res.text:
                    return res.text
            except Exception as e:
                err = str(e)
                print(f"⚠️ [{pid} | {m}] Error: {err[:100]}")
                if "429" in err or "RESOURCE_EXHAUSTED" in err:
                    sleep_s = (2 ** attempt) * 4 + random.uniform(1.0, 3.0)
                    print(f"⏳ 429 Hit. Sleeping {sleep_s:.1f}s...")
                    time.sleep(sleep_s)
                    if len(clients) > 1:
                        current_client_idx = (current_client_idx + 1) % len(clients)
                        print(f"🔄 Rotating to next Vertex Client -> {clients[current_client_idx]['project_id']}")
                else:
                    time.sleep(2)
        # Rotate on next attempt
        current_client_idx = (current_client_idx + 1) % len(clients)
    raise RuntimeError("Failed to generate content after max retries on all Vertex clients.")


ARTICLE_SPEC = {
    "title": "Nouvelle Prime de 500 € pour Borne de Recharge Pilotable : Pourquoi Attendre 2027 est un Piège Financier",
    "slug": "nouvelle-prime-500-euros-borne-recharge-pilotable-2027",
    "seo_title": "Nouvelle Prime 500 € Borne Pilotable (2027) : Analyse et Piège à Éviter",
    "seo_description": "L'État annonce 500 € d'aide pour les bornes de recharge pilotables au 1er janvier 2027. Pourquoi attendre vous fera perdre plus de 1 000 € en électricité dès 2026.",
    "excerpt": "Le Gouvernement a annoncé une aide de 500 € pour l'installation d'une borne de recharge pilotable à domicile dès le 1er janvier 2027. Analyse chiffrée, critères techniques Linky/TIC et démonstration mathématique de pourquoi attendre 2027 est une hérésie financière.",
    "tags": ["borne", "aide-financiere", "irve", "fiscalite"],
    "category_id": "8d14e155-18a0-4177-bb5e-dd1564db3f2b",
    "published_at": "2026-11-05T18:00:00+00:00",
}

SYSTEM_PROMPT = """Tu es l'ingénieur en chef et auditeur médico-légal et fiscal chez ExpertBorneRecharge.com.
Tu rédiges un guide d'autorité Skyscraper magistral, ultra-technique, chirurgical, sans aucun blabla d'agence ni langue de bois promotionnelle (Standard Recadrage Niveau 3).
Ton écriture est dense, factuelle, riche en chiffres au centime près, en références normatives (NF C 15-100, NF EN 61851-1, décret IRVE n° 2017-26, consuel, CEE, crédit d'impôt 200 quater C du CGI).

Ce guide s'adresse à un propriétaire de maison individuelle ou de copropriété qui vient de lire l'annonce gouvernementale d'une « nouvelle prime de 500 € pour borne de recharge pilotable » et qui hésite à reporter son projet à 2027 pour toucher cette aide.

Plan obligatoire et exigences de contenu (viser plus de 5 000 mots) :

1. L'Annonce Officielle de la Prime de 500 € : Les Faits Bruts et le Calendrier Réel
   - Ce que le ministère de la Transition Énergétique et le Gouvernement ont annoncé.
   - Démontage immédiat de la rumeur : NON, ce n'est PAS applicable dès 2026. La date d'entrée en vigueur est fixée au 1er janvier 2027.
   - Dénonciation des pratiques commerciales frauduleuses de démarcheurs prétendant faire toucher la prime dès aujourd'hui.

2. L'Autopsie Financière : Pourquoi Attendre 2027 est un Piège Mathématique
   - Modélisation mathématique rigoureuse : 15 000 km/an, consommation moyenne 18 kWh/100 km (soit 2 700 kWh/an nécessaires).
   - Coût sur 14 mois d'attente sans borne à domicile :
     * Option Bornes Publiques Rapides DC (Ionity, Fastned, TotalEnergies, Allego à 0,45 € à 0,65 €/kWh) : facture de 1 420 € à 2 050 € sur 14 mois.
     * Option Prise standard domestique 2,3 kW (10A) : temps de charge interminable (18h à 26h), échauffement thermique dangereux des prises murales, rendement médiocre (+15% de pertes Joule).
     * Option Borne Domicile 7,4 kW pilotée en Heures Creuses ou Tempo Bleu (0,16 €/kWh) : facture électricité de seulement 504 € sur 14 mois !
   - Le verdict sans appel : Attendre 14 mois pour espérer toucher 500 € en 2027 engendre un surcoût net d'électricité de +916 € à +1 546 €. Le particulier perd 2 à 3 fois le montant de la prime en attendant !
   - Tableau comparatif complet et détaillé avec coûts mensuels et totaux.

3. Le Panorama Complet des Aides Déjà Actives en 2026
   - Le Crédit d'Impôt 2026 (Article 200 quater C du CGI) : 75 % des dépenses plafonné à 500 € pour un système de charge pilotable.
   - La TVA à taux super-réduit de 5,5 % sur le matériel et la pose par un électricien qualifié IRVE (contre 20 % en pose non-IRVE illégale).
   - La prime Advenir en copropriété (jusqu'à 600 € ou 50% HT en individuel, jusqu'à 8 000 € pour l'infrastructure collective).
   - Les aides cumulables des collectivités territoriales (Grand Paris, Région Normandie, Occitanie, Métropole de Lyon, etc.).
   - Synthèse chiffrée : en 2026, l'installation d'une borne de 1 500 € TTC revient déjà à ~950 € à 1 000 € après crédit d'impôt.

4. Qu'est-ce qu'une Vraie Borne "Pilotable" au Sens de la Réglementation ?
   - Définition technique stricte : modulation de puissance en continu (de 6A à 32A).
   - La Télé-Information Client (TIC) du compteur Linky : liaison physique 2 fils (I1/I2), mode historique (1200 bauds) vs mode standard (9600 bauds).
   - Les tores de mesure ampèremétrique et le délestage dynamique local (gestion locale contre disjonction générale de l'abonnement 6 kVA, 9 kVA ou 12 kVA).
   - La communication distante et protocoles ouverts (OCPP 1.6-J et OCPP 2.0.1, API ouvertes, signal RTE EcoWatt, effacement jours de pointe Tempo Rouge).
   - Pourquoi les simples prises renforcées (Legrand Green'up, Hager Witty prise) sont formellement exclues des critères « borne pilotable ».

5. Benchmark des Bornes Déjà Prêtes et Pilotables du Marché
   - Wallbox Pulsar Plus / Pulsar Max (avec tore Power Boost).
   - Schneider Charge (délestage dynamique et liaison Linky native).
   - Hager Witty XEV1K (robustesse industrielle, carte de communication TIC HIX).
   - Copper SB et ABB Terra AC.
   - Tesla Wall Connector Gen 3 : forces et limites sur le délestage dynamique officiel en France.
   - Tableau comparatif technique : Puissance (7,4 kW / 11 kW / 22 kW), type de délestage, connectivité (Wi-Fi, 4G, Ethernet), prix moyen constaté.

6. Les Risques Légaux et Notariés : Consuel et Qualification IRVE
   - L'obligation légale du décret n° 2017-26 pour toute puissance > 3,7 kW : qualification IRVE obligatoire (mentions P1, P2).
   - Refus de prise en charge par les assurances habitation en cas d'incendie électrique si la borne n'est pas posée par un IRVE.
   - La perte immédiate du crédit d'impôt et de la TVA 5,5 % si facture non conforme.
   - L'attestation Consuel jaune lors de la revente de la maison : le blocage notarié.

7. Synthèse Stratégique et Recommandation d'Expert
   - Faut-il attendre 2027 ? Non. Pourquoi installer au 4e trimestre 2026 est le timing d'arbitrage parfait.
   - Check-list pas-à-pas pour sécuriser son devis et son crédit d'impôt 2026.

8. Foire Aux Questions (FAQ) Structurée (6 questions très détaillées) :
   - Q1: Quelle est la date exacte d'entrée en vigueur de la nouvelle prime de 500 € pour borne pilotable ?
   - Q2: La nouvelle prime de 500 € sera-t-elle cumulable avec le crédit d'impôt actuel ?
   - Q3: Ma prise renforcée Green'up est-elle éligible à la nouvelle prime pilotable de 500 € ?
   - Q4: Quel est le prix réel d'une borne de recharge pilotable posée par un électricien IRVE en 2026 ?
   - Q5: Que se passe-t-il si j'installe ma borne moi-même sans artisan certifié IRVE ?
   - Q6: Comment s'assurer que sa borne est techniquement 'pilotable' vis-à-vis du compteur Linky ?

Formate le texte en Markdown de haute facture, avec titres #, ##, ###, tableaux en syntaxe Markdown, citations en blockquote (>), et puces précises. Ne mets pas de balise HTML superflue. Reste dense et exhaustif."""


def main():
    print("=================================================================")
    print("🚀 GENERATING SKYSCRAPER PILLAR FOR EXPERTBORNERECHARGE.COM")
    print(f"📁 Slug: {ARTICLE_SPEC['slug']}")
    print("=================================================================")

    start_time = time.time()
    prompt = f"{SYSTEM_PROMPT}\n\nRédige dès maintenant l'intégralité du guide pour le sujet : '{ARTICLE_SPEC['title']}'. Commence directement par le titre H1."
    content = call_llm(prompt)
    elapsed = time.time() - start_time
    word_count = len(content.split())
    print(f"✅ Text generated ({word_count} words, {elapsed:.1f}s)")

    # Extract FAQs for schema
    faq_items = [
        {
            "question": "Quelle est la date exacte d'entrée en vigueur de la nouvelle prime de 500 € pour borne pilotable ?",
            "answer": "Contrairement aux annonces précipitées relayées sur les réseaux sociaux, la nouvelle prime de 500 € pour l'installation d'une borne de recharge pilotable n'entre pas en vigueur en 2026. Le décret ministériel fixe son application au 1er janvier 2027, le temps pour Enedis et la filière IRVE de finaliser les protocoles de pilotage énergétique."
        },
        {
            "question": "Faut-il attendre 2027 pour installer sa borne de recharge ?",
            "answer": "Non, attendre 2027 est une hérésie financière. Pendant 14 mois d'attente, un conducteur parcourant 15 000 km/an devra recharger sur des bornes publiques ou des prises inadaptées, engendrant un surcoût d'électricité compris entre 900 € et 1 500 €. En installant dès 2026, vous bénéficiez déjà du crédit d'impôt de 500 € et de la TVA à 5,5 %."
        },
        {
            "question": "Une prise renforcée Green'up donne-t-elle droit à la prime de 500 € ?",
            "answer": "Non. Les prises renforcées (comme la Legrand Green'up ou Hager Witty prise) sont formellement exclues. La prime exige une borne de recharge intelligente capable d'ajuster dynamiquement sa puissance de 6A à 32A via la Télé-Information Client (TIC) du compteur Linky ou le protocole OCPP."
        },
        {
            "question": "Combien coûte réellement une borne pilotable posée par un artisan IRVE en 2026 ?",
            "answer": "Pour une maison individuelle avec une puissance souscrite de 9 kVA et un tableau électrique standard, le coût complet de fourniture et pose d'une borne pilotable 7,4 kW oscille entre 1 200 € et 1 700 € TTC. Après déduction du crédit d'impôt immédiat de 500 €, le reste à charge réel se situe entre 700 € et 1 200 €."
        },
        {
            "question": "Puis-je installer ma borne moi-même sans certification IRVE ?",
            "answer": "Non. Selon le décret n° 2017-26, toute installation de point de recharge de puissance supérieure à 3,7 kW doit obligatoirement être réalisée par un électricien qualifié IRVE. L'auto-installation entraîne la perte du crédit d'impôt, de la TVA réduite, et l'exclusion de garantie par votre assurance habitation en cas de sinistre électrique."
        },
        {
            "question": "Quels sont les prérequis techniques pour qu'une borne soit considérée comme 'pilotable' ?",
            "answer": "La borne doit disposer d'un système de gestion dynamique de la charge (soit par tore de mesure ampèremétrique filaire/radio, soit par liaison TIC Linky bornes I1/I2) capable d'adapter l'ampérage appelé selon la consommation globale du foyer et d'effacer la recharge lors des heures de pointe ou jours Tempo Rouge."
        }
    ]

    # Clean leading/trailing markdown code blocks if any
    clean_content = content.strip()
    if clean_content.startswith("```markdown"):
        clean_content = clean_content[len("```markdown"):].strip()
    elif clean_content.startswith("```"):
        clean_content = clean_content[3:].strip()
    if clean_content.endswith("```"):
        clean_content = clean_content[:-3].strip()

    payload = {
        "title": ARTICLE_SPEC["title"],
        "slug": ARTICLE_SPEC["slug"],
        "excerpt": ARTICLE_SPEC["excerpt"],
        "content": clean_content,
        "status": "published",
        "author_id": None,
        "category_id": ARTICLE_SPEC["category_id"],
        "published_at": ARTICLE_SPEC["published_at"],
        "updated_at": datetime.utcnow().isoformat() + "Z",
        "seo_title": ARTICLE_SPEC["seo_title"],
        "seo_description": ARTICLE_SPEC["seo_description"],
        "read_time_minutes": max(12, word_count // 250),
        "tags": ARTICLE_SPEC["tags"],
        "faq": faq_items,
    }

    # Check if slug exists in DB
    existing = supabase_get(f"blog_posts?slug=eq.{ARTICLE_SPEC['slug']}&select=id")
    if existing:
        print(f"ℹ️ Article {ARTICLE_SPEC['slug']} already exists in Supabase. Updating...")
        post_id = existing[0]["id"]
        url = f"{SUPABASE_URL}/rest/v1/blog_posts?id=eq.{post_id}"
        req_data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(url, data=req_data, headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }, method="PATCH")
        with urllib.request.urlopen(req) as resp:
            res = json.loads(resp.read().decode("utf-8"))
            print(f"💾 Updated {ARTICLE_SPEC['slug']} in Supabase!")
    else:
        res = supabase_insert("blog_posts", payload)
        print(f"💾 Inserted {ARTICLE_SPEC['slug']} to Supabase!")

    print(f"🎉 SKYSCRAPER PILLAR DEPLOYED SUCCESSFULLY TO EXPERTBORNERECHARGE ({word_count} words)!")


if __name__ == "__main__":
    main()
