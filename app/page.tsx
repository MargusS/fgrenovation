import { Header } from "@/components/layout/Header";
import { HomeHero } from "@/components/sections/HomeHero";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { BureauSection } from "@/components/sections/BureauSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomeHero />
        <ServicesGrid />
        <ProjectsShowcase />
        <BureauSection />
        <ContactSection />
      </main>
    </>
  );
}
