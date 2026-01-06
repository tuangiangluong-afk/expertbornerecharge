import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Get hostname (e.g. taxiaix.fr, taxiaix.localhost:3000)
    const hostname = req.headers.get("host") || "taxifrance.fr";

    // Check if we are on the main main hub
    // scenarios: "localhost:3000", "taxifrance.fr", "192.168.1.144:3000"
    const isLocalhost = hostname.includes("localhost");
    const isIp = hostname.includes("192.168.1.144");
    const isMainHub =
        hostname === "localhost:3000" ||
        hostname === "taxifrance.fr" ||
        hostname === "www.taxifrance.fr" ||
        hostname === "192.168.1.144:3000";

    // Get the path (e.g. /transport-medical)
    const searchParams = req.nextUrl.searchParams.toString();
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""
        }`;

    // 1. Main Hub Logic
    if (isMainHub) {
        return NextResponse.rewrite(
            new URL(`/home${path === "/" ? "" : path}`, req.url)
        );
    }

    // 2. Tenant Logic
    let domainKey = hostname;

    if (isLocalhost) {
        domainKey = hostname.split(".localhost")[0];
    } else if (hostname.includes(".nip.io")) {
        // Handle nip.io for local network testing (e.g. taxiaix.192.168.1.144.nip.io)
        // Extracts "taxiaix" from "taxiaix.192.168.1.144.nip.io:3000"
        domainKey = hostname.split(".")[0];
    }

    // Rewrite to the [domain] dynamic route folder
    // e.g. /taxiaix/transport-medical
    const response = NextResponse.rewrite(new URL(`/${domainKey}${path}`, req.url));
    response.headers.set("x-debug-domain-key", domainKey);
    response.headers.set("x-debug-original-host", hostname);
    return response;
}
