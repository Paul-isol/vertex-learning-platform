import React from "react";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Clock, BarChart3, Users } from "lucide-react";
import {
  formatDuration,
  formatCount,
  formatLevel,
  formatLessonLabel,
} from "@/lib/format";

export interface LessonHeaderProps {
  title: string;
  summary?: string | null;
  moduleIndex: number;
  lessonIndex: number;
  duration?: number | null;
  level?: string | null;
  studentCount?: number | null;
}

export function LessonHeader({
  title,
  summary,
  moduleIndex,
  lessonIndex,
  duration,
  level,
  studentCount,
}: LessonHeaderProps) {
  const lessonNumberLabel = formatLessonLabel(moduleIndex, lessonIndex);

  return (
    <div className="space-y-4">
      {/* Lesson Badge */}
      <div>
        <Badge variant="video" className="px-2.5 py-1 text-[11px] font-bold">
          LESSON {lessonNumberLabel}
        </Badge>
      </div>

      {/* Title & Bookmark Button */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="font-display text-3xl sm:text-4xl md:text-[42px] font-bold text-neutral-900 tracking-tight leading-[1.2]">
          {title}
        </h1>

        <button
          type="button"
          aria-label="Bookmark lesson"
          className="w-10 h-10 rounded-xl border border-canvas-line bg-canvas hover:bg-neutral-100 flex items-center justify-center text-primary-500 hover:text-primary-600 transition-colors shadow-xs shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <Bookmark className="w-5 h-5 stroke-[1.75]" />
        </button>
      </div>

      {/* Summary line */}
      {summary && (
        <p className="font-sans text-base sm:text-[17px] text-neutral-500 leading-relaxed max-w-3xl">
          {summary}
        </p>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-y-2 gap-x-6 sm:gap-x-8 pt-1 text-sm text-neutral-600 font-sans">
        {duration != null && duration > 0 && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neutral-500 stroke-[2]" />
            <span>{formatDuration(duration)}</span>
          </div>
        )}

        {level && (
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-neutral-500 stroke-[2]" />
            <span>{formatLevel(level)}</span>
          </div>
        )}

        {studentCount != null && studentCount > 0 && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-neutral-500 stroke-[2]" />
            <span>{formatCount(studentCount)} students</span>
          </div>
        )}
      </div>
    </div>
  );
}
