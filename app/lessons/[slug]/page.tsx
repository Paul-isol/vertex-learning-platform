import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { LessonSidebar } from "@/components/lesson/lesson-sidebar";
import { LessonHeader } from "@/components/lesson/lesson-header";
import { LessonVideo } from "@/components/lesson/lesson-video";
import { LessonTabs } from "@/components/lesson/lesson-tabs";
import {
  LessonNotes,
  extractLeadParagraph,
} from "@/components/lesson/lesson-notes";
import { LessonKeyPoints } from "@/components/lesson/lesson-key-points";
import { LessonResources } from "@/components/lesson/lesson-resources";
import { LessonFooterNav } from "@/components/lesson/lesson-footer-nav";
import { LessonViewTracker } from "@/components/lesson/lesson-view-tracker";
import { sanityFetch, CACHE_TAGS } from "@/sanity/lib/fetch";
import {
  LESSON_BY_SLUG_QUERY,
  LESSON_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { routes } from "@/lib/routes";

interface LessonPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    t?: string;
  }>;
}

export async function generateStaticParams() {
  const lessons = await sanityFetch({
    query: LESSON_SLUGS_QUERY,
    tags: [CACHE_TAGS.lesson],
  });

  return lessons.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await sanityFetch({
    query: LESSON_BY_SLUG_QUERY,
    params: { slug },
    tags: [CACHE_TAGS.lesson, CACHE_TAGS.course],
  });

  if (!lesson) {
    return {
      title: "Lesson Not Found | Vertex",
    };
  }

  const { leadText } = extractLeadParagraph(lesson.notes);

  return {
    title: `${lesson.title} | Vertex`,
    description: leadText || `Watch ${lesson.title} on Vertex`,
  };
}

export default async function LessonPage({
  params,
  searchParams,
}: LessonPageProps) {
  const { slug } = await params;
  const sp = searchParams ? await searchParams : undefined;

  const lesson = await sanityFetch({
    query: LESSON_BY_SLUG_QUERY,
    params: { slug },
    tags: [CACHE_TAGS.lesson, CACHE_TAGS.course],
  });

  if (!lesson) {
    notFound();
  }

  // Parse start seconds from ?t=
  let startSeconds = 0;
  if (sp?.t) {
    const parsed = parseInt(sp.t, 10);
    if (!isNaN(parsed) && parsed > 0) {
      startSeconds = Math.min(parsed, lesson.duration || parsed);
    }
  }

  const course = lesson.course;

  // Flatten curriculum lessons to derive indices, breadcrumbs, and adjacent lessons
  interface FlatLesson {
    title: string;
    slug: string;
    duration?: number | null;
    moduleTitle: string;
    moduleIndex: number;
    lessonIndex: number;
  }

  const allLessons: FlatLesson[] = [];
  let currentModuleIndex = 0;
  let currentLessonIndex = 0;
  let currentModuleTitle = "";

  if (course?.modules) {
    course.modules.forEach((mod, mIdx) => {
      mod.lessons.forEach((l, lIdx) => {
        if (l.slug) {
          allLessons.push({
            title: l.title,
            slug: l.slug,
            duration: l.duration,
            moduleTitle: mod.title,
            moduleIndex: mIdx,
            lessonIndex: lIdx,
          });

          if (l.slug === slug) {
            currentModuleIndex = mIdx;
            currentLessonIndex = lIdx;
            currentModuleTitle = mod.title;
          }
        }
      });
    });
  }

  const currentFlatIndex = allLessons.findIndex((l) => l.slug === slug);
  const previousLesson =
    currentFlatIndex > 0 ? allLessons[currentFlatIndex - 1] : null;
  const nextLesson =
    currentFlatIndex >= 0 && currentFlatIndex < allLessons.length - 1
      ? allLessons[currentFlatIndex + 1]
      : null;

  const breadcrumbs = [
    { label: "All Courses", href: routes.courses() },
    ...(course
      ? [
          { label: course.title, href: routes.course(course.slug) },
          ...(currentModuleTitle ? [{ label: currentModuleTitle }] : []),
        ]
      : []),
    { label: lesson.title },
  ];

  const { leadText, remainingBlocks } = extractLeadParagraph(lesson.notes);

  return (
    <PageFrame>
      <SiteHeader />

      <LessonViewTracker
        slug={lesson.slug}
        title={lesson.title}
        courseTitle={course?.title}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Two-column layout: Sidebar + Content */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
          {/* Left Sidebar */}
          {course && (
            <LessonSidebar
              course={course}
              currentLessonSlug={lesson.slug}
              currentModuleIndex={currentModuleIndex}
            />
          )}

          {/* Right Content Column */}
          <main className="flex-1 w-full min-w-0 space-y-8">
            <Breadcrumbs items={breadcrumbs} className="pt-1" />

            <LessonHeader
              title={lesson.title}
              summary={leadText}
              moduleIndex={currentModuleIndex}
              lessonIndex={currentLessonIndex}
              duration={lesson.duration}
              level={course?.level}
              studentCount={lesson.studentCount}
            />

            <LessonVideo
              videoUrl={lesson.videoUrl}
              thumbnail={lesson.thumbnail}
              title={lesson.title}
              duration={lesson.duration}
              startSeconds={startSeconds}
            />

            <LessonTabs
              content={
                <>
                  <LessonNotes notes={remainingBlocks} />
                  <LessonKeyPoints
                    keyPoints={lesson.keyPoints}
                    proTip={lesson.proTip}
                  />
                  <LessonResources resources={lesson.resources} />
                </>
              }
            />
          </main>
        </div>

        {/* Footer Navigation across bottom */}
        <div className="mt-16">
          <LessonFooterNav
            previousLesson={previousLesson}
            nextLesson={nextLesson}
          />
        </div>
      </div>
    </PageFrame>
  );
}
