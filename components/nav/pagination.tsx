"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage = 1,
  totalPages = 8,
  onPageChange,
  className,
}: PaginationProps) {
  // Simple rendering helper matching reference image layout (1, 2, 3, ..., 8)
  const pages = [1, 2, 3, "...", totalPages];

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1.5 font-sans", className)}
    >
      <button
        onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-9 h-9 flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, i) => {
        if (p === "...") {
          return (
            <span
              key={`ellipsis-${i}`}
              className="w-9 h-9 flex items-center justify-center text-sm font-medium text-neutral-500 select-none"
            >
              ...
            </span>
          );
        }

        const pageNum = p as number;
        const isCurrent = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange?.(pageNum)}
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer",
              isCurrent
                ? "border border-primary-500 text-primary-500 font-semibold bg-white shadow-xs"
                : "text-neutral-700 hover:bg-neutral-100"
            )}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-9 h-9 flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
