import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getCurrentYearSEO } from './date';

const GUIDES_PATH = path.join(process.cwd(), 'src/content/guides');

export async function getGuideBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(GUIDES_PATH, `${realSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
        slug: realSlug,
        meta: data,
        content: content,
    };
}

export function getAllGuides() {
    if (!fs.existsSync(GUIDES_PATH)) return [];

    const files = fs.readdirSync(GUIDES_PATH);
    const guides = files.map((file) => {
        const filePath = path.join(GUIDES_PATH, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        return {
            slug: file.replace(/\.mdx$/, ''),
            title: data.title,
            description: data.description,
            date: data.date,
            ...data
        };
    });

    // Manually inject custom React pages (that are not MDX)
    const year = getCurrentYearSEO();
    const customGuides = [
        {
            slug: 'droit-a-la-prise-borne-recharge',
            title: 'Droit à la Prise : Installez votre borne en copropriété',
            description: 'Tout savoir sur le droit à la prise en copropriété. Délais, notification syndic, installation borne de recharge. Modèle de lettre gratuit.',
            date: `${year}-01-26`,
            category: 'Copropriété',
            readTime: '5 min'
        },
        {
            slug: 'prix-installation-borne-recharge',
            title: "Combien Coûte l'Installation d'une Borne de Recharge ?",
            description: `Prix réels ${year}, aides disponibles (crédit impôt, ADVENIR) et devis. Guide complet pour maison et copropriété.`,
            date: `${year}-01-27`,
            category: 'Prix & Aides',
            readTime: '8 min'
        },
        {
            slug: 'wallbox-vs-prise-renforcee',
            title: `Wallbox vs Prise Renforcée : Le Comparatif ${year}`,
            description: "Temps de charge, prix, sécurité... Quelle solution choisir pour votre voiture électrique ? Le duel complet.",
            date: `${year}-01-27`,
            category: 'Comparatif',
            readTime: '6 min'
        },
        {
            slug: 'meilleures-bornes-recharge-2026',
            title: `Top 10 Meilleures Bornes de Recharge ${year} : Le Comparatif Ultime`,
            description: `Quelle borne choisir en ${year} ? Wallbox, Tesla, Hager... Notre classement après 500+ installations. Avis d'experts, prix réels et comparatif.`,
            date: `${year}-01-28`,
            category: 'Comparatif',
            readTime: '10 min'
        }
    ];

    const allGuides = [...guides, ...customGuides];

    return allGuides.sort((a: any, b: any) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}
