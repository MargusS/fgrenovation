"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function FloatingDevisButton() {
	const [visible, setVisible] = useState(false);
	const [heroVisible, setHeroVisible] = useState(true);
	const [contactVisible, setContactVisible] = useState(false);
	const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const heroEl = document.getElementById("accueil");
		const contactEl = document.getElementById("contact");

		if (!heroEl || !contactEl) return;

		const heroObserver = new IntersectionObserver(
			([entry]) => {
				setHeroVisible(entry.isIntersecting);
			},
			{
				threshold: 0.08,
				rootMargin: "0px 0px -10% 0px",
			}
		);

		const contactObserver = new IntersectionObserver(
			([entry]) => {
				setContactVisible(entry.isIntersecting);
			},
			{
				threshold: 0.18,
			}
		);

		heroObserver.observe(heroEl);
		contactObserver.observe(contactEl);

		return () => {
			heroObserver.disconnect();
			contactObserver.disconnect();
			if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
		};
	}, []);

	useEffect(() => {
		const shouldShow = !heroVisible && !contactVisible;

		if (showTimeoutRef.current) {
			clearTimeout(showTimeoutRef.current);
			showTimeoutRef.current = null;
		}

		if (shouldShow) {
			showTimeoutRef.current = setTimeout(() => {
				setVisible(true);
			}, 140);
		} else {
			setVisible(false);
		}

		return () => {
			if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
		};
	}, [heroVisible, contactVisible]);

	return (
		<AnimatePresence>
			{visible && (
				<motion.a
					href="#contact"
					initial={{ opacity: 0, y: 22, scale: 0.94 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 14, scale: 0.98 }}
					transition={{
						duration: 0.42,
						ease: [0.22, 1, 0.36, 1],
					}}
					className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border border-black/10 bg-[color:var(--brand-fir)] px-4 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_16px_36px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:px-5 sm:text-[0.95rem]"
				>
					<span>Devis gratuit</span>
				</motion.a>
			)}
		</AnimatePresence>
	);
}