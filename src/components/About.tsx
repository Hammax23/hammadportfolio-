import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

type Props = {
  isPage?: boolean;
};

export function About({ isPage = false }: Props) {
  return (
    <section
      id="about"
      className="bg-paper px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-4">
          <p className="text-xs tracking-[0.16em] text-accent uppercase sm:text-sm">
            About
          </p>
          <SectionHeading
            isPage={isPage}
            className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl md:text-4xl"
          >
            6+ years building products clients can trust.
          </SectionHeading>
        </Reveal>
        <div className="space-y-5 sm:space-y-6 md:col-span-7 md:col-start-6">
          {site.about.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 24)} delayMs={i * 100}>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
          <Reveal delayMs={220}>
            <p className="pt-1 text-sm tracking-wide text-ink sm:pt-2">
              {site.location} · 6+ years experience · Remote-friendly
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
