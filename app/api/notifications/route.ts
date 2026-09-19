import { getSession, requireSession } from "@/lib/auth";
import { getStore } from "@/lib/store";

/** Member: own notifications + unread count. */
export async function GET() {
  const gate = await requireSession("member");
  if ("error" in gate) return gate.error;
  const list = await getStore().notificationsFor(gate.session.sub);
  const unread = list.filter((n) => !n.readBy.includes(gate.session.sub)).length;
  return Response.json({ notifications: list, unread });
}

/** Member: mark read ({ids: string[] | "all"}). */
export async function PATCH(req: Request) {
  const gate = await requireSession("member");
  if ("error" in gate) return gate.error;
  let body: { ids?: string[] | "all" };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  await getStore().markNotificationsRead(gate.session.sub, body.ids === "all" ? "all" : body.ids || []);
  return Response.json({ ok: true });
}

/** Admin: broadcast ({audience: "all" | memberId, title, body}). */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { audience?: string; title?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body.title || !body.message) {
    return Response.json({ error: "Title and message are required." }, { status: 400 });
  }
  const audience = body.audience && body.audience !== "all" ? body.audience : "all";
  if (audience !== "all") {
    const member = await getStore().getMember(audience);
    if (!member) return Response.json({ error: "Member not found." }, { status: 404 });
  }
  const item = await getStore().createNotification(audience, body.title.trim(), body.message.trim());
  return Response.json({ ok: true, notification: item }, { status: 201 });
}
