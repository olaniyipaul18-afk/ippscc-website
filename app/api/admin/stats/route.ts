import { requireSession } from "@/lib/auth";
import { getMode, getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

/** Admin: overview statistics + recent applications. */
export async function GET() {
  const gate = await requireSession("admin");
  if ("error" in gate) return gate.error;
  const store = getStore();
  const [stats, applications] = await Promise.all([store.stats(), store.listApplications()]);
  return Response.json({ stats, recent: applications.slice(0, 6), mode: getMode() });
}
