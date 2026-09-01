import React from "react";
import { cn } from "@/lib/utils";

export function NextjsMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-16 h-16 rounded-xl bg-neutral-900 flex items-center justify-center text-white font-bold text-2xl shrink-0 shadow-xs",
        className
      )}
    >
      N
    </div>
  );
}

export function DockerMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-16 h-16 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#2496ED] shrink-0 shadow-xs p-2",
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.185.185 0 00.186-.186V3.575a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm0 2.716h2.118a.185.185 0 00.186-.186V6.29a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm0 2.714h2.118a.185.185 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H8.075a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.714h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H8.075a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.956 2.714h2.119a.185.185 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.955 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H2.164a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm0-2.714h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H2.164a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm21.49 1.777c-.378-.268-1.282-.361-1.921-.301-.136.012-.416.082-.573.14-.385.14-.727.42-1.077.7-.282.226-.59.458-.936.637-.625.322-1.394.464-2.146.464H.423c-.156 0-.256.16-.188.299.76 1.558 2.015 2.85 3.593 3.633 2.124 1.056 4.673 1.258 7.026.839 2.502-.447 4.786-1.748 6.444-3.664.887-1.025 1.576-2.195 2.014-3.483.056-.164-.085-.308-.242-.264z" />
      </svg>
    </div>
  );
}

export function TypescriptMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-16 h-16 rounded-xl bg-[#3178C6] flex items-center justify-center text-white font-bold text-2xl shrink-0 shadow-xs",
        className
      )}
    >
      TS
    </div>
  );
}
