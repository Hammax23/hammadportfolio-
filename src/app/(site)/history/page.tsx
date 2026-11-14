import type { Metadata } from "next";
import { WorkHistory } from "@/components/WorkHistory";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("history");

export default function HistoryPage() {
  return <WorkHistory isPage />;
}
