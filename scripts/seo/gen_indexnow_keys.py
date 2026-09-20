#!/usr/bin/env python3
"""
Generate a UNIQUE IndexNow key per empire domain and host it as a static file.

Why: reusing a single IndexNow key across all domains triggers Bing's abuse
detection (HTTP 403 "UserForbiddedToAccessSite"). Each site gets its own key at
https://<host>/<key>.txt (served from public/). Idempotent: existing keys.json
is reused, and a key file is only written if missing.
"""
import json
import secrets
from pathlib import Path

ROOT = Path("/Users/marc/Downloads/project-zero")
MAP_PATH = ROOT / "expertbornerecharge" / "scripts" / "seo" / "indexnow-keys.json"

# repo dir -> submission host
DOMAINS = {
    "expertbornerecharge": "expertbornerecharge.com",
    "expertpompeachaleur.com": "expertpompeachaleur.com",
    "expertpanneausolaire.com": "expertpanneausolaire.com",
    "expertpanneausolaire.ch": "expertpanneausolaire.ch",
    "expertdouchesenior.com": "expertdouchesenior.com",
    "expertmonteescalier.com": "expertmonteescalier.com",
    "urgencecouverture.com": "urgencecouverture.com",
    "expertsecuriteincendie": "expertsecuriteincendie.fr",
    "expertpergolabioclimatique.fr": "expertpergolabioclimatique.fr",
    "thermostatcopropriete.fr": "thermostatcopropriete.fr",
}

def main():
    keys = {}
    if MAP_PATH.is_file():
        keys = json.loads(MAP_PATH.read_text())
    for repo, host in DOMAINS.items():
        key = keys.get(host) or secrets.token_hex(16)
        keys[host] = key
        pub = ROOT / repo / "public"
        if not pub.is_dir():
            print(f"SKIP (no public/): {repo}"); continue
        kf = pub / f"{key}.txt"
        if kf.is_file():
            print(f"EXISTS {host}: {key}")
        else:
            kf.write_text(key + "\n", encoding="utf-8")
            print(f"WROTE {host}: {key}  -> {repo}/public/{key}.txt")
    MAP_PATH.write_text(json.dumps(keys, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"\nMap saved: {MAP_PATH}")

if __name__ == "__main__":
    main()
