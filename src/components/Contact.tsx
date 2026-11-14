import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppFab";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink px-4 py-16 text-paper sm:px-6 sm:py-24 md:px-10 md:py-36"
    >
      <div className="noise opacity-[0.05]" aria-hidden />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="text-xs tracking-[0.16em] text-accent uppercase sm:text-sm">
            Contact
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:mt-4 sm:text-4xl md:text-5xl">
            Let’s build something that lasts.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-paper/70 sm:mt-6 sm:text-lg">
            Available for full-stack product work — SaaS, dashboards, APIs, and
            launch-critical builds.
          </p>
        </Reveal>
        <Reveal delayMs={120}>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#25D366]/50 bg-[#25D366]/10 px-6 text-sm font-medium text-paper transition-colors hover:border-[#25D366] hover:bg-[#25D366]/20"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
              WhatsApp
            </a>
            <a
              href="#work"
              className="inline-flex min-h-12 items-center justify-center border border-white/20 px-6 text-sm font-medium text-paper transition-colors hover:border-white/50"
            >
              Review my work
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
