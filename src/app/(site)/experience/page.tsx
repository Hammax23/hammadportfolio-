import type { Metadata } from "next";
import { Breadcrumbs, pageBreadcrumb } from "@/components/Breadcrumbs";
import { Experience } from "@/components/Experience";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("experience");

export default function ExperiencePage() {
  return (
    <>
      <Breadcrumbs items={pageBreadcrumb("experience")} />
      <Experience isPage />
    </>
  );
}
