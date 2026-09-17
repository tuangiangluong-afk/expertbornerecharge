import type { Metadata } from "next";

// Les pages /poi/* sont des pages de destination (campagnes, liens directs) :
// aucun lien interne ni sitemap ne pointe dessus et le contenu est un gabarit
// proche d'un POI à l'autre. On les sert, mais on ne les fait pas indexer.
export const metadata: Metadata = {
    robots: {
        index: false,
        follow: true,
        googleBot: {
            index: false,
            follow: true,
        },
    },
};

export default function PoiLayout({ children }: { children: React.ReactNode }) {
    return children;
}
