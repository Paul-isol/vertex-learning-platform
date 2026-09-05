"use client";

import { useEffect } from "react";

export interface LessonViewTrackerProps {
  slug: string;
  title: string;
  courseTitle?: string;
}

export function LessonViewTracker({
  slug,
  title,
  courseTitle,
}: LessonViewTrackerProps) {
  useEffect(() => {
    try {
      const posthog = (
        window as unknown as {
          posthog?: {
            capture: (
              event: string,
              properties?: Record<string, unknown>
            ) => void;
          };
        }
      ).posthog;

      if (posthog && typeof posthog.capture === "function") {
        posthog.capture("lesson_viewed", {
          lesson_slug: slug,
          lesson_title: title,
          course_title: courseTitle,
        });
      }
    } catch {
      // Analytics must never throw
    }
  }, [slug, title, courseTitle]);

  return null;
}
