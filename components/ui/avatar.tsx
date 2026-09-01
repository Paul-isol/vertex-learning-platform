import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({
  src,
  alt = "User avatar",
  initials = "U",
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base", // 48px
  };

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden shrink-0 border border-neutral-200 bg-neutral-100 flex items-center justify-center font-medium text-neutral-700 font-sans select-none",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
