
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";

export default function RegionPage() {
    const departments = [
        { code: "92", name: "Hauts-de-Seine", slug: "92-hauts-de-seine", color: "bg-blue-600" },
        { code: "78", name: "Yvelines", slug: "78-yvelines", color: "bg-teal-600" },
        { code: "93", name: "Seine-Saint-Denis", slug: "93-seine-saint-denis", color: "bg-purple-600" },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
            <nav className="border-b bg-white px-6 py-4">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <Link href="/home" className="text-2xl font-bold tracking-tighter text-blue-900">
                        TaxiFrance<span className="text-blue-600">.</span>
                    </Link>
                </div>
            </nav>

            <section className="px-6 py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600 mb-4">
                            Région Île-de-France
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
                            Choisissez votre Département
                        </h1>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Trouvez un taxi local dans votre département. Service disponible 24h/24 et 7j/7.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {departments.map((dept) => (
                            <Link
                                key={dept.code}
                                href={`/home/${dept.slug}`} // Assuming middleware handles this path correctly under /home
                                className="group relative block overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className={`aspect-video w-full ${dept.color} flex items-center justify-center text-white`}>
                                    <div className="text-center">
                                        <div className="text-6xl font-black opacity-20 mb-2">{dept.code}</div>
                                        <div className="font-bold text-2xl relative z-10">{dept.name}</div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between text-neutral-900 font-bold group-hover:text-blue-600 transition">
                                        <span>Voir les villes</span>
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
