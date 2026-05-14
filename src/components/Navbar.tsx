import React, { useState, memo } from "react";
import { X, Menu, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useScroll } from "../hooks/useScroll";
import { NAV_LINKS } from "../constants";

interface NavbarProps {
  onRequestQuote: () => void;
}

/**
 * Navbar Component: Navigation bar with sticky behavior, smooth scrolling, and mobile menu support.
 */
const Navbar = memo(({ onRequestQuote }: NavbarProps) => {
  const isScrolled = useScroll(20);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * scrollToSection: Smoothly scrolls to a target section using Lenis if available.
   * Handles both desktop and mobile navigation clicks.
   */
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target && window.LenisInstance) {
      // Use Lenis instance for synchronized smooth scrolling with easing
      window.LenisInstance.scrollTo(target as HTMLElement, { 
        offset: -80, // Offset for sticky header
        duration: 0.8, 
        easing: (t: number) => 1 - Math.pow(1 - t, 4) 
      });
    } else if (target) {
      // Fallback to native browser smooth scroll
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/70 backdrop-blur-xl border-b border-slate-100/20 py-4" 
        : "bg-transparent py-8"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex flex-col">
              <span 
                className={`font-display text-3xl font-light tracking-tight transition-colors duration-500 cursor-pointer ${
                  isScrolled ? "text-slate-900" : "text-white"
                }`} 
                onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              >
                SSLN EXPORTS
              </span>
              <span className={`text-[10px] font-medium tracking-[0.4em] uppercase transition-colors duration-500 ${
                isScrolled ? "text-slate-400" : "text-white/60"
              }`}>Premium Terry Towels</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative group text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
                  isScrolled ? "text-slate-800" : "text-white"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] w-0 transition-all duration-300 ease-out group-hover:w-full ${
                  isScrolled ? "bg-slate-800" : "bg-white"
                }`} />
              </a>
            ))}
            
            <div className="flex items-center gap-4 lg:gap-6 ml-4">
              <button 
                onClick={onRequestQuote}
                className={`px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border rounded-none ${
                  isScrolled 
                    ? "bg-slate-900 text-white border-slate-900 hover:bg-transparent hover:text-slate-900" 
                    : "bg-white text-slate-900 border-white hover:bg-transparent hover:text-white"
                }`}
              >
                Request Quote
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              className={`p-2 transition-colors duration-500 ${isScrolled ? "text-slate-800" : "text-white"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-100 overflow-hidden shadow-2xl absolute top-full left-0 right-0 z-40"
          >
            <div className="flex flex-col p-8 gap-6 sm:gap-8">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
                <div className="flex flex-col">
                  <span className="font-display text-xl font-semibold text-slate-900 leading-none">SSLN EXPORTS</span>
                  <span className="text-[8px] font-medium tracking-[0.3em] uppercase text-slate-400 mt-1">Premium Terry Towels</span>
                </div>
              </div>
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="relative group text-sm font-medium text-slate-800 uppercase tracking-[0.3em] w-fit py-1"
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-slate-800 transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(onRequestQuote, 300);
                }}
                className="bg-slate-900 text-white w-full py-4 text-xs font-bold uppercase tracking-[0.3em] active:scale-[0.98] transition-transform mt-4"
              >
                Request Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
