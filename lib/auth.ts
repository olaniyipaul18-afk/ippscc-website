import { scryptSync, randomBytes, timingSafeEqual, createHmac } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Server-only authentication primitives (never import from client components):
 * scrypt password hashing + signed session cookies (HMAC-SHA256).
 */

const SECRET = process.env.AUTH_SECRET || "dev-only-secret-change-me";
if (!process.env.AUTH_SECRET) {
  console.warn("[auth] AUTH_SECRET is not set — using an insecure development secret.");
}

export type SessionRole = "member" | "admin";

export type Session = {
  sub: string;
  role: SessionRole;
  name: string;
  iat: number;
  exp: number;
};

export const SESSION_COOKIE = "ippscc_session";
const SESSION_TTL_DAYS = 7;

const b64u = (buf: Buffer) => buf.toString("base64url");
const unb64u = (s: string) => Buffer.from(s, "base64url");

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt$16384$8$1$${b64u(salt)}$${b64u(hash)}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const parts = stored.split("$");
    if (parts.length !== 6 || parts[0] !== "scrypt") return false;
    const [, n, r, p, salt, hash] = parts;
    const derived = scryptSync(password, unb64u(salt), 64, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
    });
    return timingSafeEqual(derived, unb64u(hash));
  } catch {
    return false;
  }
}

export function signSession(input: { sub: string; role: SessionRole; name: string }): string {
  const now = Math.floor(Date.now() / 1000);
  const body = b64u(
    Buffer.from(
      JSON.stringify({ ...input, iat: now, exp: now + SESSION_TTL_DAYS * 86400 })
    )
  );
  const sig = b64u(createHmac("sha256", SECRET).update(`v1.${body}`).digest());
  return `v1.${body}.${sig}`;
}

export function verifySession(token?: string | null): Session | null {
  if (!token) return null;
  try {
    const [v, body, sig] = token.split(".");
    if (v !== "v1" || !body || !sig) return null;
    const expected = createHmac("sha256", SECRET).update(`v1.${body}`).digest();
    if (!timingSafeEqual(unb64u(sig), expected)) return null;
    const session = JSON.parse(unb64u(body).toString()) as Session;
    if (session.exp < Math.floor(Date.now() / 1000)) return null;
    if (session.role !== "member" && session.role !== "admin") return null;
    return session;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  return verifySession(jar.get(SESSION_COOKIE)?.value);
}

export async function setSessionCookie(token: string): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_DAYS * 86400,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

/** Guard helper for Route Handlers. Returns the session or an error Response. */
export async function requireSession(
  role?: SessionRole
): Promise<{ session: Session } | { error: Response }> {
  const session = await getSession();
  if (!session || (role && session.role !== role)) {
    return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session };
}

export function tempPassword(): string {
  return `IPPSCC-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export function referenceId(): string {
  return `IPPSCC-${new Date().getFullYear()}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${randomBytes(4).toString("hex")}`;
}
