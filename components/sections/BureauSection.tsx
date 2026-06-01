"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { company } from "@/data/company";
import { fadeInUp, fadeIn } from "@/lib/motion";

export function BureauSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="bureau"
      ref={sectionRef}
      className="bg-background py-20 md:py-28 lg:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative aspect-[4/3] overflow-hidden bg-muted lg:aspect-auto lg:h-full lg:min-h-[500px]"
          >
            <motion.img
              style={{ y: imageY }}
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=900&fit=crop&q=80"
              alt="Équipe FG Rénovation au travail"
              className="h-[110%] w-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <span className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Notre approche
              </span>
              <h2 className="text-2xl font-light tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
                Quinze ans de métier,<br />
                une exigence intacte.
              </h2>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="mt-8 space-y-6"
            >
              {company.philosophy.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-8 border-t border-border pt-8"
            >
              <div>
                <span className="block text-3xl font-light text-olive-600">15+</span>
                <span className="mt-1 block text-xs uppercase tracking-wider text-muted-foreground">
                  Années d'expérience
                </span>
              </div>
              <div>
                <span className="block text-3xl font-light text-olive-600">200+</span>
                <span className="mt-1 block text-xs uppercase tracking-wider text-muted-foreground">
                  Projets réalisés
                </span>
              </div>
              <div>
                <span className="block text-3xl font-light text-olive-600">Vaud</span>
                <span className="mt-1 block text-xs uppercase tracking-wider text-muted-foreground">
                  Canton d'intervention
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
