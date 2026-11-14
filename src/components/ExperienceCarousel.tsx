"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/data/site";

type Experience = (typeof site.otherExperiences)[number];

type Props = {
  items: readonly Experience[];
};

function usePerView() {
  const [perView, setPerView] = useState(4);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) setPerView(1);
      else if (width < 1024) setPerView(2);
      else setPerView(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perView;
}

export function ExperienceCarousel({ items }: Props) {
  const perView = usePerView();
  const [page, setPage] = useState(0);
  const maxPage = Math.max(0, Math.ceil(items.length / perView) - 1);

  useEffect(() => {
    setPage((current) => Math.min(current, maxPage));
  }, [maxPage]);

  const visible = useMemo(() => {
    const start = page * perView;
    return items.slice(start, start + perView);
  }, [items, page, perView]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {String(page * perView + 1).padStart(2, "0")}–
          {String(Math.min((page + 1) * perView, items.length)).padStart(2, "0")}{" "}
          of {String(items.length).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Previous experiences"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
            disabled={page >= maxPage}
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Next experiences"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {visible.map((item) => (
          <article
            key={item.index}
            className="flex h-full flex-col border-t border-line pt-5"
          >
            <p className="font-display text-xs tracking-[0.14em] text-accent">
              {item.index}
            </p>
            <h3 className="mt-3 font-display text-lg leading-snug font-semibold tracking-tight text-ink">
              {item.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {item.summary}
            </p>
            {item.result ? (
              <p className="mt-4 text-sm font-medium text-ink">{item.result}</p>
            ) : null}
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
              {item.stack.map((tech) => (
                <li key={tech} className="text-xs text-ink/70">
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {maxPage > 0 ? (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              className={`h-1.5 transition-all ${
                i === page ? "w-8 bg-accent" : "w-4 bg-line hover:bg-muted/40"
              }`}
              aria-label={`Go to experience page ${i + 1}`}
              aria-current={i === page}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
