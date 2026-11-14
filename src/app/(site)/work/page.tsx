import type { Metadata } from "next";
import { Breadcrumbs, pageBreadcrumb } from "@/components/Breadcrumbs";
import { Work } from "@/components/Work";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("work");

export default function WorkPage() {
  return (
    <>
      <Breadcrumbs items={pageBreadcrumb("work")} />
      <Work isPage />
    </>
  );
}
