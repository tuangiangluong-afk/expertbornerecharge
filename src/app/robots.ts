import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/login', '/api/', '/demo/'],
        },
        sitemap: 'https://expertbornerecharge.com/sitemap.xml',
    };
}
