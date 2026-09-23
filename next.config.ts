
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.transparenttextures.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.expertbornerecharge.com' }],
        destination: 'https://expertbornerecharge.com/:path*',
        permanent: true,
      },
      {
        source: '/guides/assurance-borne-recharge-couverture',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/guides/cout-installation-borne-recharge',
        destination: '/blog/prix-installation-borne-recharge',
        permanent: true,
      },
      {
        source: '/guides/prix-installation-borne-recharge',
        destination: '/blog/prix-installation-borne-recharge',
        permanent: true,
      },
      {
        source: '/guides/droit-a-la-prise-borne-recharge',
        destination: '/guides/borne-copropriete-droit-a-la-prise-advenir-2026',
        permanent: true,
      },
      {
        source: '/guides/meilleures-bornes-recharge-2026',
        destination: '/guides/meilleures-bornes-recharge-comparatif-2026',
        permanent: true,
      },
      {
        source: '/guides/wallbox-vs-prise-renforcee',
        destination: '/guides/borne-7kw-vs-11kw-prix-installation',
        permanent: true,
      },
      {
        source: '/devis',
        destination: '/#simulateur',
        permanent: true,
      },
      {
        source: '/simulateur',
        destination: '/#simulateur',
        permanent: true,
      },
      {
        source: '/ville/saint-exupery',
        destination: '/ville/lyon',
        permanent: true,
      },
      {
        source: '/ville/orly',
        destination: '/ville/paris',
        permanent: true,
      },
      {
        source: '/service/installation-borne-entreprise',
        destination: '/solutions',
        permanent: true,
      },
      {
        source: '/service/installation-rapide',
        destination: '/service',
        permanent: true,
      },
      {
        // Ancienne URL accentuée « Citroën » : elle renvoyait un 301 vers une
        // forme encodée qui n'existe pas (404). On la ramène sur la route ASCII.
        source: '/vehicules/citroën',
        destination: '/vehicules/citroen',
        permanent: true,
      },
      {
        source: '/vehicules/citroën/:slug',
        destination: '/vehicules/citroen/:slug',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/openapi.json",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/api/og/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/api/og",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/((?!api|admin|login|_next).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:;"
          }
        ],
      },
    ]
  },
};

// Force restart
export default nextConfig;
