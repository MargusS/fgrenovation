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

export function ContactSection() {
  return (
    <Section
      id="contact"
      maxHeight="h-auto md:min-h-[min(100vh,1130px)]"
      className="relative bg-brand-fir lg:py-16"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 pt-0">
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
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-[min(60vh,600px)] bg-stone-800 lg:h-full lg:min-h-[400px]"
          >
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1576.5847269344831!2d6.588468704657873!3d46.5280311124846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85e92c0fa7390cad%3A0x995bfa45a4e7f824!2sFG%20-%20R%C3%A9novation%20S%C3%A0rl!5e0!3m2!1ses!2ses!4v1781888939909!5m2!1ses!2ses`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation FG Rénovation"
              className="absolute inset-0 w-full h-full"
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
          className="mt-16 flex flex-col items-center gap-4 border-t border-stone-800 pt-10 text-center"
        >
          <span className="text-xs text-stone-500">
            © {new Date().getFullYear()} FG Rénovation. Tous droits réservés.
          </span>
          <span className="text-xs text-stone-500">Canton de Vaud, Suisse</span>
        </motion.div>
      </Container>
    </Section>
  );
}