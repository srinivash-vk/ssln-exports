import React, { memo } from "react";
import { Layers, Droplets, Zap, Scissors, Package } from "lucide-react";
import { FACILITIES } from "../constants";

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
        <div className="mb-20 gsap-fade-up">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {FACILITIES.map((facility, i) => (
            <div
              key={i}
              className="group p-8 glass-card rounded-[2.5rem] border border-slate-100 hover:border-slate-900 transition-all duration-400 gsap-fade-up"
            >
              <div className="w-14 h-14 glass rounded-xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                {ICON_MAP[facility.title]}
              </div>
              <h3 className="text-2xl font-display font-light italic mb-2 text-slate-900">{facility.title}</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">{facility.details}</p>
              <p className="text-slate-500 font-light text-sm leading-relaxed">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Infrastructure.displayName = "Infrastructure";
export default Infrastructure;
