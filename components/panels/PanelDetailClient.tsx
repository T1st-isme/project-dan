"use client";

import { ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { LightboxImage } from "@/components/ui/LightboxImage";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { PanelNavigation } from "@/components/panels/PanelNavigation";
import { Badge } from "@/components/ui/Badge";
import type { Panel } from "@/types";
import { useFontSize } from "@/hooks/useFontSize";

interface PanelDetailClientProps {
  panel: Panel;
  prev?: Panel;
  next?: Panel;
}

export function PanelDetailClient({ panel, prev, next }: PanelDetailClientProps) {
  const { fontSize, changeFontSize, getFontSizeClass } = useFontSize();

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        variant="detail"
        fontSize={fontSize}
        onFontSizeChange={changeFontSize}
        panelTitle={panel.title}
      />

      <main id="noi-dung" tabIndex={-1} className="mx-auto w-full max-w-5xl flex-1 px-4 pt-5 pb-10 outline-none sm:px-6 sm:pt-7">
        <PanelNavigation prev={prev} next={next} />

        <article className="my-5 overflow-hidden rounded-2xl border border-line bg-surface shadow-panel sm:my-6">
          <div aria-hidden="true" className="h-1.5 bg-accent" />
          <div aria-hidden="true" className="h-1 bg-gold" />
          <div className="p-4 sm:p-8 lg:p-10">
          <div className="mb-6 border-b border-line pb-5 sm:mb-7 sm:pb-6">
            <p className="mb-3 text-sm font-semibold text-accent">Công tác Đảng · Công tác chính trị</p>
            <Badge>{panel.id} · {panel.roomLabel}</Badge>
            <h1 className="mt-3 text-xl leading-snug font-bold text-balance text-ink sm:text-3xl sm:leading-snug">
              {panel.title}
            </h1>
          </div>

          {panel.audioSrc && (
            <AudioPlayer
              key={panel.audioSrc}
              audioSrc={panel.audioSrc}
              durationText={panel.audioDuration}
            />
          )}

          <section className="mt-7 sm:mt-9">
            <h2 className="mb-3 text-base font-bold sm:text-lg">Ảnh trưng bày</h2>
            <LightboxImage src={panel.imageSrc} alt={panel.title} />
          </section>

          <section className="mt-7 border-t border-line pt-6 sm:mt-9 sm:pt-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-accent sm:text-3xl">
              Nội dung bài thuyết minh
            </h2>
            {panel.segments ? (
              <div className={`text-ink ${getFontSizeClass()}`}>
                {panel.segments.map((segment, index) =>
                  segment.kind === "text" ? (
                    <p key={index} className="mb-5 max-w-[68ch] whitespace-pre-line">
                      {segment.text}
                    </p>
                  ) : segment.kind === "link" ? (
                    <a
                      key={segment.href}
                      href={segment.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="my-2 flex max-w-[68ch] items-center gap-3 rounded-xl border-2 border-accent bg-accent px-4 py-4 text-white shadow-panel transition-colors duration-200 hover:bg-accent-hover sm:px-5"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-white/90">{segment.label}</span>
                        <span className="mt-1 block break-all text-lg font-bold underline decoration-2 underline-offset-4 sm:text-xl">
                          {segment.href}
                        </span>
                      </span>
                      <ExternalLink aria-hidden="true" className="size-6 shrink-0" />
                    </a>
                  ) : (
                    <figure key={segment.src} className="my-6">
                      <LightboxImage
                        src={segment.src}
                        alt={segment.alt}
                        width={segment.width}
                        height={segment.height}
                      />
                      <figcaption className="mt-2 text-sm font-semibold leading-relaxed text-muted">
                        {segment.alt}
                      </figcaption>
                    </figure>
                  )
                )}
              </div>
            ) : (
              <div className={`max-w-[68ch] whitespace-pre-line text-ink ${getFontSizeClass()}`}>
                {panel.content}
              </div>
            )}
          </section>
          </div>
        </article>

        <PanelNavigation prev={prev} next={next} />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
