"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Container } from "./Container";

const navItems = [
  { label: "Accueil", href: "#accueil" },
  { label: "Nos Services", href: "#services" },
  { label: "Réalisations", href: "#projets" },
  { label: "À Propos", href: "#bureau" },
  { label: "Contact", href: "#contact" },
];

const HEADER_HIDE_OFFSET = 96;
const HEADER_PEEK_VISIBLE = 10;

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isHoverReveal, setIsHoverReveal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const lastScrollY = useRef(0);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // detect mobile (below md breakpoint)
    const mql = window.matchMedia('(max-width: 767px)');
    const handleMql = () => setIsMobile(mql.matches);
    handleMql();
    mql.addEventListener?.('change', handleMql);

    const onScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY.current;
      const isNearTop = currentY < HEADER_HIDE_OFFSET;

      if (isMobileMenuOpen) {
        setIsHeaderVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      if (isNearTop) {
        setIsHeaderVisible(true);
      } else if (isScrollingDown) {
        setIsHeaderVisible(false);
        setIsHoverReveal(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      mql.removeEventListener?.('change', handleMql);
    };
  }, [isMobileMenuOpen]);

  // lock body scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const shouldShowHeader = isHeaderVisible || isHoverReveal || isMobileMenuOpen;

  return (
    <>
      {/* Desktop top hover zone */}
      <div
        className="fixed left-0 right-0 top-0 z-[60] hidden h-6 md:block"
        onMouseEnter={() => {
          if (!isHeaderVisible && !isMobileMenuOpen) {
            setIsHoverReveal(true);
          }
        }}
      />

      <motion.header
        initial={prefersReducedMotion ? false : { y: -100, opacity: 0 }}
        animate={
          prefersReducedMotion
            ? { y: 0, opacity: 1 }
            : {
                y: shouldShowHeader ? 0 : `calc(-100% + ${HEADER_PEEK_VISIBLE}px)`,
                opacity: 1,
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
        onMouseEnter={() => {
          if (!isHeaderVisible && !isMobileMenuOpen) {
            setIsHoverReveal(true);
          }
        }}
        onMouseLeave={() => {
          if (!isHeaderVisible && !isMobileMenuOpen) {
            setIsHoverReveal(false);
          }
        }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-0 md:pt-4"
        style={{ padding: isMobile ? "0" : undefined }}
      >
        <div
          className="mx-auto transition-[border-color,background-color,box-shadow,padding] duration-300"
            style={{
            maxWidth: "1200px",
            borderRadius: isMobile ? "0px" : "9999px",
            // mobile: solid white background per request
            backgroundColor: isMobile
              ? "#ffffff"
              : shouldShowHeader
              ? "oklch(0.72 0.06 68 / 0.15)"
              : "oklch(0.72 0.06 68 / 0.10)",
            backdropFilter: isMobile ? undefined : "blur(10px) saturate(50%)",
            WebkitBackdropFilter: isMobile ? undefined : "blur(10px) saturate(50%)",
            border: isMobile ? undefined : "1px solid oklch(1 0 0 / 0.25)",
            boxShadow: isMobile
              ? undefined
              : shouldShowHeader
              ? "0 1px 0 0 oklch(1 0 0 / 0.5) inset, 0 -1px 0 0 oklch(0 0 0 / 0.04) inset, 0 8px 32px oklch(0.16 0.004 240 / 0.08)"
              : "0 1px 0 0 oklch(1 0 0 / 0.35) inset, 0 4px 18px oklch(0.16 0.004 240 / 0.05)",
          }}
        >
          <div
            className={cn(
              "px-6 md:px-8 transition-[padding] duration-300",
              shouldShowHeader ? "py-2 md:py-4" : "py-1.5 md:py-2",
              isMobile ? "py-0": ""
            )}
          >
            <nav
              className={cn(
                "flex items-center justify-between transition-[height] duration-300",
                shouldShowHeader ? "h-16 md:h-20" : "h-12 md:h-14"
              )}
            >
              {/* Logo */}
              <a
                href="#accueil"
                onClick={(e) => handleNavClick(e, "#accueil")}
                className={cn(
                  "shrink-0 origin-left transition-transform duration-300",
                  shouldShowHeader ? "scale-100" : "scale-[0.88]"
                )}
                aria-label="FG Rénovation — Accueil"
              >
                <Logo className="h-8 md:h-20" />
              </a>

              {/* Desktop nav */}
              <ul
                className={cn(
                  "hidden items-center gap-1 md:flex lg:gap-2 transition-opacity duration-200",
                  shouldShowHeader ? "opacity-100" : "opacity-90"
                )}
              >
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        "rounded-full font-medium tracking-wide text-foreground/70 transition-colors hover:bg-foreground/6 hover:text-foreground",
                        shouldShowHeader ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-[0.82rem]"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Desktop CTA */}
              <div className="hidden shrink-0 md:block">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className={cn(
                    "inline-flex items-center rounded-full bg-primary font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-80",
                    shouldShowHeader ? "px-5 py-2 text-sm" : "px-4 py-1.5 text-[0.82rem]"
                  )}
                >
                  Devis Gratuit
                </a>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50 flex h-8 w-8 items-center justify-center md:hidden"
                aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="flex flex-col gap-1.5">
                  <span
                    className={cn(
                      "block h-px w-4 md:w-5 bg-foreground transition-transform duration-300",
                      isMobileMenuOpen && "translate-y-[4px] rotate-45"
                    )}
                  />
                  <span
                    className={cn(
                      "block h-px w-4 md:w-5 bg-foreground transition-transform duration-300",
                      isMobileMenuOpen && "-translate-y-[3px] -rotate-45"
                    )}
                  />
                </div>
              </button>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Mobile right-side sliding drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* backdrop overlay */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ backgroundColor: 'oklch(0 0 0 / 0.35)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* drawer */}
            <motion.aside
              initial={prefersReducedMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={prefersReducedMotion ? undefined : { x: '100%' }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 h-full w-[85vw] max-w-[420px] md:hidden bg-background p-6 shadow-xl"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="absolute top-4 right-4 z-50 inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-foreground hover:bg-foreground/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
              <div className="flex h-full flex-col justify-between">
                <nav className="mt-2">
                  <ul className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0, x: 12 }}
                        transition={{ delay: prefersReducedMotion ? 0 : index * 0.06, duration: 0.28 }}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="block rounded-lg px-4 py-3 text-lg font-medium tracking-wide text-foreground/90 hover:bg-foreground/4"
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-4">
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, '#contact')}
                    className="block w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold tracking-wide text-primary-foreground"
                  >
                    Devis Gratuit
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}