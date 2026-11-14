import type { Metadata } from "next";
import { Breadcrumbs, pageBreadcrumb } from "@/components/Breadcrumbs";
import { Expertise } from "@/components/Expertise";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("expertise");

export default function ExpertisePage() {
  return (
    <>
      <Breadcrumbs items={pageBreadcrumb("expertise")} />
      <Expertise isPage />
    </>
  );
}
