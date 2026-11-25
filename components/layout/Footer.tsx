import React from "react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div aria-hidden="true" className="h-1 bg-accent" />
      <div aria-hidden="true" className="h-0.5 bg-gold" />
      <div className="px-4 py-6 text-center">
        <p className="text-sm font-semibold text-accent">Công tác Đảng · Công tác chính trị</p>
        <p className="mt-1 text-sm leading-relaxed text-ink">
          Phòng Hồ Chí Minh · Tiểu đoàn 16 · Lữ đoàn 71
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          © Đại úy Lê Đình Dần · Chính trị viên, CPPK3
        </p>
      </div>
    </footer>
  );
}
