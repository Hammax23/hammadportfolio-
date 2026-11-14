"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { HireDrawer } from "@/components/HireDrawer";
import { site } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);

  const closeHire = useCallback(() => {
    setHireOpen(false);
  }, []);

  const openHire = useCallback(() => {
    setMenuOpen(false);
    setHireOpen(true);
  }, []);

  useEffect(() => {
    const shouldLock = menuOpen || hireOpen;
    document.body.style.overflow = shouldLock ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, hireOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-10 md:py-5">
          <BrandMark name={site.name} size="nav" nameHref="/" />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openHire}
              className="btn-primary hidden text-sm sm:inline-flex md:min-w-[7.5rem]"
            >
              Hire me
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span className="sr-only">Menu</span>
              <span className="flex w-4 flex-col gap-1.5" aria-hidden>
                <span
                  className={`h-px w-full bg-ink transition-transform ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
                />
                <span
                  className={`h-px w-full bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-px w-full bg-ink transition-transform ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-[3.75rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-paper/98 px-4 py-8 backdrop-blur-md sm:px-6 lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile">
              {site.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`border-b border-line py-4 text-lg ${
                      active ? "text-accent" : "text-ink"
                    }`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <button
                type="button"
                className="btn-primary mt-6 w-full text-sm"
                onClick={openHire}
              >
                Hire me
              </button>
            </nav>
          </div>
        ) : null}
      </header>

      <HireDrawer open={hireOpen} onClose={closeHire} />
    </>
  );
}
