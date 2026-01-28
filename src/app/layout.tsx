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
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const domain = headersList.get("x-irve-domain") || "expertbornerecharge.com";
  const path = headersList.get("x-irve-path") || "";
  const year = getCurrentYearSEO();

  const canonicalUrl = `https://${domain}${path}`;

  return {
    title: {
      template: `%s | Expert Borne Recharge ${year}`,
      default: `Expert Borne Recharge - Prix & Installation ${year}`,
    },
    description: "Installation de bornes de recharge électriques. Réseau d'installateurs certifiés IRVE. Devis gratuit sous 24h.",
    metadataBase: new URL(`https://${domain}`),
    alternates: {
      canonical: `${path.toLowerCase()}` || "/",
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
      url: `https://${domain}${path}`,
      images: [
        {
          url: `https://${domain}/images/og-image.png`,
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
      images: [`https://${domain}/images/og-image.png`],
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
}

export const viewport: Viewport = {
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-900 text-neutral-50`}
      >
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
