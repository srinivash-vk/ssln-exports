import React, { memo } from "react";
import { CheckCircle2, Trophy, Users, Clock } from "lucide-react";

/**
 * Features Component: Displays key value propositions of the company.
 * Optimized with React.memo for static performance.
 */
const Features = memo(() => {
  return (
    <section id="features" className="py-20 bg-white border-b border-slate-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {[{ icon: CheckCircle2, title: "100% Cotton", subtitle: "Pure Fiber" }, { icon: Trophy, title: "Premium Grade", subtitle: "Export Quality" }, { icon: Users, title: "Bulk Supply", subtitle: "B2B Solutions" }, { icon: Clock, title: "Fast Delivery", subtitle: "Global Shipping" }].map(({ icon: Icon, title, subtitle }, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-14 h-14 glass rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg border-white/20">
                <Icon className="text-slate-900 w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900 tracking-wide text-sm">{title}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Features.displayName = "Features";
export default Features;
