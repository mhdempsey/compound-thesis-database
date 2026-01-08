"use client";

import { ThesisCategory, categoryColors } from "@/types/thesis";

interface CategoryBadgeProps {
  category: ThesisCategory;
  size?: "sm" | "md";
}

export function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  const colors = categoryColors[category];
  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${colors.bg} ${colors.text} ${sizeClasses}`}
    >
      {category}
    </span>
  );
}
