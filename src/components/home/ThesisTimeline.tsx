"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
        <p className="text-charcoal-light text-lg">
          No theses with publication dates found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <AnimatePresence mode="popLayout">
        {years.map((year) => (
          <motion.section
            key={year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="font-serif text-3xl font-semibold text-charcoal mb-8 sticky top-36 bg-cream/90 backdrop-blur-sm py-2 z-30">
              {year}
            </h2>

            {Object.entries(grouped[year])
              .sort((a, b) => monthOrder.indexOf(a[0]) - monthOrder.indexOf(b[0]))
              .map(([month, monthTheses]) => (
                <div key={month} className="mb-8">
                  <h3 className="text-sm font-medium text-charcoal-light uppercase tracking-wider mb-4">
                    {month}
                  </h3>
                  <div className="space-y-4 border-l-2 border-charcoal/10 pl-6">
                    {monthTheses.map((thesis) => (
                      <motion.div
                        key={thesis.id}
                        layout
                        className="relative"
                      >
                        {/* Timeline dot */}
                        <div className="absolute -left-[31px] top-2 w-3 h-3 rounded-full bg-charcoal/20 group-hover:bg-charcoal transition-colors" />

                        <Link
                          href={`/thesis/${thesis.slug}`}
                          className="block p-4 rounded-lg hover:bg-white hover:shadow-md transition-all group"
                        >
                          <div className="flex flex-wrap gap-2 mb-2">
                            {thesis.categories.map((cat) => (
                              <CategoryBadge key={cat} category={cat} size="sm" />
                            ))}
                          </div>
                          <h4 className="font-serif text-lg font-medium text-charcoal group-hover:text-charcoal/80 transition-colors">
                            {thesis.name}
                          </h4>
                          <p className="text-sm text-charcoal-light mt-1 line-clamp-2">
                            {thesis.oneLiner}
                          </p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
          </motion.section>
        ))}
      </AnimatePresence>
    </div>
  );
}
