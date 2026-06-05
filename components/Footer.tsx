import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

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
            <p className="text-white/75 text-lg">A 30-minute working session — honest diagnosis, clear path forward.</p>
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
            <Link href="/" className="inline-block mb-5 group">
              <div className="flex flex-col leading-none">
                <span className="font-heading font-black text-[26px] tracking-[-0.03em] leading-none text-white group-hover:opacity-80 transition-opacity">
                  cmcg
                </span>
                <span className="text-[8.5px] font-bold tracking-[0.18em] uppercase leading-none mt-[3px] text-gold-400 group-hover:opacity-80 transition-opacity">
                  Commerce Media Consulting
                </span>
              </div>
            </Link>
            <p className="text-white/75 text-sm leading-relaxed max-w-sm">
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
                {/* LinkedIn "in" mark — lucide-react v1.17 has no LinkedIn icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="mailto:don.knapp.cmcg@gmail.com"
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
              <h3 className="font-heading font-semibold text-sm text-gold-400 uppercase tracking-widest mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-xs">
          <p>© {new Date().getFullYear()} Commerce Media Consulting Group. All rights reserved.</p>
          <p className="text-center">Don Knapp · Managing Partner</p>
        </div>
      </div>
    </footer>
  );
}
