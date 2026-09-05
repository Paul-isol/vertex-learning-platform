import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { CourseHero } from "@/components/course/course-hero";
import { LearningOutcomes } from "@/components/course/learning-outcomes";
import { CourseContent } from "@/components/course/course-content";
import { CourseProgressBar } from "@/components/course/course-progress-bar";
import { ChartDecoration } from "@/components/home/chart-decoration";
import { sanityFetch, CACHE_TAGS } from "@/sanity/lib/fetch";
import {
  COURSE_BY_SLUG_QUERY,
  COURSE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { routes } from "@/lib/routes";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const courses = await sanityFetch({
    query: COURSE_SLUGS_QUERY,
    tags: [CACHE_TAGS.course],
  });

  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await sanityFetch({
    query: COURSE_BY_SLUG_QUERY,
    params: { slug },
    tags: [CACHE_TAGS.course, CACHE_TAGS.lesson],
  });

  if (!course) {
    return {
      title: "Course Not Found | Vertex",
    };
  }

  return {
    title: `${course.title} | Vertex`,
    description: course.summary || `Learn ${course.title} on Vertex`,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await sanityFetch({
    query: COURSE_BY_SLUG_QUERY,
    params: { slug },
    tags: [CACHE_TAGS.course, CACHE_TAGS.lesson],
  });

  if (!course) {
    notFound();
  }

  // Derive resume link from the first lesson of the first module
  const firstLessonSlug = course.modules?.[0]?.lessons?.[0]?.slug;
  const resumeHref = firstLessonSlug
    ? routes.lesson(firstLessonSlug)
    : routes.course(course.slug);

  const breadcrumbs = [
    { label: "All Courses", href: routes.courses() },
    { label: course.title },
  ];

  const moduleCount = course.modules ? course.modules.length : 0;

  return (
    <PageFrame>
      <SiteHeader />

      <main className="px-6 sm:px-12 lg:px-16 py-8 sm:py-12 space-y-12 sm:space-y-16 flex-1 w-full max-w-5xl mx-auto relative z-10">
        <Breadcrumbs items={breadcrumbs} className="pt-2" />

        <CourseHero
          title={course.title}
          summary={course.summary}
          coverImage={course.coverImage}
          level={course.level}
          popular={course.popular}
          studentCount={course.studentCount}
          totalDuration={course.totalDuration}
          moduleCount={moduleCount}
          resumeHref={resumeHref}
        />

        <LearningOutcomes outcomes={course.learningOutcomes} />

        <CourseContent
          modules={course.modules}
          totalDuration={course.totalDuration}
        />

        <CourseProgressBar
          percentComplete={0}
          resumeHref={resumeHref}
        />
      </main>

      <ChartDecoration className="mt-auto" />
    </PageFrame>
  );
}
