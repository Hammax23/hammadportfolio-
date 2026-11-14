"use client";

import { useEffect } from "react";

type Props = {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
};

export function ImageLightbox({ src, alt, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Profile photo"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-[101] inline-flex h-11 w-11 items-center justify-center border border-white/25 bg-ink/40 text-paper transition-colors hover:bg-ink/70 sm:top-6 sm:right-6"
        aria-label="Close image"
      >
        <span className="relative block h-4 w-4" aria-hidden>
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 rotate-45 bg-paper" />
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 -rotate-45 bg-paper" />
        </span>
      </button>

      <div
        className="relative max-h-[85svh] max-w-[min(92vw,34rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-[85svh] w-full object-contain"
        />
      </div>
    </div>
  );
}
