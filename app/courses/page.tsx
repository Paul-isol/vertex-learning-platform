import React from "react";
import type { Metadata } from "next";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { CourseGrid } from "@/components/cards/course-grid";
import { ChartDecoration } from "@/components/home/chart-decoration";
import { sanityFetch, CACHE_TAGS } from "@/sanity/lib/fetch";
import { COURSES_LIST_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "All Courses | Vertex",
  description: "Browse all high-quality, practical courses on Vertex.",
};

export default async function CoursesPage() {
  const courses = await sanityFetch({
    query: COURSES_LIST_QUERY,
    tags: [CACHE_TAGS.course, CACHE_TAGS.lesson],
  });

  const breadcrumbs = [
    { label: "All Courses" },
  ];

  const totalCourses = courses.length;

  return (
    <PageFrame>
      <SiteHeader />

      <main className="px-6 sm:px-12 lg:px-16 py-8 sm:py-12 space-y-8 flex-1 w-full max-w-6xl mx-auto relative z-10">
        <Breadcrumbs items={breadcrumbs} className="pt-2" />

        <div className="flex items-center justify-between border-b border-canvas-line pb-6">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            All Courses
          </h1>
          <p className="font-sans text-sm text-neutral-500 font-medium">
            {totalCourses} {totalCourses === 1 ? "course" : "courses"}
          </p>
        </div>

        <CourseGrid courses={courses} />
      </main>

      <ChartDecoration className="mt-auto" />
    </PageFrame>
  );
}
