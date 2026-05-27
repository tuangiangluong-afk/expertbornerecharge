import { MetadataRoute } from 'next';
import { NATIONAL_TARGETS } from '@/config/national-targets';
import { SEO_ROUTES } from '@/lib/seo-routes';
import { SEO_SERVICES } from '@/lib/seo-data';
import { SEO_GARES } from '@/lib/seo-gares';
import { NATIONAL_CONFIG } from '@/config/national';
import { slugify } from '@/lib/slugify';
import { brands } from '@/data/brands';
import { getAllVehicles } from '@/data/vehicles';
import { getAllGuides } from '@/lib/mdx';

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
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
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

    const poiRoutes: MetadataRoute.Sitemap = allPois.map((poi) => ({
        url: `${baseUrl}/poi/${slugify(poi)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // ========================================
    // 7. INSTALLATION BRAND PAGES (NEW)
    // ========================================
    const installationRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
        url: `${baseUrl}/installation/${brand.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // ========================================
    // 8. VEHICLE PAGES (NEW)
    // ========================================
    const vehicles = getAllVehicles();
    const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
        url: `${baseUrl}/vehicules/${vehicle.brand.toLowerCase()}/${vehicle.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // ========================================
    // 9. BLOG GUIDES (Dynamic)
    // ========================================
    const guides = getAllGuides();
    const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(guide.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // ========================================
    // 10. HUB WHITESPACE
    // ========================================
    const extraRoutes: MetadataRoute.Sitemap = [
        { url: `${baseUrl}/vehicules`, lastModified: new Date(), priority: 0.8 },
        { url: `${baseUrl}/guides`, lastModified: new Date(), priority: 0.8 },
        { url: `${baseUrl}/solutions/maison`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/solutions/copropriete`, lastModified: new Date(), priority: 0.7 },
        { url: `${baseUrl}/solutions/entreprise`, lastModified: new Date(), priority: 0.7 },
    ];


    // ========================================
    // 11. B2B PSEO Routes (Copro + Entreprise per city)
    // ========================================
    const b2bRoutes = NATIONAL_TARGETS.flatMap((target) => {
        return [
            {
                url: `${baseUrl}/ville/${target.slug}/copropriete`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.95,
            },
            {
                url: `${baseUrl}/ville/${target.slug}/entreprise`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.95,
            },
        ];
    });

    // ========================================
    // 12. Domination Longue Traîne: City x Brand (pSEO Matrix)
    // ========================================
    const cityBrandRoutes = NATIONAL_TARGETS.flatMap((target) => {
        return brands.map(brand => ({
            url: `${baseUrl}/ville/${target.slug}/${brand.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        }));
    });

    return [
        ...coreRoutes,
        ...cityRoutes,
        ...serviceRoutes,
        ...poiRoutes,
        ...installationRoutes,
        ...vehicleRoutes,
        ...guideRoutes,
        ...extraRoutes,
        ...b2bRoutes,
        ...cityBrandRoutes,
    ].map(item => ({
        ...item,
        url: item.url.toLowerCase()
    }));
}
