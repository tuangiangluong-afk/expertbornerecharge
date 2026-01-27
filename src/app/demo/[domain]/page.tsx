import SitePage, { generateMetadata as sourceMeta } from "../../[domain]/page";

// Re-export the main component and metadata logic
// This allows viewing the "Standalone Site" version via /demo/[domain] 
// bypassing variables subdomains on Vercel Preview.

export default SitePage;

// OVERRIDE: Force noindex for demo routes
export async function generateMetadata(props: any) {
    const meta = await sourceMeta(props);
    return {
        ...meta,
        title: `[DEMO] ${meta.title}`,
        robots: {
            index: false,
            follow: false,
            googleBot: {
                index: false,
                follow: false
            }
        },
        alternates: {
            canonical: undefined // Remove canonical to avoid confusion or point to real site? Ideally remove.
        }
    };
}
