import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getStore } from "@/lib/store";
import PortalShell from "@/components/PortalShell";

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.role !== "member") redirect("/portal/login");
  const member = await getStore().getMember(session.sub);
  if (!member || member.status === "suspended") redirect("/portal/login");
  return <PortalShell member={member}>{children}</PortalShell>;
}
