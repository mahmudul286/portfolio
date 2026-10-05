"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: ReactNode;
  /** Strength of the magnetic pull. 0.3 = subtle, 0.6 = strong. */
  strength?: number;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
}

/**
 * Magnetic button — gently pulls toward the cursor on hover.
 * Respects reduced motion via Framer Motion's reduced-motion config internally.
 */
export function MagneticButton({
  children,
  strength = 0.35,
  className,
  as = "button",
  href,
  target,
  rel,
  download,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovering(false);
  };

  const handleEnter = () => setHovering(true);

  const sharedProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onMouseEnter: handleEnter,
    className,
    style: { x: sx, y: sy },
    "data-cursor": "button" as const,
    ...rest,
  };

  if (as === "a") {
    return (
      <motion.a {...(sharedProps as never)} href={href} target={target} rel={rel} download={download}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...sharedProps} type={rest.type ?? "button"}>
      {children}
    </motion.button>
  );
}
