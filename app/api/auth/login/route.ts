import { setSessionCookie, signSession } from "@/lib/auth";
import { getStore } from "@/lib/store";

export async function POST(req: Request) {
  let body: { email?: unknown; identifier?: unknown; password?: unknown; role?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const { password, role } = body;
  if (typeof password !== "string" || !password || (role !== "member" && role !== "admin")) {
    return Response.json({ error: "Account identifier, password and account type are required." }, { status: 400 });
  }
  const identifier = role === "admin"
    ? (typeof body.email === "string" ? body.email.trim() : "")
    : (typeof body.identifier === "string" ? body.identifier.trim() : typeof body.email === "string" ? body.email.trim() : "");
  if (!identifier) {
    return Response.json({ error: role === "admin" ? "Administrator email is required." : "Username or email is required." }, { status: 400 });
  }

  const store = getStore();
  if (role === "admin") {
    const admin = await store.verifyAdmin(identifier, password);
    if (!admin) return Response.json({ error: "Invalid administrator credentials." }, { status: 401 });
    await setSessionCookie(signSession({ sub: admin.id, role: "admin", name: admin.name }));
    return Response.json({
      ok: true,
      redirect: "/admin",
      name: admin.name,
      mustChangePassword: admin.mustChangePassword,
    });
  }

  const member = await store.verifyMember(identifier, password);
  if (!member) {
    return Response.json(
      { error: "Invalid credentials, or your account is suspended. Contact the Corps for help." },
      { status: 401 }
    );
  }
  await setSessionCookie(signSession({ sub: member.id, role: "member", name: member.name }));
  return Response.json({
    ok: true,
    redirect: "/portal",
    name: member.name,
    mustChangePassword: member.mustChangePassword,
  });
}
