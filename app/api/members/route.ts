import { requirePasswordUpdatedSession } from "@/lib/session-guard";
import { getStore } from "@/lib/store";

/** Admin: list members with optional search/status filters. */
export async function GET(req: Request) {
  const gate = await requirePasswordUpdatedSession("admin");
  if ("error" in gate) return gate.error;
  const url = new URL(req.url);
  const list = await getStore().listMembers(
    url.searchParams.get("q") || undefined,
    url.searchParams.get("status") || undefined
  );
  return Response.json({ members: list });
}

/** Admin: provision existing members with name-based usernames and one-time passwords. */
export async function POST(req: Request) {
  const gate = await requirePasswordUpdatedSession("admin");
  if ("error" in gate) return gate.error;

  let body: { names?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!Array.isArray(body.names) || body.names.length < 1 || body.names.length > 50) {
    return Response.json({ error: "Provide between 1 and 50 member names." }, { status: 400 });
  }
  const names: string[] = [];
  for (const value of body.names) {
    if (typeof value !== "string") return Response.json({ error: "Each member name must be text." }, { status: 400 });
    const name = value.trim().replace(/\s+/g, " ");
    if (name.length < 3 || name.length > 120) {
      return Response.json({ error: "Each name must be between 3 and 120 characters." }, { status: 400 });
    }
    names.push(name);
  }

  try {
    const created = await getStore().createInvitedMembers(names);
    return Response.json({
      members: created.map(({ member, temp }) => ({ member, tempPassword: temp })),
    }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Member accounts could not be provisioned.";
    const conflict = /already exists|duplicate|unique constraint|username.*(?:in use|reserved|available)/i.test(message);
    return Response.json({ error: conflict ? message : "Member accounts could not be provisioned. Check the database migration and try again." }, { status: conflict ? 409 : 500 });
  }
}
