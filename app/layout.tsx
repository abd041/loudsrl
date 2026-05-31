import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import PageLoader from "@/components/PageLoader";
import CookieConsent from "@/components/CookieConsent";
import CustomCursor from "@/components/shared/CustomCursor";
import { AppStoreProvider } from "@/store/appStore";
import { CursorProvider } from "@/store/cursorStore";
import RouteLiquidSync from "@/components/RouteLiquidSync";
import BackHomeToast from "@/components/shared/BackHomeToast";

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

export const metadata: Metadata = {
  title: "LOUD. Digital Product Company.",
  description:
    "LOUD designs, validates and builds digital products end to end.",
  icons: {
    icon: [
      {
        url: "/favicon-light.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-touch-icon-light.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} h-full`}>
      <body className="min-h-full bg-black text-[#f4f2ec] antialiased">
        <AppStoreProvider>
          <CursorProvider>
            <RouteLiquidSync />
            <SmoothScrollProvider>
              <CustomCursor />
              <BackHomeToast />
              <PageLoader>{children}</PageLoader>
              <CookieConsent />
            </SmoothScrollProvider>
          </CursorProvider>
        </AppStoreProvider>
      </body>
    </html>
  );
}
