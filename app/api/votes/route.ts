import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { castVote, getMyVotes, getTallies, isDemo, VOTER_COOKIE } from "@/lib/votes";

export const dynamic = "force-dynamic";

async function voterKey(): Promise<{ key: string; fresh: boolean }> {
  const store = await cookies();
  const existing = store.get(VOTER_COOKIE)?.value;
  if (existing) return { key: existing, fresh: false };
  return { key: randomBytes(16).toString("hex"), fresh: true };
}

function withVoterCookie(res: Response, key: string, fresh: boolean): Response {
  if (fresh) {
    res.headers.append(
      "Set-Cookie",
      `${VOTER_COOKIE}=${key}; Path=/; Max-Age=63072000; SameSite=Lax`
    );
  }
  return res;
}

/** Public: live tallies + the visitor's own votes. */
export async function GET() {
  try {
    const { key, fresh } = await voterKey();
    const [{ tallies, totals }, myVotes] = await Promise.all([getTallies(), getMyVotes(key)]);
    return withVoterCookie(
      Response.json({ tallies, totals, myVotes, demo: isDemo() }),
      key,
      fresh
    );
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Could not load votes." },
      { status: 500 }
    );
  }
}

/** Public: cast one vote per category. */
export async function POST(req: Request) {
  let body: { categoryId?: string; nomineeId?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof body.categoryId !== "string" || typeof body.nomineeId !== "string") {
    return Response.json({ error: "Category and nominee are required." }, { status: 400 });
  }
  try {
    const { key, fresh } = await voterKey();
    const result = await castVote(body.categoryId, body.nomineeId, key);
    if (result === "invalid") {
      return Response.json(
        { error: "Voting is not open for this nominee yet." },
        { status: 400 }
      );
    }
    if (result === "already") {
      return Response.json(
        { error: "You have already voted in this category — one vote per category." },
        { status: 409 }
      );
    }
    const { tallies, totals } = await getTallies();
    return withVoterCookie(
      Response.json({
        ok: true,
        tallies,
        totals,
        voted: { categoryId: body.categoryId, nomineeId: body.nomineeId },
      }),
      key,
      fresh
    );
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Your vote could not be recorded." },
      { status: 500 }
    );
  }
}
