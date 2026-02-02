import { NextRequest, NextResponse } from "next/server";
import { isMainHub } from "@/lib/sites-config";

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|_vercel|images/|[\\w-]+\\.\\w+).*)",
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
    const cleanPath = url.pathname;
    const path = `${cleanPath}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

    // Helper to apply security headers
    const applySecurityHeaders = (res: NextResponse) => {
        res.headers.set("X-Frame-Options", "DENY");
        res.headers.set("X-Content-Type-Options", "nosniff");
        res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
        res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
        res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
        return res;
    };

    // 0. EXPLICIT DEAD ROUTES (GSC Cleanup)
    if (cleanPath.startsWith("/gare")) {
        return applySecurityHeaders(new NextResponse(null, { status: 410, statusText: "Gone" }));
    }

    // 0.1 Path Normalization (Lowercase & No Trailing Slash handled by next.config `trailingSlash: false`)
    if (cleanPath !== cleanPath.toLowerCase()) {
        const lowercaseUrl = new URL(url.origin + url.pathname.toLowerCase() + url.search);
        if (lowercaseUrl.href !== url.href) {
            return applySecurityHeaders(NextResponse.redirect(lowercaseUrl, 301));
        }
    }

    // 0.2 Domain Normalization (www -> non-www)
    if (hostname.startsWith("www.")) {
        const newHostname = hostname.replace("www.", "");
        const newUrl = new URL(req.url);
        newUrl.hostname = newHostname;
        if (newUrl.href !== req.url) {
            return applySecurityHeaders(NextResponse.redirect(newUrl, 301));
        }
    }

    // 1. Sitemap Rewrite
    if (path === "/sitemap.xml") {
        if (isHub) {
            return applySecurityHeaders(NextResponse.rewrite(new URL("/home/sitemap.xml", req.url)));
        }
        return applySecurityHeaders(NextResponse.rewrite(new URL(`/${hostname}/sitemap.xml`, req.url)));
    }

    // 2. Routing Logic
    let response: NextResponse;

    if (isHub) {
        // HUB Logic

        // Redirect /home/* to /* to prevent duplicate content
        if (cleanPath.startsWith("/home") && cleanPath !== "/home/sitemap.xml") {
            const cleanUrl = cleanPath.replace("/home", "") || "/";
            const targetUrl = new URL(cleanUrl + url.search, req.url);
            if (targetUrl.href !== req.url) {
                return applySecurityHeaders(NextResponse.redirect(targetUrl, 301));
            }
        }

        if (path.startsWith("/admin") || path.startsWith("/login") || path.startsWith("/api") || path.startsWith("/guides") || path.startsWith("/outils") || path.startsWith("/vehicules") || path.startsWith("/ville") || path.startsWith("/solutions") || path.startsWith("/service") || path.startsWith("/quartier") || path.startsWith("/departement") || path.startsWith("/poi") || path.startsWith("/demo") || path.startsWith("/installation") || path.startsWith("/images")) {
            response = NextResponse.next();
        } else {
            response = NextResponse.rewrite(
                new URL(`/home${path === "/" ? "" : path}`, req.url)
            );
        }
    } else {
        // SATELLITE Logic

        // Whitelist shared routes (serve from root app)
        if (path.startsWith("/guides") || path.startsWith("/vehicules") || path.startsWith("/solutions") || path.startsWith("/ville") || path.startsWith("/service") || path.startsWith("/quartier") || path.startsWith("/departement") || path.startsWith("/poi") || path.startsWith("/api") || path.startsWith("/outils") || path.startsWith("/login") || path.startsWith("/admin") || path.startsWith("/installation")) {
            return applySecurityHeaders(NextResponse.next());
        }

        let domainKey = hostname;
        if (hostname.includes(".localhost")) {
            domainKey = hostname.split(".")[0];
            if (domainKey === "www") domainKey = hostname.split(".")[1];
        }

        if (domainKey.startsWith("www.")) {
            domainKey = domainKey.replace("www.", "");
        }

        const routeParam = hostname.includes(".localhost") ? domainKey : hostname;
        response = NextResponse.rewrite(
            new URL(`/${routeParam}${path}`, req.url)
        );

        response.headers.set("x-irve-domain", hostname);
        response.headers.set("x-irve-city", domainKey);
    }

    // Global Path injection for canonicals
    response.headers.set("x-irve-path", cleanPath);

    return applySecurityHeaders(response);
}


