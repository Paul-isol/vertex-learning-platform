import React from "react";
import Link from "next/link";
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
  icon?: React.ReactNode;
  layout?: "row" | "stacked";
  href?: string;
  className?: string;
}

export function CourseCard({
  title,
  description,
  level,
  duration,
  modulesCount,
  logoText = "N",
  icon,
  layout = "row",
  href,
  className,
}: CourseCardProps) {
  const isStacked = layout === "stacked";

  const renderIcon = () => {
    if (icon) return icon;
    return (
      <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-xs">
        {logoText}
      </div>
    );
  };

  const cardContent = (
    <Card
      className={cn(
        "flex flex-col justify-between h-full p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      {isStacked ? (
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6">{renderIcon()}</div>
            <h3 className="font-display font-bold text-xl text-neutral-900 tracking-tight leading-snug">
              {title}
            </h3>
            <p className="text-sm font-sans text-neutral-500 line-clamp-3 leading-relaxed mt-2.5">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-medium text-neutral-500 pt-5 mt-6 border-t border-neutral-100 font-sans">
            <div className="flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-neutral-500" />
              <span>{level}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-neutral-500" />
              <span>{modulesCount} modules</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between gap-5">
          <div className="flex items-start gap-4">
            {renderIcon()}
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
        </div>
      )}
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
