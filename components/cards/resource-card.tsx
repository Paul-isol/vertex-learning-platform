import React from "react";
import { Card } from "@/components/ui/card";
import { FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResourceCardProps {
  title: string;
  description: string;
  fileType?: string;
  fileSize?: string;
  onOpen?: () => void;
  className?: string;
}

export function ResourceCard({
  title,
  description,
  fileType = "PDF",
  fileSize = "1.2 MB",
  onOpen,
  className,
}: ResourceCardProps) {
  return (
    <Card className={cn("flex flex-col justify-between gap-4", className)}>
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-md bg-neutral-100 text-neutral-700 shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="font-heading font-semibold text-base text-neutral-900 tracking-tight">
            {title}
          </h4>
          <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs font-medium text-neutral-500 pt-3 border-t border-neutral-100">
        <span>
          {fileType} · {fileSize}
        </span>
        <button
          onClick={onOpen}
          aria-label={`Open ${title}`}
          className="text-primary-500 hover:text-primary-600 cursor-pointer p-1 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}
