import { company } from "@/data/company";

const SITE_URL = "https://www.fgrenov.ch";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: company.name,
    url: SITE_URL,
    image: `${SITE_URL}/logo.svg`,
    logo: `${SITE_URL}/logo.svg`,
    telephone: company.contact.phone,
    email: company.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue du Lac 22b",
      postalCode: "1020",
      addressLocality: "Renens",
      addressRegion: "Vaud",
      addressCountry: "CH",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Canton de Vaud",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:30",
      },
    ],
    sameAs: [company.social.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
