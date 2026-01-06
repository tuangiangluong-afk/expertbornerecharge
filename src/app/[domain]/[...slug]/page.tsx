import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { Metadata } from "next";

// Force dynamic rendering as these pages depend on DB content
export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ domain: string; slug: string[] }>;
}

// 1. Generate Metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { domain, slug } = await params;
    const slugPath = slug.join("/");
    const supabase = await createSupabaseServerClient();

    // Resolve Tenant ID from Domain (using middleware logic reverse-engineering)
    // The middleware rewrites [domain] to the hostname (e.g. taxiaix.fr)
    // BUT we need the tenant.id to query seo_landing_pages.

    // Step 1: Find Tenant by Domain
    const { data: tenant } = await supabase
        .from('tenants')
        .select('*')
        .or(`domain.eq.${domain},id.eq.${domain}`) // Handle both domain and ID match to be safe
        .single();

    if (!tenant) return {};

    // Step 2: Find Page
    const { data: page } = await supabase
        .from('seo_landing_pages')
        .select('meta_title, meta_description')
        .eq('tenant_id', tenant.id)
        .eq('slug', slugPath)
        .single();

    if (!page) return {};

    return {
        title: page.meta_title,
        description: page.meta_description,
    };
}

// 2. Render Page
export default async function CatchAllSeoPage({ params }: PageProps) {
    const { domain, slug } = await params;
    const slugPath = slug.join("/");
    const supabase = await createSupabaseServerClient();

    // 1. Resolve Tenant
    const { data: tenant } = await supabase
        .from('tenants')
        .select('*')
        .or(`domain.eq.${domain},id.eq.${domain}`)
        .single();

    if (!tenant) return notFound();

    // 2. Try to find SEO Landing Page
    const { data: page } = await supabase
        .from('seo_landing_pages')
        .select('*')
        .eq('tenant_id', tenant.id)
        .eq('slug', slugPath)
        .eq('status', 'published')
        .maybeSingle();

    // 3. If found, render the War Machine
    if (page) {
        return <SeoLandingPage page={page} tenant={tenant} />;
    }

    // 4. If NOT found, checking if it's a CMS page or standard route?
    // Since this is a catch-all [...slug], it overrides everything else in this folder if not careful.
    // However, explicit folders like 'gare-aeroport' take precedence in Next.js filesystem routing.
    // So this only catches undefined routes.

    return notFound();
}
