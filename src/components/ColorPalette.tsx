import React, { useMemo, memo } from "react";
import { COLOR_MAP } from "../constants";

/**
 * ColorPalette: Visualizes product color options using color swatches.
 * Supports single colors and dual-tone colors (notated with a slash).
 */
const ColorPalette = memo(({ colors }: { colors: string }) => {
  // Parse comma-separated color strings into a list
  const colorList = useMemo(() => colors.split(',').map(c => c.trim()), [colors]);
  
  return (
    <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
      {colorList.map((color, idx) => {
        // Handle dual-tone colors (e.g., "White / Blue")
        if (color.includes('/')) {
          const [c1, c2] = color.split('/').map(s => s.trim());
          return (
            <div key={idx} className="group/swatch relative">
              <div className="w-5 h-5 rounded-full border border-slate-200 overflow-hidden flex transform group-hover/swatch:scale-110 transition-transform cursor-help shadow-sm">
                {/* Render split background for dual colors */}
                <div className="w-1/2 h-full" style={{ backgroundColor: COLOR_MAP[c1] || '#ccc' }} />
                <div className="w-1/2 h-full" style={{ backgroundColor: COLOR_MAP[c2] || '#ccc' }} />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[8px] rounded-sm opacity-0 group-hover/swatch:opacity-100 transition-all scale-90 group-hover/swatch:scale-100 whitespace-nowrap z-10 pointer-events-none uppercase tracking-[0.2em] shadow-xl">
                {color}
              </div>
            </div>
          );
        }
        
        return (
          <div key={idx} className="group/swatch relative">
            <div 
              className="w-5 h-5 rounded-full border border-slate-200 transform group-hover/swatch:scale-110 transition-transform cursor-help shadow-sm"
              style={{ backgroundColor: COLOR_MAP[color] || '#ccc' }}
            />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[8px] rounded-sm opacity-0 group-hover/swatch:opacity-100 transition-all scale-90 group-hover/swatch:scale-100 whitespace-nowrap z-10 pointer-events-none uppercase tracking-[0.2em] shadow-xl">
              {color}
            </div>
          </div>
        );
      })}
    </div>
  );
});

ColorPalette.displayName = "ColorPalette";
export default ColorPalette;
