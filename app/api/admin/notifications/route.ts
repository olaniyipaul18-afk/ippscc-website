import { requirePasswordUpdatedSession } from "@/lib/session-guard";
import { getStore, type NotificationItem, type NotificationItemSummary } from "@/lib/store";

function summarize(item: NotificationItem): NotificationItemSummary {
  const { attachments, ...rest } = item;
  return {
    ...rest,
    attachments: attachments.map(({ path: _path, ...attachment }) => attachment),
  };
}

/** Admin: list recent notifications for review and deletion. */
export async function GET(req: Request) {
  const gate = await requirePasswordUpdatedSession("admin");
  if ("error" in gate) return gate.error;
  const requestedLimit = Number(new URL(req.url).searchParams.get("limit"));
  const limit = Number.isFinite(requestedLimit) && requestedLimit > 0
    ? Math.min(100, Math.floor(requestedLimit))
    : 50;
  const list = await getStore().recentNotifications(limit);
  return Response.json({ notifications: list.map(summarize) }, {
    headers: { "Cache-Control": "private, no-store" },
  });
}
