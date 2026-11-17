import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PasswordChangeForm from "@/components/PasswordChangeForm";
import { getSession } from "@/lib/auth";
import { getStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Set Password — Member Portal",
  robots: { index: false, follow: false },
};

export default async function MemberChangePasswordPage() {
  const session = await getSession();
  if (!session || session.role !== "member") redirect("/portal/login");
  const member = await getStore().getMember(session.sub);
  if (!member || member.status === "suspended") redirect("/portal/login");
  if (!member.mustChangePassword) redirect("/portal/profile");

  return (
    <section className="grain min-h-[70vh] bg-ink-950 px-6 pt-36 pb-20 sm:pt-40">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-[0.65rem] tracking-[0.28em] text-gold-400 uppercase">Member Portal · Account Security</p>
        <h1 className="mt-3 font-display text-3xl text-white sm:text-4xl">Secure your account.</h1>
        <PasswordChangeForm role="member" mustChangePassword returnTo="/portal" />
      </div>
    </section>
  );
}
