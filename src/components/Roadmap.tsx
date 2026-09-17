import { roadmap } from "@/data/roadmap";
import RoadmapStep from "@/components/RoadmapStep";

export default function Roadmap() {
  return (
    <section
      id="roadmap"
      className="bg-neutral-50 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-16 font-heading text-3xl font-semibold text-foreground md:text-4xl">
          Learning roadmap
        </h2>

        <div className="flex flex-col gap-2 md:flex-row md:gap-6">
          {roadmap.map((step, i) => (
            <div key={step.title} className="flex-1">
              <RoadmapStep
                step={step}
                index={i}
                isLast={i === roadmap.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
