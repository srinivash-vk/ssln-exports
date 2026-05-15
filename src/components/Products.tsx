import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product, DETAILED_PRODUCTS } from "../types";
import { PRODUCT_CATEGORIES } from "../constants";
import ColorPalette from "./ColorPalette";

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

/**
 * ProductCard Component: Displays individual product details with a focused image gallery.
 */
const ProductCard: React.FC<ProductCardProps> = memo(({ product, onSelectProduct }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery Navigation: Advances to the next image
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents card-level click event
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  // Gallery Navigation: Returns to the previous image
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents card-level click event
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div 
      className="group cursor-pointer gsap-fade-up flex flex-col items-center glass-card p-5 sm:p-6 rounded-[2rem] transition-all duration-400 hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => onSelectProduct(product)}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-white/50 mb-4 shadow-sm border border-white/20 rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImageIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            src={product.images[currentImageIndex]} 
            alt={`Premium ${product.category} for Export`} 
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-600 ease-out"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button 
              onClick={prevImage}
              className="w-7 h-7 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 shadow-lg pointer-events-auto transform hover:scale-110 transition-transform active:scale-95"
            >
              <ChevronLeft size={14} />
            </button>
            <button 
              onClick={nextImage}
              className="w-7 h-7 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 shadow-lg pointer-events-auto transform hover:scale-110 transition-transform active:scale-95"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.images.map((_, idx) => (
              <div 
                key={idx}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? "bg-white w-2.5" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-700 pointer-events-none" />
      </div>
      <div className="text-center px-4 w-full flex flex-col items-center">
        <h3 className="font-display text-2xl sm:text-3xl font-light text-slate-900 mb-4 italic tracking-wide">{product.category}</h3>
        
        <div className="flex justify-center items-center gap-3 mb-4 py-3 border-y border-white/30 w-full text-[11px]">
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 leading-none">Size</p>
            <p className="font-medium text-[13px] text-slate-800">{product.size}</p>
          </div>
          <div className="w-[1px] h-6 bg-white/30" />
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 leading-none">GSM</p>
            <p className="font-medium text-[13px] text-slate-800">{product.gsm}</p>
          </div>
          <div className="w-[1px] h-6 bg-white/30" />
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 leading-none">Weight</p>
            <p className="font-medium text-[13px] text-slate-800">{product.weight}</p>
          </div>
        </div>

        <div className="mb-4 flex flex-col items-center scale-85 origin-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-3">Color Palette</span>
          <ColorPalette colors={product.color} />
        </div>

        <div className="mt-auto pb-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
            className="relative group inline-flex items-center text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 pb-2 px-2"
          >
            <span className="relative z-10 transition-transform group-hover:-translate-y-px">Inquiry</span>
            <span className="absolute bottom-0 left-0 h-[1px] w-full bg-slate-200" />
            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-slate-900 transition-all duration-500 ease-in-out group-hover:w-full" />
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

/**
 * Products Component: Managed categorized product views and tab-based filtering.
 */
const Products = memo(({ onSelectProduct }: { onSelectProduct: (product: Product) => void }) => {
  const [activeTab, setActiveTab] = useState(PRODUCT_CATEGORIES[0]);

  /**
   * items: Merges static detailed product specifications with visual assets.
   * memoized to prevent expensive re-calculations on tab switches.
   */
  const products: { category: string; items: Product[] }[] = useMemo(() => {
    // Mapping of categories to curated Unsplash assets
    const categoryImages: Record<string, string[]> = {
      "Face Towel": [
        "https://images.unsplash.com/photo-1616627187314-06023869612f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1616627141141-4e1e3370ed39?auto=format&fit=crop&q=80&w=800"
      ],
      "Hand Towel": [
        "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1616627187314-06023869612f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
      ],
      "Bath Towel": [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&q=80&w=800"
      ],
      "Bleach Towels": [
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1567016432779-c4d97b11bf43?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1523475496153-3d6cc82db54f?auto=format&fit=crop&q=80&w=800"
      ],
      "Set Towels": [
        "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&q=80&w=800", // Black
        "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800", // Navy Blue
        "https://images.unsplash.com/photo-1616627187314-06023869612f?auto=format&fit=crop&q=80&w=800", // Beige
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", // Brown
        "https://images.unsplash.com/photo-1616627141141-4e1e3370ed39?auto=format&fit=crop&q=80&w=800"  // Grey
      ]
    };

    return PRODUCT_CATEGORIES.map(cat => ({
      category: cat,
      items: (DETAILED_PRODUCTS[cat] || []).map((spec, i) => {
        let images = categoryImages[cat] || ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"];
        
        // Use specific images for categories where each card represents a distinct color or variation
        const needsSpecificImage = ["Set Towels"].includes(cat);
        if (needsSpecificImage && categoryImages[cat] && categoryImages[cat][i]) {
          images = [categoryImages[cat][i]];
        }

        return {
          id: `${cat}-${i}`,
          category: cat,
          ...spec,
          images
        };
      })
    }));
  }, []);

  const activeProducts = useMemo(() => {
    return products.find(p => p.category === activeTab)?.items || [];
  }, [products, activeTab]);

  return (
    <section id="products" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-24 gsap-fade-up">
          <span className="text-[10px] font-medium tracking-[0.5em] text-slate-400 uppercase mb-6 block">The Collection</span>
          <h2 className="font-display text-5xl md:text-6xl font-light text-slate-900 mb-8 italic">Curated Excellence</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            A symphony of texture and durability. Each piece in our collection is a testament to our commitment to artisanal quality.
          </p>
        </div>

        {/* Minimalist Tabs */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-24 p-2 glass rounded-full w-fit mx-auto gsap-fade-up">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 rounded-full ${
                activeTab === cat 
                  ? "text-slate-900" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeTab === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 max-w-7xl mx-auto px-4 md:px-0">
          {activeProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelectProduct={onSelectProduct} 
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Products.displayName = "Products";

export default Products;
