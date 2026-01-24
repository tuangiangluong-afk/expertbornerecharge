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

    // Check Alias Redirection (SEO Canonicalization)
    // We need to parse CITIES to find if hostname is an alias
    // Note: To be efficient in middleware, ideally we'd have a map, but iterating 50 items is fast enough.
    // We cannot import CITIES directly if it's not edge compatible, but let's try import locally.

    // Hardcoded redirect logic for aliases (simulated for Edge safety if db.ts is heavy)
    // Actually, db.ts is pure TS/JSON, so it should be fine.

    // NOTE: In Next.js Middleware, importing large modules can be tricky.
    // If we assume the file is light (just the CITIES object), we can use it.

    /* 
       We perform a reverse lookup: 
       Is this hostname in an 'aliases' array of any city?
    */

    // For now, let's keep the rewrite logic simple. 
    // If the user wants stricter redirects (.com -> .fr), we can add it here.

    /*
    const foundCity = Object.values(CITIES).find(c => c.aliases?.includes(hostname));
    if (foundCity) {
        return NextResponse.redirect(new URL(`https://${foundCity.domain}${path}`, req.url), 301);
    }
    */

    if (hostname.includes(".localhost")) {
        domainKey = hostname.split(".localhost")[0];
    } else if (hostname.includes(".nip.io")) {
        domainKey = hostname.split(".")[0];
    }

    // Rewrite to the [domain] dynamic route folder
    const response = NextResponse.rewrite(new URL(`/${domainKey}${path}`, req.url));
    response.headers.set("x-debug-domain-key", domainKey);
    return response;
}
