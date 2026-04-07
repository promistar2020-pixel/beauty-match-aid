import type { Product, Review, SkinType, Concern } from "./types";
import { products } from "./products";
import { reviews } from "./reviews";

/** Get all reviews for a product */
export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

/** Compute average rating for a product from its reviews */
export function getAverageRating(productId: string): number {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;
  return productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
}

/** Enriched product with computed review stats */
export interface EnrichedProduct extends Product {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

/** Get a product enriched with its reviews and computed rating */
export function getEnrichedProduct(product: Product): EnrichedProduct {
  const productReviews = getProductReviews(product.id);
  return {
    ...product,
    reviews: productReviews,
    averageRating: productReviews.length > 0
      ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
      : 0,
    reviewCount: productReviews.length,
  };
}

/** Get all products enriched with reviews */
export function getAllEnrichedProducts(): EnrichedProduct[] {
  return products.map(getEnrichedProduct);
}

export function getRecommendationReasons(product: EnrichedProduct, skinType: SkinType, concern: Concern): string[] {
  const reasons: string[] = [];
  const relevantReviews = product.reviews.filter((r) => r.skinType === skinType);
  const concernReviews = product.reviews.filter((r) => r.concernTags.includes(concern));

  if (relevantReviews.length > 0) {
    const avg = relevantReviews.reduce((s, r) => s + r.rating, 0) / relevantReviews.length;
    if (avg >= 4) reasons.push(`Highly rated by ${skinType.toLowerCase()} skin users`);
  }

  if (concernReviews.length >= 2) {
    const label = concern === "Acne / Breakouts" ? "breakouts" : concern.toLowerCase();
    reasons.push(`Frequently mentioned for ${label}`);
  }

  const repurchaseRate = relevantReviews.filter((r) => r.wouldBuyAgain).length / Math.max(relevantReviews.length, 1);
  if (repurchaseRate >= 0.7 && relevantReviews.length > 0) {
    reasons.push(`Repurchased by ${skinType.toLowerCase()} skin reviewers`);
  }

  return reasons.length > 0 ? reasons : [`Recommended for ${concern.toLowerCase()}`];
}

export function getFilteredProducts(concern: Concern | null, skinType: SkinType | null): EnrichedProduct[] {
  let filtered = getAllEnrichedProducts();

  if (concern) {
    filtered = filtered.filter((p) => p.concernTags.includes(concern));
  }

  if (skinType) {
    filtered = filtered
      .map((p) => {
        const relevantReviews = p.reviews.filter(
          (r) => r.skinType === skinType && (!concern || r.concernTags.includes(concern))
        );
        const allReviews = p.reviews.filter((r) => !concern || r.concernTags.includes(concern));
        const avgRelevant =
          relevantReviews.length > 0
            ? relevantReviews.reduce((sum, r) => sum + r.rating, 0) / relevantReviews.length
            : 0;
        const avgAll =
          allReviews.length > 0
            ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
            : 0;
        const matchScore = relevantReviews.length > 0 ? avgRelevant : avgAll * 0.7;
        return { ...p, matchScore };
      })
      .sort((a, b) => (b as any).matchScore - (a as any).matchScore);
  }

  return filtered;
}
