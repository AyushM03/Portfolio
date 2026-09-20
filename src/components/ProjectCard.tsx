import { ArrowUpRight, Code } from "@phosphor-icons/react/ssr";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      // isDemo stays an internal-only marker (decided 2026-09-20, PRD §12) —
      // no visible "Demo" badge to visitors until a real project replaces it.
      data-demo={project.isDemo || undefined}
      className="group flex flex-col overflow-hidden rounded-lg border border-black/10 transition-colors hover:border-black/25"
    >
      <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-700">
        <Code size={56} className="text-white/25" weight="thin" />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="font-heading text-2xl font-semibold text-foreground">
            {project.title}
          </h3>
          <ArrowUpRight
            size={22}
            className="mt-1 shrink-0 text-foreground/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground"
          />
        </div>

        <p className="mb-6 text-foreground/70">{project.description}</p>

        <ul className="mt-auto flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-foreground/60"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}
