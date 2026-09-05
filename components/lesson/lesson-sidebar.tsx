"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Play,
} from "lucide-react";
import { formatDuration } from "@/lib/format";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

export interface LessonSidebarLesson {
  _id: string;
  title: string;
  slug: string;
  duration?: number | null;
  freePreview?: boolean | null;
}

export interface LessonSidebarModule {
  _key: string;
  title: string;
  summary?: string | null;
  durationSeconds?: number | null;
  lessons: LessonSidebarLesson[];
}

export interface LessonSidebarCourse {
  _id: string;
  title: string;
  slug: string;
  coverImage?: SanityImageSource | null;
  modules: LessonSidebarModule[];
}

export interface LessonSidebarProps {
  course: LessonSidebarCourse;
  currentLessonSlug: string;
  currentModuleIndex: number;
  percentComplete?: number;
  completedModuleIndices?: number[];
  completedLessonSlugs?: string[];
}

export function LessonSidebar({
  course,
  currentLessonSlug,
  currentModuleIndex,
  percentComplete = 35,
  completedModuleIndices = [],
  completedLessonSlugs = [],
}: LessonSidebarProps) {
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({
    [currentModuleIndex]: true,
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleModule = (idx: number) => {
    setOpenModules((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const courseImageUrl = course.coverImage
    ? urlFor(course.coverImage).width(96).height(96).fit("crop").quality(90).url()
    : null;

  const totalModules = course.modules.length;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Back to course link */}
      <div className="pb-6">
        <Link
          href={routes.course(course.slug)}
          className="inline-flex items-center gap-2 text-[15px] font-medium text-primary-500 hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back to course</span>
        </Link>
      </div>

      {/* Course tile & progress */}
      <div className="flex items-center gap-3.5 pb-6 border-b border-canvas-line">
        <div className="relative w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0 overflow-hidden shadow-xs">
          {courseImageUrl ? (
            <Image
              src={courseImageUrl}
              alt={course.title}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <span className="font-bold text-lg font-display">
              {course.title.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[15px] font-semibold text-neutral-900 truncate leading-snug">
            {course.title}
          </h2>
          <div className="space-y-1.5 mt-1">
            <div className="text-[13px] text-neutral-500 font-sans font-medium">
              {percentComplete}% complete
            </div>
            <div className="w-full h-[3px] bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, percentComplete))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Module X of Y overview header */}
      <div className="py-4 flex items-center justify-between border-b border-canvas-line text-neutral-900 font-medium text-sm">
        <span>
          Module {currentModuleIndex + 1} of {totalModules}
        </span>
        <ChevronDown className="w-4 h-4 text-neutral-500 stroke-[2]" aria-hidden="true" />
      </div>

      {/* Modules list */}
      <div className="py-2 space-y-1 flex-1 overflow-y-auto">
        {course.modules.map((module, mIdx) => {
          const isCurrentModule = mIdx === currentModuleIndex;
          const isOpen = openModules[mIdx] ?? false;
          const isCompleted =
            completedModuleIndices.includes(mIdx) ||
            (completedModuleIndices.length === 0 && mIdx < currentModuleIndex);
          const isFirst = mIdx === 0;
          const isLast = mIdx === totalModules - 1;

          const moduleDuration =
            module.durationSeconds ||
            module.lessons.reduce((acc, l) => acc + (l.duration || 0), 0);

          return (
            <div key={module._key || mIdx} className="relative">
              {/* Module Accordion Header */}
              <button
                type="button"
                onClick={() => toggleModule(mIdx)}
                aria-expanded={isOpen}
                aria-controls={`module-panel-${mIdx}`}
                className="w-full text-left py-3 px-1 flex items-center gap-3.5 group hover:bg-neutral-100/60 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
              >
                {/* Numbered circle with connector line */}
                <div className="relative shrink-0 flex flex-col items-center justify-center">
                  {!isFirst && (
                    <div className="absolute -top-5 bottom-1/2 w-px bg-canvas-line -z-10" />
                  )}
                  <div
                    className={cn(
                      "w-[29px] h-[29px] rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 transition-colors",
                      isCurrentModule
                        ? "bg-primary-500 text-white shadow-xs"
                        : "border border-neutral-300 bg-canvas text-neutral-800 group-hover:border-neutral-400"
                    )}
                  >
                    {mIdx + 1}
                  </div>
                  {!isLast && (
                    <div className="absolute top-1/2 -bottom-5 w-px bg-canvas-line -z-10" />
                  )}
                </div>

                {/* Module title & duration */}
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-neutral-900 leading-snug truncate">
                    {module.title}
                  </div>
                  {moduleDuration > 0 && (
                    <div className="text-[13px] text-neutral-500 font-sans mt-0.5">
                      {formatDuration(moduleDuration)}
                    </div>
                  )}
                </div>

                {/* State glyph: completed checkmark or chevron */}
                <div className="shrink-0 pl-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-primary-500 fill-primary-100 stroke-[2]" />
                  ) : (
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-neutral-400 transition-transform duration-200 stroke-[2]",
                        isOpen && "rotate-180 text-neutral-700"
                      )}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </button>

              {/* Module Lessons sub-panel */}
              {isOpen && module.lessons.length > 0 && (
                <div
                  id={`module-panel-${mIdx}`}
                  className="relative pl-4 pr-1 py-2 space-y-1"
                >
                  {/* Vertical connector line inside lessons list */}
                  <div className="absolute left-[29px] top-3 bottom-3 w-px bg-neutral-200" />

                  {module.lessons.map((lesson) => {
                    const isCurrentLesson = lesson.slug === currentLessonSlug;
                    const isCompletedLesson = completedLessonSlugs.includes(lesson.slug);
                    const lessonDuration = lesson.duration;

                    return (
                      <Link
                        key={lesson._id}
                        href={routes.lesson(lesson.slug)}
                        aria-current={isCurrentLesson ? "page" : undefined}
                        className={cn(
                          "relative flex items-center justify-between py-2.5 px-3 rounded-lg text-left transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                          isCurrentLesson
                            ? "bg-primary-100/60 text-primary-600 font-medium"
                            : "hover:bg-neutral-100/50 text-neutral-700 hover:text-neutral-900"
                        )}
                      >
                        {/* Dot marker & Title */}
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div className="relative shrink-0 flex items-center justify-center w-3 h-3">
                            {isCurrentLesson ? (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary-500 ring-4 ring-primary-100" />
                            ) : isCompletedLesson ? (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                            ) : (
                              <div className="w-2 h-2 rounded-full border border-neutral-300 bg-canvas group-hover:border-neutral-500" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div
                              className={cn(
                                "text-[14px] leading-snug truncate",
                                isCurrentLesson
                                  ? "text-neutral-950 font-medium"
                                  : "text-neutral-700 group-hover:text-neutral-900"
                              )}
                            >
                              {lesson.title}
                            </div>
                            {isCurrentLesson && (
                              <div className="text-[12px] text-primary-500 font-semibold mt-0.5">
                                Now playing
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action: Play button or duration */}
                        <div className="shrink-0">
                          {isCurrentLesson ? (
                            <div className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-xs">
                              <Play className="w-3.5 h-3.5 fill-white text-white translate-x-[1px]" />
                            </div>
                          ) : (
                            lessonDuration != null &&
                            lessonDuration > 0 && (
                              <span className="text-[13px] text-neutral-500 font-sans">
                                {formatDuration(lessonDuration)}
                              </span>
                            )
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile drawer / disclosure (< lg) */}
      <div className="lg:hidden w-full border-b border-canvas-line pb-4 mb-6">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between p-4 bg-canvas border border-canvas-line rounded-xl shadow-xs text-left"
        >
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm text-neutral-900">
              Module {currentModuleIndex + 1} of {totalModules}
            </span>
            <span className="text-xs text-neutral-500">• {course.title}</span>
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-neutral-600 transition-transform",
              mobileOpen && "rotate-180"
            )}
          />
        </button>

        {mobileOpen && (
          <div className="mt-3 p-4 bg-canvas border border-canvas-line rounded-xl shadow-sm">
            {sidebarContent}
          </div>
        )}
      </div>

      {/* Desktop fixed sidebar (>= lg) */}
      <aside className="hidden lg:block w-[310px] shrink-0 border-r border-canvas-line pr-8">
        {sidebarContent}
      </aside>
    </>
  );
}
