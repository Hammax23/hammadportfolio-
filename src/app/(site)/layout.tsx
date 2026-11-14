import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:m-0 focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-none focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper focus:whitespace-normal focus:[clip:auto]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
