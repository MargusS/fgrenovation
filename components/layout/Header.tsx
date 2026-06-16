"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Container } from "./Container";

const navItems = [
  { label: "Accueil",      href: "#accueil"  },
  { label: "Nos Services", href: "#services" },
  { label: "Réalisations", href: "#projets"  },
  { label: "À Propos",     href: "#bureau"   },
  { label: "Contact",      href: "#contact"  },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4"
      >
        {/*
          ── Liquid glass pill ──
          Always visible from the top — no scroll trigger.
          Layers:
            1. backdrop-filter blur + saturate — frosted lens
            2. semi-transparent surface fill   — glass body
            3. inset box-shadow highlights     — light refraction rim
        */}
        <div
          className="mx-auto"
          style={{
            maxWidth: "1200px",
            borderRadius: "9999px",
            backgroundColor: "oklch(0.72 0.06 68 / 0.15)",
            backdropFilter: "blur(10px) saturate(50%)",
            WebkitBackdropFilter: "blur(10px) saturate(50%)",
            border: "1px solid oklch(1 0 0 / 0.25)",
            boxShadow:
              "0 1px 0 0 oklch(1 0 0 / 0.5) inset, 0 -1px 0 0 oklch(0 0 0 / 0.04) inset, 0 8px 32px oklch(0.16 0.004 240 / 0.08)",
          }}
        >
          <div className="px-6 md:px-8 py-2 md:py-4">
            <nav className="flex h-16 items-center justify-between md:h-20">

              {/* Logo */}
              <a
                href="#accueil"
                onClick={(e) => handleNavClick(e, "#accueil")}
                className="shrink-0"
                aria-label="FG Rénovation — Accueil"
              >
                <Logo />
              </a>

              {/* Desktop nav */}
              <ul className="hidden items-center gap-1 md:flex lg:gap-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="rounded-full px-4 py-1.5 text-sm font-medium tracking-wide text-foreground/70 transition-colors hover:bg-foreground/6 hover:text-foreground"
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
                  className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-80"
                >
                  Devis Gratuit
                </a>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
                aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="flex flex-col gap-1.5">
                  <span className={cn(
                    "block h-px w-5 bg-foreground transition-transform duration-300",
                    isMobileMenuOpen && "translate-y-[4px] rotate-45"
                  )} />
                  <span className={cn(
                    "block h-px w-5 bg-foreground transition-transform duration-300",
                    isMobileMenuOpen && "-translate-y-[3px] -rotate-45"
                  )} />
                </div>
              </button>

            </nav>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              backgroundColor: "oklch(0.72 0.06 68 / 0.20)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
            }}
          >
            <Container className="flex h-full flex-col items-center justify-center gap-10">
              <nav>
                <ul className="space-y-2 text-center">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ delay: index * 0.07, duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="block rounded-2xl px-8 py-3 text-2xl font-light tracking-wide text-foreground transition-colors hover:bg-foreground/5"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, "#contact")}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.07 + 0.05 }}
                className="inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-80"
              >
                Devis Gratuit
              </motion.a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}