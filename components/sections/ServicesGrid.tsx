"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { ServiceItem } from "@/components/ui/ServiceItem";
import { services } from "@/data/services";
import { staggerContainer } from "@/lib/motion";

export function ServicesGrid() {
	return (
		<Section
			id="services"
			className="relative !py-0 text-brand-ink"
		>
			<div className="h-auto md:h-full grid grid-cols-1 lg:grid-cols-[2fr_1fr]">

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="h-auto md:h-full grid grid-cols-1 bg-brand-fir md:grid-cols-2"
				>
					{services.slice(0, 4).map((service, index) => (
						<div
							key={service.id}
							className={[
								"flex px-5 py-12 md:px-6 md:py-12 xl:px-8 xl:py-14",
								"border-white/80",
								"border-b-[1.5px]",
								"md:border-r-[1.5px] md:[&:nth-child(2n)]:border-r-0",
								index >= 2 ? "md:border-b-0" : "",
							].join(" ")}
						>
							<ServiceItem service={service} index={index} className="h-auto w-full" />
						</div>
					))}
				</motion.div>

				<div className="h-auto md:h-full order-first lg:order-last flex bg-brand-bg px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-12 xl:px-14">
					<div className="flex w-full items-center">
						<div className="w-full space-y-5">
							<span className="block text-[0.72rem] font-medium uppercase tracking-[0.24em] text-brand-ink-muted">
								Savoir-faire
							</span>

							<h2
								className="font-display text-3xl leading-[0.92] tracking-tight text-brand-ink md:text-4xl xl:text-[3.25rem]"
								style={{ fontFamily: "var(--font-fraunces)" }}
							>
								Nos domaines d&apos;intervention
							</h2>

							<p className="pt-2 text-sm leading-relaxed text-brand-ink-muted md:text-[1rem]">
								Chaque projet est unique. Nous nous adaptons à vos besoins spécifiques
								et proposons des solutions sur mesure, que ce soit pour une rénovation
								partielle ou un chantier complet.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}