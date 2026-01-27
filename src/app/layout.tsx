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

import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const domain = headersList.get("x-irve-domain") || "expertbornerecharge.com";
  const path = headersList.get("x-irve-path") || "";

  const canonicalUrl = `https://${domain}${path}`;

  return {
    title: {
      template: "%s | Expert Borne Recharge",
      default: "Expert Borne Recharge - Installation Bornes IRVE",
    },
    description: "Installation de bornes de recharge électriques. Réseau d'installateurs certifiés IRVE. Devis gratuit sous 24h.",
    metadataBase: new URL(`https://${domain}`),
    alternates: {
      canonical: path || "/",
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
      siteName: "Expert Borne Recharge",
      locale: "fr_FR",
      type: "website",
      url: `https://${domain}${path}`,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-900 text-neutral-50`}
      >
        {children}
      </body>
    </html>
  );
}
