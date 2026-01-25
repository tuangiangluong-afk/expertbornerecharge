
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEPARTMENTS } from "@/config/departments";

export default function RegionPage() {
    const departments = Object.values(DEPARTMENTS);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-neutral-900">
            <nav className="border-b border-white/10 bg-neutral-900 px-6 py-4 sticky top-0 z-50 shadow-md backdrop-blur-md text-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <Link href="/home" className="text-2xl font-bold tracking-tighter text-white">
                        TaxiFrance<span className="text-blue-500">.</span>
                    </Link>
                </div>
            </nav>

            <section className="px-6 py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600 mb-4 tracking-wider uppercase">
                            Région Île-de-France
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 text-slate-900">
                            Choisissez votre Département
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Trouvez un taxi local dans votre département. Service disponible 24h/24 et 7j/7.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {departments.map((dept) => (
                            <Link
                                key={dept.code}
                                href={`/home/departement/${dept.slug}`}
                                className="group relative block overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className={`aspect-video w-full bg-gradient-to-br ${dept.heroColor} flex items-center justify-center text-white relative overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                                    <div className="text-center relative z-10">
                                        <div className="text-7xl font-black opacity-20 mb-2 select-none group-hover:scale-110 transition-transform duration-500">{dept.code}</div>
                                        <div className="font-bold text-2xl relative z-10 drop-shadow-md">{dept.name}</div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between text-slate-900 font-bold group-hover:text-blue-600 transition">
                                        <span>Voir les villes</span>
                                        <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <p className="mt-4 text-sm text-slate-500 line-clamp-2">
                                        {dept.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
