import { Star, Droplets, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product, SkinType, Concern } from "@/data/mockData";
import { getRecommendationReasons } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  selectedSkinType?: SkinType | null;
  selectedConcern?: Concern | null;
  index: number;
  onSelect?: (product: Product) => void;
}

const ProductCard = ({ product, selectedSkinType, selectedConcern, index, onSelect }: ProductCardProps) => {
  const reasons = selectedSkinType && selectedConcern
    ? getRecommendationReasons(product, selectedSkinType, selectedConcern)
    : [];

  const primaryReason = reasons[0];

  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden animate-fade-in-up flex flex-col"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Product visual area */}
      <div className="h-36 sm:h-40 bg-gradient-to-br from-accent/50 via-secondary/20 to-primary/5 flex items-center justify-center relative">
        <div className="w-16 h-20 rounded-xl bg-background/60 backdrop-blur-sm border border-border/40 flex items-center justify-center">
          <Droplets className="w-7 h-7 text-primary/50" />
        </div>
        {primaryReason && (
          <span className="absolute bottom-3 left-3 right-3 inline-flex items-center gap-1 text-xs font-semibold bg-background/90 backdrop-blur-sm text-foreground border border-primary/15 px-3 py-1.5 rounded-lg">
            <Sparkles className="w-3 h-3 text-primary shrink-0" />
            <span className="truncate">{primaryReason}</span>
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Brand & category */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            {product.brand}
          </span>
          <span className="text-[11px] text-muted-foreground">· {product.category}</span>
        </div>

        {/* Name */}
        <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-1 leading-snug">
          {product.name}
        </h3>

        {/* Best for one-liner */}
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">
          {product.bestFor}
        </p>

        {/* Rating & concern tags */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-foreground">
              {product.averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {product.concernTags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-accent/60 text-accent-foreground px-2 py-0.5 rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA - pushed to bottom */}
        <div className="mt-auto">
          <Button
            variant="outline"
            onClick={() => onSelect?.(product)}
            className="w-full rounded-xl border-border text-foreground hover:bg-muted text-sm h-10"
          >
            See full reviews
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
