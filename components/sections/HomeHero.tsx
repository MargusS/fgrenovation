"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { heroSubtitles } from "@/data/company";
import { fadeInUp, fadeIn } from "@/lib/motion";
import { PaintWord } from "@/components/ui/PaintWord";

// 1. Añade aquí las rutas de tus imágenes cuando las subas a la carpeta /public
const HERO_IMAGES = [
	"/media/hero1.png",
	"/media/hero2.jpg",
	"/media/hero3.jpg",
];

const trustBadges = [
	{
		label: "Entreprise formatrice",
		icon: (
			<svg
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.25"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M1.75 6.2 9 2.5l7.25 3.7L9 9.9 1.75 6.2Z" />
				<path d="M4.2 7.5v3.1c0 .6 2.1 2.15 4.8 2.15s4.8-1.55 4.8-2.15V7.5" />
				<path d="M16.25 7v3.75" />
				<circle cx="16.25" cy="11.9" r="0.65" fill="currentColor" stroke="none" />
			</svg>
		),
	},
	{
		label: "Qualité garantie",
		icon: (
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"
				strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
				<circle cx="9" cy="9" r="7.5" />
				<polyline points="5.5,9.5 7.5,11.5 12.5,6.5" />
			</svg>
		),
	},
	{
		label: "Respect des délais",
		icon: (
			<svg
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.25"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<rect x="2.25" y="3.25" width="13.5" height="11.5" rx="1.5" />
				<path d="M5.2 1.75v3" />
				<path d="M12.8 1.75v3" />
				<path d="M2.25 6.3h13.5" />
				<path d="M5.3 9h.01" />
				<path d="M9 9h.01" />
				<path d="M12.7 9h.01" />
			</svg>
		),
	},
	{
		label: "Matériaux durables",
		icon: (
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"
				strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
				<path d="M9 15.5 C9 15.5 3 11 3 6.5 A6 6 0 0 1 15 6.5 C15 11 9 15.5 9 15.5 Z" />
				<line x1="9" y1="15.5" x2="9" y2="8" />
				<path d="M9 11 C9 11 6.5 9 6 7" />
			</svg>
		),
	},
	{
		label: "Accompagnement personnalisé",
		icon: (
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"
				strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
				<circle cx="9" cy="6" r="2.5" />
				<path d="M4.5 15.5 C4.5 12.5 6.5 10.5 9 10.5 C11.5 10.5 13.5 12.5 13.5 15.5" />
				<path d="M11.5 3 C12.8 3.7 13.5 5 13.5 6.5" strokeDasharray="1.2 1" />
			</svg>
		),
	},
];

export function HomeHero() {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const textY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

	// Estado para el slideshow
	const [currentImg, setCurrentImg] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
		}, 5000); // Cambia de imagen cada 5 segundos
		return () => clearInterval(timer);
	}, []);

	const handleScroll = (e: React.MouseEvent, href: string) => {
		e.preventDefault();
		document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section
			ref={sectionRef}
			id="accueil"
			className="relative py-0 h-[min(100vh,1130px)] overflow-hidden bg-background"
		>
			<div className="grid h-full w-full grid-cols-1 grid-rows-[65%_45%] lg:grid-cols-[50%_50%] lg:grid-rows-1">

				<motion.div
					style={{ opacity: textOpacity, y: textY }}
					className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-0 pt-20 text-center lg:items-start lg:px-16 lg:pb-20 lg:pt-50 lg:text-left xl:px-20"
				>
					<div className="w-full space-y-1 lg:max-w-xl">
						<motion.h1
							variants={fadeInUp}
							initial="hidden"
							animate="visible"
							className="text-[clamp(2.25rem,10vw,3rem)] font-bold uppercase leading-[1.05] tracking-tight text-foreground lg:text-6xl"
							style={{ fontFamily: "var(--font-epilogue)" }}
						>
							Donnons vie
							<br />
							à vos{" "}
							<span className="font-extrabold">
								<PaintWord word="projets" />
							</span>
						</motion.h1>

						<motion.div
							variants={fadeIn}
							initial="hidden"
							animate="visible"
							transition={{ delay: 0.25 }}
							className="text-base leading-relaxed text-muted-foreground lg:text-lg"
						>
							<AnimatedText texts={heroSubtitles} className="h-10" speed={30} />
						</motion.div>

						<motion.div
							variants={fadeInUp}
							initial="hidden"
							animate="visible"
							transition={{ delay: 0.4 }}
							className="flex flex-wrap items-center justify-center gap-3 pt-6 lg:justify-start"
						>
							<a
								href="#services"
								onClick={(e) => handleScroll(e, "#services")}
								className="inline-flex items-center rounded-4xl bg-[#2B4537] px-6 py-2 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-brand-blue/80"
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

						<motion.div
							variants={fadeIn}
							initial="hidden"
							animate="visible"
							transition={{ delay: 0.6 }}
							className="pt-6"
						>
							<ul className="grid grid-cols-1 gap-2 sm:justify-items-center sm:gap-x-4 lg:flex lg:flex-wrap lg:items-start lg:gap-x-5 lg:gap-y-2">
								{trustBadges.map((badge) => (
									<li key={badge.label} className="flex items-center justify-center gap-2 text-muted-foreground sm:justify-start">
										<span className="shrink-0 text-foreground/60">{badge.icon}</span>
										<span className="text-xs font-medium leading-tight">{badge.label}</span>
									</li>
								))}
							</ul>
						</motion.div>
					</div>
				</motion.div>

				<div className="relative -mt-[1px] h-full w-full overflow-hidden bg-muted/20">
					<AnimatePresence>
						<motion.div
							key={currentImg}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 1.2, ease: "easeInOut" }}
							className="absolute inset-0"
						>
							<img
								src={HERO_IMAGES[currentImg]}
								alt={`Projet rénovation ${currentImg + 1}`}
								className="h-full w-full object-cover object-center"
							/>
						</motion.div>
					</AnimatePresence>

					<div
						className="pointer-events-none absolute inset-0 hidden lg:block"
						style={{
							background: `
                radial-gradient(ellipse 150% 120% at -10% 110%, var(--background) 25%, transparent 65%),
                linear-gradient(to right, var(--background) 0%, transparent 30%)
              `
						}}
					/>

					<div
						className="pointer-events-none absolute inset-0 lg:hidden"
						style={{
							background: "linear-gradient(to bottom, var(--background) 0%, transparent 40%)"
						}}
					/>
				</div>

			</div>
		</section>
	);
}