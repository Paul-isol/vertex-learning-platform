import React from "react";
import { cn } from "@/lib/utils";

export interface PageFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageFrame({ className, children, ...props }: PageFrameProps) {
  return (
    <div
      className="min-h-screen bg-canvas w-full relative overflow-x-hidden"
      style={{
        backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(240, 231, 224, 0.4) 10px, rgba(240, 231, 224, 0.4) 11px)`,
      }}
      {...props}
    >
      <div
        className={cn(
          "max-w-[1440px] mx-auto min-h-screen bg-canvas border-x border-canvas-line shadow-xs relative flex flex-col",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
