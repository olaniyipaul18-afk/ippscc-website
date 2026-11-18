import { requirePasswordUpdatedSession } from "@/lib/session-guard";
import { getStore } from "@/lib/store";

const USERNAME_PATTERN = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/;

/** Member: request a username change; activation requires administrator approval. */
export async function POST(req: Request) {
  const gate = await requirePasswordUpdatedSession("member");
  if ("error" in gate) return gate.error;

  let body: { username?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof body.username !== "string") {
    return Response.json({ error: "Enter the username you want to request." }, { status: 400 });
  }
  const username = body.username.trim().toLowerCase();
  if (username.length < 3 || username.length > 32 || !USERNAME_PATTERN.test(username)) {
    return Response.json({ error: "Use 3–32 characters: letters, numbers, periods, hyphens or underscores; punctuation cannot be repeated." }, { status: 400 });
  }

  const store = getStore();
  const member = await store.getMember(gate.session.sub);
  if (!member || member.status === "suspended") return Response.json({ error: "Account not found or suspended." }, { status: 404 });
  if (username === member.username.toLowerCase()) {
    return Response.json({ error: "That is already your current username." }, { status: 400 });
  }

  const [owner, requestOwner] = await Promise.all([
    store.getMemberByUsername(username),
    store.getMemberByRequestedUsername(username),
  ]);
  if ((owner && owner.id !== member.id) || (requestOwner && requestOwner.id !== member.id)) {
    return Response.json({ error: "That username is already in use or reserved. Choose another." }, { status: 409 });
  }

  try {
    const updated = await store.updateMember(member.id, {
      requestedUsername: username,
      usernameChangeRequestedAt: new Date().toISOString(),
    });
    if (!updated) return Response.json({ error: "Your request could not be saved." }, { status: 500 });
    return Response.json({ member: updated, message: "Username request sent for administrator approval." });
  } catch {
    return Response.json({ error: "That username is no longer available. Please choose another." }, { status: 409 });
  }
}
