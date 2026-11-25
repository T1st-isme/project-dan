"use client";

import type { FontSizeLevel } from "@/hooks/useFontSize";

interface FontSizeControlProps {
  currentSize: FontSizeLevel;
  onSizeChange: (size: FontSizeLevel) => void;
}

const sizes = [
  { value: "sm", label: "A−", description: "Chữ nhỏ" },
  { value: "md", label: "A", description: "Chữ vừa" },
  { value: "lg", label: "A+", description: "Chữ lớn" },
] as const;

export function FontSizeControl({ currentSize, onSizeChange }: FontSizeControlProps) {
  return (
    <div
      role="group"
      aria-label="Cỡ chữ bài thuyết minh"
      className="inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-control bg-surface p-0.5"
    >
      {sizes.map(({ value, label, description }) => (
        <button
          key={value}
          type="button"
          onClick={() => onSizeChange(value)}
          aria-label={description}
          aria-pressed={currentSize === value}
          title={description}
          className="grid min-h-11 min-w-11 cursor-pointer place-items-center rounded-md px-1 text-sm font-semibold text-muted transition-colors duration-200 hover:bg-surface-muted hover:text-accent aria-pressed:bg-accent-soft aria-pressed:text-accent"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
