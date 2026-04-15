import { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/mdx';
import { getAllVehicles } from '@/data/vehicles';
import { getHubConfig, SITES } from '@/lib/sites-config';
import { slugify } from '@/lib/slugify';

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
        '/contact',
        '/mentions-legales',
        '/cgv',
        '/solutions/copropriete',
        '/solutions/maison',
        '/solutions/entreprise',
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
    // Filter duplicates and 'home' slug
    const uniqueSites = new Map();

    Object.values(SITES).forEach(site => {
        if (site.slug !== 'home' && site.slug !== 'expertbornerecharge.com') {
            uniqueSites.set(site.slug, site);
        }
    });

    const cityRoutes = Array.from(uniqueSites.values()).map((site) => ({
        // Use clean URL: /ville/neuilly-sur-seine
        url: `${BASE_URL}/ville/${slugify(site.city).toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 5. B2B PSEO Routes (Copro + Entreprise per city) — HIGH TICKET
    const b2bRoutes = Array.from(uniqueSites.values()).flatMap((site) => {
        const citySlug = slugify(site.city).toLowerCase();
        return [
            {
                url: `${BASE_URL}/ville/${citySlug}/copropriete`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.95,
            },
            {
                url: `${BASE_URL}/ville/${citySlug}/entreprise`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.95,
            },
        ];
    });

    return [...routes, ...guideRoutes, ...vehicleRoutes, ...cityRoutes, ...b2bRoutes].map(item => ({
        ...item,
        url: item.url.toLowerCase()
    }));
}
