import { MetadataRoute } from 'next';
import { NATIONAL_TARGETS } from '@/config/national-targets';
import { SEO_SERVICES } from '@/lib/seo-data';
import { NATIONAL_CONFIG } from '@/config/national';
import { slugify } from '@/lib/slugify';
import { brands } from '@/data/brands';
import { getAllVehicles } from '@/data/vehicles';
import { getAllGuides } from '@/lib/mdx';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://expertbornerecharge.com';

    // ========================================
    // 1. CORE STATIC PAGES
    // ========================================
    const coreRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/solutions/copropriete`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/solutions/maison`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/solutions/entreprise`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/guides`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/vehicules`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/mentions-legales`,
            lastModified: new Date('2026-03-01'),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cgv`,
            lastModified: new Date('2026-03-01'),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Filter out redirect targets (airports)
    const validTargets = NATIONAL_TARGETS.filter(t => t.slug !== 'saint-exupery' && t.slug !== 'orly');

    // ========================================
    // 2. PARTNER CITIES
    // ========================================
    const cityRoutes: MetadataRoute.Sitemap = validTargets.map((target) => ({
        url: `${baseUrl}/ville/${slugify(target.name)}`,
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
    // 8. VEHICLE PAGES
    // ========================================
    const vehicles = getAllVehicles();
    const vehicleBrandRoutes: MetadataRoute.Sitemap = Array.from(new Set(vehicles.map((v) => v.brand.toLowerCase()))).map((brand) => ({
        url: `${baseUrl}/vehicules/${brand}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
        url: `${baseUrl}/vehicules/${vehicle.brand.toLowerCase()}/${vehicle.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // ========================================
    // 9. BLOG GUIDES (MDX)
    // ========================================
    const guides = getAllGuides();
    const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(guide.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // ========================================
    // 9b. BLOG POSTS (Supabase)
    // ========================================
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (supabaseUrl && supabaseKey) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            const { data: blogPosts } = await supabase
                .from('blog_posts')
                .select('slug, published_at, updated_at')
                .eq('status', 'published')
                .order('published_at', { ascending: false });

            if (blogPosts) {
                blogRoutes = blogPosts.map((post) => ({
                    url: `${baseUrl}/blog/${post.slug}`,
                    lastModified: new Date(post.updated_at || post.published_at),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }));
            }
        }
    } catch (e) {
        console.warn('[Sitemap] Failed to fetch blog posts:', e);
    }

    // ========================================
    // 11. B2B PSEO Routes (Copro + Entreprise per city)
    // ========================================
    const b2bRoutes: MetadataRoute.Sitemap = validTargets.flatMap((target) => {
        return [
            {
                url: `${baseUrl}/ville/${slugify(target.name)}/copropriete`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.95,
            },
            {
                url: `${baseUrl}/ville/${slugify(target.name)}/entreprise`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.95,
            },
        ];
    });

    // ========================================
    // 12. Domination Longue Traîne: City x Brand (pSEO Matrix)
    // ========================================
    const cityBrandRoutes: MetadataRoute.Sitemap = validTargets.flatMap((target) => {
        return brands.map(brand => ({
            url: `${baseUrl}/ville/${slugify(target.name)}/${brand.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        }));
    });

    return [
        ...coreRoutes,
        ...cityRoutes,
        ...serviceRoutes,
        ...poiRoutes,
        ...installationRoutes,
        ...vehicleBrandRoutes,
        ...vehicleRoutes,
        ...guideRoutes,
        ...blogRoutes,
        ...b2bRoutes,
        ...cityBrandRoutes,
    ].map(item => ({
        ...item,
        url: item.url.toLowerCase()
    }));
}
