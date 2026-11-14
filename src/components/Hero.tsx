import { ParticleField } from "@/components/ParticleField";
import { ParticlePortrait } from "@/components/ParticlePortrait";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section
      id="top"
      className="hero-canvas relative min-h-[100svh] overflow-hidden"
    >
      <div className="hero-grid absolute inset-0 z-0" aria-hidden />
      <ParticleField />
      <div className="noise z-[2]" aria-hidden />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 content-center items-center gap-8 px-4 pb-12 pt-24 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-28 md:grid-cols-12 md:gap-10 md:px-10 md:pb-20 md:pt-24">
        <div className="order-1 md:col-span-7">
          <p className="animate-rise font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl">
            {site.name}
          </p>
          <h1 className="animate-rise-delay-1 mt-4 max-w-xl text-lg leading-snug font-medium text-ink sm:mt-5 sm:text-xl md:text-2xl">
            {site.headline}
          </h1>
          <p className="animate-rise-delay-2 mt-4 max-w-md text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg">
            {site.support}
          </p>
          <div className="animate-rise-delay-3 mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap">
            <a href="#work" className="btn-primary w-full sm:w-auto">
              See selected work
            </a>
          </div>
        </div>

        <div className="relative order-2 mx-auto flex w-full max-w-md justify-center sm:max-w-lg md:col-span-5 md:mx-0 md:block md:max-w-none md:-mt-10 lg:-mt-14">
          <div className="relative mx-auto aspect-[3/4] w-full min-h-[22rem] sm:min-h-[26rem] md:min-h-[32rem] lg:min-h-[36rem]">
            <ParticlePortrait
              src="/images/hammad-portrait.png"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>

      <div className="animate-line absolute inset-x-0 bottom-0 h-px bg-line" />
    </section>
  );
}
