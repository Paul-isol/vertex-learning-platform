import React from "react";
import { Card } from "@/components/ui/card";
import { BarChart2, Clock, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  duration: string;
  modulesCount: number;
  logoText?: string;
  className?: string;
}

export function CourseCard({
  title,
  description,
  level,
  duration,
  modulesCount,
  logoText = "N",
  className,
}: CourseCardProps) {
  return (
    <Card className={cn("flex flex-col justify-between gap-5", className)}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-md bg-neutral-900 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {logoText}
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="font-heading font-semibold text-lg text-neutral-900 tracking-tight">
            {title}
          </h4>
          <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 pt-2 border-t border-neutral-100">
        <div className="flex items-center gap-1.5">
          <BarChart2 className="w-4 h-4 text-neutral-500" />
          <span>{level}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-neutral-500" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-neutral-500" />
          <span>{modulesCount} modules</span>
        </div>
      </div>
    </Card>
  );
}
