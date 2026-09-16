import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";
import { leadershipTiers } from "@/data/values";

export default function OrgChart() {
  return (
    <ol className="mx-auto max-w-2xl">
      {leadershipTiers.map((tier, i) => (
        <li key={tier.title}>
          <Reveal delay={Math.min(i * 0.04, 0.3)}>
            <div
              className={`group relative border px-6 py-5 transition-all duration-300 sm:px-8 ${
                i === 0
                  ? "border-gold-500/60 bg-gold-500/[0.07]"
                  : "border-white/12 bg-white/[0.02] hover:border-gold-500/40 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className={`font-display text-xl sm:text-2xl ${i === 0 ? "text-gold-300" : "text-white"}`}>
                  {tier.title}
                </h3>
                <span className="shrink-0 font-mono text-[0.65rem] tracking-[0.2em] text-ink-100/40">
                  {String(i + 1).padStart(2, "0")} / {String(leadershipTiers.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-ink-100/60">{tier.remit}</p>
              {i === 0 && (
                <span className="absolute top-0 left-0 h-full w-[3px] bg-gold-500" aria-hidden="true" />
              )}
            </div>
          </Reveal>
          {i < leadershipTiers.length - 1 && (
            <div className="flex justify-center py-1.5" aria-hidden="true">
              <ChevronDown className="h-4 w-4 text-gold-500/70" />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
