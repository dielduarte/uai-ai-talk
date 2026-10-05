import { motion } from "motion/react";
import type { ComponentType } from "react";
import type { StepProps } from "../slides";
import { AnimatedTitle, Eyebrow } from "./AnimatedTitle";

type Props = {
  eyebrow: string;
  title?: string;
  step: number;
  Body?: ComponentType<StepProps>;
};

export function ContentSlide({ eyebrow, title, step, Body }: Props) {
  return (
    <section className={`flex flex-col gap-[5vh] ${title ? "" : "items-center"}`}>
      {title && (
        <div className="flex flex-col gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <AnimatedTitle text={title} className="text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.05]" />
        </div>
      )}
      {Body && (
        <motion.div
          variants={{ enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="w-full"
        >
          <Body step={step} />
        </motion.div>
      )}
    </section>
  );
}
