import { useState } from "react";
import { SKIN_TYPES, CONCERNS, type SkinType, type Concern } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Star, BarChart3 } from "lucide-react";

interface SmartMatchProps {
  onMatch: (concern: Concern, skinType: SkinType) => void;
  selectedConcern: Concern;
  selectedSkinType: SkinType;
}

const trustPoints = [
  { icon: Users, text: "Matched by skin type & concern" },
  { icon: Star, text: "Real reviews with usage details" },
  { icon: BarChart3, text: "Smarter than generic star ratings" },
];

const SmartMatch = ({ onMatch, selectedConcern, selectedSkinType }: SmartMatchProps) => {
  const [concern, setConcern] = useState<Concern>(selectedConcern);
  const [skinType, setSkinType] = useState<SkinType>(selectedSkinType);

  const handleMatch = () => {
    onMatch(concern, skinType);
  };

  return (
    <section className="hero-gradient py-16 px-4 sm:py-24">
      <div className="container max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4 leading-tight">
          Find skincare that worked for
          <br />
          <span className="text-primary">people with your exact skin concerns</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Browse products reviewed by people with the same skin type, breakouts, and real usage experience.
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

        {/* Trust micro-points */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8">
          {trustPoints.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-muted-foreground">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartMatch;
