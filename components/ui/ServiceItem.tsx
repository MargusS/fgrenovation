"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";
import { fadeInUp } from "@/lib/motion";

interface ServiceItemProps {
  service: Service;
  index: number;
  className?: string;
}

const iconClassName = "h-7 w-7 md:h-8 md:w-8 xl:h-9 xl:w-9";

const serviceIcons: Record<string, React.ReactNode> = {
  platrerie: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      className={iconClassName}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="9" x2="9" y2="21" />
    </svg>
  ),
  peinture: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      className={iconClassName}
    >
      <path d="M19 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
      <path d="M12 11v8" />
      <path d="M8 21h8" />
    </svg>
  ),
  sols: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      className={iconClassName}
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  facades: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      className={iconClassName}
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 9h.01" />
      <path d="M15 9h.01" />
      <path d="M9 13h.01" />
      <path d="M15 13h.01" />
    </svg>
  ),
};

export function ServiceItem({ service, index, className }: ServiceItemProps) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08 }}
      className={cn("group flex h-full flex-col", className)}
    >
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="flex items-center gap-3.5">
          <span className="text-white/90">
            {serviceIcons[service.id]}
          </span>

          <motion.h3
            className="font-display text-[1.55rem] font-bold leading-none tracking-tight text-white md:text-[1.7rem] xl:text-[1.9rem]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {service.title}
          </motion.h3>
        </div>

        <p className="text-[0.92rem] leading-relaxed text-brand-surface/78 xl:text-[0.96rem]">
          {service.description}
        </p>

        <ul className="flex flex-wrap gap-2.5 pt-1">
          {service.features.map((feature) => (
            <li key={feature}>
              <span className="inline-flex items-center rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-[0.76rem] leading-none text-white/78 backdrop-blur-sm md:text-[0.8rem]">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}