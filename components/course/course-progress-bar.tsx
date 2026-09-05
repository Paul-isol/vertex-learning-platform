import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CourseProgressBarProps {
  percentComplete?: number;
  resumeHref: string;
  className?: string;
}

export function CourseProgressBar({
  percentComplete = 0,
  resumeHref,
  className,
}: CourseProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, percentComplete));

  return (
    <div
      className={cn(
        "sticky bottom-6 z-30 w-full max-w-5xl mx-auto rounded-2xl border border-canvas-line bg-canvas/95 backdrop-blur-sm p-4 sm:px-8 sm:py-5 shadow-lg",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
        {/* Progress Text */}
        <div className="text-center sm:text-left shrink-0">
          <p className="text-xs font-medium text-neutral-500 font-sans">
            Your Progress
          </p>
          <p className="text-sm font-sans text-neutral-700">
            <span className="font-bold text-neutral-900">{clampedValue}%</span>{" "}
            complete
          </p>
        </div>

        {/* Progress Track */}
        <div className="flex-1 w-full max-w-md">
          <div
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2 w-full overflow-hidden rounded-full bg-neutral-200/80"
          >
            <div
              className="h-full bg-primary-500 transition-all duration-300 rounded-full"
              style={{ width: `${clampedValue}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 w-full sm:w-auto">
          <Link
            href={resumeHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-xl bg-primary-500 text-white font-sans font-semibold text-sm sm:text-base hover:bg-primary-600 active:bg-primary-600 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
