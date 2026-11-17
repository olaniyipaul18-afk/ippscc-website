import type { Metadata } from "next";
import PasswordChangeForm from "@/components/PasswordChangeForm";

export const metadata: Metadata = {
  title: "Security — Admin Control",
  robots: { index: false, follow: false },
};

export default function AdminSecurityPage() {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-[0.65rem] tracking-[0.28em] text-crimson-300 uppercase">Administrator account</p>
      <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">Security settings.</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-100/60">
        Update your admin password. You will need to confirm your current password first.
      </p>
      <div className="mt-7">
        <PasswordChangeForm role="admin" mustChangePassword={false} returnTo="/admin" />
      </div>
    </div>
  );
}
