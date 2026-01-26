import SitePage, { generateMetadata as sourceMeta } from "../../[domain]/page";

// Re-export the main component and metadata logic
// This allows viewing the "Standalone Site" version via /demo/[domain] 
// bypassing variables subdomains on Vercel Preview.

export default SitePage;
export const generateMetadata = sourceMeta;
