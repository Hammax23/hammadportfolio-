"use client";

import { useState } from "react";
import { ImageLightbox } from "@/components/ImageLightbox";

type Props = {
  name: string;
  photoSrc?: string;
  size?: "nav" | "hero";
  nameHref?: string;
};

function VerifiedTick({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      focusable="false"
    >
      <circle cx="12" cy="12" r="12" fill="#1D9BF0" />
      <path
        d="M10.1 15.8 6.8 12.5l1.4-1.4 1.9 1.9 5-5.1 1.4 1.4-6.4 6.5Z"
        fill="#fff"
      />
    </svg>
  );
}

export function BrandMark({
  name,
  photoSrc = "/images/hammad-portrait.png",
  size = "nav",
  nameHref,
}: Props) {
  const [open, setOpen] = useState(false);
  const isHero = size === "hero";

  const nameClass = isHero
    ? "font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl"
    : "font-display text-base font-semibold tracking-tight text-ink sm:text-lg";

  const avatarSize = isHero
    ? "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16"
    : "h-9 w-9 sm:h-10 sm:w-10";

  return (
    <>
      <div
        className={`flex items-center ${isHero ? "gap-3 sm:gap-4" : "gap-2.5"}`}
      >
        <div className={`relative shrink-0 ${avatarSize}`}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative h-full w-full overflow-hidden rounded-full border border-line bg-mist transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Open profile photo"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              alt={`${name} profile photo`}
              width={96}
              height={96}
              decoding="async"
              className="h-full w-full object-cover object-[center_18%]"
            />
          </button>

          {/* Online status, WhatsApp-style */}
          <span
            className="absolute right-0 bottom-0 z-[1] flex h-2.5 w-2.5 items-center justify-center sm:h-3 sm:w-3"
            title="Online"
            aria-label="Online"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full border-[1.5px] border-paper bg-[#25D366] sm:h-2.5 sm:w-2.5" />
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-1 sm:gap-1.5">
          {nameHref ? (
            <a href={nameHref} className={nameClass}>
              {name}
            </a>
          ) : isHero ? (
            <p className={nameClass}>{name}</p>
          ) : (
            <span className={nameClass}>{name}</span>
          )}

          <span title="Verified" aria-label="Verified">
            <VerifiedTick className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]" />
          </span>
        </div>
      </div>

      <ImageLightbox
        src={photoSrc}
        alt={`${name} profile photo`}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
