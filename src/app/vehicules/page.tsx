export const revalidate = 86400; // 24h ISR cache
import { getAllBrands, getAllVehicles } from "@/data/vehicles";
import { slugify } from "@/lib/slugify";
import { clampTitle, ogImageUrl } from "@/lib/seo-meta";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Link from "next/link";
import { ArrowLeft, Car, Zap } from "lucide-react";
import Logo from "@/components/Logo";
import Header from "@/components/Header";

import type { Metadata } from "next";

const vehiculesOgImage = ogImageUrl({
    q: "Compatibilité Véhicules",
    sub: "Borne idéale, puissance max et temps de charge par modèle",
    badge: "GUIDE VÉHICULES ÉLECTRIQUES 2026",
});

export const metadata: Metadata = {
    title: clampTitle("Quelle borne de recharge pour ma voiture électrique ?"),
    description: "Sélectionnez la marque de votre véhicule pour découvrir la borne de recharge idéale, la puissance maximale acceptée et le temps de charge à domicile.",
    alternates: {
        canonical: "https://expertbornerecharge.com/vehicules",
    },
    openGraph: {
        title: "Quelle borne de recharge pour ma voiture électrique ? | Guide 2026",
        description: "Sélectionnez la marque de votre véhicule pour découvrir la borne idéale, la puissance max et le temps de charge à domicile.",
        url: "https://expertbornerecharge.com/vehicules",
        siteName: "Expert Borne Recharge",
        locale: "fr_FR",
        type: "website",
        images: [{ url: vehiculesOgImage, width: 1200, height: 630, alt: "Compatibilité véhicules et bornes de recharge 2026" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Quelle borne de recharge pour ma voiture électrique ? | Guide 2026",
        description: "Borne idéale, puissance max et temps de charge par modèle.",
        images: [vehiculesOgImage],
    },
    robots: { index: true, follow: true },
};

export default function VehiclesIndexPage() {
    const brands = getAllBrands().sort();
    const vehicles = getAllVehicles();

    const breadcrumbs = [
        { name: "Accueil", href: "/" },
        { name: "Véhicules", href: "/vehicules" },
    ];

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://expertbornerecharge.com",
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Véhicules",
                "item": "https://expertbornerecharge.com/vehicules",
            },
        ],
    };

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Marques de véhicules électriques compatibles",
        "description": "Guide des bornes de recharge adaptées par constructeur automobile électrique.",
        "itemListElement": brands.map((b, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": b,
            "url": `https://expertbornerecharge.com/vehicules/${slugify(b)}`,
        })),
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Navbar */}
            <Header isHub={true} variant="default" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

            <main className="container mx-auto px-4 py-12 pt-32">
                <Breadcrumbs className="mb-10" items={breadcrumbs} />
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        Trouvez la borne pour <span className="text-blue-600">votre voiture</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Toutes les voitures ne chargent pas à la même vitesse. Choisissez votre modèle pour tout savoir.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {brands.map((brand) => {
                        const count = vehicles.filter(v => v.brand === brand).length;
                        return (
                            <Link
                                key={brand}
                                href={`/vehicules/${slugify(brand)}`}
                                className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                    <Car size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-1">{brand}</h2>
                                <p className="text-sm text-slate-500">{count} modèles référencés</p>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
