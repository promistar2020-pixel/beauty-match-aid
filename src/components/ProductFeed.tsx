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
        <p className="text-base font-display font-medium">No products found for this combination.</p>
        <p className="text-sm mt-1">Try adjusting your filters above.</p>
      </div>
    );
  }

  return (
    <section className="container py-8 sm:py-12 animate-fade-in">
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-1 text-center tracking-tight">
        Results for {skinType} skin + {concern}
      </h2>
      <p className="text-muted-foreground text-sm text-center mb-6 max-w-sm mx-auto">
        Ranked by ratings from people with similar skin
      </p>

      {isWeakMatch && (
        <div className="max-w-lg mx-auto mb-6 text-center bg-secondary/40 border border-border rounded-lg px-4 py-2.5">
          <p className="text-xs text-muted-foreground">
            Fewer exact matches found — showing products loved by users with similar concerns.
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
