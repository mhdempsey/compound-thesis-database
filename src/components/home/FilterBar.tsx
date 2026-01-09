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

// Category colors for active state
const categoryColors: Record<ThesisCategory, { active: string; hover: string; dot: string }> = {
  Healthcare: {
    active: "bg-emerald-500 text-white border-emerald-500",
    hover: "hover:border-emerald-300 hover:text-emerald-700",
    dot: "bg-emerald-500"
  },
  "AI/ML": {
    active: "bg-blue-500 text-white border-blue-500",
    hover: "hover:border-blue-300 hover:text-blue-700",
    dot: "bg-blue-500"
  },
  Bio: {
    active: "bg-violet-500 text-white border-violet-500",
    hover: "hover:border-violet-300 hover:text-violet-700",
    dot: "bg-violet-500"
  },
  Robotics: {
    active: "bg-orange-500 text-white border-orange-500",
    hover: "hover:border-orange-300 hover:text-orange-700",
    dot: "bg-orange-500"
  },
  Crypto: {
    active: "bg-amber-500 text-white border-amber-500",
    hover: "hover:border-amber-300 hover:text-amber-700",
    dot: "bg-amber-500"
  },
  Other: {
    active: "bg-slate-500 text-white border-slate-500",
    hover: "hover:border-slate-300 hover:text-slate-700",
    dot: "bg-slate-500"
  },
};

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
    <div className="sticky top-14 z-40 bg-cream/95 backdrop-blur-sm py-4 border-b border-charcoal/5">
      <Container>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange([])}
              className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-full border transition-all duration-200 flex items-center gap-1.5 ${
                selectedCategories.length === 0
                  ? "bg-charcoal text-cream border-charcoal"
                  : "bg-transparent text-charcoal/60 border-charcoal/15 hover:border-charcoal/30 hover:text-charcoal"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedCategories.length === 0 ? 'bg-cream' : 'bg-charcoal/40'}`} />
              All
            </button>
            {allCategories.map((category) => {
              const colors = categoryColors[category];
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-full border transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? colors.active
                      : `bg-transparent text-charcoal/60 border-charcoal/15 ${colors.hover}`
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : colors.dot}`} />
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search and view toggle */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
            <ViewToggle mode={viewMode} onChange={onViewModeChange} />
          </div>
        </div>
      </Container>
    </div>
  );
}
