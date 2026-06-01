import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FG Rénovation | Plâtrerie, Peinture, Sols et Façades | Canton de Vaud",
  description:
    "Entreprise de rénovation dans le canton de Vaud. Spécialistes en plâtrerie, peinture, revêtements de sols et façades. Plus de 15 ans d'expérience au service des particuliers et professionnels.",
  keywords: [
    "rénovation",
    "plâtrerie",
    "peinture",
    "sols",
    "façades",
    "Vaud",
    "Lausanne",
    "Suisse",
    "entreprise rénovation",
    "travaux intérieurs",
    "travaux extérieurs",
  ],
  authors: [{ name: "FG Rénovation" }],
  creator: "FG Rénovation",
  publisher: "FG Rénovation",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: "https://www.fg-renovation.ch",
    siteName: "FG Rénovation",
    title: "FG Rénovation | Rénovation de qualité dans le canton de Vaud",
    description:
      "Entreprise de rénovation spécialisée en plâtrerie, peinture, sols et façades. Interventions soignées pour particuliers et professionnels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FG Rénovation | Canton de Vaud",
    description: "Rénovation de qualité - Plâtrerie, Peinture, Sols, Façades",
  },
  alternates: {
    canonical: "https://www.fg-renovation.ch",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f4f1",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
