import { MetadataRoute } from 'next';
import { NATIONAL_TARGETS } from '@/config/national-targets';
import { REDIRECTED_SERVICE_SLUGS, SEO_SERVICES } from '@/lib/seo-data';
import { slugify } from '@/lib/slugify';
import { brands, PRIORITY_CITY_BRAND_CITIES, PRIORITY_CITY_BRAND_SLUGS } from '@/data/brands';
import { getAllVehicles } from '@/data/vehicles';
import { getAllGuides } from '@/lib/mdx';
import { createClient } from '@supabase/supabase-js';
import { OPERATORS } from '@/data/operators';
import { HARDWARE_PRODUCTS } from '@/data/hardware';
import { DUELS } from '@/data/comparatives';

const CORE_LAST_MOD = new Date('2026-11-20');
const CITY_LAST_MOD = new Date('2026-11-15');
const VEHICLE_LAST_MOD = new Date('2026-11-12');
const SERVICE_LAST_MOD = new Date('2026-10-15');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://expertbornerecharge.com';

    // ========================================
    // 1. CORE STATIC PAGES
    // ========================================
    const coreRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/solutions/copropriete`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/solutions/maison`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/solutions/entreprise`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/operateurs`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/marques`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/comparatifs`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/guides`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/vehicules`,
            lastModified: VEHICLE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/fiscalite-entreprise-borne`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/outils/generateur-lettre-syndic`,
            lastModified: SERVICE_LAST_MOD,
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: SERVICE_LAST_MOD,
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
        lastModified: CITY_LAST_MOD,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // ========================================
    // 5. SERVICE PAGES
    // ========================================
    const serviceRoutes: MetadataRoute.Sitemap = SEO_SERVICES
        .filter((service) => !REDIRECTED_SERVICE_SLUGS.includes(service.slug))
        .map((service) => ({
            url: `${baseUrl}/service/${service.slug}`,
            lastModified: SERVICE_LAST_MOD,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

    // ========================================
    // 7. INSTALLATION BRAND PAGES
    // ========================================
    const installationRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
        url: `${baseUrl}/installation/${brand.slug}`,
        lastModified: VEHICLE_LAST_MOD,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // ========================================
    // 8. VEHICLE PAGES
    // ========================================
    const vehicles = getAllVehicles();
    const vehicleBrandRoutes: MetadataRoute.Sitemap = Array.from(new Set(vehicles.map((v) => slugify(v.brand)))).map((brand) => ({
        url: `${baseUrl}/vehicules/${brand}`,
        lastModified: CORE_LAST_MOD,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
        url: `${baseUrl}/vehicules/${slugify(vehicle.brand)}/${vehicle.id}`,
        lastModified: VEHICLE_LAST_MOD,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // ========================================
    // 9. BLOG GUIDES (MDX)
    // ========================================
    const guides = getAllGuides();
    const guideRoutes: MetadataRoute.Sitemap = guides.map((guide: any) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(guide.updated || guide.date),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // ========================================
    // 9b. BLOG POSTS (Supabase — strictly filtered to 'borne' tag)
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
                .contains('tags', ['borne'])
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
    const b2bRoutes: MetadataRoute.Sitemap = validTargets.flatMap((target) => [
        {
            url: `${baseUrl}/ville/${slugify(target.name)}/copropriete`,
            lastModified: CITY_LAST_MOD,
            changeFrequency: 'weekly' as const,
            priority: 0.95,
        },
        {
            url: `${baseUrl}/ville/${slugify(target.name)}/entreprise`,
            lastModified: CITY_LAST_MOD,
            changeFrequency: 'weekly' as const,
            priority: 0.95,
        },
    ]);

    // ========================================
    // 12. Priority City x Vehicle Brand Matrix (36 high-value URLs)
    // ========================================
    const priorityBrands = brands.filter((b) => PRIORITY_CITY_BRAND_SLUGS.has(b.slug));
    const cityBrandRoutes: MetadataRoute.Sitemap = validTargets
        .filter((target) => PRIORITY_CITY_BRAND_CITIES.has(slugify(target.name)))
        .flatMap((target) =>
            priorityBrands.map((brand) => ({
                url: `${baseUrl}/ville/${slugify(target.name)}/${brand.slug}`,
                lastModified: CITY_LAST_MOD,
                changeFrequency: 'weekly' as const,
                priority: 0.85,
            }))
        );

    // ========================================
    // 13. OPERATEURS & RESEAUX NATIONAUX
    // ========================================
    const operateurRoutes: MetadataRoute.Sitemap = OPERATORS.map((op) => ({
        url: `${baseUrl}/operateurs/${op.slug}`,
        lastModified: new Date(op.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // ========================================
    // 14. BORNES & MATERIELS (HARDWARE)
    // ========================================
    const hardwareRoutes: MetadataRoute.Sitemap = HARDWARE_PRODUCTS.map((prod) => ({
        url: `${baseUrl}/marques/${prod.slug}`,
        lastModified: new Date(prod.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // ========================================
    // 15. DUELS & COMPARATIFS DIRECTS
    // ========================================
    const duelRoutes: MetadataRoute.Sitemap = DUELS.map((duel) => ({
        url: `${baseUrl}/comparatif/${duel.slug}`,
        lastModified: new Date(duel.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    return [
        ...coreRoutes,
        ...cityRoutes,
        ...serviceRoutes,
        ...installationRoutes,
        ...vehicleBrandRoutes,
        ...vehicleRoutes,
        ...guideRoutes,
        ...blogRoutes,
        ...b2bRoutes,
        ...cityBrandRoutes,
        ...operateurRoutes,
        ...hardwareRoutes,
        ...duelRoutes,
    ].map(item => ({
        ...item,
        url: item.url.toLowerCase(),
    }));
}
