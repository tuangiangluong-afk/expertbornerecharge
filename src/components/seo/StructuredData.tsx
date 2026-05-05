
import Script from "next/script";

export default function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Expert Borne Recharge",
        "url": "https://expertbornerecharge.com",
        "logo": "https://expertbornerecharge.com/logo.png",
        "description": "Installation de bornes de recharge électriques pour particuliers et professionnels. Réseau d'installateurs certifiés IRVE.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 00 00 00 00",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "French"
        }
    };

    return (
        <Script
            id="org-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
