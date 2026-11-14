import type { Metadata } from "next";
import { Breadcrumbs, pageBreadcrumb } from "@/components/Breadcrumbs";
import { Process } from "@/components/Process";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("process");

export default function ProcessPage() {
  return (
    <>
      <Breadcrumbs items={pageBreadcrumb("process")} />
      <Process isPage />
    </>
  );
}
