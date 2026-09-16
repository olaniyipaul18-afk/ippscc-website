import Reveal from "./Reveal";

type SectionHeadingProps = {
  index?: string;
  kicker: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

/** Editorial section heading: index numeral, mono kicker, serif display title. */
export default function SectionHeading({
  index,
  kicker,
  title,
  lede,
  align = "left",
  tone = "dark",
}: SectionHeadingProps) {
  const centered = align === "center";
  const titleColor = tone === "dark" ? "text-white" : "text-ink-900";
  const ledeColor = tone === "dark" ? "text-ink-100/70" : "text-ink-800/70";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.28em] text-gold-400 uppercase">
          {index && <span className="text-gold-500/80">{index}</span>}
          {index && <span aria-hidden="true" className="h-px w-10 bg-gold-500/60" />}
          <span>{kicker}</span>
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`balance mt-5 font-display text-4xl leading-[1.05] font-medium text-pretty sm:text-5xl ${titleColor}`}>
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.16}>
          <p className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${centered ? "mx-auto" : ""} ${ledeColor}`}>
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
