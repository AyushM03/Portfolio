"use client";

import { motion } from "framer-motion";
import type { RoadmapStep as RoadmapStepType } from "@/data/roadmap";

export default function RoadmapStep({
  step,
  index,
  isLast,
}: {
  step: RoadmapStepType;
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className="relative flex gap-5 md:flex-col md:gap-6"
    >
      <div className="flex flex-col items-center md:flex-row md:gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-sm font-semibold text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        {!isLast && (
          <span className="mt-2 w-px flex-1 bg-black/10 md:mt-0 md:h-px md:w-full md:flex-none" />
        )}
      </div>

      <div className="pb-10 md:pb-0">
        <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">
          {step.title}
        </h3>
        <p className="text-foreground/60">{step.focus}</p>
      </div>
    </motion.div>
  );
}
