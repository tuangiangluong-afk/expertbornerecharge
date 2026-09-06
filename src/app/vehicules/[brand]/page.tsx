export const revalidate = 86400; // 24h ISR cache
import { getVehiclesByBrand, getAllVehicles } from "@/data/vehicles";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { ArrowLeft, Zap, CheckCircle, Award } from "lucide-react";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";

export async function generateStaticParams() {
    const vehicles = getAllVehicles();
    const brands = Array.from(new Set(vehicles.map((v) => v.brand.toLowerCase())));
    return brands.map((brand) => ({
        brand: brand,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
    const resolvedParams = await params;
    const models = getVehiclesByBrand(resolvedParams.brand);
    if (models.length === 0) return {};

    const brandName = models[0].brand;
    const modelNames = models.map(m => m.model).slice(0, 3).join(', ');

    return {
        title: `Installation Borne Recharge ${brandName} | Devis IRVE Gratuit`,
        description: `Installation certifiée IRVE de bornes de recharge pour ${brandName} (${modelNames}). Devis gratuit sous 24h, matériel garanti 2 ans.`,
        openGraph: {
            title: `Installation Borne Recharge ${brandName}`,
            description: `Borne de recharge adaptée pour ${brandName} (${modelNames}). Installation professionnelle certifiée IRVE.`,
            siteName: "Expert Borne Recharge",
            locale: "fr_FR",
            type: "website",
        },
    };
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
    const resolvedParams = await params;
    const models = getVehiclesByBrand(resolvedParams.brand);

    if (models.length === 0) return notFound();

    const realBrandName = models[0].brand;
    const heroImage = models[0].image; // Dynamic Hero Image based on first model

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Navbar */}
            <Header isHub={true} variant="default" />

            {/* HERO SECTION (New Global Design) */}
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <Link href="/vehicules" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6 group">
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Toutes les marques
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* Left: Content + Lead Form */}
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <div className="text-center lg:text-left space-y-6">
                                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-800 border border-blue-200 mx-auto lg:mx-0">
                                    <Zap size={16} className="mr-2" />
                                    Bornes pour {realBrandName}
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                    Installation de borne pour <span className="text-blue-600">{realBrandName}</span>
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Découvrez les temps de recharge et la puissance acceptée par votre {realBrandName}.
                                    Installation clé en main par des experts certifiés IRVE.
                                </p>
                            </div>

                            {/* LEAD FORM - Integrated Here */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left">
                                <div id="simulateur" className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 overflow-hidden border border-slate-200">
                                    <div className="p-1 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                                    <div className="p-6 md:p-8">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-slate-900">Testez votre éligibilité</h3>
                                            <p className="text-sm text-slate-500">Réponse immédiate • Gratuit • Sans engagement</p>
                                        </div>
                                        <LeadForm
                                            city="France"
                                            domain="expertbornerecharge.com"
                                            targetType="MAISON" // Default for vehicles, usually individuals
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Large Hero Image + Trust Badges */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full">
                            <div className="relative h-[640px] w-full mb-8">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-100 bg-white p-2">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                                        <SafeImage
                                            src={heroImage}
                                            fallbackSrc="/images/generated/installation-borne-hero.png"
                                            alt={`Borne recharge ${realBrandName}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                                        {/* Image Caption/Badge */}
                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="bg-white/95 backdrop-blur rounded-xl p-5 shadow-xl border border-white/50 flex items-center gap-4 cursor-default">
                                                <div className="bg-blue-100 p-3 rounded-full shrink-0">
                                                    <Zap className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-slate-900">Compatible {realBrandName}</div>
                                                    <div className="text-sm font-medium text-slate-500">Toutes versions</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Elements relocated - Right Column */}
                            <div className="flex flex-wrap items-center gap-4 justify-center px-4">
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <Award size={24} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-slate-900 text-base">Qualifelec</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <Award size={24} className="text-blue-500 fill-blue-500" />
                                    <span className="font-bold text-slate-900 text-base">RGE</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <CheckCircle size={24} className="text-green-500 fill-green-100" />
                                    <span className="font-bold text-slate-900 text-base">Garantie décennale</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 pb-24">
                <div className="mb-12 text-center lg:text-left">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Tous les modèles {realBrandName}</h2>
                    <p className="text-slate-600">Choisissez votre véhicule pour voir les caractéristiques détaillées.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {models.map((model) => (
                        <Link
                            key={model.id}
                            href={`/vehicules/${model.brand.toLowerCase()}/${model.id}`}
                            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200"
                        >
                            <div className="relative h-48 w-full bg-slate-100">
                                <SafeImage
                                    src={model.image}
                                    fallbackSrc="/images/generated/installation-borne-hero.png"
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
