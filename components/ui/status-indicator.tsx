import React from "react";
import { CheckCircle2, Lock, Play, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusType = "in-progress" | "completed" | "now-playing" | "locked";

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
  label?: string;
}

export function StatusIndicator({
  status,
  label,
  className,
  ...props
}: StatusIndicatorProps) {
  const defaultLabels: Record<StatusType, string> = {
    "in-progress": "In Progress",
    completed: "Completed",
    "now-playing": "Now Playing",
    locked: "Locked",
  };

  const textLabel = label ?? defaultLabels[status];

  const renderIcon = () => {
    switch (status) {
      case "in-progress":
        return (
          <div className="relative w-4 h-4 flex items-center justify-center">
            <CircleDot className="w-4 h-4 text-primary-500" />
          </div>
        );
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />;
      case "now-playing":
        return (
          <div className="w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center text-white">
            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
          </div>
        );
      case "locked":
        return <Lock className="w-4 h-4 text-neutral-500" />;
    }
  };

  return (
    <div
      className={cn("inline-flex items-center gap-2 text-sm font-medium text-neutral-900 font-sans", className)}
      {...props}
    >
      {renderIcon()}
      <span>{textLabel}</span>
    </div>
  );
}
