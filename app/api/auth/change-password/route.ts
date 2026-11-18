import { hashPassword, requireSession, verifyPassword } from "@/lib/auth";
import { getStore } from "@/lib/store";

export async function POST(req: Request) {
  const gate = await requireSession();
  if ("error" in gate) return gate.error;

  let body: { current?: unknown; next?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const current = typeof body.current === "string" ? body.current : "";
  const next = typeof body.next === "string" ? body.next : "";
  if (!current || !next || next.length < 8 || next.length > 256) {
    return Response.json(
      { error: "Enter your current password and a new password between 8 and 256 characters." },
      { status: 400 }
    );
  }
  if (current === next) {
    return Response.json({ error: "Choose a new password different from your current password." }, { status: 400 });
  }

  const store = getStore();
  if (gate.session.role === "member") {
    const member = await store.getMember(gate.session.sub);
    if (!member || member.status === "suspended") {
      return Response.json({ error: "Account not found or suspended." }, { status: 404 });
    }
    const verified = await store.verifyMember(member.username, current);
    if (!verified) return Response.json({ error: "Current password is incorrect." }, { status: 403 });
    const updated = await store.updateMember(gate.session.sub, {
      passwordHash: hashPassword(next),
      mustChangePassword: false,
    });
    if (!updated) return Response.json({ error: "Password could not be updated." }, { status: 500 });
    return Response.json({ ok: true, mustChangePassword: false });
  }

  const admin = await store.getAdmin(gate.session.sub);
  if (!admin) return Response.json({ error: "Account not found." }, { status: 404 });
  if (!verifyPassword(current, admin.passwordHash)) {
    return Response.json({ error: "Current password is incorrect." }, { status: 403 });
  }
  const updated = await store.updateAdminPassword(gate.session.sub, hashPassword(next));
  if (!updated) return Response.json({ error: "Password could not be updated." }, { status: 500 });
  return Response.json({ ok: true, mustChangePassword: false });
}
