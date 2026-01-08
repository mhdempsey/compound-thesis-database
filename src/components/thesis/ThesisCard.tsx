"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Thesis } from "@/types/thesis";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

interface ThesisCardProps {
  thesis: Thesis;
  index?: number;
}

// Generate a gradient background based on category
function getCategoryGradient(categories: Thesis["categories"]): string {
  if (categories.length === 0) {
    return "from-stone-200 via-stone-100 to-stone-200";
  }

  const gradients: Record<string, string> = {
    Healthcare: "from-emerald-100 via-teal-50 to-emerald-100",
    "AI/ML": "from-blue-100 via-indigo-50 to-blue-100",
    Bio: "from-purple-100 via-violet-50 to-purple-100",
    Robotics: "from-orange-100 via-amber-50 to-orange-100",
    Crypto: "from-yellow-100 via-amber-50 to-yellow-100",
    Other: "from-stone-200 via-stone-100 to-stone-200",
  };

  return gradients[categories[0]] || gradients.Other;
}

export function ThesisCard({ thesis, index = 0 }: ThesisCardProps) {
  const formattedDate = thesis.publicationDate
    ? new Date(thesis.publicationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/thesis/${thesis.slug}`}>
        <article className="h-full">
          {/* Cover Image - More rounded like La Playa */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4">
            {thesis.coverImage ? (
              <Image
                src={thesis.coverImage}
                alt={thesis.name}
                fill
                className="object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(
                  thesis.categories
                )} transition-all duration-700 grayscale group-hover:grayscale-0`}
              >
                {/* Abstract scientific pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <circle cx="20" cy="30" r="15" fill="currentColor" className="text-charcoal" />
                    <circle cx="70" cy="60" r="25" fill="currentColor" className="text-charcoal" />
                    <circle cx="85" cy="20" r="10" fill="currentColor" className="text-charcoal" />
                    <line x1="20" y1="30" x2="70" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-charcoal" />
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="font-serif text-lg font-medium text-charcoal/70 line-clamp-2">
                    {thesis.name}
                  </span>
                </div>
              </div>
            )}

            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            {/* Category badges */}
            <div className="flex flex-wrap gap-1.5">
              {thesis.categories.slice(0, 2).map((category) => (
                <CategoryBadge key={category} category={category} />
              ))}
            </div>

            {/* Title */}
            <h3 className="font-serif text-lg font-medium text-charcoal line-clamp-2 group-hover:text-charcoal/70 transition-colors duration-300">
              {thesis.name}
            </h3>

            {/* One-liner */}
            <p className="font-mono text-xs text-charcoal-light line-clamp-2 leading-relaxed">
              {thesis.oneLiner}
            </p>

            {/* Meta info */}
            {(formattedDate || thesis.assignedTo) && (
              <div className="flex items-center gap-2 pt-2">
                {formattedDate && (
                  <span className="font-mono text-[10px] text-charcoal/40 uppercase tracking-wider">
                    {formattedDate}
                  </span>
                )}
                {formattedDate && thesis.assignedTo && (
                  <span className="text-charcoal/20">·</span>
                )}
                {thesis.assignedTo && (
                  <span className="font-mono text-[10px] text-charcoal/40">
                    {thesis.assignedTo}
                  </span>
                )}
              </div>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
