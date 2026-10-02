import type { Metadata } from 'next';
import { ogImageUrl } from '@/lib/seo-meta';

const syndicOgImage = ogImageUrl({
    q: "Lettre Syndic Droit Prise",
    sub: "Générateur gratuit de notification officielle pour copropriété",
    badge: "OUTIL JURIDIQUE GRATUIT 2026",
});

export const metadata: Metadata = {
    title: "Générateur Gratuit de Lettre Droit à la Prise Syndic | Modèle Conforme",
    description: "Générez gratuitement votre lettre recommandée de notification de droit à la prise au syndic de copropriété conforme au décret 2020-1720.",
    alternates: {
        canonical: "https://expertbornerecharge.com/outils/generateur-lettre-syndic",
    },
    openGraph: {
        title: "Générateur de Lettre Droit à la Prise au Syndic | Modèle Conforme 2026",
        description: "Générez gratuitement en 2 minutes votre courrier recommandé conforme au décret droit à la prise pour faire installer votre borne en copropriété.",
        url: "https://expertbornerecharge.com/outils/generateur-lettre-syndic",
        siteName: "Expert Borne Recharge",
        locale: "fr_FR",
        type: "website",
        images: [{ url: syndicOgImage, width: 1200, height: 630, alt: "Générateur lettre syndic droit à la prise" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Générateur de Lettre Droit à la Prise au Syndic | Modèle Conforme 2026",
        description: "Modèle gratuit conforme au décret droit à la prise pour copropriété.",
        images: [syndicOgImage],
    },
    robots: { index: true, follow: true },
};

export default function SyndicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
