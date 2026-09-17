import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Works() {
  return (
    <section id="works" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">
            Works
          </h2>
          <p className="max-w-md text-foreground/60">
            No deployable project yet — these are demo builds standing in
            until{" "}
            <span className="font-medium text-foreground">
              Agent Action Firewall
            </span>{" "}
            and{" "}
            <span className="font-medium text-foreground">SymptMeal</span>{" "}
            are ready to take their place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
