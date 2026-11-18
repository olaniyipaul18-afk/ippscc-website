import { requirePasswordUpdatedSession } from "@/lib/session-guard";
import { getStore } from "@/lib/store";

type Ctx = { params: Promise<{ id: string; attachmentId: string }> };

/** Member-only, short-lived access to a file attached to a notification they can see. */
export async function GET(req: Request, { params }: Ctx) {
  const gate = await requirePasswordUpdatedSession("member");
  if ("error" in gate) return gate.error;

  const { id, attachmentId } = await params;
  const store = getStore();
  const notification = (await store.notificationsFor(gate.session.sub)).find((item) => item.id === id);
  const attachment = notification?.attachments.find((item) => item.id === attachmentId);
  if (!attachment) return Response.json({ error: "Attachment not found." }, { status: 404 });

  const inline = new URL(req.url).searchParams.has("inline");
  const signedUrl = await store.createNotificationAttachmentUrl(
    attachment.path,
    inline ? undefined : attachment.name
  );
  if (!signedUrl) return Response.json({ error: "Attachment is unavailable." }, { status: 404 });

  return new Response(null, {
    status: 302,
    headers: {
      Location: signedUrl,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
