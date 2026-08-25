import Script from "next/script";

export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Expert Borne Recharge",
        "legalName": "Expert Borne Recharge SAS",
        "alternateName": ["ExpertBorneRecharge", "Expert Borne Recharge Official"],
        "url": "https://expertbornerecharge.fr",
        "logo": "https://expertbornerecharge.fr/icon.png",
        "image": "https://expertbornerecharge.fr/icon.png",
        "description": "N°1 de l'installation de bornes de recharge certifiées IRVE pour maisons, copropriétés et flottes d'entreprise en France. Subventions Advenir & Crédit d'impôt.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "8 Rue de la Paix",
            "addressLocality": "Paris",
            "postalCode": "75002",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 84 80 00 00",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "fr-FR"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Installation de Bornes de Recharge IRVE",
        "serviceType": "Installation de Bornes de Recharge IRVE",
        "provider": {
            "@type": "Organization",
            "name": "Expert Borne Recharge",
            "url": "https://expertbornerecharge.fr"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        },
        "description": "N°1 de l'installation de bornes de recharge certifiées IRVE pour maisons, copropriétés et flottes d'entreprise en France. Subventions Advenir & Crédit d'impôt.",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": "690",
            "availability": "https://schema.org/InStock",
            "validFrom": "2026-01-01",
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
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://expertbornerecharge.fr",
        "name": "Expert Borne Recharge",
        "alternateName": "expertbornerecharge.fr",
        "description": "N°1 de l'installation de bornes de recharge certifiées IRVE pour maisons, copropriétés et flottes d'entreprise en France. Subventions Advenir & Crédit d'impôt.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@type": "Organization",
            "name": "Expert Borne Recharge"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Comment obtenir un devis gratuit pour Expert Borne Recharge ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Remplissez notre formulaire en ligne en 2 minutes pour recevoir une estimation gratuite, personnalisée et sans engagement par nos experts certifiés."
                }
            },
            {
                "@type": "Question",
                "name": "Quelles sont les garanties fournies par Expert Borne Recharge ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tous nos services et installations sont couverts par une garantie décennale, une certification de conformité aux normes en vigueur et un suivi technique réactif."
                }
            }
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://expertbornerecharge.fr"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Installation de Bornes de Recharge IRVE",
                "item": "https://expertbornerecharge.fr/#simulateur"
            }
        ]
    };

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Borne de Recharge IRVE 7kW / 22kW",
        "image": [
            "https://expertbornerecharge.com/icon.png"
        ],
        "description": "Installation et fourniture de borne de recharge électrique IRVE pour voiture électrique et hybride rechargeable.",
        "sku": "EBR-BORNE-001",
        "mpn": "EBR-BORNE-001",
        "brand": {
            "@type": "Brand",
            "name": "Expert Borne Recharge"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://expertbornerecharge.com/simulateur",
            "priceCurrency": "EUR",
            "price": "690",
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
        
    };

    return (
        <>
            <Script
                id="org-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <Script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    );
}
