import { projectContents } from "./project-content";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageBefore: string;
  imageAfter: string;
  year?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: projectContents["1"].title,
    category: "Renovation & transformation",
    description: projectContents["1"].description,
    imageBefore: "/projects/1/before.JPG",
    imageAfter: "/projects/1/after.jpg",
  },
  {
    id: "2",
    title: projectContents["2"].title,
    category: "Renovation d'appartement",
    description: projectContents["2"].description,
    imageBefore: "/projects/2/before.jpg",
    imageAfter: "/projects/2/after.jpg",
  },
  {
    id: "3",
    title: projectContents["3"].title,
    category: "Facades & isolation",
    description: projectContents["3"].description,
    imageBefore: "/projects/3/before.JPG",
    imageAfter: "/projects/3/after.JPG",
  },
  {
    id: "4",
    title: projectContents["4"].title,
    category: "Toiture & transformation",
    description: projectContents["4"].description,
    imageBefore: "/projects/4/before.JPG",
    imageAfter: "/projects/4/after.png",
  },
  {
    id: "5",
    title: projectContents["5"].title,
    category: "Renovation complete",
    description: projectContents["5"].description,
    imageBefore: "/projects/5/before.JPG",
    imageAfter: "/projects/5/after.JPG",
  },
  {
    id: "7",
    title: projectContents["7"].title,
    category: "Renovation interieure",
    description: projectContents["7"].description,
    imageBefore: "/projects/7/before.jpg",
    imageAfter: "/projects/7/after.jpg",
  },
];
