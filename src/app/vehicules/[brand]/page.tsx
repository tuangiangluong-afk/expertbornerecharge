import { getVehiclesByBrand, getAllVehicles } from "@/data/vehicles";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import Logo from "@/components/Logo";
import Header from "@/components/Header";

export async function generateStaticParams() {
    const vehicles = getAllVehicles();
    const brands = Array.from(new Set(vehicles.map((v) => v.brand.toLowerCase())));
    return brands.map((brand) => ({
        brand: brand,
    }));
}

export function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
    // Simple metadata, can be async if needed but here we just need to decode params
    // Next.js 15 requires awaiting params in generateMetadata too if dynamic?
    // Actually for static params it should be fine, but let's follow pattern
    return {
        title: "Installation Borne Recharge - Véhicules Électriques",
        description: "Trouvez la borne de recharge adaptée à votre voiture électrique. Devis gratuit et installateurs agréés.",
    };
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
    const resolvedParams = await params;
    const brandName = resolvedParams.brand.charAt(0).toUpperCase() + resolvedParams.brand.slice(1); // Simple Title Case
    // Better: get real brand name from DB
    const models = getVehiclesByBrand(resolvedParams.brand);

    if (models.length === 0) return notFound();

    const realBrandName = models[0].brand;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Navbar */}
            <Header isHub={true} variant="default" />

            <main className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <Link href="/vehicules" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6 group">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Toutes les marques
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
                        Bornes de recharge pour <span className="text-blue-600">{realBrandName}</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        Sélectionnez votre modèle de {realBrandName} pour découvrir la puissance de charge acceptée et le temps de recharge à domicile.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {models.map((model) => (
                        <Link
                            key={model.id}
                            href={`/vehicules/${model.brand.toLowerCase()}/${model.id}`}
                            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200"
                        >
                            <div className="relative h-48 w-full bg-slate-100">
                                <Image
                                    src={model.image}
                                    alt={model.model}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                    <Zap size={12} className="text-blue-600" />
                                    {model.maxAC}kW
                                </div>
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {model.model}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Batterie {model.battery}kWh • Connecteur {model.connector}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
