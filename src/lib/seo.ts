import type { Metadata } from "next";
import { site } from "@/data/site";

type PageKey = keyof typeof site.pages;

export function pageMetadata(key: PageKey): Metadata {
  const page = site.pages[key];
  const path = `/${key}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${page.title} | ${site.fullName}`,
      description: page.description,
      url: `${site.url}${path}`,
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${site.fullName} | ${page.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | ${site.fullName}`,
      description: page.description,
      images: ["/og-image.jpg"],
    },
  };
}
