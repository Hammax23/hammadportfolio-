import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { DataFlowDiagram } from "@/components/DataFlowDiagram";
import { SectionHeading } from "@/components/SectionHeading";

type Props = {
  isPage?: boolean;
};

export function Expertise({ isPage = false }: Props) {
  return (
    <section
      id="expertise"
      className="relative overflow-hidden bg-ink px-4 py-16 text-paper sm:px-6 sm:py-20 md:px-10 md:py-32"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-6">
            <p className="text-xs tracking-[0.16em] text-accent uppercase sm:text-sm">
              Expertise
            </p>
            <SectionHeading
              isPage={isPage}
              className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"
            >
              A stack chosen for production software, not demos.
            </SectionHeading>
          </Reveal>

          <Reveal className="lg:col-span-6" delayMs={120}>
            <div className="relative ml-auto w-full max-w-lg overflow-hidden border border-white/10 bg-white/[0.02] px-2 py-2 sm:px-3 sm:py-2.5">
              <DataFlowDiagram className="h-auto w-full opacity-95" />
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-white/10 pt-10 sm:mt-14 sm:grid-cols-2 sm:gap-12 sm:pt-12 md:mt-16 md:grid-cols-3 md:gap-10 xl:grid-cols-5">
          {site.expertise.map((group, i) => (
            <Reveal key={group.title} delayMs={i * 100}>
              <div>
                <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3 sm:mt-6">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-white/10 pb-3 text-sm text-paper/75 sm:text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
