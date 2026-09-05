export type VideoProvider = "youtube" | "vimeo" | "bunny";

export interface ParsedVideo {
  provider: VideoProvider;
  id: string;
  embedUrl: (options?: { startSeconds?: number; autoplay?: boolean }) => string;
}

/**
 * Parses video URLs from YouTube, Vimeo, and Bunny Stream and returns embed helpers.
 */
export function parseVideoUrl(url?: string | null): ParsedVideo | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase().replace(/^www\./, "");

    // YouTube
    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "youtube-nocookie.com" ||
      hostname === "youtu.be"
    ) {
      let videoId: string | null = null;
      if (hostname === "youtu.be") {
        videoId = parsed.pathname.slice(1).split("/")[0] || null;
      } else if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/")[2] || null;
      } else if (parsed.pathname.startsWith("/v/")) {
        videoId = parsed.pathname.split("/")[2] || null;
      }

      if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return {
          provider: "youtube",
          id: videoId,
          embedUrl: ({ startSeconds, autoplay } = {}) => {
            const params = new URLSearchParams();
            if (autoplay) params.set("autoplay", "1");
            if (startSeconds && startSeconds > 0) {
              params.set("start", Math.floor(startSeconds).toString());
            }
            params.set("rel", "0");
            const qs = params.toString();
            return `https://www.youtube-nocookie.com/embed/${videoId}${qs ? `?${qs}` : ""}`;
          },
        };
      }
    }

    // Vimeo
    if (hostname === "vimeo.com" || hostname === "player.vimeo.com") {
      let videoId: string | null = null;
      if (hostname === "player.vimeo.com" && parsed.pathname.startsWith("/video/")) {
        videoId = parsed.pathname.split("/")[2] || null;
      } else {
        const matches = parsed.pathname.match(/\/(\d+)/);
        if (matches) videoId = matches[1];
      }

      if (videoId) {
        return {
          provider: "vimeo",
          id: videoId,
          embedUrl: ({ startSeconds, autoplay } = {}) => {
            const params = new URLSearchParams();
            if (autoplay) params.set("autoplay", "1");
            const qs = params.toString();
            const hash =
              startSeconds && startSeconds > 0
                ? `#t=${Math.floor(startSeconds)}s`
                : "";
            return `https://player.vimeo.com/video/${videoId}${qs ? `?${qs}` : ""}${hash}`;
          },
        };
      }
    }

    // Bunny Stream
    if (
      hostname === "iframe.mediadelivery.net" ||
      hostname === "video.bunnycdn.com"
    ) {
      // Expecting path like /embed/<libraryId>/<videoId> or /play/<libraryId>/<videoId>
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts.length >= 3) {
        const libraryId = parts[1];
        const videoId = parts[2];
        return {
          provider: "bunny",
          id: `${libraryId}/${videoId}`,
          embedUrl: ({ startSeconds, autoplay } = {}) => {
            const params = new URLSearchParams();
            if (autoplay) params.set("autoplay", "true");
            if (startSeconds && startSeconds > 0) {
              params.set("t", Math.floor(startSeconds).toString());
            }
            const qs = params.toString();
            return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}${qs ? `?${qs}` : ""}`;
          },
        };
      }
    }
  } catch {
    return null;
  }

  return null;
}
