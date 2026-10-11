import { ArrowUpRight, Code, GithubLogo } from "@phosphor-icons/react/ssr";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const isExternal = project.href.startsWith("http");

  return (
    <article
      // isDemo stays an internal-only marker (decided 2026-09-20, PRD §12) —
      // no visible "Demo" badge to visitors until a real project replaces it.
      data-demo={project.isDemo || undefined}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-black/10 transition-colors hover:border-black/25"
    >
      <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-700">
        <Code size={56} className="text-white/25" weight="thin" />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="font-heading text-2xl font-semibold text-foreground">
            {/* Stretched link: the ::after covers the whole card, so the card
                stays one big click target while the repo link below can sit
                on top of it without nesting <a> inside <a>. */}
            <a
              href={project.href}
              {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
              className="after:absolute after:inset-0"
            >
              {project.title}
            </a>
          </h3>
          <ArrowUpRight
            size={22}
            className="mt-1 shrink-0 text-foreground/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground"
          />
        </div>

        <p className="mb-6 text-foreground/70">{project.description}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-foreground/60"
              >
                {tech}
              </li>
            ))}
          </ul>

          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              <GithubLogo size={18} />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
