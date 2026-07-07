export interface WorkMethodStep {
  id: string;
  icon: string;
  number: string;
  title: string;
  description: string;
}

export const workMethodSteps: WorkMethodStep[] = [
  {
    id: "prise-contact",
    icon: "phone",
    number: "1",
    title: "Prise de contact",
    description: "Vous nous contactez par téléphone ou via le formulaire.",
  },
  {
    id: "visite-place",
    icon: "building",
    number: "2",
    title: "Visite sur place",
    description: "Nous nous déplaçons pour évaluer votre projet.",
  },
  {
    id: "offre-detaillee",
    icon: "document",
    number: "3",
    title: "Offre détaillée",
    description: "Vous recevez une offre claire et transparente sous 48h.",
  },
  {
    id: "realisation",
    icon: "hammer",
    number: "4",
    title: "Réalisation",
    description: "Nos équipes réalisent les travaux avec soin et professionnalisme.",
  },
  {
    id: "reception-travaux",
    icon: "tick",
    number: "5",
    title: "Réception des travaux",
    description: "Nous procédons ensemble à la réception du chantier.",
  },
] as const;
