import React from "react";
import { cn } from "@/lib/utils";

export function ChartDecoration({ className }: { className?: string }) {
  const bars = [
    { height: "h-28", opacity: "opacity-20" },
    { height: "h-40", opacity: "opacity-30" },
    { height: "h-24", opacity: "opacity-25" },
    { height: "h-36", opacity: "opacity-35" },
    { height: "h-48", opacity: "opacity-40" },
    { height: "h-32", opacity: "opacity-30" },
    { height: "h-20", opacity: "opacity-20" },
    { height: "h-44", opacity: "opacity-35" },
    { height: "h-28", opacity: "opacity-25" },
    { height: "h-36", opacity: "opacity-30" },
  ];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full h-48 overflow-hidden pointer-events-none select-none flex items-end justify-center gap-4 px-8 opacity-75 blur-xs",
        className
      )}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className={cn(
            "w-12 sm:w-16 rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-300/10 transition-all",
            bar.height,
            bar.opacity
          )}
        />
      ))}
    </div>
  );
}
