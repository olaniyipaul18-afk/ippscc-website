import { requireSession } from "@/lib/auth";
import { getStore, type ApplicationStatus } from "@/lib/store";

type Ctx = { params: Promise<{ id: string }> };

const STATUSES: ApplicationStatus[] = [
  "pending",
  "under_review",
  "changes_requested",
  "approved",
  "rejected",
  "completed",
];

/** Admin: application detail. */
export async function GET(_req: Request, { params }: Ctx) {
  const gate = await requireSession("admin");
  if ("error" in gate) return gate.error;
  const { id } = await params;
  const app = await getStore().getApplication(id);
  if (!app) return Response.json({ error: "Application not found." }, { status: 404 });
  return Response.json({ application: app });
}

/**
 * Admin: update status (+ optional review note). Approving an application
 * automatically provisions the member account and returns one-time credentials.
 */
export async function PATCH(req: Request, { params }: Ctx) {
  const gate = await requireSession("admin");
  if ("error" in gate) return gate.error;
  const { id } = await params;
  const store = getStore();
  const app = await store.getApplication(id);
  if (!app) return Response.json({ error: "Application not found." }, { status: 404 });

  let body: { status?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body.status || !STATUSES.includes(body.status as ApplicationStatus)) {
    return Response.json({ error: "A valid status is required." }, { status: 400 });
  }
  const status = body.status as ApplicationStatus;
  const notes = [...app.notes];
  if (body.note && body.note.trim()) {
    notes.push({ by: gate.session.name, at: new Date().toISOString(), text: body.note.trim(), status });
  }
  const updated = await store.updateApplication(id, { status, notes });
  if (!updated) return Response.json({ error: "Update failed." }, { status: 500 });

  // Approval provisions the member account (once).
  if (status === "approved") {
    const existing = await store.getMemberByEmail(app.email);
    if (!existing) {
      const { member, temp } = await store.createMemberFromApplication(updated, gate.session.name);
      await store.createNotification(
        member.id,
        "Welcome to the Corps — your account is ready",
        `Your membership has been approved. Member ID: ${member.memberId}. Sign in with the temporary password issued to you, then set your own password and complete your profile.`
      );
      return Response.json({
        application: updated,
        credentials: { memberId: member.memberId, email: member.email, tempPassword: temp },
      });
    }
    return Response.json({ application: updated, memberExists: true });
  }

  return Response.json({ application: updated });
}
