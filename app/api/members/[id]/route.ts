import { requireSession } from "@/lib/auth";
import { getStore, type MemberStatus } from "@/lib/store";

type Ctx = { params: Promise<{ id: string }> };

/** Admin: member detail. */
export async function GET(_req: Request, { params }: Ctx) {
  const gate = await requireSession("admin");
  if ("error" in gate) return gate.error;
  const { id } = await params;
  const member = await getStore().getMember(id);
  if (!member) return Response.json({ error: "Member not found." }, { status: 404 });
  return Response.json({ member });
}

/** Admin: set status, or reset password (returns a one-time temporary password). */
export async function PATCH(req: Request, { params }: Ctx) {
  const gate = await requireSession("admin");
  if ("error" in gate) return gate.error;
  const { id } = await params;
  const store = getStore();

  let body: { status?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.action === "reset-password") {
    const result = await store.resetMemberPassword(id);
    if (!result) return Response.json({ error: "Member not found." }, { status: 404 });
    await store.createNotification(
      id,
      "Your password was reset",
      "An administrator reset your portal password. Use the new temporary password issued to you, then set your own password in Profile → Security."
    );
    return Response.json({ member: result.member, tempPassword: result.temp });
  }

  const status = body.status as MemberStatus | undefined;
  if (status !== "active" && status !== "suspended" && status !== "pending") {
    return Response.json({ error: "A valid status is required." }, { status: 400 });
  }
  const member = await store.updateMember(id, { status });
  if (!member) return Response.json({ error: "Member not found." }, { status: 404 });
  return Response.json({ member });
}
