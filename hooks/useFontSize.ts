"use client";

import { useSyncExternalStore } from "react";

export type FontSizeLevel = "sm" | "md" | "lg";

const STORAGE_KEY = "app_font_size";
const FONT_SIZE_EVENT = "app-font-size-change";
const fontSizeClasses: Record<FontSizeLevel, string> = {
  sm: "text-sm leading-relaxed",
  md: "text-base leading-relaxed",
  lg: "text-xl leading-loose",
};

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(FONT_SIZE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(FONT_SIZE_EVENT, onChange);
  };
}

function getStoredFontSize(): FontSizeLevel {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "sm" || saved === "lg" ? saved : "md";
}

function getDefaultFontSize(): FontSizeLevel {
  return "md";
}

export function useFontSize() {
  const fontSize = useSyncExternalStore(subscribe, getStoredFontSize, getDefaultFontSize);

  const changeFontSize = (level: FontSizeLevel) => {
    window.localStorage.setItem(STORAGE_KEY, level);
    window.dispatchEvent(new Event(FONT_SIZE_EVENT));
  };

  return {
    fontSize,
    changeFontSize,
    getFontSizeClass: () => fontSizeClasses[fontSize],
  };
}
