import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/shared/CustomCursor";
import { AppStoreProvider } from "@/store/appStore";
import { CursorProvider } from "@/store/cursorStore";
import RouteLiquidSync from "@/components/RouteLiquidSync";
import FooterLiquidBackdrop from "@/components/FooterLiquidBackdrop";
import BackHomeToast from "@/components/shared/BackHomeToast";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/** Live loudsrl.com contact tabs use DM Mono */
const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

/** Live footer / UI body copy uses DM Sans */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://loudsrl.com";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LOUD. Digital Product Company.",
    template: "%s | LOUD",
  },
  description:
    "LOUD designs, validates and builds digital products end to end.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "LOUD",
    title: "LOUD. Digital Product Company.",
    description:
      "LOUD designs, validates and builds digital products end to end.",
    images: [
      {
        url: "/logos/logo-white.png",
        width: 25,
        height: 25,
        alt: "LOUD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOUD. Digital Product Company.",
    description:
      "LOUD designs, validates and builds digital products end to end.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/logos/logo-black.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logos/logo-white.png",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/logos/logo-black.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} ${dmMono.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full bg-black text-[#f4f2ec] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <AppStoreProvider>
          <CursorProvider>
            <RouteLiquidSync />
            <FooterLiquidBackdrop />
            <SmoothScrollProvider>
              <CustomCursor />
              <BackHomeToast />
              <ErrorBoundary name="root">
                <PageLoader>{children}</PageLoader>
              </ErrorBoundary>
            </SmoothScrollProvider>
          </CursorProvider>
        </AppStoreProvider>
      </body>
    </html>
  );
}
