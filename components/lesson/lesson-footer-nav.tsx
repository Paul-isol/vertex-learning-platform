import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatDuration } from "@/lib/format";
import { routes } from "@/lib/routes";

export interface AdjacentLesson {
  title: string;
  slug: string;
  duration?: number | null;
}

export interface LessonFooterNavProps {
  previousLesson?: AdjacentLesson | null;
  nextLesson?: AdjacentLesson | null;
}

export function LessonFooterNav({
  previousLesson,
  nextLesson,
}: LessonFooterNavProps) {
  if (!previousLesson && !nextLesson) return null;

  return (
    <nav
      aria-label="Lesson navigation"
      className="w-full border-t border-canvas-line pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-6"
    >
      {/* Previous Lesson */}
      <div className="w-full sm:w-auto flex items-center gap-4 min-w-0">
        {previousLesson ? (
          <>
            <Link
              href={routes.lesson(previousLesson.slug)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-canvas-line bg-canvas hover:bg-neutral-100 text-neutral-800 text-sm font-medium transition-colors shadow-xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
              <span>Previous Lesson</span>
            </Link>
            <div className="hidden md:block min-w-0">
              <div className="text-sm font-medium text-neutral-900 truncate max-w-[200px]">
                {previousLesson.title}
              </div>
              {previousLesson.duration != null && previousLesson.duration > 0 && (
                <div className="text-xs text-neutral-500 font-sans mt-0.5">
                  {formatDuration(previousLesson.duration)}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      {/* Next Lesson */}
      <div className="w-full sm:w-auto flex items-center justify-end gap-4 min-w-0 self-end sm:self-auto">
        {nextLesson ? (
          <>
            <div className="hidden md:block text-right min-w-0">
              <div className="text-sm font-medium text-neutral-900 truncate max-w-[200px]">
                {nextLesson.title}
              </div>
              {nextLesson.duration != null && nextLesson.duration > 0 && (
                <div className="text-xs text-neutral-500 font-sans mt-0.5">
                  {formatDuration(nextLesson.duration)}
                </div>
              )}
            </div>
            <Link
              href={routes.lesson(nextLesson.slug)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors shadow-xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </Link>
          </>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </nav>
  );
}
