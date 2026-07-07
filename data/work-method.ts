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
    icon: "placeholder",
    number: "1",
    title: "Prise de contact",
    description: "Vous nous contactez par téléphone ou via le formulaire.",
  },
  {
    id: "visite-place",
    icon: "placeholder",
    number: "2",
    title: "Visite sur place",
    description: "Nous nous déplaçons pour évaluer votre projet.",
  },
  {
    id: "offre-detaillee",
    icon: "placeholder",
    number: "3",
    title: "Offre détaillée",
    description: "Vous recevez une offre claire et transparente sous 48h.",
  },
  {
    id: "realisation",
    icon: "placeholder",
    number: "4",
    title: "Réalisation",
    description: "Nos équipes réalisent les travaux avec soin et professionnalisme.",
  },
  {
    id: "reception-travaux",
    icon: "placeholder",
    number: "5",
    title: "Réception des travaux",
    description: "Nous procédons ensemble à la réception du chantier.",
  },
] as const;
