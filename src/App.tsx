import React, { useEffect, useState, useCallback, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuoteModal from "./components/QuoteModal";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

// Register GSAP ScrollTrigger plugin for scroll-based animations
gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollToTop component: Resets scroll position when the URL pathname changes.
 * Integrates with Lenis smooth scrolling if available.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    if (window.LenisInstance) {
      window.LenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  
  return null;
}

/**
 * Main Application Content: Handles global state, animations, and layout.
 */
function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isNotFound = location.pathname !== "/";

  /**
   * handleRequestQuote: Opens the quote modal and sets the context product.
   */
  const handleRequestQuote = useCallback((product?: Product) => {
    if (product) setSelectedProduct(product);
    setIsQuoteModalOpen(true);
  }, []);

  /**
   * closeQuoteModal: Closes the modal and clears selected product data.
   */
  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
    setSelectedProduct(null);
  }, []);

  /**
   * Security/UX restriction: prevents right-click and text selection to protect brand content.
   */
  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => e.preventDefault();
    const handleCopy = (e: ClipboardEvent) => e.preventDefault();
    const handlePaste = (e: ClipboardEvent) => e.preventDefault();
    const handleSelectStart = (e: Event) => e.preventDefault();

    document.addEventListener("contextmenu", handleContextmenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("selectstart", handleSelectStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextmenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("selectstart", handleSelectStart);
    };
  }, []);

  /**
   * Initialization of Lenis Smooth Scrolling and GSAP Animations.
   */
  useEffect(() => {
    if (isNotFound) return;

    const ctx = gsap.context(() => {
      // Configuration for Lenis smooth scroll
      const lenis = new Lenis({
        duration: 0.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 2,
        infinite: false,
      });

      window.LenisInstance = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      // Animation frame driver for smooth scrolling
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // Hero Parallax effect
      gsap.to(".gsap-parallax-bg", {
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 150,
        ease: "none",
      });

      // Global Reveal Animations for elements with .gsap-fade-up class
      gsap.utils.toArray<HTMLElement>(".gsap-fade-up").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    }, appRef);

    // Cleanup on component unmount
    return () => {
      ctx.revert();
      if (window.LenisInstance) {
        window.LenisInstance.destroy();
        window.LenisInstance = undefined;
      }
    };
  }, [isNotFound]);

  return (
    <div ref={appRef} className="relative bg-white font-sans text-slate-900 antialiased overflow-x-hidden">
      {!isNotFound && (
        <>
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-slate-100/60 rounded-full blur-[150px]" />
            <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-indigo-50/40 rounded-full blur-[100px]" />
          </div>

          <Navbar 
            onRequestQuote={() => handleRequestQuote({
              id: "general",
              category: "General Inquiry",
              gsm: "N/A",
              size: "Custom Sizes",
              weight: "N/A",
              color: "Multiple",
              images: []
            })} 
          />
        </>
      )}
      
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home onSelectProduct={handleRequestQuote} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isNotFound && <Footer />}

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={closeQuoteModal} 
        product={selectedProduct} 
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
