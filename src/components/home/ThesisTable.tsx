"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Thesis } from "@/types/thesis";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

interface ThesisTableProps {
  theses: Thesis[];
}

export function ThesisTable({ theses }: ThesisTableProps) {
  if (theses.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-mono text-sm text-charcoal-light">
          No theses found.
        </p>
      </div>
    );
  }

  // Sort by date (most recent first)
  const sortedTheses = [...theses].sort((a, b) => {
    const dateA = a.publicationDate || a.lastEditedAt;
    const dateB = b.publicationDate || b.lastEditedAt;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const formatDate = (dateStr: string | null, fallback: string) => {
    const date = dateStr || fallback;
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-charcoal/10">
            <th className="text-left font-mono text-[10px] uppercase tracking-wider text-charcoal/40 pb-3 pr-4">
              Title
            </th>
            <th className="text-left font-mono text-[10px] uppercase tracking-wider text-charcoal/40 pb-3 pr-4 hidden md:table-cell">
              Categories
            </th>
            <th className="text-left font-mono text-[10px] uppercase tracking-wider text-charcoal/40 pb-3 pr-4 hidden lg:table-cell">
              One-liner
            </th>
            <th className="text-right font-mono text-[10px] uppercase tracking-wider text-charcoal/40 pb-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="popLayout">
            {sortedTheses.map((thesis, index) => (
              <motion.tr
                key={thesis.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.02 }}
                className="group border-b border-charcoal/5 hover:bg-white/50 transition-colors"
              >
                <td className="py-4 pr-4">
                  <Link
                    href={`/thesis/${thesis.slug}`}
                    className="block group-hover:text-charcoal/70 transition-colors"
                  >
                    <span className="font-serif text-base md:text-lg font-medium text-charcoal">
                      {thesis.name}
                    </span>
                  </Link>
                </td>
                <td className="py-4 pr-4 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {thesis.categories.slice(0, 2).map((cat) => (
                      <CategoryBadge key={cat} category={cat} size="sm" />
                    ))}
                  </div>
                </td>
                <td className="py-4 pr-4 hidden lg:table-cell">
                  <p className="font-mono text-xs text-charcoal-light line-clamp-1 max-w-md">
                    {thesis.oneLiner}
                  </p>
                </td>
                <td className="py-4 text-right">
                  <span className="font-mono text-xs text-charcoal/40">
                    {formatDate(thesis.publicationDate, thesis.lastEditedAt)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
