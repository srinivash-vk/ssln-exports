import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * NotFound Component: Elegant 404 page with navigation backup.
 * Uses motion animations for a polished look.
 */
const NotFound = memo(() => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-slate-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-slate-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-card p-12 md:p-20 rounded-[3rem] border border-slate-100 shadow-2xl space-y-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border border-dashed border-slate-200 rounded-full opacity-50"
            />
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto relative z-10">
              <Compass className="text-white w-10 h-10" />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-[0.5em] text-slate-400 uppercase mb-4 block">404 Exception</span>
            <h1 className="font-display text-7xl md:text-8xl font-light text-slate-900 italic leading-tight">
              Lost In <br />
              <span className="text-slate-400">The Threads</span>
            </h1>
            <p className="text-slate-500 mt-6 md:mt-8 font-light tracking-wide leading-relaxed max-w-sm mx-auto">
              Our apologies, but the page you are seeking has drifted outside our digital weave. Let us guide you back to safety.
            </p>
          </div>

          <div className="pt-8">
            <button
              onClick={() => navigate("/")}
              className="group inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-transparent hover:text-slate-900 border border-slate-900 transition-all duration-400 active:scale-95 shadow-xl hover:shadow-none"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
              <span>Safety of Home</span>
            </button>
          </div>
        </motion.div>

        <div className="mt-12">
          <span className="text-[9px] font-medium tracking-[0.4em] text-slate-300 uppercase italic">SSLN Exports • Pure Craftsmanship</span>
        </div>
      </div>
    </div>
  );
});

NotFound.displayName = "NotFound";

export default NotFound;
