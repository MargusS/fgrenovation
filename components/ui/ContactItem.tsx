"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/motion";

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  className?: string;
}

export function ContactItem({
  icon,
  label,
  value,
  href,
  className,
}: ContactItemProps) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 text-olive-600">{icon}</span>
      <div className="space-y-1">
        <span className="block text-xs font-medium uppercase tracking-[0.15em] text-stone-400">
          {label}
        </span>
        <span className="block text-sm text-stone-100">{value}</span>
      </div>
    </div>
  );

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("group", className)}
    >
      {href ? (
        <a
          href={href}
          className="block transition-opacity hover:opacity-70"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
}
