"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, Send, ShieldCheck, X } from "lucide-react";
import { getReply, QUICK_REPLIES } from "@/data/chatbot";

type Message = { id: number; from: "bot" | "user"; text: string; href?: string; linkLabel?: string };

let nextId = 1;

/**
 * Corps Guide — floating assistant on every page.
 * Rule-based answers drawn from the FAQs and site knowledge base.
 */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const greeted = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      setMessages([
        {
          id: nextId++,
          from: "bot",
          text: "Welcome to IPPSCC — I am the Corps Guide. Ask me about joining, tracking an application, the Member Portal, services, leadership, or anything else about the Corps.",
        },
      ]);
    }
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 120);
      return () => clearTimeout(t);
    }
  }, [open ]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function send(raw: string) {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: nextId++, from: "user", text }]);
    setInput("");
    setTyping(true);
    timer.current = setTimeout(() => {
      const reply = getReply(text);
      setMessages((m) => [...m, { id: nextId++, from: "bot", ...reply }]);
      setTyping(false);
    }, 550);
  }

  return (
    <>
      {/* Floating icon — every page, every device */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close Corps Guide chat" : "Open Corps Guide chat"}
        className="fixed right-4 bottom-4 z-[80] flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-105 hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 sm:right-6 sm:bottom-6 sm:h-14 sm:w-14"
      >
        <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-gold-500/30 motion-safe:animate-ping [animation-duration:2.4s] [animation-iteration-count:2]" />
        {open ? <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" /> : <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />}
      </button>

      {/* Chat panel */}
      {open && (
        <section
          aria-label="Corps Guide chat"
          role="dialog"
          aria-modal="false"
          className="fixed inset-x-4 bottom-[4.25rem] z-[80] flex h-[min(560px,calc(100dvh-7rem))] flex-col overflow-hidden border border-gold-500/40 bg-ink-950 shadow-[0_20px_70px_rgba(0,0,0,0.6)] sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[384px]"
        >
          <header className="flex items-center gap-3 border-b border-gold-500/25 bg-ink-900 px-4 py-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/15">
              <ShieldCheck className="h-4.5 w-4.5 text-gold-300" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-base leading-tight text-white">Corps Guide</span>
              <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[0.58rem] tracking-[0.2em] text-gold-300/90 uppercase">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online — answers from IPPSCC FAQs & site
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1.5 text-ink-100/60 transition-colors hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m) =>
              m.from === "user" ? (
                <p key={m.id} className="ml-auto w-fit max-w-[85%] bg-gold-500 px-3.5 py-2.5 text-[0.83rem] leading-relaxed text-ink-950">
                  {m.text}
                </p>
              ) : (
                <div key={m.id} className="w-fit max-w-[92%] border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
                  <p className="text-[0.83rem] leading-relaxed text-ink-100/85">{m.text}</p>
                  {m.href && (
                    <Link
                      href={m.href}
                      onClick={() => setOpen(false)}
                      className="mt-2 inline-block border border-gold-500/50 px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] text-gold-300 uppercase transition-colors hover:bg-gold-500 hover:text-ink-950"
                    >
                      {m.linkLabel || "Learn more"} →
                    </Link>
                  )}
                </div>
              )
            )}
            {typing && (
              <p className="flex w-fit items-center gap-1.5 border border-white/10 bg-white/[0.04] px-4 py-3" aria-label="Corps Guide is typing">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-400"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </p>
            )}
          </div>

          {messages.length <= 1 && !typing && (
            <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 pt-3">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="border border-white/15 px-3 py-1.5 text-xs text-ink-100/75 transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex items-center gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label htmlFor="corps-guide-input" className="sr-only">
              Ask the Corps Guide
            </label>
            <input
              ref={inputRef}
              id="corps-guide-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about joining, tracking, portal…"
              autoComplete="off"
              className="min-w-0 flex-1 border border-white/15 bg-ink-900 px-3.5 py-2.5 text-sm text-white placeholder:text-ink-100/35 focus:border-gold-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center bg-gold-500 text-ink-950 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
