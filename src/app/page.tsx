import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Expertise } from "@/components/Expertise";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Work />
        <Experience />
        <Expertise />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
