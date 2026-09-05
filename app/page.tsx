import React from "react";
import Link from "next/link";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/home/hero";
import { CourseGrid } from "@/components/cards/course-grid";
import { ChartDecoration } from "@/components/home/chart-decoration";
import { ArrowRight, Star } from "lucide-react";
import { sanityFetch, CACHE_TAGS } from "@/sanity/lib/fetch";
import { COURSES_LIST_QUERY } from "@/sanity/lib/queries";
import { routes } from "@/lib/routes";

export default async function HomePage() {
  const allCourses = await sanityFetch({
    query: COURSES_LIST_QUERY,
    tags: [CACHE_TAGS.course, CACHE_TAGS.lesson],
  });

  return (
    <PageFrame>
      {/* Top Navbar Header */}
      <SiteHeader />

      {/* Hero Section */}
      <Hero />

      {/* Full-width Divider */}
      <div className="w-full border-t border-canvas-line" />

      {/* All Courses Section */}
      <section className="px-8 sm:px-12 py-16 space-y-8 flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-display-2 text-2xl sm:text-3xl font-display font-bold text-neutral-900 tracking-tight">
            All Courses
          </h2>
          <Link
            href={routes.courses()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
          >
            <span>View all courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Course Cards Grid */}
        <CourseGrid courses={allCourses} limit={3} />

        {/* Footer Note with Star */}
        <div className="pt-12 pb-4 flex items-center gap-4 text-xs sm:text-sm font-medium text-neutral-500 font-sans justify-center">
          <div className="flex-1 border-t border-canvas-line" />
          <div className="flex items-center gap-2 text-neutral-500 shrink-0">
            <Star className="w-4 h-4 text-primary-500 stroke-[2px]" />
            <span>New courses and lessons added every week.</span>
          </div>
          <div className="flex-1 border-t border-canvas-line" />
        </div>
      </section>

      {/* Bottom Chart / Bar Glow Decoration */}
      <ChartDecoration className="mt-auto" />
    </PageFrame>
  );
}
