
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function publishSync() {
    const SOLOCA_URL = process.env.SOLOCA_SUPABASE_URL!;
    const SOLOCA_KEY = process.env.SOLOCA_SERVICE_ROLE_KEY!;
    const SOLOCA_WORKSPACE_ID = process.env.SOLOCA_WORKSPACE_ID || '64502331-945e-4f34-90f4-7cb05a4963df';
    
    const LOCAL_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const LOCAL_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const solocaDb = createClient(SOLOCA_URL, SOLOCA_KEY);
    const localDb = createClient(LOCAL_URL, LOCAL_KEY);

    console.log('🚀 Starting Publication Sync...');

    const { data: articles, error: fetchError } = await solocaDb
        .from('authority_articles')
        .select('*')
        .eq('status', 'completed')
        .eq('workspace_id', SOLOCA_WORKSPACE_ID);

    if (fetchError) throw fetchError;
    if (!articles || articles.length === 0) {
        console.log('No articles to sync.');
        return;
    }

    for (const article of articles) {
        console.log(`Checking article: ${article.title}`);
        
        const { data: existing } = await localDb
            .from('blog_posts')
            .select('id')
            .eq('soloca_article_id', article.id)
            .maybeSingle();

        if (existing) {
            console.log('⏩ Already synced.');
            continue;
        }

        const slug = article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        const { data: newPost, error: insertError } = await localDb
            .from('blog_posts')
            .insert({
                title: article.title,
                slug: slug,
                excerpt: article.meta_description,
                content: article.markdown_content,
                featured_image_url: article.featured_image || null,
                status: 'published',
                published_at: new Date().toISOString(),
                seo_title: article.meta_title,
                seo_description: article.meta_description,
                soloca_article_id: article.id,
                read_time_minutes: Math.min(8, Math.ceil((article.word_count || 1000) / 250)),
                faq: article.faq_section ? JSON.parse(article.faq_section) : null
            })
            .select()
            .single();

        if (insertError) {
            console.error('❌ Insert error:', insertError);
            continue;
        }

        console.log(`✅ Published: ${newPost.title} at /blog/${slug}`);

        // Update live_url in Soloca
        const liveUrl = `https://expertbornerecharge.com/blog/${slug}`;
        await solocaDb
            .from('authority_articles')
            .update({ live_url: liveUrl })
            .eq('id', article.id);
        
        console.log(`🔗 Link back to Soloca: ${liveUrl}`);
    }
}

publishSync();
