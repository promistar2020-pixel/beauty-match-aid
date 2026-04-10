import type { SkinType, Concern } from "@/data/types";

export interface DiagnosticQuestion {
  id: string;
  category: "oil" | "barrier" | "sensitivity" | "breakouts";
  question: string;
  options: { label: string; scores: { oil: number; barrier: number; sensitivity: number; breakouts: number; dehydration?: number } }[];
}

export const diagnosticQuestions: DiagnosticQuestion[] = [
  // — Oil Level (6 questions) —
  {
    id: "q1",
    category: "oil",
    question: "By midday, how does your T-zone (forehead, nose, chin) feel?",
    options: [
      { label: "Noticeably shiny or greasy", scores: { oil: 2, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Slightly dewy but comfortable", scores: { oil: 1, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "About the same as morning", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Tight or matte-looking", scores: { oil: -1, barrier: 1, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q2",
    category: "oil",
    question: "When you press a tissue against your cheek in the afternoon, what happens?",
    options: [
      { label: "Clear oil residue on the tissue", scores: { oil: 2, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Only oily in T-zone, cheeks are fine", scores: { oil: 1, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Tissue is clean", scores: { oil: -1, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Tissue picks up flaky bits", scores: { oil: -1, barrier: 2, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q3",
    category: "oil",
    question: "How quickly does your skin become shiny after cleansing (without applying products)?",
    options: [
      { label: "Within 1 hour", scores: { oil: 3, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "After 2–4 hours", scores: { oil: 1, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Only by the end of the day", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Rarely", scores: { oil: -1, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q4",
    category: "oil",
    question: "How intense is the oiliness you experience?",
    options: [
      { label: "Very shiny / greasy", scores: { oil: 3, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Slight shine", scores: { oil: 1, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Barely noticeable", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q5",
    category: "oil",
    question: "Does your skin feel oily but also tight or dry?",
    options: [
      { label: "Yes", scores: { oil: 0, barrier: 1, sensitivity: 0, breakouts: 0, dehydration: 3 } },
      { label: "No", scores: { oil: 1, barrier: 0, sensitivity: 0, breakouts: 0, dehydration: 0 } },
      { label: "Not sure", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0, dehydration: 1 } },
    ],
  },
  // — Barrier / Dryness (3 questions) —
  {
    id: "q6",
    category: "barrier",
    question: "After cleansing, how does your skin feel before applying anything?",
    options: [
      { label: "Tight, like it needs moisture immediately", scores: { oil: 0, barrier: 3, sensitivity: 0, breakouts: 0 } },
      { label: "Slightly dry but manageable", scores: { oil: 0, barrier: 1, sensitivity: 0, breakouts: 0 } },
      { label: "Comfortable and balanced", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Already feels oily again", scores: { oil: 1, barrier: -1, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q7",
    category: "barrier",
    question: "Do you notice rough, flaky, or peeling patches on your face?",
    options: [
      { label: "Frequently — especially around nose or cheeks", scores: { oil: 0, barrier: 3, sensitivity: 1, breakouts: 0 } },
      { label: "Only in winter or dry weather", scores: { oil: 0, barrier: 1, sensitivity: 0, breakouts: 0 } },
      { label: "Rarely or never", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q8",
    category: "barrier",
    question: "How does your skin feel after applying a heavier cream (thick or nourishing moisturizer)?",
    options: [
      { label: "Absorbs it quickly — still wants more", scores: { oil: 0, barrier: 3, sensitivity: 0, breakouts: 0 } },
      { label: "Feels good for a while then dries out", scores: { oil: 0, barrier: 1, sensitivity: 0, breakouts: 0 } },
      { label: "Sits comfortably without feeling heavy", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Feels too heavy and causes breakouts", scores: { oil: 1, barrier: -1, sensitivity: 0, breakouts: 1 } },
    ],
  },
  // — Sensitivity (3 questions) —
  {
    id: "q9",
    category: "sensitivity",
    question: "When you try a new skincare product, what typically happens?",
    options: [
      { label: "Redness, stinging, or irritation within a day", scores: { oil: 0, barrier: 1, sensitivity: 3, breakouts: 0 } },
      { label: "Occasionally a mild reaction", scores: { oil: 0, barrier: 0, sensitivity: 1, breakouts: 0 } },
      { label: "Usually nothing — my skin adapts easily", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q10",
    category: "sensitivity",
    question: "Does your skin turn red or sting after sun exposure, hot water, or spicy food?",
    options: [
      { label: "Yes, very easily and often", scores: { oil: 0, barrier: 0, sensitivity: 3, breakouts: 0 } },
      { label: "Sometimes, with extreme triggers", scores: { oil: 0, barrier: 0, sensitivity: 1, breakouts: 0 } },
      { label: "Not really", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q11",
    category: "sensitivity",
    question: "Do you experience visible redness or flushing on your cheeks regularly?",
    options: [
      { label: "Yes — almost always some redness", scores: { oil: 0, barrier: 0, sensitivity: 3, breakouts: 0 } },
      { label: "Occasionally after triggers", scores: { oil: 0, barrier: 0, sensitivity: 1, breakouts: 0 } },
      { label: "My skin tone stays even", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
  // — Breakouts (3 questions) —
  {
    id: "q12",
    category: "breakouts",
    question: "How often do you get pimples, whiteheads, or blackheads?",
    options: [
      { label: "Constantly — it's an ongoing struggle", scores: { oil: 1, barrier: 0, sensitivity: 0, breakouts: 3 } },
      { label: "Regularly around my cycle or stress", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 2 } },
      { label: "Occasionally — a few times a month", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 1 } },
      { label: "Rarely or never", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q13",
    category: "breakouts",
    question: "Where do breakouts tend to appear most?",
    options: [
      { label: "Chin and jawline", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 2 } },
      { label: "Forehead and nose", scores: { oil: 1, barrier: 0, sensitivity: 0, breakouts: 2 } },
      { label: "Cheeks", scores: { oil: 0, barrier: 0, sensitivity: 1, breakouts: 2 } },
      { label: "I don't really get breakouts", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q14",
    category: "breakouts",
    question: "Do breakouts leave dark marks or scars that linger?",
    options: [
      { label: "Yes — marks stay for weeks or months", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 2 } },
      { label: "Sometimes — they fade slowly", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 1 } },
      { label: "Not really — they clear quickly", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
];

export interface DiagnosticResult {
  skinType: SkinType;
  sensitivityLevel: "Low" | "Moderate" | "High";
  barrierCondition: "Healthy" | "Slightly Compromised" | "Compromised";
  mainConcern: Concern;
  isDehydrated: boolean;
  scores: { oil: number; barrier: number; sensitivity: number; breakouts: number; dehydration: number };
  explanation: string;
}

export const categoryMeta = {
  oil: "Oil Level",
  barrier: "Skin Barrier / Dryness",
  sensitivity: "Sensitivity",
  breakouts: "Breakouts",
} as const;

export function computeDiagnostic(answers: Record<string, number>): DiagnosticResult {
  const scores = { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0, dehydration: 0 };

  diagnosticQuestions.forEach((q) => {
    const idx = answers[q.id];
    if (idx !== undefined && q.options[idx]) {
      const s = q.options[idx].scores;
      scores.oil += s.oil;
      scores.barrier += s.barrier;
      scores.sensitivity += s.sensitivity;
      scores.breakouts += s.breakouts;
      scores.dehydration += s.dehydration ?? 0;
    }
  });

  const isDehydrated = scores.dehydration >= 2;

  // Derive skin type — stricter oily thresholds, dehydration awareness
  let skinType: SkinType;
  if (scores.sensitivity >= 5) {
    skinType = "Sensitive";
  } else if (isDehydrated && scores.oil >= 3) {
    // Oily + tight/dry signals → combination, not oily
    skinType = "Combination";
  } else if (scores.oil >= 7) {
    // Only truly oily with very high, consistent oil scores
    skinType = "Oily";
  } else if (scores.oil >= 4 && scores.barrier >= 3) {
    skinType = "Combination";
  } else if (scores.barrier >= 5) {
    skinType = "Dry";
  } else if (scores.oil >= 3 && scores.barrier >= 2) {
    skinType = "Combination";
  } else if (scores.barrier >= 3) {
    skinType = "Dry";
  } else {
    skinType = "Normal";
  }

  const sensitivityLevel: DiagnosticResult["sensitivityLevel"] =
    scores.sensitivity >= 6 ? "High" : scores.sensitivity >= 3 ? "Moderate" : "Low";

  const barrierCondition: DiagnosticResult["barrierCondition"] =
    scores.barrier >= 6 ? "Compromised" : scores.barrier >= 3 ? "Slightly Compromised" : "Healthy";

  // Derive main concern
  const concernMap: { key: "breakouts" | "barrier" | "sensitivity"; concern: Concern }[] = [
    { key: "breakouts", concern: "Acne / Breakouts" },
    { key: "barrier", concern: "Dryness" },
    { key: "sensitivity", concern: "Redness" },
  ];
  let mainConcern: Concern = "Acne / Breakouts";
  let maxScore = -1;
  for (const { key, concern } of concernMap) {
    if (scores[key] > maxScore) {
      maxScore = scores[key];
      mainConcern = concern;
    }
  }
  if (maxScore <= 1) {
    mainConcern = scores.oil >= 3 ? "Acne / Breakouts" : "Aging";
  }

  // Build explanation
  const reasons: string[] = [];

  if (skinType === "Oily") {
    reasons.push("Multiple strong indicators of oil production — fast shine after cleansing, visible greasiness throughout the day, and high oil intensity — point to genuinely oily skin.");
  } else if (skinType === "Combination" && isDehydrated) {
    reasons.push("Your skin shows oiliness but also tightness or dryness, which is a hallmark of dehydrated-combination skin. The oil may be your skin overproducing sebum to compensate for moisture loss, not true oiliness.");
  } else if (skinType === "Combination") {
    reasons.push("You showed signs of oil in some zones but dryness in others — a classic combination pattern where the T-zone and cheeks behave differently.");
  } else if (skinType === "Dry") {
    reasons.push("Your responses indicate your skin struggles to retain moisture, often feels tight after cleansing, and absorbs heavy creams quickly.");
  } else if (skinType === "Sensitive") {
    reasons.push("Multiple answers pointed to reactive skin that flushes easily and doesn't tolerate new products well.");
  } else {
    reasons.push("Your skin appears well-balanced with no dominant concerns — a sign of a healthy baseline.");
  }

  if (isDehydrated && skinType !== "Combination") {
    reasons.push("We also detected signs of dehydration — your skin may lack water even if it produces enough oil. A hydrating routine could help.");
  }

  if (sensitivityLevel === "High") reasons.push("Your sensitivity score was elevated, meaning ingredient gentleness matters a lot for you.");
  if (barrierCondition === "Compromised") reasons.push("Signs of barrier damage were present — flakiness, tightness, and rapid moisture loss suggest your barrier needs repair.");
  if (scores.breakouts >= 4) reasons.push("Frequent breakouts and post-inflammatory marks indicate acne management should be a priority in your routine.");

  return {
    skinType,
    sensitivityLevel,
    barrierCondition,
    mainConcern,
    isDehydrated,
    scores,
    explanation: reasons.join(" "),
  };
}
