import Script from "next/script";

export default function StructuredData() {
    const baseUrl = "https://expertbornerecharge.com";
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Expert Borne Recharge",
        "legalName": "Expert Borne Recharge SAS",
        "alternateName": ["Expert Borne", "Expert Borne Recharge Official"],
        "url": baseUrl,
        "logo": `${baseUrl}/icon.png`,
        "description": "N°1 de l'installation de bornes de recharge IRVE en France.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "6 Rue des Bateliers",
            "addressLocality": "Paris",
            "postalCode": "92110",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 49 14 02 64",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "fr-FR"
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
        "alternateName": "expertbornerecharge.com",
        "description": "N°1 de l'installation de bornes de recharge IRVE en France.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Expert Borne Recharge"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Expert Borne Recharge",
        "provider": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Expert Borne Recharge"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        },
        "description": "N°1 de l'installation de bornes de recharge IRVE en France.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "148",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    return (
        <>
            <Script
                id="org-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <Script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
        </>
    );
}
