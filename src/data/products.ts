import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Acne Foam Cleanser",
    brand: "Abib",
    category: "Cleanser",
    concernTags: ["Acne / Breakouts", "Redness"],
    shortDescription: "pH-balanced gentle foam cleanser formulated with BHA and heartleaf extract to calm breakouts without stripping moisture.",
    bestFor: "Oily and sensitive skin prone to hormonal and stress breakouts",
    buyLinks: [
      { store: "Shopee", url: "#" },
      { store: "Amazon", url: "#" },
      { store: "Watsons", url: "#" },
    ],
  },
  {
    id: "2",
    name: "Green Tea Enzyme Serum",
    brand: "Innisfree",
    category: "Serum",
    concernTags: ["Acne / Breakouts", "Hyperpigmentation"],
    shortDescription: "Lightweight enzyme serum with Jeju green tea extract that gently resurfaces skin, fades post-acne marks, and controls excess sebum.",
    bestFor: "Combination and oily skin dealing with post-acne dark spots and texture",
    buyLinks: [
      { store: "Shopee", url: "#" },
      { store: "Amazon", url: "#" },
      { store: "Olive Young", url: "#" },
    ],
  },
  {
    id: "3",
    name: "Centella Green Level Serum",
    brand: "PURITO",
    category: "Serum",
    concernTags: ["Acne / Breakouts", "Redness"],
    shortDescription: "Soothing centella serum with 49% centella extract to heal acne scars, reduce inflammation, and strengthen the skin barrier.",
    bestFor: "Sensitive and irritated skin needing calm healing from active breakouts",
    buyLinks: [
      { store: "Amazon", url: "#" },
      { store: "Shopee", url: "#" },
    ],
  },
  {
    id: "4",
    name: "AHA/BHA Clarifying Treatment Toner",
    brand: "COSRX",
    category: "Toner",
    concernTags: ["Acne / Breakouts", "Hyperpigmentation"],
    shortDescription: "Gentle exfoliating toner with natural AHA and BHA to unclog pores, prevent breakouts, and improve skin clarity over time.",
    bestFor: "Oily and combination skin needing daily pore-clearing without harsh actives",
    buyLinks: [
      { store: "Shopee", url: "#" },
      { store: "Amazon", url: "#" },
      { store: "Watsons", url: "#" },
    ],
  },
];
