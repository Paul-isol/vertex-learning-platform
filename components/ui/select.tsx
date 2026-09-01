"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center w-full max-w-xs", className)}>
        <select
          ref={ref}
          className="h-[44px] w-full appearance-none rounded-md border border-neutral-200 bg-white pl-4 pr-10 text-sm font-sans text-neutral-900 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 transition-colors cursor-pointer"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = "Select";
