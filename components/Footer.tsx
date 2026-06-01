import Link from "next/link";
import Image from "next/image";
import { Globe, Mail, ArrowRight } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "How We Work", href: "/how-we-work" },
    { label: "Free Tools", href: "/tools" },
    { label: "Growth Audit", href: "/growth-audit" },
    { label: "Results", href: "/results" },
    { label: "Book a Call", href: "/book-a-call" },
  ],
  Company: [
    { label: "About Don", href: "/about" },
    { label: "Insights", href: "/insights" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              Ready to build a GTM system your<br className="hidden md:block" /> board trusts?
            </h2>
            <p className="text-white/50 text-lg">No pitch — just diagnosis and a clear plan.</p>
          </div>
          <Link
            href="/book-a-call"
            className="group flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-gold-500/20 whitespace-nowrap text-sm"
          >
            Book a Strategy Session
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/whiteonbluelogo.png"
                alt="Commerce Media Consulting Group"
                width={160}
                height={44}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              B2B go-to-market advisory for CEOs and CROs who want predictable revenue, sharper positioning, and a system their board can trust.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.linkedin.com/in/don-knapp-2037504/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold-500 hover:text-navy-900 flex items-center justify-center transition-all duration-200 text-white/60"
                aria-label="LinkedIn"
              >
                <Globe size={16} />
              </a>
              <a
                href="mailto:don@commercemediaconsulting.com"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold-500 hover:text-navy-900 flex items-center justify-center transition-all duration-200 text-white/60"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading font-semibold text-sm text-white/30 uppercase tracking-widest mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <p>© {new Date().getFullYear()} Commerce Media Consulting Group. All rights reserved.</p>
          <p className="text-center">Don Knapp · Managing Partner</p>
        </div>
      </div>
    </footer>
  );
}
