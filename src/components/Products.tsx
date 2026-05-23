import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product, DETAILED_PRODUCTS } from "../types";
import { PRODUCT_CATEGORIES } from "../constants";
import ColorPalette from "./ColorPalette";
import { AnimatedElement } from "./AnimatedElement";

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

/**
 * ProductCard Component: Displays individual product details with a focused image gallery.
 */
const ProductCard: React.FC<ProductCardProps> = memo(({ product, onSelectProduct }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isManuallyNavigated, setIsManuallyNavigated] = useState(false);

  // Gallery Navigation: Advances to the next image
  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevents card-level click event
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    setIsManuallyNavigated(true);
  };

  // Gallery Navigation: Returns to the previous image
  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevents card-level click event
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    setIsManuallyNavigated(true);
  };

  // Auto-carousel: advance image every 3s unless hovered or manually navigated
  React.useEffect(() => {
    if (isHovered || isManuallyNavigated || product.images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, isManuallyNavigated, product.images.length]);

  // Reset manual navigation after a short delay to resume auto-carousel
  React.useEffect(() => {
    if (!isManuallyNavigated) return;
    const timeout = setTimeout(() => setIsManuallyNavigated(false), 6000);
    return () => clearTimeout(timeout);
  }, [isManuallyNavigated]);

  return (
    <div
      className="group cursor-pointer flex flex-col items-center glass-card p-5 sm:p-6 rounded-[2rem] transition-all duration-400 hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
              tabIndex={-1}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={nextImage}
              className="w-7 h-7 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 shadow-lg pointer-events-auto transform hover:scale-110 transition-transform active:scale-95"
              tabIndex={-1}
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
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">Colors Available</span>
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
        "/assets/products/hand-towel/white_handTowel.jpeg",
        "/assets/products/hand-towel/black_handTowel.jpeg",
        "/assets/products/hand-towel/burgundy_handTowel.jpeg",
        "/assets/products/hand-towel/navy_handTowel.jpeg",
        "/assets/products/hand-towel/green_handTowel.jpeg",
        "/assets/products/hand-towel/grey_handTowel.jpeg",
        "/assets/products/hand-towel/beige_handTowel.jpeg",
        "/assets/products/hand-towel/brown_handTowel.jpeg"
      ],
      "Bath Towel": [
        "/assets/products/bath-towels/white_bathTowel.jpeg",
        "/assets/products/bath-towels/black_bathTowel.jpeg",
        "/assets/products/bath-towels/brown_bathTowel.jpeg",
        "/assets/products/bath-towels/navyBlue_bathTowel.jpeg",
      ],
      "Beach Towels": [
        "/assets/products/beach-towel/blue_beachTowel.jpeg",
        "/assets/products/beach-towel/yellow_beachTowel.jpeg",
        "/assets/products/beach-towel/brown_beachTowel.jpeg",
        "/assets/products/beach-towel/green_beachTowel.png",
      ],
      "Set Towels": [
        "/assets/products/set-towels/black_setTowels.jpeg", // Black
        "/assets/products/set-towels/navy_setTowels.jpeg", // Navy Blue
        "/assets/products/set-towels/beige_setTowels.jpeg", // Beige
        "/assets/products/set-towels/brown_setTowels.jpeg", // Brown
        "/assets/products/set-towels/gray_setTowels.jpeg", // Grey
        "/assets/products/set-towels/white_setTowels.jpeg"  // white
      ]
    };

    return PRODUCT_CATEGORIES.map(cat => ({
      category: cat,
      items: (DETAILED_PRODUCTS[cat] || []).map((spec, i) => {

  let images =
    categoryImages[cat] || [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
    ];

  /**
   * Set Towels & Beach Towels
   * single image per card
   */
  const needsSpecificImage = [
    "Set Towels",
    "Beach Towels"
  ].includes(cat);

  if (
    needsSpecificImage &&
    categoryImages[cat] &&
    categoryImages[cat][i]
  ) {
    images = [categoryImages[cat][i]];
  }

  /**
   * Bath Towel
   * ONLY 340 GSM
   * show one image
   */
  if (
    cat === "Bath Towel" &&
    String(spec.gsm).includes("340")
  ) {
    images = [
      "/assets/products/bath-towels/colour_bathTowels.jpeg"
    ];
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
    <section id="products" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedElement>
          <div className="text-center mb-24">
            <span className="text-[10px] font-medium tracking-[0.5em] text-slate-400 uppercase mb-6 block">The Collection</span>
            <h2 className="font-display text-5xl md:text-6xl font-light text-slate-900 mb-8 italic">Curated Excellence</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
              A symphony of texture and durability. Each piece in our collection is a testament to our commitment to artisanal quality.
            </p>
          </div>
        </AnimatedElement>

        {/* Minimalist Tabs */}
        <AnimatedElement delay={0.1}>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-24 p-2 glass rounded-full w-fit mx-auto">
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
        </AnimatedElement>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 max-w-7xl mx-auto px-4 md:px-0">
          {activeProducts.map((product, index) => (
            <AnimatedElement key={product.id} delay={index * 0.05}>
              <ProductCard 
                product={product} 
                onSelectProduct={onSelectProduct} 
              />
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
});

Products.displayName = "Products";

export default Products;
