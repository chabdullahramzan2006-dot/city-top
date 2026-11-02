import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LoadingGate } from "@/components/loading/LoadingScreen";
import { AppProviders } from "@/components/providers/AppProviders";
import { restaurant } from "@/lib/restaurant";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display-fallback",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Figtree({
  variable: "--font-body-fallback",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${restaurant.name} | Authentic Pakistani Restaurant`,
    template: `%s | ${restaurant.name}`,
  },
  description: restaurant.description,
  openGraph: {
    title: `${restaurant.name} — ${restaurant.tagline}`,
    description: restaurant.description,
    type: "website",
    locale: "en_PK",
    siteName: restaurant.name,
  },
  twitter: {
    card: "summary_large_image",
    title: restaurant.name,
    description: restaurant.tagline,
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
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-ivory">
        <AppProviders>
          <LoadingGate>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LoadingGate>
        </AppProviders>
      </body>
    </html>
  );
}
