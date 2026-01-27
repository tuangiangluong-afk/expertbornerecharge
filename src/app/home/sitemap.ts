import { MetadataRoute } from 'next';
import { NATIONAL_TARGETS } from '@/config/national-targets';
import { SEO_ROUTES } from '@/lib/seo-routes';
import { SEO_SERVICES } from '@/lib/seo-data';
import { SEO_GARES } from '@/lib/seo-gares';
import { NATIONAL_CONFIG } from '@/config/national';
import { slugify } from '@/lib/slugify';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://expertbornerecharge.com';

    // ========================================
    // 1. CORE STATIC PAGES
    // ========================================
    const coreRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/mentions-legales`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cgv`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];

    // ========================================
    // 2. PARTNER CITIES (30 Ghost Broker Pages)
    // ========================================
    const cityRoutes: MetadataRoute.Sitemap = NATIONAL_TARGETS.map((target) => ({
        url: `${baseUrl}/ville/${target.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9, // High priority - main money pages
    }));


    // ========================================
    // 5. SERVICE PAGES
    // ========================================
    const serviceRoutes: MetadataRoute.Sitemap = SEO_SERVICES.map((service) => ({
        url: `${baseUrl}/service/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // ========================================
    // 6. GUIDE PAGES (POIs)
    // ========================================
    const allPois = [
        ...NATIONAL_CONFIG.points_of_interest.hotels,
        ...NATIONAL_CONFIG.points_of_interest.nightlife,
        ...NATIONAL_CONFIG.points_of_interest.monuments
    ];

    const guideRoutes: MetadataRoute.Sitemap = allPois.map((poi) => ({
        url: `${baseUrl}/poi/${slugify(poi)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // ========================================
    // 7. HUB WHITESPACE
    // ========================================
    const extraRoutes: MetadataRoute.Sitemap = [
        { url: `${baseUrl}/vehicules`, lastModified: new Date(), priority: 0.8 },
        { url: `${baseUrl}/guides`, lastModified: new Date(), priority: 0.8 },
        { url: `${baseUrl}/solutions/maison`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/solutions/copropriete`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/solutions/entreprise`, lastModified: new Date(), priority: 0.7 },
    ];

    return [
        ...coreRoutes,
        ...cityRoutes,
        ...serviceRoutes,
        ...guideRoutes,
        ...extraRoutes,
    ];
}
