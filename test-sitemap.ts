import { SEO_SERVICES } from "./src/lib/seo-data";
import { getAllGuides } from "./src/lib/mdx";
import { getAllVehicles } from "./src/data/vehicles";
import { getHubConfig, SITES } from "./src/lib/sites-config";
import { brands } from "./src/data/brands";

const guides = getAllGuides();
const vehicles = getAllVehicles();
const uniqueSites = new Map();
Object.values(SITES).forEach(site => {
    if (site.slug !== 'home' && site.slug !== 'expertbornerecharge.com') {
        uniqueSites.set(site.slug, site);
    }
});
const numCities = uniqueSites.size;

console.log({
    static: 11,
    services: SEO_SERVICES.length,
    guides: guides.length,
    vehicles: vehicles.length,
    cities: numCities,
    b2b: numCities * 2,
    cityBrands: numCities * brands.length
});
