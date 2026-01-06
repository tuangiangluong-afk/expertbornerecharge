import { CityConfig } from "@/lib/db";

export function StructuredData({ city }: { city: CityConfig }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": city.name,
        "image": `https://${city.domain}/images/hero.jpg`, // Fallback or dynamic if available
        "telephone": city.phoneNumber,
        "email": city.email,
        "url": `https://${city.domain}`,
        "priceRange": "€€",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city.city,
            "addressCountry": "FR"
        },
        "areaServed": [
            {
                "@type": "City",
                "name": city.city
            },
            {
                "@type": "City",
                "name": "Gare TGV"
            },
            {
                "@type": "City",
                "name": "Aéroport"
            }
        ],
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
            }
        ],
        "makesOffer": {
            "@type": "Offer",
            "name": `Transport vers Gare/Aéroport depuis ${city.city}`,
            "price": city.pricing.base.replace('€', ''),
            "priceCurrency": "EUR",
            "description": city.pricing.description
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
