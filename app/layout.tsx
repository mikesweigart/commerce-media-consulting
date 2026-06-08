import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cmcgco.com"),
  title: {
    default: "Commerce Media Consulting Group | B2B GTM Advisory",
    template: "%s | Commerce Media Consulting Group",
  },
  description:
    "Turn go-to-market chaos into predictable growth. Don Knapp helps B2B CEOs and CROs build the Revenue Architecture — a proven GTM system that delivers measurable results in 90 days.",
  keywords: ["B2B consulting", "go-to-market strategy", "GTM consulting", "revenue growth", "sales playbook"],
  authors: [{ name: "Don Knapp" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Commerce Media Consulting Group",
    title: "Commerce Media Consulting Group | Predictable B2B Growth",
    description: "Build a GTM system your board trusts. Don Knapp's Revenue Architecture delivers measurable results in 90 days.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commerce Media Consulting Group | Predictable B2B Growth",
    description: "Build a GTM system your board trusts. Don Knapp's Revenue Architecture delivers measurable results in 90 days.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-navy-900 font-sans antialiased">
        <MotionProvider>
          <Navigation />
          <main className="flex-1 pb-24 lg:pb-0">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
