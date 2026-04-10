import type { SkinType, Concern } from "@/data/types";

export interface DiagnosticQuestion {
  id: string;
  category: "oil" | "barrier" | "sensitivity" | "breakouts";
  question: string;
  options: { label: string; scores: { oil: number; barrier: number; sensitivity: number; breakouts: number } }[];
}

export const diagnosticQuestions: DiagnosticQuestion[] = [
  // — Oil Level (3 questions) —
  {
    id: "q1",
    category: "oil",
    question: "By midday, how does your T-zone (forehead, nose, chin) feel?",
    options: [
      { label: "Noticeably shiny or greasy", scores: { oil: 3, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Slightly dewy but comfortable", scores: { oil: 1, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "About the same as morning", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Tight or matte-looking", scores: { oil: -2, barrier: 1, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q2",
    category: "oil",
    question: "How quickly does your face feel oily after washing?",
    options: [
      { label: "Within an hour", scores: { oil: 3, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "After a few hours", scores: { oil: 1, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Doesn't really get oily", scores: { oil: -1, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Never — it stays dry", scores: { oil: -3, barrier: 1, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q3",
    category: "oil",
    question: "When you press a tissue against your cheek in the afternoon, what happens?",
    options: [
      { label: "Clear oil residue on the tissue", scores: { oil: 3, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Only oily in T-zone, cheeks are fine", scores: { oil: 1, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Tissue is clean", scores: { oil: -1, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Tissue picks up flaky bits", scores: { oil: -2, barrier: 2, sensitivity: 0, breakouts: 0 } },
    ],
  },
  // — Barrier / Dryness (3 questions) —
  {
    id: "q4",
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
    id: "q5",
    category: "barrier",
    question: "Do you notice rough, flaky, or peeling patches on your face?",
    options: [
      { label: "Frequently — especially around nose or cheeks", scores: { oil: 0, barrier: 3, sensitivity: 1, breakouts: 0 } },
      { label: "Only in winter or dry weather", scores: { oil: 0, barrier: 1, sensitivity: 0, breakouts: 0 } },
      { label: "Rarely or never", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q6",
    category: "barrier",
    question: "How does your skin react to rich moisturizers or facial oils?",
    options: [
      { label: "Absorbs them quickly — still wants more", scores: { oil: 0, barrier: 3, sensitivity: 0, breakouts: 0 } },
      { label: "Feels good for a while then dries out", scores: { oil: 0, barrier: 1, sensitivity: 0, breakouts: 0 } },
      { label: "Sits comfortably without feeling heavy", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
      { label: "Feels too heavy and causes breakouts", scores: { oil: 1, barrier: -1, sensitivity: 0, breakouts: 1 } },
    ],
  },
  // — Sensitivity (3 questions) —
  {
    id: "q7",
    category: "sensitivity",
    question: "When you try a new skincare product, what typically happens?",
    options: [
      { label: "Redness, stinging, or irritation within a day", scores: { oil: 0, barrier: 1, sensitivity: 3, breakouts: 0 } },
      { label: "Occasionally a mild reaction", scores: { oil: 0, barrier: 0, sensitivity: 1, breakouts: 0 } },
      { label: "Usually nothing — my skin adapts easily", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q8",
    category: "sensitivity",
    question: "Does your skin turn red or sting after sun exposure, hot water, or spicy food?",
    options: [
      { label: "Yes, very easily and often", scores: { oil: 0, barrier: 0, sensitivity: 3, breakouts: 0 } },
      { label: "Sometimes, with extreme triggers", scores: { oil: 0, barrier: 0, sensitivity: 1, breakouts: 0 } },
      { label: "Not really", scores: { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 } },
    ],
  },
  {
    id: "q9",
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
    id: "q10",
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
    id: "q11",
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
    id: "q12",
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
  scores: { oil: number; barrier: number; sensitivity: number; breakouts: number };
  explanation: string;
}

const categoryLabels: Record<string, string> = {
  oil: "Oil Level",
  barrier: "Skin Barrier / Dryness",
  sensitivity: "Sensitivity",
  breakouts: "Breakouts",
};

export function computeDiagnostic(answers: Record<string, number>): DiagnosticResult {
  const scores = { oil: 0, barrier: 0, sensitivity: 0, breakouts: 0 };

  diagnosticQuestions.forEach((q) => {
    const idx = answers[q.id];
    if (idx !== undefined && q.options[idx]) {
      const s = q.options[idx].scores;
      scores.oil += s.oil;
      scores.barrier += s.barrier;
      scores.sensitivity += s.sensitivity;
      scores.breakouts += s.breakouts;
    }
  });

  // Derive skin type
  let skinType: SkinType;
  if (scores.sensitivity >= 5) {
    skinType = "Sensitive";
  } else if (scores.oil >= 5 && scores.barrier >= 3) {
    skinType = "Combination";
  } else if (scores.oil >= 4) {
    skinType = "Oily";
  } else if (scores.barrier >= 4) {
    skinType = "Dry";
  } else if (scores.oil >= 2 && scores.barrier >= 2) {
    skinType = "Combination";
  } else {
    skinType = "Normal";
  }

  const sensitivityLevel: DiagnosticResult["sensitivityLevel"] =
    scores.sensitivity >= 6 ? "High" : scores.sensitivity >= 3 ? "Moderate" : "Low";

  const barrierCondition: DiagnosticResult["barrierCondition"] =
    scores.barrier >= 6 ? "Compromised" : scores.barrier >= 3 ? "Slightly Compromised" : "Healthy";

  // Derive main concern
  const concernMap: { key: keyof typeof scores; concern: Concern }[] = [
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
  if (skinType === "Oily") reasons.push("Your answers suggest significant oil production throughout the day, especially in the T-zone.");
  else if (skinType === "Dry") reasons.push("Your responses indicate your skin struggles to retain moisture and often feels tight after cleansing.");
  else if (skinType === "Combination") reasons.push("You showed signs of both excess oil in some areas and dryness in others — a classic combination pattern.");
  else if (skinType === "Sensitive") reasons.push("Multiple answers pointed to reactive skin that flushes easily and doesn't tolerate new products well.");
  else reasons.push("Your skin appears well-balanced with no dominant concerns — a sign of a healthy baseline.");

  if (sensitivityLevel === "High") reasons.push("Your sensitivity score was elevated, meaning ingredient choices and formulation gentleness matter a lot for you.");
  if (barrierCondition === "Compromised") reasons.push("Signs of barrier damage were present — flakiness, tightness, and rapid moisture loss suggest your barrier needs repair.");
  if (scores.breakouts >= 4) reasons.push("Frequent breakouts and post-inflammatory marks indicate acne management should be a priority in your routine.");

  return {
    skinType,
    sensitivityLevel,
    barrierCondition,
    mainConcern,
    scores,
    explanation: reasons.join(" "),
  };
}
