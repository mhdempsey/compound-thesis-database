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
    <div className="relative flex-1 lg:flex-none lg:w-56">
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full px-3 py-1.5 pl-8 font-mono text-xs border border-charcoal/15 rounded-full bg-transparent placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal/30 focus:bg-white/50 transition-all"
      />
      <svg
        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal/30"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
