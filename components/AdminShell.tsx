"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  Megaphone,
  ShieldCheck,
  TriangleAlert,
  Users,
} from "lucide-react";

type AdminShellProps = {
  name: string;
  children: ReactNode;
};

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/notifications", label: "Broadcast", icon: Megaphone },
  { href: "/", label: "Website", icon: Globe },
];

export default function AdminShell({ name, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => setDemo(d.mode === "demo"))
      .catch(() => {});
  }, []);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="bg-ink-950 pt-28 md:pt-32">
      {demo && (
        <div className="border-b border-gold-500/30 bg-gold-500/10">
          <p className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-2.5 text-xs text-gold-200 lg:px-10">
            <TriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Demonstration mode — admin data is temporary. Connect Supabase for production persistence.
          </p>
        </div>
      )}
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_1fr] lg:px-10">
        <aside className="lg:sticky lg:top-36 lg:self-start">
          <div className="border border-crimson-500/40 bg-crimson-500/[0.06] p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-crimson-500/50">
                <ShieldCheck className="h-5 w-5 text-crimson-300" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{name}</p>
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-crimson-300 uppercase">
                  Administrator
                </p>
              </div>
            </div>
          </div>
          <nav aria-label="Admin control" className="mt-4 flex gap-2 overflow-x-auto border border-white/10 bg-white/[0.02] p-2 lg:flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                aria-current={isActive(item.href, item.exact) ? "page" : undefined}
                className={`flex shrink-0 items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isActive(item.href, item.exact)
                    ? "bg-gold-500/15 text-gold-200"
                    : "text-ink-100/70 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={signOut}
              className="flex shrink-0 items-center gap-3 px-4 py-3 text-left text-sm text-ink-100/70 transition-colors hover:bg-white/[0.04] hover:text-white"
            >
              <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
              Sign Out
            </button>
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
