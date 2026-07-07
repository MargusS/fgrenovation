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
      className="mx-auto flex min-h-[220px] w-[80%] max-w-[360px] items-center justify-center rounded-[28px] border border-black/8 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)] min-[640px]:min-h-[230px] min-[640px]:w-full min-[640px]:max-w-[340px] min-[640px]:p-5 min-[1013px]:min-h-[250px] min-[1013px]:max-w-[420px] min-[1013px]:p-6 min-[1533px]:min-h-[280px] min-[1533px]:max-w-[320px]"
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex items-center justify-center text-brand-ink">
          <Icon className="h-10 w-10 text-brand-fir sm:h-11 sm:w-11" height="1em" />
        </div>

        <h3 className="max-w-[12ch] text-balance text-[1.45rem] font-semibold leading-[1.15] tracking-tight text-brand-ink sm:text-[1.65rem]">
          {service.title}
        </h3>
      </div>
    </motion.article>
  );
}
