import Link from "next/link";
import { ArrowUpRight, Mail, ShieldAlert } from "lucide-react";
import Crest from "./Crest";
import { footerNav } from "@/data/navigation";
import { site, legalDisclaimers } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold-500/25 bg-ink-950">
      {/* Upper footer */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_2fr] lg:px-10 lg:py-20">
        <div>
          <Crest withWordmark className="h-14 w-14" />
          <p className="mt-6 max-w-sm font-display text-xl leading-snug text-white/90 italic">
            “To serve those who serve — wherever duty calls.”
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-100/60">
            Professional chaplaincy, spiritual care, crisis response and compassionate support
            for law enforcement, public-safety personnel and first responders.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-flex items-center gap-2 border border-white/15 px-5 py-3 font-mono text-[0.7rem] tracking-[0.18em] text-white uppercase transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {site.email}
          </a>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-mono text-[0.65rem] tracking-[0.28em] text-gold-400 uppercase">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-ink-100/70 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight
                        className="h-3 w-3 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Disclaimers */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-crimson-400" aria-hidden="true" />
            <ul className="space-y-2">
              {legalDisclaimers.map((d) => (
                <li key={d} className="max-w-5xl text-xs leading-relaxed text-ink-100/45">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-center sm:flex-row sm:text-left lg:px-10">
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-ink-100/40 uppercase">
            © {year} {site.name}
          </p>
          <p className="font-mono text-[0.65rem] tracking-[0.24em] text-gold-500/80 uppercase">
            {site.motto}
          </p>
          <div className="flex items-center gap-5 font-mono text-[0.65rem] tracking-[0.2em] uppercase">
            <Link href="/standards" className="text-ink-100/40 transition-colors hover:text-gold-300">
              Standards
            </Link>
            <Link href="/faq" className="text-ink-100/40 transition-colors hover:text-gold-300">
              FAQ
            </Link>
            <Link href="/contact" className="text-ink-100/40 transition-colors hover:text-gold-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
