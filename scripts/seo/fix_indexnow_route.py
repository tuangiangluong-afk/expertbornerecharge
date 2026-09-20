#!/usr/bin/env python3
"""
Fix the daily /api/indexnow cron route on every empire site.

Problem: all 10 sites hardcode the SAME IndexNow key (d857c213...) and POST
their entire sitemap in one un-chunked request. IndexNow throttles a key used
by many hosts (403 UserForbiddedToAccessSite) and rejects oversized batches —
so the daily cron has been silently failing and reinforcing the throttle.

Fix (isolated to the API route, no page/CRO impact, idempotent):
  1. use the site's UNIQUE key (from indexnow-keys.json)
  2. submit in chunks of 400 with a small delay
"""
import json
import re
import subprocess
from pathlib import Path

ROOT = Path("/Users/marc/Downloads/project-zero")
KEYS = json.loads((ROOT / "expertbornerecharge" / "scripts" / "seo" / "indexnow-keys.json").read_text())
SHARED_KEY = "d857c21382b142dcb53f9459750f5cc4"

REPOS = [
    "expertbornerecharge", "expertpompeachaleur.com", "expertpanneausolaire.com",
    "expertpanneausolaire.ch", "expertdouchesenior.com", "expertmonteescalier.com",
    "urgencecouverture.com", "expertsecuriteincendie", "expertpergolabioclimatique.fr",
    "thermostatcopropriete.fr",
]

OLD_BLOCK = """        // Prepare IndexNow payload
        const payload = {
            host: HOST,
            key: INDEXNOW_KEY,
            keyLocation: KEY_LOCATION,
            urlList: payloadUrls
        };

        // Ping Bing/IndexNow
        const response = await fetch("https://api.indexnow.org/indexnow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`IndexNow Error: ${response.statusText}`);
        }

        return NextResponse.json({
            success: true,
            provider: "IndexNow",
            count: payloadUrls.length,
            message: "Ping sent successfully using sitemap URLs"
        });"""

NEW_BLOCK = """        // Submit in chunks: IndexNow rejects oversized single batches
        const CHUNK = 400;
        let sent = 0;
        for (let i = 0; i < payloadUrls.length; i += CHUNK) {
            const batch = payloadUrls.slice(i, i + CHUNK);
            const payload = {
                host: HOST,
                key: INDEXNOW_KEY,
                keyLocation: KEY_LOCATION,
                urlList: batch,
            };
            const response = await fetch("https://api.indexnow.org/indexnow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error(`IndexNow Error: HTTP ${response.status} on batch ${i / CHUNK + 1}`);
            }
            sent += batch.length;
            await new Promise((r) => setTimeout(r, 250));
        }

        return NextResponse.json({
            success: true,
            provider: "IndexNow",
            count: sent,
            message: "Ping sent successfully using sitemap URLs"
        });"""

def git_clean(repo: Path) -> bool:
    return subprocess.run(["git", "-C", str(repo), "status", "--porcelain"],
                          capture_output=True, text=True).stdout.strip() == ""

def main():
    import sys
    dry = "--dry-run" in sys.argv
    for name in REPOS:
        route = ROOT / name / "src/app/api/indexnow/route.ts"
        if not route.is_file():
            print(f"SKIP (no route) {name}"); continue
        text = route.read_text(encoding="utf-8")
        # resolve this site's host -> unique key
        mhost = re.search(r'HOST = "([^"]+)"', text)
        if not mhost:
            print(f"SKIP (no HOST) {name}"); continue
        apex = mhost.group(1).replace("www.", "")
        key = KEYS.get(apex)
        if not key:
            print(f"SKIP (no key for {apex}) {name}"); continue
        if "Submit in chunks" in text and key in text:
            print(f"NOCHANGE {name}"); continue
        if not git_clean(ROOT / name):
            print(f"SKIP (dirty) {name}"); continue
        new = text
        if OLD_BLOCK in new:
            new = new.replace(OLD_BLOCK, NEW_BLOCK, 1)
        elif "Submit in chunks" not in new:
            print(f"WARN (block not found) {name}"); continue
        new = new.replace(SHARED_KEY, key)
        if dry:
            print(f"[dry] {name} -> key {key} + chunked"); continue
        route.write_text(new, encoding="utf-8")
        print(f"OK  {name}: key={key[:8]}… + chunked")

if __name__ == "__main__":
    main()
