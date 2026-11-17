import { requireSession, type Session, type SessionRole } from "@/lib/auth";
import { getStore } from "@/lib/store";

type SessionGate = { session: Session } | { error: Response };

/**
 * Require a valid session and a completed first-login password change.
 * Password-change endpoints deliberately use requireSession directly so a
 * temporary-password account can reach the one action it must complete.
 */
export async function requirePasswordUpdatedSession(role?: SessionRole): Promise<SessionGate> {
  const gate = await requireSession(role);
  if ("error" in gate) return gate;

  const { session } = gate;
  const store = getStore();
  if (session.role === "admin") {
    const admin = await store.getAdmin(session.sub);
    if (!admin) return { error: Response.json({ error: "Account not found." }, { status: 401 }) };
    if (admin.mustChangePassword) {
      return {
        error: Response.json(
          {
            error: "Change your temporary password to continue.",
            code: "PASSWORD_CHANGE_REQUIRED",
            redirect: "/admin/change-password",
          },
          { status: 403 }
        ),
      };
    }
  } else {
    const member = await store.getMember(session.sub);
    if (!member || member.status === "suspended") {
      return { error: Response.json({ error: "Account not found or suspended." }, { status: 401 }) };
    }
    if (member.mustChangePassword) {
      return {
        error: Response.json(
          {
            error: "Change your temporary password to continue.",
            code: "PASSWORD_CHANGE_REQUIRED",
            redirect: "/portal/change-password",
          },
          { status: 403 }
        ),
      };
    }
  }

  return gate;
}
