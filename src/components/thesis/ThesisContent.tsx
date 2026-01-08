"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Thesis, NotionBlock } from "@/types/thesis";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { NotionRenderer } from "./NotionRenderer";

interface ThesisContentProps {
  thesis: Thesis;
  blocks: NotionBlock[];
}

export function ThesisContent({ thesis, blocks }: ThesisContentProps) {
  const formattedDate = thesis.publicationDate
    ? new Date(thesis.publicationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="py-12 md:py-20">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-charcoal-light hover:text-charcoal transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all theses
        </Link>
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {thesis.categories.map((category) => (
            <CategoryBadge key={category} category={category} size="md" />
          ))}
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal leading-tight mb-6">
          {thesis.name}
        </h1>

        {/* One-liner */}
        <p className="text-xl text-charcoal-light max-w-3xl">
          {thesis.oneLiner}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-charcoal/10">
          {formattedDate && (
            <span className="text-sm text-charcoal-light">{formattedDate}</span>
          )}
          {thesis.assignedTo && (
            <>
              <span className="text-charcoal/20">|</span>
              <span className="text-sm font-medium text-charcoal">
                {thesis.assignedTo}
              </span>
            </>
          )}
          {thesis.link && (
            <>
              <span className="text-charcoal/20">|</span>
              <a
                href={thesis.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-charcoal underline underline-offset-2 hover:text-charcoal-light transition-colors"
              >
                External Link
              </a>
            </>
          )}
        </div>
      </motion.header>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl"
      >
        {blocks.length > 0 ? (
          <NotionRenderer blocks={blocks} />
        ) : (
          <p className="text-charcoal-light italic">
            No additional content available for this thesis.
          </p>
        )}
      </motion.div>
    </article>
  );
}
