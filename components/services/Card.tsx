"use client";

import HouseOutlineIcon from "@iconify-react/mdi/house-outline";
import PaintIcon from "@iconify-react/maki/paint";
import Tiles2Icon from "@iconify-react/fluent-mdl2/tiles-2";
import HeatingSquareIcon from "@iconify-react/iconoir/heating-square";
import NoiseReducerIcon from "@iconify-react/arcticons/noise-reducer";
import PhoenixPlafondIcon from "@iconify-react/cbi/phoenix-plafond";
import BathLinearIcon from "@iconify-react/solar/bath-linear";
import TableFurnitureIcon from "@iconify-react/mdi/table-furniture";
import { motion } from "framer-motion";
import type { Service } from "@/data/services";
import { fadeInUp } from "@/lib/motion";

const serviceIcons = {
  "renovation-complete": HouseOutlineIcon,
  "platrerie-peinture": PaintIcon,
  carrelage: Tiles2Icon,
  "chape-seche-chauffage": HeatingSquareIcon,
  isolation: NoiseReducerIcon,
  "faux-plafonds": PhoenixPlafondIcon,
  "salle-de-bains": BathLinearIcon,
  "amenagements-interieurs": TableFurnitureIcon,
} as const;

interface CardProps {
  service: Service;
  index: number;
}

// Extraemos las clases a un array para que sea mucho más legible
const cardStyles = [
  "mx-auto flex w-full max-w-[320px] items-center justify-center",
  "min-h-[180px] sm:min-h-[200px]",
  "rounded-2xl border border-black/5 bg-white",
  "p-6 sm:p-8",
  "shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-shadow duration-300",
  "hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
].join(" ");

export function Card({ service, index }: CardProps) {
  const Icon =
    serviceIcons[service.icon as keyof typeof serviceIcons] ??
    HouseOutlineIcon;

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06 }}
      className={cardStyles}
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center sm:gap-5">
        <div className="flex items-center justify-center text-brand-ink">
          <Icon className="h-9 w-9 text-brand-fir sm:h-10 sm:w-10" height="1em" />
        </div>

        <h3 className="max-w-[14ch] text-balance text-[1.25rem] font-semibold leading-[1.2] tracking-tight text-brand-ink sm:text-[1.35rem]">
          {service.title}
        </h3>
      </div>
    </motion.article>
  );
}