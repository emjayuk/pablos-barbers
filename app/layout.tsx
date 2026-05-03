import type { Metadata } from "next";
import { Bebas_Neue, Nunito } from "next/font/google";
import "./globals.css";

// Display font — condensed, all-caps character, cinematic weight
const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

// Body font — warm, rounded, highly legible at small sizes
const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pablo's Barbers | Premium Cuts in Bristol",
  description:
    "Pablo's Barbers — Jamaican-rooted, Bristol-built. Premium haircuts at 126 Stapleton Rd, St Jude's, BS5 0PS. Walk-ins welcome. Open until 8pm.",
  keywords: ["barber", "Bristol", "haircut", "fade", "Pablo's Barbers", "Stapleton Road"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${nunito.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
