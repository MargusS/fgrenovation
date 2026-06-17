"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function Logo({ className = "", variant = "default" }: LogoProps) {
  const src = variant === "light" ? "/logo-light.svg" : "/logo.svg";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn("flex items-center", className)}
    >
      <Image
        src={src}
        alt="FG Rénovation"
        width={140}
        height={40}
        priority
        className={cn("w-auto object-contain", className)}
      />
    </motion.div>
  );
}