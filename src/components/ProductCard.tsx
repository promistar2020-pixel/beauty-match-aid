import { useState } from "react";
import { Star, ChevronDown, ChevronUp, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product, SkinType, Concern } from "@/data/mockData";
import { getRecommendationReasons } from "@/data/mockData";
import ReviewCard from "./ReviewCard";

interface ProductCardProps {
  product: Product;
  selectedSkinType?: SkinType | null;
  selectedConcern?: Concern | null;
  index: number;
}

type Tab = "overview" | "reviews" | "bestfor";

const ProductCard = ({ product, selectedSkinType, selectedConcern, index }: ProductCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("reviews");

  const reasons = selectedSkinType && selectedConcern
    ? getRecommendationReasons(product, selectedSkinType, selectedConcern)
    : [];

  const relevantReviews = selectedSkinType
    ? [
        ...product.reviews.filter((r) => r.skinType === selectedSkinType),
        ...product.reviews.filter((r) => r.skinType !== selectedSkinType),
      ]
    : product.reviews;

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "reviews", label: `Reviews (${product.reviews.length})` },
    { key: "bestfor", label: "Best For" },
  ];

  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Product image placeholder */}
      <div className="h-40 sm:h-48 bg-gradient-to-br from-accent/40 via-secondary/30 to-primary/10 flex items-center justify-center">
        <Package className="w-12 h-12 text-primary/40" />
      </div>

      <div className="p-5 sm:p-6">
        {/* Brand & category */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {product.brand}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{product.category}</span>
        </div>

        {/* Name */}
        <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-1.5">
          {product.name}
        </h3>

        {/* Best for one-liner */}
        <p className="text-xs text-muted-foreground italic mb-3">
          Best for: {product.bestFor}
        </p>

        {/* Rating & concern tags */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
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

        {/* Recommendation reason badges */}
        {reasons.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {reasons.map((reason) => (
              <span
                key={reason}
                className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full"
              >
                <Sparkles className="w-3 h-3" />
                {reason}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Button
          variant="outline"
          onClick={() => setExpanded(!expanded)}
          className="w-full rounded-xl border-border text-foreground hover:bg-muted"
        >
          {expanded ? (
            <>
              Hide Details <ChevronUp className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              Read Reviews <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>

      {/* Expanded panel with tabs */}
      {expanded && (
        <div className="border-t border-border">
          {/* Tab bar */}
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-3 py-2.5 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "overview" && (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-foreground/85">
                  {product.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.concernTags.map((tag) => (
                    <span key={tag} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-3">
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

            {activeTab === "bestfor" && (
              <div className="space-y-3">
                <p className="text-sm text-foreground/85 leading-relaxed">
                  {product.bestFor}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {product.reviews
                    .flatMap((r) => r.helpedWith)
                    .filter((v, i, a) => a.indexOf(v) === i && v)
                    .map((item) => (
                      <span
                        key={item}
                        className="text-xs bg-primary/10 text-foreground px-2.5 py-1.5 rounded-lg text-center font-medium"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
