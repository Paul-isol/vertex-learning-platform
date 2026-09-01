"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  shortcut?: string;
  size?: "md" | "lg";
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      shortcut = "⌘ K",
      placeholder = "Search anything...",
      size = "md",
      ...props
    },
    ref
  ) => {
    const isLg = size === "lg";

    return (
      <div className={cn("relative flex items-center w-full", className)}>
        <Search
          className={cn(
            "absolute text-neutral-500 pointer-events-none transition-all",
            isLg ? "left-5 w-6 h-6" : "left-4 w-5 h-5"
          )}
        />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={cn(
            "w-full rounded-md border border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-500 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 transition-colors font-sans shadow-xs",
            isLg
              ? "h-[64px] sm:h-[72px] pl-14 pr-20 text-base sm:text-lg"
              : "h-[44px] pl-11 pr-14 text-sm"
          )}
          {...props}
        />
        {shortcut && (
          <kbd
            className={cn(
              "absolute inline-flex items-center justify-center rounded border border-neutral-200 bg-neutral-50 font-medium text-neutral-500 font-sans pointer-events-none select-none",
              isLg
                ? "right-4 px-2.5 py-1 text-sm rounded-md"
                : "right-3 px-1.5 py-0.5 text-[12px]"
            )}
          >
            {shortcut}
          </kbd>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
