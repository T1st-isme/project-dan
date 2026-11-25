"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PanelGrid } from "@/components/panels/PanelGrid";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { PANELS_DATA } from "@/data/panels";
import { useSearch } from "@/hooks/useSearch";

export default function HomePage() {
  const { query, setQuery, filteredPanels } = useSearch(PANELS_DATA);

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="list" />

      <main id="noi-dung" tabIndex={-1} className="w-full flex-1 outline-none">
        <PanelGrid
          panels={filteredPanels}
          totalCount={PANELS_DATA.length}
          searchQuery={query}
          onSearchChange={setQuery}
        />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
