import Script from "next/script";

export default function StructuredData() {
    const baseUrl = "https://expertbornerecharge.com";
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Expert Borne Recharge",
        "legalName": "Expert Borne Recharge SAS",
        "alternateName": ["ExpertBorneRecharge", "Expert Borne Recharge France"],
        "url": baseUrl,
        "logo": `${baseUrl}/icon.png`,
        "description": "Installation de bornes de recharge IRVE pour maisons, copropriétés et flottes d'entreprise en France.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "6 Rue des Bateliers",
            "addressLocality": "Clichy",
            "postalCode": "92110",
            "addressCountry": "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 48.9022,
            "longitude": 2.3060
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 49 14 02 64",
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
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Expert Borne Recharge",
        "alternateName": "expertbornerecharge.fr",
        "description": "Installation de bornes de recharge IRVE pour maisons, copropriétés et flottes d'entreprise en France.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@id": `${baseUrl}/#organization`,
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
