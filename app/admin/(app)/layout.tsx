import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getStore } from "@/lib/store";
import AdminShell from "@/components/AdminShell";

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/admin/login");
  const admin = await getStore().getAdmin(session.sub);
  if (!admin) redirect("/admin/login");
  if (admin.mustChangePassword) redirect("/admin/change-password");
  return <AdminShell name={admin.name}>{children}</AdminShell>;
}
