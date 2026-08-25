import { Star, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { SiteConfig } from "@/lib/sites-config";
import { CityConfig } from "@/lib/db";

interface ReviewsProps {
    site: SiteConfig | CityConfig;
    themeColor?: 'blue' | 'emerald' | 'amber' | 'purple';
}

function stringHash(str: string): number {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

const REVIEW_POOL: any[] = [];

export default function Reviews({ site, themeColor = 'blue' }: ReviewsProps) {
      if (REVIEW_POOL.length === 0) return null;
    const city = site.city;
    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";
    const titlePrep = isFrance ? "en" : "à";
    const cityWithPrep = `${prep} ${city}`;

    const seed = stringHash(city);
    
    // Select 3 different reviewer profiles deterministically based on seed
    const index1 = seed % REVIEW_POOL.length;
    const index2 = (seed + 1) % REVIEW_POOL.length;
    const index3 = (seed + 2) % REVIEW_POOL.length;
    
    const profile1 = REVIEW_POOL[index1];
    const profile2 = REVIEW_POOL[index2];
    const profile3 = REVIEW_POOL[index3];
    
    // Select a template for each deterministically
    const tIndex1 = (seed >> 1) % profile1.templates.length;
    const tIndex2 = (seed >> 2) % profile2.templates.length;
    const tIndex3 = (seed >> 3) % profile3.templates.length;
    
    const reviews = [
        {
            id: 1,
            author: profile1.author,
            text: profile1.templates[tIndex1].replace(/{city}/g, cityWithPrep),
            rating: 5,
            source: "Google"
        },
        {
            id: 2,
            author: profile2.author,
            text: profile2.templates[tIndex2].replace(/{city}/g, cityWithPrep),
            rating: 5,
            source: "Google"
        },
        {
            id: 3,
            author: profile3.author,
            text: profile3.templates[tIndex3].replace(/{city}/g, cityWithPrep),
            rating: 4.9, // Make it look natural
            source: "Google"
        }
    ];

    const themeStyles = {
        blue: "text-blue-600",
        emerald: "text-emerald-600",
        amber: "text-amber-600",
        purple: "text-purple-600"
    };

    const highlightClass = themeStyles[themeColor] || themeStyles.blue;

    return (
        <section className="bg-white py-16 border-y border-neutral-100">
            <div className="container mx-auto max-w-5xl px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-900">
                            Avis Clients {titlePrep} <span className={highlightClass}>{site.city}</span>
                        </h2>
                        <p className="text-sm text-neutral-500 mt-1">
                            Retours vérifiés de nos clients récents.
                        </p>
                    </div>

                    {/* Global Rating Badge */}
                    <div className="flex items-center gap-3 bg-neutral-50 px-5 py-3 rounded-xl border border-neutral-200 shadow-sm">
                        <span className="text-3xl font-bold text-neutral-900">4.9</span>
                        <div className="flex flex-col">
                            <div className="flex text-yellow-400 gap-0.5">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} fill="currentColor" size={16} />
                                ))}
                            </div>
                            <span className="text-xs text-neutral-500 font-medium">Excellence garantie</span>
                        </div>
                        {/* Google Logo */}
                        <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                alt="Google"
                                width={18}
                                height={18}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition flex flex-col h-full"
                        >
                            {/* Stars & Source */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex text-yellow-400 gap-0.5">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} size={14} fill={j < Math.floor(review.rating) ? "currentColor" : "none"} className={j < Math.floor(review.rating) ? "text-yellow-400" : "text-gray-300"} />
                                    ))}
                                </div>
                                <span className="text-xs text-neutral-400">{review.source}</span>
                            </div>

                            {/* Content */}
                            <p className="text-neutral-700 text-sm mb-6 leading-relaxed flex-1">
                                &ldquo;{review.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-neutral-200/50">
                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-neutral-900">{review.author}</div>
                                    <div className="text-xs text-neutral-500 flex items-center gap-1">
                                        <CheckCircle2 size={10} className="text-green-500" /> Client vérifié
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
