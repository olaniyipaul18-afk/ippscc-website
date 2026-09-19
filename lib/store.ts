import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { hashPassword, newId, referenceId, tempPassword } from "./auth";

/**
 * Server-only data layer (never import from client components).
 *
 * Two implementations behind one interface:
 *  - DemoStore: in-memory, seeded, for demonstration without credentials.
 *  - SupabaseStore: persistent Postgres backend (Supabase), used automatically
 *    when NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set.
 */

export type MemberStatus = "active" | "suspended" | "pending";
export type ApplicationStatus =
  | "pending"
  | "under_review"
  | "changes_requested"
  | "approved"
  | "rejected"
  | "completed";

export type Member = {
  id: string;
  memberId: string;
  email: string;
  name: string;
  title: string;
  rank: string;
  status: MemberStatus;
  region: string;
  joinedAt: string;
  profile: Record<string, unknown>;
  passwordHash: string;
  mustChangePassword: boolean;
};

export type MemberPublic = Omit<Member, "passwordHash">;

export type ApplicationNote = { by: string; at: string; text: string; status: ApplicationStatus };

export type Application = {
  id: string;
  ref: string;
  email: string;
  name: string;
  payload: Record<string, unknown>;
  status: ApplicationStatus;
  notes: ApplicationNote[];
  createdAt: string;
  updatedAt: string;
};

export type NotificationItem = {
  id: string;
  audience: string; // member id or "all"
  title: string;
  body: string;
  createdAt: string;
  readBy: string[];
};

export type AdminUser = { id: string; email: string; name: string; passwordHash: string };

export type Stats = {
  membersTotal: number;
  membersActive: number;
  applicationsPending: number;
  applicationsTotal: number;
  approvedTotal: number;
};

export interface Store {
  mode: "demo" | "supabase";
  verifyMember(email: string, password: string): Promise<MemberPublic | null>;
  verifyAdmin(email: string, password: string): Promise<AdminUser | null>;
  getMember(id: string): Promise<MemberPublic | null>;
  getMemberByEmail(email: string): Promise<MemberPublic | null>;
  listMembers(q?: string, status?: string): Promise<MemberPublic[]>;
  updateMember(id: string, patch: Partial<Member>): Promise<MemberPublic | null>;
  resetMemberPassword(id: string): Promise<{ member: MemberPublic; temp: string } | null>;
  createMemberFromApplication(app: Application, by: string): Promise<{ member: MemberPublic; temp: string }>;
  createApplication(email: string, name: string, payload: Record<string, unknown>): Promise<Application>;
  listApplications(status?: string, q?: string): Promise<Application[]>;
  getApplication(id: string): Promise<Application | null>;
  updateApplication(id: string, patch: Partial<Application>): Promise<Application | null>;
  trackApplication(ref: string, email: string): Promise<Application | null>;
  notificationsFor(memberId: string): Promise<NotificationItem[]>;
  markNotificationsRead(memberId: string, ids: "all" | string[]): Promise<void>;
  createNotification(audience: string, title: string, body: string): Promise<NotificationItem>;
  recentNotifications(limit?: number): Promise<NotificationItem[]>;
  stats(): Promise<Stats>;
  uploadProfilePhoto(memberId: string, bytes: ArrayBuffer, contentType: string): Promise<string | null>;
}

const strip = (m: Member): MemberPublic => {
  const { passwordHash: _passwordHash, ...rest } = m;
  return rest;
};

/* ————————————————————————— Demo store ————————————————————————— */

class DemoStore implements Store {
  mode = "demo" as const;
  private members = new Map<string, Member>();
  private admins = new Map<string, AdminUser>();
  private applications = new Map<string, Application>();
  private notifications = new Map<string, NotificationItem>();
  private seq = 42;

  constructor() {
    const now = new Date().toISOString();
    const admin: AdminUser = {
      id: "adm_seed",
      email: "admin@ippscc.org",
      name: "Corps Administrator",
      passwordHash: hashPassword("Admin123!"),
    };
    this.admins.set(admin.id, admin);

    const m1: Member = {
      id: "mem_seed_1",
      memberId: `IPPSCC/USA/2025/${String(this.seq).padStart(4, "0")}`,
      email: "member@ippscc.org",
      name: "Chaplain Adaeze Nwosu",
      title: "Chaplain Officer",
      rank: "Chaplain Officer",
      status: "active",
      region: "IPPSCC Nigeria — Lagos Command",
      joinedAt: now,
      mustChangePassword: false,
      passwordHash: hashPassword("Member123!"),
      profile: {
        fullName: "Chaplain Adaeze Nwosu",
        phone: "+234 801 234 5678",
        country: "Nigeria",
        city: "Lagos",
        serviceTrack: "Law Enforcement Chaplaincy",
        church: "Grace Assembly, Lagos",
        photoUrl: "",
      },
    };
    const m2: Member = {
      id: "mem_seed_2",
      memberId: "IPPSCC/USA/2025/0137",
      email: "john.miller@example.com",
      name: "Chaplain John Miller",
      title: "Senior Chaplain",
      rank: "Senior Chaplain",
      status: "active",
      region: "USA — National Command",
      joinedAt: now,
      mustChangePassword: false,
      passwordHash: hashPassword("Member123!"),
      profile: { fullName: "Chaplain John Miller", phone: "+1 (555) 010-2030", country: "United States", city: "Dallas", serviceTrack: "First Responder Support", church: "Cornerstone Chapel", photoUrl: "" },
    };
    this.members.set(m1.id, m1);
    this.members.set(m2.id, m2);

    const app1: Application = {
      id: "app_seed_1",
      ref: "IPPSCC-2026-DEMO1",
      email: "demo-track@example.com",
      name: "Applicant Demo",
      status: "under_review",
      createdAt: now,
      updatedAt: now,
      notes: [{ by: "Corps Administrator", at: now, text: "Credentials received. Referee verification in progress.", status: "under_review" }],
      payload: {
        fullName: "Applicant Demo", email: "demo-track@example.com", phone: "+234 802 000 0000",
        country: "Nigeria", city: "Abuja", serviceTrack: "Crisis & Disaster Chaplaincy",
        motivation: "Called to stand beside responders in their hardest hours.",
      },
    };
    this.applications.set(app1.id, app1);

    const n1: NotificationItem = {
      id: "not_seed_1", audience: "all", title: "Welcome to the Corps Portal",
      body: "Your account is active. Complete your profile, review your digital ID card, and watch this space for formation announcements.",
      createdAt: now, readBy: [],
    };
    const n2: NotificationItem = {
      id: "not_seed_2", audience: m1.id, title: "Lagos Command fellowship — Saturday",
      body: "Monthly chaplains' fellowship holds this Saturday at the Lagos Command hall. Attendance counts toward continuing development.",
      createdAt: now, readBy: [],
    };
    this.notifications.set(n1.id, n1);
    this.notifications.set(n2.id, n2);
  }

  private matchMember(m: Member, q?: string, status?: string) {
    if (status && status !== "all" && m.status !== status) return false;
    if (q) {
      const hay = `${m.name} ${m.email} ${m.memberId}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  }

  async verifyMember(email: string, password: string) {
    const { verifyPassword } = await import("./auth");
    const m = [...this.members.values()].find((x) => x.email.toLowerCase() === email.toLowerCase());
    if (!m || m.status === "suspended") return null;
    const ok = verifyPassword(password, m.passwordHash);
    return ok ? strip(m) : null;
  }

  async verifyAdmin(email: string, password: string) {
    const { verifyPassword } = await import("./auth");
    const a = [...this.admins.values()].find((x) => x.email.toLowerCase() === email.toLowerCase());
    if (!a) return null;
    return verifyPassword(password, a.passwordHash) ? a : null;
  }

  async getMember(id: string) {
    const m = this.members.get(id);
    return m ? strip(m) : null;
  }

  async getMemberByEmail(email: string) {
    const m = [...this.members.values()].find((x) => x.email.toLowerCase() === email.toLowerCase());
    return m ? strip(m) : null;
  }

  async listMembers(q?: string, status?: string) {
    return [...this.members.values()].filter((m) => this.matchMember(m, q, status)).map(strip);
  }

  async updateMember(id: string, patch: Partial<Member>) {
    const m = this.members.get(id);
    if (!m) return null;
    const next = { ...m, ...patch, id: m.id, profile: { ...m.profile, ...(patch.profile || {}) } };
    this.members.set(id, next);
    return strip(next);
  }

  async resetMemberPassword(id: string) {
    const m = this.members.get(id);
    if (!m) return null;
    const temp = tempPassword();
    m.passwordHash = hashPassword(temp);
    m.mustChangePassword = true;
    this.members.set(id, m);
    return { member: strip(m), temp };
  }

  async createMemberFromApplication(app: Application, _by: string) {
    this.seq += 1;
    const year = new Date().getFullYear();
    const temp = tempPassword();
    const payload = app.payload as Record<string, string>;
    const m: Member = {
      id: newId("mem"),
      memberId: `IPPSCC/USA/${year}/${String(this.seq).padStart(4, "0")}`,
      email: app.email,
      name: app.name,
      title: "Chaplain Officer",
      rank: "Chaplain Officer",
      status: "active",
      region: typeof payload.country === "string" && payload.country ? payload.country : "USA — National Command",
      joinedAt: new Date().toISOString(),
      mustChangePassword: true,
      passwordHash: hashPassword(temp),
      profile: {
        fullName: app.name, phone: payload.phone || "", country: payload.country || "",
        city: payload.city || "", serviceTrack: payload.serviceTrack || payload.preferredService || "",
        church: payload.churchName || "", photoUrl: "",
      },
    };
    this.members.set(m.id, m);
    return { member: strip(m), temp };
  }

  async createApplication(email: string, name: string, payload: Record<string, unknown>) {
    const now = new Date().toISOString();
    const app: Application = {
      id: newId("app"), ref: referenceId(), email, name, payload,
      status: "pending", notes: [], createdAt: now, updatedAt: now,
    };
    this.applications.set(app.id, app);
    return app;
  }

  async listApplications(status?: string, q?: string) {
    return [...this.applications.values()]
      .filter((a) => {
        if (status && status !== "all" && a.status !== status) return false;
        if (q) {
          const hay = `${a.name} ${a.email} ${a.ref}`.toLowerCase();
          if (!hay.includes(q.toLowerCase())) return false;
        }
        return true;
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async getApplication(id: string) {
    return this.applications.get(id) || null;
  }

  async updateApplication(id: string, patch: Partial<Application>) {
    const a = this.applications.get(id);
    if (!a) return null;
    const next = { ...a, ...patch, id: a.id, updatedAt: new Date().toISOString() };
    this.applications.set(id, next);
    return next;
  }

  async trackApplication(ref: string, email: string) {
    const a = [...this.applications.values()].find(
      (x) => x.ref.toLowerCase() === ref.trim().toLowerCase() && x.email.toLowerCase() === email.trim().toLowerCase()
    );
    return a || null;
  }

  async notificationsFor(memberId: string) {
    return [...this.notifications.values()]
      .filter((n) => n.audience === "all" || n.audience === memberId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async markNotificationsRead(memberId: string, ids: "all" | string[]) {
    for (const n of this.notifications.values()) {
      if (n.audience !== "all" && n.audience !== memberId) continue;
      if (ids !== "all" && !ids.includes(n.id)) continue;
      if (!n.readBy.includes(memberId)) n.readBy.push(memberId);
    }
  }

  async createNotification(audience: string, title: string, body: string) {
    const n: NotificationItem = { id: newId("not"), audience, title, body, createdAt: new Date().toISOString(), readBy: [] };
    this.notifications.set(n.id, n);
    return n;
  }

  async recentNotifications(limit = 20) {
    return [...this.notifications.values()]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit);
  }

  async stats(): Promise<Stats> {
    const members = [...this.members.values()];
    const apps = [...this.applications.values()];
    return {
      membersTotal: members.length,
      membersActive: members.filter((m) => m.status === "active").length,
      applicationsPending: apps.filter((a) => a.status === "pending" || a.status === "under_review").length,
      applicationsTotal: apps.length,
      approvedTotal: apps.filter((a) => a.status === "approved" || a.status === "completed").length,
    };
  }

  async uploadProfilePhoto(_memberId: string, _bytes: ArrayBuffer, _contentType: string) {
    return null; // photo uploads require the Supabase backend
  }
}

/* ————————————————————————— Supabase store ————————————————————————— */

type MemberRow = {
  id: string; member_id: string; email: string; name: string; title: string; rank: string;
  status: MemberStatus; region: string; joined_at: string; profile: Record<string, unknown>;
  password_hash: string; must_change_password: boolean;
};
type ApplicationRow = {
  id: string; ref: string; email: string; name: string; payload: Record<string, unknown>;
  status: ApplicationStatus; notes: ApplicationNote[]; created_at: string; updated_at: string;
};
type NotificationRow = { id: string; audience: string; title: string; body: string; created_at: string; read_by: string[] };
type AdminRow = { id: string; email: string; name: string; password_hash: string };

const toMember = (r: MemberRow): Member => ({
  id: r.id, memberId: r.member_id, email: r.email, name: r.name, title: r.title, rank: r.rank,
  status: r.status, region: r.region, joinedAt: r.joined_at, profile: r.profile || {},
  passwordHash: r.password_hash, mustChangePassword: r.must_change_password,
});
const toApplication = (r: ApplicationRow): Application => ({
  id: r.id, ref: r.ref, email: r.email, name: r.name, payload: r.payload || {},
  status: r.status, notes: r.notes || [], createdAt: r.created_at, updatedAt: r.updated_at,
});
const toNotification = (r: NotificationRow): NotificationItem => ({
  id: r.id, audience: r.audience, title: r.title, body: r.body,
  createdAt: r.created_at, readBy: r.read_by || [],
});

class SupabaseStore implements Store {
  mode = "supabase" as const;
  private db: SupabaseClient;

  constructor() {
    this.db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      { auth: { persistSession: false } }
    );
  }

  async verifyMember(email: string, password: string) {
    const { verifyPassword } = await import("./auth");
    const { data } = await this.db.from("members").select("*").ilike("email", email).maybeSingle();
    if (!data || data.status === "suspended") return null;
    return verifyPassword(password, (data as MemberRow).password_hash) ? strip(toMember(data as MemberRow)) : null;
  }

  async verifyAdmin(email: string, password: string) {
    const { verifyPassword } = await import("./auth");
    const { data } = await this.db.from("admins").select("*").ilike("email", email).maybeSingle();
    if (!data) return null;
    const row = data as AdminRow;
    return verifyPassword(password, row.password_hash)
      ? { id: row.id, email: row.email, name: row.name, passwordHash: row.password_hash }
      : null;
  }

  async getMember(id: string) {
    const { data } = await this.db.from("members").select("*").eq("id", id).maybeSingle();
    return data ? strip(toMember(data as MemberRow)) : null;
  }

  async getMemberByEmail(email: string) {
    const { data } = await this.db.from("members").select("*").ilike("email", email).maybeSingle();
    return data ? strip(toMember(data as MemberRow)) : null;
  }

  async listMembers(q?: string, status?: string) {
    let query = this.db.from("members").select("*").order("joined_at", { ascending: false }).limit(500);
    if (status && status !== "all") query = query.eq("status", status);
    if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,member_id.ilike.%${q}%`);
    const { data } = await query;
    return (data as MemberRow[] | null || []).map((r) => strip(toMember(r)));
  }

  async updateMember(id: string, patch: Partial<Member>) {
    const current = await this.db.from("members").select("profile").eq("id", id).maybeSingle();
    const profile = { ...((current?.data as { profile?: Record<string, unknown> } | null)?.profile || {}), ...(patch.profile || {}) };
    const row: Record<string, unknown> = { profile };
    if (patch.name !== undefined) row.name = patch.name;
    if (patch.title !== undefined) row.title = patch.title;
    if (patch.rank !== undefined) row.rank = patch.rank;
    if (patch.status !== undefined) row.status = patch.status;
    if (patch.region !== undefined) row.region = patch.region;
    if (patch.passwordHash !== undefined) row.password_hash = patch.passwordHash;
    if (patch.mustChangePassword !== undefined) row.must_change_password = patch.mustChangePassword;
    const { data } = await this.db.from("members").update(row).eq("id", id).select("*").maybeSingle();
    return data ? strip(toMember(data as MemberRow)) : null;
  }

  async resetMemberPassword(id: string) {
    const temp = tempPassword();
    const { data } = await this.db
      .from("members")
      .update({ password_hash: hashPassword(temp), must_change_password: true })
      .eq("id", id)
      .select("*")
      .maybeSingle();
    return data ? { member: strip(toMember(data as MemberRow)), temp } : null;
  }

  async createMemberFromApplication(app: Application, _by: string) {
    const year = new Date().getFullYear();
    const { count } = await this.db.from("members").select("id", { count: "exact", head: true });
    const seq = String((count || 0) + 1).padStart(4, "0");
    const temp = tempPassword();
    const payload = app.payload as Record<string, string>;
    const row = {
      id: newId("mem"),
      member_id: `IPPSCC/USA/${year}/${seq}`,
      email: app.email,
      name: app.name,
      title: "Chaplain Officer",
      rank: "Chaplain Officer",
      status: "active",
      region: payload.country || "USA — National Command",
      joined_at: new Date().toISOString(),
      must_change_password: true,
      password_hash: hashPassword(temp),
      profile: {
        fullName: app.name, phone: payload.phone || "", country: payload.country || "",
        city: payload.city || "", serviceTrack: payload.serviceTrack || payload.preferredService || "",
        church: payload.churchName || "", photoUrl: "",
      },
    };
    const { data, error } = await this.db.from("members").insert(row).select("*").single();
    if (error || !data) throw new Error(error?.message || "Failed to create member");
    return { member: strip(toMember(data as MemberRow)), temp };
  }

  async createApplication(email: string, name: string, payload: Record<string, unknown>) {
    const now = new Date().toISOString();
    const row = { id: newId("app"), ref: referenceId(), email, name, payload, status: "pending", notes: [], created_at: now, updated_at: now };
    const { data, error } = await this.db.from("applications").insert(row).select("*").single();
    if (error || !data) throw new Error(error?.message || "Failed to save application");
    return toApplication(data as ApplicationRow);
  }

  async listApplications(status?: string, q?: string) {
    let query = this.db.from("applications").select("*").order("created_at", { ascending: false }).limit(500);
    if (status && status !== "all") query = query.eq("status", status);
    if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,ref.ilike.%${q}%`);
    const { data } = await query;
    return (data as ApplicationRow[] | null || []).map(toApplication);
  }

  async getApplication(id: string) {
    const { data } = await this.db.from("applications").select("*").eq("id", id).maybeSingle();
    return data ? toApplication(data as ApplicationRow) : null;
  }

  async updateApplication(id: string, patch: Partial<Application>) {
    const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (patch.status !== undefined) row.status = patch.status;
    if (patch.notes !== undefined) row.notes = patch.notes;
    const { data } = await this.db.from("applications").update(row).eq("id", id).select("*").maybeSingle();
    return data ? toApplication(data as ApplicationRow) : null;
  }

  async trackApplication(ref: string, email: string) {
    const { data } = await this.db
      .from("applications")
      .select("*")
      .ilike("ref", ref.trim())
      .ilike("email", email.trim())
      .maybeSingle();
    return data ? toApplication(data as ApplicationRow) : null;
  }

  async notificationsFor(memberId: string) {
    const { data } = await this.db
      .from("notifications")
      .select("*")
      .or(`audience.eq.all,audience.eq.${memberId}`)
      .order("created_at", { ascending: false })
      .limit(100);
    return (data as NotificationRow[] | null || []).map(toNotification);
  }

  async markNotificationsRead(memberId: string, ids: "all" | string[]) {
    const list = await this.notificationsFor(memberId);
    for (const n of list) {
      if (ids !== "all" && !ids.includes(n.id)) continue;
      if (n.readBy.includes(memberId)) continue;
      await this.db.from("notifications").update({ read_by: [...n.readBy, memberId] }).eq("id", n.id);
    }
  }

  async createNotification(audience: string, title: string, body: string) {
    const row = { id: newId("not"), audience, title, body, created_at: new Date().toISOString(), read_by: [] };
    const { data, error } = await this.db.from("notifications").insert(row).select("*").single();
    if (error || !data) throw new Error(error?.message || "Failed to create notification");
    return toNotification(data as NotificationRow);
  }

  async recentNotifications(limit = 20) {
    const { data } = await this.db.from("notifications").select("*").order("created_at", { ascending: false }).limit(limit);
    return (data as NotificationRow[] | null || []).map(toNotification);
  }

  async stats(): Promise<Stats> {
    const [{ count: membersTotal }, { count: membersActive }, { count: applicationsTotal }, { data: pending }, { data: approved }] =
      await Promise.all([
        this.db.from("members").select("id", { count: "exact", head: true }),
        this.db.from("members").select("id", { count: "exact", head: true }).eq("status", "active"),
        this.db.from("applications").select("id", { count: "exact", head: true }),
        this.db.from("applications").select("id").in("status", ["pending", "under_review"]),
        this.db.from("applications").select("id").in("status", ["approved", "completed"]),
      ]);
    return {
      membersTotal: membersTotal || 0,
      membersActive: membersActive || 0,
      applicationsPending: pending?.length || 0,
      applicationsTotal: applicationsTotal || 0,
      approvedTotal: approved?.length || 0,
    };
  }

  async uploadProfilePhoto(memberId: string, bytes: ArrayBuffer, contentType: string) {
    const ext = contentType.includes("png") ? "png" : "jpg";
    const path = `profiles/${memberId}.${ext}`;
    const { error } = await this.db.storage.from("member-documents").upload(path, bytes, { contentType, upsert: true });
    if (error) return null;
    const { data } = this.db.storage.from("member-documents").getPublicUrl(path);
    return `${data.publicUrl}?t=${Date.now()}`;
  }
}

/* ————————————————————————— Factory ————————————————————————— */

let cached: Store | null = null;

export function getStore(): Store {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  cached = url && key ? new SupabaseStore() : new DemoStore();
  return cached;
}

export function getMode(): "demo" | "supabase" {
  return getStore().mode;
}
