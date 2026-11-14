import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    "",
    "/work",
    "/history",
    "/experience",
    "/expertise",
    "/process",
    "/about",
    "/contact",
  ];

  return routes.map((route, index) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: index === 0 || route === "/work" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/work" || route === "/about" ? 0.9 : 0.8,
  }));
}
