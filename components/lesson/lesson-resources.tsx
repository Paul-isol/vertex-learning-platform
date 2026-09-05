import React from "react";
import {
  FileText,
  FileCode,
  FolderGit2,
  ExternalLink,
  Link as LinkIcon,
  Presentation,
} from "lucide-react";

export interface LessonResourceItem {
  _key: string;
  type: "code" | "link" | "pdf" | "repo" | "slides" | string;
  title: string;
  description?: string | null;
  url: string;
}

export interface LessonResourcesProps {
  resources?: LessonResourceItem[] | null;
}

function getResourceIcon(type: string) {
  switch (type) {
    case "repo":
      return <FolderGit2 className="w-5 h-5 text-neutral-800" />;
    case "code":
      return <FileCode className="w-5 h-5 text-primary-600" />;
    case "slides":
      return <Presentation className="w-5 h-5 text-primary-600" />;
    case "link":
      return <LinkIcon className="w-5 h-5 text-primary-600" />;
    case "pdf":
    default:
      return <FileText className="w-5 h-5 text-primary-600" />;
  }
}

export function LessonResources({ resources }: LessonResourcesProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <section className="space-y-4 pt-4 border-t border-canvas-line">
      <h3 className="font-display text-xl sm:text-[22px] font-bold text-neutral-900 tracking-tight">
        Resources
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((res) => {
          const isExternal = res.url.startsWith("http");

          return (
            <a
              key={res._key || res.url}
              href={res.url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group relative rounded-2xl border border-canvas-line bg-canvas p-5 flex flex-col justify-between hover:border-neutral-300 hover:shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-neutral-100/80 border border-canvas-line flex items-center justify-center shrink-0">
                  {getResourceIcon(res.type)}
                </div>

                <div>
                  <h4 className="text-[14px] font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors leading-snug">
                    {res.title}
                  </h4>
                  {res.description && (
                    <p className="text-[13px] text-neutral-500 leading-normal mt-1 font-sans">
                      {res.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors stroke-[2]" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
