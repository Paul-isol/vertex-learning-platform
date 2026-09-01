import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LessonVideoCardProps {
  title: string;
  description: string;
  lessonLabel: string;
  duration: string;
  startTimestamp?: string;
  onWatch?: () => void;
  className?: string;
}

export function LessonVideoCard({
  title,
  description,
  lessonLabel,
  duration,
  startTimestamp = "12:45",
  onWatch,
  className,
}: LessonVideoCardProps) {
  return (
    <Card className={cn("flex flex-col justify-between gap-4", className)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <Badge variant="video">VIDEO</Badge>
        </div>
        <h4 className="font-heading font-semibold text-lg text-neutral-900 tracking-tight">
          {title}
        </h4>
        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between text-xs font-medium text-neutral-500 pt-3 border-t border-neutral-100">
        <span>
          {lessonLabel} · {duration}
        </span>
        <button
          onClick={onWatch}
          className="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 font-medium cursor-pointer transition-colors"
        >
          <PlayCircle className="w-4 h-4 text-primary-500" />
          <span>Watch from {startTimestamp}</span>
        </button>
      </div>
    </Card>
  );
}
