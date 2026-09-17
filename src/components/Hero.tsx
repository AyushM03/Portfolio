"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import { siteConfig } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-16 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-foreground/50"
          >
            Ayush Meshram · Nagpur, India
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="font-heading text-[clamp(2.75rem,5.5vw,5.5rem)] font-semibold leading-[1.03] tracking-tight text-foreground"
          >
            Building systems that hold up.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70 md:text-xl"
          >
            Associate Software Engineer at Accenture, based in Nagpur —
            deepening backend architecture and system design on the way to a
            product-based engineering role.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#works"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-85"
            >
              View my work
              <ArrowUpRight size={18} weight="bold" />
            </a>
            <a
              href="#collab"
              className="inline-flex items-center gap-2 rounded-md border border-foreground/15 px-7 py-4 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:border-foreground/40"
            >
              Let&apos;s collab
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="absolute -right-4 -top-4 -z-10 hidden aspect-[4/5] w-full rounded-lg bg-accent md:block" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-100">
            <Image
              src="/images/thumbs/about-three-thumb.jpg"
              alt={siteConfig.name}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative z-10 mx-auto mt-16 inline-flex flex-col items-center gap-2 text-foreground/40 transition-colors hover:text-foreground/70"
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
