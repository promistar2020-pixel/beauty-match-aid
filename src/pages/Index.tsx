import { useState } from "react";
import Header from "@/components/Header";
import SmartMatch from "@/components/SmartMatch";
import SocialProof from "@/components/SocialProof";
import ProductFeed from "@/components/ProductFeed";
import ProductDetail from "@/components/ProductDetail";
import { getFilteredProducts, type SkinType, type Concern, type Product } from "@/data/mockData";

type View = "feed" | "detail";

const Index = () => {
  const [concern, setConcern] = useState<Concern>("Acne / Breakouts");
  const [skinType, setSkinType] = useState<SkinType>("Oily");
  const [matched, setMatched] = useState(true);
  const [view, setView] = useState<View>("feed");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleMatch = (c: Concern, st: SkinType) => {
    setConcern(c);
    setSkinType(st);
    setMatched(true);
    setView("feed");
    setSelectedProduct(null);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView("detail");
  };

  const handleBackToSearch = () => {
    setView("feed");
    setSelectedProduct(null);
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

      {view === "detail" && selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={handleBackToSearch} />
      ) : (
        matched && (
          <ProductFeed
            products={filteredProducts}
            skinType={skinType}
            concern={concern}
            isWeakMatch={isWeakMatch}
          />
        )
      )}

      <footer className="text-center py-8 text-xs text-muted-foreground border-t">
        © 2026 glowr · All rights reserved
      </footer>
    </div>
  );
};

export default Index;
