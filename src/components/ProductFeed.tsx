import type { Product, SkinType, Concern } from "@/data/mockData";
import ProductCard from "./ProductCard";

interface ProductFeedProps {
  products: Product[];
  skinType: SkinType | null;
  concern: Concern | null;
  isWeakMatch?: boolean;
}

const ProductFeed = ({ products, skinType, concern, isWeakMatch }: ProductFeedProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg font-serif">No products found for this combination.</p>
        <p className="text-sm mt-1">Try adjusting your filters above.</p>
      </div>
    );
  }

  return (
    <section className="container py-10 sm:py-14">
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-2 text-center">
        Your Recommended Products
      </h2>
      <p className="text-muted-foreground text-sm text-center mb-3 max-w-md mx-auto">
        Ranked by ratings from people with similar skin
      </p>

      {isWeakMatch && (
        <div className="max-w-lg mx-auto mb-8 text-center bg-secondary/50 border border-border rounded-xl px-4 py-3">
          <p className="text-xs sm:text-sm text-muted-foreground">
            We found fewer exact matches, so we're showing products loved by users with similar concerns.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 max-w-3xl mx-auto">
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            selectedSkinType={skinType}
            selectedConcern={concern}
            index={i}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductFeed;
