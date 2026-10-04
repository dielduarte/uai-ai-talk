import { motion, type Variants } from "motion/react";
import type { Slide } from "../slides";

const word: Variants = {
  enter: (step: 1 | -1) => ({ y: `${step * 100}%`, opacity: 0, filter: "blur(8px)" }),
  center: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: (step: 1 | -1) => ({ y: `${step * -100}%`, opacity: 0, filter: "blur(8px)" }),
};

export function TitleSlide({ slide, number }: { slide: Slide; number: number }) {
  return (
    <section className="flex flex-col gap-8">
      <motion.span
        variants={word}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="font-mono text-xl tracking-widest text-brand"
      >
        {String(number).padStart(2, "0")}
      </motion.span>
      <h1 className="max-w-[18ch] font-display text-[clamp(3rem,7vw,7.5rem)] font-bold leading-[1.05] tracking-tight">
        {slide.title.split(" ").map((text, i) => (
          <span key={i} className="mr-[0.25em] inline-flex overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              variants={word}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.04 }}
            >
              {text}
            </motion.span>
          </span>
        ))}
      </h1>
    </section>
  );
}
