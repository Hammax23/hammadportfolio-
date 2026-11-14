import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { ProjectCarousel } from "@/components/ProjectCarousel";

export function Work() {
  return (
    <section
      id="work"
      className="bg-paper px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div>
            <p className="text-xs tracking-[0.16em] text-accent uppercase sm:text-sm">
              Portfolio
            </p>
            <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl md:text-4xl">
              Projects from my Upwork portfolio.
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-14 md:mt-16">
          <Reveal>
            <ProjectCarousel projects={site.projects} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
