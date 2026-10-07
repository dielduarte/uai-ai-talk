import { motion } from "motion/react";
import { AnimatedTitle, slideIn } from "./AnimatedTitle";
import { Speakers } from "./Speakers";

export function OutroSlide({ title }: { title: string }) {
  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-16">
      <section className="flex flex-col gap-8">
        <AnimatedTitle text={title} className="text-[clamp(3rem,7vw,7.5rem)] leading-[1.05]" />
        <motion.span
          variants={slideIn}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="font-mono text-[clamp(1.5rem,3vw,2.75rem)] text-brand"
        >
          Perguntas?
        </motion.span>
      </section>
      <motion.div variants={slideIn} transition={{ duration: 0.45, delay: 0.3 }}>
        <Speakers />
      </motion.div>
    </div>
  );
}
