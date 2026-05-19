import React, { memo } from "react";
import { Globe2 } from "lucide-react";
import { MARKETS } from "../constants";
import { AnimatedElement } from "./AnimatedElement";

/**
 * GlobalMarkets Component: Visualizes the international reach and client segments.
 * Uses the MARKETS constant for data consistency across the application.
 */
const GlobalMarkets = memo(() => {
  return (
    <section className="py-24 md:py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimatedElement>
            <div>
              <span className="text-[10px] font-medium tracking-[0.5em] text-slate-400 uppercase mb-4 md:mb-6 block">Our Reach</span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 mb-8 md:mb-10 italic leading-tight">Serving Global Markets</h2>
              <p className="text-slate-500 mb-10 md:mb-12 leading-relaxed font-light tracking-wide max-w-lg text-lg">
                SSLN Exports proudly supplies premium terry towels to international clients across diverse sectors. Our commitment to consistent quality and timely delivery has built long-term business relationships worldwide.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
                {MARKETS.map((market, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-1.5 h-1.5 bg-slate-900 rounded-full group-hover:scale-150 transition-transform duration-200 flex-shrink-0" />
                    <span className="text-sm md:text-base font-medium tracking-wide text-slate-700">{market}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
          <AnimatedElement delay={0.1}>
            <div className="relative mt-12 lg:mt-0">
              <div className="aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200"
                  alt="Global Hospitality and Resort Toweling Supply"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 glass-card p-4 md:p-6 shadow-2xl rounded-2xl hidden sm:block border border-slate-100 z-20">
                <div className="flex flex-col gap-4">
                  <div className="w-32 md:w-48 h-24 md:h-32 overflow-hidden rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?auto=format&fit=crop&q=80&w=600"
                      alt="Worldwide Logistics and Towel Distribution Network"
                      className="w-full h-full object-cover grayscale-[0.2]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-2xl md:text-3xl font-light text-slate-900 italic">Global</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">Logistics Network</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
});

GlobalMarkets.displayName = "GlobalMarkets";
export default GlobalMarkets;
