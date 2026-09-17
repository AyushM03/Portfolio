import Hero from "@/components/Hero";

const PLACEHOLDER_SECTIONS = [
  { id: "about", label: "About" },
  { id: "grinding", label: "Currently Grinding" },
  { id: "works", label: "Works" },
  { id: "roadmap", label: "Learning Roadmap" },
  { id: "collab", label: "Collab" },
];

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      {PLACEHOLDER_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex min-h-screen items-center justify-center border-b border-dashed border-black/10 px-6 text-center"
        >
          <p className="text-sm uppercase tracking-widest text-foreground/40">
            {section.label} section — placeholder, built next
          </p>
        </section>
      ))}
    </main>
  );
}
