import { MetadataRoute } from 'next';
import { getCity } from "@/lib/db";
import { slugify } from "@/lib/slugify";

export default async function sitemap({
    params,
}: {
    params: Promise<{ domain: string }>
}): Promise<MetadataRoute.Sitemap> {
    try {
        const { domain } = await params;
        const baseUrl = `https://${domain}`;

        // Use static config only for maximum stability
        const cityConfig = getCity(domain);

        if (!cityConfig) return [];

        // 1. Core Static Routes
        const routes = [
            '',
            '/transport-medical',
            '/gare-aeroport',
            '/longue-distance',
            '/contact',
        ].map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: route === '' ? 1.0 : 0.8,
        }));

        // 2. Dynamic Neighbourhood Routes
        const neighborhoodRoutes = (cityConfig.neighborhoods || []).map((n) => ({
            url: `${baseUrl}/quartier/${slugify(n)}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));

        // 3. Dynamic POI Routes (Nightlife, Hotels, Monuments)
        const pois = [
            ...(cityConfig.points_of_interest?.hotels || []),
            ...(cityConfig.points_of_interest?.nightlife || []),
            ...(cityConfig.points_of_interest?.monuments || [])
        ];

        const poiRoutes = pois.map((poi) => ({
            url: `${baseUrl}/guides/${slugify(poi)}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        }));

        return [...routes, ...neighborhoodRoutes, ...poiRoutes];

    } catch (error) {
        console.error("Sitemap Generation Error:", error);
        // Return at least the static home page if it fails
        return [];
    }
}
