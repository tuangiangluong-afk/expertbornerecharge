#!/usr/bin/env python3
"""
Empire-wide honesty fix: the `tminJan` field actually stores the French
heating design temperature (température de base hivernale, ~P190), NOT the
"average January minimum". Pages were stating demonstrably false facts
(e.g. "Marseille: average January minimum -5.9°C"), which hurts E-E-A-T and
AI-model trust/citability.

This script relabels the value correctly. It is a pure, low-risk string fix
(no fabricated data), idempotent, and only touches repos whose working tree
is clean (so it never clobbers in-progress work).

Repos processed: the vertical lead-gen sites that ship src/data/local-facts.ts.
The IRVE hub (expertbornerecharge) has no climate data and is skipped.
"""
import subprocess
import sys
from pathlib import Path

ROOT = Path("/Users/marc/Downloads/project-zero")

# Ordered (find, replace) pairs. Article gender is fixed too.
PSEO_REPLACEMENTS = [
    ("le minimum moyen de janvier", "la température de base hivernale"),
    ("un minimum moyen de janvier", "une température de base hivernale"),
    ("Minimum moyen de janvier", "Température de base hivernale"),
    # any residual lowercase phrase (no article)
    ("minimum moyen de janvier", "température de base hivernale"),
]

DATA_REPLACEMENTS = [
    ("Minimum moyen de janvier, degres C", "Temperature de base hivernale (P190), degres C"),
    ("minimum moyen de janvier", "temperature de base hivernale"),
]

def git_clean(repo: Path) -> bool:
    out = subprocess.run(["git", "-C", str(repo), "status", "--porcelain"],
                         capture_output=True, text=True).stdout
    return out.strip() == ""

def apply(path: Path, pairs) -> int:
    if not path.is_file():
        return 0
    text = path.read_text(encoding="utf-8")
    original = text
    hits = 0
    for find, repl in pairs:
        if find in text:
            hits += text.count(find)
            text = text.replace(find, repl)
    if text != original:
        path.write_text(text, encoding="utf-8")
        return hits
    return 0

def main():
    # Explicit scope: the 9 vertical lead-gen repos from the user's list that
    # ship this shared file. The IRVE hub has no climate data (skipped).
    SCOPE = [
        "expertdouchesenior.com",
        "expertmonteescalier.com",
        "expertpanneausolaire.com",
        "expertpanneausolaire.ch",
        "expertpompeachaleur.com",
        "urgencecouverture.com",
        "expertsecuriteincendie",
        "expertpergolabioclimatique.fr",
        "thermostatcopropriete.fr",
    ]
    repos = [ROOT / name for name in SCOPE]

    if "--dry-run" in sys.argv:
        print("[dry-run] would process:", [r.name for r in repos])
        return

    changed = []
    for repo in repos:
        if not git_clean(repo):
            print(f"SKIP (dirty working tree): {repo.name}")
            continue
        total = 0
        total += apply(repo / "src/lib/pseo.ts", PSEO_REPLACEMENTS)
        total += apply(repo / "src/data/local-facts.ts", DATA_REPLACEMENTS)
        # some clones keep pseo under src/lib/pseo/*.ts
        for sub in (repo / "src/lib/pseo").glob("*.ts"):
            total += apply(sub, PSEO_REPLACEMENTS)
        if total:
            changed.append((repo.name, total))
            print(f"OK  {repo.name}: {total} replacement(s)")
        else:
            print(f"NOCHANGE {repo.name}")

    print("\nSummary:", ", ".join(f"{n}({c})" for n, c in changed) or "nothing changed")

if __name__ == "__main__":
    main()
