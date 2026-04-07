// Re-export everything from the refactored modules for backward compatibility
export type { SkinType, Concern, ProductCategory, BuyLink, Review } from "./types";
export type { EnrichedProduct as Product } from "./utils";
export { SKIN_TYPES, CONCERNS, PRODUCT_CATEGORIES } from "./types";
export { products } from "./products";
export { reviews } from "./reviews";
export { getProductReviews, getAverageRating, getEnrichedProduct, getAllEnrichedProducts, getRecommendationReasons, getFilteredProducts } from "./utils";
