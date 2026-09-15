// Section de témoignages désactivée.
//
// Elle affichait une note « 4.9 » et plus de « 1 200 avis » par défaut, ainsi
// que des témoignages nominatifs inventés (texte souvent hérité d'une autre
// verticale). Aucun de ces chiffres n'était vérifiable.
//
// Réactivation : fournir de vrais témoignages clients (nom, ville, prestation,
// accord écrit) et un nombre d'avis sourcé.

interface TestimonialsSectionProps {
    // Conservés pour ne pas casser les appels existants.
    rating?: number;
    reviewCount?: number;
}

export default function TestimonialsSection(_props: TestimonialsSectionProps) {
    return null;
}
