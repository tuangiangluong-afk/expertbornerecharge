import { MetadataRoute } from 'next';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export default async function sitemap({
    params,
}: {
    params: Promise<{ domain: string }>
}): Promise<MetadataRoute.Sitemap> {
    const { domain } = await params;
    const supabase = await createSupabaseServerClient();
    const baseUrl = `https://${domain}`; // Assuming HTTPS

    // 1. Get Tenant ID
    const { data: tenant } = await supabase
        .from('tenants')
        .select('id, domain')
        .or(`domain.eq.${domain},id.eq.${domain}`)
        .single();

    if (!tenant) return [];

    // 2. Static Routes
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

    // 3. Dynamic pSEO Routes
    const { data: pages } = await (supabase
        .from('seo_landing_pages' as any)
        .select('slug, updated_at')
        .eq('tenant_id', tenant.id)
        .eq('status', 'published')
        .limit(5000) as any); // Google limit per sitemap is 50k, splitting if needed

    const pseoRoutes = (pages || []).map((page: any) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page.updated_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));


    return [...routes, ...pseoRoutes];
}
