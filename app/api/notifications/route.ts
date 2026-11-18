import { randomUUID } from "node:crypto";
import { requirePasswordUpdatedSession } from "@/lib/session-guard";
import { getStore, type NotificationAttachment, type NotificationItem, type NotificationItemPublic } from "@/lib/store";

const MAX_ATTACHMENTS = 5;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

const MIME_BY_EXTENSION: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  csv: "text/csv",
};

function publicNotification(item: NotificationItem): NotificationItemPublic {
  const { attachments, ...rest } = item;
  return {
    ...rest,
    attachments: attachments.map(({ path: _path, ...attachment }) => ({
      ...attachment,
      href: `/api/notifications/${encodeURIComponent(item.id)}/attachments/${encodeURIComponent(attachment.id)}`,
    })),
  };
}

function formatFileName(name: string) {
  return name.replace(/[\u0000-\u001f\u007f]/g, "").replace(/[\\/]/g, "_").trim().slice(0, 160) || "attachment";
}

/** Member: own notifications + unread count. */
export async function GET() {
  const gate = await requirePasswordUpdatedSession("member");
  if ("error" in gate) return gate.error;
  const list = await getStore().notificationsFor(gate.session.sub);
  const unread = list.filter((n) => !n.readBy.includes(gate.session.sub)).length;
  return Response.json({ notifications: list.map(publicNotification), unread }, {
    headers: { "Cache-Control": "private, no-store" },
  });
}

/** Member: mark read ({ids: string[] | "all"}). */
export async function PATCH(req: Request) {
  const gate = await requirePasswordUpdatedSession("member");
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

/** Admin: broadcast a message with up to five private file attachments. */
export async function POST(req: Request) {
  const gate = await requirePasswordUpdatedSession("admin");
  if ("error" in gate) return gate.error;

  let audience = "all";
  let title = "";
  let message = "";
  let files: File[] = [];
  const contentType = req.headers.get("content-type") || "";
  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const textField = (key: string) => {
        const value = form.get(key);
        return typeof value === "string" ? value : "";
      };
      audience = textField("audience") || "all";
      title = textField("title");
      message = textField("message");
      const entries = form.getAll("attachments");
      for (const entry of entries) {
        if (typeof entry === "string") {
          if (entry) return Response.json({ error: "Invalid attachment upload." }, { status: 400 });
          continue;
        }
        if (entry.size > 0) files.push(entry);
      }
    } else {
      const body = await req.json() as { audience?: unknown; title?: unknown; message?: unknown };
      audience = typeof body?.audience === "string" ? body.audience : "all";
      title = typeof body?.title === "string" ? body.title : "";
      message = typeof body?.message === "string" ? body.message : "";
    }
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  title = title.trim();
  message = message.trim();
  if (!title || !message) {
    return Response.json({ error: "Title and message are required." }, { status: 400 });
  }
  if (title.length > 160 || message.length > 10000) {
    return Response.json({ error: "Title must be 160 characters or less and message 10,000 characters or less." }, { status: 400 });
  }
  if (files.length > MAX_ATTACHMENTS) {
    return Response.json({ error: `Attach no more than ${MAX_ATTACHMENTS} files to one message.` }, { status: 400 });
  }
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return Response.json({ error: "Attachments must total 4 MB or less per message." }, { status: 413 });
  }

  const audienceId = audience && audience !== "all" ? audience : "all";
  const store = getStore();
  if (audienceId !== "all") {
    const member = await store.getMember(audienceId);
    if (!member) return Response.json({ error: "Member not found." }, { status: 404 });
  }

  const attachmentMetadata: NotificationAttachment[] = [];
  try {
    for (const file of files) {
      const extension = file.name.split(".").pop()?.toLowerCase() || "";
      const expectedType = MIME_BY_EXTENSION[extension];
      if (!expectedType || (file.type && file.type !== expectedType)) {
        throw new Error(`Unsupported file type: ${file.name}. Use an image, PDF, DOCX, XLSX, PPTX, TXT or CSV file.`);
      }
      const fileId = randomUUID();
      const path = `broadcasts/${fileId}.${extension}`;
      const safeName = formatFileName(file.name);
      await store.uploadNotificationAttachment(path, await file.arrayBuffer(), expectedType);
      attachmentMetadata.push({ id: fileId, name: safeName, contentType: expectedType, size: file.size, path });
    }

    const item = await store.createNotification(audienceId, title, message, attachmentMetadata);
    return Response.json({ ok: true, notification: publicNotification(item) }, { status: 201 });
  } catch (error) {
    await Promise.allSettled(attachmentMetadata.map((file) => store.deleteNotificationAttachment(file.path)));
    if (files.length && store.mode === "demo") {
      return Response.json({ error: "File attachments require the production Supabase backend." }, { status: 501 });
    }
    const messageText = error instanceof Error ? error.message : "Broadcast failed.";
    const invalidFile = messageText.startsWith("Unsupported file type:");
    return Response.json({
      error: invalidFile
        ? messageText
        : files.length
          ? "The notification or attachment upload failed. Confirm the notification-attachments migration has run, then try again."
          : "The notification could not be sent. Please try again.",
    }, { status: invalidFile ? 400 : 500 });
  }
}
