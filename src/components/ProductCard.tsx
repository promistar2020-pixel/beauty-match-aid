import { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product, SkinType } from "@/data/mockData";
import ReviewCard from "./ReviewCard";

interface ProductCardProps {
  product: Product;
  selectedSkinType?: SkinType | null;
  index: number;
}

const ProductCard = ({ product, selectedSkinType, index }: ProductCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const relevantReviews = selectedSkinType
    ? [
        ...product.reviews.filter((r) => r.skinType === selectedSkinType),
        ...product.reviews.filter((r) => r.skinType !== selectedSkinType),
      ]
    : product.reviews;

  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-5 sm:p-6">
        {/* Brand & category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {product.brand}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{product.category}</span>
        </div>

        {/* Name */}
        <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {product.shortDescription}
        </p>

        {/* Rating & concern tags */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-foreground">
              {product.averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.length} reviews)
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.concernTags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button
          variant="outline"
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full rounded-xl border-border text-foreground hover:bg-muted"
        >
          {expanded ? (
            <>
              Hide Reviews <ChevronUp className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              Read Reviews <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>

      {/* Reviews panel */}
      {expanded && (
        <div className="border-t border-border bg-muted/30 p-4 sm:p-6 space-y-3">
          {selectedSkinType && (
            <p className="text-xs text-muted-foreground mb-1">
              Showing reviews from <span className="font-semibold text-foreground">{selectedSkinType}</span> skin first
            </p>
          )}
          {relevantReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
