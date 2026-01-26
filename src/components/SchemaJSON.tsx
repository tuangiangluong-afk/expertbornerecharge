import { SiteConfig } from "@/lib/sites-config";
import { Vehicle } from "@/data/vehicles";

interface SchemaJSONProps {
    type: "LocalBusiness" | "Product";
    site?: SiteConfig;
    vehicle?: Vehicle;
}

export default function SchemaJSON({ type, site, vehicle }: SchemaJSONProps) {
    let schema = {};

    if (type === "LocalBusiness" && site) {
        schema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness", // or Electrician
            "name": site.name,
            "image": site.heroImage,
            "@id": `https://${site.domain}`,
            "url": `https://${site.domain}`,
            "telephone": site.phoneNumber,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "N/A", // Virtual address for now
                "addressLocality": site.city,
                "postalCode": site.postalCode,
                "addressCountry": "FR"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 48.8566, // Placeholder, ideally dynamic
                "longitude": 2.3522
            },
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
