import { Fingerprint, Users, Clock } from "lucide-react";

const proofPoints = [
  { icon: Fingerprint, label: "Same skin type" },
  { icon: Users, label: "Same concern" },
  { icon: Clock, label: "Real usage period" },
];

const SocialProof = () => {
  return (
    <section className="container py-8 sm:py-10">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Why matched reviews matter
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="flex items-center justify-center gap-6 sm:gap-8">
          {proofPoints.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-muted-foreground">
              <div className="w-7 h-7 rounded-full bg-primary/8 flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
