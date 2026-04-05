import { useState } from "react";
import { SKIN_TYPES, CONCERNS, type SkinType, type Concern } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SmartMatchProps {
  onMatch: (concern: Concern, skinType: SkinType) => void;
  selectedConcern: Concern;
  selectedSkinType: SkinType;
}

const SmartMatch = ({ onMatch, selectedConcern, selectedSkinType }: SmartMatchProps) => {
  const [concern, setConcern] = useState<Concern>(selectedConcern);
  const [skinType, setSkinType] = useState<SkinType>(selectedSkinType);

  const handleMatch = () => {
    onMatch(concern, skinType);
  };

  return (
    <section className="hero-gradient py-16 px-4 sm:py-24">
      <div className="container max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-3 leading-tight">
          Find products that work
          <br />
          <span className="text-primary">for skin like yours</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-10 max-w-md mx-auto">
          Real reviews from people with the same skin type and concerns.
        </p>

        <div className="bg-card rounded-2xl shadow-card p-6 sm:p-8 text-left space-y-6">
          {/* Concern */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2.5 block">
              What's your main concern?
            </label>
            <div className="flex flex-wrap gap-2">
              {CONCERNS.map((c) => (
                <button
                  key={c}
                  onClick={() => setConcern(c)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    concern === c
                      ? "bg-primary/15 border-primary text-foreground shadow-sm"
                      : "bg-background border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Type */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2.5 block">
              Your skin type
            </label>
            <div className="flex flex-wrap gap-2">
              {SKIN_TYPES.map((st) => (
                <button
                  key={st}
                  onClick={() => setSkinType(st)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    skinType === st
                      ? "bg-primary/15 border-primary text-foreground shadow-sm"
                      : "bg-background border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleMatch}
            size="lg"
            className="w-full bg-foreground text-background hover:bg-foreground/90 text-base font-semibold rounded-xl h-12"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Find My Match
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SmartMatch;
