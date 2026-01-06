// Simple seeded random generator
function seededRandom(seed: number) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// String hash function to generate a numerical seed from a string (e.g. city name)
function stringHash(str: string): number {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

export function spin(text: string, seedString: string): string {
    let seed = stringHash(seedString);

    // Advanced regex-based spintax: {Option A|Option B|{Nested Option C|Nested Option D}}
    // Handles nested spintax by recursively processing ensuring innermost braces are resolved first.
    let processed = text;
    let hasSpintax = true;

    while (hasSpintax) {
        const next = processed.replace(/{([^{}]+)}/g, (match, content) => {
            const choices = content.split("|");
            // Use the seed to pick a choice deterministically
            const choiceIndex = Math.floor(seededRandom(seed) * choices.length);
            seed++; // Increment seed for next choice to avoid pattern repetition
            return choices[choiceIndex];
        });

        if (next === processed) {
            hasSpintax = false;
        } else {
            processed = next;
        }
    }

    return processed;
}

export type SpintaxType =
    | "hero_title"
    | "hero_subtitle"
    | "hero_badge"
    | "about_us"
    | "medical_title"
    | "medical_intro"
    | "medical_cta"
    | "airport_title"
    | "airport_intro"
    | "long_distance_title"
    | "long_distance_intro"
    | "cta_button"
    | "vehicle_sedan_title"
    | "vehicle_sedan_desc"
    | "vehicle_van_title"
    | "vehicle_van_desc"
    | "review_name_1"
    | "review_text_1"
    | "review_name_2"
    | "review_text_2"
    | "review_name_3"
    | "review_text_3"
    // Meta SEO
    | "meta_title"
    | "meta_description"
    // Guide Pages
    | "guide_intro"
    | "guide_bus_pain"
    | "guide_taxi_solution"
    // Legacy keys
    | "intro"
    | "medical"
    | "station"
    | "cta";

export function getSpintaxContent(type: SpintaxType, city: string): string {
    const templates: Record<SpintaxType, string[]> = {
        // --- GUIDE PAGES ---
        guide_intro: [
            `Vous prévoyez de vous rendre à cet endroit depuis ${city} ? Voici tout ce que vous devez savoir pour votre trajet.`,
            `Comment aller ici au départ de ${city} ? Comparatif des options de transport (Bus vs Taxi).`,
            `Le guide complet pour vos déplacements vers ce lieu incontournable de ${city}.`
        ],
        guide_bus_pain: [
            `Les transports en commun peuvent être fastidieux : horaires rigides, arrêts éloignés et correspondances stressantes.`,
            `Pourquoi galérer avec les bus ? Entre les retards potentiels et la marche à pied, le trajet peut vite devenir un calvaire.`,
            `L'option bus/tram nécessite souvent de la marche et de la patience. Pas idéal si vous êtes chargé ou pressé.`
        ],
        guide_taxi_solution: [
            `Optez pour le confort absolu : votre chauffeur taxi vous dépose juste devant l'entrée. Pas de marche, pas de stress.`,
            `La solution la plus rapide : un taxi privé qui vous attend et vous conduit directement à destination pour un tarif fixe.`,
            `Gagnez du temps et de l'énergie avec notre service porte-à-porte. Véhicule climatisé et chauffeur courtois garantis.`
        ],

        // --- SEO METADATA (Aggressive CTR) ---
        meta_title: [
            `Taxi ${city} | Arrive en 10 min | Prix Fixe`,
            `Taxi Officiel ${city} | Réservation Immédiate | 24/7`,
            `Votre Chauffeur à ${city} | Prix Connu à l'Avance | CB`,
            `Taxi ${city} Gare & Aéroport | Devis Gratuit | 0 Attente`
        ],
        meta_description: [
            `Besoin d'un taxi à ${city} ? Chauffeur privé ponctuel et courtois. Transferts Gare et Aéroport. 💳 CB Acceptée. 📞 Réservez maintenant !`,
            `Service de Taxi n°1 à ${city}. Berlines et Vans climatisés. Prix fixes sans surprise. Liaison Gare TGV et Aéroport 24/24.`,
            `Réservez votre chauffeur taxi à ${city} en 2 clics. Confirmation SMS immédiate. Sièges bébé disponibles. Transport VSL agrée CPAM.`
        ],

        // --- HOME HERO (Business First) ---
        hero_title: [
            `Navette {Aéroport & Gare|Business} à <span class="text-transparent bg-clip-text bg-gradient-to-tr from-yellow-300 to-yellow-600">${city}</span>`,
            `Votre Chauffeur {Privé|VTC} Premium sur <span class="text-transparent bg-clip-text bg-gradient-to-tr from-yellow-300 to-yellow-600">${city}</span>`,
            `Transport {Affaires|Premium|VIP} à <span class="text-transparent bg-clip-text bg-gradient-to-tr from-yellow-300 to-yellow-600">${city}</span>`,
            `Taxi {Aéroport|Longue Distance} à <span class="text-transparent bg-clip-text bg-gradient-to-tr from-yellow-300 to-yellow-600">${city}</span>`
        ],
        hero_subtitle: [
            `Ne ratez plus jamais votre {vol|train}. Service de navette {ponctuelle|garantie} vers les aéroports et gares TGV depuis ${city}.`,
            `Une alternative {confortable|premium} au taxi classique. Prix {fixe|forfaitaire} annoncé à l'avance. Berline {Affaires|Confort} et chauffeur en costume.`,
            `Spécialiste du transport {Business|d'Affaires} et des {transferts aéroport|liaisons gares}. Facturation simplifiée pour les entreprises.`,
            `Voyagez l'esprit {léger|libre}. {Wifi|Chargeurs} et bouteilles d'eau à bord. Idéal pour vos {déplacements pro|rendez-vous importants}.`
        ],
        hero_badge: [
            `Navette Aéroport ${city}`,
            `Transfert Gare & Business`,
            `Prix Fixe Immédiat`,
            `Service Premium 24/7`
        ],

        // --- GENERIC ---
        about_us: [
            `Nous sommes une compagnie de {taxi|transport} basée à ${city}.`,
            `Votre partenaire mobilité à ${city} depuis 10 ans.`,
            `Service de transport premium sur ${city} et sa région.`
        ],

        // --- MEDICAL (Secondary) ---
        medical_title: [
            `Transport Médical <span class="text-blue-600">${city}</span>`,
            `Taxi VSL Conventionné <span class="text-blue-600">${city}</span>`,
            `Transport de Soins <span class="text-blue-600">${city}</span>`
        ],
        medical_intro: [
            `{Besoin d'un taxi conventionné|Vous recherchez un transport médical} pour vos {soins|rendez-vous} ? Nous sommes {agréés CPAM|habilités VSL} pour assurer vos déplacements sans {avance de frais|tracas administratif} (tiers-payant).`,
            `Nos chauffeurs sont {formés|qualifiés} pour l'accompagnement des patients vers {tous les hôpitaux|les centres de soins|les cliniques} de la région. Bénéficiez d'une {prise en charge|couverture} à 100% selon vos droits.`,
            `Voyagez en toute {sécurité|confiance} vers vos rendez-vous médicaux. Nous gérons {tout l'administratif|les papiers} avec votre caisse d'assurance maladie.`,
            `Le spécialiste du transport de {malades assis|patients} à ${city}. Confort, {bienveillance|humanité} et ponctualité pour vos consultations.`
        ],
        medical_cta: [
            `Réserver mon taxi conventionné`,
            `Commander mon transport VSL`,
            `Appeler pour une prise en charge`,
            `Transport vers l'hôpital`
        ],

        // --- AIRPORT / STATION ---
        airport_title: [
            `Navette Gare & Aéroport <span class="text-blue-600">${city}</span>`,
            `Transfert Aéroport <span class="text-blue-600">${city}</span>`,
            `Taxi Gare TGV & Aéroport <span class="text-blue-600">${city}</span>`,
            `Liaison Aéroportuaire <span class="text-blue-600">${city}</span>`
        ],
        airport_intro: [
            `{Départ ou arrivée|En partance ou en provenance} ? Profitez d'un transfert {sans stress|tout confort} vers les gares et aéroports. Suivi de vol et {attente gratuite|accueil pancarte} inclus.`,
            `Ne ratez jamais votre {vol|train} avec notre service {ponctuel|express}. Nous desservons {quotidiennement|tous les jours} l'aéroport et la gare TGV depuis ${city}.`,
            `La solution la plus {fiable|efficace} pour rejoindre votre terminal. {Forfait fixe|Prix annoncé}, pas de surprise, et aide au port des bagages.`,
            `Voyagez l'esprit {léger|libre}. Votre chauffeur vous attend {à l'heure|en avance} pour vous conduire à destination dans les {meilleures conditions|plus brefs délais}.`
        ],

        // --- LONG DISTANCE ---
        long_distance_title: [
            `Taxi Longue Distance <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Sans Compteur</span>`,
            `VTC & Taxi Long Trajet <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Prix Fixe</span>`,
            `Voyagez Loin <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">En Premium</span>`
        ],
        long_distance_intro: [
            `Oubliez le {stress|regard rivé sur le} compteur pour vos longs trajets. Au départ de <strong>${city}</strong>, nous vous proposons des {forfaits tout compris|tarifs fixes} vers toute la France et l'Europe.`,
            `Besoin de rejoindre {Nice, Paris ou Barcelone|une autre grande ville} ? Optez pour le confort d'une {berline privée|Mercedes} avec un chauffeur dédié pour plusieurs heures.`,
            `Une alternative {luxueuse|confortable} au train ou à l'avion. {Wi-Fi, chargeurs et eau|Services à bord} inclus pour transformer votre trajet en moment de {détente|travail}.`,
            `Déplacements professionnels ou personnels, nous assurons vos liaisons {longue distance|interurbaines} sur devis {gratuit|immédiat}.`
        ],

        // --- VEHICLES ---
        vehicle_sedan_title: [
            `Berline {Confort|Affaires|Standing}`,
            `Classe {Éco|Standard|Tourisme}`,
            `Véhicule {Léger|4 Places|Berline}`
        ],
        vehicle_sedan_desc: [
            `Idéal pour les {trajets urbains|déplacements en ville} et les transferts gare. Confort pour 1 à 4 passagers avec bagages.`,
            `Une voiture {récente|moderne} et entretenue pour vos courses du quotidien. Climatisation et chargeurs à bord.`,
            `Le choix {économique|malin} sans sacrifier le confort. Parfait pour rejoindre l'aéroport ou un rendez-vous médical.`
        ],
        vehicle_van_title: [
            `Van {Prestige|Premium|VIP}`,
            `Monospace {7 Places|Groupe|Famille}`,
            `Grand {Volume|Confort|Tourisme}`
        ],
        vehicle_van_desc: [
            `Voyagez en groupe jusqu'à {7 passagers|8 personnes} avec vos bagages volumineux. Intérieur cuir et vitres teintées.`,
            `La solution pour les {familles|groupes} et les séminaires. Espace généreux et configuration salon sur demande.`,
            `Transportez {toute la famille|vos collaborateurs} dans un confort absolu. Idéal pour les navettes aéroport avec beaucoup de valises.`
        ],

        // --- REVIEWS (Fake Social Proof) ---
        review_name_1: [`Sophie D.`, `Marie L.`, `Camille B.`, `Aurélie P.`],
        review_text_1: [
            `Chauffeur {très ponctuel|à l'heure} et {sympathique|courtois}. Je recommande pour les trajets aéroport.`,
            `Service {impeccable|parfait}. Voiture propre et conduite {agréable|douce}. Merci pour ce trajet.`,
            `J'ai réservé un VSL pour mon père. Le chauffeur a été {très patient|adorable} et l'a aidé jusqu'au service.`
        ],
        review_name_2: [`Thomas M.`, `Julien R.`, `Nicolas F.`, `Pierre D.`],
        review_text_2: [
            `Réservation {simple|facile} par téléphone. Le taxi était là {5 min avant|pile à l'heure}.`,
            `J'utilise ce service {régulièrement|souvent} pour aller à la gare TGV. Jamais de retard, c'est {top|fiable}.`,
            `Enfin un taxi qui {accepte la carte|prend la CB} sans râler ! Service {pro|carré} à ${city}.`
        ],
        review_name_3: [`Élodie G.`, `Sarah H.`, `Julie K.`, `Laura M.`],
        review_text_3: [
            `Merci pour le siège bébé ! C'est {rare|pratique} de trouver un taxi équipé à ${city}.`,
            `Tarif {correct|raisonnable} et annoncé à l'avance pour le forfait aéroport. Pas de surprise.`,
            `Chauffeur {discret|poli} et voiture {confortable|propre}. Je referai appel à vous.`
        ],

        // --- CALL TO ACTION BUTTONS ---
        cta_button: [
            `{Appelez-nous|Contactez-nous|Réservez} dès maintenant`,
            `{Commander|Réserver} votre taxi 24/7`,
            `Demander un {devis|tarif} gratuit`,
            `Chauffeur privé immédiat`
        ],

        // --- LEGACY KEYS (Keep for compatibility) ---
        intro: [`Bienvenue chez {votre partenaire|le pro} à ${city}.`],
        medical: [`Transport médical {agréé|certifié} à ${city}.`],
        station: [`Navette {rapide|express} gare.`],
        cta: [`Appeler`]
    };

    // Normalize type if strictly typed, or allow loose string for legacy support
    const options = templates[type] || templates["intro"];

    // Seed usage for template selection:
    // We mix the city string + the type string to ensure "hero_title" and "hero_subtitle" don't necessarily pick index 0 for the same city if possible, 
    // or at least have different seeds. 
    let seed = stringHash(city + type);

    const chosenTemplate = options[Math.floor(seededRandom(seed) * options.length)];

    // Pass the same seed (or a variation) to the spin function so nested choices are also deterministic
    return spin(chosenTemplate, city + type + chosenTemplate);
}

// Async version that checks DB overrides first (for Server Components)
import { supabase } from "@/lib/supabase";

export async function getSpintaxContentAsync(type: SpintaxType, city: string, tenantId?: string): Promise<string> {
    // 1. Try to fetch custom variations from DB
    if (tenantId) {
        const { data } = await supabase
            .from("spintax_templates")
            .select("variations")
            .eq("tenant_id", tenantId)
            .eq("type", type)
            .maybeSingle();

        if (data?.variations && data.variations.length > 0) {
            // Use DB variations
            const seed = stringHash(city + type);
            const chosenTemplate = data.variations[Math.floor(seededRandom(seed) * data.variations.length)];
            // Replace {city} placeholder
            const processed = chosenTemplate.replace(/{city}/g, city);
            return spin(processed, city + type + chosenTemplate);
        }
    }

    // 2. Fall back to hardcoded templates
    return getSpintaxContent(type, city);
}

