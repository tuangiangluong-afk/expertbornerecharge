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
    };

    // Eligible Product Schema: 100% compliant with Google Product & Review Snippets
    // « Service » et non « Product » : ce site ne vend pas un produit catalogue,
    // il met en relation avec des professionnels. Un Product ici est un balisage
    // inexact (stock, SKU, livraison) que Google peut ignorer ou signaler.
    const serviceOfferSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${baseUrl}/#service-offer`,
        "name": "Borne de Recharge Wallbox 7.4 kW à 22 kW IRVE",
        "image": [
            `${baseUrl}/icon.png`
        ],
        "description": "Borne de recharge connectée intelligente avec pose certifiée IRVE, délestage automatique et crédit d'impôt.",
        "brand": {
            "@type": "Brand",
            "name": "Expert Borne Recharge"
        },
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
                id="service-offer-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceOfferSchema) }}
            />
        </>
    );
}
