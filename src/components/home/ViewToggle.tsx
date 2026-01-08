"use client";

import { ViewMode } from "@/types/thesis";

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-0.5 p-0.5 border border-charcoal/15 rounded-full">
      <button
        onClick={() => onChange("grid")}
        className={`p-1.5 rounded-full transition-all duration-200 ${
          mode === "grid"
            ? "bg-charcoal text-cream"
            : "text-charcoal/40 hover:text-charcoal"
        }`}
        aria-label="Grid view"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM4 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        onClick={() => onChange("timeline")}
        className={`p-1.5 rounded-full transition-all duration-200 ${
          mode === "timeline"
            ? "bg-charcoal text-cream"
            : "text-charcoal/40 hover:text-charcoal"
        }`}
        aria-label="Timeline view"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
}
