import { motion } from "motion/react";
import { AnimatedTitle, slideIn } from "./AnimatedTitle";
import { Speakers } from "./Speakers";

const DECK_URL = "https://www.dielduarte.dev/uai-ai-talk";

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
        <motion.a
          variants={slideIn}
          transition={{ duration: 0.45, delay: 0.4 }}
          href={DECK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="w-fit font-mono text-[clamp(1rem,1.5vw,1.4rem)] text-fg-secondary underline-offset-4 hover:text-brand hover:underline"
        >
          {DECK_URL.replace("https://", "")}
        </motion.a>
      </section>
      <motion.div variants={slideIn} transition={{ duration: 0.45, delay: 0.3 }}>
        <Speakers />
      </motion.div>
    </div>
  );
}
