import type { Metadata } from "next";
import { About } from "@/components/About";
import { Breadcrumbs, pageBreadcrumb } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={pageBreadcrumb("about")} />
      <About isPage />
    </>
  );
}
