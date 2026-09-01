import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center text-center pt-16 pb-20 px-6 sm:px-12 max-w-4xl mx-auto w-full",
        className
      )}
    >
      {/* Eyebrow badge */}
      <div className="inline-flex items-center rounded-full bg-primary-100/60 border border-primary-200/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-500 mb-8 font-sans">
        INTELLIGENT LEARNING
      </div>

      {/* Main headline */}
      <h1 className="text-display-1 text-4xl sm:text-5xl md:text-[56px] md:leading-[68px] font-display font-bold text-neutral-900 tracking-tight max-w-3xl">
        Search your learning <br className="hidden sm:inline" /> in plain English.
      </h1>

      {/* Subtitle */}
      <p className="text-body-large text-base sm:text-lg text-neutral-500 font-sans mt-6 max-w-xl leading-relaxed">
        Vertex understands what you want to learn and finds the exact lessons across all your courses.
      </p>

      {/* CTA Button */}
      <div className="mt-8 mb-12">
        <Link
          href="/courses"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md inline-block"
        >
          <Button size="xl" className="shadow-sm font-semibold">
            <span>Explore Courses</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Hero Search Bar */}
      <div className="w-full max-w-2xl">
        <SearchInput
          size="lg"
          placeholder="Ask anything about your learning..."
          shortcut="⌘ K"
        />
      </div>
    </section>
  );
}
