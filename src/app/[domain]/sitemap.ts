import { MetadataRoute } from "next";
import { getCity } from "@/lib/db";
import { SEO_DESTINATIONS, SEO_SERVICES } from "@/lib/seo-data";
import { headers } from "next/headers";

type Props = {
    params: Promise<{ domain: string }>;
}

export default async function sitemap(props?: Props): Promise<MetadataRoute.Sitemap> {
    let domain: string | undefined;

    // Try to get domain from params
    if (props && props.params) {
        const resolved = await props.params;
        domain = resolved.domain;
    }

    // Fallback: Headers (since we rewrite in middleware, Host header should be correct)
    if (!domain) {
        const headersList = await headers();
        const host = headersList.get("host"); // e.g. taxisversailles.com:3000
        if (host) {
            domain = host.split(":")[0];
        }
    }

    const city = domain ? getCity(domain) : null;

    if (!city) {
        return [];
    }

    // baseUrl must match legitimate domain
    const baseUrl = `https://${city.domain}`;

    // Core Static Pages
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/mentions-legales`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/cgv`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/transport-medical`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/gare-aeroport`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/longue-distance`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Neighborhoods (from DB)
    if (city.neighborhoods) {
        for (const neighborhood of city.neighborhoods) {
            const slug = neighborhood.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
            routes.push({
                url: `${baseUrl}/quartier/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.6,
            });
        }
    }

    // Programmatic SEO: Tarif Pages
    const tarifRoutes = SEO_DESTINATIONS.map((dest) => ({
        url: `${baseUrl}/tarif/${dest.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const, // Prices/Estimates might change
        priority: 0.8,
    }));

    // Programmatic SEO: Service Pages
    // Special handling for shortcuts defined in middleware
    const SHORTCUTS = ['conventionne-cpam', 'van-minibus', 'nuit'];

    const serviceRoutes = SEO_SERVICES.map((serv) => {
        const isShortcut = SHORTCUTS.includes(serv.slug);
        return {
            url: isShortcut ? `${baseUrl}/${serv.slug}` : `${baseUrl}/service/${serv.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        };
    });

    // Programmatic SEO: Guides (POIs)
    if (city.points_of_interest) {
        const allPois = [
            ...city.points_of_interest.hotels,
            ...city.points_of_interest.nightlife,
            ...city.points_of_interest.monuments
        ];

        for (const poi of allPois) {
            const slug = poi.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
            routes.push({
                url: `${baseUrl}/guides/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        }
    }

    // Programmatic SEO: Transport Medical (Hospitals)
    if (city.hospitals) {
        for (const hospital of city.hospitals) {
            const slug = hospital.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
            routes.push({
                url: `${baseUrl}/transport-medical/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9, // High priority (Business/Medical)
            });
        }
    }

    return [...routes, ...tarifRoutes, ...serviceRoutes];
}
