import { useState, useRef, useCallback } from "react";
import Header from "@/components/Header";
import SmartMatch from "@/components/SmartMatch";
import SocialProof from "@/components/SocialProof";
import ProductFeed from "@/components/ProductFeed";
import ProductDetail from "@/components/ProductDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getFilteredProducts, type SkinType, type Concern, type Product } from "@/data/mockData";

const Index = () => {
  const [concern, setConcern] = useState<Concern>("Acne / Breakouts");
  const [skinType, setSkinType] = useState<SkinType>("Oily");
  const [matched, setMatched] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToResults = useCallback(() => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const handleMatch = (c: Concern, st: SkinType) => {
    setTransitioning(true);
    setConcern(c);
    setSkinType(st);
    setMatched(true);
    setSelectedProduct(null);
    setTimeout(() => {
      setTransitioning(false);
      scrollToResults();
    }, 300);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = getFilteredProducts(concern, skinType);

  const isWeakMatch = matched && filteredProducts.every((p) => {
    const exact = p.reviews.filter(
      (r) => r.skinType === skinType && r.concernTags.includes(concern)
    );
    return exact.length === 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SmartMatch
        onMatch={handleMatch}
        onProductSelect={handleProductSelect}
        selectedConcern={concern}
        selectedSkinType={skinType}
      />
      <SocialProof />

      <div ref={resultsRef} className="scroll-mt-4">
        {transitioning ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <span className="text-xs text-muted-foreground">Finding your matches…</span>
            </div>
          </div>
        ) : (
          matched && (
            <ProductFeed
              products={filteredProducts}
              skinType={skinType}
              concern={concern}
              isWeakMatch={isWeakMatch}
              onProductSelect={handleProductSelect}
            />
          )
        )}
      </div>

      {/* Product detail modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => { if (!open) setSelectedProduct(null); }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 gap-0 rounded-2xl border-border">
          {selectedProduct && (
            <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
          )}
        </DialogContent>
      </Dialog>

      <footer className="text-center py-8 text-xs text-muted-foreground border-t">
        © 2026 glowr · All rights reserved
      </footer>
    </div>
  );
};

export default Index;
