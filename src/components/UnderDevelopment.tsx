import React, { memo } from "react";
import { motion } from "motion/react";
import { Wrench, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnderDevelopment = memo(() => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[540px] h-[540px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-fuchsia-500/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-3xl w-full rounded-[2.5rem] border border-white/10 bg-slate-900/90 backdrop-blur-2xl shadow-[0_35px_120px_rgba(15,23,42,0.35)] p-10 md:p-16"
      >
        <div className="flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center w-24 h-24 rounded-full bg-sky-500/10 border border-sky-500/20"
          >
            <Wrench className="w-12 h-12 text-sky-300" />
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-sm uppercase tracking-[0.3em] text-sky-300/80"
            >
              Site Under Development
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-white"
            >
              Building Something Special.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="max-w-2xl text-sm md:text-base text-slate-300 leading-relaxed"
          >
            We are crafting a premium experience for SSLN EXPORTS. The website is under active development, and this page will be replaced with the finished site soon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            {/* <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-sky-400 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              Go to Home
              <Sparkles className="w-4 h-4" />
            </button> */}
            <button
              type="button"
              onClick={() => navigate("/development")}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm text-white transition hover:bg-white/10"
            >
              Check Back Soon
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

UnderDevelopment.displayName = "UnderDevelopment";
export default UnderDevelopment;
