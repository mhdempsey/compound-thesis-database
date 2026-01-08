"use client";

import { ThesisCategory, ViewMode, allCategories } from "@/types/thesis";
import { SearchInput } from "./SearchInput";
import { ViewToggle } from "./ViewToggle";
import { Container } from "@/components/layout/Container";

interface FilterBarProps {
  selectedCategories: ThesisCategory[];
  onCategoryChange: (categories: ThesisCategory[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function FilterBar({
  selectedCategories,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: FilterBarProps) {
  const toggleCategory = (category: ThesisCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="sticky top-16 z-40 bg-cream/90 backdrop-blur-sm py-4 border-b border-charcoal/10">
      <Container>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange([])}
              className={`px-4 py-2 text-sm rounded-full border transition-all ${
                selectedCategories.length === 0
                  ? "bg-charcoal text-white border-charcoal"
                  : "bg-white text-charcoal-light border-charcoal/20 hover:border-charcoal/40"
              }`}
            >
              All
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 text-sm rounded-full border transition-all ${
                  selectedCategories.includes(category)
                    ? "bg-charcoal text-white border-charcoal"
                    : "bg-white text-charcoal-light border-charcoal/20 hover:border-charcoal/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search and view toggle */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
            <ViewToggle mode={viewMode} onChange={onViewModeChange} />
          </div>
        </div>
      </Container>
    </div>
  );
}
