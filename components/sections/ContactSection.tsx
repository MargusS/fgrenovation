"use client";

import OutlineFacebookIcon from "@iconify-react/ic/outline-facebook";
import GeoLocationOutlineIcon from "@iconify-react/healthicons/geo-location-outline";
import InstagramIcon from '@iconify-react/mdi/instagram';
import LinkedinIcon from '@iconify-react/mdi/linkedin';
import PhoneIcon from "@iconify-react/mdi-light/phone";
import ClockIcon from "@iconify-react/mdi-light/clock";
import MailOutlineRoundedIcon from '@iconify-react/material-symbols-light/mail-outline-rounded';
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactItem } from "@/components/ui/ContactItem";
import { company } from "@/data/company";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function ContactSection() {
  const socialLinks = [
    {
      href: company.social.facebook,
      label: "Facebook",
      icon: OutlineFacebookIcon,
    },
    {
      href: company.social.instagram,
      label: "Instagram",
      icon: InstagramIcon,
    },
    {
      href: company.social.linkedin,
      label: "LinkedIn",
      icon: LinkedinIcon,
    },
  ] as const;

  return (
    <Section
      id="contact"
      className="relative bg-[#2B4537] lg:py-16"
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
              <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-white">
                Contact
              </span>
              <h2 className="text-2xl font-light tracking-tight text-white md:text-3xl lg:text-4xl text-balance">
                Parlons de votre projet
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/90">
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
                icon={<PhoneIcon height="1.6em" />}
                label="Téléphone"
                value={company.contact.phone}
                href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
              />
              <ContactItem
                icon={<MailOutlineRoundedIcon  height="1.6em" />}
                label="Email"
                value={company.contact.email}
                href={`mailto:${company.contact.email}`}
              />
              <ContactItem
                icon={<GeoLocationOutlineIcon height="1.6em" />}
                label="Adresse"
                value={`${company.location.address}, ${company.location.city}`}
              />
              <ContactItem
                icon={<ClockIcon height="1.6em" />}
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
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-75"
                  aria-label={link.label}
                >
                  <link.icon height="1.5em" />
                </a>
              ))}
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
          className="mt-16 flex flex-col items-center gap-4 border-t border-white/20 pt-10 text-center"
        >
          <span className="text-xs text-white">
            © {new Date().getFullYear()} FG Rénovation. Tous droits réservés.
          </span>
          <span className="text-xs text-white">Canton de Vaud, Suisse</span>
        </motion.div>
      </Container>
    </Section>
  );
}
