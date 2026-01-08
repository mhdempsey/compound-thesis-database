"use client";

import { useState, useMemo } from "react";
import { Thesis, ThesisCategory, ViewMode } from "@/types/thesis";
import { FilterBar } from "./FilterBar";
import { ThesisGrid } from "./ThesisGrid";
import { ThesisTimeline } from "./ThesisTimeline";
import { searchTheses, filterByCategories } from "@/lib/notion-helpers";
import { Container } from "@/components/layout/Container";

interface ThesisListClientProps {
  initialTheses: Thesis[];
}

export function ThesisListClient({ initialTheses }: ThesisListClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<ThesisCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredTheses = useMemo(() => {
    let result = initialTheses;

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = filterByCategories(result, selectedCategories);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      result = searchTheses(result, searchQuery);
    }

    return result;
  }, [initialTheses, selectedCategories, searchQuery]);

  return (
    <div className="pb-16">
      <FilterBar
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <Container className="mt-8">
        {filteredTheses.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-charcoal-light text-lg">
              No theses found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategories([]);
                setSearchQuery("");
              }}
              className="mt-4 text-charcoal underline underline-offset-2 hover:text-charcoal-light transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <ThesisGrid theses={filteredTheses} />
        ) : (
          <ThesisTimeline theses={filteredTheses} />
        )}
      </Container>
    </div>
  );
}
