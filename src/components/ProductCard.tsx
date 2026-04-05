import { useState } from "react";
import { Star, ChevronDown, ChevronUp, Droplets, Sparkles } from "lucide-react";
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

  const primaryReason = reasons[0];
  const secondaryReasons = reasons.slice(1);

  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden animate-fade-in-up"
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

      <div className="p-5">
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
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          {product.bestFor}
        </p>

        {/* Rating & concern tags */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
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

        {/* Secondary recommendation reasons */}
        {secondaryReasons.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {secondaryReasons.map((reason) => (
              <span
                key={reason}
                className="text-[11px] font-medium text-primary/80 bg-primary/6 px-2 py-0.5 rounded-md"
              >
                {reason}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Button
          variant="outline"
          onClick={() => setExpanded(!expanded)}
          className="w-full rounded-xl border-border text-foreground hover:bg-muted text-sm h-10"
        >
          {expanded ? (
            <>Hide Details <ChevronUp className="w-3.5 h-3.5 ml-1" /></>
          ) : (
            <>Read Reviews <ChevronDown className="w-3.5 h-3.5 ml-1" /></>
          )}
        </Button>
      </div>

      {/* Expanded panel with tabs */}
      {expanded && (
        <div className="border-t border-border">
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-5">
            {activeTab === "overview" && (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-foreground/85">
                  {product.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.concernTags.map((tag) => (
                    <span key={tag} className="text-[11px] bg-accent/60 text-accent-foreground px-2 py-0.5 rounded-md">
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
                    Showing <span className="font-semibold text-foreground">{selectedSkinType}</span> skin reviews first
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
                <div className="grid grid-cols-2 gap-1.5">
                  {product.reviews
                    .flatMap((r) => r.helpedWith)
                    .filter((v, i, a) => a.indexOf(v) === i && v)
                    .map((item) => (
                      <span
                        key={item}
                        className="text-xs bg-primary/8 text-foreground px-2.5 py-1.5 rounded-lg text-center font-medium"
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
