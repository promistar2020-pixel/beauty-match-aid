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
        className={`w-3.5 h-3.5 ${
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
    <div className="border border-border rounded-xl p-4 bg-card space-y-3">
      {/* Top row: rating + author + skin type */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <StarRating rating={review.rating} />
          <span className="text-xs font-medium text-muted-foreground">{review.authorName}</span>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            skinTypeBgClass[review.skinType] || "bg-muted text-foreground"
          }`}
        >
          {review.skinType} skin
        </span>
      </div>

      {/* Metadata chips */}
      <div className="flex flex-wrap gap-1.5">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
          <Clock className="w-3 h-3" />
          {review.usagePeriod}
        </span>
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${
            review.wouldBuyAgain
              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          <RefreshCw className="w-3 h-3" />
          {review.wouldBuyAgain ? "Would buy again" : "Would not rebuy"}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
          <ShoppingBag className="w-3 h-3" />
          {review.purchasedAt}
        </span>
      </div>

      {/* Helped with */}
      {review.helpedWith && review.helpedWith.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Zap className="w-3 h-3 text-primary" />
            Helped with:
          </span>
          {review.helpedWith.map((item) => (
            <span
              key={item}
              className="text-xs bg-primary/10 text-foreground px-2 py-0.5 rounded-md font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Review text */}
      <p className="text-sm leading-relaxed text-foreground/85">{review.text}</p>
    </div>
  );
};

export default ReviewCard;
