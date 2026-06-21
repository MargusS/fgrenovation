"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { projects } from "@/data/projects";

const HEADER_OFFSET = 0;
const AUTOPLAY_INTERVAL = 4000;

export function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % projects.length);
    }, AUTOPLAY_INTERVAL);
  }, []);

  const handleManualChange = useCallback((index: number) => {
    setActiveIndex(index);
    startAutoplay();
  }, [startAutoplay]);

  const goToNext = useCallback(() => handleManualChange((activeIndex + 1) % projects.length), [activeIndex, handleManualChange]);
  const goToPrev = useCallback(() => handleManualChange((activeIndex - 1 + projects.length) % projects.length), [activeIndex, handleManualChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) < Math.abs(dy) * 0.8) return;
    if (Math.abs(dx) < 40) return;
    dx < 0 ? goToNext() : goToPrev();
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoplay]);

  return (
    <Section id="projets" className="py-0 md:py-0 lg:py-0 h-[min(100vh,1130px)] overflow-hidden">
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
              className="absolute inset-0 grid grid-rows-[1fr_1fr] lg:grid-cols-[40%_60%] lg:grid-rows-1"
              aria-hidden={index !== activeIndex}
            >
              {/* Left column — text */}
              <div className="relative flex h-full items-center px-6 pb-8 pt-8 md:px-10 lg:px-16 lg:pb-20 lg:pt-12">
                <div className="flex w-full flex-col justify-between">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: index === activeIndex ? 1 : 0,
                      y: index === activeIndex ? 0 : 20,
                    }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    className="space-y-10 md:space-y-20"
                  >
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

                    <div className="space-y-4">
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

                  {/* Indicators — solo en desktop, en la columna de texto */}
                  <div className="mt-10 hidden items-center justify-center gap-3 lg:flex">
                    {projects.map((_, indicatorIndex) => (
                      <button
                        key={indicatorIndex}
                        onClick={() => handleManualChange(indicatorIndex)}
                        className="h-[6px] rounded-full transition-all duration-300 cursor-pointer"
                        style={{
                          width: indicatorIndex === activeIndex ? "3.5rem" : "2rem",
                          backgroundColor:
                            indicatorIndex === activeIndex
                              ? "var(--brand-forest)"
                              : "oklch(0.36 0.005 240 / 0.25)",
                        }}
                        aria-label={`Voir le projet ${indicatorIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column — imagen con click, swipe e indicators mobile */}
              <div
                className="relative flex h-full flex-col overflow-hidden bg-brand-bg cursor-pointer"
                onClick={goToNext}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="min-h-0 w-full flex-1 object-cover object-center"
                  initial={{ scale: 1.03 }}
                  animate={{ scale: index === activeIndex ? 1 : 1.03 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                />

                {/* Indicators mobile — fluyen debajo de la imagen via flex, ocultos en lg */}
                <div
                  className="flex shrink-0 items-center justify-center gap-3 py-4 lg:hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {projects.map((_, indicatorIndex) => (
                    <button
                      key={indicatorIndex}
                      onClick={() => handleManualChange(indicatorIndex)}
                      className="h-[6px] rounded-full transition-all duration-300 cursor-pointer"
                      style={{
                        width: indicatorIndex === activeIndex ? "3.5rem" : "2rem",
                        backgroundColor:
                          indicatorIndex === activeIndex
                            ? "var(--brand-forest)"
                            : "oklch(0.36 0.005 240 / 0.25)",
                      }}
                      aria-label={`Voir le projet ${indicatorIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}