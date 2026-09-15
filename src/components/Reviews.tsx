// Section d'avis clients désactivée.
//
// La version précédente affichait des avis attribués à des personnes fictives,
// un badge de note en dur et un nombre d'avis calculé par un hash du nom de
// ville. Rien de tout cela n'était vérifiable : c'est un faux avis au sens de
// l'article L.121-2 du Code de la consommation, et Google n'attribue aucun
// extrait d'avis à une note inventée.
//
// Réactivation : brancher de vrais avis (fiche Google Business Profile de
// l'entreprise, avis collectés avec accord du client) et rendre les cartes à
// partir de ces données.

interface ReviewsProps {
    // Conservés pour ne pas casser les appels existants.
    site?: unknown;
    themeColor?: string;
}

export default function Reviews(_props: ReviewsProps) {
    return null;
}
