"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceItem } from "@/components/ui/ServiceItem";
import { services } from "@/data/services";
import { staggerContainer } from "@/lib/motion";

export function ServicesGrid() {
  return (
    <Section id="services" background="muted">
      <Container>
        <SectionTitle
          subtitle="Savoir-faire"
          title="Nos domaines d'intervention"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <ServiceItem
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 border-t border-border pt-8"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            Chaque projet est unique. Nous nous adaptons à vos besoins spécifiques
            et proposons des solutions sur mesure, que ce soit pour une rénovation
            partielle ou un chantier complet. Contactez-nous pour discuter de votre projet.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
