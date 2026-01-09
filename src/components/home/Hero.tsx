"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="py-16 md:py-24 border-b border-charcoal/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-charcoal"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        {/* Colorful accent circles */}
        <div className="absolute -right-32 top-0 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/30 via-violet-200/20 to-transparent blur-3xl" />
        <div className="absolute -left-32 bottom-0 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-200/20 via-teal-200/10 to-transparent blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main title section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            {/* Academic-style header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-mono text-xs text-charcoal/50 uppercase tracking-[0.2em]">
                Research Repository
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal leading-[1.1] mb-6">
              Compound Thesis Database
            </h1>

            <p className="font-mono text-sm md:text-base text-charcoal-light max-w-xl leading-relaxed tracking-wide">
              <a href="https://compound.vc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">Compound</a> is a research-centric, thesis-driven investment firm. We do extensive research to build out theses in a variety of areas that comprise various futures we believe in. Below are a portion of our publicly available theses. This site is continually updated over time.
            </p>
            <p className="font-mono text-sm md:text-base text-charcoal-light max-w-xl leading-relaxed tracking-wide mt-4">
              If you&apos;re interested in chatting about any of these below, please reach out over email or on twitter!
            </p>

            {/* Vonnegut quote with colored accent */}
            <blockquote className="mt-8 pl-4 border-l-4 border-violet-400">
              <p className="font-serif text-base md:text-lg italic text-charcoal/70 leading-relaxed">
                &ldquo;I want to stay as close to the edge as I can without going over. Out on the edge you see all kinds of things you can&apos;t see from the center.&rdquo;
              </p>
              <cite className="block mt-2 font-mono text-xs text-charcoal/40 not-italic">
                — Kurt Vonnegut
              </cite>
            </blockquote>

            {/* Thesis Archive label */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-blue-400 to-violet-400" />
              <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
                Thesis Archive
              </span>
              <div className="h-px flex-1 bg-charcoal/10" />
            </div>
          </motion.div>

          {/* Learn more section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm relative overflow-hidden">
              {/* Colored accent at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-orange-500" />

              <h3 className="font-serif text-xl font-medium text-charcoal mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Learn more about Compound
              </h3>

              <div className="space-y-3">
                <a
                  href="https://docsend.com/view/i72yxz3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-charcoal/10 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="font-mono text-sm text-charcoal">Compound FAQ</span>
                  </div>
                  <svg className="w-4 h-4 text-charcoal/30 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a
                  href="https://compound.vc/writing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-charcoal/10 hover:border-violet-200 hover:bg-violet-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-violet-400" />
                    <span className="font-mono text-sm text-charcoal">Our Writing</span>
                  </div>
                  <svg className="w-4 h-4 text-charcoal/30 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a
                  href="https://compound.vc/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-charcoal/10 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-mono text-sm text-charcoal">Compound Portfolio</span>
                  </div>
                  <svg className="w-4 h-4 text-charcoal/30 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a
                  href="https://twitter.com/compoundarxiv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-charcoal/10 hover:border-orange-200 hover:bg-orange-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="font-mono text-sm text-charcoal">Compound Arxiv</span>
                  </div>
                  <svg className="w-4 h-4 text-charcoal/30 group-hover:text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
