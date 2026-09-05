import React from "react";
import { CheckCircle2, Lightbulb } from "lucide-react";

export interface LessonKeyPointsProps {
  keyPoints?: string[] | null;
  proTip?: string | null;
}

export function LessonKeyPoints({ keyPoints, proTip }: LessonKeyPointsProps) {
  const hasKeyPoints = keyPoints && keyPoints.length > 0;
  const hasProTip = Boolean(proTip);

  if (!hasKeyPoints && !hasProTip) return null;

  return (
    <div className="space-y-8">
      {hasKeyPoints && (
        <section className="space-y-4">
          <h3 className="font-sans text-[15px] font-semibold text-neutral-900">
            In this lesson you will:
          </h3>
          <ul className="space-y-3">
            {keyPoints!.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[15px] text-neutral-700 leading-snug">
                <CheckCircle2 className="w-[18px] h-[18px] text-primary-500 shrink-0 mt-0.5 stroke-[2]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {hasProTip && (
        <div className="rounded-2xl bg-primary-100/40 border border-primary-200/60 p-5 sm:p-6 flex items-start gap-4 shadow-xs">
          <div className="p-2 rounded-xl bg-primary-100 text-primary-600 shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5 stroke-[2]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display text-base font-bold text-neutral-900">
              Pro Tip
            </h4>
            <p className="text-[14px] sm:text-[15px] text-neutral-700 leading-relaxed">
              {proTip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
