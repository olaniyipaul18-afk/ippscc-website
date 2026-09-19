import { requireSession } from "@/lib/auth";
import { getStore } from "@/lib/store";

/** Admin: list members with optional search/status filters. */
export async function GET(req: Request) {
  const gate = await requireSession("admin");
  if ("error" in gate) return gate.error;
  const url = new URL(req.url);
  const list = await getStore().listMembers(
    url.searchParams.get("q") || undefined,
    url.searchParams.get("status") || undefined
  );
  return Response.json({ members: list });
}
