import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PasswordChangeForm from "@/components/PasswordChangeForm";
import { getSession } from "@/lib/auth";
import { getStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Account Security — Admin Control",
  robots: { index: false, follow: false },
};

export default async function AdminChangePasswordPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/admin/login");
  const admin = await getStore().getAdmin(session.sub);
  if (!admin) redirect("/admin/login");
  if (!admin.mustChangePassword) redirect("/admin/security");

  return (
    <section className="grain min-h-[70vh] bg-ink-950 px-6 pt-36 pb-20 sm:pt-40">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-[0.65rem] tracking-[0.28em] text-crimson-300 uppercase">Restricted · Admin Control</p>
        <h1 className="mt-3 font-display text-3xl text-white sm:text-4xl">Account security.</h1>
        <div className="mt-7">
          <PasswordChangeForm role="admin" mustChangePassword={admin.mustChangePassword} returnTo="/admin" />
        </div>
      </div>
    </section>
  );
}
