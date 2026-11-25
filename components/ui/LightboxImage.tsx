"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface LightboxImageProps {
  src: string;
  alt: string;
  thumbnail?: boolean;
  width?: number;
  height?: number;
}

export function LightboxImage({
  src,
  alt,
  thumbnail = false,
  width = 1280,
  height = 850,
}: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const previewLabel = "Phóng to ảnh – " + alt;
  const imageSizes = thumbnail
    ? "(min-width: 1280px) 390px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
    : "(min-width: 1024px) 912px, 100vw";

  return (
    <>
      <button
        type="button"
        aria-label={previewLabel}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        className={`group relative block w-full cursor-zoom-in overflow-hidden bg-surface-muted focus-visible:outline-offset-[-4px] ${
          thumbnail ? "aspect-[3/2] border-b border-line" : "rounded-xl border border-line"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill={thumbnail}
          width={thumbnail ? undefined : width}
          height={thumbnail ? undefined : height}
          sizes={imageSizes}
          className={`h-auto w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.025] ${
            thumbnail ? "object-cover" : "object-contain"
          }`}
        />
        <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full border border-line bg-surface text-accent shadow-sm transition-colors group-hover:bg-accent-soft">
          <ZoomIn aria-hidden="true" className="size-5" />
        </span>
      </button>

      {isOpen && (
        <Modal label={previewLabel} onClose={() => setIsOpen(false)} className="max-w-6xl">
          <figure>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(min-width: 1184px) 1152px, 100vw"
              loading="eager"
              className="max-h-[calc(100dvh-7rem)] w-full bg-surface-muted object-contain"
            />
            <figcaption className="border-t border-line px-4 py-3 text-center text-sm font-semibold leading-relaxed sm:px-8">
              {alt}
            </figcaption>
          </figure>
        </Modal>
      )}
    </>
  );
}
