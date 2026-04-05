import { Search, Users, ShoppingBag } from "lucide-react";

const proofPoints = [
  {
    icon: Search,
    title: "Concern-based discovery",
    description: "Find products that actually worked for your specific skin issues",
  },
  {
    icon: Users,
    title: "Compare by skin type",
    description: "See how products perform for people with skin like yours",
  },
  {
    icon: ShoppingBag,
    title: "Real purchase details",
    description: "Know where reviewers bought products and if they'd buy again",
  },
];

const SocialProof = () => {
  return (
    <section className="container py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground text-center mb-2">
          Built for smarter skincare decisions
        </h2>
        <p className="text-muted-foreground text-sm text-center mb-8 max-w-md mx-auto">
          Generic star ratings don't tell you if a product works for your skin. We do.
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {proofPoints.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="text-center p-5 rounded-2xl bg-card border border-border shadow-card"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
