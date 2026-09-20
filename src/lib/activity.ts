// Merges daily activity across GitHub, LeetCode, and Codeforces into a single
// GitHub-style contribution calendar for the CurrentlyGrinding heatmap.
// All three sources are public, unauthenticated endpoints — no tokens, no DB.
// Each fetch is cached/revalidated by Next.js (see `next.revalidate` below),
// and a failing source degrades to all-zero counts instead of breaking the others.

export type DayActivity = {
  date: string; // YYYY-MM-DD, UTC
  github: number;
  leetcode: number;
  codeforces: number;
  total: number;
};

const GITHUB_USERNAME = "AyushM03";
const LEETCODE_USERNAME = "AyushMM03";
const CODEFORCES_HANDLE = "ayushm03";

const REVALIDATE_SECONDS = 3600;
const WEEKS = 53;

async function safeFetchJson(
  url: string,
  init?: RequestInit
): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      ...init,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
}

function toDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function getGithubCounts(): Promise<Record<string, number>> {
  const data = (await safeFetchJson(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
  )) as { contributions?: { date: string; count: number }[] } | null;

  const counts: Record<string, number> = {};
  for (const day of data?.contributions ?? []) {
    if (day?.date) counts[day.date] = day.count ?? 0;
  }
  return counts;
}

async function getLeetcodeCounts(): Promise<Record<string, number>> {
  const query = `
    query userProfileCalendar($username: String!) {
      matchedUser(username: $username) {
        userCalendar {
          submissionCalendar
        }
      }
    }
  `;

  const data = (await safeFetchJson("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { username: LEETCODE_USERNAME } }),
  })) as {
    data?: { matchedUser?: { userCalendar?: { submissionCalendar?: string } } };
  } | null;

  const counts: Record<string, number> = {};
  const raw = data?.data?.matchedUser?.userCalendar?.submissionCalendar;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Record<string, number>;
      for (const [unixSeconds, count] of Object.entries(parsed)) {
        const date = toDateKey(new Date(Number(unixSeconds) * 1000));
        counts[date] = (counts[date] ?? 0) + count;
      }
    } catch {
      // Malformed calendar payload — treat as no data for this source.
    }
  }
  return counts;
}

async function getCodeforcesCounts(): Promise<Record<string, number>> {
  const data = (await safeFetchJson(
    `https://codeforces.com/api/user.status?handle=${CODEFORCES_HANDLE}&from=1&count=10000`
  )) as { status?: string; result?: { creationTimeSeconds: number }[] } | null;

  const counts: Record<string, number> = {};
  if (data?.status === "OK") {
    for (const submission of data.result ?? []) {
      if (!submission?.creationTimeSeconds) continue;
      const date = toDateKey(new Date(submission.creationTimeSeconds * 1000));
      counts[date] = (counts[date] ?? 0) + 1;
    }
  }
  return counts;
}

export async function getActivityData(): Promise<DayActivity[]> {
  const [github, leetcode, codeforces] = await Promise.all([
    getGithubCounts(),
    getLeetcodeCounts(),
    getCodeforcesCounts(),
  ]);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Extend to the end of the current week (Saturday), then step back 53 full
  // weeks, so the grid is always Sunday-aligned like GitHub's own calendar.
  const end = new Date(today);
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (WEEKS * 7 - 1));

  const days: DayActivity[] = [];
  for (
    const cursor = new Date(start);
    cursor <= end;
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  ) {
    const key = toDateKey(cursor);
    const g = github[key] ?? 0;
    const l = leetcode[key] ?? 0;
    const c = codeforces[key] ?? 0;
    days.push({ date: key, github: g, leetcode: l, codeforces: c, total: g + l + c });
  }

  return days;
}
