"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { DayActivity } from "@/lib/activity";
import { siteConfig } from "@/data/site";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Sequential ramp on the site's own accent hue (lime) — empty day reads as a
// near-surface neutral, busiest days read as full accent. Monotonic lightness,
// single hue, light -> dark per the dataviz sequential-encoding rule.
const LEVEL_CLASSES = [
  "bg-black/[0.06]",
  "bg-accent/25",
  "bg-accent/50",
  "bg-accent/75",
  "bg-accent",
];

function levelFor(total: number): number {
  if (total <= 0) return 0;
  if (total === 1) return 1;
  if (total <= 3) return 2;
  if (total <= 5) return 3;
  return 4;
}

function formatDate(dateKey: string): string {
  return new Date(`${dateKey}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

type TooltipState = { day: DayActivity; x: number; y: number };

export default function ActivityHeatmap({ data }: { data: DayActivity[] }) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const weeks = useMemo(() => {
    const out: DayActivity[][] = [];
    for (let i = 0; i < data.length; i += 7) out.push(data.slice(i, i + 7));
    return out;
  }, [data]);

  const monthMarkers = useMemo(() => {
    const markers: { weekIndex: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (!firstDay) return;
      const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth();
      if (month !== lastMonth) {
        markers.push({ weekIndex, label: MONTH_LABELS[month] });
        lastMonth = month;
      }
    });
    return markers;
  }, [weeks]);

  const totals = useMemo(
    () =>
      data.reduce(
        (acc, day) => {
          acc.github += day.github;
          acc.leetcode += day.leetcode;
          acc.codeforces += day.codeforces;
          return acc;
        },
        { github: 0, leetcode: 0, codeforces: 0 }
      ),
    [data]
  );

  const TOOLTIP_WIDTH = 224;

  function showTooltip(
    event: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>,
    day: DayActivity
  ) {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const cellRect = event.currentTarget.getBoundingClientRect();
    if (!containerRect) return;
    const rawX = cellRect.left - containerRect.left + cellRect.width / 2;
    const half = TOOLTIP_WIDTH / 2;
    setTooltip({
      day,
      x: Math.min(Math.max(rawX, half), Math.max(containerRect.width - half, half)),
      y: cellRect.top - containerRect.top,
    });
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-baseline gap-x-8 gap-y-3 text-sm font-medium">
        <PlatformLink label="GitHub" count={totals.github} href={siteConfig.github} />
        <PlatformLink label="LeetCode" count={totals.leetcode} href={siteConfig.leetcode} />
        <PlatformLink label="Codeforces" count={totals.codeforces} href={siteConfig.codeforces} />
      </div>

      {/* Tooltip lives outside the horizontally-scrolling grid below, so the
          scroll container's overflow clip never cuts it off vertically. */}
      <div ref={containerRef} className="relative">
        {tooltip && (
          <div
            role="status"
            className="pointer-events-none absolute z-10 rounded-lg border border-black/10 bg-white px-4 py-3 text-sm shadow-lg"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              width: TOOLTIP_WIDTH,
              transform: "translate(-50%, calc(-100% - 10px))",
            }}
          >
            <p className="mb-1.5 font-semibold text-foreground">
              {formatDate(tooltip.day.date)}
            </p>
            <ul className="space-y-0.5 text-foreground/70">
              <li>
                LeetCode: <span className="font-medium text-foreground">{tooltip.day.leetcode}</span>{" "}
                submission{tooltip.day.leetcode === 1 ? "" : "s"}
              </li>
              <li>
                GitHub: <span className="font-medium text-foreground">{tooltip.day.github}</span>{" "}
                contribution{tooltip.day.github === 1 ? "" : "s"}
              </li>
              <li>
                Codeforces: <span className="font-medium text-foreground">{tooltip.day.codeforces}</span>{" "}
                submission{tooltip.day.codeforces === 1 ? "" : "s"}
              </li>
            </ul>
          </div>
        )}

        <div className="overflow-x-auto pb-2">
          <div className="inline-flex flex-col gap-2" style={{ minWidth: weeks.length * 14 }}>
            <div className="relative h-4 text-xs text-foreground/50">
              {monthMarkers.map((marker) => (
                <span
                  key={`${marker.label}-${marker.weekIndex}`}
                  className="absolute"
                  style={{ left: marker.weekIndex * 14 }}
                >
                  {marker.label}
                </span>
              ))}
            </div>

            <div className="flex gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day) => (
                    <motion.button
                      key={day.date}
                      type="button"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.25, delay: weekIndex * 0.004 }}
                      onMouseEnter={(event) => showTooltip(event, day)}
                      onFocus={(event) => showTooltip(event, day)}
                      onMouseLeave={() =>
                        setTooltip((current) => (current?.day.date === day.date ? null : current))
                      }
                      onBlur={() =>
                        setTooltip((current) => (current?.day.date === day.date ? null : current))
                      }
                      aria-label={`${formatDate(day.date)}: ${day.total} total — ${day.leetcode} LeetCode, ${day.github} GitHub, ${day.codeforces} Codeforces`}
                      className={`h-[11px] w-[11px] shrink-0 rounded-[2px] outline-none transition-transform hover:scale-125 focus-visible:scale-125 focus-visible:ring-2 focus-visible:ring-accent-two ${LEVEL_CLASSES[levelFor(day.total)]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-foreground/50">
        <span>Less</span>
        {LEVEL_CLASSES.map((cls, i) => (
          <span key={i} className={`h-[11px] w-[11px] rounded-[2px] ${cls}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

function PlatformLink({
  label,
  count,
  href,
}: {
  label: string;
  count: number;
  href: string | null;
}) {
  const content = (
    <>
      <span className="text-foreground">{label}</span>
      <span className="ml-1.5 text-foreground/40">{count}</span>
    </>
  );

  if (!href) {
    return <span className="inline-flex items-baseline opacity-60">{content}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-baseline underline-offset-4 transition-colors hover:text-accent-two hover:underline"
    >
      {content}
    </a>
  );
}
