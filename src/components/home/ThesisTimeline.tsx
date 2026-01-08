"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Thesis } from "@/types/thesis";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { groupThesesByYear } from "@/lib/notion-helpers";

interface ThesisTimelineProps {
  theses: Thesis[];
}

export function ThesisTimeline({ theses }: ThesisTimelineProps) {
  const grouped = groupThesesByYear(theses);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  // Sort months in descending order
  const monthOrder = [
    "December", "November", "October", "September", "August", "July",
    "June", "May", "April", "March", "February", "January"
  ];

  if (years.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-mono text-sm text-charcoal-light">
          No theses found in timeline view.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main timeline line */}
      <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-charcoal/20 via-charcoal/10 to-transparent" />

      <AnimatePresence mode="popLayout">
        {years.map((year, yearIndex) => (
          <motion.section
            key={year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: yearIndex * 0.1 }}
            className="relative mb-16"
          >
            {/* Year marker */}
            <div className="sticky top-20 z-30 mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-charcoal border-4 border-cream" />
                  <div className="absolute -inset-2 rounded-full bg-charcoal/5" />
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-charcoal">
                  {year}
                </h2>
              </div>
            </div>

            {/* Months */}
            <div className="pl-8 md:pl-20 space-y-12">
              {Object.entries(grouped[year])
                .sort((a, b) => monthOrder.indexOf(a[0]) - monthOrder.indexOf(b[0]))
                .map(([month, monthTheses]) => (
                  <div key={month}>
                    {/* Month header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 rounded-full bg-charcoal/30" />
                      <h3 className="font-mono text-xs text-charcoal/50 uppercase tracking-[0.2em]">
                        {month}
                      </h3>
                      <div className="flex-1 h-px bg-charcoal/5" />
                    </div>

                    {/* Theses */}
                    <div className="space-y-6">
                      {monthTheses.map((thesis, index) => (
                        <motion.div
                          key={thesis.id}
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={`/thesis/${thesis.slug}`}
                            className="group block"
                          >
                            <article className="flex gap-4 md:gap-6 p-4 -mx-4 rounded-xl hover:bg-white/50 transition-all duration-300">
                              {/* Thumbnail */}
                              {thesis.coverImage && (
                                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                  <Image
                                    src={thesis.coverImage}
                                    alt={thesis.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    sizes="96px"
                                  />
                                </div>
                              )}

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                {/* Categories */}
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                  {thesis.categories.slice(0, 2).map((cat) => (
                                    <CategoryBadge key={cat} category={cat} size="sm" />
                                  ))}
                                </div>

                                {/* Title */}
                                <h4 className="font-serif text-base md:text-lg font-medium text-charcoal group-hover:text-charcoal/70 transition-colors line-clamp-2 mb-1">
                                  {thesis.name}
                                </h4>

                                {/* One-liner */}
                                <p className="font-mono text-xs text-charcoal-light line-clamp-2 leading-relaxed">
                                  {thesis.oneLiner}
                                </p>

                                {/* Arrow indicator */}
                                <div className="mt-3 flex items-center gap-2 text-charcoal/30 group-hover:text-charcoal/60 transition-colors">
                                  <span className="font-mono text-[10px] uppercase tracking-wider">
                                    Read thesis
                                  </span>
                                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </div>
                              </div>
                            </article>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </motion.section>
        ))}
      </AnimatePresence>
    </div>
  );
}
