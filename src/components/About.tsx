"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { siteConfig } from "@/data/site";

export default function About() {
  const socials = [
    { label: "GitHub", href: siteConfig.github, icon: GithubLogo },
    { label: "LinkedIn", href: siteConfig.linkedin, icon: LinkedinLogo },
  ].filter((s) => s.href);

  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-lg"
        >
          <Image
            src="/images/thumbs/about-three-thumb.jpg"
            alt={siteConfig.name}
            width={720}
            height={812}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          <h2 className="mb-8 font-heading text-3xl font-semibold text-foreground md:text-4xl">
            About
          </h2>

          <div className="space-y-5 text-lg leading-relaxed text-foreground/70">
            <p>
              I&apos;m an Associate Software Engineer at Accenture, working
              out of Nagpur, India. Most of my day-to-day is backend-focused
              — APIs, data models, the plumbing that keeps a product
              reliable when real traffic hits it.
            </p>
            <p>
              I&apos;m in the middle of a deliberate push toward a
              product-based engineering role: daily DSA practice, going
              deeper on FastAPI and system design, and building real
              projects instead of just reading about them. This site tracks
              that work as it happens, not just the finished version of it.
            </p>
            <p>
              Outside of assigned work, I care about writing code that
              holds up under load and under change — systems that don&apos;t
              need a rewrite six months in.
            </p>
          </div>

          {socials.length > 0 && (
            <div className="mt-8 flex items-center gap-4">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-foreground/15 text-foreground transition-colors hover:border-foreground/40"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
