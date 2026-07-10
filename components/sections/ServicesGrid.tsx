"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/services/Card";
import { Section } from "@/components/layout/Section";
import { services } from "@/data/services";
import { staggerContainer, fadeInUp } from "@/lib/motion";

export function ServicesGrid() {
  return (
    <div className="w-full border-y border-black/5 bg-transparent px-6 py-16 sm:px-6 sm:py-24 lg:px-12 lg:py-32 xl:px-20">
      <Section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-0 py-0 text-brand-ink lg:scroll-mt-28">

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl lg:text-5xl">
            Nos Domaines d'Expertise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/70 sm:text-lg">
            De la conception aux finitions, nous vous accompagnons à chaque étape de votre rénovation avec exigence et savoir-faire.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-6 xl:gap-8"
        >
          {services.map((service, index) => (
            <Card key={service.id} service={service} index={index} />
          ))}
        </motion.div>

      </Section>
    </div>
  );
}