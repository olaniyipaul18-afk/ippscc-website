import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { awardCategories, findNominee } from "@/data/awards";

/**
 * Awards voting backend — server only.
 * Demo mode (default): votes live in memory and reset on redeploy.
 * Production: set Supabase env vars and run supabase/schema.sql (award_votes table).
 */

export type Tallies = Record<string, Record<string, number>>;
export type Totals = Record<string, number>;
export type MyVotes = Record<string, string>; // categoryId -> nomineeId

export const VOTER_COOKIE = "ippscc_voter";

export function isDemo(): boolean {
  return !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY;
}

let supabase: SupabaseClient | null | undefined;
function db(): SupabaseClient | null {
  if (supabase !== undefined) return supabase;
  if (isDemo()) {
    supabase = null;
    return null;
  }
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { persistSession: false } }
  );
  return supabase;
}

/* ——— Demo store (in-memory) ——— */

const demoVotes = new Map<string, Map<string, string>>(); // categoryId -> voterKey -> nomineeId

function emptyTallies(): { tallies: Tallies; totals: Totals } {
  const tallies: Tallies = {};
  const totals: Totals = {};
  for (const cat of awardCategories) {
    tallies[cat.id] = {};
    totals[cat.id] = 0;
    for (const n of cat.nominees) tallies[cat.id][n.id] = 0;
  }
  return { tallies, totals };
}

export async function getTallies(): Promise<{ tallies: Tallies; totals: Totals }> {
  const out = emptyTallies();
  const client = db();
  if (!client) {
    for (const [catId, voters] of demoVotes) {
      if (!out.tallies[catId]) continue;
      for (const nomineeId of voters.values()) {
        if (out.tallies[catId][nomineeId] !== undefined) {
          out.tallies[catId][nomineeId] += 1;
          out.totals[catId] += 1;
        }
      }
    }
    return out;
  }
  const { data, error } = await client.from("award_votes").select("category_id, nominee_id");
  if (error) throw new Error("Could not load vote counts.");
  for (const row of data as { category_id: string; nominee_id: string }[]) {
    if (out.tallies[row.category_id]?.[row.nominee_id] !== undefined) {
      out.tallies[row.category_id][row.nominee_id] += 1;
      out.totals[row.category_id] += 1;
    }
  }
  return out;
}

export async function getMyVotes(voterKey: string): Promise<MyVotes> {
  const mine: MyVotes = {};
  if (!voterKey) return mine;
  const client = db();
  if (!client) {
    for (const [catId, voters] of demoVotes) {
      const v = voters.get(voterKey);
      if (v) mine[catId] = v;
    }
    return mine;
  }
  const { data, error } = await client
    .from("award_votes")
    .select("category_id, nominee_id")
    .eq("voter_key", voterKey);
  if (error) throw new Error("Could not load your votes.");
  for (const row of data as { category_id: string; nominee_id: string }[]) {
    mine[row.category_id] = row.nominee_id;
  }
  return mine;
}

export async function castVote(
  categoryId: string,
  nomineeId: string,
  voterKey: string
): Promise<"ok" | "invalid" | "already"> {
  const nominee = findNominee(categoryId, nomineeId);
  if (!nominee || nominee.placeholder || !voterKey) return "invalid";
  const client = db();
  if (!client) {
    let voters = demoVotes.get(categoryId);
    if (!voters) {
      voters = new Map();
      demoVotes.set(categoryId, voters);
    }
    if (voters.has(voterKey)) return "already";
    voters.set(voterKey, nomineeId);
    return "ok";
  }
  const { error } = await client
    .from("award_votes")
    .insert({ category_id: categoryId, nominee_id: nomineeId, voter_key: voterKey });
  if (error) {
    // Unique violation on (category_id, voter_key) => already voted in this category
    if ((error as { code?: string }).code === "23505") return "already";
    throw new Error("Your vote could not be recorded. Please try again.");
  }
  return "ok";
}
