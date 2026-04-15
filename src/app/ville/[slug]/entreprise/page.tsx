import { getCityByCleanSlug, CITIES } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, CheckCircle, FileCheck, TrendingUp, Globe, Zap, BarChart3, Award, Shield, ArrowRight } from "lucide-react";
import LeadFormPro from "@/components/LeadFormPro";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { slugify } from "@/lib/slugify";
import { InternalMesh } from "@/components/InternalMesh";
import SchemaJSON from "@/components/SchemaJSON";

// ========================================
// PSEO B2B — Entreprise x Ville
// /ville/lyon/entreprise
// ========================================

export async function generateStaticParams() {
    const uniqueCities = new Map<string, boolean>();
    return Object.values(CITIES)
        .filter(city => {
            const slug = slugify(city.city);
            if (uniqueCities.has(slug)) return false;
            uniqueCities.set(slug, true);
            return city.slug !== 'home';
        })
        .map(city => ({ slug: slugify(city.city) }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) return {};

    const title = `Bornes de Recharge Entreprise ${site.city} | Audit Flotte & Loi LOM`;
    const description = `Installation bornes de recharge pour entreprises et flottes à ${site.city}. Conformité Loi LOM, aides ADVENIR, supervision intelligente. Audit d'infrastructure gratuit.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            siteName: "Expert Borne Recharge",
            locale: "fr_FR",
            type: "website",
        },
        robots: { index: true, follow: true },
    };
}

export default async function EntrepriseCityPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) return notFound();

    const cityName = site.city;
    const dept = site.department || "";
    const neighborhoods = site.neighborhoods || [];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            <SchemaJSON type="LocalBusiness" site={site} />

            {/* ============================== */}
            {/* HERO — B2B Entreprise Tone */}
            {/* ============================== */}
            <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-28 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Left: Content + Form */}
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <div className="text-center lg:text-left space-y-6">
                                {/* Breadcrumb */}
                                <nav className="flex items-center gap-2 text-sm text-slate-500 justify-center lg:justify-start">
                                    <Link href="/" className="hover:text-blue-600 transition">Accueil</Link>
                                    <span>/</span>
                                    <Link href={`/ville/${resolvedParams.slug}`} className="hover:text-blue-600 transition">{cityName}</Link>
                                    <span>/</span>
                                    <span className="text-emerald-700 font-bold">Entreprise</span>
                                </nav>

                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800 border border-emerald-200">
                                        <Briefcase size={16} className="mr-2" />
                                        Solutions Pro & Flottes
                                    </div>
                                    <div className="inline-flex items-center rounded-full bg-amber-100 px-4 py-1.5 text-sm font-bold text-amber-800 border border-amber-200">
                                        <FileCheck size={16} className="mr-2" />
                                        Conformité Loi LOM
                                    </div>
                                </div>

                                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                    Bornes de recharge <span className="text-emerald-600">entreprise</span> à {cityName}
                                </h1>

                                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Électrifiez votre parking professionnel à {cityName} {dept ? `(${dept})` : ''}.
                                    De la PME au grand groupe, respectez la Loi LOM, valorisez votre RSE
                                    et offrez la recharge à vos collaborateurs et visiteurs.
                                </p>
                            </div>

                            {/* LEAD FORM PRO — B2B Entreprise */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left" id="audit">
                                <LeadFormPro
                                    city={cityName}
                                    domain="expertbornerecharge.com"
                                    segment="ENTREPRISE"
                                />
                            </div>
                        </div>

                        {/* Right: Trust + Stats */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full space-y-6">
                            <div className="relative h-[320px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/10 border border-slate-100 bg-white p-2">
                                <div className="relative w-full h-full rounded-xl overflow-hidden bg-emerald-100">
                                    <Image
                                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=3540&auto=format&fit=crop"
                                        alt={`Parking entreprise borne recharge ${cityName}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl flex items-center gap-3">
                                            <div className="bg-emerald-100 p-2.5 rounded-full shrink-0">
                                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">Conformité Loi LOM</div>
                                                <div className="text-sm text-slate-500">20% des places pré-équipées</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Stats B2B */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-2xl font-black text-emerald-700">20%</div>
                                    <div className="text-[10px] text-slate-500 mt-1">Places obligatoires (LOM)</div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-2xl font-black text-blue-700">2 200€</div>
                                    <div className="text-[10px] text-slate-500 mt-1">Aide ADVENIR/borne</div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-2xl font-black text-amber-600">100%</div>
                                    <div className="text-[10px] text-slate-500 mt-1">TVA récupérable</div>
                                </div>
                            </div>

                            {/* Sectors */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className="font-bold text-sm text-slate-900 mb-3">Secteurs que nous équipons à {cityName}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Bureaux', 'Hôtels', 'Commerces', 'Logistique', 'Collectivités', 'Santé'].map(sector => (
                                        <span key={sector} className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-100">
                                            {sector}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div className="flex flex-wrap items-center gap-3 justify-center">
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
                                    <Award size={20} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-slate-900 text-sm">Qualifelec IRVE</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
                                    <Shield size={20} className="text-green-500" />
                                    <span className="font-bold text-slate-900 text-sm">Garantie Décennale</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================== */}
            {/* CONTENT — SEO B2B Entreprise */}
            {/* ============================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <article className="prose prose-lg prose-slate max-w-none">
                        <h2>Pourquoi installer des bornes en entreprise à {cityName} ?</h2>
                        <p>
                            L&apos;électrification des flottes est en cours à {cityName}. Les entreprises qui ne s&apos;équipent pas
                            aujourd&apos;hui risquent de ne plus être en conformité avec la <strong>Loi LOM</strong> (Loi d&apos;Orientation
                            des Mobilités) qui impose d&apos;équiper les parkings de plus de 20 places.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 not-prose my-10">
                            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <FileCheck className="text-emerald-600 mb-3" size={28} />
                                <h4 className="font-bold text-slate-900 mb-2">Conformité LOM</h4>
                                <p className="text-xs text-slate-600">
                                    Obligation d&apos;équiper 20% des places pour les parkings &gt; 20 places (bâtiments tertiaires).
                                    Sanctions possibles en cas de non-respect.
                                </p>
                            </div>
                            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <TrendingUp className="text-emerald-600 mb-3" size={28} />
                                <h4 className="font-bold text-slate-900 mb-2">Avantages Fiscaux</h4>
                                <p className="text-xs text-slate-600">
                                    Amortissement accéléré, TVA 100% récupérable sur l&apos;électricité,
                                    primes ADVENIR jusqu&apos;à 2 200€/borne.
                                </p>
                            </div>
                            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <Globe className="text-emerald-600 mb-3" size={28} />
                                <h4 className="font-bold text-slate-900 mb-2">Image RSE</h4>
                                <p className="text-xs text-slate-600">
                                    Attirez les talents à {cityName}. La recharge au travail est
                                    l&apos;avantage le plus demandé par les collaborateurs en VE.
                                </p>
                            </div>
                        </div>

                        <h2>Types de bornes pour les entreprises à {cityName}</h2>
                        <p>
                            Nos experts à {cityName} dimensionnent l&apos;infrastructure selon votre usage :
                        </p>
                        <ul>
                            <li><strong>Bornes AC 7 à 22 kW :</strong> Pour les collaborateurs qui restent la journée. Idéal pour les flottes de fonction et les salariés.</li>
                            <li><strong>Bornes DC 50 kW+ :</strong> Pour les visiteurs, commerciaux de passage ou véhicules logistiques. Recharge 80% en 30-40 min.</li>
                        </ul>

                        <h2>Supervision et Monétisation</h2>
                        <p>
                            Installer ne suffit pas. Nos solutions pour les entreprises de {cityName} incluent :
                        </p>
                        <ul className="list-none pl-0 space-y-2">
                            <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500 shrink-0" /> <span><strong>Contrôle d&apos;accès :</strong> Badge RFID pour les collaborateurs vs accès public visiteurs.</span></li>
                            <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500 shrink-0" /> <span><strong>Refacturation :</strong> Monétisez l&apos;énergie pour les visiteurs. Revenus additionnels.</span></li>
                            <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500 shrink-0" /> <span><strong>Smart Charging :</strong> Lissage de la consommation pour éviter les pics et les surcoûts.</span></li>
                            <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500 shrink-0" /> <span><strong>Reporting RSE :</strong> Tableau de bord CO₂ évité pour votre rapport extra-financier.</span></li>
                        </ul>

                        <h2>Les aides ADVENIR pour les professionnels à {cityName}</h2>
                        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
                            <div className="border border-slate-200 rounded-xl p-5 text-center bg-white shadow-sm">
                                <div className="text-sm text-slate-500">Parking Privé (Flotte)</div>
                                <div className="text-3xl font-bold text-emerald-700 my-2">Jusqu&apos;à 600€</div>
                                <div className="text-xs text-slate-400">Par point de charge</div>
                            </div>
                            <div className="border border-slate-200 rounded-xl p-5 text-center bg-white shadow-sm">
                                <div className="text-sm text-slate-500">Parking Ouvert au Public</div>
                                <div className="text-3xl font-bold text-emerald-700 my-2">Jusqu&apos;à 2 200€</div>
                                <div className="text-xs text-slate-400">Par point de charge</div>
                            </div>
                        </div>

                        {neighborhoods.length > 0 && (
                            <>
                                <h2>Zones d&apos;intervention à {cityName}</h2>
                                <p>
                                    Nos installateurs professionnels interviennent sur toute l&apos;agglomération de {cityName} :
                                    <strong> {neighborhoods.join(', ')}</strong>. Multi-sites ? Nous déployons sur l&apos;ensemble de vos implantations.
                                </p>
                            </>
                        )}
                    </article>

                    {/* CTA bottom */}
                    <div className="mt-12 bg-emerald-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <BarChart3 /> Projet multi-sites à {cityName} ?
                            </h3>
                            <p className="text-emerald-200">
                                Nous auditons l&apos;ensemble de vos sites en France avec un interlocuteur unique.
                                Audit technique et financier gratuit pour les flottes de +10 véhicules.
                            </p>
                        </div>
                        <a
                            href="#audit"
                            className="bg-white text-emerald-900 font-bold py-3 px-6 rounded-xl hover:bg-emerald-50 transition shadow-lg whitespace-nowrap flex items-center gap-2"
                        >
                            Demander l&apos;audit gratuit <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            <InternalMesh city={cityName} config={site} />
            <Footer config={site} />
        </div>
    );
}
