import Hero from "@/components/Hero";
import SkillsMarquee from "@/components/SkillsMarquee";
import About from "@/components/About";
import CurrentlyGrinding from "@/components/CurrentlyGrinding";
import Works from "@/components/Works";
import Roadmap from "@/components/Roadmap";
import Collab from "@/components/Collab";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <SkillsMarquee />
      <About />
      <CurrentlyGrinding />
      <Works />
      <Roadmap />
      <Collab />
    </main>
  );
}
