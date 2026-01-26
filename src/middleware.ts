import { NextRequest, NextResponse } from "next/server";
import { isMainHub } from "@/lib/sites-config";

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
        "/sitemap.xml",
        "/robots.txt"
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Get hostname (e.g. bornerechargeparis.fr, expertbornerecharge.com)
    let hostname = req.headers.get("host") || "expertbornerecharge.com";
    hostname = hostname.split(":")[0]; // Remove port if present

    // Check if we are on the main hub
    const isHub = isMainHub(hostname);

    // Get the path
    const searchParams = req.nextUrl.searchParams.toString();
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

    let response: NextResponse;

    // 1. Sitemap Rewrite
    if (path === "/sitemap.xml") {
        return NextResponse.rewrite(new URL("/home/sitemap.xml", req.url));
    }

    // 2. Main Hub Logic
    if (isHub) {
        // Admin and specific routes pass through
        if (path.startsWith("/admin") || path.startsWith("/home") || path.startsWith("/login") || path.startsWith("/api") || path.startsWith("/guides") || path.startsWith("/outils") || path.startsWith("/vehicules") || path.startsWith("/ville") || path.startsWith("/solutions") || path.startsWith("/demo")) {
            response = NextResponse.next();
        } else {
            // Rewrite to /home
            response = NextResponse.rewrite(
                new URL(`/home${path === "/" ? "" : path}`, req.url)
            );
        }
    } else {
        // 3. Satellite Domain Logic
        let domainKey = hostname;

        // Handle localhost development (bornerechargeparis.localhost -> bornerechargeparis)
        if (hostname.includes(".localhost")) {
            domainKey = hostname.split(".")[0];
            if (domainKey === "www") domainKey = hostname.split(".")[1];
        }

        // Remove www for routing
        if (domainKey.startsWith("www.")) {
            domainKey = domainKey.replace("www.", "");
        }

        // Rewrite to [domain] route - use domainKey for localhost, hostname for production
        const routeParam = hostname.includes(".localhost") ? domainKey : hostname;
        response = NextResponse.rewrite(
            new URL(`/${routeParam}${path}`, req.url)
        );

        // Inject headers for the page to read
        response.headers.set("x-irve-domain", hostname);
        response.headers.set("x-irve-city", domainKey);
    }

    // Security Headers (Applied to ALL responses)
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    return response;
}
