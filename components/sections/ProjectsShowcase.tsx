"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { projects } from "@/data/projects";

const HEADER_OFFSET = 0;

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

      const progress =
        (scrollTop - containerTop + windowHeight * 0.5) / containerHeight;
      const clampedProgress = Math.max(0, Math.min(1, progress));

      const newIndex = Math.min(
        projects.length - 1,
        Math.floor(clampedProgress * projects.length)
      );

      setActiveIndex(newIndex);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section id="projets" className="py-0 md:py-0 lg:py-0">
      <div ref={containerRef} className="min-h-[300vh]">
        <div
          className="sticky overflow-hidden"
          style={{
            top: HEADER_OFFSET,
            height: `min(calc(100vh - ${HEADER_OFFSET}px), 1130px)`,
          }}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === activeIndex ? 1 : 0,
                pointerEvents: index === activeIndex ? "auto" : "none",
              }}
              transition={{ duration: 0.55 }}
              className="absolute inset-0 grid grid-rows-[60%_40%] lg:grid-cols-[1fr_50vw] lg:grid-rows-1"
              aria-hidden={index !== activeIndex}
            >
              {/* Left column — all text content */}
              <div className="relative flex h-full items-end px-6 pb-8 pt-8 md:px-10 lg:px-16 lg:pb-24 lg:pt-12">
                <div className="flex w-full max-w-xl flex-col justify-between">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: index === activeIndex ? 1 : 0,
                      y: index === activeIndex ? 0 : 20,
                    }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    className="space-y-10 md:space-y-20"
                  >
                    {/* Section heading integrated into left column */}
                    <div className="space-y-3">
                      <span className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Réalisations
                      </span>

                      <div className="flex items-end justify-between gap-6">
                        <h2 className="text-2xl font-light tracking-tight text-foreground md:text-3xl lg:text-4xl">
                          Projets sélectionnés
                        </h2>

                        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                          {String(activeIndex + 1).padStart(2, "0")} /{" "}
                          {String(projects.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Project content */}
                    <div className="max-w-sm space-y-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs font-medium uppercase tracking-[0.15em]"
                          style={{ color: "var(--brand-emerald)" }}
                        >
                          {project.category}
                        </span>

                        <span className="text-xs tabular-nums text-muted-foreground">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="text-xl font-light tracking-tight text-foreground md:text-2xl lg:text-3xl">
                        {project.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Indicators */}
                  <div className="mt-10 flex items-center gap-2">
                    {projects.map((_, indicatorIndex) => (
                      <button
                        key={indicatorIndex}
                        onClick={() => setActiveIndex(indicatorIndex)}
                        className="h-px transition-all duration-300"
                        style={{
                          width: indicatorIndex === activeIndex ? "2rem" : "1rem",
                          backgroundColor:
                            indicatorIndex === activeIndex
                              ? "var(--brand-emerald)"
                              : "oklch(0.36 0.005 240 / 0.25)",
                        }}
                        aria-label={`Voir le projet ${indicatorIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column — full-height immersive image */}
              <div className="relative h-full overflow-hidden bg-muted">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover object-center"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: index === activeIndex ? 1 : 1.08 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                />

                {/* Bottom fade on mobile */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 lg:hidden"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, var(--background))",
                  }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}