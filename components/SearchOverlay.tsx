"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FileText, Search, SearchX } from "lucide-react";
import { EASE } from "@/lib/motion";
import { searchIndex, suggestedSearches } from "@/lib/search-index";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return suggestedSearches;
    return searchIndex
      .filter((entry) =>
        `${entry.title} ${entry.section} ${entry.keywords}`.toLowerCase().includes(q)
      )
      .slice(0, 9);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      document.body.style.overflow = "hidden";
      window.setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function go(href: string) {
    onClose();
    router.push(href);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-ink-950/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Search the IPPSCC website"
        >
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="fixed inset-0 cursor-default"
            tabIndex={-1}
          />
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative mx-auto mt-24 mb-16 w-[calc(100%-2.5rem)] max-w-2xl border border-white/12 bg-ink-900 shadow-[0_40px_120px_rgba(0,0,0,0.7)] sm:mt-32"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" aria-hidden="true" />
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => (results.length ? (a + 1) % results.length : 0));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
                  } else if (e.key === "Enter" && results[active]) {
                    go(results[active].href);
                  }
                }}
                placeholder="Search services, essays, FAQs, pages…"
                aria-label="Search query"
                aria-expanded="true"
                aria-controls="search-results"
                role="combobox"
                className="w-full bg-transparent text-[1rem] text-white placeholder:text-ink-100/35 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              <kbd className="hidden shrink-0 border border-white/15 px-2 py-1 font-mono text-[0.6rem] tracking-[0.14em] text-ink-100/50 sm:block">
                ESC
              </kbd>
            </div>

            <p className="px-5 pt-4 font-mono text-[0.6rem] tracking-[0.26em] text-ink-100/40 uppercase">
              {query.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Suggested"}
            </p>
            {results.length > 0 ? (
              <ul id="search-results" role="listbox" className="max-h-[46vh] overflow-y-auto px-2 py-3">
                {results.map((entry, i) => (
                  <li key={`${entry.href}-${entry.title}`} role="option" aria-selected={i === active}>
                    <Link
                      href={entry.href}
                      onClick={onClose}
                      onMouseEnter={() => setActive(i)}
                      className={`group flex items-center justify-between gap-4 px-3.5 py-3 transition-colors ${
                        i === active ? "bg-white/[0.06]" : ""
                      }`}
                    >
                      <span className="flex min-w-0 items-start gap-3">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/70" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className={`block truncate text-[0.95rem] ${i === active ? "text-gold-200" : "text-white"}`}>
                            {entry.title}
                          </span>
                          <span className="mt-0.5 block font-mono text-[0.6rem] tracking-[0.2em] text-ink-100/45 uppercase">
                            {entry.section}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight
                        className={`h-4 w-4 shrink-0 text-gold-500 transition-opacity ${i === active ? "opacity-100" : "opacity-0"}`}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-3 px-5 py-8 text-ink-100/60">
                <SearchX className="h-5 w-5 shrink-0 text-gold-500/70" aria-hidden="true" />
                <p className="text-sm">
                  No matches for “{query.trim()}”. Try “chaplain”, “Nigeria” or “membership”.
                </p>
              </div>
            )}

            <div className="flex items-center gap-5 border-t border-white/10 px-5 py-3 font-mono text-[0.6rem] tracking-[0.16em] text-ink-100/40 uppercase">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span className="ml-auto hidden sm:block">Ctrl/⌘ K to search</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
