import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  title: {
    default: "Commerce Media Consulting Group | B2B GTM Advisory",
    template: "%s | Commerce Media Consulting Group",
  },
  description:
    "Turn go-to-market chaos into predictable growth. Don Knapp helps B2B CEOs and CROs build five-part GTM systems that deliver measurable results in 90 days.",
  keywords: ["B2B consulting", "go-to-market strategy", "GTM consulting", "revenue growth", "sales playbook"],
  authors: [{ name: "Don Knapp" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Commerce Media Consulting Group",
    title: "Commerce Media Consulting Group | Predictable B2B Growth",
    description: "Build a GTM system your board trusts. Don Knapp's 5-part growth framework delivers measurable results in 90 days.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-navy-900 font-sans antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
