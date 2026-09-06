import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/login', '/api/private/', '/llms.txt', '/openapi.json'],
            },
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Applebot', 'Bytespider', 'Amazonbot', 'Meta-ExternalAgent', 'FacebookExternalHit', 'OAI-SearchBot', 'CCBot', 'Bingbot', 'Anthropic-ai', 'Claude-Web'],
                allow: '/',
            }
        ],
        sitemap: 'https://expertbornerecharge.com/sitemap.xml',
    };
}
