"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface LessonTabsProps {
  content: React.ReactNode;
}

export function LessonTabs({ content }: LessonTabsProps) {
  const [activeTab, setActiveTab] = useState<"content" | "notes">("content");

  const handleKeyDown = (e: React.KeyboardEvent, tab: "content" | "notes") => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab(tab === "content" ? "notes" : "content");
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Tabs list header */}
      <div
        role="tablist"
        aria-label="Lesson tabs"
        className="flex items-center gap-8 border-b border-canvas-line"
      >
        <button
          type="button"
          role="tab"
          id="tab-lesson-content"
          aria-selected={activeTab === "content"}
          aria-controls="panel-lesson-content"
          tabIndex={activeTab === "content" ? 0 : -1}
          onClick={() => setActiveTab("content")}
          onKeyDown={(e) => handleKeyDown(e, "content")}
          className={cn(
            "pb-3.5 text-[15px] font-medium transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xs",
            activeTab === "content"
              ? "text-primary-500"
              : "text-neutral-500 hover:text-neutral-800"
          )}
        >
          Lesson Content
          {activeTab === "content" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-500 rounded-full" />
          )}
        </button>

        <button
          type="button"
          role="tab"
          id="tab-notes"
          aria-selected={activeTab === "notes"}
          aria-controls="panel-notes"
          tabIndex={activeTab === "notes" ? 0 : -1}
          onClick={() => setActiveTab("notes")}
          onKeyDown={(e) => handleKeyDown(e, "notes")}
          className={cn(
            "pb-3.5 text-[15px] font-medium transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xs",
            activeTab === "notes"
              ? "text-primary-500"
              : "text-neutral-500 hover:text-neutral-800"
          )}
        >
          Notes
          {activeTab === "notes" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Tab Panels */}
      <div
        role="tabpanel"
        id="panel-lesson-content"
        aria-labelledby="tab-lesson-content"
        hidden={activeTab !== "content"}
        className="space-y-10 focus-visible:outline-none"
      >
        {content}
      </div>

      <div
        role="tabpanel"
        id="panel-notes"
        aria-labelledby="tab-notes"
        hidden={activeTab !== "notes"}
        className="py-12 text-center space-y-3 bg-neutral-50/50 rounded-2xl border border-canvas-line focus-visible:outline-none"
      >
        <h3 className="font-display text-xl font-bold text-neutral-900">
          Personal Notes
        </h3>
        <p className="text-sm text-neutral-500 max-w-sm mx-auto">
          Your notes live here soon. Keep track of code snippets, insights, and bookmarks while watching lessons.
        </p>
      </div>
    </div>
  );
}
