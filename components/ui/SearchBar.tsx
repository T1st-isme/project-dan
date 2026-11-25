"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Tìm theo tên mảng ảnh, chủ đề",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" role="search">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-accent"
      />
      <input
        ref={inputRef}
        type="search"
        aria-label="Tìm mảng ảnh"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-xl border border-control bg-surface py-2.5 pr-14 pl-10 text-base text-ink shadow-xs placeholder:text-muted focus:border-accent [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute top-1/2 right-1 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
          aria-label="Xóa từ khóa tìm kiếm"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      )}
    </div>
  );
}
