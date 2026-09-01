"use client";

import React from "react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { CourseCard } from "@/components/cards/course-card";
import { LessonVideoCard } from "@/components/cards/lesson-video-card";
import { LessonCard } from "@/components/cards/lesson-card";
import { ResourceCard } from "@/components/cards/resource-card";
import { Navbar } from "@/components/nav/navbar";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { Pagination } from "@/components/nav/pagination";
import {
  Bell,
  Search,
  Play,
  FileText,
  Bookmark,
  BarChart2,
  Clock,
  User,
  ChevronRight,
  ExternalLink,
  PlayCircle,
  Eye,
  Grid,
  Target,
  Accessibility,
} from "lucide-react";

export default function DesignSystemPage() {
  const primaryColors = [
    { name: "Primary 500", hex: "#F97316", bg: "bg-primary-500", text: "text-white" },
    { name: "Primary 400", hex: "#FB923C", bg: "bg-primary-400", text: "text-white" },
    { name: "Primary 300", hex: "#FDBA74", bg: "bg-primary-300", text: "text-neutral-900" },
    { name: "Primary 200", hex: "#FED7AA", bg: "bg-primary-200", text: "text-neutral-900" },
    { name: "Primary 100", hex: "#FFEEE5", bg: "bg-primary-100", text: "text-neutral-900" },
  ];

  const neutralColors = [
    { name: "Neutral 900", hex: "#0F172A", bg: "bg-neutral-900", text: "text-white" },
    { name: "Neutral 700", hex: "#334155", bg: "bg-neutral-700", text: "text-white" },
    { name: "Neutral 500", hex: "#64748B", bg: "bg-neutral-500", text: "text-white" },
    { name: "Neutral 300", hex: "#CBD5E1", bg: "bg-neutral-300", text: "text-neutral-900" },
    { name: "Neutral 200", hex: "#E2E8F0", bg: "bg-neutral-200", text: "text-neutral-900" },
    { name: "Neutral 100", hex: "#F1F5F9", bg: "bg-neutral-100", text: "text-neutral-900" },
    { name: "Neutral 50", hex: "#FAFAFC", bg: "bg-neutral-50", text: "text-neutral-900", border: true },
    { name: "White", hex: "#FFFFFF", bg: "bg-white", text: "text-neutral-900", border: true },
  ];

  const typeScale = [
    { style: "Display 1", font: "Playfair Display", size: "48 / 56", weight: "Bold", use: "Page titles", class: "text-display-1" },
    { style: "Display 2", font: "Playfair Display", size: "36 / 44", weight: "Bold", use: "Section titles", class: "text-display-2" },
    { style: "Heading 1", font: "Inter", size: "28 / 36", weight: "Semi Bold", use: "Card titles", class: "text-heading-1" },
    { style: "Heading 2", font: "Inter", size: "22 / 30", weight: "Semi Bold", use: "Sub section", class: "text-heading-2" },
    { style: "Heading 3", font: "Inter", size: "18 / 26", weight: "Medium", use: "Small titles", class: "text-heading-3" },
    { style: "Body Large", font: "Inter", size: "16 / 24", weight: "Regular", use: "Body copy", class: "text-body-large" },
    { style: "Body", font: "Inter", size: "14 / 20", weight: "Regular", use: "Supporting text", class: "text-body" },
    { style: "Small", font: "Inter", size: "12 / 16", weight: "Regular", use: "Captions, meta", class: "text-small" },
  ];

  const spacing = [
    { px: "4", rem: "0.25rem", size: "w-4 h-8" },
    { px: "8", rem: "0.5rem", size: "w-8 h-8" },
    { px: "12", rem: "0.75rem", size: "w-12 h-8" },
    { px: "16", rem: "1rem", size: "w-16 h-8" },
    { px: "24", rem: "1.5rem", size: "w-24 h-8" },
    { px: "32", rem: "2rem", size: "w-32 h-8" },
    { px: "40", rem: "2.5rem", size: "w-40 h-8" },
    { px: "48", rem: "3rem", size: "w-48 h-8" },
    { px: "64", rem: "4rem", size: "w-64 h-8" },
  ];

  const radii = [
    { name: "4px", label: "(xs)", radius: "rounded-xs" },
    { name: "8px", label: "(sm)", radius: "rounded-sm" },
    { name: "12px", label: "(md)", radius: "rounded-md" },
    { name: "16px", label: "(lg)", radius: "rounded-lg" },
    { name: "24px", label: "(xl)", radius: "rounded-xl" },
    { name: "Full", label: "(circle)", radius: "rounded-full" },
  ];

  const shadows = [
    { name: "Sm", css: "0 1px 2px 0 rgba(15, 23, 42, 0.05)", shadowClass: "shadow-sm" },
    { name: "Md", css: "0 4px 12px -2px rgba(15, 23, 42, 0.08)", shadowClass: "shadow-md" },
    { name: "Lg", css: "0 12px 24px -4px rgba(15, 23, 42, 0.10)", shadowClass: "shadow-lg" },
    { name: "Xl", css: "0 20px 40px -8px rgba(15, 23, 42, 0.12)", shadowClass: "shadow-xl" },
  ];

  const iconList = [Bell, Search, Play, FileText, Bookmark, BarChart2, Clock, User, ChevronRight];

  return (
    <main className="min-h-screen bg-[#FAFAFC] py-12 px-6 md:px-12 lg:px-20 font-sans text-neutral-900">
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Header / Hero */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-12 border-b border-neutral-200">
          <div className="space-y-4 max-w-2xl">
            <Logo size="lg" />
            <h1 className="text-display-1 font-display font-bold tracking-tight text-neutral-900">
              Design System
            </h1>
            <p className="text-body-large text-neutral-500 leading-relaxed">
              A unified design language for Vertex learning platform. Clean, modern and focused on clarity, consistency and intuitive learning experiences.
            </p>
          </div>
          <div className="text-xs font-medium uppercase tracking-wider text-neutral-500 shrink-0 pt-2">
            VERSION 1.0 · MAY 2025
          </div>
        </div>

        {/* 01 COLORS */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
            01 COLORS
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-neutral-900 mb-3">Primary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {primaryColors.map((c) => (
                  <div key={c.name} className="space-y-2">
                    <div className={`h-24 rounded-md ${c.bg} shadow-xs`} />
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">{c.name}</p>
                      <p className="text-xs font-mono text-neutral-500">{c.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral-900 mb-3">Neutral</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                {neutralColors.map((c) => (
                  <div key={c.name} className="space-y-2">
                    <div
                      className={`h-24 rounded-md ${c.bg} ${
                        c.border ? "border border-neutral-200" : ""
                      } shadow-xs`}
                    />
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">{c.name}</p>
                      <p className="text-xs font-mono text-neutral-500">{c.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 TYPOGRAPHY & 03 TYPE SCALE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 02 TYPOGRAPHY */}
          <section className="lg:col-span-4 space-y-6">
            <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
              02 TYPOGRAPHY
            </h2>
            <div className="space-y-8 bg-white p-6 rounded-lg border border-neutral-200">
              <div>
                <div className="text-5xl font-display font-bold text-neutral-900 mb-2">Ag</div>
                <h3 className="text-lg font-display font-bold text-neutral-900">Playfair Display</h3>
                <p className="text-xs text-neutral-500 mt-1">Elegant · Readable · Timeless</p>
              </div>
              <div className="pt-6 border-t border-neutral-100">
                <div className="text-5xl font-sans font-bold text-neutral-900 mb-2">Ag</div>
                <h3 className="text-lg font-sans font-bold text-neutral-900">Inter</h3>
                <p className="text-xs text-neutral-500 mt-1">Clean · Modern · Highly legible</p>
              </div>
            </div>
          </section>

          {/* 03 TYPE SCALE */}
          <section className="lg:col-span-8 space-y-6">
            <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
              03 TYPE SCALE
            </h2>
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50 text-xs font-semibold uppercase text-neutral-500">
                      <th className="py-3 px-4">Style</th>
                      <th className="py-3 px-4">Font</th>
                      <th className="py-3 px-4">Size / Line Height</th>
                      <th className="py-3 px-4">Weight</th>
                      <th className="py-3 px-4">Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-sm">
                    {typeScale.map((item) => (
                      <tr key={item.style} className="hover:bg-neutral-50/50">
                        <td className={`py-3 px-4 font-semibold text-neutral-900 ${item.class}`}>
                          {item.style}
                        </td>
                        <td className="py-3 px-4 text-neutral-500">{item.font}</td>
                        <td className="py-3 px-4 font-mono text-neutral-500">{item.size}</td>
                        <td className="py-3 px-4 text-neutral-500">{item.weight}</td>
                        <td className="py-3 px-4 text-neutral-500">{item.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* 04 SPACING SYSTEM & 05 RADIUS & SHADOWS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 04 SPACING SYSTEM */}
          <section className="lg:col-span-6 space-y-6">
            <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
              04 SPACING SYSTEM
            </h2>
            <div className="bg-white p-6 rounded-lg border border-neutral-200 space-y-4">
              <p className="text-xs font-medium text-neutral-500">Base unit: 4px</p>
              <div className="flex flex-wrap items-end gap-4 overflow-x-auto pb-2">
                {spacing.map((s) => (
                  <div key={s.px} className="flex flex-col items-center gap-2 shrink-0">
                    <div className={`${s.size} bg-primary-200 rounded-xs`} />
                    <div className="text-center">
                      <p className="text-xs font-semibold text-neutral-900">{s.px}</p>
                      <p className="text-[10px] text-neutral-500">({s.rem})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 05 RADIUS & SHADOWS */}
          <section className="lg:col-span-6 space-y-6">
            <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
              05 RADIUS & SHADOWS
            </h2>
            <div className="bg-white p-6 rounded-lg border border-neutral-200 space-y-6">
              <div>
                <h3 className="text-xs font-medium text-neutral-500 mb-3">Radius</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {radii.map((r) => (
                    <div key={r.name} className="flex flex-col items-center gap-1.5">
                      <div className={`w-12 h-12 border-2 border-neutral-300 bg-neutral-50 ${r.radius}`} />
                      <div className="text-center">
                        <p className="text-xs font-semibold text-neutral-900">{r.name}</p>
                        <p className="text-[10px] text-neutral-500">{r.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <h3 className="text-xs font-medium text-neutral-500 mb-3">Shadows</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {shadows.map((sh) => (
                    <div key={sh.name} className={`p-4 rounded-md bg-white border border-neutral-100 ${sh.shadowClass} space-y-1`}>
                      <p className="text-xs font-semibold text-neutral-900">{sh.name}</p>
                      <p className="text-[10px] font-mono text-neutral-500 leading-tight">{sh.css}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 06 ICONS */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
            06 ICONS
          </h2>
          <div className="bg-white p-6 rounded-lg border border-neutral-200 space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-medium text-neutral-500 mb-3">Outline Style</h3>
                <div className="flex flex-wrap items-center gap-6">
                  {iconList.map((Icon, idx) => (
                    <Icon key={`outline-${idx}`} className="w-6 h-6 text-neutral-900 stroke-[2px]" />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <h3 className="text-xs font-medium text-neutral-500 mb-3">Filled Style</h3>
                <div className="flex flex-wrap items-center gap-6">
                  {iconList.map((Icon, idx) => (
                    <Icon key={`filled-${idx}`} className="w-6 h-6 text-neutral-900 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <h3 className="text-xs font-medium text-neutral-500 mb-2">Icon Specs</h3>
              <ul className="text-xs text-neutral-500 list-disc list-inside space-y-1">
                <li>24x24px grid</li>
                <li>2px stroke width (outline)</li>
                <li>Rounded line caps</li>
                <li>Consistent optical balance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 07 BUTTONS */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
            07 BUTTONS
          </h2>
          <div className="bg-white p-6 rounded-lg border border-neutral-200 space-y-6 overflow-x-auto">
            <div className="min-w-[600px] space-y-6">
              <div className="grid grid-cols-5 gap-4 items-center font-medium text-xs text-neutral-500 uppercase pb-2 border-b border-neutral-100">
                <div>State</div>
                <div>Primary</div>
                <div>Secondary</div>
                <div>Tertiary</div>
                <div>Text</div>
              </div>

              {/* Default Row */}
              <div className="grid grid-cols-5 gap-4 items-center">
                <span className="text-xs font-semibold text-neutral-900">Default</span>
                <div>
                  <Button variant="primary">Get Started</Button>
                </div>
                <div>
                  <Button variant="secondary">Explore Courses</Button>
                </div>
                <div>
                  <Button variant="tertiary">
                    <span>View Lesson</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div>
                  <Button variant="text">
                    <PlayCircle className="w-4 h-4 mr-1 text-primary-500" />
                    <span>Watch Video</span>
                  </Button>
                </div>
              </div>

              {/* Hover Row */}
              <div className="grid grid-cols-5 gap-4 items-center">
                <span className="text-xs font-semibold text-neutral-900">Hover</span>
                <div>
                  <Button variant="primary" className="bg-primary-600">
                    Get Started
                  </Button>
                </div>
                <div>
                  <Button variant="secondary" className="bg-primary-100/50">
                    Explore Courses
                  </Button>
                </div>
                <div>
                  <Button variant="tertiary" className="bg-neutral-50">
                    <span>View Lesson</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div>
                  <Button variant="text" className="text-primary-600">
                    <PlayCircle className="w-4 h-4 mr-1 text-primary-600" />
                    <span>Watch Video</span>
                  </Button>
                </div>
              </div>

              {/* Disabled Row */}
              <div className="grid grid-cols-5 gap-4 items-center">
                <span className="text-xs font-semibold text-neutral-900">Disabled</span>
                <div>
                  <Button variant="primary" disabled>
                    Get Started
                  </Button>
                </div>
                <div>
                  <Button variant="secondary" disabled>
                    Explore Courses
                  </Button>
                </div>
                <div>
                  <Button variant="tertiary" disabled>
                    <span>View Lesson</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div>
                  <Button variant="text" disabled>
                    <PlayCircle className="w-4 h-4 mr-1 text-primary-300" />
                    <span>Watch Video</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <h3 className="text-xs font-medium text-neutral-500 mb-2">Button Specs</h3>
              <ul className="text-xs text-neutral-500 list-disc list-inside space-y-1">
                <li>Height: 44px (default)</li>
                <li>Padding: 0 16px (lg), 0 12px (md)</li>
                <li>Radius: 12px</li>
                <li>Font: Inter Medium (14–16px)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 08 INPUTS */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
            08 INPUTS
          </h2>
          <div className="bg-white p-6 rounded-lg border border-neutral-200 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-900">Search / Text Input</label>
                <SearchInput />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-900">Select</label>
                <Select
                  options={[
                    { value: "most-relevant", label: "Most Relevant" },
                    { value: "newest", label: "Newest First" },
                    { value: "popular", label: "Most Popular" },
                  ]}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <h3 className="text-xs font-medium text-neutral-500 mb-2">Field Specs</h3>
              <ul className="text-xs text-neutral-500 list-disc list-inside space-y-1">
                <li>Height: 44px</li>
                <li>Radius: 12px</li>
                <li>Border: 1px solid #E2E8F0</li>
                <li>Padding: 0 16px</li>
                <li>Focus: Border color #FB923C</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 09 BADGES / TAGS & 10 STATUS / INDICATORS & 11 PROGRESS BAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 09 BADGES */}
          <section className="lg:col-span-4 space-y-6">
            <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
              09 BADGES / TAGS
            </h2>
            <div className="bg-white p-6 rounded-lg border border-neutral-200 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="space-y-1">
                  <span className="block text-[10px] text-neutral-500">Video</span>
                  <Badge variant="video">VIDEO</Badge>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] text-neutral-500">Lesson</span>
                  <Badge variant="lesson">LESSON</Badge>
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] text-neutral-500">Popular</span>
                  <Badge variant="popular">POPULAR</Badge>
                </div>
              </div>
            </div>
          </section>

          {/* 10 STATUS */}
          <section className="lg:col-span-4 space-y-6">
            <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
              10 STATUS / INDICATORS
            </h2>
            <div className="bg-white p-6 rounded-lg border border-neutral-200">
              <div className="grid grid-cols-2 gap-4">
                <StatusIndicator status="in-progress" />
                <StatusIndicator status="completed" />
                <StatusIndicator status="now-playing" />
                <StatusIndicator status="locked" />
              </div>
            </div>
          </section>

          {/* 11 PROGRESS BAR */}
          <section className="lg:col-span-4 space-y-6">
            <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
              11 PROGRESS BAR
            </h2>
            <div className="bg-white p-6 rounded-lg border border-neutral-200 flex items-center">
              <ProgressBar value={35} />
            </div>
          </section>
        </div>

        {/* 12 CARDS */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
            12 CARDS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CourseCard
              title="Next.js for Production"
              description="Build scalable, high-performance web applications with Next.js."
              level="Intermediate"
              duration="18h 24m"
              modulesCount={12}
            />
            <LessonVideoCard
              title="Data Fetching in Server Components"
              description="Learn how to fetch data on the server using async/await and Next.js best practices."
              lessonLabel="Lesson 5.1"
              duration="12:45"
              startTimestamp="12:45"
            />
            <LessonCard
              title="Data Fetching & Caching"
              description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
              moduleLabel="Module 5"
            />
            <ResourceCard
              title="Caching and Revalidation Guide"
              description="Deep dive into Next.js caching strategies."
              fileType="PDF"
              fileSize="1.2 MB"
            />
          </div>
        </section>

        {/* 13 NAVIGATION */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
            13 NAVIGATION
          </h2>
          <div className="bg-white p-6 rounded-lg border border-neutral-200 space-y-8">
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-neutral-500">Navbar</h3>
              <Navbar />
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-medium text-neutral-500">Breadcrumbs</h3>
              <Breadcrumbs
                items={[
                  { label: "All Courses", href: "#" },
                  { label: "Next.js for Production", href: "#" },
                  { label: "Data Fetching & Caching" },
                ]}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-medium text-neutral-500">Pagination</h3>
              <Pagination currentPage={1} totalPages={8} />
            </div>
          </div>
        </section>

        {/* 14 PRINCIPLES */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold tracking-wider text-primary-500 uppercase">
            14 PRINCIPLES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-neutral-200 flex items-start gap-4">
              <div className="p-3 rounded-full bg-neutral-100 text-neutral-900 shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base text-neutral-900">Clarity First</h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Every element should communicate clearly.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200 flex items-start gap-4">
              <div className="p-3 rounded-full bg-neutral-100 text-neutral-900 shrink-0">
                <Grid className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base text-neutral-900">Consistency</h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Use components and patterns consistently across the platform.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200 flex items-start gap-4">
              <div className="p-3 rounded-full bg-neutral-100 text-neutral-900 shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base text-neutral-900">Focus & Calm</h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Remove noise and help learners focus on what matters.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200 flex items-start gap-4">
              <div className="p-3 rounded-full bg-neutral-100 text-neutral-900 shrink-0">
                <Accessibility className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base text-neutral-900">Accessible</h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Design with accessibility and inclusivity in mind.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
