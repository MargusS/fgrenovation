"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { projects } from "@/data/projects";

const HEADER_OFFSET = 0;
const AUTOPLAY_INTERVAL = 4000;

export function ProjectsShowcase() {
	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const touchStartX = useRef<number>(0);
	const touchStartY = useRef<number>(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const isInView = useInView(containerRef, { once: true, margin: "-100px" });

	const startAutoplay = useCallback(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setActiveIndex(i => (i + 1) % projects.length);
		}, AUTOPLAY_INTERVAL);
	}, []);

	const handleManualChange = useCallback((index: number) => {
		setActiveIndex(index);
		startAutoplay();
	}, [startAutoplay]);

	const goToNext = useCallback(() => handleManualChange((activeIndex + 1) % projects.length), [activeIndex, handleManualChange]);
	const goToPrev = useCallback(() => handleManualChange((activeIndex - 1 + projects.length) % projects.length), [activeIndex, handleManualChange]);

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
		touchStartY.current = e.touches[0].clientY;
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		const dx = e.changedTouches[0].clientX - touchStartX.current;
		const dy = e.changedTouches[0].clientY - touchStartY.current;
		if (Math.abs(dx) < Math.abs(dy) * 0.8) return;
		if (Math.abs(dx) < 40) return;
		dx < 0 ? goToNext() : goToPrev();
	};

	useEffect(() => {
		startAutoplay();
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [startAutoplay]);

	return (
		<Section id="projets" className="py-12 md:py-0 xl:py-0 h-[min(100vh,1130px)] overflow-hidden">
			<div ref={containerRef} className="min-h-[300vh]">

				<div
					className="sticky overflow-hidden grid grid-rows-[1fr_1fr] xl:grid-cols-[40%_60%] xl:grid-rows-1"
					style={{
						top: HEADER_OFFSET,
						height: `min(calc(100vh - ${HEADER_OFFSET}px), 1130px)`,
					}}
				>

					<div className="relative flex h-full items-center px-6 pb-8 pt-8 md:px-10 xl:px-16 xl:pb-20 xl:pt-12 bg-background z-20">
						<div className="flex w-full h-full flex-col justify-between">

							<div className="flex flex-col space-y-10 md:space-y-20 mt-auto xl:mt-0">

								<div className="space-y-3">
									<span className="block text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-[0.95rem]">
										Réalisations
									</span>
									<div className="flex flex-wrap items-end justify-between gap-6">
										<h2 className="text-3xl font-bold uppercase leading-[1.1] tracking-tight text-foreground xl:text-5xl"
											style={{ fontFamily: "var(--font-epilogue)" }}>
											Projets sélectionnés
										</h2>
										<span className="shrink-0 text-base tabular-nums text-muted-foreground md:text-lg transition-colors">
											{String(activeIndex + 1).padStart(2, "0")} /{" "}
											{String(projects.length).padStart(2, "0")}
										</span>
									</div>
								</div>

								<div className="grid">
									{projects.map((project, index) => (
										<motion.div
											key={`text-${project.id}`}
											initial={{ opacity: 0, y: 20 }}
											animate={{
												opacity: index === activeIndex ? 1 : 0,
												y: index === activeIndex ? 0 : 20,
												pointerEvents: index === activeIndex ? "auto" : "none",
											}}
											transition={{ duration: 0.5, delay: 0.08 }}
											className="col-start-1 row-start-1 space-y-4"
											aria-hidden={index !== activeIndex}
										>
											<div className="flex items-center gap-3">
												<span
													className="text-sm font-medium uppercase tracking-[0.15em] md:text-[0.95rem]"
													style={{ color: "var(--brand-emerald)" }}
												>
													{project.category}
												</span>
												<span className="text-sm tabular-nums text-muted-foreground md:text-[0.95rem]">
													{project.year}
												</span>
											</div>
											<h3 className="text-2xl font-light tracking-tight text-foreground md:text-3xl xl:text-4xl">
												{project.title}
											</h3>
											<p className="max-w-[34ch] text-justify text-base leading-relaxed text-muted-foreground hyphens-auto md:max-w-[100ch] md:text-lg">
												{project.description}
											</p>
										</motion.div>
									))}
								</div>

							</div>

							<div className="mt-10 hidden items-center justify-center gap-3 xl:flex">
								{projects.map((_, indicatorIndex) => (
									<button
										key={`indicator-desk-${indicatorIndex}`}
										onClick={() => handleManualChange(indicatorIndex)}
										className="h-[6px] rounded-full transition-all duration-300 cursor-pointer"
										style={{
											width: indicatorIndex === activeIndex ? "3.5rem" : "2rem",
											backgroundColor: indicatorIndex === activeIndex
												? "var(--brand-forest)"
												: "oklch(0.36 0.005 240 / 0.25)",
										}}
										aria-label={`Voir le projet ${indicatorIndex + 1}`}
									/>
								))}
							</div>

						</div>
					</div>

					<div
						className="relative flex h-full flex-col overflow-hidden bg-brand-bg cursor-pointer z-10"
						onClick={goToNext}
						onTouchStart={handleTouchStart}
						onTouchEnd={handleTouchEnd}
					>
						<div className="relative min-h-0 flex-1 w-full">
							{projects.map((project, index) => (
								<motion.div
									key={`img-${project.id}`}
									initial={{ opacity: 0 }}
									animate={{
										opacity: index === activeIndex ? 1 : 0,
										pointerEvents: index === activeIndex ? "auto" : "none",
									}}
									transition={{ duration: 0.55 }}
									className="absolute inset-0 grid grid-cols-1 grid-rows-2 min-[426px]:grid-cols-2 min-[426px]:grid-rows-1"
								>
									<motion.div
										initial={{ scale: 1.03 }}
										animate={{ scale: index === activeIndex ? 1 : 1.03 }}
										transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
										className="relative overflow-hidden"
									>
										<img
											src={project.imageBefore}
											alt={`${project.title} avant`}
											className="h-full w-full object-cover object-center"
										/>
										<span className="absolute bottom-4 right-4 rounded-full bg-stone-100/75 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-stone-700 backdrop-blur-md">
											Avant
										</span>
									</motion.div>

									<motion.div
										initial={{ scale: 1.03 }}
										animate={{ scale: index === activeIndex ? 1 : 1.03 }}
										transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
										className="relative overflow-hidden"
									>
										<img
											src={project.imageAfter}
											alt={`${project.title} après`}
											className="h-full w-full object-cover object-center"
										/>
										<span className="absolute bottom-4 right-4 rounded-full bg-stone-100/75 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-stone-700 backdrop-blur-md">
											Après
										</span>
									</motion.div>
								</motion.div>
							))}
						</div>

						<div
							className="flex shrink-0 items-center justify-center gap-3 py-12 xl:hidden relative z-20"
							onClick={(e) => e.stopPropagation()}
						>
							{projects.map((_, indicatorIndex) => (
								<button
									key={`indicator-mob-${indicatorIndex}`}
									onClick={() => handleManualChange(indicatorIndex)}
									className="h-[6px] rounded-full transition-all duration-300 cursor-pointer"
									style={{
										width: indicatorIndex === activeIndex ? "3.5rem" : "2rem",
										backgroundColor: indicatorIndex === activeIndex
											? "var(--brand-forest)"
											: "oklch(0.36 0.005 240 / 0.25)",
									}}
									aria-label={`Voir le projet ${indicatorIndex + 1}`}
								/>
							))}
						</div>
					</div>

				</div>
			</div>
		</Section>
	);
}