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
            // Return raw data, let the client handle environment-specific URL construction
            // This prevents server-side mismatch with localhost ports/subdomains
            bestMatch = {
                found: true,
                domain: site.domain, // e.g. "bornerechargeparis.fr"
                city: site.city,
                score
            };
        }
    }

    return bestMatch;
}
