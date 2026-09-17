"use client";

import { motion } from "framer-motion";
import { grindingItems } from "@/data/grinding";

export default function CurrentlyGrinding() {
  return (
    <section
      id="grinding"
      className="bg-neutral-50 px-6 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 font-heading text-3xl font-semibold text-foreground md:text-4xl"
        >
          Currently grinding
        </motion.h2>

        <ul className="flex flex-col divide-y divide-black/10 border-y border-black/10">
          {grindingItems.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="flex items-center gap-4 py-6"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-two opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-two" />
              </span>
              <span className="text-lg font-medium text-foreground md:text-xl">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
