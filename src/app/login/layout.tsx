import type { Metadata } from "next";

/**
 * La page /login est un composant client, donc sans metadata propre : elle
 * héritait du « index, follow » du layout racine et pouvait se retrouver dans
 * les résultats de recherche. On la ferme ici, pour le hub comme pour les
 * domaines satellites qui la servent.
 */
export const metadata: Metadata = {
    title: "Connexion administrateur",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
