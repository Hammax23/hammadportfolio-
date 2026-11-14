import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Expertise } from "@/components/Expertise";
import { Hero } from "@/components/Hero";
import { HomeHistoryPreview } from "@/components/HomeSections";
import { Process } from "@/components/Process";
import { Work } from "@/components/Work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <HomeHistoryPreview />
      <Experience />
      <Expertise />
      <Process />
      <About />
      <Contact />
    </>
  );
}
