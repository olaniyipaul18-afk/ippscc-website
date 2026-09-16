import { site } from "@/lib/site";

type MarqueeProps = {
  items?: string[];
  className?: string;
};

/** Infinite motto ticker — pure CSS, pauses on hover, hidden from AT duplicates. */
export default function Marquee({
  items = [site.motto.toUpperCase(), site.tagline.toUpperCase(), "TO SERVE THOSE WHO SERVE"],
  className = "",
}: MarqueeProps) {
  const row = [...items, ...items, ...items];
  return (
    <div className={`overflow-hidden border-y border-gold-500/25 bg-ink-900 py-4 ${className}`}>
      <div className="animate-marquee flex w-max items-center gap-10 pr-10 hover:[animation-play-state:paused]">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
                <span className="font-mono text-[0.72rem] tracking-[0.32em] text-gold-300 uppercase">
                  {item}
                </span>
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold-500/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
