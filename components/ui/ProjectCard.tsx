"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";
import { fadeInUp, imageReveal } from "@/lib/motion";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("group", className)}
    >
      <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-muted md:aspect-[16/10]">
        <motion.div
          variants={imageReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="h-full w-full"
        >
          <img
            src={project.imageAfter}
            alt={`${project.title} après`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
      </div>
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {project.category}
          </span>
          <span className="text-xs tabular-nums text-muted-foreground">
            {project.year}
          </span>
        </div>
        <h3 className="text-xl font-light tracking-tight text-foreground md:text-2xl">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>
    </motion.article>
  );
}
