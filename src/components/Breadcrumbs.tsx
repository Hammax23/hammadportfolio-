import Link from "next/link";
import { site } from "@/data/site";

type PageKey = keyof typeof site.pages;

type Crumb = {
  name: string;
  href: string;
};

type Props = {
  items: Crumb[];
};

export function pageBreadcrumb(key: PageKey): Crumb[] {
  return [{ name: site.pages[key].title, href: `/${key}` }];
}

export function Breadcrumbs({ items }: Props) {
  const crumbs = [{ name: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${site.url}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="border-b border-line bg-paper px-4 py-3 sm:px-6 md:px-10"
      >
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-sm text-muted">
          {crumbs.map((item, index) => {
            const last = index === crumbs.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden>/</span> : null}
                {last ? (
                  <span className="text-ink" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="transition-colors hover:text-ink">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
