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

const stepIconSizes = {
  phone: "h-[46px] w-[46px] min-[640px]:h-[50px] min-[640px]:w-[50px] min-[1200px]:h-[54px] min-[1200px]:w-[54px] min-[1440px]:h-[62px] min-[1440px]:w-[62px]",
  building: "h-[46px] w-[46px] min-[640px]:h-[50px] min-[640px]:w-[50px] min-[1200px]:h-[54px] min-[1200px]:w-[54px] min-[1440px]:h-[62px] min-[1440px]:w-[62px]",
  document: "h-[46px] w-[46px] min-[640px]:h-[50px] min-[640px]:w-[50px] min-[1200px]:h-[54px] min-[1200px]:w-[54px] min-[1440px]:h-[62px] min-[1440px]:w-[62px]",
  hammer: "h-[46px] w-[46px] min-[640px]:h-[50px] min-[640px]:w-[50px] min-[1200px]:h-[54px] min-[1200px]:w-[54px] min-[1440px]:h-[62px] min-[1440px]:w-[62px]",
  tick: "h-[40px] w-[40px] min-[640px]:h-[44px] min-[640px]:w-[44px] min-[1200px]:h-[48px] min-[1200px]:w-[48px] min-[1440px]:h-[56px] min-[1440px]:w-[56px]",
} as const;

export function WorkMethodSection() {
  return (
    <div className="py-20">
      <Section id="methode" className="bg-background px-20 py-40 text-brand-ink md:py-24">
        <div className="space-y-14">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-lg:flex max-lg:w-full max-lg:justify-center max-lg:text-center lg:text-left"
        >
          <h2
            className="max-lg:w-full text-[clamp(2.25rem,10vw,3rem)] font-bold uppercase leading-[1.05] tracking-tight text-foreground lg:inline-block lg:text-6xl"
            style={{ fontFamily: "var(--font-epilogue)" }}
          >
            Notre méthode
            <br />
            <span className="block text-center lg:text-center">
              de <span className="font-extrabold"><PaintWord word="travail" /></span>
            </span>
          </h2>
        </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-x-10 gap-y-14 min-[640px]:grid-cols-2 min-[640px]:gap-x-8 min-[640px]:gap-y-18 min-[1200px]:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] min-[1200px]:gap-x-3 min-[1200px]:gap-y-0 min-[1440px]:gap-x-5"
          >
            {workMethodSteps.map((step, index) => {
              const Icon = stepIcons[step.icon as keyof typeof stepIcons] ?? BaselinePhoneIcon;
              const iconSizeClass = stepIconSizes[step.icon as keyof typeof stepIconSizes] ?? stepIconSizes.phone;

              return (
                <motion.div
                  key={step.id}
                  variants={fadeInUp}
                  className="contents"
                >
                  <article
                    className={`flex flex-col items-center justify-start text-center ${
                      index === workMethodSteps.length - 1
                        ? "min-[640px]:max-[1199px]:col-span-2 min-[640px]:max-[1199px]:justify-self-center"
                        : ""
                    }`}
                  >
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[radial-gradient(circle_at_center,oklch(0.98_0.01_140)_0%,oklch(0.95_0.01_140)_100%)] min-[640px]:h-36 min-[640px]:w-36 min-[1200px]:h-38 min-[1200px]:w-38 min-[1440px]:h-44 min-[1440px]:w-44">
                      <Icon className={`${iconSizeClass} overflow-visible text-brand-fir stroke-[1.6]`} />
                    </div>

                    <span className="mt-6 text-4xl font-semibold leading-none text-brand-fir min-[640px]:mt-7 min-[640px]:text-[2.8rem] min-[1200px]:mt-6 min-[1200px]:text-[2.6rem] min-[1440px]:mt-8 min-[1440px]:text-5xl">
                      {step.number}
                    </span>

                    <h3 className="mt-4 max-w-[14ch] text-balance text-[1.45rem] font-semibold leading-tight text-brand-ink min-[640px]:mt-5 min-[640px]:text-[1.7rem] min-[1200px]:text-[1.7rem] min-[1440px]:text-2xl">
                      {step.title}
                    </h3>

                    <p className="mt-4 max-w-[16ch] text-pretty text-base leading-relaxed text-brand-ink-muted min-[640px]:mt-5 min-[640px]:text-[1.05rem] min-[1200px]:max-w-[15ch] min-[1200px]:text-[1rem] min-[1440px]:max-w-[16ch] min-[1440px]:text-lg">
                      {step.description}
                    </p>
                  </article>

                  {index < workMethodSteps.length - 1 && (
                    <div className="hidden min-[1200px]:flex items-start justify-center pt-12 text-brand-ink-muted min-[1440px]:pt-16">
                      <ArrowRight className="h-12 w-12 stroke-[1.3] min-[1440px]:h-16 min-[1440px]:w-16" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>
    </div>

  );
}
