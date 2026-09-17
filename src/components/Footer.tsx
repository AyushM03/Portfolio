import Link from "next/link";
import { ArrowUp, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import { siteConfig } from "@/data/site";

const QUICK_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#works", label: "Works" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#collab", label: "Collab" },
];

export default function Footer() {
  const socials = [
    { label: "GitHub", href: siteConfig.github, icon: GithubLogo },
    { label: "LinkedIn", href: siteConfig.linkedin, icon: LinkedinLogo },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-white/10 bg-foreground px-6 py-10 text-white md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 md:flex-row md:justify-between">
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-6">
          {QUICK_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-white/70 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/80 hover:border-white/40 hover:text-white"
            >
              <Icon size={18} />
            </a>
          ))}
          <a
            href="#home"
            aria-label="Back to top"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-foreground hover:opacity-85"
          >
            <ArrowUp size={18} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
