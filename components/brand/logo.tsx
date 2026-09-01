import React from "react";
import { cn } from "@/lib/utils";

export function LogoMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.5 4L12 20.5L21.5 4H16.2L12 12.2L7.8 4H2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({
  size = "md",
  showWordmark = true,
  className,
}: {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}) {
  const markSizeMap = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  };

  const textClassMap = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("inline-flex items-center gap-2.5 font-display text-neutral-900", className)}>
      <LogoMark className={cn("text-primary-500", markSizeMap[size])} />
      {showWordmark && (
        <span className={cn("font-bold tracking-tight", textClassMap[size])}>
          Vertex
        </span>
      )}
    </div>
  );
}
