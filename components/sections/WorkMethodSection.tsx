"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { Building20Regular as Building20RegularIcon } from "@fluentui/react-icons";
import BaselinePhoneIcon from "@iconify-react/ic/baseline-phone";
import FileThinIcon from "@iconify-react/iconamoon/file-thin";
import HammerOutlineIcon from "@iconify-react/famicons/hammer-outline";
import TickCircleOutlineIcon from "@iconify-react/teenyicons/tick-circle-outline";
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

const iconBaseSize =
  "h-10 w-10 sm:h-12 sm:w-12 text-current stroke-[1.45] overflow-visible";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

type StepItemProps = {
  step: (typeof workMethodSteps)[number];
  index: number;
  totalSteps: number;
  smoothProgress: MotionValue<number>;
};

function StepItem({ step, index, totalSteps, smoothProgress }: StepItemProps) {
  const Icon =
    stepIcons[step.icon as keyof typeof stepIcons] ?? BaselinePhoneIcon;

  const stepStart = index / totalSteps;
  const stepEnd = (index + 1) / totalSteps;

  const rawStepProgress = useTransform(smoothProgress, (value) => {
    return clamp((value - stepStart) / (stepEnd - stepStart));
  });

  const fillProgress = useSpring(rawStepProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  const circleScale = useTransform(fillProgress, [0, 1], [1, 1.035]);
  const fillScale = useTransform(fillProgress, [0, 1], [0, 1]);
  const ringOpacity = useTransform(fillProgress, [0, 0.65, 1], [0, 0.12, 0.22]);
  const iconOpacity = useTransform(fillProgress, [0, 1], [0.68, 1]);
  const textOpacity = useTransform(fillProgress, [0, 1], [0.72, 1]);
  const connectorScale = useSpring(fillProgress, {
    stiffness: 100,
    damping: 26,
    mass: 0.55,
  });

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-1 flex-col items-center text-center sm:text-left  lg:items-center lg:text-center"
    >
      <article className="relative flex w-full flex-col items-center lg:items-center">
        <motion.div
          style={{
            scale: circleScale,
            borderColor: "color-mix(in oklab, var(--brand-fir) 18%, transparent)",
            backgroundColor: "color-mix(in oklab, var(--brand-fir) 8%, white)",
          }}
          className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border sm:h-28 sm:w-28"
        >
          <motion.div
            style={{
              scaleX: fillScale,
              transformOrigin: "left center",
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--brand-fir) 18%, white), color-mix(in oklab, var(--brand-fir) 10%, white))",
            }}
            className="absolute inset-0 rounded-full"
          />

          <motion.div
            style={{
              opacity: ringOpacity,
              borderColor: "color-mix(in oklab, var(--brand-fir) 55%, transparent)",
            }}
            className="absolute inset-0 rounded-full border-2"
          />

          <motion.div
            style={{
              opacity: iconOpacity,
              color: "var(--brand-fir)",
            }}
            className="relative z-10"
          >
            <Icon className={iconBaseSize} />
          </motion.div>
        </motion.div>

        {index < totalSteps - 1 && (
          <>
            <div className="mt-4 flex h-10 w-px justify-center overflow-hidden rounded-full bg-black/8 lg:hidden">
              <motion.div
                style={{
                  scaleY: connectorScale,
                  transformOrigin: "top center",
                  backgroundColor: "var(--brand-fir)",
                }}
                className="h-full w-full rounded-full"
              />
            </div>

            <div className="absolute left-[calc(50%+64px)] top-12 hidden lg:flex lg:w-[calc(100%-128px)] lg:items-center lg:justify-center">
              <div className="relative h-px w-full overflow-hidden rounded-full bg-black/8">
                <motion.div
                  style={{
                    scaleX: connectorScale,
                    transformOrigin: "left center",
                    backgroundColor: "var(--brand-fir)",
                  }}
                  className="absolute inset-y-0 left-0 w-full rounded-full"
                />
              </div>

              <motion.div
                style={{
                  opacity: useTransform(fillProgress, [0, 1], [0.35, 1]),
                  x: useTransform(fillProgress, [0, 1], [-4, 0]),
                  color: "var(--brand-fir)",
                }}
                className="ml-3 shrink-0"
              >
                <ArrowRight className="h-5 w-5 stroke-[1.5]" />
              </motion.div>
            </div>
          </>
        )}

        <motion.span
          style={{
            color: "var(--brand-fir)",
            opacity: textOpacity,
          }}
          className="mt-6 text-3xl font-semibold leading-none sm:text-4xl"
        >
          {step.number}
        </motion.span>

        <h3 className="mt-3 max-w-[14ch] text-xl font-semibold leading-tight text-brand-ink sm:text-2xl">
          {step.title}
        </h3>

        <p className="mt-3 max-w-[20ch] text-sm leading-relaxed text-brand-ink-muted sm:text-base">
          {step.description}
        </p>
      </article>
    </motion.div>
  );
}

export function WorkMethodSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
    layoutEffect: false,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.5,
  });

  return (
    <div className="w-full bg-background py-16 sm:py-24 lg:py-32">
      <div ref={sectionRef}>
        <Section
          id="methode"
          className="mx-auto scroll-mt-24 px-6 text-brand-ink lg:scroll-mt-28 lg:px-12 xl:px-20"
        >
          <div className="flex flex-col gap-12 lg:gap-20">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex w-full justify-center text-center lg:justify-start lg:text-left"
            >
              <h2
                className="text-3xl font-bold uppercase leading-[1.1] tracking-tight text-foreground lg:text-5xl"
                style={{ fontFamily: "var(--font-epilogue)" }}
              >
                Notre méthode
                <br />
                <span className="block lg:inline-block">
                  de{" "}
                  <span className="font-extrabold">
                    <PaintWord word="travail" />
                  </span>
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 gap-10 sm:justify-items-center md:align-items-center sm:gap-x-8 sm:gap-y-14 lg:flex lg:flex-row xl:items-start lg:justify-between lg:gap-4"
            >
              {workMethodSteps.map((step, index) => (
                <StepItem
                  key={step.id}
                  step={step}
                  index={index}
                  totalSteps={workMethodSteps.length}
                  smoothProgress={smoothProgress}
                />
              ))}
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
  );
}