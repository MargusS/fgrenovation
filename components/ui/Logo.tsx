"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function Logo({ className, variant = "default" }: LogoProps) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn("flex items-center", className)}
    >
      <Image
        src="/logo-short-version.svg"
        alt="FG Rénovation"
        width={40}
        height={40}
        priority
        className="block h-10 w-auto object-contain lg:hidden"
      />

      <Image
        src={"/logo.svg"}
        alt="FG Rénovation"
        width={140}
        height={40}
        priority
        className="hidden h-14 w-auto object-contain md:h-18 lg:block"
      />
    </motion.div>
  );
}