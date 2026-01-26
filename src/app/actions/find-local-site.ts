'use server';

import { getSatelliteSites } from "@/lib/sites-config";

export interface LocalMatch {
    found: boolean;
    domain?: string;
    city?: string;
    score: number; // For relevance sorting
}

/**
 * Searches for a local satellite site based on user input (Zip or City)
 */
export async function findLocalSite(query: string): Promise<LocalMatch> {
    const satellites = getSatelliteSites();
    const cleanQuery = query.toLowerCase().trim().replace(/\s+/g, '');

    if (cleanQuery.length < 2) {
        return { found: false, score: 0 };
    }

    let bestMatch: LocalMatch = { found: false, score: 0 };

    for (const site of satellites) {
        let score = 0;

        // 1. Exact Department or Zip Match
        if (site.postalCode === cleanQuery || site.department === cleanQuery) {
            score = 100;
        }
        // 2. Partial Zip Match (User types 75001 -> matches 75)
        else if (cleanQuery.startsWith(site.department) && cleanQuery.length >= 2) {
            score = 80;
        }
        // 3. City Name Match (Exact)
        else if (site.city.toLowerCase().replace(/\s+/g, '') === cleanQuery) {
            score = 90;
        }
        // 4. City Name Match (Partial/Contains)
        else if (site.city.toLowerCase().includes(cleanQuery) || cleanQuery.includes(site.city.toLowerCase())) {
            score = 60;
        }
        // 5. Quartiers Match
        else if (site.quartiers.some(q => q.toLowerCase().includes(cleanQuery))) {
            score = 70;
        }

        if (score > bestMatch.score) {
            // Env-aware URL construction
            const isDev = process.env.NODE_ENV === 'development';
            // In dev, we use subdomains of localhost:3000? No, usually ports or just different hostnames mapped
            // For now, let's assume the component will handle the absolute URL logic, or we return the domain

            // Actually, in the project user has `bornerechargeparis.localhost:3000` set up.
            // Let's return the simplified domain for display and the full URL.

            // Assuming localhost mapping: bornerechargeparis.fr -> bornerechargeparis.localhost:3000
            // But slug is "bornerechargeparis"

            let url = `https://${site.domain}`;
            if (isDev) {
                // If the user setup follows standard Next.js multi-tenant on localhost
                // It's likely http://[slug].localhost:3000
                url = `http://${site.slug}.localhost:3000`;
            }

            // ADDING TRACKING: We add UTMs to know the lead comes from the Hub
            const trackingParams = new URLSearchParams({
                utm_source: 'expertbornerecharge',
                utm_medium: 'local_bridge',
                utm_campaign: 'hub_to_satellite',
                utm_content: cleanQuery // We track which Zip/City triggered the click
            });

            url = `${url}?${trackingParams.toString()}`;

            bestMatch = {
                found: true,
                domain: url,
                city: site.city,
                score
            };
        }
    }

    return bestMatch;
}
