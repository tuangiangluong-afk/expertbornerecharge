import type { CityConfig } from "@/lib/db";
import { composeLocalIntro } from "@/lib/pseo-local";

export interface PseoB2bContent {
    meta_title: string;
    meta_description: string;
    hero_title: string;
    hero_badge: string;
    intro_html: string;
    expert_tip: string;
}

/**
 * Gestionnaire de réseau de distribution : Enedis couvre la quasi-totalité des
 * communes françaises, à l'exception de quelques réseaux locaux (Strasbourg
 * avec Électricité de Strasbourg, par exemple).
 */
function gestionnaireReseau(city: string): string {
    if (city.toLowerCase() === "strasbourg") return "Électricité de Strasbourg (réseau local)";
    return "le gestionnaire de réseau de distribution";
}

function getEntrepriseIntro(city: string, dept: string, quartiers: string[]): string {
    // Intro assemblée à partir de six emplacements factuels (voir
    // pseo-local.ts) : l'ancienne version piochait 1 texte sur 3 par hash et
    // annonçait des aides locales inventées ainsi qu'une plus-value de 5 à 8 %
    // à la revente, non vérifiable.
    return composeLocalIntro(
        {
            city,
            deptCode: dept,
            quartiers,
            authority: gestionnaireReseau(city),
        },
        {
            audience: "Les entreprises, les flottes et les parkings professionnels",
            service: "l'audit, la fourniture et la maintenance des points de recharge",
            norms: "la norme NF C 15-100 et le référentiel IRVE",
            document: "l'attestation de conformité et le registre de supervision",
            authorityLabel: "l'organisme qui valide le raccordement",
            project: "votre projet d'électrification",
        },
        {
            openers: [
                (f) => `Vous exploitez un commerce, des bureaux ou un site industriel à ${f.city} : l'équipement en recharge des parkings répond à la loi LOM et à la demande des salariés.`,
                (f) => `Un parking de plus de 20 places à ${f.city} doit pré-équiper une partie de ses stationnements pour la recharge, selon le statut du bâtiment.`,
                (f) => `L'audit de recharge de vos locaux à ${f.city} commence par la puissance disponible au compteur et le trajet des câbles.`,
                (f) => `Les besoins de recharge d'une flotte à ${f.city} se dimensionnent sur les kilomètres parcourus et les plages d'immobilisation, pas sur le nombre de véhicules.`,
                (f) => `Sur un site professionnel à ${f.city}, la supervision et la facturation par utilisateur pèsent autant que la pose des bornes.`,
                (f) => `Un parking ouvert au public à ${f.city} doit aussi respecter les obligations d'accessibilité et de signalisation des places équipées.`,
            ],
            middles: [
                (_f, v) => `Notre intervention couvre ${v.service} : étude de puissance, choix des bornes, pose et mise en service.`,
                (f) => `Le dimensionnement réalisé à ${f.city} tient compte du nombre de véhicules à charger simultanément et des plages horaires réelles d'utilisation.`,
                (f, v) => `Chaque point de recharge posé à ${f.city} est déclaré, réglé et documenté : ${v.document} reste disponible pour l'exploitant.`,
                (f) => `La pose à ${f.city} inclut la protection différentielle adaptée, la mise à la terre et l'étiquetage du tableau électrique.`,
                (f) => `La gestion dynamique de charge évite à l'exploitant de ${f.city} de souscrire une puissance supplémentaire sans étude préalable.`,
                (f) => `L'audit distingue à ${f.city} les emplacements prioritaires de ceux qui peuvent être équipés dans un second temps.`,
            ],
        },
    );
}

function getCoproIntro(city: string, dept: string, quartiers: string[]): string {
    return composeLocalIntro(
        {
            city,
            deptCode: dept,
            quartiers,
            authority: gestionnaireReseau(city),
        },
        {
            audience: "Les copropriétés et leurs syndics",
            service: "l'audit, l'infrastructure collective et la maintenance des points de recharge",
            norms: "la norme NF C 15-100, le référentiel IRVE et le décret n° 2020-1720 relatif au droit à la prise",
            document: "le registre de l'infrastructure de recharge et les conventions d'usage",
            authorityLabel: "l'organisme qui valide le raccordement",
            project: "votre projet d'infrastructure collective",
        },
        {
            openers: [
                (f) => `Dans un immeuble à ${f.city}, le droit à la prise permet à un copropriétaire ou locataire d'installer une borne à son emplacement, à ses frais, sans accord préalable de l'assemblée générale.`,
                (f) => `Équiper le parking d'une copropriété de ${f.city} soulève deux questions distinctes : l'infrastructure collective et les bornes individuelles.`,
                (f) => `Avant l'assemblée générale, l'audit réalisé à ${f.city} chiffre le câblage des parties communes et distingue l'infrastructure des équipements individuels.`,
                (f) => `Une copropriété à ${f.city} peut faire financer l'infrastructure collective par un opérateur, chaque utilisateur payant ensuite sa propre borne.`,
                (f) => `Le délai d'opposition du syndic à une demande de droit à la prise à ${f.city} est encadré : passé ce délai, l'installation peut être réalisée.`,
                (f) => `Dans les immeubles anciens de ${f.city}, le point limitant est souvent la puissance souscrite pour les parties communes, pas la place disponible.`,
            ],
            middles: [
                (_f, v) => `L'audit présenté au conseil syndical couvre ${v.service}, avec le tracé des colonnes et les emplacements desservis.`,
                (f) => `Le dossier remis pour l'immeuble de ${f.city} indique ce qui relève de la décision d'assemblée générale et ce qui relève du droit à la prise individuel.`,
                (f, v) => `Chaque installation déclarée alimente ${v.document}, ce qui évite les litiges d'usage entre résidents à ${f.city}.`,
                (f) => `Les compteurs individuels de recharge permettent à la copropriété de ${f.city} de refacturer chaque résident à sa consommation réelle.`,
                (f) => `Le contrat de maintenance proposé à ${f.city} couvre l'infrastructure commune et les bornes rattachées au réseau collectif.`,
                (f) => `Les protections différentielles et la sélectivité des départs sont vérifiées à ${f.city} avant toute mise en service.`,
            ],
        },
    );
}

function getEntrepriseTip(city: string, quartiers: string[]): string {
    const zone = quartiers[0] || "votre secteur";
    const tips = [
        `À ${city}, commencez par la puissance disponible : une borne 22 kW en triphasé peut nécessiter une modification du raccordement, alors que deux bornes 7,4 kW monophasées passent souvent sans changement d'abonnement.`,
        `Sur les sites de ${zone}, la charge nocturne des véhicules de service est le scénario le moins coûteux : il évite la pointe de journée et n'exige pas de puissance supplémentaire.`,
        `Le référentiel IRVE impose une qualification spécifique pour l'installateur : demandez l'attestation avant signature, elle conditionne aussi l'accès aux aides ADVENIR.`,
        `Programmer la supervision dès l'installation à ${city} permet d'ajouter la facturation par utilisateur plus tard, sans reprendre le câblage.`,
    ];
    return tips[city.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % tips.length];
}

function getCoproTip(city: string, quartiers: string[]): string {
    const zone = quartiers[0] || "votre quartier";
    const tips = [
        `À ${city}, l'infrastructure collective posée une fois évite de reprendre les parties communes à chaque nouvelle demande de borne individuelle.`,
        `Dans les parkings en sous-sol de ${zone}, vérifiez le désenfumage et la ventilation : l'ajout de bornes peut y être soumis à des exigences complémentaires.`,
        `Le droit à la prise s'exerce sans vote préalable, mais le syndic doit être informé par lettre recommandée avec la description des travaux envisagés.`,
        `Un contrat de maintenance communiqué en assemblée générale à ${city} clarifie la répartition entre charges de copropriété et usage individuel.`,
    ];
    return tips[city.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % tips.length];
}

export async function getPseoB2bContent(cityConfig: CityConfig, segment: 'ENTREPRISE' | 'COPRO'): Promise<PseoB2bContent> {
    const { city, department, neighborhoods, postalCode } = cityConfig;
    const dept = department || "";
    const postal = postalCode || "";
    const quartiers = neighborhoods || [];
    const postalMention = postal ? ` (${postal})` : "";

    if (segment === 'ENTREPRISE') {
        const meta_title = `Bornes de recharge entreprise à ${city} | Loi LOM`;
        const meta_description = `Installation et maintenance de bornes de recharge pour entreprises et flottes à ${city}. Audit de puissance, référentiel IRVE, supervision et aides ADVENIR. Visite technique sur place.`;
        const hero_title = `Bornes de recharge <span class="text-emerald-600">entreprise</span> à ${city}`;
        const hero_badge = "Flottes, parkings et sites professionnels";
        const intro_html = getEntrepriseIntro(city, dept, quartiers);
        const expert_tip = getEntrepriseTip(city, quartiers);

        return { meta_title, meta_description, hero_title, hero_badge, intro_html, expert_tip };
    }

    const meta_title = `Bornes de recharge copropriété à ${city} | Audit`;
    const meta_description = `Infrastructure collective de recharge en copropriété à ${city} : audit, tracé des colonnes, comptage individuel et maintenance. Droit à la prise et aides ADVENIR expliqués au conseil syndical.`;
    const hero_title = `Bornes de recharge en <span class="text-purple-600">copropriété</span> à ${city}`;
    const hero_badge = "Syndics et conseils syndicaux";
    const intro_html = getCoproIntro(city, dept, quartiers);
    const expert_tip = getCoproTip(city, quartiers);

    return { meta_title, meta_description, hero_title, hero_badge, intro_html, expert_tip };
}
