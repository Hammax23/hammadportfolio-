"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-10 md:py-6">
        <BrandMark name={site.name} size="nav" nameHref="#top" />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="btn-primary hidden text-sm sm:inline-flex md:min-w-[7.5rem]"
          >
            Hire me
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-4 flex-col gap-1.5" aria-hidden>
              <span
                className={`h-px w-full bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-full bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-[3.75rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-paper/98 px-4 py-8 backdrop-blur-md sm:px-6 md:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-line py-4 text-lg text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary mt-6 w-full text-sm"
              onClick={() => setOpen(false)}
            >
              Hire me
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
