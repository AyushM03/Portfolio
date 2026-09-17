"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, animate } from "framer-motion";
import { siteConfig } from "@/data/site";

const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Read the media query directly with a lazy useState initializer rather
// than framer-motion's own useReducedMotion() hook — that hook caches its
// result in a module-level singleton that's set once (often during SSR,
// where `window` doesn't exist) and never rechecked, so it can report a
// stale `false` on the client. A lazy initializer runs fresh on the
// client's first render, before any animation starts.
function getPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion] = useState(getPrefersReducedMotion);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Reduced motion: skip straight to 100 instead of counting up, still
    // through the same animate()/onComplete path so setIsLoading only
    // ever runs inside a callback, never synchronously in the effect body.
    const controls = animate(0, 100, {
      duration: prefersReducedMotion ? 0.01 : 1.4,
      ease: "easeInOut",
      onUpdate: (value) => setProgress(Math.round(value)),
      onComplete: () => {
        setTimeout(() => setIsLoading(false), prefersReducedMotion ? 0 : 200);
      },
    });

    return () => controls.stop();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading"
          initial={{ y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: "-100%" }}
          transition={
            prefersReducedMotion
              ? { duration: 0.15 }
              : { duration: 0.8, ease: CURTAIN_EASE }
          }
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-foreground"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-heading text-2xl uppercase tracking-[0.2em] text-white md:text-3xl"
          >
            {siteConfig.name}
          </motion.p>

          <div className="flex w-48 flex-col items-center gap-3 md:w-64">
            <div className="h-px w-full overflow-hidden bg-white/15">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-heading text-sm tabular-nums text-white/50">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
