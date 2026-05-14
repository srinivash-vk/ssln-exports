import React, { memo } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import TypingAnimation from "./TypingAnimation";

/**
 * Hero Component: The main landing section with parallax background and typing animation.
 */
const Hero = memo(() => {
  /**
   * scrollIndicatorClick: Navigates to the features section on indicator click.
   */
  const scrollIndicatorClick = () => {
    const nextSection = document.getElementById('features');
    if (nextSection && window.LenisInstance) {
      window.LenisInstance.scrollTo(nextSection, { offset: -80 });
    }
  };

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Images - Luxury Minimalist */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Terry Towels Manufacturing and Export" 
          className="w-full h-full object-cover brightness-[0.45] scale-110 gsap-parallax-bg"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-white flex flex-col items-center text-center w-full">
        <div className="max-w-4xl flex flex-col items-center w-full">
          <span className="inline-block mb-6 md:mb-8 text-[9px] md:text-[10px] font-medium tracking-[0.4em] md:tracking-[0.5em] text-white/80 uppercase gsap-fade-up">
            Artisanal Craftsmanship Since 2008
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-light mb-8 md:mb-10 leading-[1.2] md:leading-[1.1] gsap-fade-up">
            The Essence of <br />
            <span className="italic font-medium">
              <TypingAnimation text="Pure Luxury" />
            </span>
          </h1>
          <p className="text-base md:text-xl text-white/70 mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto font-light tracking-wide gsap-fade-up">
            Crafted with meticulous attention to detail, our multi-terry towels redefine the standard of comfort. Experience the pinnacle of textile excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 gsap-fade-up justify-center w-full px-4 sm:px-0">
            <a 
              href="#products" 
              onClick={(e) => { e.preventDefault(); const target = document.getElementById('products'); if (target && window.LenisInstance) window.LenisInstance.scrollTo(target); }} 
              className="glass-button text-white px-8 md:px-12 py-4 md:py-5 text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-full transition-all duration-300 flex items-center justify-center gap-4 group active:scale-95"
            >
              <span className="relative z-10">Discover Collection</span>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <ChevronRight size={16} />
              </motion.div>
            </a>
          </div>
        </div>
      </div>

      {/* Luxury Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 cursor-pointer z-20"
        onClick={scrollIndicatorClick}
      >
        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/40 font-medium">Scroll</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
