"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/data/site";

type Project = (typeof site.projects)[number];

type Props = {
  projects: readonly Project[];
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

export function ProjectCarousel({ projects }: Props) {
  const perView = usePerView();
  const [page, setPage] = useState(0);

  const maxPage = Math.max(0, Math.ceil(projects.length / perView) - 1);

  useEffect(() => {
    setPage((current) => Math.min(current, maxPage));
  }, [maxPage]);

  const visible = useMemo(() => {
    const start = page * perView;
    return projects.slice(start, start + perView);
  }, [page, perView, projects]);

  const goPrev = () => setPage((current) => Math.max(0, current - 1));
  const goNext = () => setPage((current) => Math.min(maxPage, current + 1));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {String(page * perView + 1).padStart(2, "0")}–
          {String(Math.min((page + 1) * perView, projects.length)).padStart(2, "0")}{" "}
          of {String(projects.length).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={page === 0}
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Previous projects"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={page >= maxPage}
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Next projects"
          >
            →
          </button>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-6`}
      >
        {visible.map((project) => (
          <article key={project.index} className="h-full">
            <div className="relative aspect-[5/4] overflow-hidden border border-line bg-mist">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} project preview by Hammad Iftikhar`}
                width={640}
                height={512}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pt-4">
              <p className="font-display text-xs tracking-wide text-muted">
                {project.index}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.summary}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                {project.stack.map((tech) => (
                  <li key={tech} className="text-xs text-ink/75">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
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
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
