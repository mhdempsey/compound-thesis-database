"use client";

import { ThesisCategory } from "@/types/thesis";

interface CategoryBadgeProps {
  category: ThesisCategory;
  size?: "sm" | "md";
}

// Vibrant, academic color palette with more saturation
const categoryStyles: Record<ThesisCategory, { bg: string; text: string; border: string; dot: string }> = {
  Healthcare: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    border: "border-emerald-300",
    dot: "bg-emerald-500"
  },
  "AI/ML": {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
    dot: "bg-blue-500"
  },
  Bio: {
    bg: "bg-violet-100",
    text: "text-violet-800",
    border: "border-violet-300",
    dot: "bg-violet-500"
  },
  Robotics: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-300",
    dot: "bg-orange-500"
  },
  Crypto: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    border: "border-amber-300",
    dot: "bg-amber-500"
  },
  Other: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-300",
    dot: "bg-slate-500"
  },
};

export function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  const styles = categoryStyles[category] || categoryStyles.Other;
  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-1 text-[10px]"
      : "px-3 py-1.5 text-xs";

  const dotSize = size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-wider border ${styles.bg} ${styles.text} ${styles.border} ${sizeClasses}`}
    >
      <span className={`${dotSize} rounded-full ${styles.dot}`} />
      {category}
    </span>
  );
}
