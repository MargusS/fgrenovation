export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "villa-pully",
    title: "Villa Contemporaine",
    category: "Rénovation complète",
    description:
      "Rénovation intégrale d'une villa des années 70 à Pully. Travaux de plâtrerie, peinture intérieure et extérieure, pose de parquet massif et ravalement de façade. Un chantier de six mois pour redonner vie à cette propriété familiale.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80",
    year: "2024",
  },
  {
    id: "appartement-lausanne",
    title: "Appartement Haussmannien",
    category: "Peinture & Plâtrerie",
    description:
      "Restauration des moulures et corniches d'époque, application de peinture minérale, création de faux-finis sur les boiseries. Un travail de précision pour préserver le caractère historique de ce bien d'exception au centre de Lausanne.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80",
    year: "2024",
  },
  {
    id: "commerce-morges",
    title: "Boutique Centre-Ville",
    category: "Aménagement commercial",
    description:
      "Transformation complète d'un local commercial à Morges. Création de cloisons, finitions haut de gamme, pose de revêtements de sol techniques et peinture décorative. Livré dans les délais pour l'ouverture du commerce.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop&q=80",
    year: "2023",
  },
  {
    id: "chalet-gryon",
    title: "Chalet de Montagne",
    category: "Façades & Isolation",
    description:
      "Rénovation énergétique d'un chalet à Gryon. Isolation extérieure, crépi à la chaux, traitement des boiseries et reprise des menuiseries. Un projet alliant performance thermique et respect de l'architecture alpine traditionnelle.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&q=80",
    year: "2023",
  },
  {
    id: "residence-nyon",
    title: "Résidence Privée",
    category: "Sols & Finitions",
    description:
      "Pose de carrelage grand format, parquet chêne et sols en résine pour une résidence privée à Nyon. Coordination avec les autres corps de métier pour une finition irréprochable dans les moindres détails.",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&h=800&fit=crop&q=80",
    year: "2023",
  },
];
