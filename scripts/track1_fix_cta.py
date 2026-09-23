#!/usr/bin/env python3
"""
Track 1.5 - Fix the dead #simulateur anchor on guide pages.

The 8 existing guides and the 3 new DPE-Collectif guides all put a CtaButton
with url="#simulateur" inside their MDX, but the guide renderer never exposes
that anchor. The id only exists on ThermoContentPage (city pages). Result:
in-body CTAs silently do nothing on guides, and users have to click through
SimulatorWidget / mobile sticky to /#simulateur on the homepage. That's a
real conversion leak mid-funnel.

Fix: append a LeadForm section with id="simulateur" to the guide renderer,
right before </main>. This makes every guide page a self-contained funnel
and repairs all 11 guides at once, without touching any MDX content.

Additive only: 1 import + 1 section. Verified by next build before push.
"""
from pathlib import Path
import subprocess
import sys

REPO = Path("/Users/marc/Downloads/project-zero/thermostatcopropriete.fr")
FILE = REPO / "src/app/guides/[slug]/page.tsx"


def git_clean(repo: Path) -> bool:
    out = subprocess.run(["git", "-C", str(repo), "status", "--porcelain"],
                         capture_output=True, text=True).stdout
    return out.strip() == ""


IMPORT_ANCHOR = "import SimulatorWidget from '@/components/blog/SimulatorWidget';"
SECTION_ANCHOR = "                    </aside>\n                </div>\n            </main>"

NEW_IMPORT = IMPORT_ANCHOR + "\nimport LeadForm from '@/components/LeadForm';"

NEW_SECTION = """                    </aside>
                </div>

                {/* In-page conversion section: gives `#simulateur` a real target on guides. */}
                <section id="simulateur" className="mt-20 max-w-4xl mx-auto scroll-mt-32">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-3">Devis gratuit pour votre copropriété</h2>
                            <p className="text-slate-600">Estimez les aides CEE mobilisables et recevez jusqu'à 3 devis d'installateurs certifiés.</p>
                        </div>
                        <LeadForm city="France" domain="thermostatcopropriete.fr" targetType="COPRO" themeColor="rose" />
                    </div>
                </section>
            </main>"""


def main():
    dry = "--dry-run" in sys.argv
    if not FILE.is_file():
        print("FATAL: guide page missing"); sys.exit(2)
    if not git_clean(REPO):
        print("FATAL: repo dirty, refusing"); sys.exit(3)
    t = FILE.read_text(encoding="utf-8")
    if 'id="simulateur"' in t:
        print("NOCHANGE (already patched)"); return
    if IMPORT_ANCHOR not in t:
        print("FATAL: import anchor not found"); sys.exit(4)
    if SECTION_ANCHOR not in t:
        print("FATAL: section anchor not found"); sys.exit(5)
    new = t.replace(IMPORT_ANCHOR, NEW_IMPORT, 1)
    new = new.replace(SECTION_ANCHOR, NEW_SECTION, 1)
    if dry:
        print("[dry] would add LeadForm import + #simulateur section before </main>")
        print(f"[dry] net new chars: {len(new) - len(t)}")
        return
    FILE.write_text(new, encoding="utf-8")
    print("OK  guide renderer now has an id=\"simulateur\" LeadForm section")


if __name__ == "__main__":
    main()
