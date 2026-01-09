"use client";

import { useState } from "react";
import Link from "next/link";
import { Thesis } from "@/types/thesis";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

interface ThesisTableProps {
  theses: Thesis[];
}

type SortField = "title" | "category" | "date";
type SortDirection = "asc" | "desc";

export function ThesisTable({ theses }: ThesisTableProps) {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  if (theses.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-mono text-sm text-charcoal-light">
          No theses found.
        </p>
      </div>
    );
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection(field === "date" ? "desc" : "asc");
    }
  };

  const sortedTheses = [...theses].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "title":
        comparison = a.name.localeCompare(b.name);
        break;
      case "category":
        const catA = a.categories[0] || "";
        const catB = b.categories[0] || "";
        comparison = catA.localeCompare(catB);
        break;
      case "date":
        const dateA = new Date(a.publicationDate || a.lastEditedAt).getTime();
        const dateB = new Date(b.publicationDate || b.lastEditedAt).getTime();
        comparison = dateA - dateB;
        break;
    }

    return sortDirection === "asc" ? comparison : -comparison;
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

  const SortIcon = ({ field }: { field: SortField }) => {
    const isActive = sortField === field;
    return (
      <span className={`ml-1 inline-flex flex-col ${isActive ? "text-charcoal" : "text-charcoal/20"}`}>
        <svg
          className={`w-2 h-2 -mb-0.5 ${isActive && sortDirection === "asc" ? "text-charcoal" : ""}`}
          fill="currentColor"
          viewBox="0 0 10 5"
        >
          <path d="M5 0L10 5H0L5 0Z" />
        </svg>
        <svg
          className={`w-2 h-2 ${isActive && sortDirection === "desc" ? "text-charcoal" : ""}`}
          fill="currentColor"
          viewBox="0 0 10 5"
        >
          <path d="M5 5L0 0H10L5 5Z" />
        </svg>
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-charcoal/10">
            <th
              className="text-left font-mono text-[10px] uppercase tracking-wider text-charcoal/40 pb-3 pr-4 cursor-pointer hover:text-charcoal transition-colors select-none"
              onClick={() => handleSort("title")}
            >
              <span className="inline-flex items-center">
                Title
                <SortIcon field="title" />
              </span>
            </th>
            <th
              className="text-left font-mono text-[10px] uppercase tracking-wider text-charcoal/40 pb-3 pr-4 hidden md:table-cell cursor-pointer hover:text-charcoal transition-colors select-none"
              onClick={() => handleSort("category")}
            >
              <span className="inline-flex items-center">
                Categories
                <SortIcon field="category" />
              </span>
            </th>
            <th className="text-left font-mono text-[10px] uppercase tracking-wider text-charcoal/40 pb-3 pr-4 hidden lg:table-cell">
              One-liner
            </th>
            <th
              className="text-right font-mono text-[10px] uppercase tracking-wider text-charcoal/40 pb-3 cursor-pointer hover:text-charcoal transition-colors select-none"
              onClick={() => handleSort("date")}
            >
              <span className="inline-flex items-center justify-end">
                Date
                <SortIcon field="date" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTheses.map((thesis) => (
            <tr
              key={thesis.id}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
