import React, { memo } from "react";
import { Layers, Droplets, Zap, Scissors, Package } from "lucide-react";
import { FACILITIES } from "../constants";
import { AnimatedElement } from "./AnimatedElement";

const ICON_MAP: Record<string, React.ReactNode> = {
  "Weaving": <Layers className="w-6 h-6" />,
  "Dyeing": <Droplets className="w-6 h-6" />,
  "Processing": <Zap className="w-6 h-6" />,
  "Finishing": <Scissors className="w-6 h-6" />,
  "Packing": <Package className="w-6 h-6" />,
};

/**
 * Infrastructure Component: Highlighting the world-class facility and advanced machinery.
 * Maps data from the FACILITIES constant to custom cards with specific icons.
 */
const Infrastructure = memo(() => {
  return (
    <section id="infrastructure" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedElement>
          <div className="mb-20">
            <div>
              <span className="text-[10px] font-medium tracking-[0.5em] text-slate-400 uppercase mb-4 block">Our Facility</span>
              <h2 className="font-display text-5xl md:text-6xl font-light text-slate-900 mb-8 italic leading-tight">
                World-Class <br />
                <span className="text-slate-400">Infrastructure</span>
              </h2>
              <p className="text-slate-500 max-w-3xl font-light text-lg leading-relaxed">
                Our state-of-the-art cutting, stitching, finishing, and packing unit combines advanced technology with high capacity to ensure our products meet the standards and expectations of international markets.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {FACILITIES.map((facility, i) => (
            <AnimatedElement key={i} delay={i * 0.05}>
              <div className="group flex flex-col items-center justify-between h-full min-h-[370px] p-8 glass-card rounded-[2.5rem] border border-slate-100 hover:border-slate-900 transition-all duration-400 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white/80 to-slate-50">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 text-slate-900 text-3xl">
                  {ICON_MAP[facility.title]}
                </div>
                <h3 className="text-2xl font-display font-semibold italic mb-1 text-slate-900 group-hover:text-slate-900 transition-colors duration-300 drop-shadow-sm tracking-wide">{facility.title}</h3>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500 mb-3 group-hover:text-slate-700 transition-colors duration-300">{facility.details}</p>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-slate-600 font-light text-base leading-relaxed text-center px-2 group-hover:text-slate-800 transition-colors duration-300">
                    <span className="block text-[15px] font-medium text-slate-900 mb-1 italic">{facility.title} Excellence</span>
                    {facility.description}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
});

Infrastructure.displayName = "Infrastructure";
export default Infrastructure;
