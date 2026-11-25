import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "gold" | "red" | "teal" | "audio";
  className?: string;
}

const variantStyles = {
  red: "border-accent-line bg-accent-soft text-accent",
  gold: "border-gold/50 bg-gold/15 text-gold-deep",
  teal: "border-teal-200 bg-teal-50 text-teal-800",
  audio: "border-line bg-surface-muted text-muted",
};

export function Badge({ children, variant = "red", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
