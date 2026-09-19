import { requireSession } from "@/lib/auth";
import { getStore } from "@/lib/store";

/** Public: submit a membership application. */
export async function POST(req: Request) {
  let body: { email?: string; name?: string; payload?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const { email, name, payload } = body;
  if (!email || !name || !payload || typeof payload !== "object") {
    return Response.json({ error: "Name, email and application details are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return Response.json({ error: "A valid email address is required." }, { status: 400 });
  }
  try {
    const app = await getStore().createApplication(String(email), String(name), payload);
    return Response.json({ ok: true, ref: app.ref, id: app.id }, { status: 201 });
  } catch (err) {
    console.error("[applications] create failed:", err);
    return Response.json({ error: "Could not save your application. Please try again." }, { status: 500 });
  }
}

/** Admin: list applications with optional status/search filters. */
export async function GET(req: Request) {
  const gate = await requireSession("admin");
  if ("error" in gate) return gate.error;
  const url = new URL(req.url);
  const list = await getStore().listApplications(
    url.searchParams.get("status") || undefined,
    url.searchParams.get("q") || undefined
  );
  return Response.json({ applications: list });
}
