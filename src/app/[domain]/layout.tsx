import { getSiteConfig } from "@/lib/sites-config";
import { GTMScript } from "@/components/GTMScript";
import { notFound } from "next/navigation";
import Script from "next/script";
import { supabase } from "@/lib/supabase";
import CookieBanner from "@/components/CookieBanner";

export default async function DomainLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ domain: string }>;
}) {
    const resolvedParams = await params;
    const site = getSiteConfig(resolvedParams.domain);

    if (!site) return notFound();

    // Fetch dynamic config from Supabase (allows Admin UI updates)
    const { data: tenant } = await supabase
        .from("tenants")
        .select("ga_id, gtm_id")
        .eq("id", site.slug)
        .maybeSingle() as any;

    // Priority: Database > Config File
    const gaId = tenant?.ga_id || site.ga_id;
    const gtmId = tenant?.gtm_id || site.gtm_id;

    return (
        <>
            <GTMScript gtmId={gtmId} />
            {gaId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${gaId}');
                        `}
                    </Script>
                </>
            )}
            {children}
            <CookieBanner slug={site.slug} cityName={site.city} />
        </>
    );
}
