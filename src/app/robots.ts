import { MetadataRoute } from 'next';

/**
 * Chemins privés interdits au crawl sur le hub.
 *
 * Ces pages répondent 200 et /login s'annonçait même « index, follow » :
 * sans Disallow, elles se retrouvaient dans l'index.
 */
const PRIVATE_PATHS = ['/admin/', '/login', '/api/private/'];

/**
 * Bots d'IA et moteurs secondaires.
 *
 * ATTENTION : en robots.txt, un groupe est exclusif (RFC 9309). Un agent
 * nommé ignore complètement les règles du groupe « * ». La version précédente
 * leur donnait un simple « Allow: / », ce qui annulait les interdictions des
 * chemins privés pour ces 16 agents, Bingbot compris. On leur redonne donc
 * les mêmes interdictions, en gardant /llms.txt et /openapi.json lisibles :
 * c'est précisément à eux que ces fichiers s'adressent.
 */
const BOT_USER_AGENTS = [
    'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended',
    'Applebot-Extended', 'Applebot', 'Bytespider', 'Amazonbot', 'Meta-ExternalAgent',
    'FacebookExternalHit', 'OAI-SearchBot', 'CCBot', 'Bingbot', 'Anthropic-ai', 'Claude-Web',
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // /llms.txt et /openapi.json ne sont pas des pages : on les
                // retire de l'index général sans les priver des agents d'IA.
                disallow: [...PRIVATE_PATHS, '/llms.txt', '/openapi.json'],
            },
            {
                userAgent: BOT_USER_AGENTS,
                allow: '/',
                disallow: PRIVATE_PATHS,
            }
        ],
        sitemap: 'https://expertbornerecharge.com/sitemap.xml',
    };
}
