"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const colors = [
  "#122A22", // green-primary
  "#2F5C4B", // grey-secondary
  "#C7A97A", // brass
];

const LETTER_DELAY = 0.2;   // stagger between each letter
const FILL_DURATION = 1;   // how long each letter takes to fill

interface PaintWordProps {
  word: string;
}

function PaintLetter({
  letter,
  currentColor,
  nextColor,
  delay,
  onComplete,
}: {
  letter: string;
  currentColor: string;
  nextColor: string;
  delay: number;
  onComplete?: () => void;
}) {
  return (
    // Wrapper — relative so both layers stack identically
    <span className="relative inline-block ">

      {/* Bottom layer — current color, always fully visible */}
      <span style={{ color: currentColor }} aria-hidden>
        {letter}
      </span>

      {/* Top layer — new color, revealed top-to-bottom via clipPath */}
      <motion.span
        className="absolute inset-0"
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{
          delay,
          duration: FILL_DURATION,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ color: nextColor }}
        onAnimationComplete={onComplete}
        aria-hidden
      >
        {letter}
      </motion.span>

    </span>
  );
}

export function PaintWord({ word }: PaintWordProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setNextIndex((currentIndex + 1) % colors.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleLastLetterComplete = () => {
    if (nextIndex !== null) {
      setCurrentIndex(nextIndex);
      setNextIndex(null);
    }
  };

  const isAnimating = nextIndex !== null;

  return (
    <span className="inline-flex" aria-label={word}>
      {word.split("").map((letter, i) => {
        const isLast = i === word.length - 1;

        if (isAnimating) {
          return (
            <PaintLetter
              key={`${i}-${nextIndex}`}
              letter={letter}
              currentColor={colors[currentIndex]}
              nextColor={colors[nextIndex!]}
              delay={i * LETTER_DELAY}
              onComplete={isLast ? handleLastLetterComplete : undefined}
            />
          );
        }

        return (
          <span key={i} style={{ color: colors[currentIndex] }}>
            {letter}
          </span>
        );
      })}
    </span>
  );
}