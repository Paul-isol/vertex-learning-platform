"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDuration, formatLessonLabel } from "@/lib/format";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export interface LessonItem {
  _id: string;
  title: string;
  slug?: string | null;
  duration?: number | null;
  freePreview?: boolean | null;
}

export interface ModuleItem {
  _key?: string;
  title: string;
  summary?: string | null;
  lessons?: LessonItem[] | null;
}

export interface CourseContentProps {
  modules?: ModuleItem[] | null;
  totalDuration?: number | null;
}

export function CourseContent({
  modules,
  totalDuration,
}: CourseContentProps) {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  if (!modules || modules.length === 0) return null;

  const totalModules = modules.length;
  const INITIAL_LIMIT = 6;
  const isOverLimit = totalModules > INITIAL_LIMIT;
  const visibleModules = isOverLimit && !showAll
    ? modules.slice(0, INITIAL_LIMIT)
    : modules;

  const toggleModule = (idx: number) => {
    setOpenModuleIndex((current) => (current === idx ? null : idx));
  };

  return (
    <section aria-labelledby="course-content-heading" className="w-full space-y-4">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h2
          id="course-content-heading"
          className="font-display text-2xl sm:text-[26px] font-bold text-neutral-900 tracking-tight"
        >
          Course Content
        </h2>
        <div className="text-sm font-sans text-neutral-500 font-medium">
          <span>
            {totalModules} {totalModules === 1 ? "module" : "modules"}
          </span>
          {totalDuration != null && totalDuration > 0 && (
            <span> • {formatDuration(totalDuration)}</span>
          )}
        </div>
      </div>

      {/* Modules Container Card */}
      <div className="rounded-2xl border border-canvas-line bg-canvas overflow-hidden divide-y divide-canvas-line shadow-xs">
        {visibleModules.map((module, idx) => {
          const isOpen = openModuleIndex === idx;
          const moduleDuration = (module.lessons || []).reduce(
            (acc, curr) => acc + (curr.duration || 0),
            0
          );
          const isFirst = idx === 0;
          const isLast = idx === visibleModules.length - 1;

          return (
            <div key={module._key || idx} className="relative">
              {/* Module Row Header Button */}
              <button
                type="button"
                onClick={() => toggleModule(idx)}
                aria-expanded={isOpen}
                aria-controls={`module-panel-${idx}`}
                className="w-full text-left p-5 sm:px-7 sm:py-5 flex items-center gap-4 sm:gap-6 hover:bg-neutral-100/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset cursor-pointer"
              >
                {/* Numbered Circle with connector lines */}
                <div className="relative shrink-0 flex flex-col items-center justify-center">
                  {!isFirst && (
                    <div className="absolute -top-6 bottom-1/2 w-px bg-canvas-line -z-10" />
                  )}
                  <div className="w-8 h-8 rounded-full border border-neutral-300 bg-canvas flex items-center justify-center text-xs font-semibold text-neutral-800 shrink-0">
                    {idx + 1}
                  </div>
                  {!isLast && (
                    <div className="absolute top-1/2 -bottom-6 w-px bg-canvas-line -z-10" />
                  )}
                </div>

                {/* Module Details */}
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="font-display text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                    {module.title}
                  </h3>
                  {module.summary && (
                    <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-normal mt-0.5 truncate sm:whitespace-normal">
                      {module.summary}
                    </p>
                  )}
                </div>

                {/* Duration & Chevron */}
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  {moduleDuration > 0 && (
                    <span className="font-sans text-xs sm:text-sm text-neutral-500 font-medium">
                      {formatDuration(moduleDuration)}
                    </span>
                  )}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-neutral-500 transition-transform duration-200 stroke-[2]",
                      isOpen && "rotate-180 text-neutral-900"
                    )}
                    aria-hidden="true"
                  />
                </div>
              </button>

              {/* Collapsible Lessons Sub-panel */}
              {isOpen && (
                <div
                  id={`module-panel-${idx}`}
                  className="bg-neutral-50/50 border-t border-canvas-line px-6 sm:px-14 py-4 divide-y divide-canvas-line/60 animate-in fade-in duration-150"
                >
                  {module.lessons && module.lessons.length > 0 ? (
                    module.lessons.map((lesson, lessonIdx) => {
                      const lessonHref = lesson.slug
                        ? routes.lesson(lesson.slug)
                        : "#";

                      return (
                        <Link
                          key={lesson._id || lessonIdx}
                          href={lessonHref}
                          className="flex items-center justify-between py-3 group hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
                        >
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-4">
                            <PlayCircle className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 shrink-0 transition-colors" />
                            <span className="font-sans text-xs font-semibold text-neutral-400 shrink-0">
                              {formatLessonLabel(idx, lessonIdx)}
                            </span>
                            <span className="font-sans text-sm font-medium text-neutral-800 group-hover:text-primary-600 truncate transition-colors">
                              {lesson.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {lesson.freePreview && (
                              <Badge
                                variant="lesson"
                                className="text-[10px] px-2 py-0.5"
                              >
                                Free Preview
                              </Badge>
                            )}
                            {lesson.duration != null && lesson.duration > 0 && (
                              <span className="font-sans text-xs text-neutral-500">
                                {formatDuration(lesson.duration)}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="font-sans text-xs text-neutral-400 italic py-2">
                      No lessons in this module yet.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show all N modules pill toggle button */}
      {isOverLimit && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-canvas-line bg-canvas hover:bg-neutral-100 text-sm font-sans font-medium text-neutral-700 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
          >
            <span>
              {showAll
                ? "Show fewer modules"
                : `Show all ${totalModules} modules`}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-neutral-500 transition-transform duration-200 stroke-[2]",
                showAll && "rotate-180"
              )}
            />
          </button>
        </div>
      )}
    </section>
  );
}
