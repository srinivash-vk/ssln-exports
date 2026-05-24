import React, { memo } from "react";
import { AnimatedElement } from "./AnimatedElement";

/**
 * Footer Component: Global footer with navigation links and brand info.
 */
import { memo } from "react";
const Footer = memo(() => {
  return (
    <footer className="py-20 bg-white border-t border-slate-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedElement>
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
            <div className="space-y-6 max-w-xs">
              <div className="flex flex-col">
                <span className="font-display text-3xl font-semibold tracking-tight text-slate-900">SSLN EXPORTS</span>
                <span className="text-[10px] font-medium tracking-[0.4em] text-slate-400 uppercase">Premium Terry Towels</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed font-light tracking-wide">
                Defining the pinnacle of textile luxury through artisanal craftsmanship and global excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div>
                <h4 className="text-[10px] font-bold mb-8 uppercase tracking-[0.3em] text-slate-900">Explore</h4>
                <ul className="space-y-4 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                  <li><a href="#home" className="hover:text-slate-900 transition-colors">Home</a></li>
                  <li><a href="#products" className="hover:text-slate-900 transition-colors">Products</a></li>
                  <li><a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-bold mb-8 uppercase tracking-[0.3em] text-slate-900">Legal</h4>
                <ul className="space-y-4 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                  <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-slate-900 transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedElement>
        
        <AnimatedElement delay={0.1}>
          <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-300">
            <p>© {new Date().getFullYear()} SSLN EXPORTS. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-slate-900 transition-colors">Instagram</a>
              <a href="#" className="hover:text-slate-900 transition-colors">LinkedIn</a>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </footer>
  );
});

export default Footer;
