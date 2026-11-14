import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function HomeFeaturedWork() {
  const featured = site.projects.slice(0, 4);

  return (
    <section className="bg-paper px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs tracking-[0.16em] text-accent uppercase sm:text-sm">
                Portfolio
              </p>
              <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl md:text-4xl">
                Featured products from recent work.
              </h2>
            </div>
            <Link
              href="/work"
              className="text-sm font-medium text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              View all projects
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {featured.map((project, i) => (
            <Reveal key={project.index} delayMs={i * 80}>
              <article>
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
                <p className="mt-4 font-display text-xs tracking-wide text-muted">
                  {project.index}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {project.summary}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeHistoryPreview() {
  const current = site.workHistory[0];

  return (
    <section className="border-y border-line bg-mist/40 px-4 py-14 sm:px-6 sm:py-16 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.16em] text-accent uppercase sm:text-sm">
              Currently
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {current.role} at {current.company}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {current.summary}
            </p>
          </div>
        </Reveal>
        <Reveal delayMs={100}>
          <Link href="/history" className="btn-secondary w-full sm:w-auto text-sm">
            Full work history
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeAboutTeaser() {
  return (
    <section className="bg-paper px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-4">
          <p className="text-xs tracking-[0.16em] text-accent uppercase sm:text-sm">
            About
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            6+ years building products clients can trust.
          </h2>
        </Reveal>
        <Reveal className="md:col-span-7 md:col-start-6" delayMs={100}>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {site.about[0]}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/about" className="btn-primary text-sm">
              More about me
            </Link>
            <Link href="/expertise" className="btn-secondary text-sm">
              View expertise
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeExplore() {
  const links = [
    { href: "/experience", label: "Other experience", body: "SaaS, dashboards, and automation work." },
    { href: "/process", label: "Process", body: "How ideas become launch-ready software." },
    { href: "/contact", label: "Contact", body: "Start a project or send a short brief." },
  ];

  return (
    <section className="bg-mist/50 px-4 py-14 sm:px-6 sm:py-16 md:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {links.map((item, i) => (
          <Reveal key={item.href} delayMs={i * 80}>
            <Link
              href={item.href}
              className="block border border-line bg-paper px-5 py-6 transition-colors hover:border-ink/30"
            >
              <p className="font-display text-lg font-semibold tracking-tight text-ink">
                {item.label}
              </p>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
