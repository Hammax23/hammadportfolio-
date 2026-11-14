import type { Metadata } from "next";
import { Breadcrumbs, pageBreadcrumb } from "@/components/Breadcrumbs";
import { Contact } from "@/components/Contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={pageBreadcrumb("contact")} />
      <Contact isPage />
    </>
  );
}
