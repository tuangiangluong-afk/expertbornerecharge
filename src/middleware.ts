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

    let response: NextResponse;

    // 1. Sitemap Rewrite (Fix for /home/sitemap.ts)
    if (path === "/sitemap.xml") {
        return NextResponse.rewrite(new URL("/home/sitemap.xml", req.url));
    }

    // 2. Main Hub Logic - Redirect / to /home
    if (isMainHub) {
        // Direct access to city pages like /taxiaix should work
        if (path.startsWith("/taxi") || path.startsWith("/admin") || path.startsWith("/home") || path.startsWith("/login")) {
            response = NextResponse.next();
        } else {
            // Otherwise rewrite to /home
            response = NextResponse.rewrite(
                new URL(`/home${path === "/" ? "" : path}`, req.url)
            );
        }
    } else {
        // 2. Tenant Logic
        let domainKey = hostname;

        // Custom Domain Mapping (localhost dev)
        if (hostname.includes(".localhost")) {
            domainKey = hostname.split(".")[0]; // taxiaix.localhost -> taxiaix
            if (domainKey === "www") domainKey = hostname.split(".")[1]; // www.taxiaix.localhost -> taxiaix
        }

        // Custom Rewrite for specific service shortcuts (root level access)
        const serviceShortcuts = ['/conventionne-cpam', '/van-minibus', '/nuit'];
        let finalPath = path;

        // Use pathname (without query) for matching to be robust
        const pathname = url.pathname;
        if (serviceShortcuts.some(s => pathname === s || pathname.startsWith(s + '/'))) {
            finalPath = `/service${path}`;
        }

        response = NextResponse.rewrite(
            new URL(`/${hostname}${finalPath}`, req.url)
        );
    }

    // Security Headers (Applied to ALL responses)
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    return response;
}
