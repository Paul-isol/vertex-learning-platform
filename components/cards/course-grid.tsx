import React from "react";
import Image from "next/image";
import { CourseCard } from "@/components/cards/course-card";
import { urlFor } from "@/sanity/lib/image";
import { formatDuration, formatLevel } from "@/lib/format";
import { routes } from "@/lib/routes";
import type { COURSES_LIST_QUERY_RESULT } from "@/sanity.types";

export interface CourseGridProps {
  courses: COURSES_LIST_QUERY_RESULT;
  limit?: number;
  className?: string;
}

export function CourseGrid({
  courses,
  limit,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
}: CourseGridProps) {
  const visibleCourses = limit ? courses.slice(0, limit) : courses;

  if (!visibleCourses || visibleCourses.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-500 font-sans">
        <p className="text-base font-medium">No courses found.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {visibleCourses.map((course) => {
        const coverUrl = course.coverImage
          ? urlFor(course.coverImage).width(144).height(144).fit("crop").quality(90).url()
          : null;

        const iconElement = coverUrl ? (
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 shrink-0 shadow-xs">
            <Image
              src={coverUrl}
              alt={course.title || "Course cover"}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        ) : undefined;

        return (
          <CourseCard
            key={course._id}
            layout="stacked"
            title={course.title || ""}
            description={course.summary || ""}
            level={formatLevel(course.level)}
            duration={formatDuration(course.totalDuration)}
            modulesCount={course.moduleCount || 0}
            logoText={course.title ? course.title.charAt(0) : "C"}
            icon={iconElement}
            href={course.slug ? routes.course(course.slug) : undefined}
          />
        );
      })}
    </div>
  );
}
