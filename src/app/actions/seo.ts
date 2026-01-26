'use server';

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { generatePageContent, SeoExampleVariables } from "@/lib/pseo/generator";

export async function getPatterns(tenantId: string) {
    const supabase = await createSupabaseServerClient();

    // Fetch global patterns AND tenant-specific patterns
    const { data, error } = await (supabase
        .from('seo_patterns' as any)
        .select('*')
        .or(`tenant_id.is.null,tenant_id.eq.${tenantId}`)
        .order('created_at', { ascending: false }) as any);

    if (error) throw new Error(error.message);
    return data;
}

export async function createPattern(formData: any) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await (supabase
        .from('seo_patterns' as any)
        .insert(formData)
        .select()
        .single() as any);

    if (error) throw new Error(error.message);
    return data;
}

export async function deletePattern(id: string) {
    const supabase = await createSupabaseServerClient();
    const { error } = await (supabase.from('seo_patterns' as any).delete().eq('id', id) as any);
    if (error) throw new Error(error.message);
}

export async function getTenantPages(tenantId: string) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await (supabase
        .from('seo_landing_pages' as any)
        .select(`
            *,
            seo_patterns ( name )
        `)
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false }) as any);

    if (error) throw new Error(error.message);
    return data;
}

/**
 * The "War Machine" Function
 * Generates pages for a list of cities based on a pattern.
 */
export async function generatePagesBatch(
    tenantId: string,
    patternId: string,
    cities: string[] // List of city names e.g. ["Aix-en-Provence", "Marseille"]
) {
    const supabase = await createSupabaseServerClient();

    // 1. Get Tenant Info (for variables)
    const { data: tenant } = await supabase.from('tenants').select('*').eq('id', tenantId).single();
    if (!tenant) throw new Error("Tenant not found");

    // 2. Get Pattern
    const { data: pattern } = await (supabase.from('seo_patterns' as any).select('*').eq('id', patternId).single() as any);
    if (!pattern) throw new Error("Pattern not found");

    const results = {
        created: 0,
        skipped: 0,
        errors: 0
    };

    // 3. Loop and Generate
    for (const city of cities) {
        try {
            const variables: SeoExampleVariables = {
                city: city,
                tenant_name: tenant.name,
                phone: tenant.phone_number || "",
                service: "Taxi", // Default, could be parameterized later
                domain: tenant.domain
            };

            const pageData = generatePageContent(pattern, variables);
            const urlPath = `/${pageData.slug}`;

            // Check if exists
            const { data: existing } = await (supabase
                .from('seo_landing_pages' as any)
                .select('id')
                .eq('tenant_id', tenantId)
                .eq('slug', pageData.slug)
                .maybeSingle() as any);

            if (existing) {
                // Determine if we should update or skip. For now, skip to save resources.
                // Or maybe update content? Let's skip.
                results.skipped++;
                continue;
            }

            // Insert
            const { error: insertError } = await (supabase.from('seo_landing_pages' as any).insert({
                tenant_id: tenantId,
                pattern_id: patternId,
                slug: pageData.slug,
                url_path: urlPath,
                meta_title: pageData.meta_title,
                meta_description: pageData.meta_description,
                h1_title: pageData.h1_title,
                content_json: pageData.content_json,
                target_city: city,
                target_service: "Taxi",
                status: 'published'
            }) as any);

            if (insertError) {
                console.error(`Error creating page for ${city}:`, insertError);
                results.errors++;
            } else {
                results.created++;
            }

        } catch (e) {
            console.error(`Exception for ${city}:`, e);
            results.errors++;
        }
    }

    return results;
}

// ==========================================
// AI AGENT ACTIONS (Gemini Powered)
// ==========================================

import { findTopics } from "@/lib/ai/agents/TopicFinderAgent";
import { writeArticle } from "@/lib/ai/agents/ContentWriterAgent";

export async function findAITopics(keyword: string) {
    // No DB interaction needed for brainstorming, just AI call
    return await findTopics(keyword);
}

export async function generateAIArticle(tenantId: string, topic: string) {
    const supabase = await createSupabaseServerClient();

    // 1. Get Tenant Context
    const { data: tenant } = await supabase.from('tenants').select('*').eq('id', tenantId).single();
    if (!tenant) throw new Error("Tenant not found");

    // 2. Generate Content via Gemini Agent
    const context = `Le client est "${tenant.name}" (${tenant.domain}). Service: Installation Borne Recharge.`;
    const article = await writeArticle(topic, context);

    // 3. Save to DB (as a published page)
    const { data, error } = await (supabase.from('seo_landing_pages' as any).insert({
        tenant_id: tenantId,
        slug: article.slug,
        url_path: `/guides/${article.slug}`, // Default to guides namespace
        h1_title: article.title,
        meta_title: article.title,
        meta_description: article.meta_description,
        content_json: [{ type: "markdown", content: article.content_mdx }], // Simple MDX block
        status: 'published',
        target_service: 'Guide'
    }).select().single() as any);

    if (error) throw new Error(error.message);
    return data;
}
