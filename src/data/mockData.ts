export type SkinType = "Oily" | "Dry" | "Combination" | "Sensitive" | "Normal";
export type Concern = "Acne / Breakouts" | "Hyperpigmentation" | "Dryness" | "Aging" | "Redness";

export interface Review {
  id: string;
  rating: number;
  skinType: SkinType;
  usagePeriod: string;
  wouldBuyAgain: boolean;
  purchasedAt: string;
  concernTags: Concern[];
  text: string;
  authorName: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  concernTags: Concern[];
  averageRating: number;
  shortDescription: string;
  reviews: Review[];
}

export const SKIN_TYPES: SkinType[] = ["Oily", "Dry", "Combination", "Sensitive", "Normal"];
export const CONCERNS: Concern[] = ["Acne / Breakouts", "Hyperpigmentation", "Dryness", "Aging", "Redness"];

export const products: Product[] = [
  {
    id: "1",
    name: "Acne Foam Cleanser",
    category: "Cleanser",
    brand: "Abib",
    concernTags: ["Acne / Breakouts", "Redness"],
    averageRating: 4.3,
    shortDescription: "pH-balanced gentle foam cleanser formulated with BHA and heartleaf extract to calm breakouts without stripping moisture.",
    reviews: [
      {
        id: "r1",
        rating: 5,
        skinType: "Oily",
        usagePeriod: "2 months",
        wouldBuyAgain: true,
        purchasedAt: "Shopee",
        concernTags: ["Acne / Breakouts"],
        text: "This cleanser is a game changer for my oily, acne-prone skin. After two months of consistent use, my breakouts have calmed down significantly. It doesn't leave that tight, stripped feeling—my skin feels clean but still comfortable. The foam is dense and rinses off easily.",
        authorName: "Mina K.",
      },
      {
        id: "r2",
        rating: 4,
        skinType: "Combination",
        usagePeriod: "1 month",
        wouldBuyAgain: true,
        purchasedAt: "Amazon",
        concernTags: ["Acne / Breakouts"],
        text: "I was skeptical about switching from my usual cleanser, but this one surprised me. My T-zone breakouts have reduced noticeably. The only reason I'm not giving 5 stars is that it could be slightly more hydrating for my dry cheeks.",
        authorName: "Sarah L.",
      },
      {
        id: "r3",
        rating: 3,
        skinType: "Dry",
        usagePeriod: "3 weeks",
        wouldBuyAgain: false,
        purchasedAt: "Watsons",
        concernTags: ["Acne / Breakouts", "Dryness"],
        text: "It's okay for acne but a bit too drying for my skin type. I noticed fewer pimples but my cheeks started flaking after two weeks. Might work better for oilier skin types. I switched back to a cream cleanser.",
        authorName: "Jessica T.",
      },
      {
        id: "r4",
        rating: 5,
        skinType: "Sensitive",
        usagePeriod: "6 weeks",
        wouldBuyAgain: true,
        purchasedAt: "Olive Young",
        concernTags: ["Acne / Breakouts", "Redness"],
        text: "I have very reactive, sensitive skin and was worried about trying a new cleanser. This one is incredibly gentle—no stinging, no redness after washing. My hormonal chin acne has improved noticeably. Absolutely love it.",
        authorName: "Emily R.",
      },
    ],
  },
  {
    id: "2",
    name: "Green Tea Enzyme Serum",
    category: "Serum",
    brand: "Innisfree",
    concernTags: ["Acne / Breakouts", "Hyperpigmentation"],
    averageRating: 4.1,
    shortDescription: "Lightweight enzyme serum with Jeju green tea extract that gently resurfaces skin, fades post-acne marks, and controls excess sebum.",
    reviews: [
      {
        id: "r5",
        rating: 4,
        skinType: "Oily",
        usagePeriod: "2 months",
        wouldBuyAgain: true,
        purchasedAt: "Amazon",
        concernTags: ["Acne / Breakouts", "Hyperpigmentation"],
        text: "Great lightweight serum that absorbs quickly without leaving any greasy residue. My dark spots from old breakouts have started fading. It layers well under sunscreen. Only wish it came in a larger size for the price.",
        authorName: "Daniel W.",
      },
      {
        id: "r6",
        rating: 5,
        skinType: "Combination",
        usagePeriod: "3 months",
        wouldBuyAgain: true,
        purchasedAt: "Shopee",
        concernTags: ["Acne / Breakouts"],
        text: "Three months in and my skin texture is smoother than it's been in years. The enzyme action is gentle enough for daily use. I've gone from constant small bumps on my forehead to mostly clear skin. This is now a permanent part of my routine.",
        authorName: "Priya M.",
      },
      {
        id: "r7",
        rating: 3,
        skinType: "Normal",
        usagePeriod: "1 month",
        wouldBuyAgain: false,
        purchasedAt: "Watsons",
        concernTags: ["Acne / Breakouts"],
        text: "Decent serum but I didn't notice dramatic results for my occasional breakouts. Might be better suited for more oily/acne-prone skin. The texture is nice though, very lightweight and not sticky at all.",
        authorName: "Alex C.",
      },
      {
        id: "r8",
        rating: 4,
        skinType: "Sensitive",
        usagePeriod: "6 weeks",
        wouldBuyAgain: true,
        purchasedAt: "Olive Young",
        concernTags: ["Acne / Breakouts", "Redness"],
        text: "I was cautious about enzymes on my sensitive skin but this is very mild. It's helped with my stress-related breakouts and the redness around my nose has calmed down. I use it every other night to be safe.",
        authorName: "Hannah J.",
      },
    ],
  },
  {
    id: "3",
    name: "Centella Green Level Serum",
    category: "Serum",
    brand: "PURITO",
    concernTags: ["Acne / Breakouts", "Redness"],
    averageRating: 4.5,
    shortDescription: "Soothing centella serum with 49% centella extract to heal acne scars, reduce inflammation, and strengthen the skin barrier.",
    reviews: [
      {
        id: "r9",
        rating: 5,
        skinType: "Sensitive",
        usagePeriod: "2 months",
        wouldBuyAgain: true,
        purchasedAt: "Amazon",
        concernTags: ["Acne / Breakouts", "Redness"],
        text: "If you have irritated, acne-prone sensitive skin—this is for you. My redness and inflammation went down within the first week. After two months, my acne scars are visibly lighter. The texture is like water and it never pills under makeup.",
        authorName: "Chloe N.",
      },
      {
        id: "r10",
        rating: 5,
        skinType: "Oily",
        usagePeriod: "3 months",
        wouldBuyAgain: true,
        purchasedAt: "Shopee",
        concernTags: ["Acne / Breakouts"],
        text: "Holy grail status. This serum calmed my aggressive cystic acne phase better than some prescription treatments. I use it morning and night. My skin looks healthier and more even-toned than it has in years.",
        authorName: "Ryan P.",
      },
      {
        id: "r11",
        rating: 4,
        skinType: "Dry",
        usagePeriod: "1 month",
        wouldBuyAgain: true,
        purchasedAt: "Watsons",
        concernTags: ["Acne / Breakouts", "Dryness"],
        text: "Really calming and gentle. Helped with my occasional breakouts without making my already dry skin worse. I layer it with a heavier moisturizer and the combination works perfectly. Would recommend for dry skin acne sufferers.",
        authorName: "Olivia F.",
      },
    ],
  },
  {
    id: "4",
    name: "AHA/BHA Clarifying Treatment Toner",
    category: "Toner",
    brand: "COSRX",
    concernTags: ["Acne / Breakouts", "Hyperpigmentation"],
    averageRating: 4.0,
    shortDescription: "Gentle exfoliating toner with natural AHA and BHA to unclog pores, prevent breakouts, and improve skin clarity over time.",
    reviews: [
      {
        id: "r12",
        rating: 4,
        skinType: "Oily",
        usagePeriod: "2 months",
        wouldBuyAgain: true,
        purchasedAt: "Shopee",
        concernTags: ["Acne / Breakouts"],
        text: "Solid toner for keeping pores clear. I use it after cleansing and before serum. My blackheads on my nose have reduced significantly. Not too harsh, which I appreciate. The bottle lasts forever too.",
        authorName: "Kevin L.",
      },
      {
        id: "r13",
        rating: 4,
        skinType: "Combination",
        usagePeriod: "6 weeks",
        wouldBuyAgain: true,
        purchasedAt: "Amazon",
        concernTags: ["Acne / Breakouts", "Hyperpigmentation"],
        text: "Good daily exfoliant that doesn't over-do it. My skin texture has improved and the dark spots from old acne are slowly fading. I appreciate that it's not irritating—some AHA toners wreck my skin but this one is balanced.",
        authorName: "Nadia S.",
      },
      {
        id: "r14",
        rating: 3,
        skinType: "Sensitive",
        usagePeriod: "3 weeks",
        wouldBuyAgain: false,
        purchasedAt: "Watsons",
        concernTags: ["Acne / Breakouts", "Redness"],
        text: "A bit too active for my sensitive skin when used daily. I got some mild stinging around my nose. Tried every other day and it was better but still not ideal for me. I think this is best for normal to oily skin types.",
        authorName: "Lisa H.",
      },
    ],
  },
];

export function getFilteredProducts(concern: Concern | null, skinType: SkinType | null): Product[] {
  let filtered = products;

  if (concern) {
    filtered = filtered.filter((p) => p.concernTags.includes(concern));
  }

  if (skinType) {
    // Sort by how well the product performs for this skin type
    filtered = filtered
      .map((p) => {
        const relevantReviews = p.reviews.filter(
          (r) => r.skinType === skinType && (!concern || r.concernTags.includes(concern))
        );
        const allReviews = p.reviews.filter((r) => !concern || r.concernTags.includes(concern));
        const avgRelevant =
          relevantReviews.length > 0
            ? relevantReviews.reduce((sum, r) => sum + r.rating, 0) / relevantReviews.length
            : 0;
        const avgAll =
          allReviews.length > 0
            ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
            : 0;
        const matchScore = relevantReviews.length > 0 ? avgRelevant : avgAll * 0.7;
        return { ...p, matchScore };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }

  return filtered;
}
