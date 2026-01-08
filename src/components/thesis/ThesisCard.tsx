"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Thesis, categoryColors } from "@/types/thesis";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

interface ThesisCardProps {
  thesis: Thesis;
  index?: number;
}

// Generate a gradient background based on category
function getCategoryGradient(categories: Thesis["categories"]): string {
  if (categories.length === 0) {
    return "from-gray-200 to-gray-300";
  }

  const gradients: Record<string, string> = {
    Healthcare: "from-emerald-200 to-emerald-300",
    "AI/ML": "from-blue-200 to-blue-300",
    Bio: "from-purple-200 to-purple-300",
    Robotics: "from-orange-200 to-orange-300",
    Crypto: "from-yellow-200 to-yellow-300",
    Other: "from-gray-200 to-gray-300",
  };

  return gradients[categories[0]] || gradients.Other;
}

export function ThesisCard({ thesis, index = 0 }: ThesisCardProps) {
  const formattedDate = thesis.publicationDate
    ? new Date(thesis.publicationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/thesis/${thesis.slug}`}>
        <article className="h-full rounded-lg border border-charcoal/10 bg-white overflow-hidden transition-all duration-500 hover:border-charcoal/20 hover:shadow-lg hover:-translate-y-1">
          {/* Cover Image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            {thesis.coverImage ? (
              <Image
                src={thesis.coverImage}
                alt={thesis.name}
                fill
                className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(
                  thesis.categories
                )} transition-all duration-500 grayscale group-hover:grayscale-0`}
              >
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <span className="font-serif text-xl font-medium text-charcoal/60 text-center line-clamp-3">
                    {thesis.name}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6">
            {/* Category badges */}
            <div className="mb-3 flex flex-wrap gap-2">
              {thesis.categories.map((category) => (
                <CategoryBadge key={category} category={category} />
              ))}
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl font-semibold text-charcoal mb-2 line-clamp-2 group-hover:text-charcoal/80 transition-colors">
              {thesis.name}
            </h3>

            {/* One-liner */}
            <p className="text-sm text-charcoal-light mb-4 line-clamp-3">
              {thesis.oneLiner}
            </p>

            {/* Meta info */}
            <div className="pt-4 border-t border-charcoal/5">
              <div className="flex items-center justify-between text-xs text-charcoal-light">
                {formattedDate && <span>{formattedDate}</span>}
                {thesis.assignedTo && (
                  <span className="font-medium">{thesis.assignedTo}</span>
                )}
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
