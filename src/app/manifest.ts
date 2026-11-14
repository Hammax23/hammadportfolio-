import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.fullName} | Full Stack Engineer`,
    short_name: site.name,
    description: site.seo.description,
    start_url: site.url,
    id: site.url,
    display: "standalone",
    background_color: "#f3f4f6",
    theme_color: "#0a0e12",
    lang: "en",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
