import { CityConfig } from "@/lib/db";

interface LocalFAQProps {
    site: CityConfig;
    segment: "B2C" | "COPRO" | "ENTREPRISE";
}

export function LocalFAQ({ site, segment }: LocalFAQProps) {
    const city = site.city;
    const faqs = getLocalFAQData(city, site.department, segment);

    return (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Questions fréquentes à {city}
                    </h2>
                    <p className="text-slate-600 mt-3 text-lg">
                        Tout savoir sur l&apos;installation de bornes de recharge dans votre ville.
                    </p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <details 
                            key={idx} 
                            className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
                            {...(idx === 0 ? { open: true } : {})}
                        >
                            <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-slate-900 hover:bg-slate-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                                <span>{faq.question}</span>
                                <span className="ml-4 shrink-0 text-slate-400 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
                            </summary>
                            <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * Deterministic hash for a city name — produces a stable number 
 * without relying on parseInt of department codes (which breaks on "MC", "2A", "2B").
 */
function cityHash(city: string): number {
    let hash = 0;
    for (let i = 0; i < city.length; i++) {
        hash = ((hash << 5) - hash + city.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

// Exported for SchemaJSON to generate FAQPage structured data
export function getLocalFAQData(city: string, department: string | undefined, segment: "B2C" | "COPRO" | "ENTREPRISE") {
    const dept = department || "votre département";

    if (segment === "COPRO") {
        return [
            {
                question: `Combien coûte une infrastructure de recharge en copropriété à ${city} ?`,
                answer: `Le coût d'une infrastructure collective IRVE en copropriété à ${city} varie de 3 000€ à 15 000€ pour la colonne technique, selon la taille du parking. Grâce au programme ADVENIR, jusqu'à 50% des coûts sont pris en charge (plafonné à ~8 000€). Chaque point de charge individuel bénéficie d'une aide supplémentaire pouvant atteindre 960€. Notre étude de faisabilité est gratuite.`
            },
            {
                question: `Quelles démarches pour installer des bornes dans ma copropriété à ${city} ?`,
                answer: `La démarche se fait en 3 étapes : 1) Nous réalisons une visite technique gratuite de votre parking à ${city}. 2) Nous préparons le dossier technique complet pour votre syndic, prêt à présenter en AG. 3) Le vote se fait à la majorité simple (article 24). Le vote en assemblée générale suit les règles de majorité prévues par la loi du 10 juillet 1965.`
            },
            {
                question: `Puis-je installer une borne individuelle dans ma copropriété à ${city} sans l'accord du syndic ?`,
                answer: `Grâce au "Droit à la Prise" (décret 2020-1720), vous pouvez installer une borne sur votre place de parking sans vote en AG, à vos frais. Vous devez simplement notifier le syndic de votre copropriété à ${city} par lettre recommandée. Le syndic dispose de 3 mois pour s'opposer (motifs limités). Nous rédigeons la lettre de notification pour vous.`
            }
        ];
    } else if (segment === "ENTREPRISE") {
        return [
            {
                question: `Quelles obligations pour les entreprises en matière de bornes de recharge à ${city} ?`,
                answer: `La loi LOM et le décret tertiaire imposent un pré-équipement des parkings neufs ou rénovés. À ${city}, les entreprises de plus de 20 places doivent pré-câbler au minimum 20% des emplacements. Pour les flottes, la loi impose 10% de véhicules à faibles émissions lors du renouvellement. Ces obligations s'appliquent selon les seuils fixés par la loi, indépendamment de la taille de l'entreprise.`
            },
            {
                question: `Quelles aides ADVENIR sont disponibles pour les entreprises à ${city} ?`,
                answer: `Les entreprises à ${city} bénéficient de deux niveaux d'aide ADVENIR : jusqu'à 600€ par point de charge pour un parking privé (flotte), et jusqu'à 2 200€ par point de charge pour un parking ouvert au public. Ces aides sont cumulables avec l'amortissement accéléré sur 12 mois. Nous montons intégralement le dossier ADVENIR.`
            },
            {
                question: `Quels types de bornes pour une entreprise à ${city} ?`,
                answer: `Le choix dépend de l'usage : bornes AC 7-22 kW pour les collaborateurs qui stationnent la journée (recharge complète en 4-8h), bornes DC 50 kW+ pour les visiteurs ou véhicules logistiques (80% en 30 min). Nous installons aussi des systèmes de supervision avec contrôle d'accès par badge RFID et refacturation automatique.`
            }
        ];
    } else {
        return [
            {
                question: `Quel est le prix d'une installation de borne de recharge à ${city} ?`,
                answer: `L'installation d'une borne de recharge à domicile à ${city} coûte en moyenne entre 1 200€ et 2 500€ pose comprise, selon la puissance choisie (7 kW ou 22 kW) et la distance au tableau électrique. Après déduction du crédit d'impôt de 500€ et de la TVA réduite à 5,5%, le reste à charge moyen est d'environ 700€ à 1 800€.`
            },
            {
                question: `Combien de temps pour installer une borne de recharge à ${city} ?`,
                answer: `Nos installateurs certifiés IRVE à ${city} interviennent sous 48 à 72h après validation du devis. L'installation elle-même prend 2 à 4 heures pour une maison individuelle. Chaque intervention donne lieu à une attestation de conformité remise au propriétaire.`
            },
            {
                question: `Quelles aides pour installer une borne de recharge à ${city} ?`,
                answer: `À ${city}, vous bénéficiez du crédit d'impôt de 500€ (sans condition de revenus), de la TVA réduite à 5,5% sur la fourniture et l'installation, et potentiellement de la prime ADVENIR si vous êtes en copropriété (jusqu'à 960€). L'installation doit obligatoirement être réalisée par un électricien certifié IRVE pour y avoir droit.`
            }
        ];
    }
}
