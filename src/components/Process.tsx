import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function Process() {
  return (
    <section
      id="process"
      className="bg-mist/60 px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs tracking-[0.16em] text-accent uppercase sm:text-sm">
            Process
          </p>
          <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl md:text-4xl">
            From idea to launch-ready app.
          </h2>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 sm:gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {site.process.map((item, i) => (
            <Reveal key={item.step} delayMs={i * 90}>
              <li className="border-t border-line pt-6 md:border-t-0 md:pt-0">
                <p className="font-display text-sm tracking-[0.14em] text-accent">
                  {item.step}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink sm:mt-4 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
                  {item.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
