import { Star, Quote } from "lucide-react";
import { getSpintaxContent } from "@/lib/spintax";

interface ReviewsProps {
    city: string;
}

export function Reviews({ city }: ReviewsProps) {
    // Deterministic checks (names and reviews will be the same for the same city)
    const reviews = [
        {
            name: getSpintaxContent("review_name_1", city),
            text: getSpintaxContent("review_text_1", city),
            rating: 5,
        },
        {
            name: getSpintaxContent("review_name_2", city),
            text: getSpintaxContent("review_text_2", city),
            rating: 5,
        },
        {
            name: getSpintaxContent("review_name_3", city),
            text: getSpintaxContent("review_text_3", city),
            rating: 5,
        },
    ];

    return (
        <section className="py-20 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-bold text-yellow-700 mb-4">
                        <Star className="w-3 h-3 mr-1 fill-yellow-700" />
                        Avis Vérifiés
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Ce que nos clients disent à <span className="text-blue-600">{city}</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                        La satisfaction de nos passagers est notre priorité. Voici quelques retours récents.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {reviews.map((review, i) => (
                        <div
                            key={i}
                            className="relative bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-yellow-400/20 rotate-180" />

                            <div className="flex gap-1 mb-4">
                                {[...Array(review.rating)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <blockquote className="text-slate-700 font-medium mb-6 leading-relaxed bg-white/50 p-4 rounded-xl backdrop-blur-sm">
                                "{review.text}"
                            </blockquote>

                            <div className="flex items-center gap-3 mt-auto">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-md">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{review.name}</div>
                                    <div className="text-xs text-slate-400">Client {city}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
