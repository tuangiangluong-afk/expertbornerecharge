import { getCityByCleanSlug, CITIES } from "@/lib/db";
import { getSpintaxContent } from "@/lib/spintax";
import { Phone, CheckCircle, Zap, TrendingDown, Home, Building2, Briefcase, MapPin, Award, ArrowRight, Shield, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import SchemaJSON from "@/components/SchemaJSON";
import Reviews from "@/components/Reviews";
import Logo from "@/components/Logo";
import { InternalMesh } from "@/components/InternalMesh";
import { Footer } from "@/components/Footer";
import { slugify } from "@/lib/slugify";

// Dynamically generate for ALL cities (Owned + Partner)
export async function generateStaticParams() {
    return Object.values(CITIES).map(city => ({ slug: slugify(city.city) }));
}


// ============================================
// METADATA
// ============================================

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) {
        return {};
    }

    const cleanSlug = slugify(site.city);

    // Dynamic Meta via Spintax
    const spintaxTitle = getSpintaxContent("meta_title", site, 'HUB');
    const spintaxDesc = getSpintaxContent("meta_description", site, 'HUB');

    return {
        title: spintaxTitle,
        description: spintaxDesc,
        alternates: {
            canonical: `https://expertbornerecharge.com/ville/${cleanSlug}`,
        },
        openGraph: {
            title: spintaxTitle,
            description: spintaxDesc,
            url: `https://expertbornerecharge.com/ville/${cleanSlug}`,
            siteName: site.name,
            images: [
                {
                    url: site.heroImage,
                    width: 1200,
                    height: 630,
                    alt: `Installation borne de recharge à ${site.city}`
                }
            ],
            type: "website",
        }
    };
}

// ============================================
// PAGE COMPONENT
// ============================================

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) {
        return notFound();
    }

    // Spintax Generation
    const h1Content = getSpintaxContent("hero_title", site, 'HUB');
    const subtitleContent = getSpintaxContent("hero_subtitle", site, 'HUB');
    const badgeContent = getSpintaxContent("hero_badge", site, 'HUB');
    const introContent = getSpintaxContent("intro_p1", site, 'HUB');
    const ctaPrimary = getSpintaxContent("cta_primary", site, 'HUB');

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white">
            {/* ============================================ */}
            {/* NAVIGATION - Theme Adaptive */}
            {/* ============================================ */}
            <Header
                isHub={true}
                city={site.city}
                phoneNumber={site.phoneNumber}
                variant="default" // Force Light Default
            />

            <SchemaJSON type="LocalBusiness" site={site} />

            {/* ============================================ */}
            {/* HERO SECTION - Light Tech-Trust Style */}
            {/* ============================================ */}
            <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-24 overflow-hidden bg-slate-50">
                {/* Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/95 via-white/80 to-white" />
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
                            <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold mb-6 border border-blue-200 bg-blue-50 text-blue-700">
                                <CheckCircle size={16} className="mr-2" />
                                <span dangerouslySetInnerHTML={{ __html: badgeContent }} />
                            </div>

                            {/* H1 - COMPARATOR FOCUS (Distinct from Local Site) */}
                            {/* NEUILLY PREMIUM OVERRIDE */}
                            {slugify(site.city) === 'neuilly-sur-seine' ? (
                                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
                                    Installation de Bornes de Recharge <span className="text-blue-600">Premium</span> à Neuilly-sur-Seine <span className="block text-2xl mt-2 font-normal text-slate-500">(Copropriétés & Hôtels Particuliers)</span>
                                </h1>
                            ) : (
                                <h1
                                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900"
                                    dangerouslySetInnerHTML={{ __html: h1Content }}
                                />
                            )}

                            {/* Subtitle - COMPARATOR FOCUS */}
                            <div
                                className="text-xl mb-8 max-w-xl mx-auto lg:mx-0 text-slate-600"
                                dangerouslySetInnerHTML={{ __html: introContent }}
                            />

                            {/* NEUILLY NEIGHBORHOODS REASSURANCE */}
                            {slugify(site.city) === 'neuilly-sur-seine' && (
                                <p className="text-sm text-slate-500 mb-8 italic border-l-4 border-blue-200 pl-4">
                                    Intervention rapide secteur <strong>Sablons, Saint-James, Bagatelle, Pont de Neuilly</strong>.
                                </p>
                            )}

                            {/* Certifications */}
                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                                {(site.features || ["Qualifelec", "IRVE"]).slice(0, 3).map((feat, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm text-slate-700 border border-slate-200 shadow-sm"
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
                                    className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all"
                                >
                                    <Zap size={24} />
                                    {ctaPrimary}
                                </a>

                                {/* ANTI-SYNDIC CTA - PREMIUM ONLY */}
                                {slugify(site.city) === 'neuilly-sur-seine' && (
                                    <div className="mt-4 sm:mt-0 p-4 bg-purple-50 rounded-xl border border-purple-100 max-w-sm">
                                        <p className="text-sm text-purple-900 font-medium mb-1">
                                            <strong>Locataire ou Propriétaire en Copropriété ?</strong>
                                        </p>
                                        <p className="text-xs text-purple-700">
                                            Nous gérons le dossier administratif et la relation avec votre Syndic. Dossier technique remis sous 48h.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Lead Form - STRATEGIC PLACEMENT HIGH CONVERSION */}
                        <div className="w-full max-w-md mx-auto relative z-30">
                            <div id="simulateur" className="bg-white rounded-3xl shadow-2xl shadow-blue-900/20 overflow-hidden border border-neutral-100 scroll-mt-48">
                                <div className="p-1 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        {/* DYNAMIC FORM TITLE INJECTION */}
                                        <h2 className="text-lg font-bold text-neutral-900">
                                            {slugify(site.city) === 'neuilly-sur-seine' ? (
                                                <>Étude de faisabilité offerte pour votre immeuble à <span className="text-blue-600">{site.city}</span></>
                                            ) : (
                                                "Testez votre éligibilité"
                                            )}
                                        </h2>
                                        <p className="text-sm text-neutral-500">Réponse immédiate • Gratuit • Sans engagement</p>
                                    </div>
                                    <LeadForm
                                        city={site.city}
                                        domain={site.domain}
                                        targetType={site.targetType || 'MIXED'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-lg text-neutral-600 mb-8">
                            Expert Borne Recharge est la <strong>plateforme de référence</strong> pour comparer les installateurs à {site.city}.
                            Contrairement à un artisan unique, nous mettons en concurrence notre réseau d'électriciens locaux pour vous garantir le meilleur rapport qualité/prix.
                            Que vous soyez en maison individuelle, en copropriété ou gestionnaire de flotte, comparez avant de signer.
                        </p>

                        {/* PARTNER LINKING (SEO Safe Hierarchy - Double Ranking Strategy) */}
                        {site.domain && site.domain.includes(site.slug.replace('bornerecharge', '')) && (
                            <div className="inline-block bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                                <p className="text-sm text-blue-800 mb-2 font-semibold">
                                    Vous préférez un service 100% dédié à {site.city} ?
                                </p>
                                <a
                                    href={`https://${site.domain}`}
                                    className="flex items-center gap-2 text-blue-600 font-bold hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Découvrez notre portail spécialisé {site.city} : {site.domain} <ArrowRight size={16} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* AIDES SECTION (Blue/White) */}
            {/* ============================================ */}
            <section className="py-20 bg-blue-600 text-white">
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
            {/* COST COMPARATOR (White/Green/Red) */}
            {/* ============================================ */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-bold mb-4">
                            <TrendingDown size={18} />
                            Économies garanties
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Essence vs Recharge à domicile
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Rechargez votre véhicule à la maison et économisez jusqu'à <strong>1 500€ par an</strong>
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200">
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
            {/* SERVICES GRID (Light Tech) */}
            {/* ============================================ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            Comparez les offres pour chaque type de projet
                        </h2>
                        <p className="text-slate-600 text-lg">
                            Maison, copropriété ou entreprise : recevez des devis adaptés à votre configuration
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Home,
                                title: "Maison Individuelle",
                                description: "Installation rapide en 48h. Wallbox 7 à 22kW. Garage ou extérieur.",
                                features: ["Installation en 48h", "Wallbox garantie 2 ans", "Raccordement tableau"],
                                color: "blue",
                                href: "/solutions/maison"
                            },
                            {
                                icon: Building2,
                                title: "Copropriété",
                                description: "Solution collective ou individuelle. Accompagnement AG. Prime ADVENIR.",
                                features: ["Étude technique gratuite", "Présentation en AG", "Jusqu'à 960€ d'aide"],
                                color: "purple",
                                highlight: true,
                                href: "/solutions/copropriete"
                            },
                            {
                                icon: Briefcase,
                                title: "Entreprise / Flotte",
                                description: "Bornes pour collaborateurs ou flotte. Facturation intégrée. Supervision.",
                                features: ["Multi-bornes", "Gestion à distance", "Facturation automatique"],
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
                                            : 'border-slate-200 bg-white hover:border-blue-500 hover:shadow-xl group-hover:scale-[1.02]'
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
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                                    <p className="text-slate-600 mb-6">{service.description}</p>
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                                                <CheckCircle size={16} className="text-green-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="text-blue-600 font-bold inline-flex items-center mt-auto">
                                        En savoir plus <ArrowRight size={16} className="ml-2" />
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
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Votre borne installée en <span className="text-blue-400">3 étapes</span>
                        </h2>
                        <p className="text-neutral-400 text-lg">
                            Un processus simple et rapide, de la demande à la recharge
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Demande de devis",
                                description: "Remplissez le formulaire. Un conseiller vous rappelle sous 24h.",
                                icon: Calendar
                            },
                            {
                                step: "02",
                                title: "Visite technique",
                                description: "Un installateur partenaire certifié IRVE évalue votre installation.",
                                icon: Shield
                            },
                            {
                                step: "03",
                                title: "Installation",
                                description: "Pose de votre borne par un installateur certifié IRVE.",
                                icon: Zap
                            }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                                        <item.icon size={32} />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
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
                            Comparer les devis gratuits
                        </a>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* REVIEWS SECTION */}
            {/* ============================================ */}
            <Reviews site={site as any} />

            {/* ============================================ */}
            {/* FAQ SECTION */}
            {/* ============================================ */}
            <FAQ city={site.city} />


            {/* ============================================ */}
            {/* LOCAL SEO SECTION */}
            {/* ============================================ */}
            {site.neighborhoods.length > 0 && (
                <section className="py-16 bg-slate-50 border-t border-slate-200">
                    <div className="container mx-auto px-4">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">
                            Installation borne de recharge à {site.city} et environs
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {site.neighborhoods.map((quartier, i) => (
                                <a
                                    key={i}
                                    href="#simulateur"
                                    className="bg-white px-4 py-2 rounded-full text-sm text-slate-700 border border-slate-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-sm transition-colors cursor-pointer"
                                >
                                    Borne recharge {quartier}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Internal Linking Mesh - Contextual */}
            <InternalMesh city={site.city} config={site} />

            <Footer config={site} />

            {/* ============================================ */}
            {/* MOBILE STICKY CTA */}
            {/* ============================================ */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-4">
                <div className="flex gap-3">
                    <a
                        href="#simulateur"
                        className="flex-[2] flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3 font-bold shadow-lg shadow-blue-500/30"
                    >
                        <Zap size={18} />
                        Devis gratuit
                    </a>
                </div>
            </div>
        </div>
    );
}
