import { getSession } from "@/lib/auth";
import { getMode, getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const mode = getMode();
  if (session.role === "admin") {
    return Response.json({ role: "admin", name: session.name, mode });
  }
  const member = await getStore().getMember(session.sub);
  if (!member) return Response.json({ error: "Account not found." }, { status: 401 });
  return Response.json({ role: "member", name: member.name, member, mode });
}
