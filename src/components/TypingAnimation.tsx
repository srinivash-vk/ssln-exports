import React, { useState, useEffect, memo } from "react";

/**
 * TypingAnimation: A component that renders text with a typewriter effect.
 * Animates character by character based on the provided speed.
 */
const TypingAnimation = memo(({ text, speed = 60 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    // Timer to increment the character index
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      // Stop when all characters are rendered
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="inline-block min-h-[1.2em]">
      {displayedText}
      <span className="animate-pulse font-light ml-0.5 border-r-2 border-white/40 pr-1"></span>
    </span>
  );
});

TypingAnimation.displayName = "TypingAnimation";
export default TypingAnimation;
