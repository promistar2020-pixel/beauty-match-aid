import { useState, useMemo } from "react";
import { Star, Droplets, RefreshCw, MapPin, Users, Sparkles, CheckCircle2 } from "lucide-react";

import type { Product, SkinType, Concern } from "@/data/mockData";
import { SKIN_TYPES, CONCERNS, products } from "@/data/mockData";
import ReviewCard from "./ReviewCard";

interface ProductDetailProps {
  product: Product;
  onBack?: () => void;
  onSelectProduct?: (product: Product) => void;
}

const ProductDetail = ({ product, onSelectProduct }: ProductDetailProps) => {
  const [filterSkinType, setFilterSkinType] = useState<SkinType | null>(null);
  const [filterConcern, setFilterConcern] = useState<Concern | null>(null);

  const filteredReviews = useMemo(() => {
    return product.reviews.filter((r) => {
      if (filterSkinType && r.skinType !== filterSkinType) return false;
      if (filterConcern && !r.concernTags.includes(filterConcern)) return false;
      return true;
    });
  }, [product.reviews, filterSkinType, filterConcern]);

  const rebuyCount = product.reviews.filter((r) => r.wouldBuyAgain).length;
  const rebuyRate = Math.round((rebuyCount / product.reviews.length) * 100);

  const skinTypeCounts = product.reviews.reduce<Record<string, number>>((acc, r) => {
    acc[r.skinType] = (acc[r.skinType] || 0) + 1;
    return acc;
  }, {});
  const topSkinTypes = Object.entries(skinTypeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const topSkinType = topSkinTypes[0];

  const concernCounts = product.reviews.reduce<Record<string, number>>((acc, r) => {
    r.concernTags.forEach((c) => { acc[c] = (acc[c] || 0) + 1; });
    return acc;
  }, {});
  const topConcerns = Object.entries(concernCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const purchaseCounts = product.reviews.reduce<Record<string, number>>((acc, r) => {
    acc[r.purchasedAt] = (acc[r.purchasedAt] || 0) + 1;
    return acc;
  }, {});
  const topPurchase = Object.entries(purchaseCounts).sort((a, b) => b[1] - a[1]);

  // "Why people like you choose this" insights
  const allHelpedWith = product.reviews.flatMap((r) => r.helpedWith);
  const helpedCounts = allHelpedWith.reduce<Record<string, number>>((acc, h) => {
    acc[h] = (acc[h] || 0) + 1;
    return acc;
  }, {});
  const topHelped = Object.entries(helpedCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([item]) => item);

  const noNegativeSkinTypes = Object.entries(skinTypeCounts)
    .filter(([st]) => {
      const stReviews = product.reviews.filter((r) => r.skinType === st);
      return stReviews.every((r) => r.rating >= 4);
    })
    .map(([st]) => st);

  const whyReasons: string[] = [];
  topHelped.forEach((h) => whyReasons.push(h));
  if (noNegativeSkinTypes.length > 0) {
    whyReasons.push(`Suitable for ${noNegativeSkinTypes.join(", ").toLowerCase()} skin`);
  }
  
  const hasNoDryness = !product.reviews.some((r) =>
    r.text.toLowerCase().includes("drying") && r.rating >= 4
  );
  if (hasNoDryness && whyReasons.length < 4) {
    whyReasons.push("No dryness reported by satisfied users");
  }

  const reviewSkinTypes = SKIN_TYPES.filter((st) => product.reviews.some((r) => r.skinType === st));
  const reviewConcerns = CONCERNS.filter((c) => product.reviews.some((r) => r.concernTags.includes(c)));

  return (
    <section className="py-6 sm:py-8 px-5 sm:px-6 max-w-2xl animate-fade-in">

      {/* Product header */}
      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="h-36 sm:h-44 bg-gradient-to-br from-accent/50 via-secondary/20 to-primary/5 flex items-center justify-center">
          <div className="w-16 h-20 rounded-xl bg-background/60 backdrop-blur-sm border border-border/40 flex items-center justify-center">
            <Droplets className="w-7 h-7 text-primary/50" />
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{product.brand}</span>
            <span className="text-[11px] text-muted-foreground">· {product.category}</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-1 leading-snug">{product.name}</h2>

          {/* Decision badge */}
          <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="text-xs font-semibold text-primary">Best choice for {product.bestFor.toLowerCase()}</span>
          </div>

          {/* Confidence signal */}
          {rebuyRate >= 70 && (
            <p className="text-[12px] text-emerald-600 font-medium mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Most users with similar skin saw improvement
            </p>
          )}

          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{product.shortDescription}</p>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-base font-semibold text-foreground">{product.averageRating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
          </div>

          {/* CTA */}
          <div className="bg-primary/8 border border-primary/20 rounded-xl px-4 py-2.5 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-semibold text-primary">Recommended for you</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.concernTags.map((tag) => (
              <span key={tag} className="text-[11px] bg-accent/60 text-accent-foreground px-2 py-0.5 rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Why people like you choose this */}
      {whyReasons.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-4 mt-4">
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Why people like you choose this
          </h3>
          <ul className="space-y-1.5">
            {whyReasons.slice(0, 3).map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary signals */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-card rounded-xl border border-border p-3.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Rebuy rate</span>
          </div>
          <span className="text-xl font-semibold text-foreground">{rebuyRate}%</span>
          {topSkinType && (
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {rebuyCount} of {product.reviews.length} would buy again
              {topSkinType[1] > 1 ? ` (${topSkinType[1]} with ${topSkinType[0].toLowerCase()} skin)` : ""}
            </p>
          )}
        </div>
        <div className="bg-card rounded-xl border border-border p-3.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Reviewers</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {topSkinTypes.map(([st, count]) => (
              <span key={st} className="text-[11px] bg-accent/60 text-foreground px-1.5 py-0.5 rounded-md font-medium">
                {st} ({count})
              </span>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-3.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Top concerns</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {topConcerns.map(([c]) => (
              <span key={c} className="text-[11px] bg-primary/8 text-foreground px-1.5 py-0.5 rounded-md font-medium">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-3.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Bought at</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {topPurchase.map(([loc, count]) => (
              <span key={loc} className="text-[11px] text-muted-foreground font-medium">
                {loc} ({count})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Review filters */}
      <div className="mt-6 space-y-3">
        <h3 className="font-display text-base font-semibold text-foreground">
          Reviews ({filteredReviews.length})
        </h3>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] text-muted-foreground font-medium mr-1">Skin type:</span>
            <button
              onClick={() => setFilterSkinType(null)}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all border ${
                !filterSkinType
                  ? "bg-primary/12 border-primary/50 text-foreground"
                  : "bg-background border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              All
            </button>
            {reviewSkinTypes.map((st) => (
              <button
                key={st}
                onClick={() => setFilterSkinType(filterSkinType === st ? null : st)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all border ${
                  filterSkinType === st
                    ? "bg-primary/12 border-primary/50 text-foreground"
                    : "bg-background border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] text-muted-foreground font-medium mr-1">Concern:</span>
            <button
              onClick={() => setFilterConcern(null)}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all border ${
                !filterConcern
                  ? "bg-primary/12 border-primary/50 text-foreground"
                  : "bg-background border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              All
            </button>
            {reviewConcerns.map((c) => (
              <button
                key={c}
                onClick={() => setFilterConcern(filterConcern === c ? null : c)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all border ${
                  filterConcern === c
                    ? "bg-primary/12 border-primary/50 text-foreground"
                    : "bg-background border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No reviews match these filters.</p>
        ) : (
          <div className="space-y-3">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>

      {/* Why this one stands out */}
      {(() => {
        const similarProducts = products.filter((p) => p.id !== product.id && p.concernTags.some((t) => product.concernTags.includes(t))).slice(0, 3);
        const avgRebuyOthers = similarProducts.length > 0
          ? Math.round(similarProducts.reduce((sum, p) => {
              const rb = p.reviews.filter((r) => r.wouldBuyAgain).length;
              return sum + (rb / p.reviews.length) * 100;
            }, 0) / similarProducts.length)
          : 0;
        const avgRatingOthers = similarProducts.length > 0
          ? (similarProducts.reduce((sum, p) => sum + p.averageRating, 0) / similarProducts.length)
          : 0;

        const standoutReasons: string[] = [];
        if (rebuyRate > avgRebuyOthers) standoutReasons.push(`Higher rebuy rate than similar products (${rebuyRate}% vs ${avgRebuyOthers}%)`);
        if (product.averageRating > avgRatingOthers) standoutReasons.push(`Higher average rating (${product.averageRating.toFixed(1)} vs ${avgRatingOthers.toFixed(1)})`);
        if (noNegativeSkinTypes.length > 0) standoutReasons.push(`No negative reviews from ${noNegativeSkinTypes.join(", ").toLowerCase()} skin users`);
        if (hasNoDryness) standoutReasons.push("No dryness or irritation reported");

        return standoutReasons.length > 0 ? (
          <div className="bg-card rounded-xl border border-border p-4 mt-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              Why this one stands out
            </h3>
            <ul className="space-y-1.5">
              {standoutReasons.slice(0, 4).map((reason) => (
                <li key={reason} className="flex items-start gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null;
      })()}

      {/* Similar products */}
      {(() => {
        const similarProducts = products
          .filter((p) => p.id !== product.id && p.concernTags.some((t) => product.concernTags.includes(t)))
          .slice(0, 3);

        return similarProducts.length > 0 ? (
          <div className="mt-6">
            <h3 className="font-display text-base font-semibold text-foreground mb-3">Similar products</h3>
            <div className="space-y-2.5">
              {similarProducts.map((sp) => (
                <div key={sp.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate">{sp.name}</p>
                    <p className="text-[11px] text-muted-foreground">{sp.brand}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium text-foreground">{sp.averageRating.toFixed(1)}</span>
                      </div>
                      <span className="text-[11px] bg-accent/60 text-accent-foreground px-1.5 py-0.5 rounded-md font-medium">
                        {sp.bestFor.length > 30 ? sp.bestFor.slice(0, 30) + "…" : sp.bestFor}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectProduct?.(sp)}
                    className="text-xs font-medium text-primary hover:text-primary/80 border border-primary/30 hover:border-primary/50 rounded-lg px-3 py-1.5 transition-colors shrink-0"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      })()}
    </section>
  );
};

export default ProductDetail;
