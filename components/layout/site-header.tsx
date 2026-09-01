"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { Bell, LogOut, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "@/lib/auth-client";

export interface SiteHeaderProps {
  className?: string;
}

function getInitials(name?: string, email?: string): string {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email && email.trim()) {
    return email.slice(0, 2).toUpperCase();
  }
  return "U";
}

export function SiteHeader({ className }: SiteHeaderProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  };

  const user = session?.user;
  const initials = getInitials(user?.name, user?.email);

  return (
    <header
      className={cn(
        "flex items-center justify-between h-20 px-8 bg-canvas border-b border-canvas-line w-full relative z-40",
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

        {isPending ? (
          <div className="w-10 h-10 rounded-full bg-neutral-200 animate-pulse" />
        ) : user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-label="User menu"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full cursor-pointer flex items-center"
            >
              <Avatar
                size="lg"
                src={user.image || undefined}
                initials={initials}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-canvas-line rounded-xl shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-canvas-line">
                  <p className="text-sm font-semibold text-neutral-900 truncate">
                    {user.name || "Learner"}
                  </p>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">
                    {user.email}
                  </p>
                </div>
                <Link
                  href="/my-learning"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-neutral-500" />
                  My Learning
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center px-4 h-10 rounded-md font-sans text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
