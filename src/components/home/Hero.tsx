"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="py-16 md:py-24 border-b border-charcoal/5">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main title section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal leading-[1.1] mb-6">
              Compound Thesis Database
            </h1>
            <p className="font-mono text-sm md:text-base text-charcoal-light max-w-xl leading-relaxed tracking-wide">
              <a href="https://compound.vc" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-charcoal transition-colors">Compound</a> is a research-centric, thesis-driven investment firm. We do extensive research to build out theses in a variety of areas that comprise various futures we believe in. Below are a portion of our publicly available theses. This site is continually updated over time.
            </p>
            <p className="font-mono text-sm md:text-base text-charcoal-light max-w-xl leading-relaxed tracking-wide mt-4">
              If you&apos;re interested in chatting about any of these below, please reach out over email or on twitter!
            </p>

            {/* Vonnegut quote */}
            <blockquote className="mt-8 pl-4 border-l-2 border-charcoal/20">
              <p className="font-serif text-base md:text-lg italic text-charcoal/70 leading-relaxed">
                &ldquo;I want to stay as close to the edge as I can without going over. Out on the edge you see all kinds of things you can&apos;t see from the center.&rdquo;
              </p>
              <cite className="block mt-2 font-mono text-xs text-charcoal/40 not-italic">
                — Kurt Vonnegut
              </cite>
            </blockquote>

            {/* Thesis Archive label */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-charcoal/20" />
              <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
                Thesis Archive
              </span>
            </div>
          </motion.div>

          {/* Learn more section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm">
              <h3 className="font-serif text-xl font-medium text-charcoal mb-6">
                Learn more about Compound
              </h3>

              <div className="space-y-4">
                <a
                  href="https://docsend.com/view/i72yxz3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-charcoal/10 hover:border-charcoal/20 hover:bg-charcoal/[0.02] transition-all group"
                >
                  <span className="font-mono text-sm text-charcoal">Compound FAQ</span>
                  <svg className="w-4 h-4 text-charcoal/40 group-hover:text-charcoal group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a
                  href="https://compound.vc/writing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-charcoal/10 hover:border-charcoal/20 hover:bg-charcoal/[0.02] transition-all group"
                >
                  <span className="font-mono text-sm text-charcoal">Our Writing</span>
                  <svg className="w-4 h-4 text-charcoal/40 group-hover:text-charcoal group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a
                  href="https://compound.vc/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-charcoal/10 hover:border-charcoal/20 hover:bg-charcoal/[0.02] transition-all group"
                >
                  <span className="font-mono text-sm text-charcoal">Compound Portfolio</span>
                  <svg className="w-4 h-4 text-charcoal/40 group-hover:text-charcoal group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a
                  href="https://twitter.com/compoundarxiv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-charcoal/10 hover:border-charcoal/20 hover:bg-charcoal/[0.02] transition-all group"
                >
                  <span className="font-mono text-sm text-charcoal">Compound Arxiv</span>
                  <svg className="w-4 h-4 text-charcoal/40 group-hover:text-charcoal" fill="currentColor" viewBox="0 0 24 24">
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
