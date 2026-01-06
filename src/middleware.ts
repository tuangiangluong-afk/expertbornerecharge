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

    // Check if we are on the main hub
    // scenarios: "localhost:3000", "taxifrance.fr", "taxifrance.vercel.app"
    const isMainHub =
        hostname.includes("localhost") && !hostname.includes(".localhost") ||
        hostname === "taxifrance.fr" ||
        hostname === "www.taxifrance.fr" ||
        hostname.includes("taxifrance.vercel.app") ||
        hostname.includes("192.168.1.144");

    // Get the path (e.g. /transport-medical)
    const searchParams = req.nextUrl.searchParams.toString();
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""
        }`;

    // 1. Main Hub Logic - Redirect / to /home
    if (isMainHub) {
        // Direct access to city pages like /taxiaix should work
        if (path.startsWith("/taxi") || path.startsWith("/admin") || path.startsWith("/home")) {
            return NextResponse.next();
        }
        // Otherwise rewrite to /home
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
