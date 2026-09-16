"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { site } from "@/lib/site";

type ShareArticleProps = {
  title: string;
  path: string;
};

export default function ShareArticle({ title, path }: ShareArticleProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const url = `${site.url}${path}`;

  useEffect(() => {
    if (typeof navigator !== "undefined" && "share" in navigator) setCanNativeShare(true);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const area = document.createElement("textarea");
      area.value = url;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, text: title, url });
    } catch {
      /* user dismissed — no action needed */
    }
  }

  const channels = [
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
  ];

  const btn =
    "inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 font-mono text-[0.62rem] tracking-[0.2em] uppercase transition-all duration-300 hover:border-gold-400 hover:text-gold-300";

  return (
    <div className="border-y border-white/10 py-6">
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-gold-400 uppercase">
        Share this essay
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2.5 text-ink-100/75">
        {channels.map((channel) => (
          <a key={channel.label} href={channel.href} target="_blank" rel="noopener noreferrer" className={btn}>
            {channel.label}
          </a>
        ))}
        <button type="button" onClick={copyLink} className={btn} aria-live="polite">
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" /> Copied
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" aria-hidden="true" /> Copy Link
            </>
          )}
        </button>
        {canNativeShare && (
          <button type="button" onClick={nativeShare} className={btn}>
            <Share2 className="h-3.5 w-3.5" aria-hidden="true" /> Share
          </button>
        )}
      </div>
    </div>
  );
}
