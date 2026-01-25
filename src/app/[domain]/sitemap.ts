import { MetadataRoute } from "next";
import { getCity } from "@/lib/db";
import { SEO_DESTINATIONS, SEO_SERVICES } from "@/lib/seo-data";

export default async function sitemap({
    params,
}: {
    params: Promise<{ domain: string }>;
}): Promise<MetadataRoute.Sitemap> {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);

    // Sitemap.xml is requested often by bots, ensure it doesn't crash
    if (!city) {
        console.error(`[Sitemap] City not found for domain: ${resolvedParams.domain}`);
        return [];
    }

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
    const serviceRoutes = SEO_SERVICES.map((serv) => ({
        url: `${baseUrl}/service/${serv.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [...routes, ...tarifRoutes, ...serviceRoutes];
}
