import { Shield, CheckCircle } from "lucide-react";

const BRANDS = [
    { name: "Tesla", tier: "Premium" },
    { name: "Renault", tier: "Standard" },
    { name: "Peugeot", tier: "Standard" },
    { name: "Wallbox", tier: "Borne" },
    { name: "Schneider", tier: "Borne" },
    { name: "Hager", tier: "Borne" },
    { name: "Legrand", tier: "Borne" }
];

export default function LogoCloud() {
    return (
        <section className="py-10 border-b border-slate-100 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                        Nos installateurs sont experts sur :
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {/* Since we don't have SVGs, we use a very clean, bold typography style that mimics logotypes */}
                        {BRANDS.map((brand) => (
                            <div key={brand.name} className="group flex items-center gap-2 cursor-default">
                                {brand.name === "Tesla" && <span className="font-bold text-xl tracking-tighter">TESLA</span>}
                                {brand.name === "Renault" && <span className="font-bold text-xl italic font-serif">Renault</span>}
                                {brand.name === "Peugeot" && <span className="font-bold text-xl uppercase tracking-widest">PEUGEOT</span>}
                                {brand.name === "Wallbox" && <span className="font-bold text-xl lowercase tracking-tight">wallbox</span>}
                                {brand.name === "Schneider" && <span className="font-bold text-lg text-green-700/80 group-hover:text-green-600">Schneider</span>}
                                {brand.name === "Hager" && <span className="font-bold text-xl tracking-wide text-blue-800/80 group-hover:text-blue-600">hager</span>}
                                {brand.name === "Legrand" && <span className="font-bold text-xl italic text-red-600/80 group-hover:text-red-600">legrand</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
