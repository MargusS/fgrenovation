"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const textColor = variant === "light" ? "text-stone-100" : "text-foreground";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn("flex items-center gap-3", className)}
    >
      <div className={cn("flex items-baseline", textColor)}>
        <span className="text-xl font-semibold tracking-tight">FG</span>
        <span className="ml-2 text-sm font-light tracking-widest uppercase">
          Rénovation
        </span>
      </div>
    </motion.div>
  );
}
