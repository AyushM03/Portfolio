import { getActivityData } from "@/lib/activity";
import ActivityHeatmap from "@/components/ActivityHeatmap";

export default async function CurrentlyGrinding() {
  const data = await getActivityData();

  return (
    <section
      id="grinding"
      className="bg-neutral-50 px-6 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-4 font-heading text-3xl font-semibold text-foreground md:text-4xl">
          Currently grinding
        </h2>
        <p className="mb-10 max-w-2xl text-foreground/60">
          Daily reps across DSA practice and shipped code, pulled live from
          GitHub, LeetCode, and Codeforces. Hover a day for the breakdown,
          click a platform to see the profile.
        </p>

        <ActivityHeatmap data={data} />
      </div>
    </section>
  );
}
