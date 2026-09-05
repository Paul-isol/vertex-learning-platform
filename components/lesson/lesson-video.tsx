"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { parseVideoUrl } from "@/lib/video";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

export interface LessonVideoProps {
  videoUrl?: string | null;
  thumbnail?: SanityImageSource | null;
  title: string;
  duration?: number | null;
  startSeconds?: number;
}

export function LessonVideo({
  videoUrl,
  thumbnail,
  title,
  duration,
  startSeconds,
}: LessonVideoProps) {
  // If startSeconds is provided in query, autoplay immediately
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    return Boolean(startSeconds && startSeconds > 0);
  });

  const parsedVideo = parseVideoUrl(videoUrl);

  useEffect(() => {
    if (isPlaying && typeof window !== "undefined") {
      try {
        const posthog = (window as unknown as { posthog?: { capture: (event: string, properties?: Record<string, unknown>) => void } }).posthog;
        if (posthog && typeof posthog.capture === "function") {
          posthog.capture("video_played", {
            video_url: videoUrl,
            start_seconds: startSeconds || 0,
            duration: duration || 0,
          });
        }
      } catch {
        // Analytics must never throw
      }
    }
  }, [isPlaying, videoUrl, startSeconds, duration]);

  const thumbnailUrl = thumbnail
    ? urlFor(thumbnail).width(1280).height(720).fit("crop").quality(90).url()
    : null;

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const embedSrc = parsedVideo
    ? parsedVideo.embedUrl({
        startSeconds: startSeconds && startSeconds > 0 ? startSeconds : undefined,
        autoplay: true,
      })
    : null;

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900 shadow-md">
      {isPlaying && embedSrc ? (
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full border-0 absolute inset-0"
        />
      ) : (
        <div className="relative w-full h-full flex items-center justify-center group cursor-pointer" onClick={handlePlayClick}>
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
              <span className="text-white/40 font-display text-2xl">Vertex Video</span>
            </div>
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

          {/* Centered Play Button */}
          {parsedVideo ? (
            <button
              type="button"
              aria-label={`Play ${title}`}
              onClick={handlePlayClick}
              className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary-500 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/50 cursor-pointer"
            >
              <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-white translate-x-1" />
            </button>
          ) : (
            <div className="relative z-10 px-4 py-2 rounded-lg bg-neutral-900/80 text-white/80 text-sm font-sans">
              Video unavailable
            </div>
          )}
        </div>
      )}
    </div>
  );
}
