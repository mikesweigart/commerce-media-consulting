"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const navLinks = [
  { href: "/how-we-work", label: "How We Work" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About Don" },
  { href: "/insights", label: "Insights" },
  { href: "/growth-audit", label: "Growth Audit" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const lightNav = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : isHome
            ? "bg-transparent"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/commercelogo.PNG"
              alt="Commerce Media Consulting Group"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative group ${
                  lightNav
                    ? "text-white/80 hover:text-white"
                    : "text-navy-600 hover:text-navy-900"
                } ${pathname === link.href ? (lightNav ? "text-white" : "text-navy-900") : ""}`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold-500 transition-all duration-200 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/book-a-call"
              className="bg-gold-500 hover:bg-gold-400 text-navy-900 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              lightNav ? "text-white hover:bg-white/10" : "text-navy-700 hover:bg-gray-100"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-navy-900/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="font-heading font-bold text-navy-900 text-sm">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-navy-700"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="p-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-3 px-4 rounded-xl text-navy-700 font-medium hover:bg-cream-100 hover:text-navy-900 transition-colors"
                    >
                      {link.label}
                      <ChevronRight size={16} className="text-gold-500" />
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href="/book-a-call"
                    className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold px-5 py-3.5 rounded-xl transition-colors text-sm"
                  >
                    Book a Strategy Session
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
        <Link
          href="/book-a-call"
          className="flex items-center justify-center gap-2 bg-navy-900 text-white font-semibold px-6 py-4 rounded-2xl shadow-2xl shadow-navy-900/30 text-sm"
        >
          Book a Growth Strategy Session →
        </Link>
      </div>
    </>
  );
}
