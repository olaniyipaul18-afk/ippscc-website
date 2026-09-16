"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { EASE } from "@/lib/motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="grain relative flex min-h-svh items-end overflow-hidden" aria-label="Introduction">
      {/* Backdrop */}
      <motion.div style={reduce ? undefined : { y: bgY }} className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-duty.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/35 to-ink-950" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_38%,transparent_30%,rgba(4,9,15,0.55)_100%)]" />

      {/* Vertical rail */}
      <div aria-hidden="true" className="absolute top-1/2 left-6 hidden -translate-y-1/2 items-center gap-4 lg:flex xl:left-10">
        <span className="writing-vertical font-mono text-[0.62rem] tracking-[0.4em] text-ink-100/45 uppercase">
          International Police &amp; Public Safety Chaplain Corps — USA
        </span>
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-gold-500/70 to-transparent" />
      </div>

      {/* Content */}
      <motion.div style={reduce ? undefined : { opacity: fade }} className="relative w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-7xl px-6 pt-44 pb-14 lg:px-10 lg:pb-16"
        >
          <motion.p
            variants={item}
            className="flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.32em] text-gold-300 uppercase sm:text-[0.72rem]"
          >
            <span aria-hidden="true" className="h-px w-12 bg-gold-500 sm:w-16" />
            Serving Law Enforcement · Public Safety · First Responders
          </motion.p>

          <motion.h1
            variants={item}
            className="balance mt-6 max-w-5xl font-display text-[13.5vw] leading-[0.98] font-medium tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            Light in the
            <br />
            <span className="text-gold-300 italic">Line of Duty.</span>
          </motion.h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <motion.div variants={item} className="max-w-2xl">
              <p className="text-base leading-relaxed text-ink-100/85 sm:text-lg">
                Behind every uniform is a human being. The{" "}
                <strong className="font-semibold text-white">
                  International Police &amp; Public Safety Chaplain Corps, USA
                </strong>{" "}
                exists to serve those who serve — with professional chaplaincy, spiritual care,
                crisis response and compassionate presence, wherever duty calls.
              </p>
              <p className="mt-4 font-mono text-[0.7rem] tracking-[0.3em] text-gold-400 uppercase">
                Shielded by Faith. Sent to Serve.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/join"
                className="group inline-flex items-center justify-center gap-2 bg-gold-500 px-8 py-4 font-mono text-[0.72rem] tracking-[0.22em] whitespace-nowrap text-ink-950 uppercase transition-all duration-300 hover:bg-gold-400"
              >
                Join the Call to Serve
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 border border-white/30 px-8 py-4 font-mono text-[0.72rem] tracking-[0.22em] whitespace-nowrap text-white uppercase transition-all duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                Explore IPPSCC
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="mt-12 flex items-center justify-between border-t border-white/15 pt-5"
          >
            <p className="font-mono text-[0.62rem] tracking-[0.26em] text-ink-100/50 uppercase">
              Professional Chaplaincy · Spiritual Care · Compassionate Presence
            </p>
            <a
              href="#different-kind-of-service"
              className="group flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.26em] text-gold-300 uppercase"
              aria-label="Scroll to main content"
            >
              Scroll
              <ChevronDown className="animate-pulse-soft h-4 w-4 text-crimson-400" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
