import { NextRequest, NextResponse } from "next/server";

const AFFILIATE_LINKS: Record<string, string> = {
  "tesla-wall-connector": "https://www.manomano.fr/recherche/tesla+wall+connector?referer_id=expertbornerecharge",
  "schneider-charge": "https://www.manomano.fr/recherche/schneider+charge?referer_id=expertbornerecharge",
  "wallbox-pulsar-plus": "https://www.amazon.fr/dp/B08J4F8R7Z?tag=expertborne-21",
  "wallbox-pulsar-max": "https://www.manomano.fr/recherche/wallbox+pulsar+max?referer_id=expertbornerecharge",
  "hager-witty-start": "https://www.manomano.fr/recherche/hager+witty?referer_id=expertbornerecharge",
  "hager-witty-solar": "https://www.manomano.fr/recherche/hager+witty+solaire?referer_id=expertbornerecharge",
  "legrand-green-up-one": "https://www.manomano.fr/recherche/legrand+green+up+one?referer_id=expertbornerecharge",
  "prise-green-up": "https://www.amazon.fr/dp/B00EDLQ02Y?tag=expertborne-21",
  "myenergi-zappi": "https://www.manomano.fr/recherche/zappi+myenergi?referer_id=expertbornerecharge",
  "abb-terra-ac": "https://www.manomano.fr/recherche/abb+terra+ac?referer_id=expertbornerecharge",
  "autel-maxicharger": "https://www.amazon.fr/dp/B0B5T6WQQM?tag=expertborne-21",
  "evbox-elvi": "https://www.manomano.fr/recherche/evbox+elvi?referer_id=expertbornerecharge",
  "alfen-eve-single": "https://www.manomano.fr/recherche/alfen+eve+single?referer_id=expertbornerecharge",
  "sma-ev-charger": "https://www.manomano.fr/recherche/sma+ev+charger?referer_id=expertbornerecharge"
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const target = AFFILIATE_LINKS[slug];

  if (!target) {
    return NextResponse.redirect(new URL("/marques", request.url), 302);
  }

  // 307 Temporary Redirect with no-store and no-referrer header
  return NextResponse.redirect(target, {
    status: 307,
    headers: {
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "Cache-Control": "no-store, max-age=0"
    }
  });
}
