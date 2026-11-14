import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { ExperienceCarousel } from "@/components/ExperienceCarousel";

export function Experience() {
  return (
    <section
      id="experience"
      className="bg-mist/50 px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.16em] text-accent uppercase sm:text-sm">
              Other experience
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl md:text-4xl">
              Additional delivery across SaaS, dashboards, and automation.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Selected engagements beyond the portfolio gallery — production
              systems built for real business workflows.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-14 md:mt-16">
          <Reveal>
            <ExperienceCarousel items={site.otherExperiences} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
