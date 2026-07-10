"use client";

import { ArrowRight } from "lucide-react";
import { Building20Regular as Building20RegularIcon } from "@fluentui/react-icons";
import BaselinePhoneIcon from "@iconify-react/ic/baseline-phone";
import FileThinIcon from '@iconify-react/iconamoon/file-thin';
import HammerOutlineIcon from "@iconify-react/famicons/hammer-outline";
import TickCircleOutlineIcon from "@iconify-react/teenyicons/tick-circle-outline";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { PaintWord } from "@/components/ui/PaintWord";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { workMethodSteps } from "@/data/work-method";

const stepIcons = {
  phone: BaselinePhoneIcon,
  building: Building20RegularIcon,
  document: FileThinIcon,
  hammer: HammerOutlineIcon,
  tick: TickCircleOutlineIcon,
} as const;

const iconBaseSize = "h-10 w-10 sm:h-12 sm:w-12 text-brand-fir stroke-[1.4] overflow-visible";

export function WorkMethodSection() {
  return (
    <div className="w-full bg-background py-16 sm:py-24 lg:py-32">
      <Section id="methode" className="mx-auto max-w-8xl scroll-mt-24 px-6 text-brand-ink lg:px-12 xl:px-20 lg:scroll-mt-28">
        <div className="flex flex-col gap-12 lg:gap-20">

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex w-full justify-center text-center lg:justify-start lg:text-left"
          >
            <h2
              className="text-4xl font-bold uppercase leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-epilogue)" }}
            >
              Notre méthode
              <br />
              <span className="block lg:inline-block">
                de <span className="font-extrabold"><PaintWord word="travail" /></span>
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-4"
          >
            {workMethodSteps.map((step, index) => {
              const Icon = stepIcons[step.icon as keyof typeof stepIcons] ?? BaselinePhoneIcon;

              return (
                <motion.div
                  key={step.id}
                  variants={fadeInUp}
                  className="flex flex-1 flex-col items-center text-center sm:text-left sm:items-start lg:items-center lg:text-center"
                >
                  <div className="relative flex flex-col items-center sm:items-start lg:items-center">

                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[radial-gradient(circle_at_center,oklch(0.98_0.01_140)_0%,oklch(0.95_0.01_140)_100%)] shadow-sm sm:h-28 sm:w-28 border border-black/5">
                      <Icon className={iconBaseSize} />
                    </div>

                    {index < workMethodSteps.length - 1 && (
                      <div className="absolute left-[calc(50%+128px)] top-1/2 hidden -translate-y-1/2 lg:flex w-[calc(100%-46px)] justify-center text-brand-ink-muted/40">
                        <ArrowRight className="h-6 w-10 stroke-[4.5]" />
                      </div>
                    )}
                  </div>

                  <span className="mt-6 text-3xl font-semibold leading-none text-brand-fir sm:text-4xl">
                    {step.number}
                  </span>

                  <h3 className="mt-3 max-w-[14ch] text-xl font-semibold leading-tight text-brand-ink sm:text-2xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 max-w-[20ch] text-sm leading-relaxed text-brand-ink-muted sm:text-base">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>
    </div>
  );
}