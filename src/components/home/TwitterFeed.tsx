"use client";

export function TwitterFeed() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
        <div>
          <h3 className="font-mono text-sm font-bold text-charcoal">@compoundarxiv</h3>
          <p className="font-mono text-xs text-charcoal/50">Research feed on X</p>
        </div>
      </div>

      <p className="font-mono text-sm text-charcoal/70 leading-relaxed mb-6">
        Follow our research feed for real-time updates on investment theses, market analysis, and emerging technology trends.
      </p>

      <a
        href="https://twitter.com/compoundarxiv"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-cream font-mono text-xs rounded-full hover:bg-charcoal/80 transition-colors"
      >
        <span>Follow on X</span>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </div>
  );
}
