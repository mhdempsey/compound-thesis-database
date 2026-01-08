"use client";

import { ThesisCategory } from "@/types/thesis";

interface CategoryBadgeProps {
  category: ThesisCategory;
  size?: "sm" | "md";
}

// More muted, scientific color palette
const categoryStyles: Record<ThesisCategory, string> = {
  Healthcare: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "AI/ML": "bg-blue-50 text-blue-700 border-blue-200",
  Bio: "bg-violet-50 text-violet-700 border-violet-200",
  Robotics: "bg-amber-50 text-amber-700 border-amber-200",
  Crypto: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Other: "bg-stone-50 text-stone-600 border-stone-200",
};

export function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  const styles = categoryStyles[category] || categoryStyles.Other;
  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-[10px]"
      : "px-3 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center rounded-full font-mono uppercase tracking-wider border ${styles} ${sizeClasses}`}
    >
      {category}
    </span>
  );
}
