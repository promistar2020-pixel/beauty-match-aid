import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles, Activity, Shield, Droplets, Zap } from "lucide-react";
import { diagnosticQuestions, computeDiagnostic, type DiagnosticResult } from "@/lib/skinDiagnostic";

const categoryMeta: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  oil: { label: "Oil Level", icon: Droplets, color: "text-primary" },
  barrier: { label: "Skin Barrier", icon: Shield, color: "text-amber-500" },
  sensitivity: { label: "Sensitivity", icon: Zap, color: "text-rose-400" },
  breakouts: { label: "Breakouts", icon: Activity, color: "text-violet-400" },
};

const SkinTest = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const total = diagnosticQuestions.length;
  const question = diagnosticQuestions[currentQ];
  const progress = ((currentQ + 1) / total) * 100;
  const selectedIdx = answers[question.id];
  const meta = categoryMeta[question.category];
  const CategoryIcon = meta.icon;

  // Track which category section we're in
  const currentCategory = question.category;
  const categoryStart = diagnosticQuestions.findIndex((q) => q.category === currentCategory);
  const categoryIndex = currentQ - categoryStart;
  const categoryCount = diagnosticQuestions.filter((q) => q.category === currentCategory).length;

  const result = useMemo<DiagnosticResult | null>(() => {
    if (!showResults) return null;
    return computeDiagnostic(answers);
  }, [showResults, answers]);

  const handleSelect = (idx: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: idx }));
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ((s) => s + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ((s) => s - 1);
  };

  const handleViewProducts = () => {
    if (!result) return;
    navigate(`/?skinType=${encodeURIComponent(result.skinType)}&concern=${encodeURIComponent(result.mainConcern)}`);
  };

  if (showResults && result) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-2">
              Your Skin Diagnosis
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Based on 12 behavioral indicators, here's what your skin is telling us.
            </p>
          </div>

          {/* Results card */}
          <div className="bg-card rounded-2xl shadow-card p-5 mb-5 space-y-3">
            <ResultRow label="Skin Type" value={result.skinType} />
            <ResultRow label="Sensitivity" value={result.sensitivityLevel} />
            <ResultRow label="Barrier Condition" value={result.barrierCondition} />
            <ResultRow label="Main Concern" value={result.mainConcern} />
          </div>

          {/* Score bars */}
          <div className="bg-card rounded-2xl shadow-card p-5 mb-5 space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Diagnostic Scores</p>
            {(["oil", "barrier", "sensitivity", "breakouts"] as const).map((key) => {
              const m = categoryMeta[key];
              const Icon = m.icon;
              const maxScore = key === "oil" ? 9 : key === "barrier" ? 9 : key === "sensitivity" ? 9 : 8;
              const pct = Math.max(0, Math.min(100, (result.scores[key] / maxScore) * 100));
              return (
                <div key={key} className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${m.color} flex-shrink-0`} />
                  <span className="text-xs text-foreground/70 w-20 flex-shrink-0">{m.label}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary/60 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          <div className="bg-accent/30 rounded-2xl p-5 mb-6 border border-border">
            <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
              Why we classified your skin this way
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>
          </div>

          {/* CTA */}
          <Button
            onClick={handleViewProducts}
            size="lg"
            className="w-full bg-[hsl(var(--cta-bg))] text-background hover:bg-[hsl(var(--cta-bg))]/90 text-sm font-semibold rounded-xl h-12"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            See Products Matched For Me
          </Button>

          <button
            onClick={() => { setShowResults(false); setCurrentQ(0); setAnswers({}); }}
            className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors"
          >
            Retake the test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Back + Progress */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={currentQ === 0 ? () => navigate("/") : handleBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentQ === 0 ? "Home" : "Back"}</span>
          </button>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {currentQ + 1}/{total}
          </span>
        </div>

        {/* Category badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-muted ${meta.color}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            {meta.label}
          </div>
          <span className="text-xs text-muted-foreground">
            Question {categoryIndex + 1} of {categoryCount}
          </span>
        </div>

        {/* Question */}
        <div className="mb-7">
          <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-2.5 mb-8">
          {question.options.map((option, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
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
                  <span className={`text-sm ${isSelected ? "font-medium text-foreground" : "text-foreground/80"}`}>
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <Button
          onClick={handleNext}
          disabled={selectedIdx === undefined}
          size="lg"
          className="w-full bg-[hsl(var(--cta-bg))] text-background hover:bg-[hsl(var(--cta-bg))]/90 text-sm font-semibold rounded-xl h-11 disabled:opacity-40"
        >
          {currentQ < total - 1 ? (
            <>
              Next
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-1.5" />
              Get My Diagnosis
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const ResultRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-foreground">{value}</span>
  </div>
);

export default SkinTest;
