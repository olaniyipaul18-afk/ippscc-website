import { setSessionCookie, signSession } from "@/lib/auth";
import { getStore } from "@/lib/store";

export async function POST(req: Request) {
  let body: { email?: string; password?: string; role?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const { email, password, role } = body;
  if (!email || !password || (role !== "member" && role !== "admin")) {
    return Response.json({ error: "Email, password and account type are required." }, { status: 400 });
  }

  const store = getStore();
  if (role === "admin") {
    const admin = await store.verifyAdmin(String(email), String(password));
    if (!admin) return Response.json({ error: "Invalid administrator credentials." }, { status: 401 });
    await setSessionCookie(signSession({ sub: admin.id, role: "admin", name: admin.name }));
    return Response.json({ ok: true, redirect: "/admin", name: admin.name });
  }

  const member = await store.verifyMember(String(email), String(password));
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
