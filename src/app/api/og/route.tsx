import { ImageResponse } from "next/og";

/**
 * Carte Open Graph générée à la volée.
 *
 * POURQUOI PAS UN PNG STATIQUE
 * ----------------------------
 * Avant, toutes les pages d'un site partageaient un seul PNG : jusqu'à 1,3 Mo
 * pour 1200x630, ou bien un carré 1024x1024 annoncé comme 1200x630. Les
 * aperçus de partage étaient donc lourds, parfois refusés par les messageries,
 * et jamais personnalisés par ville. Ici chaque page reçoit sa propre carte.
 *
 * Paramètres : ?q=<slug ou nom de ville>&sub=<accroche libre>
 */
export const runtime = "nodejs";

const BRAND = {
    name: "Expert Borne Recharge",
    domain: "expertbornerecharge.com",
    color: "#059669",
    baseline: "Bornes de recharge IRVE",
    cta: "Audit de puissance gratuit",
};

function pretty(raw: string): string {
    if (raw.includes(" ")) {
        return raw;
    }
    return raw
        .split("-")
        .map((w) => (w.length > 1 ? w.charAt(0).toUpperCase() + w.slice(1) : w.toUpperCase()))
        .join(" ");
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").slice(0, 64);
    const sub = (searchParams.get("sub") || BRAND.baseline).slice(0, 120);
    const badge = (searchParams.get("badge") || "").slice(0, 36);
    const title = q ? pretty(q) : "";
    const titleFontSize = title.length > 36 ? 54 : title.length > 24 ? 68 : 82;

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#0f172a",
                    backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                    padding: "52px 64px",
                    justifyContent: "space-between",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                        <div style={{ display: "flex", width: 14, height: 56, backgroundColor: BRAND.color, borderRadius: 4 }} />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", color: "#f8fafc", fontSize: 32, fontWeight: 700 }}>{BRAND.name}</div>
                            <div style={{ display: "flex", color: "#94a3b8", fontSize: 20, marginTop: 2 }}>{BRAND.domain}</div>
                        </div>
                    </div>
                    {badge ? (
                        <div
                            style={{
                                display: "flex",
                                backgroundColor: "rgba(5, 150, 105, 0.18)",
                                border: "1.5px solid rgba(5, 150, 105, 0.55)",
                                color: "#34d399",
                                padding: "8px 20px",
                                borderRadius: 9999,
                                fontSize: 18,
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                            }}
                        >
                            {badge}
                        </div>
                    ) : null}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    {title ? (
                        <div style={{ display: "flex", color: "#f8fafc", fontSize: titleFontSize, fontWeight: 800, lineHeight: 1.1 }}>
                            {title}
                        </div>
                    ) : null}
                    <div
                        style={{
                            display: "flex",
                            color: BRAND.color,
                            fontSize: 30,
                            fontWeight: 600,
                            marginTop: title ? 16 : 0,
                            maxWidth: 1040,
                            lineHeight: 1.25,
                        }}
                    >
                        {sub}
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
                    <div style={{ display: "flex", color: "#cbd5e1", fontSize: 22, fontWeight: 500 }}>{BRAND.cta}</div>
                    <div style={{ display: "flex", color: "#64748b", fontSize: 18 }}>Installation certifiée IRVE • Qualifelec</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: { "cache-control": "public, max-age=86400, s-maxage=604800" },
        },
    );
}
