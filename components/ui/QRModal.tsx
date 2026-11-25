"use client";

import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, QrCode } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export type LinkCopyStatus = "idle" | "copied" | "error";

interface QRModalProps {
  url: string;
  title: string;
  onClose: () => void;
  copyStatus: LinkCopyStatus;
  onCopy: () => void;
}

export function QRModal({ url, title, onClose, copyStatus, onCopy }: QRModalProps) {
  return (
    <Modal label="Mã QR bài thuyết minh" onClose={onClose} className="max-w-sm">
      <div className="flex flex-col items-center px-5 py-6 text-center sm:px-7">
        <div className="mb-3 grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
          <QrCode aria-hidden="true" className="size-6" />
        </div>

        <h2 className="font-display text-2xl font-bold">Mã QR bài thuyết minh</h2>
        <p className="mt-2 text-xs leading-relaxed text-muted">{title}</p>

        <div className="my-4 rounded-xl border border-line bg-surface p-4 shadow-xs">
          <QRCodeSVG
            value={url}
            title="Mã QR dẫn đến bài thuyết minh này"
            size={180}
            level="H"
            className="block max-w-full"
          />
        </div>

        <p className="mb-4 text-sm text-muted">Quét mã để mở bài thuyết minh trên điện thoại.</p>

        {copyStatus === "error" && (
          <label className="mb-4 w-full text-left text-sm font-medium">
            Sao chép đường dẫn bên dưới
            <input
              value={url}
              readOnly
              onFocus={(event) => event.currentTarget.select()}
              className="mt-1 w-full rounded-lg border border-control bg-surface px-3 py-2 text-sm"
            />
          </label>
        )}

        <button
          type="button"
          onClick={onCopy}
          className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          {copyStatus === "copied" ? (
            <><Check aria-hidden="true" className="size-4" /> Đã sao chép liên kết</>
          ) : (
            <><Copy aria-hidden="true" className="size-4" /> Sao chép liên kết</>
          )}
        </button>
        <span className="sr-only" role="status">
          {copyStatus === "copied" && "Đã sao chép liên kết"}
        </span>
      </div>
    </Modal>
  );
}
