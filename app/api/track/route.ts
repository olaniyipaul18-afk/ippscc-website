import { getStore } from "@/lib/store";

/** Public: track an application by reference + email. Returns status-safe fields only. */
export async function POST(req: Request) {
  let body: { ref?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body.ref || !body.email) {
    return Response.json({ error: "Application reference and email are required." }, { status: 400 });
  }
  const app = await getStore().trackApplication(String(body.ref), String(body.email));
  if (!app) {
    return Response.json(
      { error: "No application matches that reference and email combination." },
      { status: 404 }
    );
  }
  return Response.json({
    ref: app.ref,
    name: app.name,
    status: app.status,
    updatedAt: app.updatedAt,
    createdAt: app.createdAt,
    timeline: app.notes.map((n) => ({ status: n.status, at: n.at, text: n.text })),
  });
}
