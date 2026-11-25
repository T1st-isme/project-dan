"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group fixed right-4 bottom-4 z-30 grid size-11 cursor-pointer place-items-center rounded-full border border-accent-line bg-surface text-accent shadow-panel transition-colors duration-200 hover:border-accent hover:bg-accent-soft sm:right-6 sm:bottom-6"
      aria-label="Cuộn lên đầu trang"
      title="Cuộn lên đầu trang"
    >
      <ArrowUp aria-hidden="true" className="size-5 motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5" />
    </button>
  );
}
