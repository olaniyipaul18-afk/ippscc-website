import { requirePasswordUpdatedSession } from "@/lib/session-guard";
import { getStore } from "@/lib/store";

type Ctx = { params: Promise<{ id: string }> };

/** Admin: delete a notification and remove its private file attachments. */
export async function DELETE(_req: Request, { params }: Ctx) {
  const gate = await requirePasswordUpdatedSession("admin");
  if ("error" in gate) return gate.error;

  const { id } = await params;
  try {
    const result = await getStore().deleteNotification(id);
    if (!result.deleted) return Response.json({ error: "Notification not found." }, { status: 404 });
    return Response.json({ ok: true, attachmentsDeleted: result.attachmentsDeleted });
  } catch {
    return Response.json({ error: "Notification could not be deleted. Please try again." }, { status: 500 });
  }
}
