import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
        "/sitemap.xml",
        "/robots.txt"
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Get hostname (e.g. taxiaix.fr, taxiaix.localhost)
    let hostname = req.headers.get("host") || "taxifrance.fr";
    hostname = hostname.split(":")[0]; // Remove port if present

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
        if (path.startsWith("/taxi") || path.startsWith("/admin") || path.startsWith("/home") || path.startsWith("/login")) {
            return NextResponse.next();
        }
        // Otherwise rewrite to /home
        return NextResponse.rewrite(
            new URL(`/home${path === "/" ? "" : path}`, req.url)
        );
    }

    // 2. Tenant Logic
    let domainKey = hostname;

    // Custom Domain Mapping (localhost dev)
    if (hostname.includes(".localhost")) {
        domainKey = hostname.split(".")[0]; // taxiaix.localhost -> taxiaix
        if (domainKey === "www") domainKey = hostname.split(".")[1]; // www.taxiaix.localhost -> taxiaix
    } else {
        // Production Domain Mapping
        // Just use the hostname directly. db.ts (getCity) handles exact domain matching (e.g. taxiaplaisir.com)
        // AND aliases (e.g. taxiaplaisir.fr for taxiaplaisir slug)
    }

    // Rewrite to our dynamic route /src/app/[domain]/...
    // We pass the hostname as the 'domain' param.
    // getCity(domain) will return the correct config.
    return NextResponse.rewrite(
        new URL(`/${hostname}${path}`, req.url)
    );
}
