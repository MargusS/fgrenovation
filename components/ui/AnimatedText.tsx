"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  texts: readonly string[];
  className?: string;
  speed?: number; // px/s — lower is slower
}

const SEPARATOR = "\u00A0\u00A0\u00A0\u00A0·\u00A0\u00A0\u00A0\u00A0";

export function AnimatedText({
  texts,
  className,
  speed = 50,
}: AnimatedTextProps) {
  const copy1Ref = useRef<HTMLSpanElement>(null);
  const [copyWidth, setCopyWidth] = useState(0);

  const fullText = texts.join(SEPARATOR) + SEPARATOR;

  // Measure the exact pixel width of one copy after render + font load
  useEffect(() => {
    const measure = () => {
      const w = copy1Ref.current?.offsetWidth ?? 0;
      if (w > 0) setCopyWidth(w);
    };
    measure();
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [fullText]);

  const duration = copyWidth > 0 ? copyWidth / speed : 0;

  return (
    <div className={cn("relative overflow-hidden whitespace-nowrap", className)}>

      {/* Fade masks */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
        style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
        style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

      {/*
        Outer wrapper: NO flex, NO inline-flex — plain block.
        Inner copies: inline, zero gap, sit adjacently in normal text flow.
        animation moves exactly -copyWidth px, which is the exact width of copy 1.
        When it resets to 0, copy 2 has taken copy 1's position visually → seamless.
      */}
      <div
        style={
          duration > 0
            ? {
                display: "block",
                whiteSpace: "nowrap",
                willChange: "transform",
                animation: `fg-marquee ${duration}s linear infinite`,
              }
            : { visibility: "hidden" }
        }
      >
        <span
          ref={copy1Ref}
          className="inline text-sm tracking-wide text-muted-foreground"
        >
          {fullText}
        </span>
        {/* Copy 2 — no space before it, aria-hidden, exact duplicate */}
        <span
          aria-hidden
          className="inline text-sm tracking-wide text-muted-foreground"
        >
          {fullText}
        </span>
        <span
          aria-hidden
          className="inline text-sm tracking-wide text-muted-foreground"
        >
          {fullText}
        </span>
      </div>

      <style>{`
        @keyframes fg-marquee {
          0%   { transform: translateX(0px); }
          100% { transform: translateX(${copyWidth > 0 ? `-${copyWidth}px` : "0px"}); }
        }
      `}</style>
    </div>
  );
}