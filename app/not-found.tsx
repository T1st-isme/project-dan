import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main id="noi-dung" tabIndex={-1} className="grid flex-1 place-items-center px-4 py-12 outline-none">
        <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface text-center shadow-panel">
          <div aria-hidden="true" className="h-1.5 bg-accent" />
          <div aria-hidden="true" className="h-1 bg-gold" />
          <div className="px-6 py-9">
          <p className="text-sm font-semibold text-accent">Công tác Đảng · Công tác chính trị</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-balance">Không tìm thấy trang</h1>
          <p className="mx-auto mt-2 max-w-sm text-base leading-relaxed text-muted">
            Trang này không có trong danh sách mảng ảnh của Phòng Hồ Chí Minh.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Về danh sách mảng ảnh
          </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
