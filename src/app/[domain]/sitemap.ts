import { MetadataRoute } from "next";
import { SITES } from "@/lib/sites-config";
import { slugify } from "@/lib/slugify";

type Props = {
    params: Promise<{ domain: string }>;
}

export default async function sitemap(props?: Props): Promise<MetadataRoute.Sitemap> {
    const resolved = props?.params ? await props.params : null;
    const domain = resolved?.domain;

    if (!domain) return [];

    // Get config for this domain
    const config = SITES[domain] || SITES[`www.${domain}`];
    if (!config) return [];

    const baseUrl = `https://${config.domain}`;

    // 1. Core Pages
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/mentions-legales`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cgv`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        }
    ];

    // 2. Local Quarters / Neighborhoods (SEO Long Tail)
    if (config.quartiers && config.quartiers.length > 0) {
        config.quartiers.forEach(q => {
            routes.push({
                url: `${baseUrl}/quartier/${slugify(q)}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        });
    }

    // 3. Solutions (Filtered by site target)
    const solutions = ['copropriete', 'maison', 'entreprise'];
    solutions.forEach(s => {
        routes.push({
            url: `${baseUrl}/solutions/${s}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    });

    return routes;
}
