import React from "react";
import {
  Code,
  Database,
  Server,
  Shield,
  Zap,
  Layout,
  Cpu,
  Layers,
  Globe,
  Sparkles,
  Terminal,
  CheckCircle,
  Gauge,
  Rocket,
  Puzzle,
  Workflow,
  Cloud,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  code: Code,
  database: Database,
  server: Server,
  shield: Shield,
  zap: Zap,
  layout: Layout,
  cpu: Cpu,
  layers: Layers,
  globe: Globe,
  sparkles: Sparkles,
  terminal: Terminal,
  checkcircle: CheckCircle,
  gauge: Gauge,
  rocket: Rocket,
  puzzle: Puzzle,
  workflow: Workflow,
  cloud: Cloud,
};

export interface LearningOutcomeItem {
  _key?: string;
  icon?: string | null;
  title: string;
  description: string;
}

export interface LearningOutcomesProps {
  outcomes?: LearningOutcomeItem[] | null;
}

export function LearningOutcomes({ outcomes }: LearningOutcomesProps) {
  if (!outcomes || outcomes.length === 0) return null;

  return (
    <section aria-labelledby="what-you-will-learn-heading" className="w-full">
      <div className="rounded-2xl border border-canvas-line bg-canvas p-7 sm:p-8">
        <h2
          id="what-you-will-learn-heading"
          className="font-display text-2xl sm:text-[26px] font-bold text-neutral-900 tracking-tight mb-6"
        >
          What you’ll learn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {outcomes.map((outcome, idx) => {
            const iconKey = outcome.icon?.toLowerCase().trim() || "";
            const IconComponent = ICON_MAP[iconKey] || Layers;

            return (
              <div
                key={outcome._key || idx}
                className="rounded-xl border border-canvas-line bg-canvas p-6 sm:p-7 flex items-start gap-5 transition-colors"
              >
                <div className="shrink-0 text-primary-500 pt-0.5">
                  <IconComponent className="w-10 h-10 sm:w-11 sm:h-11 stroke-[1.5]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-lg sm:text-[19px] font-bold text-neutral-900 leading-snug">
                    {outcome.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-[15px] text-neutral-500 leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
