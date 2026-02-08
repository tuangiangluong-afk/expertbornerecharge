
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

// Helper: Securely get config or throw detailed error
function getEnvOrThrow(key: string) {
    const val = Deno.env.get(key);
    if (!val) throw new Error(`Configuration Error: Missing Environment Variable '${key}'`);
    return val;
}

// Helper: Call LLM (Gemini via OpenAI Interface)
async function callLLM(messages: any[], modelName: string = "gemini-1.5-pro", apiEndpoint?: string, apiKey?: string) {
    let baseURL = `https://generativelanguage.googleapis.com/v1beta/openai/`;

    if (apiEndpoint) {
        if (apiEndpoint.includes('generativelanguage.googleapis.com')) {
            baseURL = "https://generativelanguage.googleapis.com/v1beta/openai/";
        } else {
            baseURL = apiEndpoint.endsWith('/') ? apiEndpoint : `${apiEndpoint}/`;
        }
    }

    const url = `${baseURL}chat/completions`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: modelName,
            messages: messages,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Gemini LLM API Error (${response.status}): ${err}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// Helper: Google Custom Search
async function googleCustomSearch(query: string, apiKey: string, cx: string) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&gl=fr&hl=fr&dateRestrict=d7`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) throw new Error(`Google Search API Error: ${data.error.message}`);
    return data.items || [];
}

serve(async (req) => {
    // 1. Handle CORS Preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        console.log("Function invoked with method:", req.method);

        // 2. Load Config
        const SUPABASE_URL = getEnvOrThrow("SUPABASE_URL");
        const SUPABASE_SERVICE_ROLE_KEY = getEnvOrThrow("SUPABASE_SERVICE_ROLE_KEY");
        const GOOGLE_API_KEY = getEnvOrThrow("GOOGLE_API_KEY");
        const GOOGLE_SEARCH_API_KEY = getEnvOrThrow("GOOGLE_SEARCH_API_KEY");
        const GOOGLE_SEARCH_CX = getEnvOrThrow("GOOGLE_SEARCH_CX");

        // 3. Init Supabase
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        // 4. Parse Request
        const { action, payload } = await req.json();
        console.log("Action requested:", action);

        // Sub-Functions
        const getAgentConfig = async (handler: string) => {
            const { data, error } = await supabase
                .from('ai_agents')
                .select('*')
                .eq('handler', handler)
                .single();

            if (error || !data) {
                console.warn(`Agent ${handler} not found.`);
                throw new Error(`Agent ${handler} not found in DB.`);
            }
            return data;
        };

        let result;

        switch (action) {
            case "fetch_trends": {
                const agent = await getAgentConfig('trend_hunter');
                // Ask AI for queries
                const messages = [
                    { role: "system", content: agent.system_prompt },
                    { role: "user", content: `Generate 5 Google Search queries for latest viral trends in Electric Vehicle Charging, Installers, and Green Energy in France. Output JSON array of strings.` }
                ];

                const resultText = await callLLM(messages, agent.model_name, agent.api_endpoint, GOOGLE_API_KEY);
                let queries = ["Borne de recharge avis", "Installation IRVE prix"];
                try {
                    const clean = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
                    const parsed = JSON.parse(clean);
                    if (Array.isArray(parsed)) queries = parsed;
                } catch (e) { console.error("JSON parse error for trends:", e); }

                let count = 0;
                for (const q of queries) {
                    try {
                        const items = await googleCustomSearch(q, GOOGLE_SEARCH_API_KEY, GOOGLE_SEARCH_CX);
                        for (const item of items) {
                            const { error: insErr } = await supabase.from("blog_trends").insert({
                                query: q,
                                source: item.displayLink || "Google",
                                title: item.title,
                                url: item.link,
                                snippet: item.snippet,
                                published_date: new Date().toISOString()
                            }).select().single();
                            if (!insErr) count++;
                        }
                    } catch (e) { console.error("Search failed for", q, e); }
                }
                result = { newTrendsCount: count, queriesUsed: queries };
                break;
            }
            case "generate_ideas": {
                const agent = await getAgentConfig('blog_idea_generator');

                // 1. Fetch Context: Trends
                const { data: trends } = await supabase.from("blog_trends").select("*").eq("is_processed", false).limit(5);

                // 2. Fetch Context: Categories
                const { data: cats } = await supabase.from("blog_categories").select("id, name");

                // 3. Fetch Context: EXISTING CONTENT
                const { data: existingPosts } = await supabase
                    .from("blog_posts")
                    .select("title")
                    .order("created_at", { ascending: false })
                    .limit(20);

                const trendContext = trends?.map(t => `- ${t.title}`).join("\n") || "No specific trends.";
                const catContext = cats?.map(c => `${c.name} (${c.id})`).join("\n");
                const existingContext = existingPosts?.map(p => `- ${p.title}`).join("\n") || "No existing articles.";

                // 4. Construct Smart Prompt
                const messages = [
                    { role: "system", content: agent.system_prompt },
                    {
                        role: "user",
                        content: `
                        CONTEXT:
                        
                        [TRENDS - What is hot]
                        ${trendContext}

                        [EXISTING CONTENT - DO NOT REPEAT THESE]
                        ${existingContext}

                        [CATEGORIES]
                        ${catContext}

                        TASK:
                        Generate 5 NEW, COMPLEMENTARY blog post ideas that don't exist yet.
                        `
                    }
                ];

                const resultText = await callLLM(messages, agent.model_name, agent.api_endpoint, GOOGLE_API_KEY);
                const clean = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
                const json = JSON.parse(clean);
                result = Array.isArray(json) ? json : (json.ideas || []);
                break;
            }
            case "write_article": {
                const topic = payload;
                const agent = await getAgentConfig('blog_writer');

                // 1. Fetch "Deep Linking" Context (SEO Optimization from Kreno)
                const { data: landingPages } = await supabase
                    .from('seo_landing_pages')
                    .select('slug, city, sport, h1_title') 
                    .eq('status', 'published')
                    .limit(100);

                const { data: existingPosts } = await supabase
                    .from('blog_posts')
                    .select('title, slug')
                    .eq('status', 'published')
                    .limit(50);

                const linkingContext = `
                CORE WEBSITE PAGES (You MUST link to these if relevant keywords appear):
                ${landingPages?.map(p => `- Keyword: "${p.h1_title}" or "${p.sport} ${p.city}" -> URL: /installation-borne-${p.city.toLowerCase()}`).join('\n') || "No landing pages."}
                
                EXISTING BLOG POSTS (Link to these for internal authority):
                ${existingPosts?.map(p => `- Title: "${p.title}" -> URL: /blog/${p.slug}`).join('\n') || "No blog posts."}
                
                RULE: When you write the article, if you mention any of the above locations or topics, INSERT A HYPERLINK <a href="...">...</a> naturally.
                `;

                const messages = [
                    { role: "system", content: agent.system_prompt + "\n\n" + linkingContext },
                    { role: "user", content: `Topic: "${topic.title}". Angle: "${topic.angle}". Rationale: "${topic.rationale}". Write the full article in HTML.` }
                ];
                const resultText = await callLLM(messages, agent.model_name, agent.api_endpoint, GOOGLE_API_KEY);
                const clean = resultText.replace(/```json/g, "").replace(/```/g, "").trim();

                try {
                    result = JSON.parse(clean);
                } catch (e) {
                    result = {
                        content: clean,
                        excerpt: `Article sur ${topic.title}`,
                        seo_title: topic.title,
                        seo_description: `Tout savoir sur ${topic.title}`,
                        faq: []
                    };
                }
                break;
            }

            default:
                throw new Error(`Unknown action: ${action}`);
        }

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error: any) {
        console.error("Critical Function Error:", error);
        return new Response(JSON.stringify({
            error: error.message,
            stack: error.stack
        }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
