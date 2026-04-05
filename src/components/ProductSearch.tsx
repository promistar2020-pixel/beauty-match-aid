import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { products, type Product } from "@/data/mockData";

interface ProductSearchProps {
  onSelect: (product: Product) => void;
}

const ProductSearch = ({ onSelect }: ProductSearchProps) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length > 0
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search for a product, brand, or ingredient"
          className="w-full pl-10 pr-9 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {focused && query.trim().length > 0 && (
        <div className="absolute z-50 top-full mt-1.5 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-fade-in-up">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No products found for "{query}"
            </div>
          ) : (
            results.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  onSelect(product);
                  setQuery("");
                  setFocused(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border/40 last:border-b-0"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/50 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-primary">{product.brand.charAt(0)}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                  <p className="text-[11px] text-muted-foreground">{product.brand} · {product.category}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* Browse hint */}
      {!focused && !query && (
        <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
          <span className="text-[11px] text-muted-foreground">Popular:</span>
          {products.slice(0, 3).map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              className="text-[11px] font-medium text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/30 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
