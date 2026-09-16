import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/data/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex h-full flex-col border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:border-gold-500/50 hover:bg-white/[0.045] sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[0.62rem] tracking-[0.24em] text-gold-400 uppercase">
          {article.category}
        </p>
        <ArrowUpRight
          className="h-4 w-4 text-gold-500 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
      <h3 className="balance mt-4 font-display text-2xl leading-tight text-white transition-colors duration-300 group-hover:text-gold-200">
        {article.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-100/60">{article.standfirst}</p>
      <p className="mt-auto pt-6 font-mono text-[0.62rem] tracking-[0.2em] text-ink-100/40 uppercase">
        {article.readingTime} · {article.published}
      </p>
    </Link>
  );
}
