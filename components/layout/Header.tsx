"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ChevronLeft, QrCode, Share2 } from "lucide-react";
import { FontSizeControl } from "@/components/ui/FontSizeControl";
import { QRModal, type LinkCopyStatus } from "@/components/ui/QRModal";
import type { FontSizeLevel } from "@/hooks/useFontSize";

interface HeaderProps {
  variant?: "list" | "detail";
  fontSize?: FontSizeLevel;
  onFontSizeChange?: (size: FontSizeLevel) => void;
  panelTitle?: string;
}

export function Header({
  variant = "list",
  fontSize = "md",
  onFontSizeChange,
  panelTitle = "",
}: HeaderProps) {
  const [qrUrl, setQrUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState<LinkCopyStatus>("idle");
  const copied = copyStatus === "copied";

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopyStatus("idle"), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const openQR = () => {
    setCopyStatus("idle");
    setQrUrl(window.location.href);
  };

  const copyLink = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
      setQrUrl(url);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-surface/95 shadow-panel backdrop-blur-sm">
        <div aria-hidden="true" className="h-1.5 bg-accent" />
        <div aria-hidden="true" className="h-1 bg-gold" />
        <div className="mx-auto grid min-h-16 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 px-3 py-2 sm:min-h-20 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Trang chủ" className="justify-self-start rounded-full">
            <Image
              src="/images/logo-emblem.png"
              alt=""
              width={48}
              height={48}
              sizes="(min-width: 640px) 48px, 40px"
              className="size-10 object-contain sm:size-12"
            />
          </Link>

          <div className="text-center">
            <Link
              href="/"
              className="rounded-sm font-display text-base font-bold leading-tight tracking-tight text-ink transition-colors duration-200 hover:text-accent min-[375px]:text-xl sm:text-3xl"
            >
              Phòng Hồ Chí Minh
            </Link>
            <p className="mt-0.5 text-xs font-semibold leading-snug text-balance text-accent">
              Công tác Đảng · Công tác chính trị
            </p>
          </div>

          <div className="justify-self-end text-right sm:border-l sm:border-line sm:pl-4">
            <p className="text-xs font-bold whitespace-nowrap text-ink">Lữ đoàn 71</p>
            <p className="mt-0.5 text-xs font-medium whitespace-nowrap text-muted">Tiểu đoàn 16</p>
          </div>
        </div>

        {variant === "detail" && (
          <div className="border-t border-line bg-surface-muted">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-1.5 sm:px-6">
              <Link
                href="/"
                aria-label="Quay lại danh sách mảng ảnh"
                className="inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-sm font-semibold text-accent transition-colors duration-200 hover:bg-accent-soft sm:gap-1.5"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
                <span className="hidden min-[360px]:inline">Danh sách</span>
              </Link>

              <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
                {onFontSizeChange && (
                  <FontSizeControl currentSize={fontSize} onSizeChange={onFontSizeChange} />
                )}

                <button
                  type="button"
                  onClick={openQR}
                  className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-control bg-surface px-3 text-sm font-semibold text-accent transition-colors duration-200 hover:border-accent hover:bg-accent-soft"
                  aria-label="Mã QR bài thuyết minh"
                  aria-haspopup="dialog"
                >
                  <QrCode aria-hidden="true" className="size-4" />
                  Mã QR
                </button>

                <button
                  type="button"
                  onClick={copyLink}
                  className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-lg border border-control bg-surface text-accent transition-colors duration-200 hover:border-accent hover:bg-accent-soft"
                  aria-label={copied ? "Đã sao chép liên kết" : "Sao chép liên kết"}
                  title={copied ? "Đã sao chép liên kết" : "Sao chép liên kết"}
                >
                  {copied ? (
                    <Check aria-hidden="true" className="size-4" />
                  ) : (
                    <Share2 aria-hidden="true" className="size-4" />
                  )}
                </button>
                <span className="sr-only" role="status">{copied && "Đã sao chép liên kết"}</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {qrUrl && (
        <QRModal
          url={qrUrl}
          title={panelTitle}
          onClose={() => setQrUrl("")}
          copyStatus={copyStatus}
          onCopy={copyLink}
        />
      )}
    </>
  );
}
