import type { Metadata } from "next";

import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

import SmoothScroll from "../components/SmoothScroll";

import ChatWidget from "../components/ChatWidget";

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
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

// ---------------------------------------------------------------------------
// Production domain
// ---------------------------------------------------------------------------

const SITE_URL = "https://www.mind-x.co.in";

const SITE_NAME = "mindx";

const TITLE = "mindx | Coaching & Computer Classes in Rajkot";

const DESCRIPTION =
  "mindx is a coaching and computer institute in Rajkot offering academic coaching for Standards 1–9, computer courses, Tally with GST, CCC, and coding classes for kids.";

const KEYWORDS = [
  "mindx",
  "mindx Rajkot",
  "coaching classes Rajkot",
  "computer classes Rajkot",
  "Tally with GST course Rajkot",
  "CCC course Rajkot",
  "coding classes for kids Rajkot",
  "academic coaching Rajkot",
  "English medium coaching Rajkot",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: "%s | mindx",
  },

  description: DESCRIPTION,

  keywords: KEYWORDS,

  applicationName: SITE_NAME,

  authors: [{ name: "mindx" }],

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
        alt: "mindx — Learn, Build, Grow",
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
    // Keep the favicon separate from the main brand logo.
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",

    // Apple icon uses the main mindx brand logo.
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

// ---------------------------------------------------------------------------
// JSON-LD structured data
// ---------------------------------------------------------------------------

const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    // -----------------------------------------------------------------------
    // Website identity
    // -----------------------------------------------------------------------
    {
      "@type": "WebSite",
      name: "mindx",
      url: SITE_URL,
    },

    // -----------------------------------------------------------------------
    // Organization identity
    // -----------------------------------------------------------------------
    {
      "@type": "EducationalOrganization",

      name: "mindx",

      alternateName: "mindx Institute",

      url: SITE_URL,

      // Main brand logo used by the website/navbar.
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
        // Add real social profile URLs here once they exist.
      ],

      hasOfferCatalog: {
        "@type": "OfferCatalog",

        name: "mindx Programs",

        itemListElement: [
          {
            "@type": "Course",

            name: "Standards 1 to 9 (English Medium)",

            description:
              "Comprehensive academic support for young minds, with conceptual clarity, homework guidance, and core subject mastery.",

            provider: {
              "@type": "EducationalOrganization",
              name: "mindx",
            },
          },

          {
            "@type": "Course",

            name: "Tally with GST Course",

            description:
              "Financial accounting from scratch — ledger creation, inventory management, taxation, and GST filing.",

            provider: {
              "@type": "EducationalOrganization",
              name: "mindx",
            },
          },

          {
            "@type": "Course",

            name: "CCC Course",

            description:
              "Digital literacy course covering computer fundamentals, office applications, internet usage, and essential IT skills.",

            provider: {
              "@type": "EducationalOrganization",
              name: "mindx",
            },
          },

          {
            "@type": "Course",

            name: "Coding for Kids (Scratch)",

            description:
              "Introduces children to logic and computer science through visual, block-based programming.",

            provider: {
              "@type": "EducationalOrganization",
              name: "mindx",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col bg-[#080808] font-sans text-white">
        <SmoothScroll>
          {children}
          <ChatWidget />
        </SmoothScroll>
      </body>
    </html>
  );
}