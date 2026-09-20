#!/usr/bin/env python3
"""
Doorway-page cleanup for the vertical lead-gen sites.

`/ville/saint-exupery` (Lyon airport, not a commune) and `/ville/orly` were
rendering thin/doorway pages on every vertical, whereas the flagship hub
already 301s them to the nearest real city (lyon / paris). This replicates the
hub's PROVEN redirects on the verticals. 301 (not delete) => internal mesh
links keep resolving, so there are no 404 regressions and link equity is kept.

Only touches repos that (a) are clean, (b) have the `trailingSlash: false,`
anchor, and (c) do NOT already redirect these slugs. Idempotent.
"""
import subprocess
from pathlib import Path

ROOT = Path("/Users/marc/Downloads/project-zero")

# 8 French verticals (Swiss .ch excluded: no FR city pages there, would 404).
SCOPE = [
    "expertdouchesenior.com",
    "expertmonteescalier.com",
    "expertpanneausolaire.com",
    "expertpompeachaleur.com",
    "urgencecouverture.com",
    "expertsecuriteincendie",
    "expertpergolabioclimatique.fr",
    "thermostatcopropriete.fr",
]

REDIRECT_BLOCK = """  async redirects() {
    return [
      { source: '/ville/saint-exupery', destination: '/ville/lyon', permanent: true },
      { source: '/ville/orly', destination: '/ville/paris', permanent: true },
    ];
  },
"""

ANCHOR = "  trailingSlash: false,\n"

def git_clean(repo: Path) -> bool:
    out = subprocess.run(["git", "-C", str(repo), "status", "--porcelain"],
                         capture_output=True, text=True).stdout
    return out.strip() == ""

def main():
    dry = False
    import sys
    dry = "--dry-run" in sys.argv
    for name in SCOPE:
        cfg = ROOT / name / "next.config.ts"
        if not cfg.is_file():
            print(f"SKIP (no next.config) {name}"); continue
        text = cfg.read_text(encoding="utf-8")
        if "ville/saint-exupery" in text:
            print(f"NOCHANGE (already redirected) {name}"); continue
        if ANCHOR not in text:
            print(f"SKIP (anchor missing) {name}"); continue
        if not git_clean(ROOT / name):
            print(f"SKIP (dirty) {name}"); continue
        if dry:
            print(f"[dry] would patch {name}"); continue
        new = text.replace(ANCHOR, ANCHOR + REDIRECT_BLOCK, 1)
        cfg.write_text(new, encoding="utf-8")
        print(f"OK  patched {name}")

if __name__ == "__main__":
    main()
