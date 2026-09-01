import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SiteHeaderProps {
  className?: string;
}

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between h-20 px-8 bg-canvas border-b border-canvas-line w-full",
        className
      )}
    >
      <div className="flex items-center gap-10">
        <Link
          href="/"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
        >
          <Logo size="md" />
        </Link>
        <nav className="hidden sm:flex items-center gap-8 font-sans">
          <Link
            href="/courses"
            className="text-sm font-medium text-neutral-900 hover:text-primary-500 transition-colors"
          >
            Courses
          </Link>
          <Link
            href="/my-learning"
            className="text-sm font-medium text-neutral-900 hover:text-primary-500 transition-colors"
          >
            My Learning
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="p-2 rounded-full text-neutral-700 hover:bg-neutral-200/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
        >
          <Bell className="w-5 h-5" />
        </button>
        <Link
          href="/profile"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full"
        >
          <Avatar size="lg" initials="JS" />
        </Link>
      </div>
    </header>
  );
}
