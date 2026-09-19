import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ArrowRight, BadgeCheck, Bell, TriangleAlert, UserRound } from "lucide-react";
import { getSession } from "@/lib/auth";
import { getStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Member Dashboard",
  description: "Your IPPSCC membership at a glance.",
};

export const dynamic = "force-dynamic";

const PROFILE_FIELDS = ["fullName", "phone", "country", "city", "serviceTrack", "churchName", "photoUrl"];

export default async function PortalDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "member") redirect("/portal/login");
  const store = getStore();
  const member = await store.getMember(session.sub);
  if (!member) redirect("/portal/login");
  const notifications = await store.notificationsFor(member.id);
  const unread = notifications.filter((n) => !n.readBy.includes(member.id));

  const filled = PROFILE_FIELDS.filter((f) => {
    const v = member.profile[f];
    return typeof v === "string" ? v.trim().length > 0 : Boolean(v);
  }).length;
  const completeness = Math.round((filled / PROFILE_FIELDS.length) * 100);
  const joinedYear = new Date(member.joinedAt).getFullYear();

  return (
    <div>
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-gold-400 uppercase">Member Dashboard</p>
      <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
        Stand easy, {member.name.split(" ").slice(-1)[0] || member.name}.
      </h1>

      {member.mustChangePassword && (
        <Link
          href="/portal/profile"
          className="mt-6 flex items-start gap-3 border border-gold-500/50 bg-gold-500/10 px-5 py-4 transition-colors hover:bg-gold-500/15"
        >
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
          <span className="text-sm text-gold-200">
            You are signed in with a temporary password. <strong className="underline underline-offset-4">Set your own password</strong> in Profile → Security, then complete your profile.
          </span>
        </Link>
      )}

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {/* Digital ID card */}
        <section aria-label="Digital membership card" className="grain relative overflow-hidden border border-gold-500/40 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-6 sm:p-7">
          <div aria-hidden="true" className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-gold-500 via-gold-500 to-crimson-500" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.26em] text-gold-300 uppercase">IPPSCC-USA · Member</p>
              <p className="mt-2 font-display text-2xl leading-tight text-white">{member.name}</p>
              <p className="mt-1 text-sm text-ink-100/65">{member.rank}</p>
            </div>
            <Image src="/images/ippscc-seal.png" alt="" width={96} height={96} className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20" />
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-sm">
            <div>
              <dt className="font-mono text-[0.58rem] tracking-[0.22em] text-ink-100/45 uppercase">Member ID</dt>
              <dd className="mt-1 font-mono text-[0.8rem] text-gold-200">{member.memberId}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.58rem] tracking-[0.22em] text-ink-100/45 uppercase">Status</dt>
              <dd className="mt-1 inline-flex items-center gap-1.5 text-emerald-300">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> {member.status === "active" ? "Active" : member.status}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.58rem] tracking-[0.22em] text-ink-100/45 uppercase">Command / Region</dt>
              <dd className="mt-1 text-ink-100/80">{member.region || "—"}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.58rem] tracking-[0.22em] text-ink-100/45 uppercase">Member Since</dt>
              <dd className="mt-1 text-ink-100/80">{joinedYear}</dd>
            </div>
          </dl>
          <p className="mt-5 font-mono text-[0.58rem] tracking-[0.22em] text-ink-100/35 uppercase">
            Shielded by Faith · Sent to Serve
          </p>
        </section>

        {/* Profile completeness + notifications */}
        <div className="grid gap-5">
          <section aria-label="Profile completeness" className="border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-xl text-white">
                <UserRound className="h-4 w-4 text-gold-400" aria-hidden="true" /> Your Profile
              </h2>
              <span className="font-mono text-xs text-gold-300">{completeness}%</span>
            </div>
            <div className="mt-4 h-2 bg-white/10" role="progressbar" aria-valuenow={completeness} aria-valuemin={0} aria-valuemax={100} aria-label="Profile completeness">
              <div className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all" style={{ width: `${completeness}%` }} />
            </div>
            <p className="mt-3 text-sm text-ink-100/60">
              {completeness === 100
                ? " exemplary — your profile is complete."
                : "Complete your profile so the Corps can reach and deploy you rightly."}
            </p>
            <Link href="/portal/profile" className="group mt-4 inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.22em] text-gold-300 uppercase">
              <span className="link-sweep">Edit Profile</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </section>

          <section aria-label="Latest notifications" className="border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-xl text-white">
                <Bell className="h-4 w-4 text-gold-400" aria-hidden="true" /> Notifications
              </h2>
              {unread.length > 0 && (
                <span className="bg-crimson-500 px-2 py-0.5 font-mono text-[0.62rem] text-white">
                  {unread.length} new
                </span>
              )}
            </div>
            {notifications.length === 0 ? (
              <p className="mt-3 text-sm text-ink-100/55">No notifications yet. Orders and announcements will appear here.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {notifications.slice(0, 3).map((n) => (
                  <li key={n.id} className="border-l-2 border-gold-500/60 pl-3">
                    <p className="text-sm font-medium text-white">{n.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-ink-100/55">{n.body}</p>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/portal/notifications" className="group mt-4 inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.22em] text-gold-300 uppercase">
              <span className="link-sweep">View All</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
