import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * AnimatedElement: Wraps content with Framer Motion fade-up animation.
 * Triggers when element comes into view (replaces .gsap-fade-up behavior).
 */
export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.4,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * ParallaxElement: Creates a parallax scrolling effect.
 * Replaces .gsap-parallax-bg behavior.
 */
export const ParallaxElement: React.FC<ParallaxProps> = ({
  children,
  className = "",
  intensity = 50,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 0 }}
      animate={inView ? { y: intensity * 0.3 } : { y: 0 }}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
};
