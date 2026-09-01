import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LessonCardProps {
  title: string;
  description: string;
  moduleLabel: string;
  onView?: () => void;
  className?: string;
}

export function LessonCard({
  title,
  description,
  moduleLabel,
  onView,
  className,
}: LessonCardProps) {
  return (
    <Card className={cn("flex flex-col justify-between gap-4", className)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <Badge variant="lesson">LESSON</Badge>
        </div>
        <h4 className="font-heading font-semibold text-lg text-neutral-900 tracking-tight">
          {title}
        </h4>
        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between text-xs font-medium text-neutral-500 pt-3 border-t border-neutral-100">
        <span>{moduleLabel}</span>
        <button
          onClick={onView}
          className="inline-flex items-center gap-1.5 text-primary-500 hover:text-primary-600 font-medium cursor-pointer transition-colors"
        >
          <span>View lesson</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
}
