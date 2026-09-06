export const revalidate = 86400; // 24h ISR cache
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { getSiteConfig } from "@/lib/sites-config";
import { CITIES } from "@/lib/db";

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "src", "data", "puissances.json");
  if (!fs.existsSync(filePath)) return [];
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  
  const domains = Object.values(CITIES).map(c => c.domain || c.slug);
  const params = [];
  for (const d of data) {
    for (const domain of domains) {
      if (domain) params.push({ domain, slug: d.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { domain: string, slug: string } }) {
  const filePath = path.join(process.cwd(), "src", "data", "puissances.json");
  if (!fs.existsSync(filePath)) return { title: "Page Introuvable" };
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const item = data.find((d: any) => d.slug === params.slug);
  if (!item) return { title: "Page Introuvable" };
  
  return {
    title: item.title,
    description: item.meta_description,
    alternates: {
      canonical: `https://${params.domain}/puissance/${params.slug}`,
    },
  };
}

export default function SeoClusterPage({ params }: { params: { domain: string, slug: string } }) {
  const filePath = path.join(process.cwd(), "src", "data", "puissances.json");
  if (!fs.existsSync(filePath)) return notFound();
  
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const item = data.find((d: any) => d.slug === params.slug);
  if (!item) return notFound();
  
  const siteConfig = getSiteConfig(params.domain) || CITIES['expertbornerecharge.com'];
  const brandName = (siteConfig as any)?.brandName || "Expert Borne Recharge";

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (item.faq || []).map((faqItem: any) => ({
      "@type": "Question",
      "name": faqItem.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faqItem.answer
      }
    }))
  };

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": item.title,
    "description": item.meta_description,
    "author": {
      "@type": "Organization",
      "name": brandName,
      "url": `https://${params.domain}`
    },
    "publisher": {
      "@type": "Organization",
      "name": brandName,
      "logo": {
        "@type": "ImageObject",
        "url": `https://${params.domain}/logo.png`
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Header 
        isHub={params.domain === "expertbornerecharge.com"}
        city={(siteConfig as any).city}
        phoneNumber={(siteConfig as any).phoneNumber}
        variant="default"
        themeColor="blue"
      />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 mt-12">
        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 sm:p-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              {item.h1 || item.title}
            </h1>
            
            <div 
              className="prose prose-lg prose-blue max-w-none text-slate-600 mb-12"
              dangerouslySetInnerHTML={{ __html: item.introduction }}
            />

            {item.price_estimate && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-12 flex items-center justify-between">
                <div>
                  <h3 className="text-blue-900 font-semibold mb-1">Estimation Prix (2026)</h3>
                  <p className="text-blue-700">{item.price_estimate}</p>
                </div>
                {item.rating && (
                  <div className="text-right">
                    <div className="flex text-amber-400 text-xl mb-1">
                      {"★".repeat(Math.round(item.rating))}
                      <span className="text-slate-300">{"★".repeat(5 - Math.round(item.rating))}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600">{item.rating}/5 Avis vérifiés</p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-12">
              {(item.sections || []).map((section: any, idx: number) => (
                <section key={idx}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                    {section.h2}
                  </h2>
                  <div 
                    className="prose prose-lg prose-slate max-w-none text-slate-600"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}
            </div>

            {item.faq && item.faq.length > 0 && (
              <div className="mt-16 pt-10 border-t border-slate-200">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Questions Fréquentes</h2>
                <div className="space-y-6">
                  {item.faq.map((faqItem: any, idx: number) => (
                    <details key={idx} className="group bg-slate-50 rounded-xl p-6 open:bg-blue-50/50 transition-colors">
                      <summary className="text-lg font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                        {faqItem.question}
                        <span className="ml-4 flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-4 text-slate-600 leading-relaxed">
                        {faqItem.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        <section className="mt-16">
          <div className="bg-blue-900 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-800 opacity-50 blur-3xl"></div>
            <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">Obtenez un devis gratuit pour votre projet</h2>
              <p className="text-blue-200 text-lg">Nos installateurs certifiés IRVE vous accompagnent de A à Z. Étude gratuite en 24h.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl relative z-10">
              <LeadForm domain={params.domain} city={(siteConfig as any).city} />
            </div>
          </div>
        </section>
      </main>

      <Footer config={siteConfig as any} />
    </div>
  );
}
