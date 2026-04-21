import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export const FloatingElement = ({
  children,
  delay = 0,
  duration = 4,
  yOffset = 15,
  className = "",
}: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};
