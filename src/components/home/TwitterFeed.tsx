"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export function TwitterFeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    script.onload = () => {
      if (window.twttr && containerRef.current) {
        window.twttr.widgets.load(containerRef.current);
      }
    };

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl p-4 border border-charcoal/5 shadow-sm">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-charcoal/5">
        <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
        <div>
          <h3 className="font-mono text-xs font-bold text-charcoal">@compoundarxiv</h3>
          <p className="font-mono text-xs text-charcoal/50">Latest from our research feed</p>
        </div>
      </div>

      <div ref={containerRef} className="max-h-[400px] overflow-y-auto">
        <a
          className="twitter-timeline"
          data-height="380"
          data-theme="light"
          data-chrome="noheader nofooter noborders transparent"
          href="https://twitter.com/compoundarxiv?ref_src=twsrc%5Etfw"
        >
          Loading tweets...
        </a>
      </div>

      <div className="mt-3 pt-3 border-t border-charcoal/5">
        <a
          href="https://twitter.com/compoundarxiv"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-charcoal/60 hover:text-charcoal transition-colors flex items-center gap-2"
        >
          <span>View on X</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
