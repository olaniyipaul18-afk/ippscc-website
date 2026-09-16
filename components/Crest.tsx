import Image from "next/image";

type CrestProps = {
  className?: string;
  /** Render the wordmark beside the seal */
  withWordmark?: boolean;
  wordmarkClassName?: string;
  priority?: boolean;
};

/** The official IPPSCC seal, rendered with its transparent ground. */
export default function Crest({
  className = "h-11 w-11",
  withWordmark = false,
  wordmarkClassName = "",
  priority = false,
}: CrestProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${wordmarkClassName}`}>
      <Image
        src="/images/ippscc-seal.png"
        alt="Official seal of the International Police & Public Safety Chaplain Corps, USA"
        width={256}
        height={256}
        priority={priority}
        className={`${className} w-auto object-contain [filter:drop-shadow(0_4px_18px_rgba(198,161,91,0.25))]`}
      />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.35rem] font-semibold tracking-wide text-white">
            IPPSCC
          </span>
          <span className="mt-1 max-w-44 font-mono text-[0.58rem] tracking-[0.14em] text-gold-300/90 uppercase">
            Intl. Police &amp; Public Safety Chaplain Corps
          </span>
        </span>
      )}
    </span>
  );
}
