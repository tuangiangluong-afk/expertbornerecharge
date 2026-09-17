import Link from "next/link";
import { breadcrumbList } from "@/lib/seo-meta";

/**
 * Fil d'Ariane visible + BreadcrumbList balisé.
 *
 * Les deux vont ensemble : Google demande que le balisage décrive un chemin
 * réellement affiché sur la page. Les pages d'information (solutions, contact,
 * mentions légales…) n'en avaient aucun, donc Google affichait l'URL brute
 * dans les résultats au lieu du chemin hiérarchique.
 */
const BASE_URL = "https://expertbornerecharge.com";

export default function Breadcrumbs({
    items,
    className = "",
}: {
    items: { name: string; href: string }[];
    className?: string;
}) {
    if (items.length === 0) return null;

    const schema = breadcrumbList(
        items.map((item) => ({
            name: item.name,
            url: item.href === "/" ? BASE_URL : `${BASE_URL}${item.href}`,
        })),
    );

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <nav aria-label="Fil d'Ariane" className={className}>
                <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;
                        return (
                            <li key={`${item.href}-${item.name}`} className="flex items-center gap-2">
                                {index > 0 && (
                                    <span aria-hidden="true" className="text-slate-300">
                                        /
                                    </span>
                                )}
                                {isLast ? (
                                    <span className="font-medium text-slate-900">{item.name}</span>
                                ) : (
                                    <Link href={item.href} className="hover:text-blue-600 transition-colors">
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
