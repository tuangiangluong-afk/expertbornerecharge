import { CityConfig } from "@/lib/db";

export function StructuredData({ city }: { city: CityConfig }) {
    const services = [
        {
            "@type": "Service",
            "name": "Installation de borne de recharge à domicile",
            "description": "Étude électrique et installation de borne de recharge IRVE pour maison individuelle.",
            "serviceType": "ElectricVehicleChargingStationInstallation"
        },
        {
            "@type": "Service",
            "name": "Installation de borne en copropriété",
            "description": "Accompagnement de copropriétés pour l'installation de solutions de recharge des véhicules électriques.",
            "serviceType": "EVChargingStationInstallation"
        },
        {
            "@type": "Service",
            "name": "Installation de bornes pour entreprise",
            "description": "Déploiement de bornes de recharge IRVE pour flottes et parkings d'entreprise.",
            "serviceType": "CommercialEVChargingStationInstallation"
        }
    ];

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LocalBusiness",
                "additionalType": "https://schema.org/Electrician",
                "@id": `https://${city.domain}/#localbusiness`,
                "name": city.name,
                "image": city.heroImage.startsWith('http') ? city.heroImage : `https://${city.domain}${city.heroImage}`,
                "telephone": city.phoneNumber,
                "email": city.email,
                "url": `https://${city.domain}`,
                "priceRange": "€€",
                "paymentAccepted": ["Cash", "Credit Card", "Invoice"],
                "currenciesAccepted": "EUR",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": city.city,
                    "addressCountry": "FR"
                },
                "areaServed": [
                    { "@type": "City", "name": city.city },
                    ...(city.neighborhoods || []).map(n => ({ "@type": "City", "name": `${city.city} - ${n}` })),
                    { "@type": "AdministrativeArea", "name": "France" }
                ],
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "00:00",
                        "closes": "23:59"
                    }
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Services de Transport",
                    "itemListElement": services.map((service, index) => ({
                        "@type": "Offer",
                        "itemOffered": service,
                        "position": index + 1
                    }))
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": `https://${city.domain}/#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": `Installation de borne de recharge à ${city.city}`,
                        "item": `https://${city.domain}`
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "@id": `https://${city.domain}/#faq`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": `Combien coûte l'installation d'une borne à ${city.city} ?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Le prix d'une installation dépend de la puissance, du type de borne, de la longueur du câblage et de la configuration électrique. Un devis personnalisé est nécessaire pour confirmer le montant à ${city.city}.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Acceptez-vous la carte bancaire ?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Oui, tous nos chauffeurs acceptent la carte bancaire (Visa, Mastercard, Amex) ainsi que les espèces."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Comment demander un devis de borne à ${city.city} ?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Vous pouvez demander un devis via le formulaire du site ou par téléphone au ${city.phoneNumber}. L'étude précise la puissance disponible, l'emplacement et la solution de recharge adaptée.`
                        }
                    }
                ]
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
