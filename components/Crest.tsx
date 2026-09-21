import Image from "next/image";

type CrestProps = {
  className?: string;
  /** Render the wordmark beside the seal */
  withWordmark?: boolean;
  wordmarkClassName?: string;
  priority?: boolean;
};

/** The official IPPSCC seal, rendered large and razor-sharp from the master artwork. */
export default function Crest({
  className = "h-12 w-12",
  withWordmark = false,
  wordmarkClassName = "",
  priority = false,
}: CrestProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${wordmarkClassName}`}>
      <Image
        src="/images/ippscc-seal.png"
        alt="Official seal of the International Police & Public Safety Chaplain Corps, USA"
        width={512}
        height={512}
        quality={100}
        sizes="(max-width: 640px) 384px, 512px"
        priority={priority}
        className={`${className} w-auto object-contain [filter:drop-shadow(0_4px_22px_rgba(198,161,91,0.4))]`}
      />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.45rem] font-semibold tracking-wide text-white">
            IPPSCC
          </span>
          <span className="mt-1 max-w-48 font-mono text-[0.6rem] tracking-[0.14em] text-gold-300/90 uppercase">
            Intl. Police &amp; Public Safety Chaplain Corps
          </span>
        </span>
      )}
    </span>
  );
}
