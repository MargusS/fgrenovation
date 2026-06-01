"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  title,
  subtitle,
  className,
  align = "left",
}: SectionTitleProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {subtitle && (
        <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {subtitle}
        </span>
      )}
      <h2 className="text-2xl font-light tracking-tight text-foreground md:text-3xl lg:text-4xl text-balance">
        {title}
      </h2>
    </motion.div>
  );
}
