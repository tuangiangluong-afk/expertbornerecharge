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
    return raw
        .split("-")
        .map((w) => (w.length > 1 ? w.charAt(0).toUpperCase() + w.slice(1) : w.toUpperCase()))
        .join(" ");
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").slice(0, 48);
    const sub = (searchParams.get("sub") || BRAND.baseline).slice(0, 92);
    const city = q ? pretty(q) : "";

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
                    padding: "56px 64px",
                    justifyContent: "space-between",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div style={{ display: "flex", width: 16, height: 62, backgroundColor: BRAND.color, borderRadius: 4 }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", color: "#f8fafc", fontSize: 36, fontWeight: 700 }}>{BRAND.name}</div>
                        <div style={{ display: "flex", color: "#94a3b8", fontSize: 22, marginTop: 4 }}>{BRAND.domain}</div>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    {city ? (
                        <div style={{ display: "flex", color: "#f8fafc", fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
                            {city}
                        </div>
                    ) : null}
                    <div
                        style={{
                            display: "flex",
                            color: BRAND.color,
                            fontSize: 34,
                            fontWeight: 600,
                            marginTop: city ? 12 : 0,
                            maxWidth: 1000,
                        }}
                    >
                        {sub}
                    </div>
                </div>

                <div style={{ display: "flex", color: "#cbd5e1", fontSize: 24 }}>{BRAND.cta}</div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: { "cache-control": "public, max-age=86400, s-maxage=604800" },
        },
    );
}
