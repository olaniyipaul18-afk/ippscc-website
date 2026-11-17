import { requirePasswordUpdatedSession } from "@/lib/session-guard";
import { getStore } from "@/lib/store";

const EDITABLE = [
  "fullName", "preferredName", "phone", "whatsapp", "address", "city", "stateProvince",
  "country", "occupation", "employer", "churchName", "churchRole", "serviceTrack",
] as const;

/** Member: own profile. */
export async function GET() {
  const gate = await requirePasswordUpdatedSession("member");
  if ("error" in gate) return gate.error;
  const member = await getStore().getMember(gate.session.sub);
  if (!member) return Response.json({ error: "Account not found." }, { status: 404 });
  return Response.json({ member });
}

/**
 * Member: update own profile (JSON {profile}) and multipart photo upload
 * (FormData photo file, max 3MB). Password changes use /api/auth/change-password.
 */
export async function PATCH(req: Request) {
  const gate = await requirePasswordUpdatedSession("member");
  if ("error" in gate) return gate.error;
  const store = getStore();
  const contentType = req.headers.get("content-type") || "";

  // — Photo upload —
  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("photo");
    if (!(file instanceof File)) return Response.json({ error: "No photo attached." }, { status: 400 });
    if (file.size > 3 * 1024 * 1024) {
      return Response.json({ error: "Photo must be under 3MB." }, { status: 400 });
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return Response.json({ error: "Photo must be JPG, PNG or WebP." }, { status: 400 });
    }
    const url = await store.uploadProfilePhoto(gate.session.sub, await file.arrayBuffer(), file.type);
    if (!url) {
      return Response.json(
        { error: "Photo uploads need the production backend. Connect Supabase to enable them." },
        { status: 501 }
      );
    }
    const member = await store.getMember(gate.session.sub);
    const updated = await store.updateMember(gate.session.sub, {
      profile: { ...(member?.profile || {}), photoUrl: url },
    });
    return Response.json({ member: updated });
  }

  // — JSON —
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const incoming = (body.profile as Record<string, unknown>) || {};
  const patch: Record<string, unknown> = {};
  for (const key of EDITABLE) {
    if (incoming[key] !== undefined) patch[key] = incoming[key];
  }
  const member = await store.getMember(gate.session.sub);
  const updated = await store.updateMember(gate.session.sub, {
    ...(typeof incoming.fullName === "string" && incoming.fullName.trim() ? { name: incoming.fullName.trim() } : {}),
    profile: { ...(member?.profile || {}), ...patch },
  });
  return Response.json({ member: updated });
}
