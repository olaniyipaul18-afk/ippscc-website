"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight, Search } from "lucide-react";
import Crest from "./Crest";
import SearchOverlay from "./SearchOverlay";
import { primaryNav } from "@/data/navigation";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMobileOpen(false);
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openSearch() {
    setMobileOpen(false);
    setSearchOpen(true);
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-gold-500 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-ink-950"
      >
        Skip to main content
      </a>

      {/* Utility bar */}
      <div className="fixed inset-x-0 top-0 z-50 hidden border-b border-white/10 bg-ink-950/95 backdrop-blur md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 lg:px-10">
          <p className="font-mono text-[0.62rem] tracking-[0.26em] text-gold-300/90 uppercase">
            {site.tagline} — {site.motto}
          </p>
          <div className="flex items-center gap-6 font-mono text-[0.62rem] tracking-[0.2em] uppercase">
            <Link href="/faq" className="text-ink-100/60 transition-colors hover:text-gold-300">
              FAQ
            </Link>
            <Link href="/events" className="text-ink-100/60 transition-colors hover:text-gold-300">
              Events
            </Link>
            <Link href="/portal/login" className="text-gold-300/90 transition-colors hover:text-gold-300">
              Member Portal
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="text-ink-100/60 transition-colors hover:text-gold-300"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 md:top-[27px] ${
          scrolled
            ? "border-b border-white/10 bg-ink-950/92 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink-950/90 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <Link href="/" className="group flex items-center" aria-label="IPPSCC — home">
            <Crest withWordmark priority className="h-16 w-16 transition-transform duration-500 group-hover:scale-[1.04]" />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
            {primaryNav.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`link-sweep flex items-center gap-1 py-2 font-mono text-[0.68rem] tracking-[0.18em] uppercase transition-colors ${
                    pathname === item.href || (item.children && item.children.some((c) => c.href === pathname))
                      ? "text-gold-300"
                      : "text-ink-100/80 hover:text-white"
                  }`}
                  aria-haspopup={item.children ? "true" : undefined}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:rotate-180" aria-hidden="true" />
                  )}
                </Link>
                {item.children && (
                  <div className="invisible absolute top-full left-1/2 w-80 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="border border-white/10 bg-ink-900/98 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                      <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" aria-hidden="true" />
                      {item.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          className="group/link flex items-start justify-between gap-3 border-b border-white/5 px-5 py-3.5 transition-colors last:border-0 hover:bg-white/[0.04]"
                        >
                          <span>
                            <span className="block text-sm font-medium text-white group-hover/link:text-gold-200">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="mt-0.5 block text-xs text-ink-100/50">{child.description}</span>
                            )}
                          </span>
                          <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-500 opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search the website (Ctrl or Command K)"
              className="flex items-center gap-2 border border-white/15 px-3.5 py-2.5 text-ink-100/60 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase">Search</span>
              <kbd className="border border-white/15 px-1.5 py-0.5 font-mono text-[0.55rem] text-ink-100/40">
                ⌘K
              </kbd>
            </button>
            <Link
              href="/join"
              className="bg-gold-500 px-5 py-2.5 font-mono text-[0.68rem] tracking-[0.18em] text-ink-950 uppercase transition-all duration-300 hover:bg-gold-400"
            >
              Join the Call
            </Link>
          </nav>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search the website"
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
        {/* The Line — thin crimson pinstripe drawn from the seal */}
        <div aria-hidden="true" className="rule-crimson opacity-60" />
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-30 overflow-y-auto bg-ink-950/98 backdrop-blur-xl xl:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto max-w-7xl px-6 pt-32 pb-16">
              <button
                type="button"
                onClick={openSearch}
                className="mb-6 flex w-full items-center justify-between border border-white/15 bg-white/[0.03] px-5 py-4 text-ink-100/60 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <span className="flex items-center gap-3">
                  <Search className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm">Search the website…</span>
                </span>
                <kbd className="border border-white/15 px-2 py-1 font-mono text-[0.58rem]">⌘K</kbd>
              </button>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {primaryNav.map((item) => (
                  <li key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setOpenSection(openSection === item.label ? null : item.label)}
                          aria-expanded={openSection === item.label}
                          className="flex w-full items-center justify-between py-4 text-left"
                        >
                          <span className="font-display text-2xl text-white">{item.label}</span>
                          <ChevronDown
                            className={`h-5 w-5 text-gold-400 transition-transform duration-300 ${
                              openSection === item.label ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {openSection === item.label && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <li>
                                <Link
                                  href={item.href}
                                  className="block border-l border-gold-500/50 py-2 pl-4 font-mono text-[0.7rem] tracking-[0.2em] text-gold-300 uppercase"
                                >
                                  Overview — {item.label}
                                </Link>
                              </li>
                              {item.children.map((child) => (
                                <li key={child.href + child.label}>
                                  <Link
                                    href={child.href}
                                    className="block border-l border-white/10 py-2.5 pl-4 text-[0.95rem] text-ink-100/75 transition-colors hover:border-gold-500/60 hover:text-white"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                              <li aria-hidden="true" className="pb-4" />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link href={item.href} className="block py-4 font-display text-2xl text-white">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <Link
                href="/join"
                className="mt-8 flex items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.75rem] tracking-[0.22em] text-ink-950 uppercase"
              >
                Join the Call to Serve
              </Link>
              <p className="mt-6 text-center font-mono text-[0.62rem] tracking-[0.26em] text-ink-100/40 uppercase">
                {site.motto}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
