import { MetadataRoute } from 'next';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { getCity } from "@/lib/db";
import { slugify } from "@/lib/slugify";

export default async function sitemap({
    params,
}: {
    params: Promise<{ domain: string }>
}): Promise<MetadataRoute.Sitemap> {
    const { domain } = await params;
    const supabase = await createSupabaseServerClient();
    const baseUrl = `https://${domain}`;

    // 1. Get Tenant ID (Supabase)
    const { data: tenant } = await supabase
        .from('tenants')
        .select('id, domain')
        .or(`domain.eq.${domain},id.eq.${domain}`)
        .maybeSingle();

    // 2. Hybrid Config (DB + Supabase)
    const cityConfig = getCity(domain);
    const tenantId = tenant?.id || cityConfig?.slug;

    if (!tenantId && !cityConfig) return [];

    // 3. Core Static Routes
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

    // 4. Dynamic "Maillage" Routes from Config (db.ts)
    const neighborhoodRoutes = (cityConfig?.neighborhoods || []).map((n) => ({
        url: `${baseUrl}/quartier/${slugify(n)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const pois = cityConfig?.points_of_interest ? [
        ...cityConfig.points_of_interest.hotels,
        ...cityConfig.points_of_interest.nightlife,
        ...cityConfig.points_of_interest.monuments,
    ] : [];

    const guideRoutes = pois.map((poi) => ({
        url: `${baseUrl}/guides/${slugify(poi)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // 5. Dynamic pSEO Routes from Database
    const { data: pages } = await (supabase
        .from('seo_landing_pages' as any)
        .select('slug, updated_at')
        .eq('tenant_id', tenantId)
        .eq('status', 'published')
        .limit(2000) as any);

    const pseoRoutes = (pages || []).map((page: any) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page.updated_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...neighborhoodRoutes, ...guideRoutes, ...pseoRoutes];
}
