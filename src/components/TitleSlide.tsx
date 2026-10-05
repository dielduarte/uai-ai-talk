import { AnimatedTitle, Eyebrow } from "./AnimatedTitle";

export function TitleSlide({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section className="flex flex-col gap-8">
      <Eyebrow>{eyebrow}</Eyebrow>
      <AnimatedTitle text={title} className="max-w-[18ch] text-[clamp(3rem,7vw,7.5rem)] leading-[1.05]" />
    </section>
  );
}
