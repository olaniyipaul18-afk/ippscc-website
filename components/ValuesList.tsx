"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { values } from "@/data/values";
import Reveal from "./Reveal";

export default function ValuesList() {
  const [active, setActive] = useState<number>(0);

  return (
    <div className="border-t border-ink-900/15">
      {values.map((value, i) => {
        const isActive = active === i;
        return (
          <div key={value.title} className="border-b border-ink-900/15">
            <button
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-expanded={isActive}
              className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 py-5 text-left sm:gap-8 sm:py-6"
            >
              <span className={`font-mono text-[0.7rem] tracking-[0.2em] transition-colors ${isActive ? "text-gold-600" : "text-ink-800/40"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span
                  className={`block font-display text-3xl transition-all duration-300 sm:text-4xl lg:text-5xl ${
                    isActive ? "translate-x-1 text-ink-900 sm:translate-x-2" : "text-ink-900/45 group-hover:text-ink-900/70"
                  }`}
                >
                  {value.title}
                </span>
              </span>
              <span
                className={`hidden max-w-xs text-right text-sm leading-relaxed transition-colors sm:block ${
                  isActive ? "text-ink-800/80" : "text-ink-800/40"
                }`}
              >
                {value.statement}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-2 pb-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:pl-[3.25rem]">
                    <p className="max-w-2xl text-[0.95rem] leading-relaxed text-ink-800/75 sm:hidden">
                      {value.statement}
                    </p>
                    <p className="max-w-2xl text-[0.95rem] leading-relaxed text-ink-800/75">
                      {value.exposition}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function ValuesIntro() {
  return (
    <Reveal>
      <p className="max-w-2xl text-base leading-relaxed text-ink-800/70 sm:text-lg">
        Drawn directly from the organization&apos;s stated core values — the convictions that shape
        every chaplain&apos;s character, conduct and care.
      </p>
    </Reveal>
  );
}
