import React from "react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps {
  items?: NavItem[];
  className?: string;
}

export function Navbar({
  items = [
    { label: "Courses", href: "#", active: true },
    { label: "My Learning", href: "#", active: false },
  ],
  className,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between h-16 px-6 bg-white border-b border-neutral-200 w-full",
        className
      )}
    >
      <Logo size="md" />
      <nav className="flex items-center gap-8 font-sans">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary-500",
              item.active ? "text-primary-500 font-semibold" : "text-neutral-900"
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
