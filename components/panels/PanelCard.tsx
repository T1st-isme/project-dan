import Link from "next/link";
import { ArrowRight, BookOpen, Headphones } from "lucide-react";
import type { Panel } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { LightboxImage } from "@/components/ui/LightboxImage";

interface PanelCardProps {
  panel: Panel;
}

export function PanelCard({ panel }: PanelCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-panel transition-colors duration-200 hover:border-accent">
      <LightboxImage src={panel.imageSrc} alt={panel.title} thumbnail />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge>{panel.id}</Badge>
          {panel.badge && (
            <Badge variant="audio">
              <Headphones aria-hidden="true" className="size-3.5" />
              {panel.badge}
            </Badge>
          )}
        </div>

        <h2 className="line-clamp-2 text-base font-bold leading-snug text-ink lg:text-lg">
          {panel.title}
        </h2>
        <p className="mt-2 mb-5 line-clamp-3 text-base leading-relaxed text-muted">
          {panel.description}
        </p>

        <Link
          href={`/panel/${panel.slug}`}
          aria-label={`Đọc và nghe thuyết minh – ${panel.shortTitle}`}
          className="group mt-auto flex min-h-11 w-full cursor-pointer items-center gap-2.5 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          <BookOpen aria-hidden="true" className="size-4 shrink-0" />
          <span className="flex-1">Đọc và nghe thuyết minh</span>
          <ArrowRight aria-hidden="true" className="size-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
