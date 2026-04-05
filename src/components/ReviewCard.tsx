import { Star, ShoppingBag, RefreshCw, Clock, Zap } from "lucide-react";
import type { Review } from "@/data/mockData";

const skinTypeBgClass: Record<string, string> = {
  Oily: "bg-badge-oily/20 text-foreground",
  Dry: "bg-badge-dry/20 text-foreground",
  Combination: "bg-badge-combo/20 text-foreground",
  Sensitive: "bg-badge-sensitive/20 text-foreground",
  Normal: "bg-badge-normal/20 text-foreground",
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i <= rating ? "fill-amber-400 text-amber-400" : "text-border fill-border"
        }`}
      />
    ))}
  </div>
);

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="border border-border rounded-xl p-4 bg-card space-y-2.5">
      {/* Top row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <StarRating rating={review.rating} />
          <span className="text-xs font-medium text-muted-foreground">{review.authorName}</span>
        </div>
        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
            skinTypeBgClass[review.skinType] || "bg-muted text-foreground"
          }`}
        >
          {review.skinType}
        </span>
      </div>

      {/* Review text */}
      <p className="text-sm leading-[1.7] text-foreground/80">{review.text}</p>

      {/* Helped with */}
      {review.helpedWith && review.helpedWith.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          <Zap className="w-3 h-3 text-primary shrink-0" />
          {review.helpedWith.map((item) => (
            <span
              key={item}
              className="text-[11px] bg-primary/8 text-foreground px-2 py-0.5 rounded-md font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/60">
        {/* Repurchase — strongest signal */}
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
            review.wouldBuyAgain
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-600 border border-red-100"
          }`}
        >
          <RefreshCw className="w-3 h-3" />
          {review.wouldBuyAgain ? "Would rebuy" : "Would not rebuy"}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="w-3 h-3" />
          {review.usagePeriod}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/70">
          <ShoppingBag className="w-3 h-3" />
          {review.purchasedAt}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
