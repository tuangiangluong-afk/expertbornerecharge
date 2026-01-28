import Image from "next/image";

const projects = [
    { city: "Paris 16", car: "Tesla Model Y", type: "Parking Souterrain", img: "/images/realizations/parking-box.png" },
    { city: "Neuilly", car: "Porsche Taycan", type: "Villa", img: "/images/realizations/outdoor-villa.png" },
    { city: "Boulogne", car: "Zoé", type: "Copropriété", img: "/images/realizations/garage-cables.png" },
    { city: "Levallois", car: "BMW i4", type: "Box Fermé", img: "/images/realizations/parking-box.png" }, // Re-using parking-box for consistency
];

export default function RealizationsGrid() {
    return (
        <section className="py-20 bg-neutral-900 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Dernières installations en <span className="text-blue-500">Île-de-France</span>
                    </h2>
                    <p className="text-neutral-400">
                        Qualité artisanale, finitions soignées. Nos chantiers parlent pour nous.
                    </p>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px]">
                    {projects.map((proj, i) => (
                        <div
                            key={i}
                            className={`relative group rounded-3xl overflow-hidden border border-white/10 ${i === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"
                                }`}
                        >
                            <Image
                                src={proj.img}
                                alt={`Borne ${proj.car} à ${proj.city}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    {proj.city}
                                </div>
                                <div className="text-2xl font-bold mb-1">{proj.car}</div>
                                <div className="text-sm text-neutral-300 font-medium">{proj.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
