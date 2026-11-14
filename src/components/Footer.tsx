import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-4 py-8 sm:px-6 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="font-display text-sm font-semibold tracking-tight text-ink">
          {site.name}
        </p>
        <p className="text-xs text-muted sm:text-sm">
          © 2026 · Full Stack Engineer · Next.js &amp; Laravel
        </p>
        <div className="flex items-center gap-4">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink transition-colors hover:text-[#25D366]"
          >
            WhatsApp
          </a>
          <a
            href={site.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink transition-colors hover:text-accent"
          >
            Upwork
          </a>
        </div>
      </div>
    </footer>
  );
}
