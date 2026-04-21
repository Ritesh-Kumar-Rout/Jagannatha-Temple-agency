import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export const Magnetic = ({ children, strength = 0.5, className = "" }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const boundingRect = ref.current?.getBoundingClientRect();
    if (boundingRect) {
      const { width, height, left, top } = boundingRect;
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      setPosition({ x: x * strength, y: y * strength });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
