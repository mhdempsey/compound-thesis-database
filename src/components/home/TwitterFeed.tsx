"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
        createTimeline: (
          source: { sourceType: string; screenName: string },
          target: HTMLElement,
          options?: Record<string, unknown>
        ) => Promise<HTMLElement>;
      };
    };
  }
}

export function TwitterFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadTwitterWidget = () => {
      // Check if script already exists
      if (document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
        if (window.twttr?.widgets) {
          createTimeline();
        }
        return;
      }

      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";

      script.onload = () => {
        if (mounted) {
          // Wait for twttr to be ready
          const checkTwttr = setInterval(() => {
            if (window.twttr?.widgets) {
              clearInterval(checkTwttr);
              createTimeline();
            }
          }, 100);

          // Timeout after 5 seconds
          setTimeout(() => {
            clearInterval(checkTwttr);
            if (mounted && isLoading) {
              setHasError(true);
              setIsLoading(false);
            }
          }, 5000);
        }
      };

      script.onerror = () => {
        if (mounted) {
          setHasError(true);
          setIsLoading(false);
        }
      };

      document.body.appendChild(script);
    };

    const createTimeline = async () => {
      if (!containerRef.current || !window.twttr?.widgets) return;

      try {
        // Clear any existing content
        containerRef.current.innerHTML = '';

        await window.twttr.widgets.createTimeline(
          {
            sourceType: "profile",
            screenName: "compoundarxiv",
          },
          containerRef.current,
          {
            height: 400,
            chrome: "noheader nofooter noborders transparent",
            theme: "light",
            dnt: true,
          }
        );

        if (mounted) {
          setIsLoading(false);
        }
      } catch {
        if (mounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    loadTwitterWidget();

    return () => {
      mounted = false;
    };
  }, [isLoading]);

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

      <div ref={containerRef} className="min-h-[400px] max-h-[400px] overflow-y-auto">
        {isLoading && !hasError && (
          <div className="flex items-center justify-center h-[380px]">
            <div className="text-center">
              <div className="w-6 h-6 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin mx-auto mb-3" />
              <p className="font-mono text-xs text-charcoal/40">Loading tweets...</p>
            </div>
          </div>
        )}
        {hasError && (
          <div className="flex items-center justify-center h-[380px]">
            <div className="text-center px-4">
              <p className="font-mono text-sm text-charcoal/60 mb-4">
                Unable to load Twitter feed
              </p>
              <a
                href="https://twitter.com/compoundarxiv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-cream font-mono text-xs rounded-full hover:bg-charcoal/80 transition-colors"
              >
                <span>View on X</span>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        )}
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
