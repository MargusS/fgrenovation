"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { projects } from "@/data/projects";
import { fadeInUp, imageReveal } from "@/lib/motion";

export function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate progress through the section
      const progress = (scrollTop - containerTop + windowHeight * 0.5) / containerHeight;
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      // Map progress to project index
      const newIndex = Math.min(
        projects.length - 1,
        Math.floor(clampedProgress * projects.length)
      );
      
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section id="projets" className="py-0">
      <div ref={containerRef} className="min-h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Container size="wide" className="flex h-full flex-col justify-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-8 md:mb-12"
            >
              <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Réalisations
              </span>
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-light tracking-tight text-foreground md:text-3xl lg:text-4xl">
                  Projets sélectionnés
                </h2>
                <span className="hidden text-sm tabular-nums text-muted-foreground md:block">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>

            <div className="relative flex-1">
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                    pointerEvents: index === activeIndex ? "auto" : "none",
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col lg:flex-row lg:gap-12"
                >
                  {/* Image */}
                  <div className="relative h-[40vh] overflow-hidden bg-muted lg:h-full lg:flex-1">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: index === activeIndex ? 1 : 1.1 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center py-6 lg:w-80 lg:py-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: index === activeIndex ? 1 : 0,
                        y: index === activeIndex ? 0 : 20,
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium uppercase tracking-[0.15em] text-olive-600">
                          {project.category}
                        </span>
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {project.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-light tracking-tight text-foreground md:text-2xl">
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Project indicators */}
            <div className="mt-6 flex items-center gap-2 md:mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1 transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-olive-600"
                      : "w-4 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                  }`}
                  aria-label={`Voir le projet ${index + 1}`}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}
