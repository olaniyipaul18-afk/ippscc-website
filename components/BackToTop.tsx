"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed right-5 bottom-5 z-40 flex h-11 w-11 items-center justify-center border border-gold-500/60 bg-ink-950/90 text-gold-300 backdrop-blur transition-all duration-300 hover:bg-gold-500 hover:text-ink-950"
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
