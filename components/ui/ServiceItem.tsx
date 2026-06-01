"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";
import { fadeInUp } from "@/lib/motion";

interface ServiceItemProps {
  service: Service;
  index: number;
  className?: string;
}

const serviceIcons: Record<string, React.ReactNode> = {
  platrerie: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="h-6 w-6"
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
      strokeWidth="1"
      className="h-6 w-6"
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
      strokeWidth="1"
      className="h-6 w-6"
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
      strokeWidth="1"
      className="h-6 w-6"
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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "group border-t border-border py-8 md:py-10",
        className
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
        <div className="flex items-center gap-4 md:w-48 md:flex-shrink-0">
          <span className="text-olive-600">
            {serviceIcons[service.id]}
          </span>
          <h3 className="text-lg font-medium tracking-tight text-foreground">
            {service.title}
          </h3>
        </div>
        <div className="flex-1 space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {service.description}
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <span className="h-1 w-1 rounded-full bg-olive-600" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
