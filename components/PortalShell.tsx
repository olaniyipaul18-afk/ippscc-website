"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  FileSearch,
  Globe,
  LayoutDashboard,
  LogOut,
  TriangleAlert,
  UserRound,
} from "lucide-react";
import Crest from "./Crest";
import type { MemberPublic } from "@/lib/store";

type PortalShellProps = {
  member: MemberPublic;
  children: ReactNode;
};

const NAV = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/portal/profile", label: "Profile", icon: UserRound },
  { href: "/portal/notifications", label: "Notifications", icon: Bell },
  { href: "/track", label: "Track Application", icon: FileSearch },
  { href: "/", label: "Website", icon: Globe },
];

export default function PortalShell({ member, children }: PortalShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [unread, setUnread] = useState(0);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => setDemo(d.mode === "demo"))
      .catch(() => {});
    fetch("/api/notifications")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setUnread(d.unread || 0))
      .catch(() => {});
  }, [pathname]);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/portal/login");
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
            Demonstration mode — portal data is temporary. Connect Supabase for production persistence.
          </p>
        </div>
      )}
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_1fr] lg:px-10">
        <aside className="lg:sticky lg:top-36 lg:self-start">
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center gap-3">
              <Crest className="h-10 w-10" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{member.name}</p>
                <p className="truncate font-mono text-[0.62rem] tracking-[0.14em] text-gold-400 uppercase">
                  {member.memberId}
                </p>
              </div>
            </div>
            <p className="mt-3 border-t border-white/10 pt-3 font-mono text-[0.6rem] tracking-[0.2em] text-ink-100/45 uppercase">
              {member.rank} · {member.status}
            </p>
          </div>
          <nav aria-label="Member portal" className="mt-4 flex gap-2 overflow-x-auto border border-white/10 bg-white/[0.02] p-2 lg:flex-col">
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
                {item.href === "/portal/notifications" && unread > 0 && (
                  <span className="ml-auto bg-crimson-500 px-1.5 py-0.5 font-mono text-[0.6rem] text-white">
                    {unread}
                  </span>
                )}
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
