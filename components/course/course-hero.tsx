import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Clock,
  FileText,
  Users,
  ArrowRight,
  Bookmark,
} from "lucide-react";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import {
  formatDuration,
  formatCount,
  formatLevel,
} from "@/lib/format";

export interface CourseHeroProps {
  title: string;
  summary?: string | null;
  coverImage?: SanityImageSource | null;
  level?: string | null;
  popular?: boolean | null;
  studentCount?: number | null;
  totalDuration?: number | null;
  moduleCount?: number | null;
  resumeHref: string;
}

export function CourseHero({
  title,
  summary,
  coverImage,
  level,
  popular,
  studentCount,
  totalDuration,
  moduleCount,
  resumeHref,
}: CourseHeroProps) {
  const imageUrl = coverImage
    ? urlFor(coverImage).width(560).height(656).fit("crop").quality(90).url()
    : null;

  return (
    <section className="flex flex-col md:flex-row gap-8 lg:gap-14 items-start w-full">
      {/* Course Cover Box */}
      <div className="w-full md:w-[280px] shrink-0">
        <div className="relative aspect-[280/328] w-full max-w-[280px] mx-auto md:mx-0 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 shadow-md flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 280px, 280px"
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-white/90 p-6 text-center">
              <span className="text-7xl font-bold font-display tracking-wider">
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Course Info Column */}
      <div className="flex-1 space-y-5">
        {popular && (
          <div>
            <Badge variant="popular" className="px-2.5 py-1 text-[11px] font-bold">
              POPULAR
            </Badge>
          </div>
        )}

        <div className="space-y-3">
          <h1 className="font-display text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold text-neutral-900 tracking-tight leading-[1.15]">
            {title}
          </h1>

          {summary && (
            <p className="font-sans text-base sm:text-[17px] text-neutral-500 leading-relaxed max-w-2xl">
              {summary}
            </p>
          )}
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8 pt-2 text-sm text-neutral-600 font-sans">
          {level && (
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-neutral-500 stroke-[2]" />
              <span>{formatLevel(level)}</span>
            </div>
          )}

          {totalDuration != null && totalDuration > 0 && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-500 stroke-[2]" />
              <span>{formatDuration(totalDuration)}</span>
            </div>
          )}

          {moduleCount != null && moduleCount > 0 && (
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-500 stroke-[2]" />
              <span>
                {moduleCount} {moduleCount === 1 ? "module" : "modules"}
              </span>
            </div>
          )}

          {studentCount != null && studentCount > 0 && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-neutral-500 stroke-[2]" />
              <span>{formatCount(studentCount)} students</span>
            </div>
          )}
        </div>

        {/* Buttons Row */}
        <div className="flex flex-wrap items-center gap-3.5 pt-4">
          <Link
            href={resumeHref}
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-primary-500 text-white font-sans font-semibold text-base hover:bg-primary-600 active:bg-primary-600 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl border border-canvas-line bg-canvas hover:bg-neutral-100 text-neutral-800 font-sans font-medium text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
          >
            <Bookmark className="w-4 h-4 text-neutral-700 stroke-[2]" />
            <span>Bookmark</span>
          </button>
        </div>
      </div>
    </section>
  );
}
