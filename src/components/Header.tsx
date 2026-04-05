import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            glowr
          </span>
          <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-md leading-none">
            beta
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Sign In
          </Button>
          <Button size="sm" className="bg-[hsl(var(--cta-bg))] text-background text-sm font-medium hover:bg-[hsl(var(--cta-bg))]/90 rounded-lg">
            Leave a Review
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
