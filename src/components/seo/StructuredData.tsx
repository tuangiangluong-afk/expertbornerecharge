import Script from "next/script";

export default function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Expert Borne Recharge",
        "legalName": "Expert Borne Recharge SAS",
        "alternateName": ["ExpertBorneRecharge", "Expert Borne Recharge France"],
        "url": "https://expertbornerecharge.fr",
        "logo": "https://expertbornerecharge.fr/icon.png",
        "description": "N°1 de l'installation de bornes de recharge IRVE pour maisons, copropriétés et flottes d'entreprise en France.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "8 Rue de la Paix",
            "addressLocality": "Paris",
            "postalCode": "75002",
            "addressCountry": "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 48.8686,
            "longitude": 2.3314
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 84 80 00 00",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "French"
        },
        "areaServed": {
            "@type": "Country",
            "name": "France"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://expertbornerecharge.fr",
        "name": "Expert Borne Recharge",
        "alternateName": "expertbornerecharge.fr",
        "description": "N°1 de l'installation de bornes de recharge IRVE pour maisons, copropriétés et flottes d'entreprise en France.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@type": "Organization",
            "name": "Expert Borne Recharge"
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
        </>
    );
}
