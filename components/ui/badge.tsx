import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "video" | "lesson" | "popular";
}

export function Badge({
  className,
  variant = "video",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    video: "bg-primary-100 text-primary-500 font-semibold",
    lesson: "bg-[#EEF0FE] text-[#4F46E5] font-semibold",
    popular: "bg-primary-100 text-primary-500 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] px-2 py-0.5 text-[12px] leading-4 tracking-wider uppercase font-sans",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
