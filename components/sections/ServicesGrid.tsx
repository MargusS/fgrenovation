"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/services/Card";
import { Section } from "@/components/layout/Section";
import { services } from "@/data/services";
import { staggerContainer } from "@/lib/motion";

export function ServicesGrid() {
  return (
    <div className="border-y border-black/8 bg-transparent px-4 py-12 min-[640px]:px-6 min-[640px]:py-16 min-[1533px]:px-20">
      <Section id="services" className="px-0 py-0 text-brand-ink">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 justify-items-center gap-x-3 gap-y-[22px] min-[640px]:grid-cols-2 min-[640px]:gap-x-3 min-[640px]:gap-y-[22px] min-[1013px]:gap-x-4 min-[1013px]:gap-y-[26px] min-[1533px]:grid-cols-4 min-[1533px]:gap-x-20 min-[1533px]:gap-y-[90px]"
        >
          {services.map((service, index) => (
            <Card key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </Section>
    </div>
  );
}
