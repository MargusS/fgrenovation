"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Container } from "./Container";

const navItems = [
  { label: "Projets", href: "#projets" },
  { label: "Services", href: "#services" },
  { label: "Bureau", href: "#bureau" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-sm"
            : "bg-transparent"
        )}
      >
        <Container size="wide">
          <nav className="flex h-16 items-center justify-between md:h-20">
            <a href="#" onClick={(e) => handleNavClick(e, "#accueil")}>
              <Logo variant={isScrolled ? "default" : "default"} />
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    "block h-px w-5 bg-foreground transition-transform duration-300",
                    isMobileMenuOpen && "translate-y-[4px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-5 bg-foreground transition-transform duration-300",
                    isMobileMenuOpen && "-translate-y-[3px] -rotate-45"
                  )}
                />
              </div>
            </button>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <Container className="flex h-full flex-col items-center justify-center">
              <nav>
                <ul className="space-y-6 text-center">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="text-2xl font-light tracking-wide text-foreground"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
