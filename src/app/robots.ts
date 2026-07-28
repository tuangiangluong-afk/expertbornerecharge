import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/login', '/api/', '/demo/', '/_next/static/', '/favicon.ico', '/llms.txt', '/openapi.json', '/*.json', '/*.txt'],
        },
        sitemap: 'https://expertbornerecharge.com/sitemap.xml',
    };
}
