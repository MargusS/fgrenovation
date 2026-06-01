"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { heroSubtitles } from "@/data/company";
import { fadeInUp, fadeIn } from "@/lib/motion";

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector("#projets");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative min-h-screen overflow-hidden bg-stone-50"
    >
      <Container size="wide" className="relative z-10">
        <div className="flex min-h-screen flex-col justify-center pb-32 pt-24 md:pb-40 md:pt-28">
          <motion.div
            style={{ opacity }}
            className="max-w-2xl space-y-6"
          >
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-4xl font-light leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              <span className="block">Rénover</span>
              <span className="block text-olive-600">avec précision.</span>
            </motion.h1>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="text-base text-muted-foreground md:text-lg"
            >
              <AnimatedText
                texts={heroSubtitles}
                className="h-7"
                interval={3500}
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <a
                href="#projets"
                onClick={handleScrollToProjects}
                className="group inline-flex items-center gap-3 text-sm tracking-wide text-foreground transition-colors hover:text-olive-600"
              >
                <span>Découvrir nos réalisations</span>
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Hero Image - emerging from bottom */}
      <motion.div
        style={{ y: imageY }}
        className="absolute bottom-0 left-0 right-0 h-[45vh] md:h-[55vh] lg:h-[60vh]"
      >
        <div className="relative h-full w-full overflow-hidden">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-full w-full"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop&q=85"
              alt="Projet de rénovation FG Rénovation"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-50/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Défiler
          </span>
          <div className="h-8 w-px bg-muted-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
