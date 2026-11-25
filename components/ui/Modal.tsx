"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  label: string;
  onClose: () => void;
  className: string;
  children: ReactNode;
}

export function Modal({ label, onClose, className, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className={`m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-auto rounded-2xl border border-line bg-surface text-ink shadow-2xl backdrop:bg-ink/45 backdrop:backdrop-blur-xs ${className}`}
    >
      <div className="relative">
        <form method="dialog" className="absolute top-3 right-3 z-10">
          <button
            type="submit"
            aria-label="Đóng"
            className="grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-surface text-muted shadow-xs transition-colors hover:bg-accent-soft hover:text-accent"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </form>

        {children}
      </div>
    </dialog>
  );
}
