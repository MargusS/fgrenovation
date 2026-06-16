"use client";

import { motion, useScroll, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { heroSubtitles } from "@/data/company";
import { fadeInUp, fadeIn } from "@/lib/motion";
import { PaintWord } from "@/components/ui/PaintWord";

const DEEP     = "#122A22";
const GREEN   = "#2F5C4B";
const BRASS   = "#C7A97A";
const GRAPHITE    = "#181A1B";
const SURFACE = "#EAE9E4";

// DEEP + GREEN (right side, wider) → horizontal, slide in from right
// BRASS + GRAPHITE (left side, narrower) → vertical, fall from top
const strips = [
  { color: DEEP,   left: "78%", width: "25%", delay: 0,    direction: "horizontal" },
  { color: GREEN, left: "59.2%", width: "19%", delay: 1, direction: "horizontal" },
  { color: GRAPHITE, left: "46.3%", width: "13%", delay: 0.2,    direction: "vertical"   },
  { color: BRASS,  left: "39.5%", width: "7%", delay: 0.6, direction: "vertical"   },
] as const;

const WIPE_DURATION  = 1.1;
const HOLD_DURATION  = 2800;
const ERASE_DURATION = 0.9;
const LOOP_PAUSE     = 750;

const clip = {
  vertical: {
    hidden:  "inset(0% 0% 100% 0%)", // falls from top
    visible: "inset(0% 0% 0% 0%)",
    erased:  "inset(100% 0% 0% 0%)", // disappears upward
  },
  horizontal: {
    hidden:  "inset(0% 0% 0% 100%)", // slides in from right
    visible: "inset(0% 0% 0% 0%)",
    erased:  "inset(0% 100% 0% 0%)", // disappears rightward
  },
} as const;

const trustBadges = [
  {
    label: "Qualité garantie",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"
        strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="9" r="7.5" />
        <polyline points="5.5,9.5 7.5,11.5 12.5,6.5" />
      </svg>
    ),
  },
  {
    label: "Matériaux durables",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"
        strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 15.5 C9 15.5 3 11 3 6.5 A6 6 0 0 1 15 6.5 C15 11 9 15.5 9 15.5 Z" />
        <line x1="9" y1="15.5" x2="9" y2="8" />
        <path d="M9 11 C9 11 6.5 9 6 7" />
      </svg>
    ),
  },
  {
    label: "Accompagnement personnalisé",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"
        strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="6" r="2.5" />
        <path d="M4.5 15.5 C4.5 12.5 6.5 10.5 9 10.5 C11.5 10.5 13.5 12.5 13.5 15.5" />
        <path d="M11.5 3 C12.8 3.7 13.5 5 13.5 6.5" strokeDasharray="1.2 1" />
      </svg>
    ),
  },
];

function useCurtainLoop(refs: React.RefObject<HTMLDivElement | null>[]) {
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

    // Animate a single strip
    const wipe = (
      ref: React.RefObject<HTMLDivElement | null>,
      i: number,
      from: string,
      to: string,
      duration: number
    ) => {
      if (!ref.current) return Promise.resolve();
      return animate(
        ref.current,
        { clipPath: [from, to] },
        { delay: strips[i].delay, duration, ease: [0.76, 0, 0.24, 1] }
      );
    };

    const runLoop = async () => {
      await sleep(300);

      while (!cancelled) {

        // ── PHASE 1: Reveal horizontal strips (DEEP + GREEN, indices 0 & 1) ──
        await Promise.all([
          wipe(refs[0], 0, clip.horizontal.hidden, clip.horizontal.visible, WIPE_DURATION),
          wipe(refs[1], 1, clip.horizontal.hidden, clip.horizontal.visible, WIPE_DURATION),
        ]);

        if (cancelled) break;

        // ── PHASE 2: Reveal vertical strips (BRASS + GRAPHITE, indices 2 & 3) ──
        // Starts only after phase 1 fully resolves
        await Promise.all([
          wipe(refs[2], 2, clip.vertical.hidden, clip.vertical.visible, WIPE_DURATION),
          wipe(refs[3], 3, clip.vertical.hidden, clip.vertical.visible, WIPE_DURATION),
        ]);

        if (cancelled) break;

        // ── HOLD: all four panels fully visible ──
        await sleep(HOLD_DURATION);
        if (cancelled) break;

        // ── ERASE: vertical first (reverse of reveal), then horizontal ──
        await Promise.all([
          wipe(refs[2], 2, clip.vertical.visible,   clip.vertical.erased,   ERASE_DURATION),
          wipe(refs[3], 3, clip.vertical.visible,   clip.vertical.erased,   ERASE_DURATION),
        ]);

        if (cancelled) break;

        await Promise.all([
          wipe(refs[1], 1, clip.horizontal.visible, clip.horizontal.erased, ERASE_DURATION),
          wipe(refs[0], 0, clip.horizontal.visible, clip.horizontal.erased, ERASE_DURATION),
        ]);

        if (cancelled) break;

        // ── PAUSE then reset ──
        await sleep(LOOP_PAUSE);
        if (cancelled) break;

        refs.forEach((ref, i) => {
          if (ref.current) {
            ref.current.style.clipPath = clip[strips[i].direction].hidden;
          }
        });
      }
    };

    runLoop();
    return () => { cancelled = true; };
  }, []);
}

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const panelY      = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  const stripRefs = useRef(strips.map(() => useRef<HTMLDivElement>(null)));
  useCurtainLoop(stripRefs.current);

  const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative min-h-screen overflow-hidden bg-background"
    >
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[45fr_55fr]">

        {/* ── LEFT ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex flex-col justify-center px-6 pb-8 pt-50 md:px-10 md:pb-20 lg:px-16"
        >
          <div className="max-w-xl space-y-1">

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-5xl font-medium uppercase leading-[1.05] tracking-tight text-foreground md:text-6xl"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Donnons vie
              <br />
              à vos{" "}
              <span className="font-extrabold">
                <PaintWord word="projets" />
              </span>
            </motion.h1>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.25 }}
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              <AnimatedText texts={heroSubtitles} className="h-10" speed={30} />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-12"
            >
              <a
                href="#services"
                onClick={(e) => handleScroll(e, "#services")}
                className="inline-flex items-center rounded-4xl bg-primary px-6 py-2 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-brand-blue/80"
              >
                Nos Services
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="inline-flex items-center rounded-4xl border border-foreground/20 px-6 py-2 text-sm font-semibold tracking-wide text-foreground transition-colors hover:border-green-primary hover:text-green-primary"
              >
                Devis Gratuit
              </a>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="pt-6"
            >
              <ul className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-x-5 md:gap-y-2">
                {trustBadges.map((badge) => (
                  <li key={badge.label} className="flex items-center gap-2 text-muted-foreground">
                    <span className="shrink-0 text-foreground/60">{badge.icon}</span>
                    <span className="text-xs font-medium leading-tight">{badge.label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </motion.div>

        {/* ── RIGHT: Sequenced curtain ── */}
        <motion.div
          style={{ y: panelY }}
          className="relative hidden overflow-hidden md:block"
          aria-hidden="true"
        >
          <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full opacity-[0.025]">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>

          {strips.map((strip, i) => (
            <div
              key={i}
              ref={stripRefs.current[i]}
              className="absolute bottom-0 h-full"
              style={{
                left: strip.left,
                width: strip.width,
                backgroundColor: strip.color,
                clipPath: clip[strip.direction].hidden,
                willChange: "clip-path",
              }}
            />
          ))}

          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
            style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
          />

          <div
            className="absolute inset-0"
            style={{ backgroundColor: SURFACE, opacity: 0.18 }}
          />
        </motion.div>

      </div>
    </section>
  );
}