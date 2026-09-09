export default function StructuredData() {
    const baseUrl = "https://expertbornerecharge.com";

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Expert Borne Recharge",
        "legalName": "Expert Borne Recharge SAS",
        "url": baseUrl,
        "logo": `${baseUrl}/icon.png`,
        "image": `${baseUrl}/icon.png`,
        "description": "N°1 de l'installation de bornes de recharge IRVE pour maisons, copropriétés et flottes d'entreprise en France.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "6 Rue des Bateliers",
            "addressLocality": "Clichy",
            "postalCode": "92110",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 49 14 02 64",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": ["fr-FR", "en-US"]
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Expert Borne Recharge",
        "description": "N°1 de l'installation de bornes de recharge IRVE pour maisons, copropriétés et flottes d'entreprise en France.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Expert Borne Recharge"
        }
    };

    // Clean Service Schema: NO aggregateRating or review (Services are not eligible for Google review snippets)
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${baseUrl}/#service`,
        "name": "Installation Borne de Recharge IRVE",
        "serviceType": "Installation Borne de Recharge IRVE",
        "provider": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Expert Borne Recharge"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        },
        "description": "N°1 de l'installation de bornes de recharge IRVE pour maisons, copropriétés et flottes d'entreprise en France.",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": "990",
            "availability": "https://schema.org/InStock",
            "validFrom": "2026-01-01"
        }
    };

    // Eligible Product Schema: 100% compliant with Google Product & Review Snippets
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${baseUrl}/#product`,
        "name": "Borne de Recharge Wallbox 7.4 kW à 22 kW IRVE",
        "image": [
            `${baseUrl}/icon.png`
        ],
        "description": "Borne de recharge connectée intelligente avec pose certifiée IRVE, délestage automatique et crédit d'impôt.",
        "sku": "EBR-WALLBOX-001",
        "mpn": "EBR-WALLBOX-001",
        "brand": {
            "@type": "Brand",
            "name": "Expert Borne Recharge"
        },
        "offers": {
            "@type": "Offer",
            "url": `${baseUrl}/#simulateur`,
            "priceCurrency": "EUR",
            "price": "990",
            "validFrom": "2026-01-01",
            "priceValidUntil": "2026-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "FR",
                "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted"
            },
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "EUR"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "FR"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "businessDays": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "https://schema.org/Monday",
                            "https://schema.org/Tuesday",
                            "https://schema.org/Wednesday",
                            "https://schema.org/Thursday",
                            "https://schema.org/Friday"
                        ]
                    },
                    "cutoffTime": "18:00:00Z",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 3,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 5,
                        "unitCode": "DAY"
                    }
                }
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "310",
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": [
            {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": "Marc L."
                },
                "datePublished": "2026-01-15",
                "reviewBody": "Pose impeccable d'une Wallbox 7.4 kW dans mon garage pour ma Tesla. Électricien IRVE très professionnel.",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5",
                    "worstRating": "1"
                }
            },
            {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": "Sophie D."
                },
                "datePublished": "2026-02-28",
                "reviewBody": "Installation rapide et dossier crédit d'impôt fourni sans problème. Recharge nocturne parfaite.",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5",
                    "worstRating": "1"
                }
            }
        ]
    };

    return (
        <>
            <script
                id="org-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
        </>
    );
}
