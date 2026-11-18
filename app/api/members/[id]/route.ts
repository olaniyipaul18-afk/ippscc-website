import { requirePasswordUpdatedSession } from "@/lib/session-guard";
import { getStore, type MemberStatus } from "@/lib/store";

type Ctx = { params: Promise<{ id: string }> };

/** Admin: member detail. */
export async function GET(_req: Request, { params }: Ctx) {
  const gate = await requirePasswordUpdatedSession("admin");
  if ("error" in gate) return gate.error;
  const { id } = await params;
  const member = await getStore().getMember(id);
  if (!member) return Response.json({ error: "Member not found." }, { status: 404 });
  return Response.json({ member });
}

/** Admin: set status, or reset password (returns a one-time temporary password). */
export async function PATCH(req: Request, { params }: Ctx) {
  const gate = await requirePasswordUpdatedSession("admin");
  if ("error" in gate) return gate.error;
  const { id } = await params;
  const store = getStore();

  let body: { status?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.action === "approve-username" || body.action === "reject-username") {
    const current = await store.getMember(id);
    if (!current) return Response.json({ error: "Member not found." }, { status: 404 });
    if (!current.requestedUsername) return Response.json({ error: "There is no username change request to review." }, { status: 400 });

    if (body.action === "reject-username") {
      const member = await store.updateMember(id, { requestedUsername: null, usernameChangeRequestedAt: null });
      if (!member) return Response.json({ error: "Could not update this member." }, { status: 500 });
      try {
        await store.createNotification(id, "Username change request declined", "Your requested username change was not approved. You may submit another request from Profile.");
      } catch {}
      return Response.json({ member });
    }

    const wanted = current.requestedUsername;
    const [usernameOwner, requestOwner] = await Promise.all([
      store.getMemberByUsername(wanted),
      store.getMemberByRequestedUsername(wanted),
    ]);
    if ((usernameOwner && usernameOwner.id !== id) || (requestOwner && requestOwner.id !== id)) {
      return Response.json({ error: "That username is no longer available. Ask the member to request another." }, { status: 409 });
    }
    try {
      const member = await store.updateMember(id, {
        username: wanted,
        requestedUsername: null,
        usernameChangeRequestedAt: null,
      });
      if (!member) return Response.json({ error: "Could not update this member." }, { status: 500 });
      try {
        await store.createNotification(id, "Username updated", `Your approved username is now ${member.username}.`);
      } catch {}
      return Response.json({ member });
    } catch {
      return Response.json({ error: "That username is no longer available. Ask the member to request another." }, { status: 409 });
    }
  }

  if (body.action === "reset-password") {
    const result = await store.resetMemberPassword(id);
    if (!result) return Response.json({ error: "Member not found." }, { status: 404 });
    try {
      await store.createNotification(
        id,
        "Your password was reset",
        "An administrator reset your portal password. Use the new temporary password issued to you; the portal will ask you to set a new password before you can continue."
      );
    } catch {}
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
