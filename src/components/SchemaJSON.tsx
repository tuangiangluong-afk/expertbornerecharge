import { SiteConfig } from "@/lib/sites-config";
import { CityConfig } from "@/lib/db";
import { Vehicle } from "@/data/vehicles";
import { BrandData } from "@/data/brands";

interface SchemaJSONProps {
    type: "LocalBusiness" | "Product" | "Service";
    site?: SiteConfig | CityConfig;
    vehicle?: Vehicle;
    brand?: BrandData;
}

import { slugify } from "@/lib/slugify";

export default function SchemaJSON({ type, site, vehicle, brand }: SchemaJSONProps) {
    let schema = {};

    if (type === "LocalBusiness" && site) {
        // CLEAN URL LOGIC:
        // Use /ville/[slug] for local sites, and https://expertbornerecharge.com for Hub
        const baseUrl = "https://expertbornerecharge.com";
        const canonicalUrl = site.slug === 'home' || site.slug === 'expertbornerecharge.com'
            ? baseUrl
            : `${baseUrl}/ville/${slugify(site.city)}`;

        // Use REAL geo coordinates from the config (via national-targets.ts)
        const geoData = (site as any).geo || null;
        const lat = geoData?.lat || null;
        const lng = geoData?.lng || null;

        schema = {
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "Electrician"],
            "name": site.name,
            "image": site.heroImage,
            "@id": canonicalUrl,
            "url": canonicalUrl,
            "telephone": site.phoneNumber,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": site.city,
                "postalCode": site.postalCode,
                "addressRegion": site.department || undefined,
                "addressCountry": "FR"
            },
            ...(lat && lng ? {
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": lat,
                    "longitude": lng
                }
            } : {}),
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ],
                "opens": "08:00",
                "closes": "20:00"
            },
            "priceRange": "€€€",
            "areaServed": {
                "@type": "City",
                "name": site.city
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127"
            }
        };
    } else if (type === "Service" && site && brand) {
        // Schema Service pour les pages Ville x Marque
        const baseUrl = "https://expertbornerecharge.com";
        const canonicalUrl = `${baseUrl}/ville/${slugify(site.city)}/${brand.slug}`;

        const geoData = (site as any).geo || null;

        schema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": `Installation Borne de Recharge ${brand.name}`,
            "name": `Installation Borne ${brand.name} à ${site.city}`,
            "description": `Installation de borne de recharge certifiée IRVE pour véhicules ${brand.name} (${brand.models.join(', ')}) à ${site.city}. Devis gratuit.`,
            "url": canonicalUrl,
            "provider": {
                "@type": ["LocalBusiness", "Electrician"],
                "name": site.name || "Expert Borne Recharge",
                "telephone": site.phoneNumber,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": site.city,
                    "postalCode": site.postalCode,
                    "addressCountry": "FR"
                },
                ...(geoData ? {
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": geoData.lat,
                        "longitude": geoData.lng
                    }
                } : {})
            },
            "areaServed": {
                "@type": "City",
                "name": site.city
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": `Bornes compatibles ${brand.name}`,
                "itemListElement": brand.models.map(model => ({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": `Installation Borne pour ${brand.name} ${model}`,
                        "brand": { "@type": "Brand", "name": brand.name }
                    }
                }))
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127"
            }
        };
    } else if (type === "Product" && vehicle) {
        schema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `Installation Borne de Recharge ${vehicle.brand} ${vehicle.model}`,
            "image": vehicle.image,
            "description": `Installation de borne de recharge à domicile pour ${vehicle.brand} ${vehicle.model}. Installateurs certifiés IRVE.`,
            "brand": {
                "@type": "Brand",
                "name": vehicle.brand
            },
            "offers": {
                "@type": "Offer",
                "url": "https://expertbornerecharge.com/simulateur",
                "priceCurrency": "EUR",
                "price": "990.00", // Starting price
                "priceValidUntil": "2026-12-31",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
            }
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
