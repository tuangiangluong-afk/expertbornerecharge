export const revalidate = 86400; // 24h ISR cache
import SitePage, { generateMetadata as sourceMeta } from "../../[domain]/page";

// Re-export the main component and metadata logic
// This allows viewing the "Standalone Site" version via /demo/[domain] 
// bypassing variables subdomains on Vercel Preview.

export default async function DemoPage({ params }: { params: Promise<{ domain: string }> }) {
    const { domain } = await params;
    return <SitePage params={params} basePath={`/demo/${domain}`} />;
}

// OVERRIDE: Force noindex for demo routes
export async function generateMetadata(props: any) {
    const meta = await sourceMeta(props);
    return {
        ...meta,
        title: `[DEMO] ${meta?.title || 'Expert Borne Recharge'}`,
        robots: {
            index: false,
            follow: false,
            googleBot: {
                index: false,
                follow: false
            }
        }
    };
}
