export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "platrerie",
    title: "Plâtrerie",
    description:
      "Du doublage isolant aux finitions décoratives, nous maîtrisons toutes les techniques de plâtrerie traditionnelle et contemporaine. Cloisons, faux-plafonds, isolation phonique et thermique : chaque intervention est réalisée avec précision.",
    features: [
      "Cloisons sèches et doublages",
      "Faux-plafonds acoustiques",
      "Isolation thermique intérieure",
      "Restauration de moulures",
    ],
  },
  {
    id: "peinture",
    title: "Peinture",
    description:
      "Application de peintures professionnelles pour intérieurs et extérieurs. Nous travaillons avec des produits sélectionnés pour leur durabilité et leur rendu. Préparation soignée des supports pour un résultat durable.",
    features: [
      "Peinture intérieure mate et satinée",
      "Peinture extérieure haute tenue",
      "Laques et vernis sur boiseries",
      "Enduits décoratifs",
    ],
  },
  {
    id: "sols",
    title: "Sols",
    description:
      "Pose de tous types de revêtements de sol : parquet massif ou contrecollé, carrelage, sols souples, résines décoratives. Préparation du support, ragréage et finitions inclus pour un résultat impeccable.",
    features: [
      "Parquet massif et contrecollé",
      "Carrelage et faïence",
      "Sols vinyle et moquette",
      "Résines et béton ciré",
    ],
  },
  {
    id: "facades",
    title: "Façades",
    description:
      "Ravalement, isolation extérieure et crépis pour façades de tous types. Diagnostic préalable, traitement des fissures, application de systèmes complets adaptés au bâtiment et aux exigences énergétiques actuelles.",
    features: [
      "Ravalement et nettoyage",
      "Isolation thermique par l'extérieur",
      "Crépis minéraux et organiques",
      "Traitement des pathologies",
    ],
  },
];
