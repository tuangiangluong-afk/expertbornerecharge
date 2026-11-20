import { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/mdx';
import { getAllVehicles } from '@/data/vehicles';
import { CITIES } from '@/lib/db';
import { slugify } from '@/lib/slugify';
import { REDIRECTED_SERVICE_SLUGS, SEO_SERVICES } from '@/lib/seo-data';
import { DEPARTMENTS } from '@/config/departments';
import { createClient } from '@supabase/supabase-js';
import { brands as brandList, PRIORITY_CITY_BRAND_CITIES, PRIORITY_CITY_BRAND_SLUGS } from '@/data/brands';
import { OPERATORS } from '@/data/operators';
import { HARDWARE_PRODUCTS } from '@/data/hardware';
import { DUELS } from '@/data/comparatives';

// Base URL (Hub)
const BASE_URL = 'https://expertbornerecharge.com';
const CORE_LAST_MOD = new Date('2026-11-20');
const CITY_LAST_MOD = new Date('2026-11-15');
const VEHICLE_LAST_MOD = new Date('2026-11-12');
const SERVICE_LAST_MOD = new Date('2026-10-15');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const guides = getAllGuides();
    const vehicles = getAllVehicles();

    // 1. Static Routes (with honest stable lastModified)
    const routes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/solutions/copropriete`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/solutions/maison`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/solutions/entreprise`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/operateurs`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/marques`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/comparatifs`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/guides`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/vehicules`,
            lastModified: VEHICLE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/fiscalite-entreprise-borne`,
            lastModified: CORE_LAST_MOD,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${BASE_URL}/outils/generateur-lettre-syndic`,
            lastModified: SERVICE_LAST_MOD,
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${BASE_URL}/mentions-legales`,
            lastModified: new Date('2026-03-01'),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/cgv`,
            lastModified: new Date('2026-03-01'),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // 2. Service Routes (from SEO_SERVICES)
    const serviceRoutes: MetadataRoute.Sitemap = SEO_SERVICES
        .filter((service) => !REDIRECTED_SERVICE_SLUGS.includes(service.slug))
        .map((service) => ({
            url: `${BASE_URL}/service/${service.slug}`,
            lastModified: SERVICE_LAST_MOD,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

    // 3. Guide Routes (static MDX)
    const guideRoutes: MetadataRoute.Sitemap = guides.map((guide: any) => ({
        url: `${BASE_URL}/guides/${guide.slug}`,
        lastModified: new Date(guide.updated || guide.date),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // 4. Blog Routes (dynamic from Supabase — strictly filtered to 'borne' tag)
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
                    url: `${BASE_URL}/blog/${post.slug}`,
                    lastModified: new Date(post.updated_at || post.published_at),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }));
            }
        }
    } catch (e) {
        console.warn('[Sitemap] Failed to fetch blog posts:', e);
    }

    // 5. Vehicle Routes
    const vehicleBrandRoutes: MetadataRoute.Sitemap = Array.from(new Set(vehicles.map((v) => slugify(v.brand)))).map((brand) => ({
        url: `${BASE_URL}/vehicules/${brand}`,
        lastModified: CORE_LAST_MOD,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
        url: `${BASE_URL}/vehicules/${slugify(vehicle.brand)}/${vehicle.id}`,
        lastModified: VEHICLE_LAST_MOD,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 6. City Routes (From CITIES Config)
    const uniqueSites = new Map();
    Object.values(CITIES).forEach(site => {
        if (site.slug !== 'home' && site.slug !== 'expertbornerecharge.com' && site.slug !== 'saint-exupery' && site.slug !== 'orly') {
            uniqueSites.set(site.slug, site);
        }
    });

    const cityRoutes: MetadataRoute.Sitemap = Array.from(uniqueSites.values()).map((site) => ({
        url: `${BASE_URL}/ville/${slugify(site.city).toLowerCase()}`,
        lastModified: CITY_LAST_MOD,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 7. B2B PSEO Routes (Copro + Entreprise per city)
    const b2bRoutes: MetadataRoute.Sitemap = Array.from(uniqueSites.values()).flatMap((site) => {
        const citySlug = slugify(site.city).toLowerCase();
        return [
            {
                url: `${BASE_URL}/ville/${citySlug}/copropriete`,
                lastModified: CITY_LAST_MOD,
                changeFrequency: 'weekly' as const,
                priority: 0.95,
            },
            {
                url: `${BASE_URL}/ville/${citySlug}/entreprise`,
                lastModified: CITY_LAST_MOD,
                changeFrequency: 'weekly' as const,
                priority: 0.95,
            },
        ];
    });

    // 8. Priority City x Brand Matrix (Top 12 cities x Top 3 vehicle brands = 36 URLs)
    const priorityBrands = brandList.filter((b) => PRIORITY_CITY_BRAND_SLUGS.has(b.slug));
    const cityBrandRoutes: MetadataRoute.Sitemap = Array.from(uniqueSites.values())
        .filter((site) => PRIORITY_CITY_BRAND_CITIES.has(slugify(site.city).toLowerCase()))
        .flatMap((site) => {
            const citySlug = slugify(site.city).toLowerCase();
            return priorityBrands.map((brand) => ({
                url: `${BASE_URL}/ville/${citySlug}/${brand.slug}`,
                lastModified: CITY_LAST_MOD,
                changeFrequency: 'weekly' as const,
                priority: 0.85,
            }));
        });

    // 8b. Installation Brand Routes
    const installationRoutes: MetadataRoute.Sitemap = brandList.map((brand) => ({
        url: `${BASE_URL}/installation/${brand.slug}`,
        lastModified: VEHICLE_LAST_MOD,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 6b. Département Routes
    const departementRoutes: MetadataRoute.Sitemap = Object.values(DEPARTMENTS).map((dept) => ({
        url: `${BASE_URL}/departement/${dept.slug}`,
        lastModified: CITY_LAST_MOD,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 10. Opérateurs nationaux
    const operateurRoutes: MetadataRoute.Sitemap = OPERATORS.map((op) => ({
        url: `${BASE_URL}/operateurs/${op.slug}`,
        lastModified: new Date(op.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // 11. Bornes & Matériels (Hardware)
    const hardwareRoutes: MetadataRoute.Sitemap = HARDWARE_PRODUCTS.map((prod) => ({
        url: `${BASE_URL}/marques/${prod.slug}`,
        lastModified: new Date(prod.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    // 12. Duels & Comparatifs directs
    const duelRoutes: MetadataRoute.Sitemap = DUELS.map((duel) => ({
        url: `${BASE_URL}/comparatif/${duel.slug}`,
        lastModified: new Date(duel.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    const allRoutes: MetadataRoute.Sitemap = [
        ...routes,
        ...serviceRoutes,
        ...guideRoutes,
        ...blogRoutes,
        ...vehicleBrandRoutes,
        ...vehicleRoutes,
        ...installationRoutes,
        ...cityRoutes,
        ...b2bRoutes,
        ...cityBrandRoutes,
        ...departementRoutes,
        ...operateurRoutes,
        ...hardwareRoutes,
        ...duelRoutes,
    ];

    // Deduplicate by normalized lowercase URL to avoid GSC duplicate-in-sitemap warnings
    const seenUrls = new Set<string>();
    const uniqueRoutes: MetadataRoute.Sitemap = [];
    for (const item of allRoutes) {
        const lowerUrl = item.url.toLowerCase();
        if (!seenUrls.has(lowerUrl)) {
            seenUrls.add(lowerUrl);
            uniqueRoutes.push({
                ...item,
                url: lowerUrl,
            });
        }
    }

    return uniqueRoutes;
}
