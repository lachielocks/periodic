import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Serif_4({
  variable: "--font-body-family",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Periodic — Interactive Periodic Table",
  description:
    "Explore all 118 elements with detailed cards, real-world uses, and an interactive Three.js atom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden flex flex-col font-sans">{children}</body>
    </html>
  );
}
