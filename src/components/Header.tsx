import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
            glowr
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground">
            Sign In
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
            Leave a Review
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
