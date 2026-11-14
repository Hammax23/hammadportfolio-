import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found on hammadiftikhar.com.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center px-4 py-24 sm:px-6 md:px-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs tracking-[0.16em] text-accent uppercase">404</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            This URL does not exist. Head back home or browse selected work.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/" className="btn-primary text-sm">
              Go home
            </Link>
            <Link href="/work" className="btn-secondary text-sm">
              View work
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
