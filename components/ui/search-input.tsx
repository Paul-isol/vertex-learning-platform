"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, shortcut = "⌘ K", placeholder = "Search anything...", ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center w-full max-w-md", className)}>
        <Search className="absolute left-4 w-5 h-5 text-neutral-500 pointer-events-none" />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className="h-[44px] w-full rounded-md border border-neutral-200 bg-white pl-11 pr-14 text-sm font-sans text-neutral-900 placeholder:text-neutral-500 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 transition-colors"
          {...props}
        />
        {shortcut && (
          <kbd className="absolute right-3 inline-flex items-center gap-1 rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[12px] font-medium text-neutral-500 font-sans pointer-events-none">
            {shortcut}
          </kbd>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
