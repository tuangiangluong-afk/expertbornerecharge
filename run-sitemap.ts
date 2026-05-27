import sitemap from './src/app/sitemap';

async function run() {
    const s = await sitemap();
    console.log("Total entries in sitemap:", s.length);
}

run();
