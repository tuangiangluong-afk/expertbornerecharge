import { getSiteConfig } from "@/lib/sites-config";
import { getSpintaxContent } from "@/lib/spintax";
import { Phone, Calendar, CheckCircle, Star, Zap, Shield, Award, TrendingDown, Home, Building2, Briefcase, MapPin, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import SchemaJSON from "@/components/SchemaJSON";
import Reviews from "@/components/Reviews";
import { Footer } from "@/components/Footer";
import { InternalMesh } from "@/components/InternalMesh";

// ============================================
// METADATA
// ============================================

export async function generateMetadata({
    params,
}: {
    params: Promise<{ domain: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const site = getSiteConfig(resolvedParams.domain);

    if (!site) {
        return {
            title: "Expert Borne Recharge | Installation IRVE",
            description: "Installation de bornes de recharge pour véhicules électriques.",
        };
    }

    // Dynamic Meta via Spintax
    const spintaxTitle = getSpintaxContent("meta_title", site, 'LOCAL');
    const spintaxDesc = getSpintaxContent("meta_description", site, 'LOCAL');

    return {
        title: spintaxTitle,
        description: spintaxDesc,
        keywords: site.localKeywords,
        alternates: {
            canonical: `https://${site.domain}`,
        },
        openGraph: {
            title: spintaxTitle,
            description: spintaxDesc,
            url: `https://${site.domain}`,
            siteName: site.name,
            images: [
                {
                    url: site.heroImage,
                    width: 1200,
                    height: 630,
                    alt: `Installation borne de recharge à ${site.city}`
                }
            ],
            locale: "fr_FR",
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

// ============================================
// PAGE COMPONENT
// ============================================

export default async function SitePage({ params }: { params: Promise<{ domain: string }> }) {
    const resolvedParams = await params;

    // DEBUG
    console.log("========= [domain] PAGE DEBUG =========");
    console.log("Received domain param:", resolvedParams.domain);

    const site = getSiteConfig(resolvedParams.domain);
    console.log("getSiteConfig result:", site ? site.slug : "NULL");
    console.log("========================================");

    if (!site) {
        return notFound();
    }

    const isHub = site.slug === 'home';

    // Spintax Generation
    // Spintax Generation
    const h1Content = getSpintaxContent("hero_title", site, 'LOCAL');
    const subtitleContent = getSpintaxContent("hero_subtitle", site, 'LOCAL');
    const badgeContent = getSpintaxContent("hero_badge", site, 'LOCAL');
    const introContent = getSpintaxContent("intro_p1", site, 'LOCAL');
    const ctaPrimary = getSpintaxContent("cta_primary", site, 'LOCAL');

    // THEME & COLOR SYSTEM
    // We derive the color theme from the PriceRange/Target to vary the look
    // PREMIUM/LUXE -> Blue/Gold/Black
    // STANDARD -> Emerald/Green (Eco friendly)
    // COPRO -> Purple (Syndic trustworthy)

    type ThemeColor = 'blue' | 'emerald' | 'amber' | 'purple';

    let themeColor: ThemeColor = 'blue'; // Default
    if (site.priceRange === 'LUXE') themeColor = 'amber';
    else if (site.targetType === 'COPRO') themeColor = 'purple';
    else if (site.priceRange === 'STANDARD') themeColor = 'emerald';

    // Color Palette Map
    const colors = {
        blue: {
            primary: "bg-blue-600",
            hover: "hover:bg-blue-700",
            text: "text-blue-600",
            light: "bg-blue-50",
            border: "border-blue-200",
            gradient: "from-blue-600 to-blue-700",
            shadow: "shadow-blue-500/30"
        },
        emerald: {
            primary: "bg-emerald-600",
            hover: "hover:bg-emerald-700",
            text: "text-emerald-600",
            light: "bg-emerald-50",
            border: "border-emerald-200",
            gradient: "from-emerald-600 to-emerald-700",
            shadow: "shadow-emerald-500/30"
        },
        amber: { // Luxe / Gold
            primary: "bg-amber-600",
            hover: "hover:bg-amber-700",
            text: "text-amber-600",
            light: "bg-amber-50",
            border: "border-amber-200",
            gradient: "from-amber-600 to-amber-700",
            shadow: "shadow-amber-500/30"
        },
        purple: { // Copro / Tech
            primary: "bg-purple-600",
            hover: "hover:bg-purple-700",
            text: "text-purple-600",
            light: "bg-purple-50",
            border: "border-purple-200",
            gradient: "from-purple-600 to-purple-700",
            shadow: "shadow-purple-500/30"
        }
    };

    const palette = colors[themeColor];
    const isPremium = site.theme === 'premium'; // Dark mode header check remains

    // Inject Theme Color into Spintax Highlight
    const coloredH1Content = h1Content.replace(/spintax-highlight/g, `spintax-highlight ${palette.text}`);

    return (
        <div className="min-h-screen font-sans text-neutral-900 bg-neutral-50">
            {/* ============================================ */}
            {/* NAVIGATION - Theme Adaptive */}
            {/* ============================================ */}
            {/* ============================================ */}
            {/* NAVIGATION - Theme Adaptive */}
            {/* ============================================ */}
            <Header
                isHub={isHub}
                city={site.city}
                phoneNumber={site.phoneNumber}
                variant={isPremium ? "light" : "default"}
                themeColor={themeColor}
            />

            <SchemaJSON type="LocalBusiness" site={site} />

            {/* ============================================ */}
            {/* HERO - Trust/Locale Style */}
            {/* ============================================ */}
            <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-32 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 -z-10 bg-slate-900">
                    <div className={`absolute inset-0 z-10 bg-gradient-to-b ${isPremium ? "from-neutral-900/90 via-neutral-900/80 to-neutral-900" : "from-white/95 via-white/80 to-white"}`} />
                    <Image
                        src={site.heroImage}
                        alt={`Installation borne de recharge à ${site.city}`}
                        fill
                        priority
                        className="object-cover opacity-30"
                        sizes="100vw"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-start pt-8">
                        {/* Left: Content */}
                        <div className="text-center lg:text-left">

                            {/* Trust Badge */}
                            <div className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-bold mb-6 border ${isPremium ? "border-amber-500/30 bg-amber-500/10 text-amber-500" : `${palette.border} ${palette.light} ${palette.text}`}`}>
                                <CheckCircle size={16} className="mr-2" />
                                {badgeContent}
                            </div>

                            {/* H1 */}
                            <h1
                                className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight ${isPremium ? "text-white" : "text-neutral-900"}`}
                                dangerouslySetInnerHTML={{ __html: coloredH1Content }}
                            />

                            {/* Subtitle */}
                            <div
                                className={`text-xl mb-8 max-w-xl mx-auto lg:mx-0 ${isPremium ? "text-neutral-400" : "text-neutral-600"}`}
                                dangerouslySetInnerHTML={{ __html: introContent }}
                            />

                            {/* Certifications */}
                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                                {(site.features || ["Qualifelec", "IRVE"]).slice(0, 3).map((feat, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm border shadow-sm ${isPremium ? "bg-neutral-800 text-neutral-300 border-neutral-700" : "bg-white text-neutral-700 border-neutral-200"}`}
                                    >
                                        <Award size={14} className="text-yellow-500" />
                                        {feat}
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a
                                    href="#simulateur"
                                    className={`flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-r ${palette.gradient} ${palette.shadow}`}
                                >
                                    <Zap size={24} />
                                    {ctaPrimary}
                                </a>
                            </div>
                        </div>

                        {/* Right: Lead Form - STRATEGIC PLACEMENT HIGH CONVERSION */}
                        <div className="hidden lg:block w-full max-w-md mx-auto relative z-30">
                            <div id="simulateur" className="bg-white rounded-3xl shadow-2xl shadow-blue-900/20 overflow-hidden border border-neutral-100">
                                <div className={`p-1 bg-gradient-to-r ${palette.gradient}`}></div>
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <h2 className="text-lg font-bold text-neutral-900">Testez votre éligibilité</h2>
                                        <p className="text-sm text-neutral-500">Réponse immédiate • Gratuit • Sans engagement</p>
                                    </div>
                                    <LeadForm
                                        city={site.city}
                                        domain={site.domain}
                                        targetType={site.targetType}
                                        themeColor={themeColor}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* AIDES SECTION (Gradient) */}
            {/* ============================================ */}
            <section className={`py-20 bg-gradient-to-b ${palette.gradient} text-white`}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Jusqu'à <span className="text-yellow-400">2 460€</span> d'aides cumulables
                        </h2>
                        <p className="text-blue-100 text-lg">
                            Profitez de toutes les aides disponibles en 2026
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { label: "Prime ADVENIR", value: "960€", detail: "Copropriétés" },
                            { label: "Crédit d'Impôt", value: "500€", detail: "75% plafonné" },
                            { label: "TVA Réduite", value: "5.5%", detail: "Au lieu de 20%" },
                            { label: "MaPrimeRénov'", value: "1000€", detail: "Sous conditions" },
                        ].map((aide, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                                <div className="text-3xl font-bold text-yellow-400 mb-2">{aide.value}</div>
                                <div className="font-semibold mb-1">{aide.label}</div>
                                <div className="text-sm text-blue-200">{aide.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* COST COMPARATOR - THE KILLER */}
            {/* ============================================ */}
            <section className="py-20 bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-bold mb-4">
                            <TrendingDown size={18} />
                            Économies garanties
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                            Essence vs Recharge à domicile
                        </h2>
                        <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                            Rechargez votre véhicule à la maison et économisez jusqu'à <strong>1 500€ par an</strong>
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200">
                            <div className="grid md:grid-cols-2">
                                {/* Essence Column */}
                                <div className="p-8 bg-red-50 border-b md:border-b-0 md:border-r border-red-100 rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                            <span className="text-2xl">⛽</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-red-900">Essence / Diesel</h3>
                                            <p className="text-sm text-red-600">Coût mensuel moyen</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-red-100">
                                            <span className="text-neutral-700">Consommation</span>
                                            <span className="font-semibold">6L/100km</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-red-100">
                                            <span className="text-neutral-700">Distance/mois</span>
                                            <span className="font-semibold">1 500 km</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-red-100">
                                            <span className="text-neutral-700">Prix au litre</span>
                                            <span className="font-semibold">1.85€</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <span className="font-bold text-neutral-900">Total mensuel</span>
                                            <span className="text-3xl font-bold text-red-600">167€</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Electric Column */}
                                <div className="p-8 bg-green-50 relative rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">
                                        RECOMMANDÉ
                                    </div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <Zap className="text-green-600" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-green-900">Recharge domicile</h3>
                                            <p className="text-sm text-green-600">Coût mensuel moyen</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-green-100">
                                            <span className="text-neutral-700">Consommation</span>
                                            <span className="font-semibold">15kWh/100km</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-green-100">
                                            <span className="text-neutral-700">Distance/mois</span>
                                            <span className="font-semibold">1 500 km</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-green-100">
                                            <span className="text-neutral-700">Prix kWh HC*</span>
                                            <span className="font-semibold">0.18€</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <span className="font-bold text-neutral-900">Total mensuel</span>
                                            <span className="text-3xl font-bold text-green-600">41€</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Savings Banner */}
                            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white text-center">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <div>
                                        <span className="text-green-200">Économie mensuelle:</span>
                                        <span className="text-3xl font-bold ml-2">126€</span>
                                    </div>
                                    <div className="hidden sm:block w-px h-10 bg-white/30"></div>
                                    <div>
                                        <span className="text-green-200">Économie annuelle:</span>
                                        <span className="text-3xl font-bold ml-2">1 512€</span>
                                    </div>
                                </div>
                                <p className="text-sm text-green-200 mt-3">
                                    *Tarif heures creuses EDF. La borne programme automatiquement la recharge aux heures les moins chères.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* SERVICES GRID */}
            {/* ============================================ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                            Types d'installations & Prix Moyens
                        </h2>
                        <p className="text-neutral-600 text-lg">
                            Comparez les devis pour maison, copro et professionnels
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Home,
                                title: "Maison Individuelle",
                                description: "Pour les particuliers. Borne 7kW à 22kW. Garage ou extérieur.",
                                features: ["Installation sous 48h", "Éligible Crédit Impôt", "Devis gratuits"],
                                color: "blue",
                                href: "/solutions/maison"
                            },
                            {
                                icon: Building2,
                                title: "Copropriété",
                                description: "Pour syndics et résidents. Droit à la prise ou infrastructure collective.",
                                features: ["Étude technique offerte", "Dossier AG clé en main", "Aides ADVENIR"],
                                color: "purple",
                                highlight: true,
                                href: "/solutions/copropriete"
                            },
                            {
                                icon: Briefcase,
                                title: "Entreprise / Flotte",
                                description: "Pour parkings pro. Supervision, facturation et gestion de flotte.",
                                features: ["Conformité Loi LOM", "Gestion à distance", "Facturation auto"],
                                color: "emerald",
                                href: "/solutions/entreprise"
                            }
                        ].map((service, i) => (
                            <Link key={i} href={service.href} className="block group h-full">
                                <div
                                    className={`
                                        relative h-full p-8 rounded-3xl border-2 transition-all duration-300
                                        ${service.highlight
                                            ? 'border-purple-500 bg-purple-50 shadow-xl shadow-purple-500/10 group-hover:scale-[1.02]'
                                            : 'border-neutral-200 bg-white hover:border-blue-500 hover:shadow-xl group-hover:scale-[1.02]'
                                        }
                                    `}
                                >
                                    {service.highlight && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                                            PROJET LE PLUS DEMANDÉ
                                        </div>
                                    )}
                                    <div className={`
                                        w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110
                                        ${service.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                                        ${service.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                                        ${service.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : ''}
                                    `}>
                                        <service.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                                    <p className="text-neutral-600 mb-6">{service.description}</p>
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm text-neutral-700">
                                                <CheckCircle size={16} className="text-green-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="text-blue-600 font-bold inline-flex items-center mt-auto">
                                        Comparer les prix <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* PROCESS SECTION */}
            {/* ============================================ */}
            <section className="py-20 bg-neutral-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Trouvez votre installateur en <span className="text-blue-400">3 étapes</span>
                        </h2>
                        <p className="text-neutral-400 text-lg">
                            Un service de mise en relation simple, rapide et gratuit
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Décrivez votre projet",
                                description: "Remplissez le formulaire en 1 minute pour préciser votre besoin.",
                                icon: Calendar
                            },
                            {
                                step: "02",
                                title: "Comparez les offres",
                                description: "Recevez jusqu'à 3 devis d'installateurs locaux certifiés IRVE.",
                                icon: Shield
                            },
                            {
                                step: "03",
                                title: "Choisissez le meilleur",
                                description: "Sélectionnez l'artisan qui vous convient et lancez les travaux.",
                                icon: Zap
                            }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                                        <item.icon size={32} />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-neutral-900 font-bold text-sm">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-neutral-400">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a
                            href="#simulateur"
                            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all"
                        >
                            <Zap size={24} />
                            Comparer les Devis
                        </a>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* REVIEWS SECTION */}
            {/* ============================================ */}
            {/* REVIEWS SECTION */}
            {/* ============================================ */}
            <Reviews site={site} themeColor={themeColor} />

            {/* ============================================ */}
            {/* FAQ SECTION */}
            {/* ============================================ */}
            <FAQ themeColor={themeColor} />

            {/* ============================================ */}
            {/* LOCAL SEO SECTION */}
            {/* ============================================ */}
            {/* ============================================ */}
            {/* LOCAL SEO SECTION */}
            {/* ============================================ */}
            {!isHub && site.quartiers.length > 0 && (
                <section className="py-16 bg-neutral-50 border-t border-neutral-200">
                    <div className="container mx-auto px-4">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                            Installation borne de recharge à {site.city} et environs
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {site.quartiers.map((quartier, i) => (
                                <a
                                    key={i}
                                    href="#simulateur"
                                    className="inline-block bg-white px-4 py-2 rounded-full text-sm text-neutral-700 border border-neutral-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-sm transition-colors cursor-pointer"
                                >
                                    Borne Recharge {quartier}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Internal Linking Mesh */}
            <InternalMesh city={site.city} config={site} />

            {/* ============================================ */}
            {/* FOOTER */}
            {/* ============================================ */}
            <Footer config={site} />

            {/* ============================================ */}
            {/* MOBILE STICKY CTA */}
            {/* ============================================ */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-neutral-900/95 backdrop-blur-lg border-t border-white/10 p-4">
                <div className="flex gap-3">
                    <a
                        href="#simulateur"
                        className={`flex-[2] flex items-center justify-center gap-2 bg-gradient-to-r ${palette.gradient} text-white rounded-xl py-3 font-bold shadow-lg ${palette.shadow}`}
                    >
                        <Zap size={18} />
                        Devis gratuit
                    </a>
                </div>
            </div>
        </div>
    );
}
