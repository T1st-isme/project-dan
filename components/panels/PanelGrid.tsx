import type { Panel } from "@/types";
import { PanelCard } from "@/components/panels/PanelCard";
import { SearchBar } from "@/components/ui/SearchBar";

interface PanelGridProps {
  panels: Panel[];
  totalCount?: number;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export function PanelGrid({
  panels,
  totalCount = panels.length,
  searchQuery = "",
  onSearchChange,
}: PanelGridProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 lg:px-8">
      <div className="mb-6 overflow-hidden rounded-2xl border border-line bg-surface shadow-panel">
        <div aria-hidden="true" className="h-1.5 bg-accent" />
        <div aria-hidden="true" className="h-1 bg-gold" />
        <div className="flex flex-col gap-5 p-5 sm:p-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-accent">Phòng Hồ Chí Minh</p>
            <h1 className="mt-1 font-display text-3xl leading-tight font-bold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">
              Mảng ảnh và thuyết minh
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
              Tài liệu nghe và đọc phục vụ sinh hoạt chính trị, giáo dục truyền thống trong công tác Đảng, công tác chính trị của đơn vị.
            </p>
            <p className="mt-3 text-sm font-medium text-ink" role="status">
              {searchQuery.trim() ? (
                <>Tìm thấy {panels.length} trên {totalCount} mảng ảnh</>
              ) : (
                <>{totalCount} mảng ảnh</>
              )}
            </p>
          </div>

          {onSearchChange && (
            <div className="w-full md:w-72 md:shrink-0 lg:w-80">
              <SearchBar value={searchQuery} onChange={onSearchChange} />
            </div>
          )}
        </div>
      </div>

      {panels.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {panels.map((panel) => (
            <PanelCard key={panel.id} panel={panel} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-control bg-surface px-5 py-12 text-center">
          <h2 className="text-lg font-bold">Không tìm thấy mảng ảnh</h2>
          <p className="mx-auto mt-2 max-w-md text-base leading-relaxed wrap-anywhere text-muted">
            Hãy thử một từ khóa khác thay cho &ldquo;{searchQuery}&rdquo;.
          </p>
          {onSearchChange && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="mt-5 min-h-11 cursor-pointer rounded-lg bg-accent px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      )}
    </section>
  );
}
