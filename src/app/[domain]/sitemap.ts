import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getCity } from "@/lib/db";

// Dynamic sitemap using request headers instead of params
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        // Get the domain from the request headers (set by middleware rewrite)
        const headersList = await headers();
        const host = headersList.get('host') || 'taxiaplaisir.com';
        const baseUrl = `https://${host}`;

        // Get city config
        const cityConfig = getCity(host);

        // Always return at least the home page
        const routes: MetadataRoute.Sitemap = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1.0,
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

        // Add neighborhood pages if available
        if (cityConfig?.neighborhoods) {
            for (const neighborhood of cityConfig.neighborhoods) {
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

        return routes;

    } catch (e) {
        console.error("Sitemap Error:", e);
        return [];
    }
}
