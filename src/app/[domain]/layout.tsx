import { getCity } from "@/lib/db";
import { GTMScript } from "@/components/GTMScript";
import { notFound } from "next/navigation";
import Script from "next/script";
import { supabase } from "@/lib/supabase";

export default async function DomainLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ domain: string }>;
}) {
    const resolvedParams = await params;
    const city = getCity(resolvedParams.domain);

    if (!city) return notFound();

    // Fetch dynamic config from Supabase (allows Admin UI updates)
    const { data: tenant } = await supabase
        .from("tenants")
        .select("ga_id, gtm_id")
        .eq("id", city.slug)
        .maybeSingle();

    // Priority: Database > Config File
    const gaId = tenant?.ga_id || city.ga_id;
    const gtmId = tenant?.gtm_id; // db.ts doesn't have gtm_id typed yet, but we can assume DB is source of truth

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
        </>
    );
}
