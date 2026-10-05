import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { withBasePath } from "@/lib/portfolio/paths";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  // NOTE: We intentionally do NOT set `metadataBase` here. When set, Next.js
  // resolves relative icon/manifest URLs against it — which breaks asset
  // loading on GitHub Pages project URLs (https://<user>.github.io/<repo>/).
  // Without metadataBase, Next.js prefixes `basePath` correctly.
  title: {
    default: siteConfig.seo.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  keywords: [
    "Mahmudul Hasan",
    "Software Developer",
    "AI Developer",
    "Computer Science",
    "United International University",
    "UIU",
    "Bangladesh",
    "Dhaka",
    "Portfolio",
    "Prohory",
    "DebugDNA",
    "CareerOS",
    "UIU Connect",
    "AI",
    "Full Stack",
    "Cybersecurity",
    "Research",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  // We use manual <link> tags in <head> below instead of `metadata.icons` /
  // `metadata.manifest` because Next.js does NOT auto-prefix `basePath` to
  // these metadata URLs in static export. Manual links with withBasePath()
  // work correctly on both project pages and user pages.
  alternates: {
    canonical: siteConfig.seo.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.seo.url,
    siteName: siteConfig.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
    creator: "@mahmudul286",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Manually prefix basePath — Next.js metadata API does not auto-prefix
            these URLs in static export mode. */}
        <link rel="icon" href={withBasePath("/favicon.svg")} type="image/svg+xml" />
        <link rel="manifest" href={withBasePath("/manifest.webmanifest")} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
