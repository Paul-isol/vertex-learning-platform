"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "text";
  size?: "md" | "lg" | "xl";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "lg",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-md font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none";

    const heightStyles = {
      md: "h-[44px]",
      lg: "h-[44px]",
      xl: "h-[56px] sm:h-[60px]",
    };

    const sizeStyles = {
      xl: "px-7 text-base font-semibold rounded-md", // 28px padding
      lg: "px-4 text-base",                          // 16px padding
      md: "px-3 text-sm",                            // 12px padding
    };

    const variantStyles = {
      primary:
        "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600 disabled:bg-primary-100 disabled:text-primary-300",
      secondary:
        "border border-primary-500 bg-transparent text-primary-500 hover:bg-primary-100/50 disabled:border-primary-200 disabled:text-primary-300 disabled:bg-transparent",
      tertiary:
        "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 disabled:border-neutral-200 disabled:text-neutral-300 disabled:bg-white",
      text:
        "bg-transparent text-primary-500 hover:text-primary-600 disabled:text-primary-300 px-0 h-auto font-medium",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant !== "text" && heightStyles[size],
          variant !== "text" && sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
