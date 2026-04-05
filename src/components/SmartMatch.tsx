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
  { icon: BarChart3, text: "Smarter than generic ratings" },
];

const SmartMatch = ({ onMatch, selectedConcern, selectedSkinType }: SmartMatchProps) => {
  const [concern, setConcern] = useState<Concern>(selectedConcern);
  const [skinType, setSkinType] = useState<SkinType>(selectedSkinType);

  const handleMatch = () => {
    onMatch(concern, skinType);
  };

  return (
    <section className="hero-gradient py-10 px-4 sm:py-14">
      <div className="container max-w-xl text-center">
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3 leading-snug tracking-tight">
          Find skincare that worked for
          <br />
          <span className="text-primary">people with your exact skin</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
          Browse products reviewed by people with the same skin type, breakouts, and real usage experience.
        </p>

        <div className="bg-card rounded-2xl shadow-card p-5 sm:p-6 text-left space-y-5">
          {/* Concern */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
              Main concern
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CONCERNS.map((c) => (
                <button
                  key={c}
                  onClick={() => setConcern(c)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    concern === c
                      ? "bg-primary/12 border-primary/50 text-foreground ring-1 ring-primary/20"
                      : "bg-background border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Type */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
              Skin type
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SKIN_TYPES.map((st) => (
                <button
                  key={st}
                  onClick={() => setSkinType(st)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    skinType === st
                      ? "bg-primary/12 border-primary/50 text-foreground ring-1 ring-primary/20"
                      : "bg-background border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
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
            className="w-full bg-[hsl(var(--cta-bg))] text-background hover:bg-[hsl(var(--cta-bg))]/90 text-sm font-semibold rounded-xl h-11"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Find My Match
          </Button>
        </div>

        {/* Trust micro-points */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6">
          {trustPoints.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-muted-foreground">
              <Icon className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartMatch;
