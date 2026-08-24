import { SiteConfig } from "@/lib/sites-config";
import { CityConfig } from "@/lib/db";
import { Vehicle } from "@/data/vehicles";
import { BrandData } from "@/data/brands";

interface SchemaJSONProps {
    type: "LocalBusiness" | "Product" | "Service" | "B2BService" | "Organization" | "Breadcrumb" | "FAQPage";
    site?: SiteConfig | CityConfig;
    vehicle?: Vehicle;
    brand?: BrandData;
    breadcrumbItems?: { name: string; item: string }[];
    b2bType?: "Copropriété" | "Entreprise";
    faqSegment?: "B2C" | "COPRO" | "ENTREPRISE";
}

import { slugify } from "@/lib/slugify";
import { getLocalFAQData } from "@/components/LocalFAQ";

export default function SchemaJSON({ type, site, vehicle, brand, breadcrumbItems, b2bType, faqSegment }: SchemaJSONProps) {
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
                } : {}),
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "127"
                }
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
                        "@type": "Service",
                        "name": `Installation Borne pour ${brand.name} ${model}`,
                        "brand": { "@type": "Brand", "name": brand.name }
                    }
                }))
            }
        };
    } else if (type === "Product" && vehicle) {
        schema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `Installation Borne de Recharge ${vehicle.brand} ${vehicle.model}`,
            "image": [vehicle.image],
            "description": `Installation de borne de recharge à domicile pour ${vehicle.brand} ${vehicle.model}. Installateurs certifiés IRVE.`,
            "sku": `EBR-${slugify(vehicle.brand).toUpperCase()}-${slugify(vehicle.model).toUpperCase()}`,
            "mpn": `EBR-${slugify(vehicle.brand).toUpperCase()}-${slugify(vehicle.model).toUpperCase()}`,
            "brand": {
                "@type": "Brand",
                "name": vehicle.brand
            },
            "offers": {
                "@type": "Offer",
                "url": "https://expertbornerecharge.com/simulateur",
                "priceCurrency": "EUR",
                "price": "990.00",
                "validFrom": "2026-01-01",
                "priceValidUntil": "2026-12-31",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
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
                "reviewCount": "127"
            }
        };
    } else if (type === "B2BService" && site && b2bType) {
        const baseUrl = "https://expertbornerecharge.com";
        const targetSlug = b2bType === "Copropriété" ? "copropriete" : "entreprise";
        const canonicalUrl = `${baseUrl}/ville/${slugify(site.city)}/${targetSlug}`;

        schema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": `Installation Borne de Recharge ${b2bType}`,
            "name": `Installation Borne de Recharge pour ${b2bType} à ${site.city}`,
            "description": `Devis gratuit et installation de bornes de recharge pour ${b2bType} à ${site.city}. Conformité, aides ADVENIR, et Tiers-Investisseur.`,
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
                }
            },
            "areaServed": {
                "@type": "City",
                "name": site.city
            }
        };
    } else if (type === "Organization" && site) {
        schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Expert Borne Recharge",
            "url": "https://expertbornerecharge.com",
            "logo": "https://expertbornerecharge.com/logo.png",
            "sameAs": [
                "https://www.linkedin.com/company/expert-borne-recharge",
                "https://www.facebook.com/expertbornerecharge"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": site.phoneNumber || "01 89 70 21 00",
                "contactType": "customer service",
                "areaServed": "FR",
                "availableLanguage": "French"
            }
        };
    } else if (type === "Breadcrumb" && breadcrumbItems) {
        schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.item
            }))
        };
    } else if (type === "FAQPage" && site && faqSegment) {
        const faqs = getLocalFAQData(site.city, site.department, faqSegment);
        schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
