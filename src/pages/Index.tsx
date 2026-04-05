import { useState } from "react";
import Header from "@/components/Header";
import SmartMatch from "@/components/SmartMatch";
import ProductFeed from "@/components/ProductFeed";
import { getFilteredProducts, type SkinType, type Concern } from "@/data/mockData";

const Index = () => {
  const [concern, setConcern] = useState<Concern>("Acne / Breakouts");
  const [skinType, setSkinType] = useState<SkinType>("Oily");
  const [matched, setMatched] = useState(true);

  const handleMatch = (c: Concern, st: SkinType) => {
    setConcern(c);
    setSkinType(st);
    setMatched(true);
  };

  const filteredProducts = getFilteredProducts(concern, skinType);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SmartMatch
        onMatch={handleMatch}
        selectedConcern={concern}
        selectedSkinType={skinType}
      />
      {matched && <ProductFeed products={filteredProducts} skinType={skinType} />}
      <footer className="text-center py-8 text-xs text-muted-foreground border-t">
        © 2026 glowr · All rights reserved
      </footer>
    </div>
  );
};

export default Index;
