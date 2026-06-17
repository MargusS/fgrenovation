"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { ServiceItem } from "@/components/ui/ServiceItem";
import { services } from "@/data/services";
import { staggerContainer } from "@/lib/motion";

const HEADER_OFFSET = "clamp(5.5rem, 8vw, 7.5rem)";

export function ServicesGrid() {
  return (
    <Section
      id="services"
      className="py-0"
      style={{
        scrollMarginTop: HEADER_OFFSET,
      }}
    >
      <div
        className="grid h-[min(calc(100dvh-var(--services-header-offset)),1130px)] grid-cols-1 lg:grid-cols-[2fr_1fr]"
        style={
          {
            "--services-header-offset": HEADER_OFFSET,
          } as React.CSSProperties
        }
      >
        {/* Left side — services grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 bg-brand-fir md:grid-cols-2"
        >
          {services.slice(0, 4).map((service, index) => (
            <div
              key={service.id}
              className={[
                "flex min-h-[14.5rem] px-5 py-12 md:min-h-[17rem] md:px-6 md:py-12 xl:min-h-[19rem] xl:px-8 xl:py-14",
                "border-white/80",
                "border-b-[1.5px]",
                "md:border-r-[1.5px] md:[&:nth-child(2n)]:border-r-0",
                index >= 2 ? "md:border-b-0" : "",
              ].join(" ")}
            >
              <ServiceItem service={service} index={index} className="h-full w-full" />
            </div>
          ))}
        </motion.div>

        {/* Right side — editorial panel */}
        <div className="flex bg-brand-bg px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-12 xl:px-14">
          <div className="flex w-full items-center">
            <div className="max-w-md space-y-5">
              <span className="block text-[0.72rem] font-medium uppercase tracking-[0.24em] text-brand-ink-muted">
                Savoir-faire
              </span>

              <h2
                className="font-display text-3xl leading-[0.92] tracking-tight text-brand-ink md:text-4xl xl:text-[3.25rem]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Nos domaines d&apos;intervention
              </h2>

              <p className="max-w-sm pt-2 text-sm leading-relaxed text-brand-ink-muted md:text-[1rem]">
                Chaque projet est unique. Nous nous adaptons à vos besoins spécifiques
                et proposons des solutions sur mesure, que ce soit pour une rénovation
                partielle ou un chantier complet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}