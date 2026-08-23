import Script from "next/script";
import { headers } from "next/headers";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getCurrentYearSEO } from "@/lib/date";
import StructuredData from "@/components/seo/StructuredData";
import AttributionTracker from "@/components/AttributionTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const canonicalDomain = headersList.get("x-irve-canonical-domain") || "expertbornerecharge.com";
  const path = headersList.get("x-irve-path") || "";
  const baseUrl = `https://${canonicalDomain}`;

  return {
  title: {
    template: `%s | Expert Borne Recharge ${getCurrentYearSEO()}`,
    default: `Expert Borne Recharge - Prix & Installation ${getCurrentYearSEO()}`,
  },
  description: "Installation de bornes de recharge électriques. Réseau d'installateurs certifiés IRVE. Devis gratuit sous 24h.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: `${baseUrl}${path}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Expert Borne Recharge - Installation Bornes IRVE",
    description: "Installation de bornes de recharge électriques. Réseau d'installateurs certifiés IRVE. Devis gratuit sous 24h.",
    siteName: "Expert Borne Recharge",
    locale: "fr_FR",
    type: "website",
    url: `${baseUrl}${path}`,
    images: [
      {
        url: `${baseUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Expert Borne Recharge - Installation bornes de recharge IRVE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Borne Recharge - Installation Bornes IRVE",
    description: "Installation de bornes de recharge électriques. Réseau d'installateurs certifiés IRVE. Devis gratuit.",
    images: [`${baseUrl}/images/og-image.png`],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.png",
    apple: "/icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon.ico",
      }
    ]
  },
  };
}export const viewport: Viewport = {
  themeColor: "#1d4ed8",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Summary" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MLCNS53L');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "y70kvo9dkx");`,
          }}
        />
        {/* End Microsoft Clarity */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-900 text-neutral-50`}
      >
        {/* AnswerShaper Local Tag */}
        <Script src="https://answershaper.com/api/v1/m2m/local-tag/13.js" strategy="lazyOnload" defer />

        <StructuredData />
        <GoogleAnalytics GA_MEASUREMENT_ID="G-3S88LL4FC5" />
        <AttributionTracker />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MLCNS53L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
