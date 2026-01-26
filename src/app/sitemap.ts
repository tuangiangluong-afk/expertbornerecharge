import { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/mdx';
import { getAllVehicles } from '@/data/vehicles';
import { getHubConfig, SITES } from '@/lib/sites-config';

// Base URL (Hub)
const BASE_URL = 'https://expertbornerecharge.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const guides = getAllGuides();
    const vehicles = getAllVehicles();

    // 1. Static Routes
    const routes = [
        '',
        '/vehicules',
        '/guides',
        '/outils/generateur-lettre-syndic',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
    }));

    // 2. Guide Routes
    const guideRoutes = guides.map((guide) => ({
        url: `${BASE_URL}/guides/${guide.slug}`,
        lastModified: new Date(guide.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Vehicle Routes
    const vehicleRoutes = vehicles.map((vehicle) => ({
        url: `${BASE_URL}/vehicules/${vehicle.brand.toLowerCase()}/${vehicle.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 4. City Routes (From SITES Config)
    // We filter out the 'home'/Hub slug to avoid duplication with local routes if any
    const cityRoutes = Object.values(SITES)
        .filter(site => site.slug !== 'home' && site.slug !== 'expertbornerecharge.com')
        .map((site) => ({
            // Strategy: Mapping subdomains/sites to folders for the main sitemap if using a Mono-Repo / Path strategy
            // OR listing the actual domains if this is a sitemap index.
            // Given the current structure implies a path-based PSEO /ville/[slug], we map to that.
            // If the strategy is separate domains, they should strictly have their own sitemaps.
            // Assuming we want to index the /ville/slug pages on the main domain:
            url: `${BASE_URL}/ville/${site.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }));

    return [...routes, ...guideRoutes, ...vehicleRoutes, ...cityRoutes];
}
