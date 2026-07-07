import { Header } from "@/components/layout/Header";
import { HomeHero } from "@/components/sections/HomeHero";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ContactSection } from "@/components/sections/ContactSection";
import { WhyChooseUsStrip } from "@/components/sections/WhyChooseUsStrip";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomeHero />
        <WhyChooseUsStrip />
        <ServicesGrid />
        <ProjectsShowcase />
        <ContactSection />
      </main>
    </>
  );
}
