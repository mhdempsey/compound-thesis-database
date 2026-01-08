"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  const debouncedOnChange = useDebouncedCallback((newValue: string) => {
    onChange(newValue);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <div className="relative flex-1 lg:flex-none lg:w-64">
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="Search theses..."
        className="w-full px-4 py-2 pl-10 text-sm border border-charcoal/20 rounded-full bg-white focus:outline-none focus:border-charcoal/40 focus:ring-1 focus:ring-charcoal/20 transition-all"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-light"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
