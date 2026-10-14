import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KAHF MAN | Acne Care AminoGel — Biomimetic Low pH 5.5 Cleanser",
  description:
    "An Awwwards-level scrollytelling experience introducing Kahf Acne Care AminoGel. Formulated with 15 pure Amino Acids and Succinic Acid to restore resilient skin barriers without stripping.",
  keywords: [
    "Kahf",
    "Acne Care AminoGel",
    "Men's Skincare",
    "Low pH 5.5 Cleanser",
    "Succinic Acid",
    "Amino Acid Skincare",
    "Halal Skincare",
    "Micro-foam Technology",
  ],
  authors: [{ name: "Kahf Man Skincare Labs" }],
  openGraph: {
    title: "KAHF MAN | Acne Care AminoGel",
    description: "Biomimetic Low pH 5.5 Acne Defense Cleanser for Men.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <body className="bg-[#0B211F] text-[#ECFDF5] font-sans antialiased selection:bg-[#2DD4BF] selection:text-[#0B211F] min-h-screen overflow-x-hidden">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
