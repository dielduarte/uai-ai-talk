import { motion, type Variants } from "motion/react";

export const slideIn: Variants = {
  enter: (direction: 1 | -1) => ({ y: `${direction * 100}%`, opacity: 0, filter: "blur(8px)" }),
  center: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: (direction: 1 | -1) => ({ y: `${direction * -100}%`, opacity: 0, filter: "blur(8px)" }),
};

export function Eyebrow({ children }: { children: string }) {
  return (
    <motion.span
      variants={slideIn}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="font-mono text-xl uppercase tracking-widest text-brand"
    >
      {children}
    </motion.span>
  );
}

export function AnimatedTitle({ text, className }: { text: string; className: string }) {
  return (
    <h1 className={`font-display font-bold tracking-tight ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-flex overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            variants={slideIn}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.04 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
