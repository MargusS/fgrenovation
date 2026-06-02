"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { heroSubtitles } from "@/data/company";
import { fadeInUp, fadeIn } from "@/lib/motion";
import { PaintWord } from "@/components/ui/PaintWord";

const trustBadges = [
	{ icon: "🛡", label: "Qualité garantie" },
	{ icon: "🌿", label: "Matériaux durables" },
	{ icon: "🤝", label: "Accompagnement personnalisé" },
];

export function HomeHero() {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const textY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
	const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

	const handleScroll = (e: React.MouseEvent, href: string) => {
		e.preventDefault();
		document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section
			ref={sectionRef}
			id="accueil"
			className="relative min-h-screen overflow-hidden bg-background"
		>
			{/* ── Two-column grid ── */}
			<div className="grid min-h-screen grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[45fr_55fr]">

				{/* ── LEFT: Text content ── */}
				<motion.div
					style={{ opacity: textOpacity, y: textY }}
					className="relative z-10 flex flex-col justify-center px-6 pb-8 pt-50 md:px-10 md:pb-20 lg:px-16"
				>
					<div className="max-w-xl space-y-1">

						{/* Headline */}
						<motion.h1
							variants={fadeInUp}
							initial="hidden"
							animate="visible"
							className="text-5xl font-medium uppercase leading-[1.05] tracking-tight text-foreground md:text-6xl"
							style={{ fontFamily: "var(--font-fraunces)" }}
						>
							Donnons vie
							<br />
							à vos <span className="font-extrabold"> <PaintWord word="projets" /></span>
						</motion.h1>

						{/* Animated subtitle */}
						<motion.div
							variants={fadeIn}
							initial="hidden"
							animate="visible"
							transition={{ delay: 0.25 }}
							className="text-base leading-relaxed text-muted-foreground md:text-lg"
						>
							<AnimatedText
								texts={heroSubtitles}
								className="h-10"
								speed={30}
							/>
						</motion.div>

						{/* CTA buttons */}
						<motion.div
							variants={fadeInUp}
							initial="hidden"
							animate="visible"
							transition={{ delay: 0.4 }}
							className="flex flex-wrap items-center gap-3 pt-12"
						>
							<a
								href="#services"
								onClick={(e) => handleScroll(e, "#services")}
								className="inline-flex items-center rounded-4xl bg-secondary px-6 py-2 text-sm font-semibold tracking-wide text-secondary-foreground transition-colors hover:bg-brand-blue/80"
							>
								Nos Services
							</a>
							<a
								href="#contact"
								onClick={(e) => handleScroll(e, "#contact")}
								className="inline-flex items-center rounded-4xl border border-foreground/20 px-6 py-2 text-sm font-semibold tracking-wide text-foreground transition-colors hover:border-green-primary hover:text-green-primary"
							>
								Devis Gratuit
							</a>
						</motion.div>

						{/* Trust badges */}
						<motion.div
							variants={fadeIn}
							initial="hidden"
							animate="visible"
							transition={{ delay: 0.6 }}
							className="flex flex-wrap items-center gap-2 pt-6"
						>
							{trustBadges.map((badge) => (
								<div key={badge.label} className="flex items-center gap-2">
									<span className="text-lg">{badge.icon}</span>
									<span className="text-xs font-medium leading-tight text-muted-foreground">
										{badge.label}
									</span>
								</div>
							))}
						</motion.div>

					</div>
				</motion.div>

				{/* ── RIGHT: Image ── */}
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
					className="relative h-[50vh] md:h-auto"
				>
					<motion.div
						style={{ scale: imageScale }}
						className="absolute inset-0 origin-center"
					>
						<img
							src="/media/hero-image.png"
							alt="Projet de rénovation FG Rénovation"
							className="h-full w-full object-cover object-center"
						/>
						{/* Left-edge fade so image blends into the text column */}
						<div className="absolute inset-0 from-transparent via-transparent to-background md:bg-gradient-to-r md:from-background md:via-background/10 md:to-transparent" />
					</motion.div>
				</motion.div>

			</div>
		</section>
	);
}