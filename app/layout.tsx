import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-be-vietnam",
});

const lora = Lora({
  weight: "700",
  subsets: ["vietnamese", "latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Thuyết Minh & Nội Dung Mảng Ảnh - Phòng Hồ Chí Minh",
  description: "Website trình chiếu danh sách & bài thuyết minh mảng ảnh Phòng Hồ Chí Minh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full bg-canvas font-sans text-base text-ink">
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-lg focus:bg-accent focus:px-4 focus:text-sm focus:font-semibold focus:text-white"
        >
          Bỏ qua tới nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
