"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE } from "@/lib/motion";

export type AccordionItem = { question: string; answer: string };

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-button-${i}`}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="flex items-baseline gap-5">
                <span className="font-mono text-[0.7rem] tracking-[0.2em] text-gold-500/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-xl transition-colors duration-300 sm:text-2xl ${
                    isOpen ? "text-gold-300" : "text-white group-hover:text-gold-200"
                  }`}
                >
                  {item.question}
                </span>
              </span>
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-gold-500 bg-gold-500 text-ink-950"
                    : "border-white/20 text-gold-400 group-hover:border-gold-400"
                }`}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pl-0 text-[0.95rem] leading-relaxed text-ink-100/75 sm:pl-12 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
