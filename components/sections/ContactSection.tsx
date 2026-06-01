"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactItem } from "@/components/ui/ContactItem";
import { company } from "@/data/company";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="18" cy="6" r="1" fill="currentColor" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function ContactSection() {
  return (
    <Section id="contact" background="dark" className="relative overflow-hidden">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-10"
            >
              <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                Contact
              </span>
              <h2 className="text-2xl font-light tracking-tight text-stone-100 md:text-3xl lg:text-4xl text-balance">
                Parlons de votre projet
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-400">
                Vous avez un projet de rénovation ? Contactez-nous pour une première
                discussion sans engagement. Nous intervenons dans tout le canton de Vaud.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <ContactItem
                icon={<PhoneIcon />}
                label="Téléphone"
                value={company.contact.phone}
                href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
              />
              <ContactItem
                icon={<MailIcon />}
                label="Email"
                value={company.contact.email}
                href={`mailto:${company.contact.email}`}
              />
              <ContactItem
                icon={<LocationIcon />}
                label="Adresse"
                value={`${company.location.address}, ${company.location.city}`}
              />
              <ContactItem
                icon={<ClockIcon />}
                label="Horaires"
                value={company.hours.weekdays}
              />
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex gap-4"
            >
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-stone-700 text-stone-400 transition-colors hover:border-olive-600 hover:text-olive-500"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-stone-700 text-stone-400 transition-colors hover:border-olive-600 hover:text-olive-500"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative aspect-square overflow-hidden bg-stone-800 lg:aspect-auto lg:h-full lg:min-h-[400px]"
          >
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22008.73!2d${company.location.coordinates.lng}!3d${company.location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c31b3c63e1791%3A0x5f1e4f8f8f8f8f8f!2sBussigny%2C%20Switzerland!5e0!3m2!1sen!2sch!4v1234567890`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation FG Rénovation"
              className="absolute inset-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-foreground/20" />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 text-center md:flex-row md:text-left"
        >
          <span className="text-xs text-stone-500">
            © {new Date().getFullYear()} FG Rénovation. Tous droits réservés.
          </span>
          <span className="text-xs text-stone-500">
            Canton de Vaud, Suisse
          </span>
        </motion.div>
      </Container>
    </Section>
  );
}
