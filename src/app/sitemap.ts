import { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/mdx';
import { getAllVehicles } from '@/data/vehicles';
import { getHubConfig } from '@/lib/sites-config';
import { CITIES } from '@/lib/db';
import { slugify } from '@/lib/slugify';
import { SEO_SERVICES } from '@/lib/seo-data';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Base URL (Hub)
const BASE_URL = 'https://expertbornerecharge.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const guides = getAllGuides();
    const vehicles = getAllVehicles();

    // 1. Static Routes (with realistic priorities)
    const routes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/vehicules`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/guides`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/outils/generateur-lettre-syndic`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/fiscalite-entreprise-borne`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/solutions/copropriete`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/solutions/maison`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/solutions/entreprise`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Legal pages — low priority (thin content)
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
    const serviceRoutes: MetadataRoute.Sitemap = SEO_SERVICES.map((service) => ({
        url: `${BASE_URL}/service/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Guide Routes (static MDX)
    const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
        url: `${BASE_URL}/guides/${guide.slug}`,
        lastModified: new Date(guide.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 4. Blog Routes (dynamic from Supabase)
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
                    url: `${BASE_URL}/blog/${post.slug}`,
                    lastModified: new Date(post.updated_at || post.published_at),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }));
            }
        }
    } catch (e) {
        // Sitemap generation should never fail — fallback to empty blog routes
        console.warn('[Sitemap] Failed to fetch blog posts:', e);
    }

    // 5. Vehicle Routes
    const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
        url: `${BASE_URL}/vehicules/${vehicle.brand.toLowerCase()}/${vehicle.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 6. City Routes (From CITIES Config)
    const uniqueSites = new Map();
    Object.values(CITIES).forEach(site => {
        if (site.slug !== 'home' && site.slug !== 'expertbornerecharge.com') {
            uniqueSites.set(site.slug, site);
        }
    });

    const cityRoutes: MetadataRoute.Sitemap = Array.from(uniqueSites.values()).map((site) => ({
        url: `${BASE_URL}/ville/${slugify(site.city).toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 7. B2B PSEO Routes (Copro + Entreprise per city) — HIGH TICKET
    const b2bRoutes: MetadataRoute.Sitemap = Array.from(uniqueSites.values()).flatMap((site) => {
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

    // 8. Domination Longue Traîne: City x Brand (pSEO Matrix)
    // Uses brands.ts as the single source of truth (same as the page component)
    const { brands: brandList } = await import('@/data/brands');
    
    const cityBrandRoutes: MetadataRoute.Sitemap = Array.from(uniqueSites.values()).flatMap((site) => {
        const citySlug = slugify(site.city).toLowerCase();
        return brandList.map(brand => ({
            url: `${BASE_URL}/ville/${citySlug}/${brand.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        }));
    });

    // 9. SEO Bottom of Funnel Routes (Vertex AI generated)
    let marquesRoutes: MetadataRoute.Sitemap = [];
    let comparatifRoutes: MetadataRoute.Sitemap = [];
    let puissanceRoutes: MetadataRoute.Sitemap = [];
    let prisesRoutes: MetadataRoute.Sitemap = [];
    
    try {
        const marquesData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'marques.json'), 'utf-8'));
        marquesRoutes = marquesData.map((d: any) => ({ url: `${BASE_URL}/marques/${d.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 }));
        
        const comparatifsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'comparatifs.json'), 'utf-8'));
        comparatifRoutes = comparatifsData.map((d: any) => ({ url: `${BASE_URL}/comparatif/${d.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 }));
        
        const puissancesData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'puissances.json'), 'utf-8'));
        puissanceRoutes = puissancesData.map((d: any) => ({ url: `${BASE_URL}/puissance/${d.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 }));
        
        const prisesData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'prises.json'), 'utf-8'));
        prisesRoutes = prisesData.map((d: any) => ({ url: `${BASE_URL}/prises/${d.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 }));
    } catch (e) {
        console.warn('[Sitemap] Failed to load local JSON files for SEO clusters', e);
    }

    return [...routes, ...serviceRoutes, ...guideRoutes, ...blogRoutes, ...vehicleRoutes, ...cityRoutes, ...b2bRoutes, ...cityBrandRoutes, ...marquesRoutes, ...comparatifRoutes, ...puissanceRoutes, ...prisesRoutes].map(item => ({
        ...item,
        url: item.url.toLowerCase()
    }));
}
