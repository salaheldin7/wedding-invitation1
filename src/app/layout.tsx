import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Noto_Naskh_Arabic,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const displayFont = Playfair_Display({
  variable: "--font-display-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Cormorant_Garamond({
  variable: "--font-body-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const arabicFont = Noto_Naskh_Arabic({
  variable: "--font-arabic-var",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wedding Celebration Invitation",
  description: "A cinematic, bilingual wedding invitation experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${arabicFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-wine text-white font-body">
        {children}
      </body>
    </html>
  );
}
