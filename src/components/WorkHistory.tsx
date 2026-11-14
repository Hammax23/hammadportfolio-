import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

type Props = {
  isPage?: boolean;
};

export function WorkHistory({ isPage = false }: Props) {
  return (
    <section
      id="history"
      className="bg-paper px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.16em] text-accent uppercase sm:text-sm">
              Work history
            </p>
            <SectionHeading
              isPage={isPage}
              className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl md:text-4xl"
            >
              Roles that shaped how I ship.
            </SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              6+ years across product teams, from research labs to production
              engineering for growing companies.
            </p>
          </div>
        </Reveal>

        <ol className="mt-10 border-t border-line sm:mt-14 md:mt-16">
          {site.workHistory.map((job, i) => (
            <Reveal key={`${job.company}-${job.start}`} delayMs={i * 80}>
              <li className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-7">
                <div className="sm:col-span-7">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted sm:text-base">
                    {job.company}
                    {job.current ? (
                      <span className="ml-2 inline-flex align-middle text-[10px] tracking-[0.14em] text-accent uppercase">
                        Current
                      </span>
                    ) : null}
                  </p>
                  {job.summary ? (
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                      {job.summary}
                    </p>
                  ) : null}
                </div>
                <p className="text-sm tracking-wide text-ink/70 sm:col-span-5 sm:text-right">
                  {job.start} – {job.end}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
