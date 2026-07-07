"use client";

import { CountUp } from "countup.js";
import StarAward01Icon from "@iconify-react/hugeicons/star-award-01";
import PaintIcon from "@iconify-react/maki/paint";
import CostEstimateOutlineIcon from "@iconify-react/teenyicons/cost-estimate-outline";
import MapsIcon from "@iconify-react/streamline-ultimate/maps";
import { useEffect, useRef, useState } from "react";

const items = [
  {
    id: "experience",
    label: "années d'experience",
    value: "animated-years",
    icon: StarAward01Icon,
  },
  {
    id: "projects",
    label: "chantiers réalisés",
    value: "300+",
    icon: PaintIcon,
  },
  {
    id: "quotes",
    label: "devis gratuits",
    value: "100%",
    icon: CostEstimateOutlineIcon,
  },
  {
    id: "coverage",
    label: "zone d'intervention",
    value: "Suisse romande",
    icon: MapsIcon,
  },
] as const;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function AnimatedYearsValue() {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const node = containerRef.current;

    if (!node || hasPlayed) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (prefersReducedMotion) {
            node.textContent = "25+";
          } else {
            const counter = new CountUp(node, 25, {
              duration: 4.5,
              suffix: "+",
              useGrouping: false,
            });

            if (!counter.error) {
              counter.start();
            } else {
              node.textContent = "25+";
            }
          }

          setHasPlayed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.45,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasPlayed, prefersReducedMotion]);

  return (
    <span
      ref={containerRef}
      className="inline-flex min-w-[2.5ch] align-bottom leading-none tabular-nums"
      aria-label="15+"
    >
      0+
    </span>
  );
}

export function WhyChooseUsStrip() {
  return (
    <section
      aria-label="Pourquoi nous choisir"
      className="bg-[linear-gradient(90deg,#173c25_0%,#173c25_18%,#1b4a2f_50%,#173c25_82%,#173c25_100%)] text-primary-foreground"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-1 divide-y divide-white/10 py-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-center gap-4 px-4 py-6 text-center sm:justify-start sm:px-6 sm:text-left lg:min-h-[142px] lg:px-8 xl:px-10">
              <div className="flex h-13 w-13 shrink-0 items-center justify-center text-[#d2b58b] sm:h-15 sm:w-15">
                <item.icon className="h-9 w-9 sm:h-10 sm:w-10" height="1em" />
              </div>

              <div className="min-w-0">
                <p className="text-[clamp(2rem,4vw,2.35rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                  {item.value === "animated-years" ? <AnimatedYearsValue /> : item.value}
                </p>
                <p className="mt-2 text-[0.82rem] font-medium text-white/75 sm:text-[0.9rem]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
