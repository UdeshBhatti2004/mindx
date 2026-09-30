import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space" 
});

// ---------------------------------------------------------------------------
// ⚠️  REPLACE with your real production domain (no trailing slash).
// This single constant feeds metadataBase, canonical URLs, OG/Twitter tags,
// sitemap.ts, robots.ts and the JSON-LD block below.
// ---------------------------------------------------------------------------
const SITE_URL = "https://www.mind-x.co.in";

const SITE_NAME = "mindX Institute";
const TITLE = "mindX Institute | Coaching Classes & Skill Courses in Rajkot";
const DESCRIPTION =
  "mindX Institute in Rajkot, Gujarat offers academic coaching for Standards 1–9 (English Medium), Tally with GST, CCC digital literacy, and coding classes for kids. Learn, build, grow.";
const KEYWORDS = [
  "mindX Institute",
  "coaching classes Rajkot",
  "tuition classes Rajkot",
  "Tally with GST course Rajkot",
  "CCC course Rajkot",
  "coding classes for kids Rajkot",
  "Standard 1 to 9 tuition Rajkot",
  "English medium tuition Rajkot Gujarat",
  "computer classes Rajkot",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | mindX Institute",
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "mindX Institute" }],
  category: "education",

  alternates: {
    canonical: "/",
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

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "mindX Institute — Learn, Build, Grow",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/mindx-logo.png",
  },

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD structured data — tells Google exactly what mindX is, where it is,
// and what it teaches. Renders as inert <script> markup, zero runtime cost.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "mindX Institute",
  alternateName: "mindX",
  url: SITE_URL,
  logo: `${SITE_URL}/mindx-logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description: DESCRIPTION,
  email: "mindxyourxfactor@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rajkot",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "City",
    name: "Rajkot",
  },
  sameAs: [
    // ⚠️ Add real social profile URLs here once they exist
    // "https://www.instagram.com/mindxinstitute",
    // "https://www.linkedin.com/company/mindxinstitute",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "mindX Institute Programs",
    itemListElement: [
      {
        "@type": "Course",
        name: "Standards 1 to 9 (English Medium)",
        description:
          "Comprehensive academic support for young minds, with conceptual clarity, homework guidance, and core subject mastery.",
        provider: { "@type": "EducationalOrganization", name: "mindX Institute" },
      },
      {
        "@type": "Course",
        name: "Tally with GST Course",
        description:
          "Financial accounting from scratch — ledger creation, inventory management, taxation, and GST filing.",
        provider: { "@type": "EducationalOrganization", name: "mindX Institute" },
      },
      {
        "@type": "Course",
        name: "CCC Course",
        description:
          "Certified digital literacy covering operating systems, office automation, internet navigation, and IT skills.",
        provider: { "@type": "EducationalOrganization", name: "mindX Institute" },
      },
      {
        "@type": "Course",
        name: "Coding for Kids (Scratch)",
        description:
          "Introduces children to logic and computer science through visual, block-based programming.",
        provider: { "@type": "EducationalOrganization", name: "mindX Institute" },
      },
    ],
  },
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#080808] font-sans text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}