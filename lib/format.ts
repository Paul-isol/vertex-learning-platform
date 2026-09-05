/**
 * Format seconds into human readable duration strings.
 * e.g., 66240 -> "18h 24m", 2700 -> "45m"
 */
export function formatDuration(seconds?: number | null): string {
  if (!seconds || seconds <= 0) return "0m";

  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  return `${minutes}m`;
}

/**
 * Format counts into shorthand strings.
 * e.g., 2100 -> "2.1k", 10000 -> "10k"
 */
export function formatCount(count?: number | null): string {
  if (count == null) return "0";
  if (count >= 1000000) {
    const val = (count / 1000000).toFixed(1).replace(/\.0$/, "");
    return `${val}M`;
  }
  if (count >= 1000) {
    const val = (count / 1000).toFixed(1).replace(/\.0$/, "");
    return `${val}k`;
  }
  return count.toString();
}

/**
 * Format level string to capitalized form.
 * e.g., "intermediate" -> "Intermediate"
 */
export function formatLevel(level?: string | null): string {
  if (!level) return "";
  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}

/**
 * Format module number from 0-based index.
 */
export function formatModuleNumber(index: number): string {
  return (index + 1).toString();
}

/**
 * Format lesson index label.
 * e.g., "1.1", "5.2"
 */
export function formatLessonLabel(moduleIndex: number, lessonIndex: number): string {
  return `${moduleIndex + 1}.${lessonIndex + 1}`;
}

/**
 * Format seconds into timestamp string like "12:45" or "1:28:00".
 */
export function formatTimestamp(seconds?: number | null): string {
  if (!seconds || seconds <= 0) return "0:00";
  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  if (hours > 0) {
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return `${minutes}:${paddedSeconds}`;
}

