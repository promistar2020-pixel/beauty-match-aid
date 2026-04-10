import { useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Sparkles, AlertTriangle } from "lucide-react";
import SmartMatch from "@/components/SmartMatch";
import SocialProof from "@/components/SocialProof";
import ProductFeed from "@/components/ProductFeed";
import ProductDetail from "@/components/ProductDetail";
import { getFilteredProducts, type SkinType, type Concern, type Product } from "@/data/mockData";

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [concern, setConcern] = useState<Concern>(
    (searchParams.get("concern") as Concern) || "Acne / Breakouts"
  );
  const [skinType, setSkinType] = useState<SkinType>(
    (searchParams.get("skinType") as SkinType) || "Oily"
  );
  const [matched, setMatched] = useState(!!searchParams.get("skinType"));
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
    window.scrollTo({ top: 0 });
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = getFilteredProducts(concern, skinType);

  const isWeakMatch = matched && filteredProducts.every((p) => {
    const exact = p.reviews.filter(
      (r) => r.skinType === skinType && r.concernTags.includes(concern)
    );
    return exact.length === 0;
  });

  // Full-page product detail view
  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <Header />
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-4"
          >
            <span className="text-base">←</span>
            <span>Back to results</span>
          </button>
          <ProductDetail product={selectedProduct} onSelectProduct={handleProductSelect} />
        </div>
        <footer className="text-center py-8 text-xs text-muted-foreground border-t mt-8">
          © 2026 glowr · All rights reserved
        </footer>
      </div>
    );
  }

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

      {/* Why routines fail */}
      <section className="px-4 py-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h2 className="text-base font-semibold text-foreground">Why most skincare routines fail</h2>
          </div>
          <ul className="space-y-2.5 text-sm text-muted-foreground mb-6">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0" />
              <span><span className="text-foreground font-medium">Wrong ingredient combinations</span> — mixing actives that cancel each other out or cause irritation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0" />
              <span><span className="text-foreground font-medium">Incorrect usage order</span> — applying products in the wrong sequence reduces absorption</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0" />
              <span><span className="text-foreground font-medium">Overuse of active ingredients</span> — too many actives damage your skin barrier over time</span>
            </li>
          </ul>

          {/* Skin Test CTA */}
          <div className="text-center rounded-2xl border border-border/60 bg-accent/30 p-6">
            <p className="text-sm font-medium text-foreground mb-1">Not sure what your skin needs?</p>
            <p className="text-xs text-muted-foreground mb-4">Find out in under 2 minutes — free & personalized</p>
            <Button
              onClick={() => navigate("/skin-test")}
              size="lg"
              className="bg-[hsl(var(--cta-bg))] text-background hover:bg-[hsl(var(--cta-bg))]/90 text-sm font-semibold rounded-xl h-12 px-8 shadow-md"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Take Free Skin Test
            </Button>
            <p className="text-xs text-muted-foreground mt-2">4 quick questions · personalized results</p>
          </div>
        </div>
      </section>

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

      <footer className="text-center py-8 text-xs text-muted-foreground border-t">
        © 2026 glowr · All rights reserved
      </footer>
    </div>
  );
};

export default Index;
