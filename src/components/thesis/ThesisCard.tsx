"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Thesis, ThesisCategory } from "@/types/thesis";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

interface ThesisCardProps {
  thesis: Thesis;
  index?: number;
}

// Vibrant gradients for cards without images
const categoryGradients: Record<string, string> = {
  Healthcare: "from-emerald-400 via-teal-300 to-cyan-400",
  "AI/ML": "from-blue-500 via-indigo-400 to-violet-500",
  Bio: "from-purple-500 via-violet-400 to-fuchsia-500",
  Robotics: "from-orange-400 via-amber-400 to-yellow-400",
  Crypto: "from-amber-400 via-yellow-400 to-lime-400",
  Other: "from-slate-400 via-gray-400 to-zinc-400",
};

// Accent colors for the left border
const categoryAccents: Record<ThesisCategory, string> = {
  Healthcare: "bg-emerald-500",
  "AI/ML": "bg-blue-500",
  Bio: "bg-violet-500",
  Robotics: "bg-orange-500",
  Crypto: "bg-amber-500",
  Other: "bg-slate-400",
};

function getCategoryGradient(categories: Thesis["categories"]): string {
  if (categories.length === 0) return categoryGradients.Other;
  return categoryGradients[categories[0]] || categoryGradients.Other;
}

function getCategoryAccent(categories: Thesis["categories"]): string {
  if (categories.length === 0) return categoryAccents.Other;
  return categoryAccents[categories[0] as ThesisCategory] || categoryAccents.Other;
}

export function ThesisCard({ thesis, index = 0 }: ThesisCardProps) {
  const formattedDate = thesis.publicationDate
    ? new Date(thesis.publicationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : null;

  const accentColor = getCategoryAccent(thesis.categories);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/thesis/${thesis.slug}`}>
        <article className="h-full bg-white rounded-2xl overflow-hidden border border-charcoal/5 hover:border-charcoal/10 hover:shadow-lg hover:shadow-charcoal/5 transition-all duration-300">
          {/* Cover Image with colored accent bar */}
          <div className="relative">
            {/* Colored accent bar at top */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor} z-10`} />

            <div className="relative aspect-[16/10] overflow-hidden">
              {thesis.coverImage ? (
                <Image
                  src={thesis.coverImage}
                  alt={thesis.name}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(thesis.categories)} opacity-80`}>
                  {/* Scientific grid pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`grid-${thesis.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#grid-${thesis.id})`} />
                    </svg>
                  </div>
                  {/* Decorative circles */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/20" />
                    <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-white/10" />
                  </div>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
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

            {/* Meta info with index number */}
            <div className="flex items-center justify-between pt-2 border-t border-charcoal/5">
              <div className="flex items-center gap-2">
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
              {/* Read arrow */}
              <svg
                className="w-4 h-4 text-charcoal/20 group-hover:text-charcoal/60 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
