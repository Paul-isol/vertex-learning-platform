import React from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

export function extractLeadParagraph(notes?: unknown[] | null): {
  leadText: string | null;
  remainingBlocks: unknown[];
} {
  if (!Array.isArray(notes) || notes.length === 0) {
    return { leadText: null, remainingBlocks: [] };
  }

  let leadIndex = -1;
  let leadText: string | null = null;

  for (let i = 0; i < notes.length; i++) {
    const block = notes[i] as {
      _type?: string;
      style?: string;
      children?: Array<{ text?: string }>;
    };
    if (
      block &&
      block._type === "block" &&
      (!block.style || block.style === "normal")
    ) {
      const text = block.children?.map((c) => c.text || "").join("").trim();
      if (text) {
        leadIndex = i;
        leadText = text;
        break;
      }
    }
  }

  if (leadIndex >= 0) {
    const remaining = [...notes];
    remaining.splice(leadIndex, 1);
    return { leadText, remainingBlocks: remaining };
  }

  return { leadText: null, remainingBlocks: notes };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[15px] sm:text-base text-neutral-700 leading-relaxed sm:leading-[1.8] mb-4 last:mb-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mt-6 mb-3">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="font-display text-lg font-bold text-neutral-900 mt-4 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 py-1 italic text-neutral-600 my-4 bg-neutral-50/60 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1.5 my-3 text-[15px] text-neutral-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1.5 my-3 text-[15px] text-neutral-700">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[13px] font-mono border border-canvas-line">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-primary-600 hover:text-primary-700 underline underline-offset-2 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

export interface LessonNotesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notes?: any;
}

export function LessonNotes({ notes }: LessonNotesProps) {
  if (!notes || (Array.isArray(notes) && notes.length === 0)) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl sm:text-[22px] font-bold text-neutral-900 tracking-tight">
        Overview
      </h2>
      <div className="text-neutral-700">
        <PortableText value={notes} components={portableTextComponents} />
      </div>
    </section>
  );
}
