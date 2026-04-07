export type SkinType = "Oily" | "Dry" | "Combination" | "Sensitive" | "Normal";
export type Concern = "Acne / Breakouts" | "Hyperpigmentation" | "Dryness" | "Aging" | "Redness";
export type ProductCategory = "Cleanser" | "Toner" | "Serum" | "Moisturizer" | "Sunscreen" | "Mask" | "Exfoliant";

export interface BuyLink {
  store: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  concernTags: Concern[];
  shortDescription: string;
  bestFor: string;
  buyLinks?: BuyLink[];
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  skinType: SkinType;
  usagePeriod: string;
  wouldBuyAgain: boolean;
  concernTags: Concern[];
  helpedWith: string[];
  text: string;
  authorName: string;
}

export const SKIN_TYPES: SkinType[] = ["Oily", "Dry", "Combination", "Sensitive", "Normal"];
export const CONCERNS: Concern[] = ["Acne / Breakouts", "Hyperpigmentation", "Dryness", "Aging", "Redness"];
export const PRODUCT_CATEGORIES: ProductCategory[] = ["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen", "Mask", "Exfoliant"];
