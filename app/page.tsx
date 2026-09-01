import React from "react";
import Link from "next/link";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/home/hero";
import { CourseCard } from "@/components/cards/course-card";
import { NextjsMark, DockerMark, TypescriptMark } from "@/components/brand/course-marks";
import { ChartDecoration } from "@/components/home/chart-decoration";
import { ArrowRight, Star } from "lucide-react";

const COURSES = [
  {
    id: "nextjs-production",
    title: "Next.js for Production",
    description: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modulesCount: 12,
    icon: <NextjsMark />,
    href: "/courses/nextjs-for-production",
  },
  {
    id: "docker-essentials",
    title: "Docker Essentials",
    description: "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modulesCount: 8,
    icon: <DockerMark />,
    href: "/courses/docker-essentials",
  },
  {
    id: "typescript-deep-dive",
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modulesCount: 10,
    icon: <TypescriptMark />,
    href: "/courses/typescript-deep-dive",
  },
];

export default function HomePage() {
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
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm"
          >
            <span>View all courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <CourseCard
              key={course.id}
              layout="stacked"
              title={course.title}
              description={course.description}
              level={course.level}
              duration={course.duration}
              modulesCount={course.modulesCount}
              icon={course.icon}
              href={course.href}
            />
          ))}
        </div>

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
