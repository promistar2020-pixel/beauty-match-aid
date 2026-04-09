import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { SKIN_TYPES, CONCERNS, type SkinType, type Concern } from "@/data/types";

interface QuizStep {
  id: string;
  question: string;
  subtitle: string;
  options: { label: string; description?: string }[];
}

const quizSteps: QuizStep[] = [
  {
    id: "skin-type",
    question: "What's your skin type?",
    subtitle: "If you're not sure, pick the one that feels closest.",
    options: SKIN_TYPES.map((st) => ({
      label: st,
      description:
        st === "Oily" ? "Shiny T-zone, visible pores" :
        st === "Dry" ? "Tight feeling, flaky patches" :
        st === "Combination" ? "Oily in some areas, dry in others" :
        st === "Sensitive" ? "Reacts easily, redness-prone" :
        "Balanced, few issues",
    })),
  },
  {
    id: "concern",
    question: "What's your biggest skin concern?",
    subtitle: "Pick the one that bothers you the most right now.",
    options: CONCERNS.map((c) => ({ label: c })),
  },
  {
    id: "routine",
    question: "How many steps is your current routine?",
    subtitle: "There's no wrong answer here.",
    options: [
      { label: "Just water", description: "Minimal or no routine" },
      { label: "1–2 products", description: "Cleanser + moisturizer" },
      { label: "3–5 products", description: "A solid basic routine" },
      { label: "6+ products", description: "Full multi-step routine" },
    ],
  },
  {
    id: "sensitivity",
    question: "How does your skin react to new products?",
    subtitle: "This helps us filter out products that might irritate.",
    options: [
      { label: "No issues usually", description: "My skin adapts well" },
      { label: "Sometimes reacts", description: "Occasional redness or breakouts" },
      { label: "Very reactive", description: "I need to be very careful" },
    ],
  },
];

const SkinTest = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const step = quizSteps[currentStep];
  const totalSteps = quizSteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentAnswer = answers[step.id];

  const handleSelect = (label: string) => {
    setAnswers((prev) => ({ ...prev, [step.id]: label }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleViewResults = () => {
    const skinType = (answers["skin-type"] || "Oily") as SkinType;
    const concern = (answers["concern"] || "Acne / Breakouts") as Concern;
    navigate(`/?skinType=${encodeURIComponent(skinType)}&concern=${encodeURIComponent(concern)}`);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-3">
            Your skin profile is ready!
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-sm mx-auto leading-relaxed">
            Based on your answers, we'll show you products reviewed by people with{" "}
            <span className="font-medium text-foreground">{answers["skin-type"]}</span> skin who dealt with{" "}
            <span className="font-medium text-foreground">{answers["concern"]}</span>.
          </p>

          <div className="bg-card rounded-2xl shadow-card p-5 mb-6 text-left space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Skin type</span>
              <span className="font-medium text-foreground">{answers["skin-type"]}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Main concern</span>
              <span className="font-medium text-foreground">{answers["concern"]}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Routine level</span>
              <span className="font-medium text-foreground">{answers["routine"]}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Sensitivity</span>
              <span className="font-medium text-foreground">{answers["sensitivity"]}</span>
            </div>
          </div>

          <Button
            onClick={handleViewResults}
            size="lg"
            className="w-full bg-[hsl(var(--cta-bg))] text-background hover:bg-[hsl(var(--cta-bg))]/90 text-sm font-semibold rounded-xl h-12"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            See My Matches
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Back + Progress */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={currentStep === 0 ? () => navigate("/") : handleBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 0 ? "Home" : "Back"}</span>
          </button>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {currentStep + 1}/{totalSteps}
          </span>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-1.5">
            {step.question}
          </h2>
          <p className="text-sm text-muted-foreground">{step.subtitle}</p>
        </div>

        {/* Options */}
        <div className="space-y-2.5 mb-8">
          {step.options.map((option) => {
            const isSelected = currentAnswer === option.label;
            return (
              <button
                key={option.label}
                onClick={() => handleSelect(option.label)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-primary/8 border-primary/40 ring-1 ring-primary/20"
                    : "bg-card border-border hover:border-primary/25 hover:bg-accent/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-background" />}
                  </div>
                  <div>
                    <span className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                      {option.label}
                    </span>
                    {option.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <Button
          onClick={handleNext}
          disabled={!currentAnswer}
          size="lg"
          className="w-full bg-[hsl(var(--cta-bg))] text-background hover:bg-[hsl(var(--cta-bg))]/90 text-sm font-semibold rounded-xl h-11 disabled:opacity-40"
        >
          {currentStep < totalSteps - 1 ? (
            <>
              Next
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-1.5" />
              See My Results
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SkinTest;
