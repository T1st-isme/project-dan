import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Panel } from "@/types";

interface PanelNavigationProps {
  prev?: Panel;
  next?: Panel;
}

export function PanelNavigation({ prev, next }: PanelNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Điều hướng mảng ảnh" className="grid gap-2.5 sm:grid-cols-2 sm:gap-4">
      {prev && (
        <Link
          href={`/panel/${prev.slug}`}
          className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2.5 text-accent transition-colors duration-200 hover:border-accent hover:bg-accent-soft sm:col-start-1 sm:px-4"
        >
          <ChevronLeft aria-hidden="true" className="size-5 shrink-0" />
          <span className="min-w-0">
            <span className="block text-xs font-semibold">Mảng ảnh trước</span>
            <span className="mt-0.5 block truncate text-xs text-muted sm:text-sm" title={prev.shortTitle}>
              {prev.shortTitle}
            </span>
          </span>
        </Link>
      )}

      {next && (
        <Link
          href={`/panel/${next.slug}`}
          className="flex min-h-11 min-w-0 items-center justify-end gap-2.5 rounded-xl border border-accent-line bg-accent-soft px-3 py-2.5 text-right text-accent transition-colors duration-200 hover:border-accent hover:bg-surface sm:col-start-2 sm:px-4"
        >
          <span className="min-w-0">
            <span className="block text-xs font-semibold">Mảng ảnh tiếp theo</span>
            <span className="mt-0.5 block truncate text-xs text-muted sm:text-sm" title={next.shortTitle}>
              {next.shortTitle}
            </span>
          </span>
          <ChevronRight aria-hidden="true" className="size-5 shrink-0" />
        </Link>
      )}
    </nav>
  );
}
