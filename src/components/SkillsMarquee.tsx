import { skills } from "@/data/skills";

export default function SkillsMarquee() {
  const items = [...skills, ...skills];

  return (
    <div className="overflow-hidden bg-foreground py-8">
      <div className="group flex w-max">
        <ul className="animate-marquee flex w-max shrink-0 items-center gap-10 group-hover:[animation-play-state:paused]">
          {items.map((skill, i) => (
            <li
              key={`${skill}-${i}`}
              className="flex items-center gap-10 whitespace-nowrap"
            >
              <span className="font-heading text-2xl uppercase tracking-wide text-white md:text-3xl">
                {skill}
              </span>
              <span className="text-2xl text-accent md:text-3xl" aria-hidden>
                ✦
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
